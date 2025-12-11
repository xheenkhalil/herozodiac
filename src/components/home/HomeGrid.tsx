'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/lib/quanta';
import { ArrowUpRight, Heart, Moon, Map, ChevronLeft, ChevronRight, Sparkles, Activity, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeGridProps {
  articles: Article[];
}

// Data for the Toolkit Slideshow
const tools = [
  {
    id: 'love-match',
    icon: Heart,
    color: 'text-maroon-400',
    bg: 'bg-maroon-900/30',
    title: 'Love Compatibility',
    desc: 'Analyze elemental synergy between you and a partner.',
    link: '/compatibility',
    stats: [
      { label: 'Synastry', value: 'Deep' },
      { label: 'Elements', value: '4' },
      { label: 'Aspects', value: '12+' },
    ]
  },
  {
    id: 'moon-phase',
    icon: Moon,
    color: 'text-blue-400',
    bg: 'bg-blue-900/30',
    title: 'Moon Phase',
    desc: 'Current: Waning Gibbous. Good for releasing energy.',
    link: '/transits',
    stats: [
      { label: 'Illumination', value: '85%' },
      { label: 'Sign', value: 'Leo' },
      { label: 'Age', value: '18d' },
    ]
  },
  {
    id: 'birth-chart',
    icon: Map,
    color: 'text-gold-400',
    bg: 'bg-gold-500/20',
    title: 'Birth Chart',
    desc: 'Map the exact position of the stars at your birth.',
    link: '/calculator',
    stats: [
      { label: 'Planets', value: '10' },
      { label: 'Houses', value: '12' },
      { label: 'Accuracy', value: 'High' },
    ]
  }
];

export function HomeGrid({ articles }: HomeGridProps) {
  const [currentTool, setCurrentTool] = useState(0);

  // Auto-rotate slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTool((prev) => (prev + 1) % tools.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMN 1: Toolkit Slideshow (Width: 3/12) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Toolkit</h3>
            <div className="flex gap-1">
              {tools.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 w-1.5 rounded-full transition-all ${idx === currentTool ? 'bg-maroon-500 w-4' : 'bg-slate-700'}`} 
                />
              ))}
            </div>
          </div>
          
          <div className="relative h-[320px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTool}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Link href={tools[currentTool].link} className="block h-full">
                  <div className="h-full p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-maroon-500/50 transition flex flex-col group relative overflow-hidden">
                    
                    {/* Background Glow */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 ${tools[currentTool].bg.replace('/20', '').replace('/30', '')}`} />

                    <div className="flex justify-between items-start mb-6 relative z-10">
                      {(() => {
                        const CurrentIcon = tools[currentTool].icon;
                        return (
                          <div className={`h-12 w-12 ${tools[currentTool].bg} rounded-xl flex items-center justify-center ${tools[currentTool].color} group-hover:scale-110 transition shadow-inner border border-white/5`}>
                            <CurrentIcon className="w-6 h-6" />
                          </div>
                        );
                      })()}
                      <ArrowUpRight className="text-slate-600 group-hover:text-gold-400 transition" />
                    </div>

                    <h4 className="font-serif text-2xl font-bold text-slate-100 mb-2">{tools[currentTool].title}</h4>
                    <p className="text-sm text-slate-400 mb-6 flex-1 leading-relaxed">{tools[currentTool].desc}</p>

                    {/* The 3 Data Points ("Stuffs") */}
                    <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mt-auto">
                      {tools[currentTool].stats.map((stat, i) => (
                        <div key={i} className="text-center">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
                          <div className="text-sm font-mono font-bold text-slate-200">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* COLUMN 2: Featured Feature (Width: 5/12) - Unchanged */}
        <div className="lg:col-span-5">
           <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Featured</h3>
           <div className="relative h-full min-h-[360px] rounded-3xl overflow-hidden group border border-white/5 shadow-2xl shadow-black/50">
              <img 
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba" 
                alt="Galaxy" 
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-2 mb-3">
                   <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-maroon-900/80 backdrop-blur-md border border-maroon-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                      <Sparkles className="w-3 h-3 text-gold-400" /> Premium
                   </span>
                   <span className="text-xs text-slate-300 font-mono">2 min read</span>
                </div>
                
                <h2 className="text-3xl font-serif font-bold text-white mb-3 leading-tight">2025 Transit Forecast</h2>
                <p className="text-slate-300 mb-6 line-clamp-2 text-sm leading-relaxed max-w-md">
                  Saturn moves into Aries soon. Discover how this major shift affects your career and relationships.
                </p>
                <button className="w-full sm:w-auto bg-white text-slate-950 px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-200 transition flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4" /> Read Full Report
                </button>
              </div>
           </div>
        </div>

        {/* COLUMN 3: Quanta Feed (Width: 4/12) */}
        <div className="lg:col-span-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Latest Wisdom</h3>
            <Link href="/blog" className="text-xs text-maroon-400 hover:text-maroon-300 flex items-center gap-1">View All <ArrowUpRight className="w-3 h-3" /></Link>
          </div>

          <div className="space-y-3">
            {articles.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl">
                 <p className="text-slate-500 text-sm">No articles found.</p>
              </div>
            ) : (
              articles.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                  <div className="flex gap-4 p-3 rounded-xl bg-slate-900/30 border border-white/5 hover:bg-slate-800 hover:border-maroon-500/30 transition">
                    {post.featured_image ? (
                      <img 
                        src={post.featured_image.file_url} 
                        alt={post.title} 
                        className="w-20 h-20 rounded-lg object-cover bg-slate-800 shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-slate-600">
                        <span className="text-xs">No Img</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0 py-1">
                      <h4 className="text-slate-200 font-bold text-sm leading-snug mb-2 group-hover:text-gold-400 transition line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                         <Calendar className="w-3 h-3" />
                         {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}