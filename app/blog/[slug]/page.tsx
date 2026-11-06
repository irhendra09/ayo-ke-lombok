import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, Clock, MessageCircle } from "lucide-react";
import { getPost, posts, readingMinutes, sortedPosts } from "@/lib/blog";
import { getPackage } from "@/lib/packages";
import { formatDate, whatsappLink } from "@/lib/format";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import PackageCard from "@/components/PackageCard";
import RichText from "@/components/RichText";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: post.category,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = post.relatedPackages
    .map((id) => getPackage(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const more = sortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const waMessage = `Halo, saya baru membaca artikel "${post.title}" dan ingin bertanya tentang paket wisata Lombok.`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          inLanguage: "id",
          keywords: post.keywords.join(", "),
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Beranda", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }}
      />
      {post.faq && post.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/blog" className="inline-flex items-center gap-1 font-medium hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Semua artikel
        </Link>
      </nav>

      <header className="mt-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{post.category}</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden />
            {readingMinutes(post)} menit baca
          </span>
        </div>
      </header>

      <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-700">
        {post.intro.map((p, i) => (
          <p key={i}>
            <RichText text={p} />
          </p>
        ))}
      </div>

      <nav aria-label="Daftar isi" className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold text-slate-900">Daftar isi</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-brand-800">
          {post.sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:underline">
                {s.heading}
              </a>
            </li>
          ))}
          {post.faq && (
            <li>
              <a href="#faq" className="hover:underline">
                Pertanyaan yang sering diajukan
              </a>
            </li>
          )}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {post.sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">{s.heading}</h2>
            <div className="mt-3 space-y-4 leading-relaxed text-slate-700">
              {s.body.map((p, i) => (
                <p key={i}>
                  <RichText text={p} />
                </p>
              ))}
              {s.bullets && (
                <ul className="list-disc space-y-1.5 pl-6">
                  {s.bullets.map((b, i) => (
                    <li key={i}>
                      <RichText text={b} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        {post.faq && (
          <section id="faq" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-slate-900">Pertanyaan yang Sering Diajukan</h2>
            <div className="mt-4 space-y-3">
              {post.faq.map((f) => (
                <details key={f.q} className="group rounded-xl border border-slate-200 bg-white p-4">
                  <summary className="cursor-pointer font-semibold text-slate-900">{f.q}</summary>
                  <p className="mt-2 leading-relaxed text-slate-700">
                    <RichText text={f.a} />
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>

      {related.length > 0 && (
        <section className="mt-14" aria-labelledby="paket-terkait">
          <h2 id="paket-terkait" className="text-2xl font-bold text-slate-900">
            Paket yang Cocok untuk Rencana Ini
          </h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            {related.slice(0, 2).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </section>
      )}

      <aside className="mt-12 rounded-2xl bg-brand-50 p-6">
        <p className="text-lg font-semibold text-brand-900">Masih bingung memilih rute?</p>
        <p className="mt-1 text-slate-700">
          Tanya asisten AI di pojok kanan bawah, atau hubungi admin untuk dibuatkan rencana yang sesuai.
        </p>
        <a
          href={whatsappLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-500 px-5 font-semibold text-white transition hover:bg-emerald-600"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Konsultasi via WhatsApp
        </a>
      </aside>

      {more.length > 0 && (
        <section className="mt-14" aria-labelledby="artikel-lain">
          <h2 id="artikel-lain" className="text-2xl font-bold text-slate-900">
            Artikel Lainnya
          </h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
