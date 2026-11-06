import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import type { TravelPackage } from "@/lib/packages";
import { formatDuration, formatRupiah } from "@/lib/format";
import PhotoPlaceholder from "./PhotoPlaceholder";

export default function PackageCard({
  pkg,
  lang = "id",
}: {
  pkg: TravelPackage;
  lang?: "id" | "en";
}) {
  const isEn = lang === "en";
  const linkHref = isEn ? `/en/packages/${pkg.id}` : `/packages/${pkg.id}`;
  const approxUsd = Math.round(pkg.price / 16000);

  const durationLabel = isEn
    ? pkg.durationNights > 0
      ? `${pkg.durationDays}D / ${pkg.durationNights}N`
      : `${pkg.durationDays} Full Day`
    : formatDuration(pkg.durationDays, pkg.durationNights);

  return (
    <Link
      href={linkHref}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
    >
      <PhotoPlaceholder
        image={pkg.image}
        gradient={pkg.gradient}
        className="h-48"
        label={pkg.destination}
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug text-slate-900 transition group-hover:text-brand-700">
          {pkg.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{pkg.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-medium text-slate-700">
            <Clock className="h-3.5 w-3.5 text-brand-600" aria-hidden />
            {durationLabel}
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-slate-700">
            <MapPin className="h-3.5 w-3.5 text-rose-500" aria-hidden />
            {pkg.destination}
          </span>
        </div>

        <div className="mt-auto border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-500">{isEn ? "Starting from" : "Mulai dari"}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-extrabold text-brand-700">
              {formatRupiah(pkg.price)}
              <span className="text-xs font-normal text-slate-500">
                {isEn ? " / person" : " / orang"}
              </span>
            </p>
            {isEn && (
              <span className="text-xs font-semibold text-slate-400">
                (~${approxUsd} USD)
              </span>
            )}
          </div>
          {pkg.priceNote && <p className="mt-1 text-xs text-amber-700">{pkg.priceNote}</p>}
        </div>
      </div>
    </Link>
  );
}
