import type { Metadata } from "next";
import AdminUploadForm from "@/components/AdminUploadForm";

export const metadata: Metadata = {
  title: "Admin: Unggah Dokumen",
  robots: { index: false, follow: false },
};

export default function AdminDocumentsPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900">Unggah Dokumen Travel</h1>
      <p className="mt-2 text-slate-600">
        Unggah brosur, itinerary, daftar harga, atau syarat &amp; ketentuan dalam format PDF. Teks akan
        diproses dan dipakai asisten AI untuk menjawab pertanyaan pengunjung.
      </p>
      <div className="mt-6">
        <AdminUploadForm />
      </div>
    </div>
  );
}
