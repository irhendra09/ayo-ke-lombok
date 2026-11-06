import { Search } from "lucide-react";
import { DESTINATIONS } from "@/lib/packages";

type Props = {
  q?: string;
  destination?: string;
  duration?: string;
  lang?: "id" | "en";
};

export default function Hero({
  q = "",
  destination = "",
  duration = "",
  lang = "id",
}: Props) {
  const isEn = lang === "en";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-teal-500 to-emerald-600">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.35),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(253,230,138,0.35),transparent_40%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-24">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/80 sm:text-sm sm:mb-3">
          {isEn ? "The Island of a Thousand Mosques & Tropical Gilis" : "Pulau Seribu Masjid & Kepulauan Tropis"}
        </p>
        <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
          {isEn
            ? "Discover your dream Lombok & Gili Islands vacation"
            : "Temukan paket wisata Lombok impianmu"}
        </h1>
        <p className="mt-3 max-w-xl text-base text-white/90 sm:mt-4 sm:text-lg">
          {isEn
            ? "From turtle snorkeling in the three Gilis to the exotic Pink Beach and Mandalika coast. Have questions? Chat with our AI tour advisor anytime."
            : "Dari snorkeling di Gili sampai Pantai Pink dan Mandalika. Punya pertanyaan? Tanya asisten AI kami kapan saja."}
        </p>

        <form
          action={isEn ? "/en#paket" : "/#paket"}
          method="get"
          className="mt-6 grid gap-2.5 rounded-2xl bg-white p-2.5 shadow-xl sm:mt-10 sm:gap-3 sm:p-3 sm:grid-cols-[1fr_auto_auto_auto]"
        >
          <label className="relative block">
            <span className="sr-only">{isEn ? "Search tour" : "Cari paket"}</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              name="q"
              defaultValue={q}
              placeholder={isEn ? "Search tour, e.g. snorkeling, pink beach..." : "Cari paket, mis. snorkeling, pantai pink..."}
              className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </label>

          <label>
            <span className="sr-only">{isEn ? "Destination" : "Destinasi"}</span>
            <select
              name="destination"
              defaultValue={destination}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            >
              <option value="">{isEn ? "All destinations" : "Semua destinasi"}</option>
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">{isEn ? "Duration" : "Durasi"}</span>
            <select
              name="duration"
              defaultValue={duration}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            >
              <option value="">{isEn ? "All durations" : "Semua durasi"}</option>
              <option value="1">{isEn ? "1 Day" : "1 hari"}</option>
              <option value="2-3">{isEn ? "2-3 Days" : "2-3 hari"}</option>
              <option value="4+">{isEn ? "4+ Days" : "4+ hari"}</option>
            </select>
          </label>

          <button
            type="submit"
            className="h-12 rounded-xl bg-brand-600 px-6 font-semibold text-white transition hover:bg-brand-700"
          >
            {isEn ? "Search" : "Cari"}
          </button>
        </form>
      </div>
    </section>
  );
}
