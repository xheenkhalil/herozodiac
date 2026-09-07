'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon, faCompass, faLock, faEnvelope, faUser } from '@/components/ui/Icons';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/profile';
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex items-center justify-center px-4 py-28 font-sans">
      <div className="max-w-md w-full bg-white border border-stone-200 rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        
        {/* LOGO */}
        <div className="text-center mb-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="w-9 h-9 rounded-lg bg-[#7B1123]/10 border border-[#7B1123]/20 flex items-center justify-center text-[#7B1123]">
              <FontAwesomeIcon icon={faCompass} className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-xl tracking-wider text-stone-900">
              HERO<span className="text-[#7B1123]">ZODIAC</span>
            </span>
          </Link>
          <h1 className="font-serif font-bold text-2xl text-stone-900 mb-1">
            Create Your Profile
          </h1>
          <p className="text-xs text-stone-500">
            Begin your personal journey across astrology and self-discovery.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full bg-white border border-stone-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#7B1123]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-white border border-stone-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#7B1123]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
              Password
            </label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-stone-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-[#7B1123]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white font-bold text-sm shadow-md transition pt-2.5"
          >
            Create HeroZodiac Profile
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center text-xs text-stone-500">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-[#7B1123] hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
