import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kala Lombok | Official Lombok Tour Packages",
    template: `%s | ${SITE_NAME}`,
  },
  openGraph: { siteName: SITE_NAME, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image" },
  description:
    "Explore Lombok, the Gili Islands, Pink Beach, and Mandalika with private tours, local guides, and customizable itineraries.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-slate-800 bg-slate-50/50">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["TravelAgency", "LocalBusiness"],
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/opengraph-image`,
            image: `${SITE_URL}/opengraph-image`,
            description:
              "Penyedia paket wisata resmi di Pulau Lombok, Gili Trawangan, Pantai Pink, dan Mandalika dengan armada private dan pemandu lokal berlisensi.",
            priceRange: "Rp 550.000 - Rp 4.500.000",
            currenciesAccepted: "IDR",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Meninting V 10-2, Pagesangan Bar., Kec. Mataram",
              addressLocality: "Kota Mataram",
              addressRegion: "Nusa Tenggara Barat",
              postalCode: "83115",
              addressCountry: "ID",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -8.595169179845756,
              longitude: 116.09732942265173,
            },
            areaServed: [
              "Lombok",
              "Gili Trawangan",
              "Gili Meno",
              "Gili Air",
              "Pantai Pink",
              "Mandalika",
              "Gunung Rinjani",
              "Nusa Tenggara Barat",
            ],
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "07:30",
                closes: "21:30",
              },
            ],
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
