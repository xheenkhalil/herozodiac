import { Suspense } from 'react';
import CalculatorPage from '@/app/calculator/page';

export const metadata = {
  title: 'Free Natal Chart Calculator | HeroZodiac',
  description: 'Calculate your exact astrological birth chart with interactive natal wheel, planetary house placements, and Big Three breakdown.',
};

export default function NatalChartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-500 font-sans">
        Aligning planetary transits and houses...
      </div>
    }>
      <CalculatorPage />
    </Suspense>
  );
}
