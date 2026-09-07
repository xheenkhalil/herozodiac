import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faWandMagicSparkles, faHeart } from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'About Us | HeroZodiac',
};

export default function AboutPage() {
  return (
    <article>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">About HeroZodiac</h1>
        <p className="lead text-lg text-muted-foreground max-w-2xl mx-auto">
          Merging ancient celestial wisdom with modern astronomical data science to help you navigate your destiny.
        </p>
      </div>

      <p className="text-foreground/90 leading-relaxed">
        Welcome to <strong className="text-foreground">HeroZodiac</strong>, your premier destination for scientific-grade astrology and self-discovery. In a world of generic fortune cookies, we built HeroZodiac to provide depth, mathematical precision, and psychological clarity.
      </p>

      <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-center shadow-sm">
          <div className="w-12 h-12 bg-[#7B1123]/10 text-[#7B1123] rounded-lg flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faCompass} className="w-5 h-5" />
          </div>
          <h3 className="text-stone-900 font-bold mb-2 font-serif text-lg">Precision</h3>
          <p className="text-sm text-stone-600 leading-relaxed">We use IAU 2006 astronomical ephemeris models to calculate planetary positions with 99.9% accuracy.</p>
        </div>
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-center shadow-sm">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faWandMagicSparkles} className="w-5 h-5" />
          </div>
          <h3 className="text-stone-900 font-bold mb-2 font-serif text-lg">Clarity</h3>
          <p className="text-sm text-stone-600 leading-relaxed">We translate complex astrological geometry into actionable wisdom that empowers your daily life.</p>
        </div>
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 text-center shadow-sm">
          <div className="w-12 h-12 bg-[#7B1123]/10 text-[#7B1123] rounded-lg flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
          </div>
          <h3 className="text-stone-900 font-bold mb-2 font-serif text-lg">Empowerment</h3>
          <p className="text-sm text-stone-600 leading-relaxed">We believe astrology is a mirror for self-understanding, not a rigid script. You are the hero of your own story.</p>
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