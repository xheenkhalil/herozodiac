import React from 'react';

// Astrological vector paths for each sign in a normalized 24x24 box for the wheel
const WHEEL_GLYPHS: { [key: number]: React.ReactNode } = {
  0: ( // Aries
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20V9C12 5 6 3.5 5 8C4 11 7 12.5 9 10.5" />
      <path d="M12 20V9C12 5 18 3.5 19 8C20 11 17 12.5 15 10.5" />
    </g>
  ),
  1: ( // Taurus
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="15" r="5.5" />
      <path d="M5.5 5C7 9.5 17 9.5 18.5 5" />
    </g>
  ),
  2: ( // Gemini
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M6 5H18" />
      <path d="M6 19H18" />
      <path d="M10 5C9.2 10 9.2 14 10 19" />
      <path d="M14 5C14.8 10 14.8 14 14 19" />
    </g>
  ),
  3: ( // Cancer
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <circle cx="16" cy="9" r="3" />
      <path d="M16 6C10 6 5 9 5 12" />
      <circle cx="8" cy="15" r="3" />
      <path d="M8 18C14 18 19 15 19 12" />
    </g>
  ),
  4: ( // Leo
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="15" r="2.5" />
      <path d="M7.5 13C7.5 7 13 5 16 7.5C18.5 9.5 18 15 19.5 16.5C21 18 22.5 16.5 22.5 15" />
    </g>
  ),
  5: ( // Virgo
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8V18" />
      <path d="M5 11C5 7 9 7 9 11V18" />
      <path d="M9 11C9 7 13.5 7 13.5 11V19" />
      <path d="M13.5 16C15 13 17 13 17.5 15C18 17.5 15.5 20.5 13 18.5C11.5 17 13 14.5 17 19.5L19.5 21" />
    </g>
  ),
  6: ( // Libra
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M5 19H19" />
      <path d="M5 14H9C9 10 15 10 15 14H19" />
    </g>
  ),
  7: ( // Scorpio
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8V18" />
      <path d="M5 11C5 7 9 7 9 11V18" />
      <path d="M9 11C9 7 13.5 7 13.5 11V18C13.5 20 15.5 20.5 17.5 18.5L20 15.5" />
      <path d="M16.5 15.5H20V19" />
    </g>
  ),
  8: ( // Sagittarius
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M11 7H17V13" />
      <path d="M8.5 10.5L13.5 15.5" />
    </g>
  ),
  9: ( // Capricorn
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8L9 17L12.5 9" />
      <path d="M12.5 9C14 6 18 6 18 9.5V14C18 18 14 19 14 16C14 13.5 17 13 19.5 15" />
    </g>
  ),
  10: ( // Aquarius
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10L7.5 7.5L10 10L12.5 7.5L15 10L17.5 7.5L20 10" />
      <path d="M5 15L7.5 12.5L10 15L12.5 12.5L15 15L17.5 12.5L20 15" />
    </g>
  ),
  11: ( // Pisces
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M8 5C10.5 9.5 10.5 14.5 8 19" />
      <path d="M16 5C13.5 9.5 13.5 14.5 16 19" />
      <path d="M5 12H19" />
    </g>
  ),
};

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export function CelestialWheel({ className = 'w-full h-full' }: { className?: string }) {
  const cx = 250;
  const cy = 250;

  // 1. Degree tick marks for Cycle 1 (outer track)
  const ticks = [];
  for (let deg = 0; deg < 360; deg += 5) {
    const isMajor = deg % 30 === 0;
    const isSemiMajor = deg % 10 === 0;
    const rad = (deg * Math.PI) / 180;
    const rOuter = 244;
    const rInner = isMajor ? 232 : isSemiMajor ? 237 : 240;
    const x1 = cx + rOuter * Math.cos(rad);
    const y1 = cy + rOuter * Math.sin(rad);
    const x2 = cx + rInner * Math.cos(rad);
    const y2 = cy + rInner * Math.sin(rad);

    ticks.push(
      <line
        key={`tick-${deg}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#D4AF37"
        strokeWidth={isMajor ? 1.4 : isSemiMajor ? 0.9 : 0.5}
        opacity={isMajor ? 0.85 : isSemiMajor ? 0.6 : 0.4}
      />
    );
  }

  // 2. House radial lines for Cycle 2 (from r=184 to r=228)
  const houseDividers = [];
  for (let i = 0; i < 12; i++) {
    const deg = i * 30;
    const rad = (deg * Math.PI) / 180;
    const x1 = cx + 184 * Math.cos(rad);
    const y1 = cy + 184 * Math.sin(rad);
    const x2 = cx + 228 * Math.cos(rad);
    const y2 = cy + 228 * Math.sin(rad);

    houseDividers.push(
      <line
        key={`house-${i}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#D4AF37"
        strokeWidth={1.2}
        opacity={0.7}
      />
    );
  }

  // 3. Zodiac Glyphs for Cycle 2
  const zodiacGlyphsOnly = [];
  for (let i = 0; i < 12; i++) {
    const deg = i * 30 + 15;
    const rad = (deg * Math.PI) / 180;
    const rGlyph = 206;
    const gx = cx + rGlyph * Math.cos(rad) - 12;
    const gy = cy + rGlyph * Math.sin(rad) - 12;
    const rot = deg + 90;

    zodiacGlyphsOnly.push(
      <g
        key={`wheel-glyph-${i}`}
        transform={`translate(${gx + 12}, ${gy + 12}) rotate(${rot}) translate(-12, -12)`}
        className="text-[#E6C280]"
        opacity={0.9}
      >
        {WHEEL_GLYPHS[i]}
      </g>
    );
  }

  // 4. Roman Numerals & Decan ticks for Cycle 3
  const romanNumeralsOnly = [];
  for (let i = 0; i < 12; i++) {
    const deg = i * 30 + 15;
    const rad = (deg * Math.PI) / 180;
    const rNum = 166;
    const nx = cx + rNum * Math.cos(rad);
    const ny = cy + rNum * Math.sin(rad);
    const rot = deg + 90;

    romanNumeralsOnly.push(
      <text
        key={`wheel-num-${i}`}
        x={nx}
        y={ny}
        fill="#D4AF37"
        fontSize="9"
        fontFamily="serif"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
        opacity={0.75}
        transform={`rotate(${rot}, ${nx}, ${ny})`}
      >
        {ROMAN_NUMERALS[i]}
      </text>
    );
  }

  // Decan ticks for Cycle 3
  const decanTicks = [];
  for (let i = 0; i < 36; i++) {
    const deg = i * 10;
    const rad = (deg * Math.PI) / 180;
    const x1 = cx + 180 * Math.cos(rad);
    const y1 = cy + 180 * Math.sin(rad);
    const x2 = cx + 175 * Math.cos(rad);
    const y2 = cy + 175 * Math.sin(rad);

    decanTicks.push(
      <line
        key={`decan-${i}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#D4AF37"
        strokeWidth={0.8}
        opacity={0.5}
      />
    );
  }

  // 5. Sacred Aspect Geometry (Trines) for Cycle 4
  const aspectTrines = [
    [0, 4, 8],
    [1, 5, 9],
  ];

  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter="url(#goldGlow)">
        {/* CYCLE 1: OUTER COORDINATE RING — CLOCKWISE (240s) */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            dur="240s"
            repeatCount="indefinite"
          />
          <circle cx={cx} cy={cy} r={245} stroke="#D4AF37" strokeWidth="1.2" opacity={0.8} />
          <circle cx={cx} cy={cy} r={242} stroke="#D4AF37" strokeWidth="0.6" opacity={0.5} />
          <circle cx={cx} cy={cy} r={232} stroke="#D4AF37" strokeWidth="1.2" opacity={0.7} />
          {ticks}
        </g>

        {/* CYCLE 2: ZODIAC SIGNS & HOUSE DIVISION — COUNTER-CLOCKWISE (180s) */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 250 250"
            to="0 250 250"
            dur="180s"
            repeatCount="indefinite"
          />
          <circle cx={cx} cy={cy} r={228} stroke="#D4AF37" strokeWidth="0.8" opacity={0.6} />
          <circle cx={cx} cy={cy} r={184} stroke="#D4AF37" strokeWidth="1.4" opacity={0.8} />
          {houseDividers}
          {zodiacGlyphsOnly}
        </g>

        {/* CYCLE 3: INNER DECANS & ROMAN NUMERALS — CLOCKWISE (140s) */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            dur="140s"
            repeatCount="indefinite"
          />
          <circle cx={cx} cy={cy} r={180} stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="2 3" opacity={0.5} />
          <circle cx={cx} cy={cy} r={152} stroke="#D4AF37" strokeWidth="1.2" opacity={0.7} />
          <circle cx={cx} cy={cy} r={148} stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="3 3" opacity={0.4} />
          {decanTicks}
          {romanNumeralsOnly}
        </g>

        {/* CYCLE 4: ASPECT GEOMETRY & CENTER ASTROLABE CORE — COUNTER-CLOCKWISE (220s) */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 250 250"
            to="0 250 250"
            dur="220s"
            repeatCount="indefinite"
          />
          <circle cx={cx} cy={cy} r={118} stroke="#D4AF37" strokeWidth="1" opacity={0.6} />
          <circle cx={cx} cy={cy} r={114} stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="1 3" opacity={0.4} />
          <circle cx={cx} cy={cy} r={75} stroke="#D4AF37" strokeWidth="1.4" opacity={0.75} />

          {/* Aspect Trines */}
          {aspectTrines.map((trine, idx) => {
            const rAspect = 118;
            const p1 = [cx + rAspect * Math.cos((trine[0] * 30 + 15) * Math.PI / 180), cy + rAspect * Math.sin((trine[0] * 30 + 15) * Math.PI / 180)];
            const p2 = [cx + rAspect * Math.cos((trine[1] * 30 + 15) * Math.PI / 180), cy + rAspect * Math.sin((trine[1] * 30 + 15) * Math.PI / 180)];
            const p3 = [cx + rAspect * Math.cos((trine[2] * 30 + 15) * Math.PI / 180), cy + rAspect * Math.sin((trine[2] * 30 + 15) * Math.PI / 180)];

            return (
              <polygon
                key={`trine-${idx}`}
                points={`${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`}
                stroke="#D4AF37"
                strokeWidth="0.6"
                strokeDasharray="4 4"
                opacity={0.35}
                fill="none"
              />
            );
          })}

          {/* Center concentric rings */}
          <circle cx={cx} cy={cy} r={50} stroke="#D4AF37" strokeWidth="0.8" opacity={0.6} />
          <circle cx={cx} cy={cy} r={28} stroke="#D4AF37" strokeWidth="1.2" opacity={0.7} />
          <circle cx={cx} cy={cy} r={14} stroke="#D4AF37" strokeWidth="0.8" opacity={0.8} />
          <circle cx={cx} cy={cy} r={4} fill="#E6C280" opacity={0.9} />

          {/* 8-pointed star */}
          <path
            d={`M ${cx} ${cy - 24} L ${cx + 5} ${cy - 8} L ${cx + 24} ${cy} L ${cx + 5} ${cy + 8} L ${cx} ${cy + 24} L ${cx - 5} ${cy + 8} L ${cx - 24} ${cy} L ${cx - 5} ${cy - 8} Z`}
            fill="#D4AF37"
            opacity={0.35}
          />
          <path
            d={`M ${cx} ${cy - 24} L ${cx + 24} ${cy} L ${cx} ${cy + 24} L ${cx - 24} ${cy} Z`}
            stroke="#D4AF37"
            strokeWidth="0.8"
            opacity={0.6}
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}
