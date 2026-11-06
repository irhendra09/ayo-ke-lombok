import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import { sortedPosts } from "@/lib/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog Wisata Lombok: Itinerary, Panduan, dan Tips",
  description:
    "Artikel panduan wisata Lombok: itinerary, destinasi Gili, Pantai Pink, air terjun Senaru, waktu terbaik berkunjung, dan tips gathering.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog Wisata Lombok",
    description: "Itinerary, panduan destinasi, dan tips liburan ke Lombok.",
    url: "/blog",
  },
};

export default function BlogIndexPage() {
  const posts = sortedPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `Blog ${SITE_NAME}`,
          url: absoluteUrl("/blog"),
          inLanguage: "id",
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
            datePublished: p.date,
          })),
        }}
      />

      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Blog Wisata Lombok</h1>
        <p className="mt-3 text-lg text-slate-600">
          Panduan destinasi, contoh itinerary, dan tips praktis untuk merencanakan liburan ke Lombok.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
