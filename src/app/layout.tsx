import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar"; // <-- NEW
import { Footer } from "@/components/layout/Footer"; // <-- Ensure this path is correct
import { CookieConsent } from "@/components/legal/CookieConsent"; // <-- NEW
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });
const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://herozodiac.vercel.app'),
  title: {
    template: '%s | HeroZodiac',
    default: 'HeroZodiac | Advanced Astrology & Horoscopes',
  },
  description: "Unveil your destiny with scientific-grade birth charts and daily cosmic insights.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'HeroZodiac',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.jpg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // JSON-LD for "Organization" schema (Smart SEO for Knowledge Graph)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HeroZodiac',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://herozodiac.vercel.app',
    logo: 'https://herozodiac.vercel.app/logo.png', // Placeholder
    sameAs: [
      'https://twitter.com/herozodiac', 
      'https://instagram.com/herozodiac'
    ],
    description: 'Advanced astrology platform providing natal charts, daily cosmic weather, and compatibility analysis.'
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-slate-950 text-slate-100 antialiased selection:bg-maroon-900 selection:text-white`}>
        
        <Navbar />
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <Footer />
        
        <CookieConsent />
        <Toaster position="top-center" theme="dark" />
      </body>
    </html>
  );
}