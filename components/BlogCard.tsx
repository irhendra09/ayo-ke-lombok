import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { readingMinutes } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import PhotoPlaceholder from "./PhotoPlaceholder";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <PhotoPlaceholder gradient={post.gradient} className="h-36" label={post.category} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-700">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-600">{post.description}</p>
        <div className="mt-auto flex flex-wrap gap-4 pt-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {readingMinutes(post)} menit baca
          </span>
        </div>
      </div>
    </Link>
  );
}
