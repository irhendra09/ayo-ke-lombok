import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Compass, ShieldCheck, Sparkles, Users, Award } from "lucide-react";
import Hero from "@/components/Hero";
import PackageCard from "@/components/PackageCard";
import BlogCard from "@/components/BlogCard";
import Testimonials from "@/components/Testimonials";
import { sortedPosts } from "@/lib/blog";
import { filterPackages } from "@/lib/packages";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
};

type SearchParams = { q?: string; destination?: string; duration?: string };

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const results = filterPackages(params);
  const filtered = Boolean(params.q || params.destination || params.duration);

  return (
    <>
      <Hero q={params.q} destination={params.destination} duration={params.duration} />

      {/* Section Kategori Pilihan (Hub Pages SEO & Navigasi Pengunjung) */}
      <section id="kategori" className="mx-auto max-w-6xl px-4 pt-16" aria-labelledby="kategori-wisata-heading">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
              <Compass className="h-3.5 w-3.5" aria-hidden />
              Jelajahi Pilihan Terbaik
            </div>
            <h2 id="kategori-wisata-heading" className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Kategori &amp; Destinasi Populer
            </h2>
            <p className="mt-1 text-slate-600">
              Temukan paket liburan spesifik sesuai destinasi impian Anda di Pulau Lombok.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    Destinasi Unggulan
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-600" />
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-brand-700">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                  {cat.heroTagline}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
                {cat.highlights.slice(0, 2).map((h) => (
                  <span key={h} className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600">
                    {h}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Keunggulan Layanan (E-E-A-T & Trust Building) */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="rounded-3xl border border-brand-100 bg-gradient-to-r from-brand-50/60 via-white to-sky-50/50 p-6 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
                <ShieldCheck className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Garansi Harga Transparan</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Semua komponen biaya tertera jelas sejak awal tanpa ada pungutan tersembunyi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                <Users className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Pemandu Lokal Berlisensi</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Didampingi tour guide ramah asli Lombok yang paham rute dan spot foto terbaik.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-sm">
                <Award className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Layanan Privat &amp; Fleksibel</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Kendaraan dan boat private untuk kenyamanan liburan tanpa tergesa-gesa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Katalog Paket Wisata */}
      <section id="paket" className="mx-auto max-w-6xl px-4 pt-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Daftar Paket Wisata Lengkap</h2>
            <p className="mt-1 text-slate-600">
              {filtered
                ? `${results.length} paket sesuai kriteria pencarian Anda`
                : "Pilih paket pilihan Anda, atau tanyakan langsung ke asisten AI untuk penyesuaian jadwal."}
            </p>
          </div>
          {filtered && (
            <Link href="/#paket" className="text-sm font-medium text-brand-700 hover:underline">
              Hapus filter
            </Link>
          )}
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="font-semibold text-slate-800">Belum ada paket yang cocok.</p>
            <p className="mt-1 text-sm text-slate-600">
              Coba kata kunci lain, atau tanyakan langsung ke asisten AI di pojok kanan bawah.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </section>

      {/* Ulasan & Bukti Sosial Wisatawan (Social Proof) */}
      <Testimonials />

      {/* Panduan & Tips Wisata (Blog) */}
      <section className="mx-auto max-w-6xl px-4 pt-20" aria-labelledby="artikel-terbaru">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="artikel-terbaru" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Panduan &amp; Tips Wisata Lombok
            </h2>
            <p className="mt-1 text-slate-600">Itinerary, estimasi biaya, dan rekomendasi sebelum Anda berangkat.</p>
          </div>
          <Link href="/blog" className="text-sm font-medium text-brand-700 hover:underline">
            Lihat semua artikel
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPosts()
            .slice(0, 3)
            .map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
        </div>
      </section>
    </>
  );
}
