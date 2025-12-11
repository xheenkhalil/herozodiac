'use client';


import { useState } from 'react';
import { calculateSynastry, CompatibilityResult } from '@/lib/compatibility';
import { BirthData } from '@/lib/astrology';
import { Heart, ArrowRight, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Reusable Input Component to clean up code
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
      <label className="text-[10px] text-slate-500 uppercase font-bold">{label}</label>
      <input 
        type="text" 
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={maxLen}
        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm focus:border-gold-500 focus:outline-none transition" 
        placeholder={placeholder} 
        value={hideZero && value === 0 ? '' : value}
        onChange={handleChange}
      />
    </div>
  );
};

const PersonInput = ({ label, data, onChange }: { label: string, data: BirthData, onChange: (d: BirthData) => void }) => (
  <div className="bg-slate-900/50 border border-white/10 p-6 rounded-2xl">
    <div className="flex items-center gap-2 mb-4 text-gold-400">
      <User className="w-4 h-4" /> <span className="text-sm font-bold uppercase tracking-wider">{label}</span>
    </div>
    
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <InputField label="Day" value={data.day} maxLen={2} placeholder="DD" onChange={(v) => onChange({...data, day: v})} hideZero />
        <InputField label="Month" value={data.month} maxLen={2} placeholder="MM" onChange={(v) => onChange({...data, month: v})} hideZero />
        <InputField label="Year" value={data.year} maxLen={4} placeholder="YYYY" onChange={(v) => onChange({...data, year: v})} hideZero />
      </div>
      
      <div>
         <label className="text-[10px] text-slate-500 uppercase font-bold">Time (24h)</label>
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

  const [personA, setPersonA] = useState<BirthData>({ year: 1995, month: 1, day: 1, hour: 12, minute: 0, latitude: 0, longitude: 0 });
  const [personB, setPersonB] = useState<BirthData>({ year: 1995, month: 1, day: 1, hour: 12, minute: 0, latitude: 0, longitude: 0 });

  const isValidDate = (d: BirthData) => {
    if (!d.year || !d.month || !d.day) return false;
    const date = new Date(d.year, d.month - 1, d.day);
    return date.getFullYear() === d.year && date.getMonth() === d.month - 1 && date.getDate() === d.day;
  };

  const handleCalculate = () => {
    setLoading(true);
    
    // Validation
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

    // Simulate calculation time
    setTimeout(() => {
      try {
        const res = calculateSynastry(personA, personB);
        setResult(res);
        toast.success("Compatibility calculated!");
      } catch (e) {
        toast.error("Calculation failed. Check dates.");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-slate-950">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
          Synastry <span className="text-maroon-500">Love Calculator</span>
        </h1>
        <p className="text-slate-400">
          Compare two birth charts to reveal the hidden mechanics of your relationship. 
          Is it a karmic lesson or a soulmate connection?
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* INPUT SECTION */}
        {!result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <PersonInput label="You (Partner A)" data={personA} onChange={setPersonA} />
            
            {/* Divider Icon */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex w-12 h-12 bg-slate-950 border border-slate-700 rounded-full items-center justify-center text-maroon-500 shadow-xl">
               <Heart className="w-5 h-5 fill-current" />
            </div>

            <PersonInput label="Them (Partner B)" data={personB} onChange={setPersonB} />
            
            <div className="md:col-span-2 text-center mt-8">
              <button 
                onClick={handleCalculate}
                disabled={loading}
                className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gold-400 transition shadow-lg shadow-white/10 disabled:opacity-70"
              >
                {loading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4"/> Aligning Stars...</span> : 'Reveal Compatibility'}
              </button>
            </div>
          </div>
        )}

        {/* RESULTS SECTION */}
        {result && (
          <div className="max-w-3xl mx-auto animate-fade-in-up">
             
             {/* Score Card */}
             <div className="bg-slate-900 border border-white/10 rounded-3xl p-10 text-center relative overflow-hidden mb-8">
                {/* Background Glow */}
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-gold-500 to-green-500`} />
                
                <div className="mb-6 inline-flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-slate-800 bg-slate-950">
                   <span className="text-4xl font-bold text-white">{result.score}%</span>
                </div>
                
                <h2 className="text-3xl font-serif font-bold text-gold-400 mb-2">{result.verdict}</h2>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  Based on the geometric angles between your planets, this relationship has a distinct energy signature.
                </p>

                <div className="mt-8 flex justify-center">
                   <button onClick={() => setResult(null)} className="text-sm text-slate-500 hover:text-white underline">Check Another Match</button>
                </div>
             </div>

             {/* Details Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.details.map((item, i) => (
                   <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                      <h4 className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2">{item.category}</h4>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mb-4 overflow-hidden">
                         <div className="bg-maroon-500 h-full rounded-full" style={{ width: `${item.score}%` }} />
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                   </div>
                ))}
             </div>

          </div>
        )}

      </div>
    </div>
  );
}