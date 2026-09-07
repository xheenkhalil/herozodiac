import React from 'react';

interface ZodiacGlyphProps {
  sign: string;
  className?: string;
  strokeWidth?: number;
}

export function ZodiacGlyph({ sign, className = 'w-10 h-10', strokeWidth = 2.5 }: ZodiacGlyphProps) {
  const normalized = sign.toLowerCase().trim();

  switch (normalized) {
    case 'aries':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <path
            d="M24 40V19C24 11 11 8 9 17C7 23 13 26 17 22"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 40V19C24 11 37 8 39 17C41 23 35 26 31 22"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'taurus':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* Circle base */}
          <circle
            cx="24"
            cy="29"
            r="11"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          {/* Horns crescent */}
          <path
            d="M10 9C13 18 35 18 38 9"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'gemini':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* Top Bar */}
          <path
            d="M10 9H38"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Bottom Bar */}
          <path
            d="M10 39H38"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Left Column */}
          <path
            d="M19 9C17.5 19 17.5 29 19 39"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Right Column */}
          <path
            d="M29 9C30.5 19 30.5 29 29 39"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      );

    case 'cancer':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* Top loop: circle on right, arm sweeps left */}
          <circle
            cx="32"
            cy="17"
            r="5.5"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <path
            d="M32 11.5C21 11.5 11 17 11 23"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Bottom loop: circle on left, arm sweeps right */}
          <circle
            cx="16"
            cy="31"
            r="5.5"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          <path
            d="M16 36.5C27 36.5 37 31 37 25"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      );

    case 'leo':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* Bottom-left circle */}
          <circle
            cx="14"
            cy="30"
            r="5"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
          {/* Mane curve to curled tail */}
          <path
            d="M15 25.5C15 13 26 9 32 14C37 18 36 29 39 32C41.5 34.5 44 32 44 29"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'virgo':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* First downstroke */}
          <path
            d="M10 16V36"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* First arch */}
          <path
            d="M10 22C10 14 18 14 18 22V36"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Second arch */}
          <path
            d="M18 22C18 14 27 14 27 22V37"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Crossed loop tail */}
          <path
            d="M27 32C30 26 34 26 35 30C36.5 35 31 41 26 37C23 34.5 25 29 34 39L39 42"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'libra':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* Bottom horizontal bar */}
          <path
            d="M9 37H39"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Top line with semicircle arch */}
          <path
            d="M9 28H17C17 19.5 31 19.5 31 28H39"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'scorpio':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* First downstroke */}
          <path
            d="M9 16V36"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* First arch */}
          <path
            d="M9 22C9 14 18 14 18 22V36"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Second arch with arrow tail */}
          <path
            d="M18 22C18 14 27 14 27 22V35C27 39 31 40 35 36L41 30"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Arrowhead */}
          <path
            d="M34 30H41V37"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'sagittarius':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* Diagonal arrow shaft */}
          <path
            d="M13 35L35 13"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Arrowhead */}
          <path
            d="M23 13H35V25"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Crossbar */}
          <path
            d="M16 22L26 32"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      );

    case 'capricorn':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* 'V' on left */}
          <path
            d="M10 16L18 34L25 18"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Loop and fish tail on right */}
          <path
            d="M25 18C28 12 36 12 36 19V28C36 36 28 38 28 32C28 27 34 26 39 30"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'aquarius':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* Top wavy line */}
          <path
            d="M9 19L14 14L19 19L24 14L29 19L34 14L39 19"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bottom wavy line */}
          <path
            d="M9 29L14 24L19 29L24 24L29 29L34 24L39 29"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'pisces':
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          {/* Left arc */}
          <path
            d="M15 10C20 19 20 29 15 38"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Right arc */}
          <path
            d="M33 10C28 19 28 29 33 38"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Horizontal crossbar */}
          <path
            d="M9 24H39"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return null;
  }
}
