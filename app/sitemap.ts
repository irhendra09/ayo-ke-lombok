import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { packages } from "@/lib/packages";
import { categories } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts.map((p) => p.updated ?? p.date).sort().at(-1);

  return [
    // English is the default landing page.
    { url: absoluteUrl("/en"), changeFrequency: "weekly", priority: 1.0 },
    { url: absoluteUrl("/id"), changeFrequency: "weekly", priority: 0.9 },
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...categories.map((c) => ({
      url: absoluteUrl(`/kategori/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...packages.map((p) => ({
      url: absoluteUrl(`/packages/${p.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updated ?? p.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),

    ...categories.map((c) => ({
      url: absoluteUrl(`/en/kategori/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...packages.map((p) => ({
      url: absoluteUrl(`/en/packages/${p.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
