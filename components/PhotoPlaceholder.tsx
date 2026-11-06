"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera } from "lucide-react";

export default function PhotoPlaceholder({
  image,
  gradient,
  label,
  className = "",
  priority = false,
}: {
  image?: string;
  gradient?: string;
  label?: string;
  className?: string;
  priority?: boolean;
}) {
  const [error, setError] = useState(false);
  const fallbackGradient = gradient || "from-sky-500 via-teal-500 to-emerald-500";

  if (image && !error) {
    return (
      <div className={`relative overflow-hidden bg-slate-100 ${className}`} role="img" aria-label={label ?? "Foto wisata Lombok"}>
        <Image
          src={image}
          alt={label ?? "Wisata Lombok"}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setError(true)}
        />
        {/* Subtle dark gradient overlay at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
        {label && (
          <span className="absolute bottom-3 left-3 rounded-full bg-slate-900/60 backdrop-blur-md px-3 py-1 text-xs font-medium text-white shadow-xs">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-end overflow-hidden bg-gradient-to-br ${fallbackGradient} ${className}`}
      role="img"
      aria-label={label ?? "Foto wisata Lombok"}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.35),transparent_45%)]" />
      <Camera className="absolute right-3 top-3 h-5 w-5 text-white/70" aria-hidden />
      {label && (
        <span className="relative m-3 rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
