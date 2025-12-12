import { useState, useMemo } from 'react';
import { ChartResult, PlanetPosition, Aspect } from '@/lib/astrology';
import { NatalWheel } from './NatalWheel';
import { Square, Triangle, Hexagon, Minus, Circle, FileText, LayoutTemplate, X } from 'lucide-react';
import { PlanetGlyph } from './PlanetGlyph';
import { ReportEngine } from '@/lib/report-engine';

interface ChartReportProps {
  data: ChartResult;
  userProfile?: {
    name: string;
    location: string;
    date: string;
  };
}

// Helpers
const isMajorAspect = (type: string) => ['Conjunction', 'Opposition', 'Square', 'Trine'].includes(type);

const AspectIcon = ({ type }: { type: string }) => {
  const c = "w-4 h-4 stroke-[1.5px]";
  switch (type) {
    case 'Square': return <Square className={`${c} text-red-500`} />;
    case 'Trine': return <Triangle className={`${c} text-green-500`} />;
    case 'Sextile': return <Hexagon className={`${c} text-blue-400`} />;
    case 'Opposition': return <Minus className={`${c} text-red-500 rotate-90`} />;
    default: return <Circle className={`${c} text-slate-600`} />;
  }
};

const BigThreeItem = ({ label, value, degree, color }: { label: string, value: string, degree: number, color: string }) => (
  <div className="flex flex-col items-center group">
    <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-2 group-hover:text-gold-400 transition">{label}</span>
    <span className={`text-2xl md:text-4xl font-serif font-bold ${color} mb-1 drop-shadow-lg`}>{value}</span>
    <span className="text-xs font-mono text-slate-600">{degree.toFixed(2)}°</span>
  </div>
);

export function ChartReport({ data, userProfile }: ChartReportProps) {
  const [viewMode, setViewMode] = useState<'chart' | 'report'>('chart');
  
  const report = useMemo(() => ReportEngine.generate(data), [data]);
  const majorAspects = data.aspects.filter(a => isMajorAspect(a.type));
  const minorAspects = data.aspects.filter(a => !isMajorAspect(a.type));

  const { generatePDF, isGenerating } = usePDFGenerator(data, report, userProfile);

  return (
    <div className="w-full bg-slate-950 min-h-screen pb-32 animate-fade-in text-slate-100">
      
      {/* 1. REPORT HERO: Centered Title & Chart */}
      <section className="pt-16 pb-12 text-center max-w-4xl mx-auto px-6 relative">
        
        {/* Background Ambience */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-maroon-900/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 mb-4">
            <span className="inline-block px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                {userProfile?.name ? `Prepared for ${userProfile.name}` : 'Personalized Report'}
            </span>
        </div>

        <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 relative z-10">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">Cosmic Blueprint</span>
        </h2>
        
        {/* VIEW TOGGLE */}
        <div className="flex justify-center gap-4 mb-12 relative z-20">
            <button 
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold tracking-wider transition ${viewMode === 'chart' ? 'bg-gold-500 text-slate-900' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
            >
               <LayoutTemplate className="w-4 h-4" /> Chart
            </button>
            <button 
              onClick={() => setViewMode('report')}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold tracking-wider transition ${viewMode === 'report' ? 'bg-gold-500 text-slate-900' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
            >
               <FileText className="w-4 h-4" /> Full Report
            </button>
        </div>

        {viewMode === 'chart' ? (
          <>
            {/* The Wheel - Floating, Dark Mode */}
            <div className="relative w-full max-w-[600px] mx-auto aspect-square mb-16 z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <NatalWheel planets={data.planets} aspects={data.aspects} cusps={data.houses} />
            </div>

            {/* The "Big Three" Row */}
            <div className="flex justify-center gap-12 md:gap-24 border-t border-b border-white/10 py-10 max-w-2xl mx-auto relative z-10">
               <BigThreeItem label="Sun" value={data.sun.sign} degree={data.sun.degree} color="text-white" />
               <BigThreeItem label="Moon" value={data.moon.sign} degree={data.moon.degree} color="text-slate-300" />
               <BigThreeItem label="Rising" value={data.rising.sign} degree={data.rising.degree} color="text-maroon-400" />
            </div>
            
            {/* ... EXISTING SECTIONS ... */}
             <section className="max-w-4xl mx-auto px-6 py-12 text-left">
                {/* ... Detailed Analysis & Aspects ... */}
                {/* Due to replace logic, I need to preserve the content or re-write it. 
                    Merging View Mode Logic: I will render the PLANET LIST and ASPECTS sections ONLY if viewMode === 'chart'.
                */}
             </section>
          </>
        ) : (
          <div className="max-w-3xl mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* TEXT REPORT VIEW */}
             <div className="bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm">
                <h3 className="text-3xl font-serif font-bold text-white mb-8 border-b border-white/10 pb-4">In-Depth Analysis</h3>
                
                <div className="space-y-12">
                   {report.sections.map((section, idx) => (
                      <div key={idx}>
                         <h4 className="text-xl font-bold text-gold-400 mb-4 font-serif">{section.title}</h4>
                         <p className="text-slate-300 leading-relaxed text-lg font-light">
                            {section.content}
                         </p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}
      </section>

      {/* CHART CONTENT (Only show if Chart Mode) */}
      {viewMode === 'chart' && (
        <>
            {/* 2. PLANETS LIST */}
            <section className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-10 flex items-center gap-4">
                <h3 className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase whitespace-nowrap">Detailed Analysis</h3>
                <div className="h-px w-full bg-white/10" />
                </div>

                <div className="bg-white/5 p-8 border border-white/10 rounded-xl backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {data.planets.map((planet, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group hover:bg-white/5 transition px-4 rounded-lg -mx-2">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/80 border border-white/10 group-hover:border-gold-500 transition ${ ['Sun','Moon','Asc','MC','North Node'].includes(planet.name) ? 'text-gold-400' : 'text-slate-300' }`}>
                            <PlanetGlyph name={planet.name} className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-base font-bold text-slate-100 font-serif group-hover:text-white">{planet.name}</div>
                                <div className="text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-gold-500/80 transition">House {planet.house}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-base text-maroon-400 font-serif group-hover:text-maroon-300 transition">
                            {planet.sign}
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 mt-0.5 group-hover:text-slate-400">
                            {planet.degree.toFixed(2)}° {planet.retrograde && '(R)'}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </section>

            {/* 3. ASPECTS */}
            <section className="max-w-4xl mx-auto px-6 pb-20">
                <div className="mb-10 flex items-center gap-4">
                <h3 className="text-xs font-bold tracking-[0.2em] text-gold-500 uppercase whitespace-nowrap">Geometric Angles</h3>
                <div className="h-px w-full bg-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Major Column */}
                <div className="bg-white/5 p-4 md:p-8 border border-white/10 rounded-xl backdrop-blur-sm">
                    <h4 className="font-serif font-bold text-lg mb-6 text-white border-b border-white/10 pb-4 flex items-center justify-between">
                        <span>Major Aspects</span>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-sans font-normal">Strong Influence</span>
                    </h4>
                    <div className="space-y-4">
                        {majorAspects.length === 0 ? <p className="text-slate-500 text-sm italic">None found.</p> : majorAspects.map((aspect, i) => (
                            <div key={i} className="flex items-center justify-between text-sm group hover:bg-white/5 p-2 rounded transition -mx-2">
                            <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                                <AspectIcon type={aspect.type} />
                                <span className="text-slate-300 group-hover:text-white transition break-words">
                                    <span className="font-semibold">{aspect.planet1}</span>
                                    <span className="text-slate-500 mx-1.5 lowercase italic">{aspect.type}</span>
                                    <span className="font-semibold">{aspect.planet2}</span>
                                </span>
                            </div>
                            <span className="text-slate-600 text-xs font-mono group-hover:text-gold-500 transition shrink-0">{aspect.orb}°</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Minor Column */}
                <div className="bg-white/5 p-4 md:p-8 border border-white/10 rounded-xl backdrop-blur-sm">
                    <h4 className="font-serif font-bold text-lg mb-6 text-slate-200 border-b border-white/10 pb-4 flex items-center justify-between">
                        <span>Minor Aspects</span>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-sans font-normal">Subtle Influence</span>
                    </h4>
                    <div className="space-y-4">
                        {minorAspects.length === 0 ? <p className="text-slate-500 text-sm italic">None found.</p> : minorAspects.map((aspect, i) => (
                            <div key={i} className="flex items-center justify-between text-sm text-slate-400 group hover:bg-white/5 p-2 rounded transition -mx-2">
                            <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                                <div className="w-4 h-4 flex items-center justify-center shrink-0"><div className="w-1 h-1 bg-slate-500 rounded-full group-hover:bg-gold-400 transition" /></div>
                                <span className="group-hover:text-slate-200 transition break-words">
                                    <span className="font-medium text-slate-300 group-hover:text-white">{aspect.planet1}</span>
                                    <span className="text-slate-600 mx-1.5 lowercase italic">{aspect.type}</span>
                                    <span className="font-medium text-slate-300 group-hover:text-white">{aspect.planet2}</span>
                                </span>
                            </div>
                            <span className="text-slate-700 text-xs font-mono group-hover:text-gold-500/70 transition shrink-0">{aspect.orb}°</span>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </section>
        </>
      )}

      {/* 4. DOWNLOAD CTA (Visible in both modes? Yes) */}
      <div className="text-center pb-20">
         <button 
            onClick={generatePDF}
            disabled={isGenerating}
            className="bg-gold-500 text-slate-950 px-10 py-4 rounded-full uppercase tracking-[0.15em] text-xs font-bold hover:bg-gold-400 hover:scale-105 transition duration-300 shadow-lg shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
         >
            {isGenerating ? 'Generating PDF...' : 'Download Full PDF Report'}
         </button>
      </div>

    </div>
  );
}

// PDF Generator Hook
function usePDFGenerator(data: any, report: any, user: any) {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async () => {
        setIsGenerating(true);
        try {
            const { jsPDF } = await import('jspdf');
            const html2canvas = (await import('html2canvas')).default;

            const doc = new jsPDF({ format: 'a4', unit: 'mm' });
            const W = doc.internal.pageSize.getWidth();
            const H = doc.internal.pageSize.getHeight();
            const margin = 20;
            let cursorY = margin;

            // 1. COVER PAGE
            doc.setFillColor(2, 6, 23); // Slate 950
            doc.rect(0, 0, W, H, 'F');
            
            doc.setTextColor(255, 194, 76); // Gold
            doc.setFont('times', 'bold');
            doc.setFontSize(32);
            doc.text("COSMIC BLUEPRINT", W/2, 60, { align: 'center' });
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'normal');
            
            // User Name
            const ownerName = user?.name || "User";
            doc.text(`Astrological Analysis for ${ownerName}`, W/2, 75, { align: 'center' });

            // Date/Loc
            if (user?.date && user?.location) {
                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text(`Born: ${user.date} • ${user.location}`, W/2, 82, { align: 'center' });
            }

            const wheelEl = document.querySelector('.natal-wheel-container') as HTMLElement;
            if (wheelEl) {
               const canvas = await html2canvas(wheelEl, {
                  scale: 2,
                  backgroundColor: '#020617',
                  logging: false
               });
               const imgData = canvas.toDataURL('image/png');
               const imgW = 140;
               const imgH = (canvas.height * imgW) / canvas.width;
               doc.addImage(imgData, 'PNG', (W-imgW)/2, 95, imgW, imgH);
            }

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text("HeroZodiac // Professional Report", W/2, H-15, { align: 'center' });

            // 2. CONTENT PAGES
            doc.addPage();
            doc.setFillColor(2, 6, 23); 
            doc.rect(0, 0, W, H, 'F');
            cursorY = 30;

            const addText = (text: string, size: number, color: [number, number, number], font: string) => {
               doc.setFont(font, 'bold');
               doc.setFontSize(size);
               doc.setTextColor(...color);
               
               const lines = doc.splitTextToSize(text, W - (margin*2));
               
               if (cursorY + (lines.length * size * 0.4) > H - margin) {
                   doc.addPage();
                   doc.setFillColor(2, 6, 23);
                   doc.rect(0, 0, W, H, 'F');
                   cursorY = 20;
               }

               doc.text(lines, margin, cursorY);
               cursorY += (lines.length * size * 0.4) + 6;
            };

            addText("Introduction", 22, [255, 194, 76], 'times');
            addText(report.summary, 12, [200, 200, 200], 'helvetica');
            cursorY += 10;

            report.sections.forEach((section: any) => {
                if (cursorY > H - 40) {
                     doc.addPage();
                     doc.setFillColor(2, 6, 23);
                     doc.rect(0, 0, W, H, 'F');
                     cursorY = 30;
                }
                
                doc.setDrawColor(255, 255, 255);
                doc.setLineWidth(0.1);
                doc.line(margin, cursorY, W-margin, cursorY);
                cursorY += 10;

                addText(section.title, 16, [255, 194, 76], 'times');
                doc.setFont('helvetica', 'normal');
                addText(section.content, 11, [220, 220, 220], 'helvetica');
                cursorY += 10;
            });

            doc.save('Cosmic-Blueprint-Report.pdf');

        } catch (e) {
            console.error(e);
            alert("Error generating PDF"); 
        } finally {
            setIsGenerating(false);
        }
    };

    return { generatePDF, isGenerating };
}