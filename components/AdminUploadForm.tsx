"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText, Loader2, Lock, LogOut, ShieldCheck, TriangleAlert, Upload } from "lucide-react";
import { TENANT_ID, uploadDocument } from "@/lib/api";

const MAX_MB = 10;
const DEFAULT_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "lombok2026";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export default function AdminUploadForm() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const [tenantId, setTenantId] = useState(TENANT_ID);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin_authenticated");
    setIsAuthenticated(savedAuth === "true");
  }, []);

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      sessionStorage.setItem("admin_authenticated", "true");
      setIsAuthenticated(true);
      setPinError("");
      setPinInput("");
    } else {
      setPinError("PIN keamanan tidak valid. Silakan coba lagi.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    setStatus({ kind: "idle" });
  }

  function validate(): string | null {
    if (!tenantId.trim()) return "tenant_id wajib diisi.";
    if (!title.trim()) return "Judul dokumen wajib diisi.";
    if (!file) return "Pilih file PDF terlebih dahulu.";
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) return "File harus berformat PDF.";
    if (file.size > MAX_MB * 1024 * 1024) return `Ukuran file maksimal ${MAX_MB} MB.`;
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setStatus({ kind: "error", message: problem });
      return;
    }

    setStatus({ kind: "loading" });
    try {
      const result = await uploadDocument({
        tenantId: tenantId.trim(),
        title: title.trim(),
        file: file as File,
      });
      const extra = typeof result.chunks === "number" ? ` (${result.chunks} potongan teks)` : "";
      setStatus({
        kind: "success",
        message: (result.message ?? "Dokumen berhasil diproses dan disimpan.") + extra,
      });
      setTitle("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Gagal mengunggah dokumen.",
      });
    }
  }

  // Tampilan saat memeriksa status sesi
  if (isAuthenticated === null) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  // Gate PIN otorisasi
  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 mb-4">
          <Lock className="h-6 w-6" aria-hidden />
        </div>
        <h2 className="text-center text-xl font-bold text-slate-900">Autentikasi Diperlukan</h2>
        <p className="mt-1 text-center text-sm text-slate-600">
          Masukkan PIN akses admin untuk mengunggah dokumen knowledge base asisten AI.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label htmlFor="adminPin" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              PIN Admin
            </label>
            <input
              id="adminPin"
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError("");
              }}
              placeholder="Masukkan PIN keamanan"
              className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              autoFocus
            />
          </div>

          {pinError && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-rose-600">
              <TriangleAlert className="h-4 w-4 shrink-0" />
              {pinError}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 shadow-xs"
          >
            Buka Akses Admin
          </button>
        </form>
      </div>
    );
  }

  const loading = status.kind === "loading";

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Session Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="h-4 w-4" />
          <span>Sesi Admin Terverifikasi</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-rose-600 transition"
        >
          <LogOut className="h-3.5 w-3.5" />
          Kunci Sesi
        </button>
      </div>

      <div>
        <label htmlFor="tenantId" className="block text-sm font-medium text-slate-700">
          tenant_id
        </label>
        <input
          id="tenantId"
          type="text"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value)}
          placeholder="lombok-demo"
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          disabled={loading}
        />
        <p className="mt-1 text-xs text-slate-500">
          Harus sama dengan NEXT_PUBLIC_TENANT_ID agar chat asisten AI dapat mengakses dokumen ini.
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Judul Dokumen
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brosur Paket Tour Lombok 2026"
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium text-slate-700">
          File PDF (maks. {MAX_MB} MB)
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-6 text-center transition hover:border-brand-400 hover:bg-brand-50/30"
        >
          {file ? (
            <div className="flex items-center gap-2 text-slate-800">
              <FileText className="h-6 w-6 text-brand-600" aria-hidden />
              <div className="text-left">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 text-slate-400" aria-hidden />
              <p className="mt-2 text-sm font-medium text-slate-700">Pilih file PDF</p>
              <p className="text-xs text-slate-500">atau klik untuk menelusuri komputer Anda</p>
            </>
          )}
        </div>
        <input
          id="file"
          ref={fileRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          disabled={loading}
        />
      </div>

      {status.kind === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {status.message}
        </p>
      )}
      {status.kind === "success" && (
        <p role="status" className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60 shadow-xs"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Memproses dokumen ke Knowledge Base...
          </>
        ) : (
          "Unggah & Proses ke AI"
        )}
      </button>
    </form>
  );
}
