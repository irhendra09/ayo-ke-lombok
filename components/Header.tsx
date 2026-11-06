"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Palmtree, Menu, X, Compass, Package, BookOpen, MessageCircle } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDictionary } from "@/lib/i18n";
import { SITE_NAME } from "@/lib/site";
import { whatsappLink } from "@/lib/format";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEn = pathname.startsWith("/en");
  const dict = getDictionary(isEn ? "en" : "id");
  const prefix = isEn ? "/en" : "";

  // Tutup mobile menu saat rute berpindah
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const waHelpMessage = isEn
    ? `Hello ${SITE_NAME}, I would like to inquire about your Lombok tour packages.`
    : `Halo ${SITE_NAME}, saya ingin konsultasi mengenai paket wisata Lombok.`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href={prefix || "/"}
          className="flex items-center gap-2 font-extrabold text-slate-900 tracking-tight text-base sm:text-lg"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-xs">
            <Palmtree className="h-5 w-5" aria-hidden />
          </span>
          <span>Ayo ke Lombok</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <nav className="flex items-center gap-5 text-sm font-semibold text-slate-600">
            <Link
              href={`${prefix}/#kategori`}
              className="hover:text-brand-700 transition py-1"
            >
              {dict.nav.categories}
            </Link>
            <Link
              href={`${prefix}/#paket`}
              className="hover:text-brand-700 transition py-1"
            >
              {dict.nav.packages}
            </Link>
            <Link
              href={`${prefix}/blog`}
              className="hover:text-brand-700 transition py-1"
            >
              {dict.nav.blog}
            </Link>
          </nav>

          <div className="h-4 w-px bg-slate-200" />

          <LanguageSwitcher />

          <a
            href={whatsappLink(waHelpMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand-100"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {isEn ? "WhatsApp" : "Kontak WA"}
          </a>
        </div>

        {/* Mobile Header Right: Switcher + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs transition active:bg-slate-100"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-slate-900" aria-hidden />
            ) : (
              <Menu className="h-5 w-5 text-slate-900" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pb-6 pt-3 shadow-lg md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-1">
            <Link
              href={`${prefix}/#kategori`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-brand-50 hover:text-brand-700 active:bg-brand-100"
            >
              <Compass className="h-4 w-4 text-brand-600" />
              <span>{dict.nav.categories}</span>
            </Link>

            <Link
              href={`${prefix}/#paket`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-brand-50 hover:text-brand-700 active:bg-brand-100"
            >
              <Package className="h-4 w-4 text-brand-600" />
              <span>{dict.nav.packages}</span>
            </Link>

            <Link
              href={`${prefix}/blog`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-brand-50 hover:text-brand-700 active:bg-brand-100"
            >
              <BookOpen className="h-4 w-4 text-brand-600" />
              <span>{dict.nav.blog}</span>
            </Link>
          </nav>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <a
              href={whatsappLink(waHelpMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white shadow-xs transition hover:bg-emerald-600 active:bg-emerald-700"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{isEn ? "Chat with Local Guide on WhatsApp" : "Hubungi Kami via WhatsApp"}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
