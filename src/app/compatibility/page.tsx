'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateSynastry, CompatibilityResult } from '@/lib/compatibility';
import { BirthData } from '@/lib/astrology';
import {
  FontAwesomeIcon,
  faHeart,
  faUser,
  faRotateRight,
  faStar,
  faArrowRight
} from '@/components/ui/Icons';
import { toast } from 'sonner';

const InputField = ({ label, value, onChange, placeholder, maxLen, hideZero = false }: { label: string, value: number, onChange: (val: number) => void, placeholder: string, maxLen: number, hideZero?: boolean }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
       onChange(0); 
       return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num)) onChange(num);
  };

  return (
    <div>
      <label className="text-[10px] text-stone-500 uppercase font-bold">{label}</label>
      <input 
        type="text" 
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={maxLen}
        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 text-sm focus:border-[#7B1123] focus:outline-none transition" 
        placeholder={placeholder} 
        value={hideZero && value === 0 ? '' : value}
        onChange={handleChange}
      />
    </div>
  );
};

const PersonInput = ({ label, data, onChange }: { label: string, data: BirthData, onChange: (d: BirthData) => void }) => (
  <div className="bg-white border border-stone-200 p-6 sm:p-8 rounded-2xl shadow-sm">
    <div className="flex items-center gap-2.5 mb-6 text-[#7B1123]">
      <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
      <span className="text-sm font-bold uppercase tracking-wider">{label}</span>
    </div>
    
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2.5">
        <InputField label="Day" value={data.day} maxLen={2} placeholder="DD" onChange={(v) => onChange({...data, day: v})} hideZero />
        <InputField label="Month" value={data.month} maxLen={2} placeholder="MM" onChange={(v) => onChange({...data, month: v})} hideZero />
        <InputField label="Year" value={data.year} maxLen={4} placeholder="YYYY" onChange={(v) => onChange({...data, year: v})} hideZero />
      </div>
      
      <div>
         <label className="text-[10px] text-stone-500 uppercase font-bold">Time of Birth (24h)</label>
         <div className="flex gap-2">
           <InputField label="" value={data.hour} maxLen={2} placeholder="HH" onChange={(v) => onChange({...data, hour: v})} />
           <InputField label="" value={data.minute} maxLen={2} placeholder="MM" onChange={(v) => onChange({...data, minute: v})} />
         </div>
      </div>
    </div>
  </div>
);

export default function CompatibilityPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const [personA, setPersonA] = useState<BirthData>({ year: 1993, month: 4, day: 12, hour: 14, minute: 30, latitude: 0, longitude: 0 });
  const [personB, setPersonB] = useState<BirthData>({ year: 1995, month: 7, day: 22, hour: 9, minute: 15, latitude: 0, longitude: 0 });

  const isValidDate = (d: BirthData) => {
    if (!d.year || !d.month || !d.day) return false;
    const date = new Date(d.year, d.month - 1, d.day);
    return date.getFullYear() === d.year && date.getMonth() === d.month - 1 && date.getDate() === d.day;
  };

  const handleCalculate = () => {
    setLoading(true);
    
    if (!isValidDate(personA)) {
      setLoading(false);
      toast.error("Partner A's date is invalid.");
      return;
    }
    if (!isValidDate(personB)) {
      setLoading(false);
      toast.error("Partner B's date is invalid.");
      return;
    }

    setTimeout(() => {
      try {
        const res = calculateSynastry(personA, personB);
        setResult(res);
        toast.success("Synastry compatibility calculated!");
      } catch (e) {
        toast.error("Calculation failed. Please check birth parameters.");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 bg-stone-50 text-stone-900 font-sans">
      
      {/* BREADCRUMB */}
      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <span>/</span>
          <Link href="/astrology" className="hover:text-stone-900 transition">Astrology</Link>
          <span>/</span>
          <span className="text-[#7B1123] font-semibold">Love Compatibility</span>
        </nav>
      </div>

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-semibold mb-4 border border-[#7B1123]/20">
          <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
          <span>Synastry Match Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 mb-3">
          Love & Synastry <span className="text-[#7B1123]">Compatibility</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Compare planetary aspects between two charts to calculate energetic resonance, emotional safety, and relational synergy.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* INPUT SECTION */}
        {!result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <PersonInput label="Partner A (You)" data={personA} onChange={setPersonA} />
            
            {/* Divider Icon */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex w-12 h-12 bg-white border border-[#7B1123]/30 rounded-lg items-center justify-center text-[#7B1123] shadow-md">
               <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-[#7B1123]" />
            </div>

            <PersonInput label="Partner B (Partner / Friend)" data={personB} onChange={setPersonB} />
            
            <div className="md:col-span-2 text-center mt-6">
              <button 
                onClick={handleCalculate}
                disabled={loading}
                className="bg-[#7B1123] hover:bg-[#9E1B32] text-white px-8 py-3.5 rounded-lg font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-[#7B1123]/25 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faRotateRight} className="animate-spin w-3 h-3"/>
                    <span>Computing Planetary Synastry...</span>
                  </span>
                ) : (
                  'Reveal Compatibility Report'
                )}
              </button>
            </div>
          </div>
        )}

        {/* RESULTS SECTION */}
        {result && (
          <div className="max-w-3xl mx-auto animate-fade-in">
             
             {/* Score Card */}
             <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden mb-8 shadow-sm">
                <div className="mb-6 inline-flex flex-col items-center justify-center w-32 h-32 rounded-xl border-4 border-[#7B1123]/20 bg-stone-50">
                   <span className="text-4xl font-serif font-bold text-[#7B1123]">{result.score}%</span>
                   <span className="text-[10px] uppercase font-bold text-stone-500">Match Score</span>
                </div>
                
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">
                  {result.verdict}
                </h2>
                <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed font-sans">
                  Calculated from inter-planetary aspects across Sun, Moon, and Venus/Mars placements.
                </p>

                <div className="mt-8 flex justify-center">
                   <button
                    onClick={() => setResult(null)}
                    className="text-xs font-semibold text-[#7B1123] hover:underline flex items-center gap-1.5 cursor-pointer"
                   >
                     <span>Check Another Synastry Match</span>
                     <FontAwesomeIcon icon={faRotateRight} className="w-2.5 h-2.5" />
                   </button>
                </div>
             </div>

             {/* Details Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.details.map((item, i) => (
                   <div key={i} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                      <h3 className="text-[#7B1123] text-xs font-bold uppercase tracking-wider mb-2">{item.category}</h3>
                      <div className="w-full bg-stone-100 h-2 rounded-full mb-4 overflow-hidden">
                         <div className="bg-[#7B1123] h-full rounded-full transition-all" style={{ width: `${item.score}%` }} />
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed font-sans">{item.description}</p>
                   </div>
                ))}
             </div>

          </div>
        )}

      </div>
    </div>
  );
}