'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from '@/lib/quanta';
import {
  FontAwesomeIcon,
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faStar,
  faCalendarDays
} from '@/components/ui/Icons';

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
    <div className="relative w-full min-h-[460px] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl border border-stone-200 group bg-stone-900">
      
      {/* BACKGROUND IMAGE SLIDE */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentPost.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-0"
        >
          {currentPost.featured_image?.file_url ? (
            <img 
              src={currentPost.featured_image.file_url} 
              alt={currentPost.title} 
              className="w-full h-full object-cover"
            />
          ) : (
             <div className="w-full h-full bg-[#121218] flex items-center justify-center">
                <span className="text-stone-400 font-serif text-2xl">Cosmic Wisdom</span>
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENT LAYER */}
      <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end text-white">
        <motion.div
           key={currentPost.id + "-text"}
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.15, duration: 0.4 }}
           className="max-w-3xl"
        >
           {/* Chips */}
           <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#7B1123] text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
                <span>Featured</span>
              </span>
              <span className="text-stone-300 text-xs flex items-center gap-1.5 font-medium bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
                <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3 text-[#E6B0AA]" />
                <span>{new Date(currentPost.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </span>
           </div>

           {/* Title */}
           <Link href={`/blog/${currentPost.slug}`}>
             <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight hover:text-[#E6B0AA] transition cursor-pointer drop-shadow-md">
               {currentPost.title}
             </h2>
           </Link>
           
           {/* Excerpt */}
           <p className="text-stone-300 text-xs sm:text-base line-clamp-2 mb-6 max-w-2xl font-light leading-relaxed">
             {currentPost.excerpt}
           </p>

           {/* CTA */}
           <Link href={`/blog/${currentPost.slug}`}>
             <button className="bg-[#7B1123] hover:bg-[#9E1B32] text-white px-6 py-2.5 rounded-lg font-bold text-xs tracking-wider uppercase transition flex items-center gap-2 shadow-lg">
               <span>Read Article</span>
               <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
             </button>
           </Link>
        </motion.div>
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
         <button 
           onClick={handlePrev}
           aria-label="Previous Slide"
           className="w-9 h-9 rounded-lg bg-black/40 hover:bg-[#7B1123] text-white backdrop-blur-md flex items-center justify-center transition border border-white/10"
         >
            <FontAwesomeIcon icon={faChevronLeft} className="w-3.5 h-3.5" />
         </button>
         <button 
           onClick={handleNext}
           aria-label="Next Slide"
           className="w-9 h-9 rounded-lg bg-black/40 hover:bg-[#7B1123] text-white backdrop-blur-md flex items-center justify-center transition border border-white/10"
         >
            <FontAwesomeIcon icon={faChevronRight} className="w-3.5 h-3.5" />
         </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
         {posts.map((_, i) => (
           <button 
             key={i}
             onClick={() => setIndex(i)}
             aria-label={`Go to slide ${i + 1}`}
             className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-[#7B1123]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
           />
         ))}
      </div>

    </div>
  );
}
