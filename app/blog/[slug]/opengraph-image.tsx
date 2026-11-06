import { ImageResponse } from "next/og";
import { getPost, posts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/site";

export const alt = "Artikel blog Ayo ke Lombok";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          background: "linear-gradient(135deg, #0ea5e9 0%, #14b8a6 55%, #059669 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, opacity: 0.9 }}>
          {SITE_NAME} · {post?.category ?? "Blog"}
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 800, lineHeight: 1.15 }}>
          {post?.title ?? "Blog Wisata Lombok"}
        </div>
        <div style={{ display: "flex", fontSize: 28, opacity: 0.85 }}>Panduan wisata Lombok</div>
      </div>
    ),
    size,
  );
}
