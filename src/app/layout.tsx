import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heritage-lens.vercel.app"),
  title: {
    default: "FRAMESTORY | Event Photography in Tamil Nadu",
    template: "%s | FRAMESTORY",
  },
  description:
    "Premium event photography services capturing weddings, receptions, first birthdays, and baby showers across Tamil Nadu. Based in Trichy.",
  keywords: [
    "event photography",
    "wedding photographer",
    "Tamil Nadu",
    "Trichy",
    "candid photography",
    "wedding photography",
    "baby shower photography",
    "first birthday photographer",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "FRAMESTORY",
    title: "FRAMESTORY | Event Photography in Tamil Nadu",
    description:
      "Premium event photography services capturing weddings, receptions, first birthdays, and baby showers across Tamil Nadu.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FRAMESTORY - Event Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FRAMESTORY | Event Photography in Tamil Nadu",
    description:
      "Premium event photography services capturing weddings, receptions, first birthdays, and baby showers across Tamil Nadu.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <div className="grain-overlay" />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
