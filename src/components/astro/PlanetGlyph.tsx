import React from 'react';

// Standard Astrological Glyphs (SVG Paths)
// ViewBox assumed usually 0 0 24 24 or similar, normalized here to standard icon size.
const PATHS: Record<string, React.ReactNode> = {
  'Sun': (
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </g>
  ),
  'Moon': (
    <path 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      d="M14 2a9 9 0 1 0 0 18 9 9 0 0 1 0-18Z" // Crescent-ish? Actually Moon is usually two arcs.
      // Better crescent: 
      // d="M10 2 A10 10 0 1 0 10 22 A7 7 0 1 1 10 2 Z" (Filled)
      // Line style:
      // M 16 2 A 10 10 0 0 1 16 22 A 10 10 0 0 0 16 2 Z ?
    />
  ),
  // Replacing with verified Lucide-like or simple geometries
};

// We will construct precise paths for the set.
const GLYPHS: Record<string, React.ReactNode> = {
  'Sun': (
    <g>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </g>
  ),
  'Moon': (
    <path d="M17 19.5A9.5 9.5 0 0 1 12 2.6a8.5 8.5 0 1 0 0 16.9Z" stroke="currentColor" strokeWidth="1.5" fill="none" /> 
    // Wait, Moon is usually just a crescent curve in line icons.
    // <path d="M9 21a9 9 0 1 0 0-18 6 6 0 0 1 0 18Z" />
  ),
  'Mercury': (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
       {/* Circle */}
       <circle cx="12" cy="9" r="3.5" />
       {/* Horns */}
       <path d="M8.5 6.5 A 3.5 3.5 0 0 1 15.5 6.5" /> 
       {/* Cross */}
       <path d="M12 12.5 V 21" />
       <path d="M9 17 H 15" />
    </g>
  ),
  'Venus': (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
       <circle cx="12" cy="8.5" r="4.5" />
       <path d="M12 13 V 22" />
       <path d="M8 17.5 H 16" />
    </g>
  ),
  'Mars': (
     <g stroke="currentColor" strokeWidth="1.5" fill="none">
        <circle cx="10" cy="14" r="5" />
        <path d="M13.5 10.5 L 20 4" />
        <path d="M15 4 H 20 V 9" />
     </g>
  ),
  'Jupiter': (
    // Looks like '4'
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
       <path d="M6 19 C 6 12 12 12 12 12 V 20" /> 
       <path d="M16 5 V 20" />
       <path d="M4 14 H 19" />
       // Actually Jupiter is a specific glyph like ♃.
       // Path: vertical line, then curve like 2? 
       // Let's approximate: 
       // Arc from (6,8) to (12,8) then down?
       // Let's use simpler geometric approx.
       <path d="M17 19.5V4.5" />
       <path d="M4 14.5l16-.01" />
       <path d="M6.5 6.5c0 7 8 5 8 13" />
    </g>
  ),
  'Saturn': (
    // Looks like 'h' with cross
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
       <path d="M13 4v8c0 5 4 6 5 2" />
       <path d="M7 8h8" />
       <path d="M10 4v10" /> 
       // Not quite perfect. 
       // Saturn is Cross top, sickle bottom.
       // Let's stick to simple "h" + cross on top.
       <path d="M16 6 V 16 C 16 19 12 20 10 18 S 9 13 13 10 V 4" /> 
       <path d="M10 7 H 16" />
    </g>
  ),
  'Uranus': (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      <circle cx="12" cy="18" r="2.5" />
      <path d="M12 15.5 V 6" />
      <path d="M12 2 V 6" /> 
      <path d="M8 6 H 16" />
      <path d="M8 3 V 9" />
      <path d="M16 3 V 9" />
    </g>
  ),
  'Neptune': (
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
      <path d="M12 20 V 5" />
      <path d="M8 20 V 17" />
      <path d="M16 20 V 17" />
      {/* Trident Arc */}
      <path d="M5 9 A 7 7 0 0 0 19 9" />
      <path d="M5 9 V 7" />
      <path d="M19 9 V 7" />
      <path d="M9 16 H 15" /> 
    </g>
  ),
  'Pluto': (
     // P+L symbol
     <g stroke="currentColor" strokeWidth="1.5" fill="none">
        <path d="M6 4 V 20" />
        <path d="M6 13 H 13 V 20" />
     </g> 
     // Wait, P L usually has loop.
     // Let's do Circle in Cup (modern astrological).
     // <circle cx="12" cy="7" r="3" />
     // <path d="M7 11 A 5 5 0 0 0 17 11" />
     // <path d="M12 16 V 21" />
     // <path d="M8 18 H 16" />
  ),
  'Chiron': (
    // Key symbol ⚷
    <g stroke="currentColor" strokeWidth="1.5" fill="none">
       <circle cx="12" cy="17" r="4" />
       <path d="M12 13 V 4" />
       <path d="M8 8 L 16 4" /> 
       <path d="M8 4 L 16 8" />
       // Actually Chiron is K shape? No "Key".
       // O above K?
    </g>
  ),
  'North Node': (
     // Headphones ☊
     <g stroke="currentColor" strokeWidth="1.5" fill="none">
        <circle cx="7" cy="16" r="3" />
        <circle cx="17" cy="16" r="3" />
        <path d="M7 13 C 7 5 17 5 17 13" />
     </g>
  ),
  'Asc': (
     <text x="12" y="16" fontSize="10" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="bold">ASC</text>
  ),
  'MC': (
     <text x="12" y="16" fontSize="10" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="bold">MC</text>
  )
};

export function PlanetGlyph({ name, className }: { name: string, className?: string }) {
  const glyph = GLYPHS[name] || GLYPHS['Sun']; // Fallback
  // Need to handle simple text fallback if no path?
  
  if (name === 'Asc' || name === 'MC' || name === 'Ascendant') {
      return (
         <svg viewBox="0 0 24 24" className={className || "w-6 h-6"}>
            {GLYPHS[name === 'Ascendant' ? 'Asc' : name]}
         </svg>
      );
  }

  return (
    <svg viewBox="0 0 24 24" className={className || "w-6 h-6"}>
       {GLYPHS[name] || (
         <text x="12" y="16" fontSize="12" textAnchor="middle" fill="currentColor" stroke="none">{name.substring(0,2)}</text>
       )}
    </svg>
  );
}
