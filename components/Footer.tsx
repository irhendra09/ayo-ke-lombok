"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";
import { SITE_NAME } from "@/lib/site";
import { whatsappLink } from "@/lib/format";
import { getDictionary } from "@/lib/i18n";
import { Palmtree } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const dict = getDictionary(isEn ? "en" : "id");
  const prefix = isEn ? "/en" : "";
  const homePath = isEn ? "/en" : "/id";

  const waHelpMessage = isEn
    ? `Hello ${SITE_NAME}, I would like to get more information about your Lombok tour packages.`
    : `Halo ${SITE_NAME}, saya butuh informasi atau bantuan mengenai paket wisata Lombok.`;

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <Link href={homePath} className="inline-flex items-center gap-2 font-bold text-slate-900 text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Palmtree className="h-4 w-4" aria-hidden />
              </span>
              {SITE_NAME}
            </Link>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              {dict.footer.desc}
            </p>
            <p className="text-xs text-slate-400">
              {dict.footer.address}
            </p>
          </div>

          {/* Destinasi & Kategori */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              {dict.footer.catTitle}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`${prefix}/kategori/${c.slug}`} className="hover:text-brand-700 transition">
                    {isEn ? (c.name_en || c.name) : c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigasi Utama */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              {dict.footer.linksTitle}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href={`${homePath}#paket`} className="hover:text-brand-700 transition">
                  {dict.packages.heading}
                </Link>
              </li>
              <li>
                <Link href={`${homePath}#kategori`} className="hover:text-brand-700 transition">
                  {dict.categories.heading}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/blog`} className="hover:text-brand-700 transition">
                  {dict.blog.heading}
                </Link>
              </li>
              <li>
                <a
                  href={whatsappLink(waHelpMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-700 transition font-medium text-brand-700"
                >
                  {dict.footer.contactWa}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {SITE_NAME}. {dict.footer.copyright}</p>
          <p>{dict.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
