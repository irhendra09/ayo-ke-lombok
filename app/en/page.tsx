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
import { SITE_NAME } from "@/lib/site";

type SearchParams = { q?: string; destination?: string; duration?: string };

export const metadata: Metadata = {
  title: `Lombok Tour Packages & Private Charters | ${SITE_NAME}`,
  description:
    "Explore the tropical paradise of Lombok and the 3 Gili Islands. Private boat charters, Pink Beach, Mandalika coast, and waterfalls with licensed local guides.",
  alternates: {
    canonical: "/en",
    languages: {
      "id-ID": "/id",
      "en-US": "/en",
      "x-default": "/en",
    },
  },
  openGraph: {
    title: `Lombok Tour Packages & Private Charters | ${SITE_NAME}`,
    description:
      "Explore the tropical paradise of Lombok and the 3 Gili Islands with 100% private transport and English-speaking guides.",
    url: "/en",
    locale: "en_US",
  },
};

export default async function EnglishHomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const results = filterPackages(params, "en");
  const filtered = Boolean(params.q || params.destination || params.duration);

  return (
    <>
      <Hero q={params.q} destination={params.destination} duration={params.duration} lang="en" />

      {/* Popular Categories & Destinations */}
      <section id="kategori" className="mx-auto max-w-6xl px-4 pt-16" aria-labelledby="kategori-wisata-heading">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
              <Compass className="h-3.5 w-3.5" aria-hidden />
              Top Curated Destinations
            </div>
            <h2 id="kategori-wisata-heading" className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Explore by Destination &amp; Category
            </h2>
            <p className="mt-1 text-slate-600">
              Find customized itineraries matching your travel style and favorite Lombok highlights.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/en/kategori/${cat.slug}`}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured Excursion
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-600" />
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-brand-700">
                  {cat.name_en || cat.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                  {cat.heroTagline_en || cat.heroTagline}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
                {(cat.highlights_en || cat.highlights).slice(0, 2).map((h) => (
                  <span key={h} className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600">
                    {h}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us / Trust Badges */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="rounded-3xl border border-brand-100 bg-gradient-to-r from-brand-50/60 via-white to-sky-50/50 p-6 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
                <ShieldCheck className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Transparent Pricing</h3>
                <p className="mt-1 text-sm text-slate-600">
                  No hidden tourist surcharges. All admissions, boat charters, and fuel are fully disclosed.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                <Users className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Licensed Local Guides</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Guided by friendly, English-fluent native guides with deep cultural knowledge.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-600 text-white shadow-sm">
                <Award className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">100% Private Charters</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Enjoy private AC vehicles and private boats without sharing with outside groups.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages Catalog */}
      <section id="paket" className="mx-auto max-w-6xl px-4 pt-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Lombok Tour Packages</h2>
            <p className="mt-1 text-slate-600">
              {filtered
                ? `${results.length} packages matching your search filters`
                : "Select your desired itinerary, or chat with our AI assistant for custom routes."}
            </p>
          </div>
          {filtered && (
            <Link href="/en#paket" className="text-sm font-medium text-brand-700 hover:underline">
              Clear filters
            </Link>
          )}
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="font-semibold text-slate-800">No tour packages match your search criteria.</p>
            <p className="mt-1 text-sm text-slate-600">
              Try adjusting your filters or chat directly with our AI assistant in the lower right corner.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} lang="en" />
            ))}
          </div>
        )}
      </section>

      {/* Traveler Feedback */}
      <Testimonials lang="en" />

      {/* Travel Guides & Tips */}
      <section className="mx-auto max-w-6xl px-4 pt-20" aria-labelledby="artikel-terbaru">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="artikel-terbaru" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Lombok Travel Guides &amp; Insights
            </h2>
            <p className="mt-1 text-slate-600">Itineraries, budget estimates, and insider recommendations.</p>
          </div>
          <Link href="/blog" className="text-sm font-medium text-brand-700 hover:underline">
            View all guides
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
