import { getLatestPosts, Article } from '@/lib/quanta';
import { HeroSection } from '@/components/home/HeroSection';
import { ZodiacSection } from '@/components/home/ZodiacSection';
import { NatalChartSection } from '@/components/home/NatalChartSection';
import { ArchetypeSection } from '@/components/home/ArchetypeSection';
import { ExploreSystemsSection } from '@/components/home/ExploreSystemsSection';
import { DailyHoroscopeRibbon } from '@/components/home/DailyHoroscopeRibbon';
import { EditorialSection } from '@/components/home/EditorialSection';
import { CosmicInsightSection } from '@/components/home/CosmicInsightSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';

export const revalidate = 60; // Re-fetch content every 60 seconds

export default async function Home() {
  // Gracefully attempt fetching latest CMS articles from Quanta Press
  let articles: Article[] = [];
  try {
    articles = await getLatestPosts(4);
  } catch (error) {
    console.warn("Quanta Press CMS offline or credentials unavailable, using editorial fallback.", error);
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#7B1123] selection:text-white">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. DISCOVER YOUR ZODIAC (12-sign card grid) */}
      <ZodiacSection />

      {/* 3. FREE NATAL CHART CALCULATOR */}
      <NatalChartSection />

      {/* 4. WHAT IS YOUR ARCHETYPE? */}
      <ArchetypeSection />

      {/* 4. EXPLORE MORE ABOUT YOURSELF (7 systems) */}
      <ExploreSystemsSection />

      {/* 5. TODAY'S HOROSCOPE (Maroon ribbon across all 12 signs) */}
      <DailyHoroscopeRibbon />

      {/* 6. EXPLORE OUR CONTENT (Editorial cards powered by CMS) */}
      <EditorialSection cmsArticles={articles} />

      {/* 7. TODAY'S COSMIC INSIGHT */}
      <CosmicInsightSection />

      {/* 8. WHAT PEOPLE ARE SAYING (Testimonials) */}
      <TestimonialsSection />

      {/* 9. CELESTIAL CTA */}
      <FinalCTASection />
    </div>
  );
}