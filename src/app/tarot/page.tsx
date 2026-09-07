'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TAROT_SPREADS,
  TAROT_DECK,
  TarotSpread,
  DrawnCard,
  drawCards
} from '@/data/tarot-data';
import {
  FontAwesomeIcon,
  faBookOpen,
  faRotateRight,
  faStar,
  faArrowRight,
  faHeart
} from '@/components/ui/Icons';

export default function TarotPage() {
  const [selectedSpread, setSelectedSpread] = useState<TarotSpread>(TAROT_SPREADS[0]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[] | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCardForModal, setSelectedCardForModal] = useState<DrawnCard | null>(null);

  const handleDraw = () => {
    setIsShuffling(true);
    setDrawnCards(null);

    setTimeout(() => {
      const cards = drawCards(selectedSpread);
      setDrawnCards(cards);
      setIsShuffling(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-28 pb-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <span>/</span>
          <span className="text-[#7B1123] font-bold">Tarot Reading</span>
        </nav>

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#7B1123]/10 text-[#7B1123] text-xs font-bold mb-4 border border-[#7B1123]/20">
            <FontAwesomeIcon icon={faBookOpen} className="w-3 h-3" />
            <span>Traditional 78-Card Deck</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 mb-4">
            Sacred Tarot Reading
          </h1>

          <p className="text-base text-stone-600 font-sans leading-relaxed">
            Formulate your question clearly in your mind. Select your desired spread and draw cards from the traditional deck for spiritual reflection.
          </p>
        </div>

        {/* SPREAD SELECTOR CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {TAROT_SPREADS.map((spread) => (
            <button
              key={spread.id}
              onClick={() => {
                setSelectedSpread(spread);
                setDrawnCards(null);
              }}
              className={`p-5 rounded-xl border text-left transition-all ${
                selectedSpread.id === spread.id
                  ? 'border-[#7B1123] bg-[#7B1123]/10 shadow-sm'
                  : 'bg-white border-stone-200 hover:border-[#7B1123]/40'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-[#7B1123] mb-1">
                {spread.cardCount} {spread.cardCount === 1 ? 'Card' : 'Cards'}
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
                {spread.name}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed font-sans">
                {spread.description}
              </p>
            </button>
          ))}
        </div>

        {/* DRAW ACTION BUTTON */}
        <div className="text-center mb-14">
          <button
            onClick={handleDraw}
            disabled={isShuffling}
            className="px-8 py-3.5 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white font-bold text-sm shadow-md transition disabled:opacity-50 inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faRotateRight} className={`w-3.5 h-3.5 ${isShuffling ? 'animate-spin' : ''}`} />
            <span>{isShuffling ? 'Shuffling Sacred Deck...' : `Draw ${selectedSpread.name}`}</span>
          </button>
        </div>

        {/* DRAWN CARDS DISPLAY */}
        {drawnCards && (
          <div className="space-y-12 animate-fade-in">
            <div className={`grid gap-6 ${
              drawnCards.length === 1
                ? 'max-w-md mx-auto grid-cols-1'
                : 'grid-cols-1 md:grid-cols-3'
            }`}>
              {drawnCards.map((drawn, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCardForModal(drawn)}
                  className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between cursor-pointer hover:border-[#7B1123]/60 hover:shadow-xl hover:-translate-y-1 transition-all group"
                >
                  <div>
                    {/* POSITION HEADER */}
                    <div className="text-[11px] uppercase tracking-wider font-bold text-[#7B1123] mb-4 text-center">
                      {drawn.positionName}
                    </div>

                    {/* TAROT CARD ARTWORK FRAME */}
                    <div className="aspect-[2/3] max-w-[200px] mx-auto mb-6 rounded-lg border-2 border-[#7B1123]/30 bg-gradient-to-b from-[#4A0B15] to-[#1a0508] text-white p-4 flex flex-col items-center justify-between shadow-inner relative overflow-hidden">
                      <div className="text-[10px] font-mono tracking-widest text-[#E6B0AA]">
                        {drawn.card.arcana.toUpperCase()}
                      </div>

                      <div className="text-center my-auto">
                        <div className="text-3xl font-serif mb-2">
                          {drawn.isReversed ? '↺' : '✦'}
                        </div>
                        <h4 className="font-serif font-bold text-sm tracking-wide text-white leading-tight">
                          {drawn.card.name}
                        </h4>
                        {drawn.isReversed && (
                          <span className="text-[10px] text-amber-300 uppercase tracking-wider font-mono block mt-1">
                            (Reversed)
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] text-stone-400 font-mono">
                        #{drawn.card.number}
                      </div>
                    </div>

                    {/* CARD TITLE & KEYWORDS */}
                    <h3 className="font-serif font-bold text-xl text-center text-stone-900 mb-2">
                      {drawn.card.name} {drawn.isReversed ? '(Reversed)' : ''}
                    </h3>

                    <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                      {(drawn.isReversed ? drawn.card.keywordsReversed : drawn.card.keywordsUpright).slice(0, 3).map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-100 text-stone-700"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-3 text-center mb-4">
                      {drawn.isReversed ? drawn.card.reversedMeaning : drawn.card.uprightMeaning}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 text-center text-xs font-bold text-[#7B1123] group-hover:underline">
                    View Full Card Breakdown →
                  </div>
                </div>
              ))}
            </div>

            {/* GUIDANCE CALLOUT */}
            <div className="p-6 rounded-xl bg-white border border-stone-200 max-w-2xl mx-auto text-center text-xs sm:text-sm text-stone-600 font-sans leading-relaxed shadow-sm">
              Click on any card to read its detailed meanings for romance, career choices, and spiritual contemplation.
            </div>
          </div>
        )}

        {/* MODAL FOR CARD DETAILS */}
        {selectedCardForModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <button
                onClick={() => setSelectedCardForModal(null)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 text-lg p-2"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="text-xs uppercase font-bold tracking-widest text-[#7B1123] mb-1">
                  {selectedCardForModal.card.arcana} Arcana #{selectedCardForModal.card.number}
                </div>
                <h2 className="text-3xl font-serif font-bold text-stone-900">
                  {selectedCardForModal.card.name} {selectedCardForModal.isReversed ? '(Reversed)' : ''}
                </h2>
                <div className="text-xs text-stone-500 mt-1">
                  Spread Position: {selectedCardForModal.positionName}
                </div>
              </div>

              <div className="space-y-6 text-sm text-stone-700 font-sans">
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
                    General Meaning
                  </h3>
                  <p className="leading-relaxed">
                    {selectedCardForModal.isReversed
                      ? selectedCardForModal.card.reversedMeaning
                      : selectedCardForModal.card.uprightMeaning}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-[#7B1123] mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faHeart} className="w-3.5 h-3.5" />
                    <span>Love & Relationships</span>
                  </h3>
                  <p className="leading-relaxed">{selectedCardForModal.card.loveMeaning}</p>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
                    Career & Ambition
                  </h3>
                  <p className="leading-relaxed">{selectedCardForModal.card.careerMeaning}</p>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900 mb-2">
                    Spiritual Contemplation
                  </h3>
                  <p className="leading-relaxed">{selectedCardForModal.card.spiritualMeaning}</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 text-center">
                <button
                  onClick={() => setSelectedCardForModal(null)}
                  className="px-6 py-2.5 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white text-xs font-bold transition"
                >
                  Close Card
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
