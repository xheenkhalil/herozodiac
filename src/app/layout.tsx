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
  title: {
    template: '%s | HeroZodiac',
    default: 'HeroZodiac | Advanced Astrology & Horoscopes',
  },
  description: "Unveil your destiny with scientific-grade birth charts and daily cosmic insights.",
  // Crucial for Bots to verify ownership
  metadataBase: new URL('https://herozodiac.com'), 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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