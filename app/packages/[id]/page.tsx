import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, Clock, MapPin, MessageCircle, ShieldCheck, Sparkles, Users, X } from "lucide-react";
import { getPackage, packages } from "@/lib/packages";
import { formatDuration, formatRupiah, whatsappLink } from "@/lib/format";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return packages.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const pkg = getPackage(id);
  if (!pkg) return {};
  const url = `/packages/${pkg.id}`;
  return {
    title: `${pkg.title} | Paket Wisata Lombok`,
    description: `${pkg.tagline} Destinasi: ${pkg.destination}. Fasilitas lengkap dan harga terbaik.`,
    alternates: {
      canonical: url,
      languages: {
        "id-ID": url,
        "en-US": `/en/packages/${pkg.id}`,
        "x-default": `/en/packages/${pkg.id}`,
      },
    },
    openGraph: {
      type: "website",
      title: `${pkg.title} | Paket Wisata Lombok`,
      description: pkg.tagline,
      url,
      siteName: SITE_NAME,
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

export default async function PackageDetailPage({ params }: Props) {
  const { id } = await params;
  const pkg = getPackage(id);
  if (!pkg) notFound();

  const pkgUrl = absoluteUrl(`/packages/${pkg.id}`);
  const waMessage = `Halo ${SITE_NAME}, saya tertarik dengan paket "${pkg.title}". Mohon info ketersediaan dan cara pemesanannya.`;

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
              name: "Paket Wisata",
              item: absoluteUrl("/#paket"),
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
          touristType: ["Wisatawan Keluarga", "Pasangan", "Rombongan", "Solo Traveler"],
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
              url: absoluteUrl("/"),
            },
          },
          provider: {
            "@type": "TravelAgency",
            name: SITE_NAME,
            url: absoluteUrl("/"),
          },
          itinerary: {
            "@type": "ItemList",
            numberOfItems: pkg.itinerary.length,
            itemListElement: pkg.itinerary.map((day) => ({
              "@type": "ListItem",
              position: day.day,
              name: `Hari ${day.day}: ${day.title}`,
              description: day.items.join(". "),
            })),
          },
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/#paket"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Semua paket
        </Link>

        <div className="mt-4">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{pkg.title}</h1>
          <p className="mt-2 text-lg text-slate-600">{pkg.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              {formatDuration(pkg.durationDays, pkg.durationNights)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" aria-hidden />
              {pkg.destination}
            </span>
          </div>
        </div>

        {/* Galeri Foto Nyata */}
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
              <h2 className="text-xl font-bold text-slate-900">Highlight Destinasi</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800">
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">Rencana Perjalanan (Itinerary)</h2>
              <ol className="mt-4 space-y-4">
                {pkg.itinerary.map((d) => (
                  <li key={d.day} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                        {d.day}
                      </span>
                      <h3 className="font-semibold text-slate-900">
                        Hari {d.day}: {d.title}
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
                <h2 className="font-bold text-emerald-900">Sudah termasuk (Include)</h2>
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
                <h2 className="font-bold text-rose-900">Tidak termasuk (Exclude)</h2>
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

          {/* Kartu harga & Booking */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Harga mulai dari</p>
              <p className="text-3xl font-extrabold text-brand-700">{formatRupiah(pkg.price)}</p>
              <p className="text-sm text-slate-500">per orang</p>
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
                Pesan via WhatsApp
              </a>
              <p className="mt-3 text-xs text-slate-500">
                Pemesanan dikonfirmasi manual oleh admin. Mau tanya rute khusus? Klik ikon chat di pojok kanan bawah.
              </p>

              {/* Jaminan Layanan (Trust Signals) */}
              <div className="mt-6 border-t border-slate-100 pt-5 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Garansi Harga Transparan &amp; Tanpa Biaya Tersembunyi</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Users className="h-4 w-4 shrink-0 text-brand-600" />
                  <span>Pemandu Wisata &amp; Supir Lokal Berpengalaman</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>Armada Bersih, Nyaman &amp; AC Dingin</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
