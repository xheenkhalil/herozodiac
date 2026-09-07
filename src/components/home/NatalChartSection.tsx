'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { calculateChart, BirthData, ChartResult } from '@/lib/astrology';
import { ZodiacGlyph } from '@/components/astro/ZodiacGlyph';
import {
  FontAwesomeIcon,
  faCalendarDays,
  faClock,
  faLocationDot,
  faArrowRight,
  faRotateRight,
  faStar,
  faSun,
  faMoon,
  faCompass,
  faCircleCheck
} from '@/components/ui/Icons';
import { toast } from 'sonner';

interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  timezone?: string;
}

export function NatalChartSection() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('1998-06-21');
  const [birthTime, setBirthTime] = useState('12:00');
  const [unknownTime, setUnknownTime] = useState(false);
  const [cityQuery, setCityQuery] = useState('');
  const [locations, setLocations] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState<GeoLocation | null>({
    id: 5128581,
    name: 'New York',
    latitude: 40.7128,
    longitude: -74.006,
    country: 'United States',
    timezone: 'America/New_York'
  });

  const [loading, setLoading] = useState(false);

  // Search geocoding locations
  useEffect(() => {
    if (cityQuery.length < 3) {
      setLocations([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery)}&count=5&language=en&format=json&timezone=true`
        );
        const data = await res.json();
        if (data.results) {
          setLocations(data.results);
        } else {
          setLocations([]);
        }
      } catch (err) {
        console.error('Geo search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [cityQuery]);

  const handleCalculate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let activeCity = selectedCity;

    // If cityQuery was entered but not selected from dropdown, geocode immediately
    if (!activeCity && cityQuery.trim().length > 1) {
      setLoading(true);
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery.trim())}&count=1&language=en&format=json&timezone=true`
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          activeCity = data.results[0];
          setSelectedCity(activeCity);
        }
      } catch (err) {
        console.error('Geocoding fallback failed:', err);
      }
    }

    // Default fallback if still null
    if (!activeCity) {
      activeCity = {
        id: 5128581,
        name: cityQuery.trim() || 'New York',
        latitude: 40.7128,
        longitude: -74.006,
        country: 'United States',
        timezone: 'America/New_York'
      };
    }

    setLoading(true);

    try {
      const [year, month, day] = (birthDate || '1998-06-21').split('-').map(Number);
      const [hour, minute] = unknownTime ? [12, 0] : (birthTime || '12:00').split(':').map(Number);

      const birthData: BirthData = {
        year: isNaN(year) ? 1998 : year,
        month: isNaN(month) ? 6 : month,
        day: isNaN(day) ? 21 : day,
        hour: isNaN(hour) ? 12 : hour,
        minute: isNaN(minute) ? 0 : minute,
        latitude: activeCity.latitude,
        longitude: activeCity.longitude,
        timezone: activeCity.timezone || 'UTC'
      };

      const chart = calculateChart(birthData);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('herozodiac_birth_data', JSON.stringify({
          formData: birthData,
          name: name || 'Cosmic Traveler',
          cityName: `${activeCity.name}, ${activeCity.country}`
        }));
        localStorage.setItem('herozodiac_chart_result', JSON.stringify(chart));
      }

      // Build parameters with tab=houses
      const query = new URLSearchParams({
        name: name || 'Cosmic Traveler',
        date: birthDate,
        time: unknownTime ? '12:00' : birthTime,
        city: `${activeCity.name}, ${activeCity.country}`,
        lat: activeCity.latitude.toString(),
        lng: activeCity.longitude.toString(),
        tz: activeCity.timezone || 'UTC',
        tab: 'houses'
      }).toString();

      toast.success('Calculating your complete 12-house chart...');
      router.push(`/calculator?${query}`);
    } catch (err) {
      console.error('Calculation error:', err);
      toast.error('Failed to calculate natal chart. Please verify inputs.');
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-sm font-bold tracking-[0.25em] text-stone-900 uppercase font-serif flex items-center justify-center gap-3">
            <span className="text-[#7B1123] text-sm sm:text-base">✦</span>
            <span>FREE NATAL CHART CALCULATOR</span>
            <span className="text-[#7B1123] text-sm sm:text-base">✦</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto mt-2 font-sans">
            Calculate your exact birth chart powered by astronomical algorithms to unlock your Big Three, planetary placements, and cosmic purpose.
          </p>
        </div>

        {/* 2-COLUMN SECTION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: OVERVIEW & FEATURE HIGHLIGHTS */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pr-0 lg:pr-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#7B1123]/10 text-[#7B1123] mb-4 border border-[#7B1123]/20">
                <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
                <span>Astronomical Precision</span>
              </div>

              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 mb-4 leading-tight">
                Map Your True Celestial Blueprint
              </h3>

              <p className="text-stone-600 font-sans leading-relaxed text-sm sm:text-base mb-6">
                At the exact minute you were born, the universe paused in an unrepeatable geometry. Your natal chart is your energetic birth certificate, determining your emotional instincts, intellectual rhythm, and destiny.
              </p>

              {/* FEATURES LIST */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#7B1123]/10 text-[#7B1123] flex items-center justify-center shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={faSun} className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900">The Big Three</h4>
                    <p className="text-xs text-stone-500 mt-0.5">Core Sun, unconscious Moon, and Ascendant/Rising sign.</p>
                  </div>
                </div>

                <div 
                  onClick={() => handleCalculate()}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-stone-200 shadow-sm hover:border-[#7B1123]/40 hover:bg-stone-50/80 transition group cursor-pointer"
                  title="Calculate and view your 12 Astrological Houses"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#7B1123]/10 text-[#7B1123] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition">
                    <FontAwesomeIcon icon={faCompass} className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-[#7B1123] transition">
                        12 Astrological Houses
                      </h4>
                      <span className="text-[10px] font-bold text-[#7B1123] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>View Houses</span>
                        <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">Placidus quadrant system for career, relationships, and hidden potential.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-stone-200 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#7B1123]/10 text-[#7B1123] flex items-center justify-center shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900">Planetary Aspects & Orbs</h4>
                    <p className="text-xs text-stone-500 mt-0.5">Trines, squares, and conjunctions that shape your psychological wiring.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-stone-900 font-serif">Already calculated your chart?</div>
                <div className="text-[11px] text-stone-500">Jump straight into your 12 houses and planetary transits.</div>
              </div>
              <Link href="/calculator?tab=houses">
                <button className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition cursor-pointer flex items-center gap-1.5">
                  <span>View Houses</span>
                  <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 text-[#7B1123]" />
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE QUICK CALCULATOR CARD */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              
              <div className="flex items-center justify-between pb-5 border-b border-stone-200 mb-6">
                <div>
                  <h4 className="font-serif font-bold text-xl text-stone-900">Enter Your Birth Data</h4>
                  <p className="text-xs text-stone-500 mt-0.5">All calculations computed instantly in real-time.</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#7B1123]/10 text-[#7B1123]">
                  100% Free
                </span>
              </div>

              <form onSubmit={handleCalculate} className="space-y-5">
                {/* FULL NAME */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Elena Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1123]/20 focus:border-[#7B1123] transition bg-white"
                  />
                </div>

                {/* DATE & TIME ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                      <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3 text-[#7B1123]" />
                      <span>Date of Birth</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1123]/20 focus:border-[#7B1123] transition bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-[#7B1123]" />
                        <span>Exact Time</span>
                      </span>
                      <label className="inline-flex items-center gap-1 text-[11px] font-normal text-stone-500 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={unknownTime}
                          onChange={(e) => setUnknownTime(e.target.checked)}
                          className="rounded border-stone-300 text-[#7B1123] focus:ring-[#7B1123]"
                        />
                        <span>Unknown</span>
                      </label>
                    </label>
                    <input
                      type="time"
                      disabled={unknownTime}
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1123]/20 focus:border-[#7B1123] transition bg-white ${
                        unknownTime ? 'opacity-50 cursor-not-allowed bg-stone-100' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* BIRTH CITY WITH AUTOCOMPLETE */}
                <div className="relative">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-[#7B1123]" />
                    <span>Birth City / Location</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder={selectedCity ? `${selectedCity.name}, ${selectedCity.country}` : 'Type city name (e.g. London, Tokyo)...'}
                      value={cityQuery}
                      onChange={(e) => setCityQuery(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1123]/20 focus:border-[#7B1123] transition bg-white"
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-sans">
                        Searching...
                      </div>
                    )}
                  </div>

                  {/* AUTOCOMPLETE POPUP */}
                  {locations.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-stone-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-stone-100">
                      {locations.map((loc) => (
                        <button
                          key={loc.id}
                          type="button"
                          onClick={() => {
                            setSelectedCity(loc);
                            setCityQuery('');
                            setLocations([]);
                          }}
                          className="w-full px-4 py-2.5 text-left text-xs sm:text-sm hover:bg-stone-50 transition flex items-center justify-between group"
                        >
                          <span className="font-medium text-stone-800">
                            {loc.name}, {loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {loc.timezone || 'UTC'}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedCity && !cityQuery && (
                    <div className="mt-1.5 text-xs text-stone-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>Selected: <strong className="text-stone-800">{selectedCity.name}, {selectedCity.country}</strong> ({selectedCity.timezone})</span>
                    </div>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white font-bold text-sm tracking-wide transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon icon={faRotateRight} className="w-4 h-4 animate-spin" />
                        <span>Calculating Natal Chart & Houses...</span>
                      </>
                    ) : (
                      <>
                        <span>Calculate My Natal Chart</span>
                        <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
