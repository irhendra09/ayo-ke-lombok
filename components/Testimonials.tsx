import { Star, CheckCircle, Quote } from "lucide-react";

export type Testimonial = {
  id: string;
  name: string;
  origin: string;
  packageTaken: string;
  rating: number;
  date: string;
  text: string;
  travelerType: string;
};

export const testimonialsID: Testimonial[] = [
  {
    id: "1",
    name: "Dimas & Dian",
    origin: "Jakarta Selatan",
    packageTaken: "Lombok Wonderful Tour 4D3N",
    rating: 5,
    date: "Oktober 2026",
    travelerType: "Pasangan (Honeymoon)",
    text: "Puas banget! Driver Pak Wayan sangat ramah dan tahu spot foto tersembunyi di Bukit Merese yang sepi. Private boat ke Gili juga tepat waktu dan peralatannya bersih. Sangat direkomendasikan untuk yang mau liburan tanpa ribet.",
  },
  {
    id: "2",
    name: "Kel. Budi Santoso",
    origin: "Surabaya",
    packageTaken: "Trip Wisata Lombok 5D4N",
    rating: 5,
    date: "September 2026",
    travelerType: "Keluarga (6 Orang)",
    text: "Bawa orang tua dan anak kecil awalnya khawatir capek, tapi tim Ayo ke Lombok mengatur ritme perjalanan dengan sangat santai. Pasir di Pantai Pink dan makan siang ikan bakarnya juara! Mobil HiAce-nya juga dingin dan bersih.",
  },
  {
    id: "3",
    name: "Rina Marlina & Sahabat",
    origin: "Bandung",
    packageTaken: "Gili Explore Trip 1 Hari",
    rating: 5,
    date: "Oktober 2026",
    travelerType: "Trip Sahabat (4 Orang)",
    text: "Snorkeling di spot patung bawah laut Gili Meno dan berenang bareng penyu di Turtle Point pengalaman tak terlupakan! Guide-nya sigap bantu ambil foto underwater pake action cam. Next trip pasti pakai travel ini lagi.",
  },
  {
    id: "4",
    name: "PT. Graha Pratama (Gathering)",
    origin: "Tangerang",
    packageTaken: "Paket Gathering Lombok 4D3N",
    rating: 5,
    date: "Agustus 2026",
    travelerType: "Rombongan Kantor (35 Orang)",
    text: "Acara gathering tahunan kantor berjalan sukses luar biasa. Fun games di Gili Trawangan seru dan gala dinner hotel ditangani dengan rapi. Admin responsif melayani perubahan jadwal rombongan kami.",
  },
];

export const testimonialsEN: Testimonial[] = [
  {
    id: "en-1",
    name: "Liam & Sarah H.",
    origin: "Melbourne, Australia",
    packageTaken: "Lombok Wonderful Tour 4D3N",
    rating: 5,
    date: "October 2026",
    travelerType: "Couple Vacation",
    text: "Unbelievable experience! Our driver Wayan was on-time, courteous, and spoke great English. The private boat around the 3 Gilis was immaculate and we swam with sea turtles right off Gili Meno. Highly recommended!",
  },
  {
    id: "en-2",
    name: "Mark & Jessica K.",
    origin: "Singapore",
    packageTaken: "3 Gilis Island Hopping 1 Day",
    rating: 5,
    date: "September 2026",
    travelerType: "Day Tour Excursion",
    text: "We booked the 1-day private Gili tour. Zero hassle from airport pickup to boat charter. The snorkeling guide brought an underwater camera and took fantastic photos of us with the underwater statues. 10/10!",
  },
  {
    id: "en-3",
    name: "The Jensen Family",
    origin: "Perth, Australia",
    packageTaken: "Secret Gilis (Gili Nanggu) 1 Day",
    rating: 5,
    date: "October 2026",
    travelerType: "Family (2 Kids)",
    text: "Gili Nanggu was the highlight of our Indonesia trip. Super calm waters, safe for the kids to snorkel straight off the sand, and the grilled fish lunch on Gili Sudak was delicious.",
  },
  {
    id: "en-4",
    name: "Thomas B.",
    origin: "Munich, Germany",
    packageTaken: "Complete Lombok Tour 5D4N",
    rating: 5,
    date: "August 2026",
    travelerType: "Adventure & Culture",
    text: "From trekking Tiu Kelep waterfall in Senaru to the breathtaking pink sands of Tangsi Beach. Flawless logistics, transparent pricing, and warm local hospitality throughout.",
  },
];

export default function Testimonials({ lang = "id" }: { lang?: "id" | "en" }) {
  const isEn = lang === "en";
  const list = isEn ? testimonialsEN : testimonialsID;

  return (
    <section className="mx-auto max-w-6xl px-4 pt-20" aria-labelledby="testimoni-heading">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-semibold text-emerald-800">
          <CheckCircle className="h-3.5 w-3.5" aria-hidden />
          {isEn ? "Authentic Traveler Feedback" : "Pengalaman Nyata Wisatawan"}
        </div>
        <h2 id="testimoni-heading" className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          {isEn ? "Trusted by Over 500+ Happy Travelers" : "Dipercaya Lebih dari 500+ Pelancong"}
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          {isEn
            ? "Read genuine stories and feedback from guests who explored Lombok & the Gilis with us."
            : "Simak cerita dan pengalaman langsung dari para wisatawan yang telah menjelajahi keindahan Lombok bersama kami."}
        </p>

        {/* Aggregate Badge */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-2xs">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400" aria-hidden />
            ))}
          </div>
          <span className="text-sm font-bold text-slate-800">4.9 / 5.0</span>
          <span className="text-xs text-slate-500">
            {isEn ? "from 280+ verified traveler reviews" : "dari 280+ ulasan terverifikasi"}
          </span>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((t) => (
          <div
            key={t.id}
            className="relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:shadow-md"
          >
            <div>
              <Quote className="h-6 w-6 text-brand-200 mb-2" aria-hidden />
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400" aria-hidden />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                &ldquo;{t.text}&rdquo;
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4">
              <p className="font-bold text-sm text-slate-900">{t.name}</p>
              <p className="text-xs text-slate-500">{t.origin}</p>
              <div className="mt-2 flex items-center justify-between text-2xs text-brand-700 font-medium bg-brand-50/70 px-2.5 py-1 rounded-md">
                <span>{t.packageTaken}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
