import { packages, TravelPackage } from "./packages";

export type CategoryFAQ = {
  question: string;
  answer: string;
};

export type Category = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  heroTagline: string;
  intro: string;
  highlights: string[];
  tips: string[];
  filterFn: (pkg: TravelPackage) => boolean;
  faqs: CategoryFAQ[];

  // Versi Bahasa Inggris
  name_en?: string;
  metaTitle_en?: string;
  metaDescription_en?: string;
  heading_en?: string;
  heroTagline_en?: string;
  intro_en?: string;
  highlights_en?: string[];
  tips_en?: string[];
  faqs_en?: CategoryFAQ[];
};

export const categories: Category[] = [
  {
    slug: "gili-islands",
    name: "Gili Islands (Trawangan, Meno, Air)",
    name_en: "Gili Islands (Trawangan, Meno & Air)",
    metaTitle: "Paket Wisata Gili Trawangan, Meno & Air | Tour Snorkeling Lombok",
    metaTitle_en: "Gili Islands Tour Packages | Snorkeling & Island Hopping Lombok",
    metaDescription:
      "Pilihan paket tour Gili Trawangan, Meno, dan Air lengkap dengan boat charter, alat snorkeling patung bawah laut, dan sepeda keliling pulau.",
    metaDescription_en:
      "Discover the iconic Gili Islands: Trawangan, Meno, and Air. Private boat charters, underwater statue snorkeling, and sea turtles.",
    heading: "Paket Wisata & Snorkeling Tiga Gili",
    heading_en: "Three Gilis Snorkeling & Island Hopping Tours",
    heroTagline: "Eksplorasi trio pulau legendaris Lombok dengan pasir putih dan biota laut spektakuler.",
    heroTagline_en: "Explore Lombok's trio of idyllic motor-free islands with pristine coral reefs and turtles.",
    intro:
      "Kepulauan Gili (Gili Trawangan, Gili Meno, dan Gili Air) adalah magnet wisata utama di Lombok. Terkenal tanpa kendaraan bermotor, Anda dapat menikmati suasana santai bersepeda, snorkeling bersama penyu di Turtle Point, serta berfoto di patung bawah laut karya Jason deCaires Taylor.",
    intro_en:
      "The Gili Islands (Gili Trawangan, Gili Meno, and Gili Air) are Lombok's premier tropical haven. With no motorized vehicles allowed, you can unwind cycling around the island, snorkel with sea turtles at Turtle Point, and swim alongside the famous underwater sculptures of Jason deCaires Taylor.",
    highlights: [
      "Snorkeling patung bawah laut Gili Meno & penyu Turtle Point",
      "Sunset ikonik dengan pemandangan Gunung Agung Bali",
      "Keliling pulau menggunakan sepeda santai atau Cidomo",
      "Private boat charter antar pulau yang aman dan nyaman",
    ],
    highlights_en: [
      "Underwater statue snorkeling in Gili Meno & swimming with sea turtles",
      "Spectacular golden sunsets overlooking Bali's Mount Agung",
      "Scenic island bike rides or traditional horse cart (Cidomo)",
      "Safe, private speed boat or wooden boat charters between islands",
    ],
    tips: [
      "Bawa dry bag untuk mengamankan gadget saat berpindah antar pulau dengan boat.",
      "Gunakan tabir surya aman terumbu karang (reef-safe sunscreen) saat snorkeling.",
      "Waktu terbaik berkunjung adalah pagi hingga sore saat ombak tenang.",
    ],
    tips_en: [
      "Bring a dry bag to protect your electronics during island transfers.",
      "Use reef-safe sunscreen to protect marine life and coral reefs.",
      "Morning to early afternoon offers the calmest waters and clearest visibility.",
    ],
    filterFn: (pkg) =>
      pkg.destination === "Gili Islands" ||
      pkg.title.toLowerCase().includes("gili") ||
      pkg.highlights.some((h) => h.toLowerCase().includes("gili")),
    faqs: [
      {
        question: "Apakah paket tour Gili sudah termasuk perlengkapan snorkeling?",
        answer:
          "Sebagian besar paket sudah mencakup sewa kapal private boat, pelampung keselamatan (life jacket), dan masker snorkeling. Pemandu lokal juga akan mendampingi Anda di spot-spot terbaik.",
      },
      {
        question: "Bagaimana cara menyeberang ke Gili Trawangan dalam paket ini?",
        answer:
          "Penyeberangan dilakukan melalui pelabuhan resmi seperti Teluk Kodek atau Bangsal menggunakan private speed boat atau wooden boat yang sudah termasuk dalam paket perjalanan.",
      },
    ],
    faqs_en: [
      {
        question: "Are snorkeling gear and life vests included in the Gili tour?",
        answer:
          "Yes, our tour packages include private boat charter, sanitized snorkeling masks, life vests, and an experienced local snorkeling guide.",
      },
      {
        question: "How do we cross to Gili Trawangan?",
        answer:
          "We arrange direct private speed boat or wooden boat transfers from Teluk Kodek or Bangsal Harbor directly included in your itinerary.",
      },
    ],
  },
  {
    slug: "pantai-pink",
    name: "Pantai Pink Lombok",
    name_en: "Pink Beach (Tangsi) Lombok",
    metaTitle: "Paket Tour Pantai Pink Lombok & Pulau Pasir | Wisata Eksotis Lombok Timur",
    metaTitle_en: "Pink Beach Lombok Tour Packages | Sand Island & Gili Petelu",
    metaDescription:
      "Jelajahi keajaiban Pantai Pink (Tangsi) Lombok Timur, Pulau Pasir timbul, dan snorkeling di Gili Petelu. Booking paket tour private terbaik.",
    metaDescription_en:
      "Visit the rare Pink Beach (Tangsi) in East Lombok, tidal sand islands, and vibrant coral snorkeling in Gili Petelu with private boat charters.",
    heading: "Paket Tour Eksotis Pantai Pink & Pulau Pasir",
    heading_en: "Exotic Pink Beach & Sand Island Excursion",
    heroTagline: "Sensasi pasir merah muda unik berpadu dengan gugusan pulau karang Lombok Timur.",
    heroTagline_en: "Discover one of the world's few natural pink sand beaches set against turquoise bays.",
    intro:
      "Pantai Pink (Pantai Tangsi) di Kabupaten Lombok Timur terkenal dengan butiran pasirnya yang berwarna merah muda merona—hasil percampuran alami pasir putih dengan serpihan karang merah (Foraminifera). Perjalanan melintasi laut dari Pelabuhan Tanjung Luar akan membawa Anda ke spot tersembunyi seperti Pulau Pasir timbul dan terumbu karang Gili Petelu.",
    intro_en:
      "Pink Beach (Tangsi Beach) in East Lombok is renowned for its striking pink hues, created by crushed red organ pipe corals blending naturally with pristine white sand. Crossing from Tanjung Luar harbor unlocks hidden gems including sandbar islands and untouched coral gardens at Gili Petelu.",
    highlights: [
      "Warna pasir pink alami yang langka di dunia",
      "Mampir ke Pulau Pasir timbul di tengah lautan biru",
      "Snorkeling jernih dengan ribuan ikan hias di Gili Petelu & Gili Gembir",
      "Santap siang ikan bakar segar khas nelayan lokal",
    ],
    highlights_en: [
      "Rare natural pink sand beach with breathtaking panoramic cliffs",
      "Visit the disappearing sandbar island in the middle of the sea",
      "Crystal-clear snorkeling with vibrant tropical fish at Gili Petelu",
      "Freshly grilled seafood lunch prepared by local fishermen",
    ],
    tips: [
      "Waktu terbaik melihat warna pink pasir paling kontras adalah saat matahari terik (sekitar pukul 11.00 - 14.00).",
      "Kunjungi Pulau Pasir saat air laut sedang surut untuk mendapatkan foto hamparan pasir timbul.",
    ],
    tips_en: [
      "The pink hues are most vivid between 11:00 AM and 2:00 PM under direct sunlight.",
      "We coordinate boat departures with tidal charts so you can step onto the sandbar at peak low tide.",
    ],
    filterFn: (pkg) =>
      pkg.destination === "Pantai Pink" ||
      pkg.title.toLowerCase().includes("pink") ||
      pkg.highlights.some((h) => h.toLowerCase().includes("pink")),
    faqs: [
      {
        question: "Mengapa pasir di Pantai Pink bisa berwarna merah muda?",
        answer:
          "Warna pink berasal dari mikroorganisme foraminifera yang memiliki cangkang merah muda, hancur oleh ombak lalu bercampur dengan pasir pantai putih alami.",
      },
    ],
    faqs_en: [
      {
        question: "Why is the sand pink at Tangsi Beach?",
        answer:
          "The pink color is produced by microscopic organisms called foraminifera with red shells that wash ashore and blend seamlessly with fine white sand.",
      },
    ],
  },
  {
    slug: "gili-nanggu",
    name: "Gili Nanggu (Lombok Barat)",
    name_en: "Gili Nanggu (West Lombok)",
    metaTitle: "Paket Wisata Gili Nanggu, Sudak & Kedis | Tour Snorkeling Akuarium Alami",
    metaTitle_en: "Gili Nanggu Snorkeling Tour | Secret Gilis of West Lombok",
    metaDescription:
      "Nikmati ketenangan snorkeling di Gili Nanggu 'akuarium alami Lombok', santap ikan bakar di Gili Sudak, dan foto di pulau mungil Gili Kedis.",
    metaDescription_en:
      "Experience peaceful snorkeling in Gili Nanggu 'the natural aquarium of Lombok', grilled fish on Gili Sudak, and tiny Gili Kedis.",
    heading: "Paket Snorkeling Gili Nanggu, Sudak & Kedis",
    heading_en: "Gili Nanggu, Sudak & Tiny Gili Kedis Snorkeling Tour",
    heroTagline: "Surga bawah laut tersembunyi di Sekotong Lombok Barat yang tenang dan masih asri.",
    heroTagline_en: "A serene, crowd-free tropical underwater paradise in pristine Sekotong, West Lombok.",
    intro:
      "Berbeda dengan Gili Trawangan yang ramai, gugusan Gili Nanggu di Sekotong (Lombok Barat) menawarkan suasana pulau privat yang damai. Dikenal sebagai 'akuarium alami', Anda cukup melangkah beberapa meter dari bibir pantai untuk dikelilingi ratusan ikan warna-warni yang jinak.",
    intro_en:
      "Far from the bustling crowds of North Lombok, the southern secret Gilis in Sekotong offer pure serenity. Dubbed Lombok's 'natural aquarium', you step directly into shallow waters surrounded by tame, colorful reef fish.",
    highlights: [
      "Snorkeling mudah langsung dari bibir pantai tanpa ombak besar",
      "Makan siang ikan bakar bumbu khas Sasak di pulau Gili Sudak",
      "Singgah di Gili Kedis, pulau pasir mungil berbentuk hati",
      "Sangat aman dan ramah untuk anak-anak maupun lansia",
    ],
    highlights_en: [
      "Effortless shore snorkeling in calm, sheltered waters",
      "Delicious beachside grilled fish lunch on Gili Sudak",
      "Photogenic heart-shaped miniature islet of Gili Kedis",
      "Ideal for families, children, and beginners",
    ],
    tips: [
      "Bawa biskuit atau roti kering untuk memberi makan ikan saat snorkeling (fish feeding).",
      "Gili Nanggu tidak memiliki kendaraan apa pun, cocok untuk liburan relaksasi penuh ketenangan.",
    ],
    tips_en: [
      "Bring safe fish food or breadcrumbs to attract friendly reef fish right to your hands.",
      "The island has zero motorized transport—ideal for total relaxation.",
    ],
    filterFn: (pkg) =>
      pkg.destination === "Gili Nanggu" ||
      pkg.title.toLowerCase().includes("nanggu") ||
      pkg.highlights.some((h) => h.toLowerCase().includes("nanggu")),
    faqs: [
      {
        question: "Apakah pemula dan anak-anak bisa snorkeling di Gili Nanggu?",
        answer:
          "Sangat bisa. Ombak di sekitar Gili Nanggu sangat tenang karena berada di teluk yang terlindung, dan terumbu karang sudah terlihat jelas hanya beberapa langkah dari pantai dangkal.",
      },
    ],
    faqs_en: [
      {
        question: "Is Gili Nanggu suitable for beginner snorkelers and children?",
        answer:
          "Absolutely. It is one of the safest snorkeling spots in Indonesia with very gentle waves and shallow coral reefs starting just meters from the shore.",
      },
    ],
  },
  {
    slug: "keliling-lombok",
    name: "Keliling Lombok & Budaya Sasak",
    name_en: "Lombok Island Tour & Sasak Culture",
    metaTitle: "Paket Tour Keliling Lombok Lengkap | Budaya Sasak, Mandalika & Air Terjun",
    metaTitle_en: "Complete Lombok Island Tour | Sasak Tribe, Mandalika & Waterfalls",
    metaDescription:
      "Paket tour lengkap keliling pulau Lombok: Desa Adat Sade, tenun Sukarara, Sirkuit Mandalika, Bukit Merese, dan Air Terjun Tiu Kelep.",
    metaDescription_en:
      "Comprehensive Lombok tours: Sade traditional Sasak village, Sukarara weavers, Mandalika MotoGP circuit, Merese sunset hill, and Tiu Kelep waterfall.",
    heading: "Paket Wisata Lengkap Keliling Lombok",
    heading_en: "Full Lombok Exploration: Heritage, Hills & Waterfalls",
    heroTagline: "Perpaduan kekayaan tradisi suku Sasak, megahnya Sirkuit Mandalika, dan alam pegunungan.",
    heroTagline_en: "A seamless blend of ancient Sasak customs, dramatic coastlines, and mountain jungle waterfalls.",
    intro:
      "Bagi Anda yang ingin mencicipi seluruh pesona Lombok dalam satu perjalanan terpadu, paket Keliling Lombok menghadirkan pengalaman komplit: mulai dari mempelajari filosofi rumah adat Suku Sasak di Desa Sade, menyaksikan kain tenun di Sukarara, sunset spektakuler di Bukit Merese, hingga sejuknya air terjun Sendang Gile di kaki Rinjani.",
    intro_en:
      "For travelers wanting to experience the complete spectrum of Lombok, our island tours combine rich Sasak heritage at Sade Village, handcrafted textiles at Sukarara, sunset panoramas from Bukit Merese, and the thunderous cascades of Tiu Kelep at Mount Rinjani's foothills.",
    highlights: [
      "Kunjungan edukatif ke Desa Tradisional Sade dan Sukarara",
      "Foto di Sirkuit Internasional Pertamina Mandalika & Pantai Kuta",
      "Pemandangan 360 derajat di puncak Bukit Merese",
      "Kuliner legendaris: Ayam Taliwang dan Sate Rembiga asli Lombok",
    ],
    highlights_en: [
      "Immersive cultural visits to Sade Sasak village and Sukarara weaving center",
      "Photo stops at Pertamina Mandalika International Circuit & Kuta beach",
      "360-degree ocean panoramas atop rolling Bukit Merese hill",
      "Authentic culinary highlights including signature grilled Lombok dishes",
    ],
    tips: [
      "Siapkan pakaian santun saat mengunjungi desa adat Sasak.",
      "Gunakan alas kaki anti-selip jika itinerary mencakup trekking air terjun Senaru/Tiu Kelep.",
    ],
    tips_en: [
      "Dress respectfully with covered shoulders when visiting indigenous Sasak cultural villages.",
      "Wear water sandals or anti-slip shoes for waterfall jungle walks in Senaru.",
    ],
    filterFn: (pkg) =>
      pkg.destination === "Keliling Lombok" ||
      pkg.title.toLowerCase().includes("keliling") ||
      pkg.durationDays >= 3,
    faqs: [
      {
        question: "Apakah paket ini cocok untuk rombongan keluarga atau instansi?",
        answer:
          "Ya, paket keliling Lombok dirancang sangat fleksibel dengan armada bus pariwisata atau HiAce ber-AC, pemandu profesional, dan restoran terpilih yang nyaman untuk rombongan besar.",
      },
    ],
    faqs_en: [
      {
        question: "Is this package suitable for families and private groups?",
        answer:
          "Yes, we provide private, spacious air-conditioned vans (Toyota Innova or HiAce) with flexible stops tailored to your pace.",
      },
    ],
  },
  {
    slug: "tour-harian",
    name: "One Day Trip (Tour Harian)",
    name_en: "One Day Trips (Daily Excursions)",
    metaTitle: "Paket One Day Trip Lombok Murah | Tour Harian Praktis & Privat",
    metaTitle_en: "Lombok One Day Tours | Private Day Trips & Airport Pickups",
    metaDescription:
      "Wisata praktis 1 hari di Lombok: Day trip Gili Trawangan, Pantai Pink, atau Gili Nanggu. Penjemputan hotel/bandara fleksibel.",
    metaDescription_en:
      "Convenient private day trips in Lombok: Gili Trawangan, Pink Beach, or Gili Nanggu. Flexible airport and hotel transfers included.",
    heading: "Paket One Day Trip (Tour Harian) Lombok",
    heading_en: "Flexible Lombok One Day Excursions",
    heroTagline: "Solusi liburan fleksibel dan hemat waktu tanpa harus menginap dengan paket terikat.",
    heroTagline_en: "The ideal solution for travelers with limited time wanting private, premium day trips.",
    intro:
      "Punya waktu liburan singkat atau sedang ada agenda kerja di Mataram? Paket One Day Trip Lombok adalah solusi tepat untuk berwisata seharian penuh tanpa repot. Kami jemput langsung di hotel atau bandara, dan Anda langsung menikmati destinasi impian dengan fasilitas private.",
    intro_en:
      "Short on time or in Lombok on a business stopover? Our private daily excursions maximize your vacation without requiring overnight commitments. We handle seamless door-to-door hotel or airport pickups.",
    highlights: [
      "Penjemputan dan pengantaran fleksibel langsung dari hotel atau bandara",
      "Jadwal privat yang tidak digabung dengan peserta lain",
      "Cocok untuk solo traveler, pasangan, maupun rombongan dinas",
      "Hemat biaya dan efisien waktu",
    ],
    highlights_en: [
      "Door-to-door hotel and Lombok International Airport transfers",
      "100% private charters—no waiting for outside participants",
      "Ideal for couples, solo adventurers, and corporate travelers",
      "Maximum sightseeing efficiency in a single unforgettable day",
    ],
    tips: [
      "Pilih penerbangan pagi sebelum pukul 09.00 jika ingin langsung tur dari bandara.",
      "Konfirmasi titik penjemputan dan barang bawaan ke admin agar armada disiapkan sesuai kapasitas.",
    ],
    tips_en: [
      "Arrive on an early morning flight (before 9:00 AM) to enjoy the full day trip directly from the airport.",
      "Let us know your luggage volume so we assign an appropriately sized vehicle.",
    ],
    filterFn: (pkg) => pkg.durationDays === 1,
    faqs: [
      {
        question: "Apakah bisa request rute khusus di luar paket satu hari?",
        answer:
          "Tentu bisa. Anda dapat mengkonsultasikan destinasi yang ingin dikunjungi kepada admin kami via WhatsApp untuk dibuatkan itinerary custom seharian.",
      },
    ],
    faqs_en: [
      {
        question: "Can I customize the day trip route?",
        answer:
          "Yes, we can tailor the timing and stops to match your flight schedule or personal preferences.",
      },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getPackagesByCategory(category: Category): TravelPackage[] {
  return packages.filter(category.filterFn);
}
