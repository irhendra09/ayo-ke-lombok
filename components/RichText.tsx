import Link from "next/link";
import { Fragment } from "react";

// Mengubah [teks](/path-internal) menjadi tautan internal. Hanya path yang
// diawali "/" yang diizinkan, sehingga konten tidak bisa menyisipkan tautan luar.
export default function RichText({ text }: { text: string }) {
  const re = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(<Fragment key={`t${i}`}>{text.slice(last, match.index)}</Fragment>);
    nodes.push(
      <Link key={`l${i}`} href={match[2]} className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800">
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
    i++;
  }
  if (last < text.length) nodes.push(<Fragment key="end">{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}
