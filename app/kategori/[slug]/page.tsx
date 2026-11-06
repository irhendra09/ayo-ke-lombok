import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2, HelpCircle, Lightbulb, MessageCircle, Sparkles } from "lucide-react";
import { categories, getCategory, getPackagesByCategory } from "@/lib/categories";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { whatsappLink } from "@/lib/format";
import JsonLd from "@/components/JsonLd";
import PackageCard from "@/components/PackageCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};

  const url = `/kategori/${cat.slug}`;
  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        "id-ID": url,
        "en-US": `/en/kategori/${cat.slug}`,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      title: cat.metaTitle,
      description: cat.metaDescription,
      url,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: cat.metaTitle,
      description: cat.metaDescription,
    },
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const pkgs = getPackagesByCategory(cat);
  const currentUrl = absoluteUrl(`/kategori/${cat.slug}`);
  const waCustomMessage = `Halo ${SITE_NAME}, saya tertarik dengan paket wisata kategori "${cat.name}". Mohon info ketersediaan dan rekomendasi terbaik.`;

  return (
    <>
      {/* Schema.org Breadcrumbs */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Kategori Wisata",
              item: absoluteUrl("/#kategori"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: cat.name,
              item: currentUrl,
            },
          ],
        }}
      />

      {/* Schema.org FAQPage */}
      {cat.faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: cat.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }}
        />
      )}

      {/* Schema.org ItemList (Paket) */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: cat.heading,
          description: cat.metaDescription,
          url: currentUrl,
          numberOfItems: pkgs.length,
          itemListElement: pkgs.map((pkg, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: pkg.title,
            url: absoluteUrl(`/packages/${pkg.id}`),
          })),
        }}
      />

      <article className="mx-auto max-w-6xl px-4 py-8">
        {/* Navigasi Balik */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href="/#paket"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Semua Paket Wisata
          </Link>
        </nav>

        {/* Hero Kategori */}
        <header className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/70 via-sky-50/40 to-white p-6 sm:p-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3.5 py-1 text-xs font-semibold text-brand-800">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Destinasi Pilihan Lombok
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {cat.heading}
          </h1>
          <p className="mt-3 text-lg font-medium text-slate-700 sm:text-xl">
            {cat.heroTagline}
          </p>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-600">
            {cat.intro}
          </p>

          {/* Highlights */}
          <div className="mt-8 border-t border-brand-100/80 pt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Keunggulan Kategori Ini
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {cat.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-200/60"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                  <span className="text-sm font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Daftar Paket */}
        <section className="mt-12" aria-labelledby="daftar-paket-kategori">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="daftar-paket-kategori" className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Pilihan Paket Wisata {cat.name}
              </h2>
              <p className="mt-1 text-slate-600">
                Ditemukan {pkgs.length} pilihan paket terpopuler dengan layanan privat &amp; profesional.
              </p>
            </div>
          </div>

          {pkgs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="font-semibold text-slate-800">Paket sedang diperbarui untuk kategori ini.</p>
              <p className="mt-1 text-sm text-slate-600">
                Hubungi kami langsung via WhatsApp untuk kustomisasi rute private sesuai kebutuhan Anda.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pkgs.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </section>

        {/* Tips & Panduan Lokal */}
        {cat.tips.length > 0 && (
          <section className="mt-14 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-6 sm:p-8">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Lightbulb className="h-5 w-5 text-amber-600" aria-hidden />
              <h2 className="text-xl">Tips Liburan ke {cat.name}</h2>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {cat.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ Section */}
        {cat.faqs.length > 0 && (
          <section className="mt-14" aria-labelledby="faq-kategori">
            <div className="mb-6 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-brand-600" aria-hidden />
              <h2 id="faq-kategori" className="text-2xl font-bold text-slate-900">
                Pertanyaan Sering Diajukan (FAQ)
              </h2>
            </div>
            <div className="space-y-4">
              {cat.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Banner CTA Kustomisasi */}
        <section className="mt-14 rounded-3xl bg-slate-900 p-8 text-white sm:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Ingin Custom Itinerary atau Jadwal Khusus?
            </h2>
            <p className="mt-3 text-slate-300">
              Punya waktu liburan berbeda atau ingin menggabungkan destinasi di atas dengan Rinjani, Kuta, atau air terjun?
              Konsultasikan rencana Anda secara gratis bersama tim lokal kami.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={whatsappLink(waCustomMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Konsultasi Rute via WhatsApp
              </a>
              <Link
                href="/#paket"
                className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-medium text-slate-200 transition hover:bg-slate-700"
              >
                Lihat Paket Lainnya
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

