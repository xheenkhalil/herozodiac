import { Metadata } from 'next';
import { Sparkles, Map, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | HeroZodiac',
};

export default function AboutPage() {
  return (
    <article>
      <div className="text-center mb-12">
        <h1 className="mb-4">About HeroZodiac</h1>
        <p className="lead text-lg text-slate-300">
          Merging ancient celestial wisdom with modern data science to help you navigate your destiny.
        </p>
      </div>

      <p>
        Welcome to <strong>HeroZodiac</strong>, your premier destination for scientific-grade astrology and cosmic insights. In a world full of generic horoscopes, we built HeroZodiac to provide depth, accuracy, and clarity.
      </p>

      <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
        <div className="bg-slate-950 p-6 rounded-xl border border-white/10 text-center">
          <div className="w-12 h-12 bg-maroon-900/30 text-maroon-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Map className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold mb-2">Precision</h3>
          <p className="text-sm text-slate-400">We use NASA-grade ephemeris data (IAU 2006) to calculate planetary positions with 99.9% accuracy.</p>
        </div>
        <div className="bg-slate-950 p-6 rounded-xl border border-white/10 text-center">
          <div className="w-12 h-12 bg-gold-500/20 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold mb-2">Clarity</h3>
          <p className="text-sm text-slate-400">We translate complex astrological geometry into plain, actionable English that empowers your daily life.</p>
        </div>
        <div className="bg-slate-950 p-6 rounded-xl border border-white/10 text-center">
          <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-white font-bold mb-2">Empathy</h3>
          <p className="text-sm text-slate-400">We believe astrology is a tool for self-understanding, not a rigid script. You are the hero of your own story.</p>
        </div>
      </div>

      <h3>Our Mission</h3>
      <p>
        Astrology has often been misunderstood or oversimplified. Our mission is to restore the dignity of this ancient practice by presenting it through a modern, clean, and data-driven lens. We believe that by understanding the cosmic weather, you can make better decisions here on Earth.
      </p>

      <h3>The Tech Behind the Magic</h3>
      <p>
        HeroZodiac is built on a cutting-edge stack using Next.js and high-precision astronomical libraries. Unlike many sites that rely on static lookup tables, we calculate your chart in real-time based on the exact latitude and longitude of your birth city.
      </p>
    </article>
  );
}