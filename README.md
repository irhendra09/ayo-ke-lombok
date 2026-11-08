# Kala Lombok

Next.js (App Router) + React + Tailwind CSS + Lucide Icons.

## Getting Started

```bash
copy .env.example .env.local
npm install
npm run dev        # http://localhost:3000
```

The FastAPI backend must be available at `BACKEND_URL` (defaults to
`http://localhost:8000`). Next.js proxies all `/api/v1/*` requests through
`next.config.mjs`, so CORS configuration is not required.

## Pages

| Route | Description |
| --- | --- |
| `/` | Redirects to the default English homepage |
| `/en` | English homepage |
| `/id` | Indonesian homepage |
| `/en/kategori/[slug]`, `/en/packages/[id]` | English destination and tour package pages |
| `/kategori/[slug]`, `/packages/[id]` | Indonesian destination and tour package pages |
| `/blog`, `/blog/[slug]` | Indonesian travel guides and SEO articles |
| `/sitemap.xml`, `/robots.txt` | Automatically generated SEO files |
| `/admin/documents` | PDF upload form (`tenant_id`, title, and file) |
| All pages | Floating AI chat widget |

## API Contract

Update `lib/api.ts` if your backend uses a different contract.

- `POST /api/v1/chat`: JSON body `{ tenant_id, customer_id, message }`; response `{ "answer": "..." }` (also accepts `reply` or `response`).
- `POST /api/v1/documents`: `multipart/form-data` fields `tenant_id`, `title`, and `file`; optional JSON response `{ message, chunks }`.

`customer_id` is a UUID stored in `localStorage` (MVP limitation: visitor authentication is not implemented).

## Configuration

- `lib/packages.ts`: tour package data is based on https://lomboktraveling.id/lombok-tour/ (itineraries and facilities have been rewritten). Confirm prices and inclusions, as the reference does not specify all facilities and some prices differ between listing and detail pages.
- `components/PhotoPlaceholder.tsx`: replace the gradient photo placeholder with real images using `next/image`.
- Set `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_TENANT_ID` in `.env.local`.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain before deployment.

## SEO and Blog

Blog articles are in `lib/blog.ts`. Add a post to the `posts` array to generate its page, sitemap entry, and social image. Internal links use `[text](/path)` and are rendered by `components/RichText.tsx`.

After launch, register the site with Google Search Console, submit `/sitemap.xml`, and configure Google Analytics or Plausible to monitor organic traffic. Review local facts and add original team experience and photos before publishing articles.

## Security Note

`/admin/documents` does not have authentication and is outside the current MVP scope. Do not expose it publicly without access controls (for example, basic authentication at the reverse proxy or an admin login), as anyone could upload documents to the AI knowledge base.
