"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const isIdHome = pathname === "/id";

  function switchTo(targetLang: "id" | "en") {
    if (targetLang === "en" && !isEn) {
      router.push(isIdHome ? "/en" : `/en${pathname}`);
    } else if (targetLang === "id" && isEn) {
      const newPath = pathname.replace(/^\/en/, "") || "/id";
      router.push(newPath);
    }
  }

  const isId = !isEn;

  return (
    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100/80 p-1 text-xs font-semibold shadow-2xs">
      <button
        type="button"
        onClick={() => switchTo("id")}
        className={`flex items-center gap-1 rounded-lg px-2 py-1 transition ${
          isId ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
        }`}
        title="Bahasa Indonesia"
      >
        <span>🇮🇩</span>
        <span className="hidden sm:inline">ID</span>
      </button>

      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`flex items-center gap-1 rounded-lg px-2 py-1 transition ${
          isEn ? "bg-white text-brand-700 shadow-xs" : "text-slate-500 hover:text-slate-800"
        }`}
        title="English"
      >
        <span>🇬🇧</span>
        <span className="hidden sm:inline">EN</span>
      </button>
    </div>
  );
}
