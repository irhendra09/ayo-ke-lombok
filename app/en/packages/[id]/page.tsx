import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, Clock, MapPin, MessageCircle, ShieldCheck, Sparkles, Users, X } from "lucide-react";
import { getPackage, getLocalizedPackage, packages } from "@/lib/packages";
import { formatRupiah, whatsappLink } from "@/lib/format";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return packages.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const raw = getPackage(id);
  if (!raw) return {};
  const pkg = getLocalizedPackage(raw, "en");

  const url = `/en/packages/${pkg.id}`;
  return {
    title: `${pkg.title} | Lombok Tour Package`,
    description: `${pkg.tagline} Destination: ${pkg.destination}. All-inclusive private transport & licensed guides.`,
    alternates: {
      canonical: url,
      languages: {
        "id-ID": `/packages/${pkg.id}`,
        "en-US": url,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      title: `${pkg.title} | Lombok Tour Package`,
      description: pkg.tagline,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      images: pkg.image ? [{ url: pkg.image, width: 1200, height: 630, alt: pkg.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.title,
      description: pkg.tagline,
      images: pkg.image ? [pkg.image] : undefined,
    },
  };
}

export default async function EnglishPackageDetailPage({ params }: Props) {
  const { id } = await params;
  const raw = getPackage(id);
  if (!raw) notFound();
  const pkg = getLocalizedPackage(raw, "en");

  const pkgUrl = absoluteUrl(`/en/packages/${pkg.id}`);
  const approxUsd = Math.round(pkg.price / 16000);
  const waMessage = `Hello ${SITE_NAME}, I am interested in booking the "${pkg.title}" package. Please let me know the availability and booking details.`;

  const durationLabel =
    pkg.durationNights > 0
      ? `${pkg.durationDays} Days / ${pkg.durationNights} Nights`
      : `${pkg.durationDays} Full Day Tour`;

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
              name: "Tour Packages",
              item: absoluteUrl("/en#paket"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: pkg.title,
              item: pkgUrl,
            },
          ],
        }}
      />

      {/* Schema.org TouristTrip & Product */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["TouristTrip", "Product"],
          name: pkg.title,
          description: pkg.tagline,
          image: [pkg.image || absoluteUrl("/opengraph-image")],
          inLanguage: "en-US",
          touristType: ["Family Travelers", "Couples", "Private Groups", "Solo Travelers"],
          offers: {
            "@type": "Offer",
            price: pkg.price,
            priceCurrency: "IDR",
            priceValidUntil: "2027-12-31",
            availability: "https://schema.org/InStock",
            url: pkgUrl,
            seller: {
              "@type": "TravelAgency",
              name: SITE_NAME,
              url: absoluteUrl("/en"),
            },
          },
          provider: {
            "@type": "TravelAgency",
            name: SITE_NAME,
            url: absoluteUrl("/en"),
          },
          itinerary: {
            "@type": "ItemList",
            numberOfItems: pkg.itinerary.length,
            itemListElement: pkg.itinerary.map((day) => ({
              "@type": "ListItem",
              position: day.day,
              name: `Day ${day.day}: ${day.title}`,
              description: day.items.join(". "),
            })),
          },
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/en#paket"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          All Tour Packages
        </Link>

        <div className="mt-4">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{pkg.title}</h1>
          <p className="mt-2 text-lg text-slate-600">{pkg.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Clock className="h-4 w-4 text-brand-600" aria-hidden />
              {durationLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <MapPin className="h-4 w-4 text-rose-500" aria-hidden />
              {pkg.destination}
            </span>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2">
          <PhotoPlaceholder
            image={pkg.image}
            gradient={pkg.gradient}
            label={pkg.gallery[0]}
            priority
            className="col-span-2 row-span-2 h-64 rounded-2xl sm:h-full sm:min-h-[22rem] shadow-xs"
          />
          {pkg.gallery.slice(1, 5).map((label, i) => (
            <PhotoPlaceholder
              key={label}
              image={pkg.galleryImages?.[i + 1] || pkg.galleryImages?.[i]}
              gradient={pkg.gradient}
              label={label}
              className="h-32 rounded-2xl sm:h-auto shadow-xs"
            />
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-bold text-slate-900">Tour Highlights</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800">
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">Day-by-Day Itinerary</h2>
              <ol className="mt-4 space-y-4">
                {pkg.itinerary.map((d) => (
                  <li key={d.day} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                        {d.day}
                      </span>
                      <h3 className="font-semibold text-slate-900">
                        Day {d.day}: {d.title}
                      </h3>
                    </div>
                    <ul className="mt-3 space-y-1.5 pl-12 text-sm text-slate-700">
                      {d.items.map((item) => (
                        <li key={item} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                <h2 className="font-bold text-emerald-900">What&apos;s Included</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {pkg.include.map((i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
                <h2 className="font-bold text-rose-900">What&apos;s Excluded</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {pkg.exclude.map((i) => (
                    <li key={i} className="flex gap-2">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Pricing & Booking Card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Starting from</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-brand-700">{formatRupiah(pkg.price)}</p>
                <span className="text-sm font-semibold text-slate-400">(~${approxUsd} USD)</span>
              </div>
              <p className="text-sm text-slate-500">per person</p>
              {pkg.priceNote && (
                <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">{pkg.priceNote}</p>
              )}

              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 font-semibold text-white transition hover:bg-emerald-600 shadow-sm"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Book via WhatsApp
              </a>
              <p className="mt-3 text-xs text-slate-500">
                Instantly chat with our English-speaking tour consultant. Have custom requests? Ask our AI advisor on the bottom right.
              </p>

              {/* Trust Signals */}
              <div className="mt-6 border-t border-slate-100 pt-5 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Transparent Pricing &amp; No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Users className="h-4 w-4 shrink-0 text-brand-600" />
                  <span>Licensed English-Speaking Local Guides</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>100% Private Modern AC Transport &amp; Boats</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
