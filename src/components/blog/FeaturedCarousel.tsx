'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from '@/lib/quanta';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Calendar } from 'lucide-react';

interface FeaturedCarouselProps {
  posts: Article[];
}

export function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
  const [index, setIndex] = useState(0);

  // Auto-play (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [posts.length]);

  const handleNext = () => setIndex((prev) => (prev + 1) % posts.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + posts.length) % posts.length);

  if (!posts || posts.length === 0) return null;

  const currentPost = posts[index];

  return (
    <div className="relative w-full min-h-[500px] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-900">
      
      {/* BACKGROUND IMAGE SLIDE */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentPost.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 z-0"
        >
          {currentPost.featured_image ? (
            <img 
              src={currentPost.featured_image.file_url} 
              alt={currentPost.title} 
              className="w-full h-full object-cover"
            />
          ) : (
             <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <span className="text-slate-600 font-serif text-2xl">Cosmic Wisdom</span>
             </div>
          )}
          {/* Heavy Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/30" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENT LAYER */}
      <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end">
        <motion.div
           key={currentPost.id + "-text"}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 0.5 }}
           className="max-w-4xl"
        >
           {/* Chips */}
           <div className="flex items-center gap-3 mb-4">
              <span className="bg-maroon-600 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-maroon-900/50">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
              <span className="text-slate-300 text-xs flex items-center gap-1 font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <Calendar className="w-3 h-3 text-gold-400" /> {new Date(currentPost.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
           </div>

           {/* Title */}
           <Link href={`/blog/${currentPost.slug}`}>
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 leading-tight hover:text-gold-400 transition cursor-pointer drop-shadow-md">
               {currentPost.title}
             </h2>
           </Link>
           
           {/* Excerpt */}
           <p className="text-slate-300 text-sm md:text-lg line-clamp-2 mb-8 max-w-2xl text-shadow-sm font-light leading-relaxed">
             {currentPost.excerpt}
           </p>

           {/* CTA */}
           <Link href={`/blog/${currentPost.slug}`}>
             <button className="bg-white text-slate-950 hover:bg-gold-400 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition flex items-center gap-2 shadow-lg shadow-black/50 group/btn">
               Read Article <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
             </button>
           </Link>
        </motion.div>
      </div>

      {/* CONTROLS */}
      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
         <button 
           onClick={handlePrev}
           className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md flex items-center justify-center transition border border-white/10"
         >
            <ChevronLeft className="w-5 h-5" />
         </button>
         <button 
           onClick={handleNext}
           className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md flex items-center justify-center transition border border-white/10"
         >
            <ChevronRight className="w-5 h-5" />
         </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
         {posts.map((_, i) => (
           <button 
             key={i}
             onClick={() => setIndex(i)}
             className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-gold-400' : 'w-2 bg-white/30 hover:bg-white/50'}`}
           />
         ))}
      </div>

    </div>
  );
}
