// DATA PAKET: disusun mengacu pada daftar paket di
// https://lomboktraveling.id/lombok-tour/ (itinerary dan fasilitas ditulis ulang).

export type ItineraryDay = {
  day: number;
  title: string;
  items: string[];
};

export type TravelPackage = {
  id: string;
  title: string;
  title_en?: string;
  tagline: string;
  tagline_en?: string;
  destination: string;
  destination_en?: string;
  durationDays: number;
  durationNights: number;
  price: number;
  priceNote?: string;
  priceNote_en?: string;
  gradient: string; // kelas Tailwind untuk fallback placeholder foto
  image?: string; // URL foto utama berkualitas tinggi
  galleryImages?: string[]; // Foto pendukung galeri
  highlights: string[];
  highlights_en?: string[];
  include: string[];
  include_en?: string[];
  exclude: string[];
  exclude_en?: string[];
  itinerary: ItineraryDay[];
  itinerary_en?: ItineraryDay[];
  gallery: string[]; // label galeri
};

export const DESTINATIONS = [
  "Keliling Lombok",
  "Gili Islands",
  "Pantai Pink",
  "Gili Nanggu",
] as const;

const COMMON_EXCLUDE = [
  "Tiket pesawat",
  "Laundry",
  "Cidomo atau sepeda keliling Gili Trawangan",
  "Tip pemandu",
  "Suvenir dan biaya pribadi",
];

const COMMON_EXCLUDE_EN = [
  "Flight tickets",
  "Laundry service",
  "Bicycle or horse cart (Cidomo) rental on Gili Trawangan",
  "Tipping for guide and driver",
  "Personal expenses & souvenirs",
];

const GROUP_NOTE = "Harga rombongan, minimal 30 peserta";
const GROUP_NOTE_EN = "Group rate, minimum 30 participants";
const SIZE_NOTE = "Tersedia pilihan ukuran grup, konfirmasi harga ke admin";
const SIZE_NOTE_EN = "Multiple group size tiers available, confirm with admin";

// Rangkaian hari yang dipakai ulang oleh beberapa paket keliling Lombok.
const dayArrivalSouth = (day: number): ItineraryDay => ({
  day,
  title: "Sukarara, Sade & Pantai Selatan Mandalika",
  items: [
    "Disambut di Bandara Lombok (tiba pukul 10.00-12.00 masih bisa bergabung)",
    "Melihat pembuatan tenun di Desa Sukarara",
    "Berkeliling Desa Sade bersama pemandu lokal",
    "Foto di Sirkuit Mandalika, lalu makan siang",
    "Bersantai di Pantai Kuta Mandalika",
    "Menikmati pemandangan dari Bukit Seger dan Bukit Merese",
    "Makan malam Ayam Taliwang, lalu check-in hotel",
  ],
});

const dayArrivalSouth_EN = (day: number): ItineraryDay => ({
  day,
  title: "Sukarara Weaving, Sade Village & Mandalika Coast",
  items: [
    "Airport pickup upon arrival in Lombok",
    "Observe traditional hand-weaving at Sukarara Village",
    "Guided walking tour of ancient Sade Sasak Village",
    "Photo stop at Pertamina Mandalika International Circuit & lunch",
    "Relax at Kuta Beach Lombok",
    "Sunset panoramas from Bukit Seger and Bukit Merese hills",
    "Traditional Lombok dinner (Ayam Taliwang) & hotel check-in",
  ],
});

const dayPinkBeach = (day: number, extraSnorkel = false): ItineraryDay => ({
  day,
  title: "Pantai Pink Tour",
  items: [
    "Naik boat dari Pelabuhan Tanjung Luar menuju Pulau Pasir",
    extraSnorkel
      ? "Snorkeling di Gili Petelu dan Gili Gembir"
      : "Snorkeling di Gili Petelu",
    "Makan siang di Pantai Pink",
    "Menikmati Pantai Pink 2 dan 3",
    "Kembali ke Tanjung Luar, makan malam Sate Rembiga",
  ],
});

const dayPinkBeach_EN = (day: number, extraSnorkel = false): ItineraryDay => ({
  day,
  title: "Pink Beach & Island Hopping Tour",
  items: [
    "Private boat charter from Tanjung Luar Harbor to Sandbar Island",
    extraSnorkel
      ? "Snorkeling at pristine coral gardens of Gili Petelu & Gili Gembir"
      : "Snorkeling at Gili Petelu marine sanctuary",
    "Fresh grilled seafood lunch at Pink Beach",
    "Explore Pink Beach 2 and scenic viewpoints",
    "Return to harbor & evening dinner (Sate Rembiga)",
  ],
});

const dayThreeGilis = (day: number): ItineraryDay => ({
  day,
  title: "Menjelajah Tiga Gili",
  items: [
    "Dari Pelabuhan Teluk Kodek, naik boat ke Gili Air untuk snorkeling",
    "Snorkeling di spot patung bawah laut Gili Meno",
    "Makan siang di Gili Trawangan",
    "Kembali ke Teluk Kodek, sunset di Bukit Malimbu",
    "Makan malam di restoran lokal, lalu kembali ke hotel",
  ],
});

const dayThreeGilis_EN = (day: number): ItineraryDay => ({
  day,
  title: "Three Gili Islands Hopping & Snorkeling",
  items: [
    "Private boat from Teluk Kodek harbor to Gili Air reef snorkeling",
    "Snorkel with turtles & visit the underwater statues of Gili Meno",
    "Lunch and cycling time in lively Gili Trawangan",
    "Return boat cruise & sunset stop at Bukit Malimbu hill",
    "Dinner at local seafood restaurant and back to hotel",
  ],
});

const dayCityTour = (day: number): ItineraryDay => ({
  day,
  title: "City Tour & Kepulangan",
  items: [
    "Sarapan dan check-out hotel",
    "Belanja oleh-oleh khas Lombok (pusat suvenir dan kuliner)",
    "Makan siang Sate Rembiga",
    "Antar ke Bandara Lombok",
  ],
});

const dayCityTour_EN = (day: number): ItineraryDay => ({
  day,
  title: "Souvenir Shopping & Airport Departure",
  items: [
    "Breakfast and hotel checkout",
    "Shop for authentic Lombok pearls, handicrafts & snacks",
    "Local culinary lunch (Sate Rembiga)",
    "Timely transfer to Lombok International Airport (LOP)",
  ],
});

export const packages: TravelPackage[] = [
  {
    id: "lombok-fun-trip-5d4n",
    title: "Lombok Fun Trip 5 Hari 4 Malam",
    title_en: "Lombok Fun Trip 5 Days 4 Nights",
    tagline: "Paket rombongan dengan fun games di Gili, Pantai Pink, dan Mandalika.",
    tagline_en: "All-in group package with fun games on Gili Trawangan, Pink Beach, and Mandalika.",
    destination: "Keliling Lombok",
    destination_en: "All Around Lombok",
    durationDays: 5,
    durationNights: 4,
    price: 3500000,
    priceNote: GROUP_NOTE,
    priceNote_en: GROUP_NOTE_EN,
    gradient: "from-sky-400 via-cyan-400 to-teal-500",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: [
      "Fun games & team building di Gili Trawangan",
      "Pantai Pink dan Pulau Pasir",
      "Air terjun Sendang Gile & Tiu Kelep",
    ],
    highlights_en: [
      "Team building & fun activities on Gili Trawangan",
      "Pink Beach and vanishing sandbar island",
      "Tiu Kelep and Sendang Gile lush jungle waterfalls",
    ],
    include: [
      "Hotel 4 malam",
      "Makan sesuai itinerary (hari 1 siang & malam, hari 2-4 tiga kali sehari, hari 5 pagi & siang)",
      "Gala dinner di hotel",
      "Penjemputan dan antar bandara",
      "Transportasi dan boat sesuai itinerary",
      "Pemandu lokal di Desa Sade dan Senaru",
    ],
    include_en: [
      "4 nights hotel accommodation",
      "Meals according to itinerary with gala dinner",
      "Airport return transfers",
      "Private AC transport & chartered boats",
      "Licensed local guides at Sade & Senaru",
    ],
    exclude: COMMON_EXCLUDE,
    exclude_en: COMMON_EXCLUDE_EN,
    itinerary: [
      dayArrivalSouth(1),
      {
        day: 2,
        title: "Fun Games & Snorkeling Gili",
        items: [
          "Fun games dan team building di Gili Trawangan",
          "Snorkeling di patung bawah laut dekat Gili Meno",
          "Berenang bersama penyu di Turtle Point",
          "Makan siang di Gili Trawangan, lalu waktu bebas (opsional spot sunset swing)",
          "Gala dinner di hotel",
        ],
      },
      {
        day: 3,
        title: "Air Terjun & Masjid Kuno",
        items: [
          "Pemandangan hutan Pusuk",
          "Trekking di Desa Senaru ke Sendang Gile dan Tiu Kelep bersama pemandu",
          "Makan siang di Pondok Senaru",
          "Mengunjungi Masjid Bayan Kuno",
          "Sunset di Bukit Malimbu, makan malam Sate Rembiga",
        ],
      },
      dayPinkBeach(4, true),
      dayCityTour(5),
    ],
    itinerary_en: [
      dayArrivalSouth_EN(1),
      {
        day: 2,
        title: "Fun Games & Gili Snorkeling",
        items: [
          "Team building and games on Gili Trawangan",
          "Snorkel the underwater statues of Gili Meno",
          "Swim with wild green turtles at Turtle Point",
          "Lunch on Gili Trawangan with sunset free time",
          "Hotel gala dinner",
        ],
      },
      {
        day: 3,
        title: "Waterfalls & Ancient Bayan Mosque",
        items: [
          "Scenic monkey forest drive through Pusuk pass",
          "Guided trek to Sendang Gile & Tiu Kelep waterfalls",
          "Lunch overlooking Mount Rinjani foothills",
          "Heritage visit to historic Bayan Ancient Mosque",
          "Malimbu sunset and dinner",
        ],
      },
      dayPinkBeach_EN(4, true),
      dayCityTour_EN(5),
    ],
    gallery: ["Fun Games Gili", "Turtle Point", "Pantai Pink", "Tiu Kelep"],
  },
  {
    id: "lombok-wonderful-tour-4d3n",
    title: "Lombok Wonderful Tour 4 Hari 3 Malam",
    title_en: "Lombok Wonderful Tour 4 Days 3 Nights",
    tagline: "Rangkaian lengkap: Mandalika, Pantai Pink, dan snorkeling Gili.",
    tagline_en: "Our best-selling tour: Mandalika coast, Pink Beach, and 3 Gilis snorkeling.",
    destination: "Keliling Lombok",
    destination_en: "All Around Lombok",
    durationDays: 4,
    durationNights: 3,
    price: 4200000,
    gradient: "from-amber-300 via-orange-400 to-rose-400",
    image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: ["Mandalika & Bukit Merese", "Pantai Pink", "Snorkeling di Gili Air & Meno"],
    highlights_en: ["Mandalika Circuit & Merese Sunset Hill", "Pink Beach & Sandbar", "3 Gilis Island Hopping & Statues"],
    include: [
      "Hotel 3 malam",
      "Makan sesuai itinerary (hari 1 siang & malam, hari 2-3 tiga kali sehari, hari 4 pagi & siang)",
      "Penjemputan dan antar bandara",
      "Transportasi dan boat sesuai itinerary",
      "Pemandu lokal di Desa Sade",
    ],
    include_en: [
      "3 nights quality hotel accommodation",
      "Daily meals according to itinerary",
      "Airport pickups & drop-offs",
      "Private AC transport & chartered boat",
      "All entrance tickets & local guide fees",
    ],
    exclude: [...COMMON_EXCLUDE, "Kelapa muda dan jagung bakar di Bukit Malimbu"],
    exclude_en: [...COMMON_EXCLUDE_EN, "Personal snacks at Bukit Malimbu"],
    itinerary: [
      dayArrivalSouth(1),
      dayPinkBeach(2),
      dayThreeGilis(3),
      dayCityTour(4),
    ],
    itinerary_en: [
      dayArrivalSouth_EN(1),
      dayPinkBeach_EN(2),
      dayThreeGilis_EN(3),
      dayCityTour_EN(4),
    ],
    gallery: ["Bukit Merese", "Pantai Pink", "Gili Air", "Sunset Malimbu"],
  },
  {
    id: "lombok-gili-tour-3d2n",
    title: "Lombok Gili Tour 3 Hari 2 Malam",
    title_en: "Lombok & 3 Gilis Tour 3 Days 2 Nights",
    tagline: "Paket singkat: pantai selatan Mandalika dan tiga pulau Gili.",
    tagline_en: "The perfect weekend getaway: Southern Mandalika beaches & 3 Gili islands snorkeling.",
    destination: "Gili Islands",
    destination_en: "Gili Islands",
    durationDays: 3,
    durationNights: 2,
    price: 2700000,
    gradient: "from-teal-400 via-emerald-400 to-sky-500",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: [
      "Snorkeling dan berenang bersama penyu",
      "Gili Air, Meno, Trawangan",
      "Sunset di Bukit Malimbu",
    ],
    highlights_en: [
      "Snorkeling with wild sea turtles at Turtle Point",
      "Island hopping across Gili Air, Meno & Trawangan",
      "Scenic Malimbu coastal sunset viewpoint",
    ],
    include: [
      "Hotel 2 malam",
      "Makan sesuai itinerary (hari 1 siang & malam, hari 2 tiga kali, hari 3 pagi & siang)",
      "Penjemputan dan antar bandara",
      "Transportasi dan boat sesuai itinerary",
      "Pemandu lokal di Desa Sade",
    ],
    include_en: [
      "2 nights resort accommodation",
      "Meals per itinerary",
      "Airport transfers",
      "Private boat & snorkel gear",
      "Licensed guide",
    ],
    exclude: [...COMMON_EXCLUDE, "Kelapa muda dan jagung bakar di Bukit Malimbu"],
    exclude_en: [...COMMON_EXCLUDE_EN],
    itinerary: [dayArrivalSouth(1), dayThreeGilis(2), dayCityTour(3)],
    itinerary_en: [dayArrivalSouth_EN(1), dayThreeGilis_EN(2), dayCityTour_EN(3)],
    gallery: ["Gili Trawangan", "Snorkeling Penyu", "Gili Meno", "Sunset Malimbu"],
  },
  {
    id: "gili-explore-trip-1d",
    title: "Gili Explore Trip 1 Hari",
    title_en: "3 Gilis Island Hopping 1 Day Excursion",
    tagline: "Satu hari snorkeling di Gili Air, Gili Meno, dan Gili Trawangan.",
    tagline_en: "A full day of snorkeling across Gili Air, Gili Meno statues, and Gili Trawangan.",
    destination: "Gili Islands",
    destination_en: "Gili Islands",
    durationDays: 1,
    durationNights: 0,
    price: 1200000,
    gradient: "from-cyan-300 via-sky-400 to-blue-500",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: ["Snorkeling di tiga Gili", "Spot Patung Cinta", "Turtle Point"],
    highlights_en: ["Snorkel all 3 Gilis in one day", "Famous underwater statues", "Turtle Point encounter"],
    include: [
      "Penjemputan dari hotel atau bandara dan antar kembali",
      "Boat dari Teluk Kodek",
      "Makan siang di Gili Trawangan",
    ],
    include_en: [
      "Hotel / airport roundtrip pickup",
      "Private boat charter & snorkel equipment",
      "Lunch on Gili Trawangan",
    ],
    exclude: COMMON_EXCLUDE,
    exclude_en: COMMON_EXCLUDE_EN,
    itinerary: [
      {
        day: 1,
        title: "Island Hopping Tiga Gili",
        items: [
          "08.30: Dijemput dari hotel atau bandara menuju Teluk Kodek",
          "Snorkeling di Gili Air (spot ikan warna-warni)",
          "Snorkeling di Patung Cinta dan Turtle Point, Gili Meno",
          "Makan siang di Gili Trawangan, lalu waktu bebas (cidomo atau sepeda dengan biaya sendiri)",
          "Kembali ke Teluk Kodek, sunset di Bukit Malimbu",
          "Antar ke hotel sekitar pukul 17.00",
        ],
      },
    ],
    itinerary_en: [
      {
        day: 1,
        title: "3 Gilis Island Hopping Excursion",
        items: [
          "08:30: Hotel or airport pickup to Teluk Kodek harbor",
          "Snorkel colorful tropical fish in Gili Air",
          "Snorkel the famous underwater statues and Turtle Point in Gili Meno",
          "Beachside lunch and island cycling on Gili Trawangan",
          "Scenic boat return & Malimbu coastal sunset",
          "Drop-off at your hotel around 17:00",
        ],
      },
    ],
    gallery: ["Gili Air", "Patung Cinta", "Turtle Point", "Gili Trawangan"],
  },
  {
    id: "pantai-pink-tour-1d",
    title: "Pantai Pink Tour 1 Hari",
    title_en: "Pink Beach & Sandbar 1 Day Tour",
    tagline: "Pulau Pasir, snorkeling, dan pasir merah muda di Lombok Timur.",
    tagline_en: "Tidal sandbar island, vibrant coral snorkeling, and pink sands in East Lombok.",
    destination: "Pantai Pink",
    destination_en: "Pink Beach",
    durationDays: 1,
    durationNights: 0,
    price: 1100000,
    gradient: "from-pink-300 via-rose-300 to-orange-200",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: ["Pulau Pasir", "Snorkeling Gili Petelu", "Pantai Pink 1, 2, dan 3"],
    highlights_en: ["Disappearing Sandbar Island", "Pristine reef at Gili Petelu", "Pink Beach 1, 2, and 3"],
    include: [
      "Penjemputan dari hotel atau bandara dan antar kembali",
      "Boat dari Pelabuhan Tanjung Luar",
      "Makan siang di Pantai Pink",
    ],
    include_en: [
      "Private vehicle pickup from hotel or airport",
      "Private boat charter from Tanjung Luar harbor",
      "Grilled seafood lunch at Pink Beach",
    ],
    exclude: COMMON_EXCLUDE,
    exclude_en: COMMON_EXCLUDE_EN,
    itinerary: [
      {
        day: 1,
        title: "Day Trip Pantai Pink",
        items: [
          "08.00: Dijemput dari hotel atau bandara menuju Tanjung Luar",
          "Foto-foto di Pulau Pasir",
          "Snorkeling di Gili Petelu",
          "Makan siang di Pantai Pink",
          "Menikmati Pantai Pink 2 dan 3",
          "Kembali ke Tanjung Luar, makan malam Sate Rembiga",
          "Antar ke hotel sekitar pukul 19.00",
        ],
      },
    ],
    itinerary_en: [
      {
        day: 1,
        title: "Pink Beach Full Day Excursion",
        items: [
          "08:00: Hotel pickup and scenic drive to Tanjung Luar",
          "Photos on the pristine disappearing Sandbar Island",
          "Snorkel the marine reserve of Gili Petelu",
          "Seafood lunch on the soft pink sands of Tangsi Beach",
          "Cliff viewpoints overlooking Pink Beach bays",
          "Return transfer to hotel around 19:00",
        ],
      },
    ],
    gallery: ["Pulau Pasir", "Pantai Pink", "Gili Petelu"],
  },
  {
    id: "gili-nanggu-tour-1d",
    title: "Gili Nanggu Tour 1 Hari",
    title_en: "Secret Gilis: Gili Nanggu Snorkeling 1 Day Tour",
    tagline: "Snorkeling di Gili Nanggu, Gili Sudak, dan Gili Kedis, Lombok Barat.",
    tagline_en: "Snorkel Lombok's natural aquarium at Gili Nanggu, Gili Sudak, and tiny Gili Kedis.",
    destination: "Gili Nanggu",
    destination_en: "Gili Nanggu",
    durationDays: 1,
    durationNights: 0,
    price: 1000000,
    priceNote: SIZE_NOTE,
    priceNote_en: SIZE_NOTE_EN,
    gradient: "from-lime-300 via-teal-300 to-cyan-400",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61752af3337?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    ],
    highlights: ["Snorkeling Gili Nanggu", "Makan siang ikan bakar di Gili Sudak", "Gili Kedis"],
    highlights_en: ["Calm shore snorkeling at Gili Nanggu", "Beachside seafood on Gili Sudak", "Heart-shaped Gili Kedis"],
    include: [
      "Penjemputan dari hotel atau bandara dan antar kembali",
      "Boat dari Pelabuhan Tawun",
      "Makan siang ikan bakar di Gili Sudak",
    ],
    include_en: [
      "Hotel or airport pickup & drop-off",
      "Charter boat from Tawun harbor",
      "Grilled fish lunch on Gili Sudak",
    ],
    exclude: [...COMMON_EXCLUDE, "Jet ski di Gili Kedis (opsional)"],
    exclude_en: [...COMMON_EXCLUDE_EN, "Jet ski rental on Gili Kedis"],
    itinerary: [
      {
        day: 1,
        title: "Hopping Gili Lombok Barat",
        items: [
          "08.30: Dijemput dari hotel atau bandara menuju Pelabuhan Tawun",
          "Snorkeling di Gili Nanggu",
          "Makan siang ikan bakar di Gili Sudak",
          "Menjelajah Gili Kedis (jet ski opsional dengan biaya sendiri)",
          "Kembali ke Tawun dan antar ke hotel sekitar pukul 17.30",
        ],
      },
    ],
    itinerary_en: [
      {
        day: 1,
        title: "Secret Gilis Island Hopping",
        items: [
          "08:30: Pickup from hotel or airport towards Tawun Harbor",
          "Easy reef snorkeling directly off the beach at Gili Nanggu",
          "Fresh grilled fish lunch on peaceful Gili Sudak",
          "Explore the tiny heart-shaped islet of Gili Kedis",
          "Return boat transfer and hotel drop-off by 17:30",
        ],
      },
    ],
    gallery: ["Gili Nanggu", "Gili Sudak", "Gili Kedis"],
  },
];

export function getPackage(id: string) {
  return packages.find((p) => p.id === id);
}

export function getLocalizedPackage(pkg: TravelPackage, lang: "id" | "en") {
  if (lang === "en") {
    return {
      ...pkg,
      title: pkg.title_en || pkg.title,
      tagline: pkg.tagline_en || pkg.tagline,
      destination: pkg.destination_en || pkg.destination,
      priceNote: pkg.priceNote_en || pkg.priceNote,
      highlights: pkg.highlights_en || pkg.highlights,
      include: pkg.include_en || pkg.include,
      exclude: pkg.exclude_en || pkg.exclude,
      itinerary: pkg.itinerary_en || pkg.itinerary,
    };
  }
  return pkg;
}

export type PackageFilters = {
  q?: string;
  destination?: string;
  duration?: string; // "1" | "2-3" | "4+"
};

export function filterPackages({ q, destination, duration }: PackageFilters, lang: "id" | "en" = "id") {
  const query = q?.trim().toLowerCase();
  return packages
    .map((p) => getLocalizedPackage(p, lang))
    .filter((p) => {
      if (destination && p.destination !== destination) return false;
      if (duration === "1" && p.durationDays !== 1) return false;
      if (duration === "2-3" && (p.durationDays < 2 || p.durationDays > 3)) return false;
      if (duration === "4+" && p.durationDays < 4) return false;
      if (query) {
        const hay = `${p.title} ${p.tagline} ${p.destination} ${p.highlights.join(" ")}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
}
