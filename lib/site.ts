export const SITE_NAME = "Kala Lombok";

// Isi NEXT_PUBLIC_SITE_URL dengan domain produksi (mis. https://lomboktravel.id)
// agar canonical, sitemap, dan gambar sosial memakai URL yang benar.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
