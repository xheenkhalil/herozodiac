'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage to see if they already accepted
    const consent = localStorage.getItem('hz_cookie_consent');
    if (!consent) {
      // Small delay so it doesn't jar the user instantly
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hz_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-[#0e0e14]/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center gap-6 text-white">
        
        <div className="flex-1">
          <h4 className="text-white font-serif font-bold mb-2">We value your privacy</h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized cosmic content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
            <Link href="/privacy" className="text-[#E6B0AA] hover:underline ml-1">Read Policy</Link>.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsVisible(false)}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 text-sm font-semibold hover:bg-white/5 transition"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-[#7B1123] hover:bg-[#9E1B32] text-white text-sm font-semibold transition shadow"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}