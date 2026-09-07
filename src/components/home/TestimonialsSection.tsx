'use client';

import { useState } from 'react';
import { FontAwesomeIcon, faStar, faChevronLeft, faChevronRight, faCircleCheck } from '@/components/ui/Icons';
import { TESTIMONIALS_DATA } from '@/data/testimonials-data';

export function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS_DATA.length - itemsPerPage));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + itemsPerPage < TESTIMONIALS_DATA.length ? prev + 1 : 0));
  };

  const visibleTestimonials = TESTIMONIALS_DATA.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-20 bg-white text-stone-900 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-sm font-bold tracking-[0.25em] text-stone-900 uppercase font-serif">
            <span className="text-[#7B1123] mr-2">✦</span>
            WHAT PEOPLE ARE SAYING
            <span className="text-[#7B1123] ml-2">✦</span>
          </h2>
        </div>

        {/* REVIEWS GRID WITH NAVIGATION ARROWS */}
        <div className="relative flex items-center">
          
          {/* PREV BUTTON */}
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonials"
            className="hidden md:flex absolute -left-4 z-10 w-9 h-9 rounded-lg bg-white border border-stone-200 shadow-sm items-center justify-center text-stone-700 hover:text-[#7B1123] hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
          </button>

          {/* 3 REVIEW CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {visibleTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  {/* 5 STARS */}
                  <div className="flex items-center gap-1 text-[#7B1123] mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="w-3.5 h-3.5" />
                    ))}
                  </div>

                  {/* QUOTE */}
                  <p className="text-sm text-stone-800 font-sans leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* USER PROFILE FOOTER */}
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <div className="w-10 h-10 rounded-lg bg-[#7B1123]/10 text-[#7B1123] font-bold font-serif text-sm flex items-center justify-center border border-[#7B1123]/20">
                    {t.avatarText}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">
                      {t.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                      <FontAwesomeIcon icon={faCircleCheck} className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* NEXT BUTTON */}
          <button
            onClick={handleNext}
            aria-label="Next Testimonials"
            className="hidden md:flex absolute -right-4 z-10 w-9 h-9 rounded-lg bg-white border border-stone-200 shadow-sm items-center justify-center text-stone-700 hover:text-[#7B1123] hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          </button>

        </div>

      </div>
    </section>
  );
}
