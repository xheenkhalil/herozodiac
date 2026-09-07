'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FontAwesomeIcon,
  faUser,
  faCompass,
  faBrain,
  faShieldHalved,
  faSun,
  faArrowRight
} from '@/components/ui/Icons';

interface SavedProfile {
  name?: string;
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  mbtiType?: string;
  archetype?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<SavedProfile>({});

  useEffect(() => {
    try {
      const mbti = localStorage.getItem('hz_mbti_result');
      const arch = localStorage.getItem('hz_archetype_result');
      const parsedMbti = mbti ? JSON.parse(mbti) : null;
      const parsedArch = arch ? JSON.parse(arch) : null;

      setProfile({
        name: 'Cosmic Traveler',
        sunSign: 'Leo',
        moonSign: 'Cancer',
        risingSign: 'Libra',
        mbtiType: parsedMbti ? `${parsedMbti.type} (${parsedMbti.name})` : undefined,
        archetype: parsedArch ? `${parsedArch.primary}` : undefined
      });
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-24 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href="/" className="hover:text-stone-900 transition">Home</Link>
          <span>/</span>
          <span className="text-[#7B1123] font-bold">User Profile</span>
        </nav>

        {/* HERO PROFILE CARD */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-12 shadow-sm mb-10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-[#7B1123] text-white flex items-center justify-center text-2xl font-serif font-bold shadow-lg">
              <FontAwesomeIcon icon={faUser} className="w-8 h-8" />
            </div>

            <div className="text-center sm:text-left flex-1">
              <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-lg bg-[#7B1123]/10 text-[#7B1123] border border-[#7B1123]/20">
                Personalized Identity
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-2 mb-1">
                {profile.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500">
                Your integrated astrology and psychological profile dashboard.
              </p>
            </div>

            <Link href="/login">
              <button className="text-xs font-semibold px-4 py-2 rounded-lg border border-stone-300 hover:bg-stone-100 transition">
                Switch Account
              </button>
            </Link>
          </div>
        </div>

        {/* BIG THREE ASTROLOGY SNAPSHOT */}
        <div className="mb-10">
          <h2 className="font-serif font-bold text-xl text-stone-900 mb-4">
            Astrological Foundation (The Big Three)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white border border-stone-200 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-stone-400">Sun Sign</span>
              <div className="text-2xl font-serif font-bold text-[#7B1123] my-1">
                {profile.sunSign || 'Unknown'} ♌
              </div>
              <p className="text-xs text-stone-500">Core ego, vitality & soul journey</p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-stone-200 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-stone-400">Moon Sign</span>
              <div className="text-2xl font-serif font-bold text-[#7B1123] my-1">
                {profile.moonSign || 'Unknown'} ♋
              </div>
              <p className="text-xs text-stone-500">Subconscious needs & emotional safety</p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-stone-200 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-stone-400">Ascendant (Rising)</span>
              <div className="text-2xl font-serif font-bold text-[#7B1123] my-1">
                {profile.risingSign || 'Unknown'} ♎
              </div>
              <p className="text-xs text-stone-500">Outer persona & lens of perception</p>
            </div>
          </div>
        </div>

        {/* PSYCHOLOGICAL ASSESSMENTS HISTORY */}
        <div className="mb-10">
          <h2 className="font-serif font-bold text-xl text-stone-900 mb-4">
            Self-Discovery Assessments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-white border border-stone-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#7B1123]/10 flex items-center justify-center text-[#7B1123]">
                  <FontAwesomeIcon icon={faBrain} className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-stone-400">MBTI Personality</div>
                  <div className="font-serif font-bold text-base text-stone-900">
                    {profile.mbtiType || 'Not completed yet'}
                  </div>
                </div>
              </div>
              <Link href="/tests/mbti" className="text-xs font-bold text-[#7B1123] hover:underline">
                {profile.mbtiType ? 'Retake' : 'Take Test'} →
              </Link>
            </div>

            <div className="p-6 rounded-xl bg-white border border-stone-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#7B1123]/10 flex items-center justify-center text-[#7B1123]">
                  <FontAwesomeIcon icon={faShieldHalved} className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-stone-400">Dominant Archetype</div>
                  <div className="font-serif font-bold text-base text-stone-900">
                    {profile.archetype || 'Not completed yet'}
                  </div>
                </div>
              </div>
              <Link href="/tests/archetype" className="text-xs font-bold text-[#7B1123] hover:underline">
                {profile.archetype ? 'Retake' : 'Take Test'} →
              </Link>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">
              Ready for a full synastry reading?
            </h3>
            <p className="text-xs text-stone-600 font-sans">
              Compare your birth chart with a partner, friend, or coworker.
            </p>
          </div>
          <Link href="/compatibility">
            <button className="px-6 py-2.5 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white text-xs font-bold shadow transition">
              Run Synastry Report
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
