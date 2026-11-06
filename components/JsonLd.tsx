// Menyisipkan structured data (schema.org) untuk mesin pencari.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // "<" di-escape agar isi tidak bisa menutup tag script lebih awal.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
