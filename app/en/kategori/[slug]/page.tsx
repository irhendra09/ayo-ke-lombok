import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2, HelpCircle, Lightbulb, MessageCircle, Sparkles } from "lucide-react";
import { categories, getCategory, getPackagesByCategory } from "@/lib/categories";
import { getLocalizedPackage } from "@/lib/packages";
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

  const url = `/en/kategori/${cat.slug}`;
  const title = cat.metaTitle_en || cat.metaTitle;
  const description = cat.metaDescription_en || cat.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "id-ID": `/kategori/${cat.slug}`,
        "en-US": url,
        "x-default": `/kategori/${cat.slug}`,
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EnglishCategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const pkgs = getPackagesByCategory(cat).map((p) => getLocalizedPackage(p, "en"));
  const currentUrl = absoluteUrl(`/en/kategori/${cat.slug}`);
  const catName = cat.name_en || cat.name;
  const heading = cat.heading_en || cat.heading;
  const tagline = cat.heroTagline_en || cat.heroTagline;
  const intro = cat.intro_en || cat.intro;
  const highlights = cat.highlights_en || cat.highlights;
  const tips = cat.tips_en || cat.tips;
  const faqs = cat.faqs_en || cat.faqs;

  const waCustomMessage = `Hello ${SITE_NAME}, I am interested in your "${catName}" private tour options. Could you provide tailored recommendations?`;

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
              name: "Home",
              item: absoluteUrl("/en"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Destinations",
              item: absoluteUrl("/en#kategori"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: catName,
              item: currentUrl,
            },
          ],
        }}
      />

      {/* Schema.org FAQPage */}
      {faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "en-US",
            mainEntity: faqs.map((faq) => ({
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

      {/* Schema.org ItemList */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: heading,
          description: cat.metaDescription_en || cat.metaDescription,
          url: currentUrl,
          numberOfItems: pkgs.length,
          itemListElement: pkgs.map((pkg, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: pkg.title,
            url: absoluteUrl(`/en/packages/${pkg.id}`),
          })),
        }}
      />

      <article className="mx-auto max-w-6xl px-4 py-8">
        {/* Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link
            href="/en#paket"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All Tour Packages
          </Link>
        </nav>

        {/* Hero */}
        <header className="rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50/70 via-sky-50/40 to-white p-6 sm:p-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3.5 py-1 text-xs font-semibold text-brand-800">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Featured Lombok Destination
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {heading}
          </h1>
          <p className="mt-3 text-lg font-medium text-slate-700 sm:text-xl">
            {tagline}
          </p>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-600">
            {intro}
          </p>

          {/* Highlights */}
          <div className="mt-8 border-t border-brand-100/80 pt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Why You&apos;ll Love This Trip
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item) => (
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

        {/* Package List */}
        <section className="mt-12" aria-labelledby="daftar-paket-kategori">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 id="daftar-paket-kategori" className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Featured {catName} Tour Packages
              </h2>
              <p className="mt-1 text-slate-600">
                Found {pkgs.length} curated private tour options with all-inclusive logistics.
              </p>
            </div>
          </div>

          {pkgs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="font-semibold text-slate-800">Packages are being updated for this destination.</p>
              <p className="mt-1 text-sm text-slate-600">
                Contact our English team directly on WhatsApp for a custom itinerary tailored to your dates.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pkgs.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} lang="en" />
              ))}
            </div>
          )}
        </section>

        {/* Local Travel Tips */}
        {tips.length > 0 && (
          <section className="mt-14 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-6 sm:p-8">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Lightbulb className="h-5 w-5 text-amber-600" aria-hidden />
              <h2 className="text-xl">Essential Travel Tips for {catName}</h2>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              {tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <section className="mt-14" aria-labelledby="faq-kategori">
            <div className="mb-6 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-brand-600" aria-hidden />
              <h2 id="faq-kategori" className="text-2xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Itinerary CTA */}
        <section className="mt-14 rounded-3xl bg-slate-900 p-8 text-white sm:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Want a Custom Itinerary or Private Extension?
            </h2>
            <p className="mt-3 text-slate-300">
              Arriving from Bali by fastboat or flying into Lombok Airport? We can tailor pickup times, hotel stays, and multi-day packages to your exact dates.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={whatsappLink(waCustomMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Inquire via WhatsApp
              </a>
              <Link
                href="/en#paket"
                className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-medium text-slate-200 transition hover:bg-slate-700"
              >
                Browse Other Tours
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

