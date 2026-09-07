'use client';

import Link from 'next/link';
import { Article } from '@/lib/quanta';
import { EDITORIAL_ARTICLES } from '@/data/fallback-articles';
import { FontAwesomeIcon, faArrowRight } from '@/components/ui/Icons';

interface EditorialSectionProps {
  cmsArticles?: Article[];
}

export function EditorialSection({ cmsArticles = [] }: EditorialSectionProps) {
  // If CMS returns articles, we can display them.
  // Otherwise, use the verified editorial articles matching new_layout.png.
  const hasCms = cmsArticles.length > 0;

  return (
    <section className="py-20 bg-white text-stone-900 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-stone-200">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 tracking-wide uppercase">
            EXPLORE OUR CONTENT
          </h2>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7B1123] hover:underline"
          >
            <span>View all articles</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
          </Link>
        </div>

        {/* ARTICLES GRID (4 CARDS MATCHING NEW_LAYOUT.PNG) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hasCms
            ? cmsArticles.slice(0, 4).map((post) => {
                const category = post.categories?.[0]?.name || 'Wisdom';
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-[#7B1123]/50 transition-all shadow-sm hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      {post.featured_image?.file_url ? (
                        <img
                          src={post.featured_image.file_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs font-serif">
                          HeroZodiac
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#7B1123] text-white rounded">
                          {category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-serif font-bold text-base text-stone-900 mb-2 group-hover:text-[#7B1123] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="text-[11px] text-stone-400 font-sans pt-3 border-t border-stone-100">
                        {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </Link>
                );
              })
            : EDITORIAL_ARTICLES.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-[#7B1123]/50 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#7B1123] text-white rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-serif font-bold text-base text-stone-900 mb-2 group-hover:text-[#7B1123] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="text-[11px] text-stone-400 font-sans pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span>{article.publishedAt}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

      </div>
    </section>
  );
}
