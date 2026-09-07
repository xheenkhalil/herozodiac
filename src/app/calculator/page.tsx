'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { calculateChart, BirthData, ChartResult } from '@/lib/astrology';
import { ChartReport } from '@/components/astro/ChartReport';
import {
  FontAwesomeIcon,
  faArrowRight,
  faLocationDot,
  faCalendarDays,
  faClock,
  faRotateRight,
  faStar,
  faMagnifyingGlass
} from '@/components/ui/Icons';
import { motion } from 'framer-motion';
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

function CalculatorContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(3); // Default to 3 while checking params
  const [isHydrated, setIsHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChartResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeReportTab, setActiveReportTab] = useState<'chart' | 'houses' | 'report'>('chart');

  const [formData, setFormData] = useState<BirthData>({
    year: 1994, month: 8, day: 15,
    hour: 12, minute: 0,
    latitude: 0, longitude: 0,
    timezone: 'UTC' 
  });

  const [name, setName] = useState("");
  const [locationMode, setLocationMode] = useState<'city' | 'coords'>('city');
  const [cityQuery, setCityQuery] = useState("");
  const [locations, setLocations] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCityName, setSelectedCityName] = useState("");

  // Hydrate on mount: check URL parameters or localStorage data
  useEffect(() => {
    const tabParam = searchParams?.get('tab');
    if (tabParam === 'houses' || tabParam === 'report' || tabParam === 'chart') {
      setActiveReportTab(tabParam);
    }

    const pDate = searchParams?.get('date');
    const pTime = searchParams?.get('time');
    const pLat = searchParams?.get('lat');
    const pLng = searchParams?.get('lng');
    const pTz = searchParams?.get('tz');
    const pName = searchParams?.get('name');
    const pCity = searchParams?.get('city');

    if (pDate) {
      const [year, month, day] = pDate.split('-').map(Number);
      const [hour, minute] = (pTime || '12:00').split(':').map(Number);
      const lat = pLat ? parseFloat(pLat) : 0;
      const lng = pLng ? parseFloat(pLng) : 0;

      const bData: BirthData = {
        year: isNaN(year) ? 1994 : year,
        month: isNaN(month) ? 8 : month,
        day: isNaN(day) ? 15 : day,
        hour: isNaN(hour) ? 12 : hour,
        minute: isNaN(minute) ? 0 : minute,
        latitude: isNaN(lat) ? 0 : lat,
        longitude: isNaN(lng) ? 0 : lng,
        timezone: pTz || 'UTC'
      };

      setFormData(bData);
      if (pName) setName(pName);
      if (pCity) setSelectedCityName(pCity);

      try {
        const calculated = calculateChart(bData);
        setResult(calculated);
        setStep(3);
        setIsHydrated(true);

        // Sync to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('herozodiac_birth_data', JSON.stringify({
            formData: bData,
            name: pName || '',
            cityName: pCity || ''
          }));
          localStorage.setItem('herozodiac_chart_result', JSON.stringify(calculated));
        }
        return;
      } catch (err) {
        console.error('Auto calculation from URL params failed:', err);
      }
    }

    // Check localStorage fallback
    try {
      const savedData = localStorage.getItem('herozodiac_birth_data');
      const savedResult = localStorage.getItem('herozodiac_chart_result');
      if (savedData && savedResult) {
        const parsedData = JSON.parse(savedData);
        const parsedResult = JSON.parse(savedResult);
        if (parsedData.formData && parsedResult.sun) {
          setFormData(parsedData.formData);
          setName(parsedData.name || '');
          setSelectedCityName(parsedData.cityName || '');
          setResult(parsedResult);
          setStep(3);
          setIsHydrated(true);
          return;
        }
      }
    } catch {
      // ignore
    }

    // If neither URL params nor saved chart exists, show Step 1
    setStep(1);
    setIsHydrated(true);
  }, [searchParams]);

  // City Search Autocomplete
  useEffect(() => {
    const fetchCities = async () => {
      if (cityQuery.length < 3) {
        setLocations([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery)}&count=5&language=en&format=json&timezone=true`);
        const data = await res.json();
        if (data.results) {
          setLocations(data.results);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error("Geo fetch error", error);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(fetchCities, 400); 
    return () => clearTimeout(timeoutId);
  }, [cityQuery]);

  const handleSelectLocation = (loc: GeoLocation) => {
    setFormData({
      ...formData,
      latitude: loc.latitude,
      longitude: loc.longitude,
      timezone: loc.timezone || 'UTC'
    });
    setSelectedCityName(`${loc.name}, ${loc.admin1 ? `${loc.admin1}, ` : ''}${loc.country}`);
    setCityQuery(""); 
    setLocations([]); 
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: parseFloat(position.coords.latitude.toFixed(4)),
          longitude: parseFloat(position.coords.longitude.toFixed(4))
        });
        setSelectedCityName(`Current Coordinates (${position.coords.latitude.toFixed(2)}°, ${position.coords.longitude.toFixed(2)}°)`);
        toast.success("Coordinates detected!");
        setLoading(false);
      },
      (error) => {
        console.error(error);
        toast.error("Unable to retrieve location. Please type your city.");
        setLoading(false);
      }
    );
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (formData.day < 1 || formData.day > 31) errs.day = "Invalid day (1-31)";
    if (formData.month < 1 || formData.month > 12) errs.month = "Invalid month (1-12)";
    if (formData.year < 1900 || formData.year > new Date().getFullYear()) errs.year = "Invalid year";
    if (formData.hour < 0 || formData.hour > 23) errs.hour = "Hour must be 0-23";
    if (formData.minute < 0 || formData.minute > 59) errs.minute = "Minute must be 0-59";
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (formData.latitude === 0 && formData.longitude === 0 && !selectedCityName) {
      errs.location = "Please select a location or enter coordinates";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = async () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      // If user typed cityQuery but didn't pick from dropdown, geocode on the fly
      let activeFormData = { ...formData };
      let activeCityName = selectedCityName;

      if (!selectedCityName && cityQuery.trim().length > 1) {
        setLoading(true);
        try {
          const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery.trim())}&count=1&language=en&format=json&timezone=true`);
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            const loc = data.results[0];
            activeFormData.latitude = loc.latitude;
            activeFormData.longitude = loc.longitude;
            activeFormData.timezone = loc.timezone || 'UTC';
            activeCityName = `${loc.name}, ${loc.country}`;
            setSelectedCityName(activeCityName);
            setFormData(activeFormData);
          }
        } catch {
          // ignore
        }
        setLoading(false);
      }

      calculate(activeFormData, activeCityName);
    }
  };

  const calculate = (bData: BirthData = formData, cityName: string = selectedCityName) => {
    setLoading(true);
    setTimeout(() => {
      try {
        const chart = calculateChart(bData);
        setResult(chart);
        setStep(3);

        if (typeof window !== 'undefined') {
          localStorage.setItem('herozodiac_birth_data', JSON.stringify({
            formData: bData,
            name: name || 'Cosmic Traveler',
            cityName: cityName || ''
          }));
          localStorage.setItem('herozodiac_chart_result', JSON.stringify(chart));
        }

        toast.success("Natal chart & 12 houses calculated!");
      } catch (e) {
        console.error(e);
        toast.error("Failed to calculate chart. Please verify inputs.");
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const inputClass = (field: string) => `
    w-full bg-white border rounded-lg p-3 text-stone-900 outline-none transition-colors
    ${errors[field] ? 'border-red-500 focus:border-red-500' : 'border-stone-300 focus:border-[#7B1123] focus:ring-2 focus:ring-[#7B1123]/20'}
  `;

  // Prevent flash of Step 1 if loading or URL params are being evaluated
  if (!isHydrated) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-stone-50 text-stone-700 font-sans">
        <FontAwesomeIcon icon={faRotateRight} className="w-8 h-8 animate-spin text-[#7B1123] mb-4" />
        <h2 className="font-serif font-bold text-xl text-stone-900">Calculating Your Natal Blueprint...</h2>
        <p className="text-xs text-stone-500 mt-1">Aligning 12 Placidus house sectors, aspects, and planetary degrees</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 flex flex-col items-center bg-stone-50 text-stone-900 font-sans">
      
      {step < 3 && (
        <div className="text-center mb-10 max-w-2xl animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-semibold mb-4 border border-[#7B1123]/20">
            <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
            <span>Astronomical Birth Chart & 12 Houses</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 mb-3">
            <span className="text-[#7B1123]">Natal Chart</span> Calculator
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            Enter your exact birth parameters to calculate your planetary positions, 12 houses, and aspects.
          </p>
        </div>
      )}

      <div className={`w-full ${step === 3 ? 'max-w-6xl' : 'max-w-lg'} transition-all duration-500`}>
        
        {step < 3 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-stone-100">
              <div 
                className="h-full bg-[#7B1123] transition-all duration-500" 
                style={{ width: step === 2 ? '66%' : '33%' }} 
              />
            </div>

            {/* STEP 1: PERSONAL DETAILS */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <span className="text-[#7B1123]">1.</span> Personal Information
                </h2>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Eleanor Vance" 
                    className={inputClass('name')} 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                  {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                </div>
                
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider pt-4 border-t border-stone-100 flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3 text-[#7B1123]" />
                  <span>Date of Birth</span>
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Day</label>
                    <input 
                      type="number" min="1" max="31" placeholder="DD" 
                      className={inputClass('day')} 
                      value={formData.day || ''} 
                      onChange={(e) => setFormData({...formData, day: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Month</label>
                    <input 
                      type="number" min="1" max="12" placeholder="MM" 
                      className={inputClass('month')} 
                      value={formData.month || ''} 
                      onChange={(e) => setFormData({...formData, month: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Year</label>
                    <input 
                      type="number" min="1900" max={new Date().getFullYear()} placeholder="YYYY" 
                      className={inputClass('year')} 
                      value={formData.year || ''} 
                      onChange={(e) => setFormData({...formData, year: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-[#7B1123]" />
                    <span>Birth Time (24h standard)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <input 
                        type="number" min="0" max="23" placeholder="Hour (0-23)" 
                        className={inputClass('hour')} 
                        value={formData.hour} 
                        onChange={(e) => setFormData({...formData, hour: parseInt(e.target.value) || 0})} 
                      />
                    </div>
                    <span className="text-stone-500 font-bold">:</span>
                    <div className="flex-1">
                      <input 
                        type="number" min="0" max="59" placeholder="Min (0-59)" 
                        className={inputClass('minute')} 
                        value={formData.minute} 
                        onChange={(e) => setFormData({...formData, minute: parseInt(e.target.value) || 0})} 
                      />
                    </div>
                  </div>
                  {(errors.hour || errors.minute) && <div className="text-red-500 text-xs mt-1">{errors.hour || errors.minute}</div>}
                </div>
              </motion.div>
            )}

            {/* STEP 2: LOCATION SEARCH */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 flex items-center gap-2">
                  <FontAwesomeIcon icon={faLocationDot} className="text-[#7B1123]" />
                  <span>2. Place of Birth</span>
                </h2>
                
                <div className="flex p-1 bg-stone-100 rounded-xl border border-stone-200 mb-6">
                  <button 
                    onClick={() => setLocationMode('city')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition ${locationMode === 'city' ? 'bg-[#7B1123] text-white shadow' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    Search City
                  </button>
                  <button 
                    onClick={() => setLocationMode('coords')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition ${locationMode === 'coords' ? 'bg-[#7B1123] text-white shadow' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    Coordinates
                  </button>
                </div>

                {locationMode === 'city' && (
                  <div className="space-y-2 relative">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">City Search</label>
                    {selectedCityName ? (
                      <div className="flex items-center justify-between bg-[#7B1123]/10 border border-[#7B1123]/20 p-3.5 rounded-xl mb-2">
                        <span className="text-stone-900 text-sm font-semibold">{selectedCityName}</span>
                        <button 
                          onClick={() => { setSelectedCityName(""); setFormData({...formData, latitude:0, longitude:0}); }} 
                          className="text-xs font-bold text-[#7B1123] hover:underline cursor-pointer"
                        >
                          Change
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400" />
                        <input 
                          type="text" 
                          placeholder="Type birth city (e.g. London, Paris, New York)..." 
                          className="w-full bg-white border border-stone-300 rounded-xl pl-10 p-3 text-sm text-stone-900 focus:border-[#7B1123] outline-none"
                          value={cityQuery}
                          onChange={(e) => setCityQuery(e.target.value)}
                        />
                        {isSearching && <FontAwesomeIcon icon={faRotateRight} className="absolute right-3.5 top-3.5 w-4 h-4 text-stone-400 animate-spin" />}
                      </div>
                    )}

                    {locations.length > 0 && !selectedCityName && (
                      <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-stone-200 rounded-xl shadow-xl max-h-60 overflow-y-auto divide-y divide-stone-100">
                        {locations.map((loc) => (
                          <button 
                            key={loc.id} 
                            onClick={() => handleSelectLocation(loc)}
                            className="w-full text-left p-3 hover:bg-stone-50 text-sm text-stone-700 transition flex items-center justify-between group"
                          >
                            <span className="font-bold text-stone-900 group-hover:text-[#7B1123]">{loc.name}</span>
                            <span className="text-stone-500 text-xs">{loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {locationMode === 'coords' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Exact Coordinates</label>
                      <button onClick={handleUseCurrentLocation} className="text-xs flex items-center gap-1 text-[#7B1123] font-bold hover:underline cursor-pointer">
                        <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" />
                        <span>Use Current Location</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-stone-500 uppercase mb-1 block font-bold">Latitude</label>
                        <input 
                          type="number" step="0.0001" placeholder="0.0000"
                          className="w-full bg-white border border-stone-300 rounded-xl p-3 text-sm text-stone-900 focus:border-[#7B1123] outline-none"
                          value={formData.latitude || ''}
                          onChange={(e) => setFormData({...formData, latitude: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 uppercase mb-1 block font-bold">Longitude</label>
                        <input 
                          type="number" step="0.0001" placeholder="0.0000"
                          className="w-full bg-white border border-stone-300 rounded-xl p-3 text-sm text-stone-900 focus:border-[#7B1123] outline-none"
                          value={formData.longitude || ''}
                          onChange={(e) => setFormData({...formData, longitude: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-4 bg-[#7B1123]/10 border border-[#7B1123]/20 rounded-lg text-[#7B1123] text-xs flex gap-3">
                  <FontAwesomeIcon icon={faStar} className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>Accurate coordinates allow exact mathematical calculation of your Ascendant, Midheaven, and all 12 Placidus house cusps.</p>
                </div>
              </motion.div>
            )}

            {/* FOOTER ACTIONS */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex justify-between items-center">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="text-stone-500 hover:text-stone-900 text-xs font-semibold cursor-pointer">
                  ← Back
                </button>
              )}
              <div className="ml-auto">
                <button 
                  onClick={handleNext} 
                  disabled={loading}
                  className="bg-[#7B1123] hover:bg-[#9E1B32] text-white px-6 py-2.5 rounded-lg font-semibold text-xs transition flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {loading && <FontAwesomeIcon icon={faRotateRight} className="animate-spin w-3 h-3" />}
                  <span>{step === 2 ? 'Calculate My Natal Chart & Houses' : 'Next Step'}</span>
                  {!loading && <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && result && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-4 py-2.5 rounded-lg shadow-sm hover:bg-stone-50 transition cursor-pointer"
              >
                <span>← Edit Birth Information / Recalculate</span>
              </button>
            </div>
            
            <ChartReport 
              data={result} 
              initialTab={activeReportTab}
              userProfile={{
                name: name || "Cosmic Traveler",
                location: selectedCityName || (locationMode === 'coords' ? `${formData.latitude}, ${formData.longitude}` : "Coordinates"),
                date: `${formData.day}/${formData.month}/${formData.year} at ${formData.hour}:${formData.minute.toString().padStart(2,'0')}`
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-stone-50 text-stone-700 font-sans">
        <FontAwesomeIcon icon={faRotateRight} className="w-8 h-8 animate-spin text-[#7B1123] mb-4" />
        <h2 className="font-serif font-bold text-xl text-stone-900">Calculating Your Natal Blueprint...</h2>
        <p className="text-xs text-stone-500 mt-1">Aligning 12 Placidus house sectors, aspects, and planetary degrees</p>
      </div>
    }>
      <CalculatorContent />
    </Suspense>
  );
}