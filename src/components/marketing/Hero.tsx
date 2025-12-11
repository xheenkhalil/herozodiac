import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-maroon-900/40 via-slate-950 to-slate-950" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gold-400 text-sm font-medium mb-6 animate-fade-in">
          <Star className="w-3 h-3 fill-current" />
          <span>Daily Cosmic Update Live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-6 leading-tight tracking-tight">
          Navigate Your Life by the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-maroon-400">Stars & Spirit.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover your true self with our advanced birth chart calculator, daily insights, and AI-powered palmistry readings.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/calculator"
            className="h-12 px-8 rounded-full bg-maroon-700 hover:bg-maroon-600 text-white font-medium flex items-center gap-2 transition-transform hover:-translate-y-1 shadow-lg shadow-maroon-900/50"
          >
            Get Free Birth Chart <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/compatibility"
            className="h-12 px-8 rounded-full bg-transparent border border-slate-700 hover:bg-white/5 text-slate-300 font-medium flex items-center transition-colors"
          >
            Check Compatibility
          </Link>
        </div>
      </div>
    </section>
  );
}