import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE, CONTACT } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Wedding Photography in Trichy`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "wedding photography",
    "event photography",
    "Trichy",
    "Tamil Nadu",
    "candid photography",
    "wedding photographer Trichy",
    "baby shower photography",
    "puberty function photography",
    "pre-wedding shoot",
    "Tamil wedding photographer",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: `${SITE.name} | Wedding Photography in Trichy`,
    description: SITE.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} - Wedding Photography`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Wedding Photography in Trichy`,
    description: SITE.description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.state,
    postalCode: CONTACT.address.pin,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.7905,
    longitude: 78.7047,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "10:00",
    closes: "22:00",
  },
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: CONTACT.googleRating,
    bestRating: "5",
    ratingCount: "127",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Photography Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Premium Wedding Photography",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Event Photography",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pre-Wedding Shoots",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
