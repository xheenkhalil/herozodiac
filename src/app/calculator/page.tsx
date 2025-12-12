'use client';

import { useState, useEffect } from 'react';
import { calculateChart, BirthData, ChartResult } from '@/lib/astrology';
import { ChartReport } from '@/components/astro/ChartReport';
import { ArrowRight, MapPin, Calendar, Clock, Loader2, Sparkles, AlertCircle, Search, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// --- TYPE: Location Suggestion ---
interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  timezone?: string;
}

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChartResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<BirthData>({
    year: 1990, month: 1, day: 1,
    hour: 12, minute: 0,
    latitude: 0, longitude: 0,
    timezone: 'UTC' 
  });

  const [name, setName] = useState("");

  // --- LOCATION STATE ---
  const [locationMode, setLocationMode] = useState<'city' | 'coords'>('city'); // NEW: Tab State
  const [cityQuery, setCityQuery] = useState("");
  const [locations, setLocations] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCityName, setSelectedCityName] = useState("");

  // --- FUNCTION: Fetch Cities ---
  useEffect(() => {
    const fetchCities = async () => {
      if (cityQuery.length < 3) {
        setLocations([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityQuery}&count=5&language=en&format=json&timezone=true`);
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

    const timeoutId = setTimeout(fetchCities, 500); 
    return () => clearTimeout(timeoutId);
  }, [cityQuery]);

  const handleSelectLocation = (loc: GeoLocation) => {
    setFormData({
      ...formData,
      latitude: loc.latitude,
      longitude: loc.longitude,
      timezone: loc.timezone || 'UTC'
    });
    setSelectedCityName(`${loc.name}, ${loc.admin1 || ''} ${loc.country}`);
    setCityQuery(""); 
    setLocations([]); 
  };

  // --- NEW: BROWSER GEOLOCATION ---
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
        toast.success("Coordinates found!");
        setLoading(false);
      },
      (error) => {
        console.error(error);
        toast.error("Unable to retrieve location. Please enter manually.");
        setLoading(false);
      }
    );
  };

  // --- VALIDATION LOGIC ---
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    const { day, month, year, hour, minute } = formData;
    const currentYear = new Date().getFullYear();

    if (!day || day < 1 || day > 31) newErrors.day = "Invalid day";
    if (!month || month < 1 || month > 12) newErrors.month = "Invalid month";
    if (!year || year < 1900 || year > currentYear) newErrors.year = "Invalid year";
    if (hour < 0 || hour > 23) newErrors.hour = "Invalid hour";
    if (minute < 0 || minute > 59) newErrors.minute = "Invalid minute";

    if (!newErrors.day && !newErrors.month && !newErrors.year) {
      const date = new Date(year, month - 1, day);
      if (date.getMonth() !== month - 1 || date.getDate() !== day) {
        newErrors.day = "Date does not exist";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setErrors({});
        setStep(2);
      } else {
        toast.error("Please correct the errors in the form.");
      }
    } else if (step === 2) {
      // VALIDATE LOCATION BASED ON MODE
      if (locationMode === 'city' && !selectedCityName) {
        toast.error("Please select a city or switch to coordinates mode.");
        return;
      }
      if (locationMode === 'coords') {
         if (formData.latitude < -90 || formData.latitude > 90) return toast.error("Invalid Latitude (-90 to 90)");
         if (formData.longitude < -180 || formData.longitude > 180) return toast.error("Invalid Longitude (-180 to 180)");
         // Warn if 0,0 (Null Island) but allow it as it is technically valid
         if (formData.latitude === 0 && formData.longitude === 0) {
             toast('Using coordinates (0, 0)...');
         }
      }
      calculate();
    }
  };

  const calculate = async () => {
    setLoading(true);
    setTimeout(() => {
      try {
        const chart = calculateChart(formData);
        setResult(chart);
        setStep(3);
      } catch (e) {
        console.error(e);
        toast.error("Failed to calculate chart.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const inputClass = (field: string) => `
    w-full bg-slate-950 border rounded-lg p-3 text-white outline-none transition-colors
    ${errors[field] ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-gold-500'}
  `;

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 flex flex-col items-center bg-slate-950">
      
      {step < 3 && (
        <div className="text-center mb-12 max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            <span className="text-maroon-500">Natal Chart</span> Calculator
          </h1>
          <p className="text-slate-400">
            Enter your birth details to generate a precise map of the heavens.
          </p>
        </div>
      )}

      <div className={`w-full ${step === 3 ? 'max-w-7xl' : 'max-w-lg'} transition-all duration-500`}>
        
        {step < 3 && (
          <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <div 
                className="h-full bg-gold-500 transition-all duration-500" 
                style={{ width: step === 2 ? '66%' : '33%' }} 
              />
            </div>

            {/* STEP 1: PERSONAL DETAILS */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                  <span className="text-maroon-400">1.</span> Your Details
                </h2>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Adama Doe" 
                        className={inputClass('name')} 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest pt-4 border-t border-white/5">Birth Information</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Day</label>
                    <input type="number" min="1" max="31" placeholder="DD" className={inputClass('day')} value={formData.day} onChange={(e) => setFormData({...formData, day: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Month</label>
                    <input type="number" min="1" max="12" placeholder="MM" className={inputClass('month')} value={formData.month} onChange={(e) => setFormData({...formData, month: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Year</label>
                    <input type="number" min="1900" max={new Date().getFullYear()} placeholder="YYYY" className={inputClass('year')} value={formData.year} onChange={(e) => setFormData({...formData, year: parseInt(e.target.value) || 0})} />
                  </div>
                </div>

                 <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Birth Time (24h)</label>
                  <div className="flex items-center gap-2">
                      <Clock className="text-slate-600 w-5 h-5 shrink-0" />
                      <div className="flex-1"><input type="number" min="0" max="23" placeholder="HH" className={inputClass('hour')} value={formData.hour} onChange={(e) => setFormData({...formData, hour: parseInt(e.target.value) || 0})} /></div>
                      <span className="text-slate-500 font-bold">:</span>
                      <div className="flex-1"><input type="number" min="0" max="59" placeholder="MM" className={inputClass('minute')} value={formData.minute} onChange={(e) => setFormData({...formData, minute: parseInt(e.target.value) || 0})} /></div>
                  </div>
                  {(errors.hour || errors.minute) && <div className="text-red-400 text-xs mt-1">{errors.hour || errors.minute}</div>}
                </div>
              </motion.div>
            )}

            {/* STEP 2: LOCATION SEARCH (UPDATED WITH TABS) */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                  <MapPin className="text-maroon-400" /> Place of Birth
                </h2>
                
                {/* MODE TOGGLE TABS */}
                <div className="flex p-1 bg-slate-950 rounded-lg border border-slate-800 mb-6">
                   <button 
                     onClick={() => setLocationMode('city')}
                     className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition ${locationMode === 'city' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                   >
                      Search City
                   </button>
                   <button 
                     onClick={() => setLocationMode('coords')}
                     className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition ${locationMode === 'coords' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                   >
                      Coordinates
                   </button>
                </div>

                {/* OPTION A: CITY SEARCH */}
                {locationMode === 'city' && (
                  <div className="space-y-2 relative animate-in fade-in slide-in-from-left-4">
                    <label className="text-xs font-bold text-slate-500 uppercase">City Search</label>
                    {selectedCityName ? (
                      <div className="flex items-center justify-between bg-maroon-900/30 border border-maroon-500/50 p-3 rounded-lg mb-2">
                          <span className="text-white text-sm font-medium">{selectedCityName}</span>
                          <button onClick={() => { setSelectedCityName(""); setFormData({...formData, latitude:0, longitude:0}); }} className="text-xs text-maroon-300 hover:text-white underline">Change</button>
                      </div>
                    ) : (
                      <div className="relative">
                          <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                          <input 
                              type="text" 
                              placeholder="Type city (e.g. Jos, London)..." 
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 p-3 text-white focus:border-gold-500 outline-none"
                              value={cityQuery}
                              onChange={(e) => setCityQuery(e.target.value)}
                          />
                          {isSearching && <Loader2 className="absolute right-3 top-3.5 w-4 h-4 text-slate-500 animate-spin" />}
                      </div>
                    )}
                    {locations.length > 0 && !selectedCityName && (
                      <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                          {locations.map((loc) => (
                              <button 
                                  key={loc.id} 
                                  onClick={() => handleSelectLocation(loc)}
                                  className="w-full text-left p-3 hover:bg-slate-800 text-sm text-slate-300 border-b border-slate-800 last:border-0"
                              >
                                  <span className="font-bold text-white">{loc.name}</span>
                                  <span className="text-slate-500 ml-2 text-xs">{loc.admin1}, {loc.country}</span>
                              </button>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* OPTION B: COORDINATES */}
                {locationMode === 'coords' && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                     <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-slate-500 uppercase">Exact Coordinates</label>
                        <button onClick={handleUseCurrentLocation} className="text-xs flex items-center gap-1 text-gold-400 hover:text-white transition">
                           <Crosshair className="w-3 h-3" /> Use Current Location
                        </button>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="text-[10px] text-slate-600 uppercase mb-1 block">Latitude</label>
                           <input 
                              type="number" step="0.0001" placeholder="0.0000"
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none"
                              value={formData.latitude || ''}
                              onChange={(e) => setFormData({...formData, latitude: parseFloat(e.target.value) || 0})}
                           />
                        </div>
                        <div>
                           <label className="text-[10px] text-slate-600 uppercase mb-1 block">Longitude</label>
                           <input 
                              type="number" step="0.0001" placeholder="0.0000"
                              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-gold-500 outline-none"
                              value={formData.longitude || ''}
                              onChange={(e) => setFormData({...formData, longitude: parseFloat(e.target.value) || 0})}
                           />
                        </div>
                     </div>
                     <p className="text-xs text-slate-500 italic">
                        Tip: You can find exact coords on Google Maps by right-clicking a location.
                     </p>
                  </div>
                )}
                
                <div className="p-4 bg-maroon-900/20 border border-maroon-500/30 rounded-lg text-maroon-200 text-sm flex gap-3">
                  <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>Accurate coordinates ensure your Ascendant and House system are calculated precisely.</p>
                </div>
              </motion.div>
            )}

            {/* FOOTER ACTIONS */}
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
              {step > 1 && <button onClick={() => setStep(step - 1)} className="text-slate-400 hover:text-white text-sm">Back</button>}
              <div className="ml-auto">
                <button 
                  onClick={handleNext} 
                  disabled={loading}
                  className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-200 transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="animate-spin w-4 h-4" /> : null}
                  {step === 2 ? 'Reveal Destiny' : 'Next Step'} 
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && result && (
           <ChartReport 
             data={result} 
             userProfile={{
                 name: name || "Traveler",
                 location: selectedCityName || (locationMode === 'coords' ? `${formData.latitude}, ${formData.longitude}` : "Unknown Location"),
                 date: `${formData.day}/${formData.month}/${formData.year} at ${formData.hour}:${formData.minute.toString().padStart(2,'0')}`
             }}
           />
        )}

      </div>
    </div>
  );
}