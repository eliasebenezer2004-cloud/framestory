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
  title: "FRAMESTORY | Visual Narratives - Event Photography in Tamil Nadu",
  description:
    "Premium event photography services capturing weddings, receptions, first birthdays, and baby showers across Tamil Nadu. Based in Trichy.",
  keywords: [
    "event photography",
    "wedding photographer",
    "Tamil Nadu",
    "Trichy",
    "candid photography",
    "wedding photography",
  ],
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
