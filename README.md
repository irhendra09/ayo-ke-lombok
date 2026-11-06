# Ayo ke Lombok

Next.js (App Router) + React + Tailwind CSS + Lucide Icons.

## Menjalankan

```bash
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000
```

Backend FastAPI harus berjalan di `BACKEND_URL` (default `http://localhost:8000`).
Semua request `/api/v1/*` di-proxy oleh Next.js (lihat `next.config.mjs`), jadi
tidak perlu mengatur CORS.

## Halaman

| Route | Fungsi |
| --- | --- |
| `/` | Landing page: hero + filter (cari, destinasi, durasi) + grid paket |
| `/packages/[id]` | Detail paket: galeri, harga, include/exclude, itinerary per hari, tombol WhatsApp |
| `/blog`, `/blog/[slug]` | Blog SEO: 7 artikel, JSON-LD (BlogPosting, FAQPage, BreadcrumbList), daftar isi, tautan ke paket |
| `/sitemap.xml`, `/robots.txt` | Dibuat otomatis (`app/sitemap.ts`, `app/robots.ts`); `/admin` dikecualikan |
| `/admin/documents` | Form unggah PDF (tenant_id, judul, file) |
| (semua halaman) | Widget chat AI mengambang di kanan bawah |

## Kontrak API yang diasumsikan

Sesuaikan `lib/api.ts` jika backend Anda berbeda.

- `POST /api/v1/chat`, body JSON `{ tenant_id, customer_id, message }`, respons `{ "answer": "..." }`
  (juga diterima `reply` atau `response`).
- `POST /api/v1/documents`, `multipart/form-data` dengan field `tenant_id`, `title`, `file`.
  Respons JSON opsional `{ message, chunks }`.

`customer_id` berupa UUID yang disimpan di `localStorage` (sesuai batasan MVP: tanpa autentikasi pengunjung).

## Yang perlu Anda ganti

- `lib/packages.ts`: data paket disusun mengacu pada https://lomboktraveling.id/lombok-tour/ (teks ditulis ulang). Harga dan daftar "include" **perlu Anda konfirmasi**, karena halaman referensi tidak merinci fasilitas dan beberapa harga berbeda antara halaman daftar dan halaman detail.
- `components/PhotoPlaceholder.tsx`: gradient pengganti foto. Ganti dengan `next/image` dan foto asli.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` dan `NEXT_PUBLIC_TENANT_ID` di `.env.local`.

## SEO & blog

- Artikel ada di `lib/blog.ts`. Tambah artikel baru dengan menambah satu objek di array `posts`; halaman,
  sitemap, dan gambar sosial dibuat otomatis. Tautan internal ditulis `[teks](/path)`.
- Set `NEXT_PUBLIC_SITE_URL` ke domain produksi sebelum deploy, supaya canonical dan sitemap benar.
- Setelah live: daftarkan situs di Google Search Console, kirim `/sitemap.xml`, dan pasang Google Analytics
  atau Plausible untuk memantau trafik organik.
- Artikel sudah ditulis orisinal, tetapi tinjau fakta lokal dan tambahkan foto serta pengalaman asli tim Anda.

## Catatan keamanan

Halaman `/admin/documents` **belum memiliki autentikasi** (di luar cakupan MVP pada PRD). Jangan
dipublikasikan ke internet tanpa melindunginya (mis. basic auth di reverse proxy, atau login admin),
karena siapa pun bisa mengunggah dokumen ke basis pengetahuan AI.
