// ARTIKEL BLOG. Seluruh teks ditulis orisinal untuk proyek ini.
// Sebelum dipublikasikan, tinjau ulang fakta lokal (jam, rute, musim) dan tambahkan
// pengalaman asli tim Anda: konten yang spesifik dan nyata paling dihargai mesin pencari.
// Tautan internal memakai sintaks [teks](/path) dan dirender oleh components/RichText.tsx.

export type BlogSection = {
  id: string;
  heading: string;
  body: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string; // untuk meta description (idealnya 120-160 karakter)
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  category: string;
  keywords: string[];
  gradient: string;
  intro: string[];
  sections: BlogSection[];
  faq?: { q: string; a: string }[];
  relatedPackages: string[]; // id paket di lib/packages.ts
};

export const posts: BlogPost[] = [
  {
    slug: "itinerary-lombok-3-hari-2-malam",
    title: "Itinerary Lombok 3 Hari 2 Malam: Mandalika, Tiga Gili, dan Sunset Malimbu",
    description:
      "Contoh rencana liburan Lombok 3 hari 2 malam yang realistis: desa tenun, pantai selatan Mandalika, snorkeling di tiga Gili, dan oleh-oleh sebelum pulang.",
    date: "2026-11-01",
    category: "Itinerary",
    keywords: ["itinerary lombok 3 hari 2 malam", "wisata lombok 3 hari", "paket gili tour", "liburan lombok"],
    gradient: "from-teal-400 via-emerald-400 to-sky-500",
    intro: [
      "Tiga hari adalah durasi yang pas untuk kunjungan pertama ke Lombok. Waktunya cukup untuk merasakan dua wajah pulau ini: pantai selatan yang luas di sekitar Mandalika, dan perairan jernih tiga Gili di barat laut. Berikut contoh rencana yang tidak terlalu padat, sehingga masih ada ruang untuk bersantai.",
    ],
    sections: [
      {
        id: "hari-1",
        heading: "Hari 1: Tenun, Rumah Adat, dan Pantai Selatan",
        body: [
          "Dari Bandara Lombok, mulailah dengan Desa Sukarara, sentra kain tenun songket. Di sana Anda bisa melihat penenun bekerja langsung. Lanjut ke Desa Sade, kampung adat Sasak dengan rumah beratap alang-alang. Desa ini paling nyaman dikunjungi bersama pemandu lokal agar cerita budayanya tersampaikan.",
          "Sore hari, arahkan ke kawasan Mandalika: Sirkuit Mandalika untuk berfoto, Pantai Kuta yang berpasir lembut, lalu Bukit Seger dan Bukit Merese untuk pemandangan Samudra Hindia. Tutup hari dengan ayam taliwang, hidangan pedas khas Lombok.",
        ],
        bullets: [
          "Bawa uang tunai pecahan kecil untuk belanja dan donasi di desa.",
          "Berpakaian sopan saat mengunjungi desa adat.",
          "Hindari jadwal kedatangan terlalu sore agar Hari 1 tidak terpotong.",
        ],
      },
      {
        id: "hari-2",
        heading: "Hari 2: Island Hopping Tiga Gili",
        body: [
          "Berangkat pagi dari Pelabuhan Teluk Kodek di Lombok Utara. Mulai dari Gili Air untuk snorkeling, lanjut ke Gili Meno yang dikenal dengan patung bawah laut dan penyu, lalu makan siang di Gili Trawangan. Baca juga perbandingan ketiganya di [panduan memilih Gili](/blog/gili-trawangan-meno-atau-air).",
          "Kembali ke daratan sore hari, lalu mampir ke Bukit Malimbu untuk melihat matahari terbenam dengan latar tiga Gili. Jalur pesisir ini salah satu panorama terbaik di Lombok.",
        ],
        bullets: [
          "Gili tidak memiliki kendaraan bermotor. Keliling pulau dengan cidomo atau sepeda, biayanya umumnya terpisah dari paket.",
          "Pakai tabir surya yang ramah terumbu karang.",
          "Bawa baju ganti dan kantong kedap air untuk ponsel.",
        ],
      },
      {
        id: "hari-3",
        heading: "Hari 3: Oleh-oleh dan Pulang",
        body: [
          "Sarapan santai, lalu belanja oleh-oleh: kain tenun, perhiasan mutiara Lombok, dan camilan khas. Makan siang sate Rembiga sebelum menuju bandara.",
          "Sisakan jeda yang cukup sebelum penerbangan pulang. Penerbangan siang atau sore paling aman untuk rencana ini.",
        ],
      },
      {
        id: "biaya",
        heading: "Berapa Biaya yang Perlu Disiapkan?",
        body: [
          "Biaya bergantung pada kelas hotel, ukuran grup, dan musim. Paket terpandu biasanya sudah mencakup hotel, transportasi, boat, dan beberapa kali makan, sedangkan tiket pesawat, laundry, cidomo, dan tip umumnya terpisah. Lihat [Lombok Gili Tour 3 Hari 2 Malam](/packages/lombok-gili-tour-3d2n) sebagai contoh paket dengan rute serupa.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah 3 hari 2 malam cukup untuk Lombok?",
        a: "Cukup untuk kunjungan pertama yang berfokus pada pantai selatan dan Gili. Jika ingin menambah Pantai Pink atau air terjun di Senaru, pertimbangkan 4 sampai 5 hari.",
      },
      {
        q: "Bisakah tiba di bandara siang hari?",
        a: "Biasanya bisa, selama jadwal Hari 1 disesuaikan. Sampaikan jam kedatangan saat memesan agar rute dirapikan.",
      },
      {
        q: "Kapan waktu terbaik untuk itinerary ini?",
        a: "Musim kemarau, kira-kira April sampai Oktober, paling nyaman untuk menyeberang ke Gili. Detailnya ada di panduan waktu terbaik ke Lombok.",
      },
    ],
    relatedPackages: ["lombok-gili-tour-3d2n", "gili-explore-trip-1d", "lombok-wonderful-tour-4d3n"],
  },
  {
    slug: "pantai-pink-lombok-panduan",
    title: "Pantai Pink Lombok: Cara ke Sana, Tips Snorkeling, dan Waktu Terbaik",
    description:
      "Panduan Pantai Pink Lombok di Jerowaru: rute lewat Tanjung Luar dan Pulau Pasir, spot snorkeling, tips perjalanan, dan hal yang perlu disiapkan.",
    date: "2026-11-01",
    category: "Destinasi",
    keywords: ["pantai pink lombok", "cara ke pantai pink lombok", "pulau pasir lombok", "tanjung luar"],
    gradient: "from-pink-300 via-rose-300 to-orange-200",
    intro: [
      "Pantai Pink, juga dikenal sebagai Pantai Tangsi, berada di Lombok Timur wilayah Jerowaru. Warna kemerahan pada pasirnya berasal dari serpihan organisme laut bercangkang merah yang bercampur dengan pasir putih. Efek warnanya paling terlihat saat cahaya pagi dan di tepi air.",
    ],
    sections: [
      {
        id: "cara-ke-sana",
        heading: "Cara ke Pantai Pink",
        body: [
          "Rute yang populer untuk wisatawan adalah lewat laut dari Pelabuhan Tanjung Luar. Perahu melewati Pulau Pasir, gosong pasir yang terlihat saat air surut, lalu singgah snorkeling di Gili Petelu sebelum mendarat di Pantai Pink.",
          "Akses darat juga ada, tetapi kondisi jalan dan waktu tempuhnya perlu dicek lebih dulu. Bagi yang ingin praktis, [Pantai Pink Tour 1 Hari](/packages/pantai-pink-tour-1d) sudah mengatur penjemputan, perahu, dan makan siang.",
        ],
      },
      {
        id: "yang-dilakukan",
        heading: "Apa yang Bisa Dilakukan",
        body: ["Selain berfoto di pasir merah muda, ada beberapa kegiatan yang membuat perjalanan terasa penuh:"],
        bullets: [
          "Berfoto di Pulau Pasir saat air surut.",
          "Snorkeling di Gili Petelu dan Gili Gembir.",
          "Makan siang di warung tepi pantai.",
          "Menjelajah pantai-pantai di sekitarnya yang lebih sepi.",
        ],
      },
      {
        id: "tips",
        heading: "Tips Sebelum Berangkat",
        body: ["Perjalanan ini panjang dan banyak terpapar matahari, jadi persiapan kecil sangat membantu."],
        bullets: [
          "Berangkat pagi agar air lebih tenang dan cahaya lebih bagus.",
          "Bawa topi, tabir surya, air minum, dan sandal yang mudah basah.",
          "Pakai pelampung saat snorkeling, terutama jika kurang lancar berenang.",
          "Jangan membawa pulang pasir atau karang agar kawasan tetap lestari.",
          "Kondisi laut bisa berubah; ikuti keputusan nakhoda jika perjalanan perlu disesuaikan.",
        ],
      },
      {
        id: "digabung",
        heading: "Digabung dengan Destinasi Lain",
        body: [
          "Pantai Pink sering dijadikan satu hari dalam rangkaian keliling Lombok. [Lombok Wonderful Tour 4 Hari 3 Malam](/packages/lombok-wonderful-tour-4d3n) menggabungkannya dengan Mandalika dan Gili.",
        ],
      },
    ],
    faq: [
      {
        q: "Berapa lama perjalanan day trip ke Pantai Pink?",
        a: "Kira-kira 10 sampai 11 jam termasuk penjemputan dari hotel dan perjalanan pulang, tergantung lokasi menginap dan kondisi laut.",
      },
      {
        q: "Apakah aman untuk anak-anak?",
        a: "Bisa, dengan pengawasan. Ada perjalanan perahu dan paparan matahari yang cukup lama, jadi siapkan pelampung ukuran anak dan pelindung matahari.",
      },
      {
        q: "Perlu bisa berenang untuk snorkeling?",
        a: "Tidak harus, karena pelampung tersedia. Namun tetap pilih spot yang tenang dan jangan snorkeling sendirian.",
      },
    ],
    relatedPackages: ["pantai-pink-tour-1d", "lombok-wonderful-tour-4d3n", "trip-wisata-lombok-5d4n"],
  },
  {
    slug: "gili-trawangan-meno-atau-air",
    title: "Gili Trawangan, Meno, atau Air? Cara Memilih Gili yang Cocok untuk Anda",
    description:
      "Perbandingan Gili Trawangan, Gili Meno, dan Gili Air: suasana, snorkeling, makan, dan tipe wisatawan yang paling cocok, plus saran jika hanya punya satu hari.",
    date: "2026-11-01",
    category: "Destinasi",
    keywords: ["gili trawangan", "gili meno", "gili air", "perbedaan tiga gili", "snorkeling lombok"],
    gradient: "from-cyan-300 via-sky-400 to-blue-500",
    intro: [
      "Tiga pulau kecil di lepas pantai barat laut Lombok ini sering disebut dalam satu napas, padahal karakternya berbeda. Memahami perbedaannya membantu Anda memilih tempat menginap, atau menyusun rute jika hanya punya satu hari.",
    ],
    sections: [
      {
        id: "gili-trawangan",
        heading: "Gili Trawangan: Paling Ramai dan Lengkap",
        body: [
          "Gili Trawangan adalah yang terbesar dan paling hidup. Restoran, kafe, penyewaan alat selam, dan kehidupan malam terkonsentrasi di sini. Cocok bagi yang ingin banyak pilihan makan dan aktivitas, serta suasana sosial.",
        ],
      },
      {
        id: "gili-meno",
        heading: "Gili Meno: Paling Tenang",
        body: [
          "Gili Meno paling kecil dan paling sepi. Pulau ini dikenal dengan patung bawah laut dan area penyu yang menarik untuk snorkeling. Cocok untuk pasangan atau yang mencari suasana tenang.",
        ],
      },
      {
        id: "gili-air",
        heading: "Gili Air: Seimbang dan Lebih Lokal",
        body: [
          "Gili Air terletak paling dekat dengan daratan Lombok. Suasananya di tengah-tengah: ada kafe dan penginapan yang nyaman tetapi tidak seramai Trawangan, dengan kehidupan penduduk lokal yang terasa. Cocok untuk keluarga dan pelancong yang menyukai suasana santai.",
        ],
      },
      {
        id: "ringkasan",
        heading: "Ringkasan Singkat",
        body: ["Pilih berdasarkan suasana yang Anda cari:"],
        bullets: [
          "Ingin ramai dan banyak pilihan: Gili Trawangan.",
          "Ingin tenang dan romantis: Gili Meno.",
          "Ingin seimbang dan ramah keluarga: Gili Air.",
          "Ketiganya tidak memiliki kendaraan bermotor; mobilitas dengan jalan kaki, sepeda, atau cidomo.",
        ],
      },
      {
        id: "satu-hari",
        heading: "Jika Hanya Punya Satu Hari",
        body: [
          "Island hopping memungkinkan Anda menyentuh ketiganya dalam sehari: snorkeling di Gili Air, patung bawah laut dan penyu di Gili Meno, lalu makan siang di Gili Trawangan. Rutenya tersusun di [Gili Explore Trip 1 Hari](/packages/gili-explore-trip-1d). Bila ingin menginap, [Lombok Gili Tour 3 Hari 2 Malam](/packages/lombok-gili-tour-3d2n) memasukkan Gili ke dalam rangkaian yang lebih panjang.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah ada kendaraan bermotor di Gili?",
        a: "Tidak. Transportasi di pulau memakai cidomo (kereta kuda), sepeda, atau berjalan kaki.",
      },
      {
        q: "Gili mana yang paling bagus untuk snorkeling?",
        a: "Ketiganya punya spot snorkeling. Gili Meno terkenal dengan patung bawah laut dan penyu, sedangkan Gili Air memiliki spot ikan berwarna-warni. Kondisi terbaik berubah mengikuti arus dan musim.",
      },
      {
        q: "Perlu menginap atau cukup sehari?",
        a: "Sehari cukup untuk mencicipi ketiganya. Menginap memberi waktu lebih santai, terutama saat sunset dan pagi hari ketika pulau lebih sepi.",
      },
    ],
    relatedPackages: ["gili-explore-trip-1d", "lombok-gili-tour-3d2n", "lombok-fun-trip-5d4n"],
  },
  {
    slug: "gili-nanggu-sudak-kedis",
    title: "Gili Nanggu, Sudak, dan Kedis: Alternatif Gili yang Lebih Tenang di Lombok Barat",
    description:
      "Kenali Gili Nanggu, Gili Sudak, dan Gili Kedis di Sekotong, Lombok Barat: rute dari Pelabuhan Tawun, aktivitas, dan tips untuk day trip.",
    date: "2026-11-01",
    category: "Destinasi",
    keywords: ["gili nanggu", "gili sudak", "gili kedis", "sekotong lombok barat", "pelabuhan tawun"],
    gradient: "from-lime-300 via-teal-300 to-cyan-400",
    intro: [
      "Selain tiga Gili yang populer di utara, Lombok Barat punya gugusan pulau kecil di kawasan Sekotong. Gili Nanggu, Gili Sudak, dan Gili Kedis lebih tenang, cocok bagi yang ingin snorkeling tanpa keramaian.",
    ],
    sections: [
      {
        id: "rute",
        heading: "Rute dan Waktu Tempuh",
        body: [
          "Perjalanan dimulai dari Pelabuhan Tawun di Sekotong. Dari area bandara atau hotel di sekitar Lombok, perjalanan darat ke pelabuhan memakan waktu sedikit lebih dari satu jam, tergantung lalu lintas. Setelah itu, perahu menghubungkan ketiga pulau dalam waktu singkat.",
        ],
      },
      {
        id: "tiap-pulau",
        heading: "Apa yang Ada di Tiap Pulau",
        body: ["Ketiganya berdekatan sehingga mudah dijelajahi dalam sehari."],
        bullets: [
          "Gili Nanggu: pulau kecil dengan air jernih, cocok untuk snorkeling dekat pantai.",
          "Gili Sudak: biasanya dipakai untuk makan siang, termasuk ikan bakar.",
          "Gili Kedis: pulau mungil yang bisa dijelajahi cepat; aktivitas seperti jet ski biasanya opsional dan berbayar.",
        ],
      },
      {
        id: "tips",
        heading: "Tips Day Trip",
        body: ["Persiapan sederhana membuat perjalanan lebih nyaman."],
        bullets: [
          "Berangkat pagi agar air tenang dan antrean perahu sedikit.",
          "Bawa tabir surya, topi, dan baju ganti.",
          "Siapkan uang tunai untuk kebutuhan kecil di pulau.",
        ],
      },
      {
        id: "paket",
        heading: "Paket yang Tersedia",
        body: [
          "Untuk perjalanan tanpa repot, lihat [Gili Nanggu Tour 1 Hari](/packages/gili-nanggu-tour-1d) yang sudah mencakup penjemputan dan perahu. Jika ingin membandingkan dengan Gili di utara, baca [panduan memilih Gili](/blog/gili-trawangan-meno-atau-air).",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah Gili Nanggu cocok untuk pemula snorkeling?",
        a: "Ya, karena perairannya relatif tenang dekat pantai. Tetap gunakan pelampung dan ikuti arahan pemandu.",
      },
      {
        q: "Apakah bisa menginap di sekitar sana?",
        a: "Ada penginapan di kawasan Sekotong, tetapi ketersediaannya berbeda-beda. Untuk kepastian, tanyakan ke admin sebelum memesan.",
      },
    ],
    relatedPackages: ["gili-nanggu-tour-1d", "gili-explore-trip-1d"],
  },
  {
    slug: "waktu-terbaik-liburan-ke-lombok",
    title: "Kapan Waktu Terbaik Liburan ke Lombok? Panduan Musim dan Keramaian",
    description:
      "Panduan memilih bulan liburan ke Lombok: musim kemarau dan hujan, periode ramai, serta tips merencanakan snorkeling dan perjalanan laut.",
    date: "2026-11-01",
    category: "Tips",
    keywords: ["waktu terbaik ke lombok", "musim kemarau lombok", "kapan ke lombok", "cuaca lombok"],
    gradient: "from-amber-300 via-orange-400 to-rose-400",
    intro: [
      "Waktu kunjungan sangat memengaruhi pengalaman di Lombok, terutama untuk kegiatan di laut. Berikut pola umum yang bisa dijadikan pegangan. Cuaca bisa bergeser dari tahun ke tahun, jadi periksa prakiraan menjelang keberangkatan.",
    ],
    sections: [
      {
        id: "musim-kemarau",
        heading: "Musim Kemarau: Kira-kira April sampai Oktober",
        body: [
          "Periode ini umumnya paling nyaman: langit lebih cerah dan laut lebih bersahabat untuk menyeberang ke Gili serta snorkeling. Puncak keramaian biasanya terjadi di pertengahan tahun saat libur sekolah, sehingga hotel dan transportasi lebih cepat penuh.",
        ],
      },
      {
        id: "musim-hujan",
        heading: "Musim Hujan: Kira-kira November sampai Maret",
        body: [
          "Hujan lebih sering turun dan gelombang bisa lebih tinggi. Perjalanan laut kadang perlu disesuaikan atau dijadwal ulang. Sisi positifnya, harga cenderung lebih longgar dan objek wisata lebih sepi. Air terjun biasanya berdebit lebih besar, tetapi jalur bisa licin.",
        ],
      },
      {
        id: "tips",
        heading: "Tips Merencanakan Berdasarkan Musim",
        body: ["Beberapa prinsip sederhana:"],
        bullets: [
          "Untuk periode ramai, pesan jauh hari agar akomodasi dan transportasi aman.",
          "Pertimbangkan bulan transisi, seperti Mei, Juni, dan September, untuk cuaca baik dengan keramaian lebih ringan.",
          "Beri ruang cadangan satu hari jika jadwal bergantung pada perjalanan laut.",
          "Bawa jas hujan tipis dan kantong kedap air untuk barang elektronik.",
        ],
      },
      {
        id: "pilih-paket",
        heading: "Menyesuaikan Paket dengan Musim",
        body: [
          "Rangkaian dengan banyak aktivitas laut, seperti [Trip Wisata Lombok 5 Hari 4 Malam](/packages/trip-wisata-lombok-5d4n), paling optimal saat kemarau. Untuk bulan lebih basah, paket berbasis budaya dan kota seperti kunjungan desa dan oleh-oleh lebih fleksibel. Mau contoh rencana singkat? Lihat [itinerary 3 hari 2 malam](/blog/itinerary-lombok-3-hari-2-malam).",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah Lombok bisa dikunjungi saat musim hujan?",
        a: "Bisa. Hujan biasanya tidak turun sepanjang hari, tetapi kegiatan di laut lebih rentan berubah. Siapkan rencana cadangan.",
      },
      {
        q: "Kapan Lombok paling ramai?",
        a: "Umumnya di pertengahan tahun dan periode libur panjang. Pesan lebih awal jika bepergian pada waktu tersebut.",
      },
    ],
    relatedPackages: ["trip-wisata-lombok-5d4n", "lombok-wonderful-tour-4d3n", "lombok-gili-tour-3d2n"],
  },
  {
    slug: "air-terjun-sendang-gile-tiu-kelep",
    title: "Air Terjun Sendang Gile dan Tiu Kelep di Senaru: Panduan Trekking Singkat",
    description:
      "Panduan mengunjungi air terjun Sendang Gile dan Tiu Kelep di Senaru, Lombok Utara: apa yang dibawa, kondisi jalur, dan destinasi lain di sekitarnya.",
    date: "2026-11-01",
    category: "Destinasi",
    keywords: ["sendang gile", "tiu kelep", "air terjun senaru", "masjid bayan beleq", "wisata lombok utara"],
    gradient: "from-emerald-500 via-green-500 to-lime-400",
    intro: [
      "Di kaki Gunung Rinjani, Desa Senaru menyimpan dua air terjun yang menjadi favorit pelancong: Sendang Gile dan Tiu Kelep. Keduanya bisa dikunjungi dalam satu kali jalan, dengan tingkat usaha yang berbeda.",
    ],
    sections: [
      {
        id: "dua-air-terjun",
        heading: "Sendang Gile dan Tiu Kelep",
        body: [
          "Sendang Gile lebih mudah dijangkau dengan jalur yang relatif singkat, cocok untuk berbagai usia. Tiu Kelep memerlukan trekking lebih lanjut melewati jalur setapak dan area berbatu di dekat aliran air, sehingga butuh alas kaki yang baik dan kehati-hatian.",
        ],
      },
      {
        id: "persiapan",
        heading: "Yang Perlu Dibawa",
        body: ["Medannya basah dan licin, jadi persiapan penting:"],
        bullets: [
          "Sandal gunung atau sepatu dengan grip kuat.",
          "Baju ganti dan handuk kecil.",
          "Kantong plastik atau dry bag untuk ponsel dan dompet.",
          "Air minum dan camilan ringan.",
        ],
      },
      {
        id: "pemandu",
        heading: "Mengapa Sebaiknya Bersama Pemandu",
        body: [
          "Pemandu lokal membantu membaca kondisi jalur, terutama saat debit air tinggi, sekaligus menceritakan konteks desa dan hutan sekitar. Saat hujan deras, jalur bisa ditutup demi keselamatan.",
        ],
      },
      {
        id: "sekitar",
        heading: "Mampir ke Tempat Lain di Sekitar",
        body: [
          "Perjalanan dari Mataram biasanya melewati hutan Pusuk, tempat monyet liar sering terlihat. Di Bayan ada masjid tua yang menjadi salah satu peninggalan bersejarah di Lombok. Sore hari, Bukit Malimbu cocok untuk menutup hari dengan sunset. Rangkaian ini ada di [Trip Wisata Lombok 5 Hari 4 Malam](/packages/trip-wisata-lombok-5d4n) dan [Lombok Fun Trip 5 Hari 4 Malam](/packages/lombok-fun-trip-5d4n).",
        ],
      },
    ],
    faq: [
      {
        q: "Seberapa berat trekking ke Tiu Kelep?",
        a: "Tergolong sedang. Tidak butuh pengalaman mendaki, tetapi perlu fisik cukup, alas kaki yang tepat, dan kehati-hatian di jalur basah.",
      },
      {
        q: "Bisakah berenang di air terjun?",
        a: "Biasanya ada area yang bisa dipakai untuk berendam, namun tergantung debit dan arahan pemandu. Jangan memaksakan jika arus deras.",
      },
    ],
    relatedPackages: ["trip-wisata-lombok-5d4n", "lombok-fun-trip-5d4n"],
  },
  {
    slug: "tips-gathering-kantor-di-lombok",
    title: "Tips Gathering Kantor di Lombok: Dari Fun Games hingga Pengaturan Logistik",
    description:
      "Panduan menyusun gathering kantor atau komunitas di Lombok: durasi, jumlah peserta, fun games di Gili, logistik, dan hal yang sering terlewat.",
    date: "2026-11-01",
    category: "Tips",
    keywords: ["gathering kantor lombok", "paket gathering lombok", "fun games gili", "outing kantor lombok"],
    gradient: "from-indigo-400 via-blue-500 to-cyan-500",
    intro: [
      "Lombok punya modal bagus untuk gathering: pantai, pulau kecil, dan budaya lokal yang mudah dipadukan dengan permainan kelompok. Agar acaranya lancar, ada beberapa hal yang sebaiknya diputuskan sejak awal.",
    ],
    sections: [
      {
        id: "durasi-peserta",
        heading: "Tentukan Durasi dan Jumlah Peserta",
        body: [
          "Untuk rombongan, durasi 4 hari 3 malam memberi ruang yang cukup untuk wisata budaya, satu hari penuh di Gili, dan satu hari Pantai Pink tanpa terburu-buru. Beberapa paket rombongan mensyaratkan jumlah minimal peserta, jadi pastikan jumlah pasti Anda sebelum meminta penawaran. Contohnya, [Paket Gathering Lombok 4 Hari 3 Malam](/packages/gathering-lombok-4d3n).",
        ],
      },
      {
        id: "fun-games",
        heading: "Rancang Fun Games yang Sesuai",
        body: [
          "Permainan kelompok di Gili Trawangan cocok untuk membangun kebersamaan. Pilih permainan yang aman di pasir dan air dangkal, siapkan tim yang seimbang, dan sediakan cadangan jika cuaca berubah.",
        ],
      },
      {
        id: "logistik",
        heading: "Checklist Logistik",
        body: ["Hal-hal yang sering terlewat saat mengurus rombongan besar:"],
        bullets: [
          "Kumpulkan jadwal kedatangan dan kepulangan peserta sejak awal.",
          "Tanyakan kebutuhan makan khusus, seperti vegetarian atau alergi.",
          "Pastikan kapasitas kendaraan dan perahu sesuai jumlah peserta.",
          "Siapkan seragam atau atribut tim jika ingin dokumentasi seragam.",
          "Rencanakan cadangan waktu untuk perjalanan laut yang bergantung cuaca.",
        ],
      },
      {
        id: "anggaran",
        heading: "Mengatur Anggaran",
        body: [
          "Tanyakan dengan jelas apa saja yang termasuk dan tidak termasuk, misalnya tiket pesawat, laundry, cidomo, tip pemandu, dan suvenir. Sebagai pembanding rangkaian yang lebih panjang, lihat [Lombok Fun Trip 5 Hari 4 Malam](/packages/lombok-fun-trip-5d4n).",
        ],
      },
    ],
    faq: [
      {
        q: "Berapa jumlah minimal peserta untuk paket gathering?",
        a: "Bergantung pada paket. Beberapa paket rombongan mensyaratkan minimal sekitar 30 peserta. Tanyakan ke admin untuk jumlah yang lebih kecil.",
      },
      {
        q: "Apakah makanan halal mudah ditemukan?",
        a: "Mayoritas penduduk Lombok beragama Islam, sehingga makanan halal mudah ditemukan. Tetap informasikan kebutuhan khusus peserta.",
      },
    ],
    relatedPackages: ["gathering-lombok-4d3n", "lombok-fun-trip-5d4n"],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function sortedPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function readingMinutes(post: BlogPost) {
  const text = [
    ...post.intro,
    ...post.sections.flatMap((s) => [s.heading, ...s.body, ...(s.bullets ?? [])]),
    ...(post.faq ?? []).flatMap((f) => [f.q, f.a]),
  ].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
