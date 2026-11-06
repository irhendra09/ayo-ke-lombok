"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { TENANT_ID, sendChat } from "@/lib/api";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
};

const STORAGE_KEY = "lombok_customer_id";

const SUGGESTIONS = [
  "Apakah Gili Tour 3 hari 2 malam sudah termasuk makan?",
  "Apa saja yang dikunjungi di Pantai Pink Tour 1 hari?",
  "Apa saja syarat dan ketentuan pembatalan?",
];

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Halo! Saya asisten wisata Lombok. Tanyakan apa saja tentang itinerary, fasilitas, harga, atau syarat & ketentuan paket kami.",
};

function newId() {
  return crypto.randomUUID();
}

// customer_id disimpan di localStorage agar riwayat obrolan di Redis tetap
// nyambung walau halaman di-refresh. Fallback ke memori jika storage diblokir.
function getCustomerId() {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const id = newId();
    localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    return newId();
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const customerId = useRef<string>("");
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    customerId.current = getCustomerId();
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function submit(text: string) {
    const message = text.trim();
    if (!message || loading) return;

    setMessages((m) => [...m, { id: newId(), role: "user", content: message }]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const answer = await sendChat({
        tenantId: TENANT_ID,
        customerId: customerId.current || getCustomerId(),
        message,
        signal: controller.signal,
      });
      setMessages((m) => [...m, { id: newId(), role: "assistant", content: answer }]);
    } catch (err) {
      if (controller.signal.aborted) return;
      const detail = err instanceof Error ? err.message : "Terjadi kesalahan.";
      setMessages((m) => [
        ...m,
        {
          id: newId(),
          role: "assistant",
          isError: true,
          content: `Maaf, saya belum bisa menjawab sekarang. ${detail}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit(input);
  }

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      {open && (
        <section
          aria-label="Asisten wisata AI"
          className="fixed inset-x-3 bottom-24 z-50 flex h-[32rem] max-h-[calc(100dvh-7rem)] animate-slide-up flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:right-6 sm:w-96"
        >
          <header className="flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">Asisten Wisata Lombok</p>
                <p className="text-xs text-white/80">Dijawab dari dokumen resmi travel</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup chat"
              className="rounded-lg p-1.5 hover:bg-white/15"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-brand-600 text-white"
                      : m.isError
                        ? "rounded-bl-sm border border-red-200 bg-red-50 text-red-700"
                        : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}

            {showSuggestions && (
              <div className="flex flex-col gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="rounded-xl border border-brand-200 bg-white px-3 py-2 text-left text-xs text-brand-800 hover:bg-brand-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <p className="inline-flex items-center gap-2 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sedang mencari jawaban...
                </p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-slate-200 bg-white p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan Anda..."
              maxLength={1000}
              aria-label="Pertanyaan"
              className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Kirim"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Tutup asisten AI" : "Buka asisten AI"}
        aria-expanded={open}
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition hover:scale-105 hover:bg-brand-700 sm:right-6"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
