import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-slate-600">Paket atau halaman yang Anda cari tidak tersedia.</p>
      <Link
        href="/#paket"
        className="mt-6 inline-block rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
      >
        Lihat semua paket
      </Link>
    </div>
  );
}
