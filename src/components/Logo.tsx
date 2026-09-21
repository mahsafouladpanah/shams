import React from 'react';
import { cn } from '../lib/utils';

export function Logo({ 
  className, 
  variant = 'default',
  showText = true 
}: { 
  className?: string; 
  variant?: 'default' | 'icon' | 'white' | 'persian' | 'horizontal';
  showText?: boolean;
}) {
  const isWhite = variant === 'white';
  const isIcon = variant === 'icon';
  const isHorizontal = variant === 'horizontal';

  const navyDark = isWhite ? '#FFFFFF' : '#0B2F4A';
  const tealLight = isWhite ? '#A5E5E8' : '#0F888D';
  const goldTone = isWhite ? '#F5E6C8' : '#D4AF37';
  const goldToneDark = isWhite ? '#E8D4B0' : '#B59328';

  return (
    <div className={cn("inline-flex items-center", isHorizontal ? "flex-row gap-3" : "flex-col", className)}>
      {/* Exact Vector Geometry of the SHAMS Lotus & Golden Sun Identity */}
      <svg
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(isIcon ? "w-10 h-10" : "w-16 h-16 md:w-20 md:h-20 shrink-0")}
      >
        <defs>
          {/* Radiant Golden Sun Gradient */}
          <linearGradient id="shams-sun-glow" x1="100" y1="12" x2="100" y2="46" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="100%" stopColor={goldToneDark} />
          </linearGradient>

          {/* Inner Navy / Teal Petal Gradients */}
          <linearGradient id="shams-inner-left" x1="60" y1="50" x2="100" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={tealLight} />
            <stop offset="60%" stopColor="#0B2F4A" />
            <stop offset="100%" stopColor={navyDark} />
          </linearGradient>
          <linearGradient id="shams-inner-right" x1="140" y1="50" x2="100" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={tealLight} />
            <stop offset="60%" stopColor="#0B2F4A" />
            <stop offset="100%" stopColor={navyDark} />
          </linearGradient>

          {/* Outer Golden Amber Petal Gradients */}
          <linearGradient id="shams-outer-left" x1="30" y1="90" x2="95" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E9C46A" />
            <stop offset="50%" stopColor={goldTone} />
            <stop offset="100%" stopColor={goldToneDark} />
          </linearGradient>
          <linearGradient id="shams-outer-right" x1="170" y1="90" x2="105" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E9C46A" />
            <stop offset="50%" stopColor={goldTone} />
            <stop offset="100%" stopColor={goldToneDark} />
          </linearGradient>
        </defs>

        {/* 1. Golden Sun Sphere on Top */}
        <circle cx="100" cy="28" r="14" fill="url(#shams-sun-glow)" />

        {/* 2. Meditative Head Sphere */}
        <circle cx="100" cy="58" r="8" fill={navyDark} />

        {/* 3. Outer Left Golden Petal */}
        <path
          d="M 100 152 C 86 152 50 144 32 118 C 24 106 28 92 40 90 C 58 87 78 108 92 134 C 96 142 98 148 100 152 Z"
          fill="url(#shams-outer-left)"
        />

        {/* 4. Outer Right Golden Petal (Mirrored) */}
        <path
          d="M 100 152 C 114 152 150 144 168 118 C 176 106 172 92 160 90 C 142 87 122 108 108 134 C 104 142 102 148 100 152 Z"
          fill="url(#shams-outer-right)"
        />

        {/* 5. Inner Left Plum / Violet Petal */}
        <path
          d="M 100 152 C 86 142 62 112 60 80 C 59 64 71 52 76 54 C 85 58 96 95 100 126 Z"
          fill="url(#shams-inner-left)"
        />

        {/* 6. Inner Right Plum / Violet Petal (Mirrored) */}
        <path
          d="M 100 152 C 114 142 138 112 140 80 C 141 64 129 52 124 54 C 115 58 104 95 100 126 Z"
          fill="url(#shams-inner-right)"
        />
      </svg>
      
      {/* Brand Typography Lockup */}
      {!isIcon && showText && (
        <div className={cn("flex flex-col text-center", isHorizontal && "text-right")}>
          <span className={cn("text-[10px] md:text-xs font-serif tracking-[0.25em] uppercase font-bold", isWhite ? "text-white/90" : "text-shams-navy/90")}>
            PROFESSOR
          </span>
          <span className={cn("text-2xl md:text-3xl font-serif font-bold tracking-[0.18em] leading-tight", isWhite ? "text-white" : "text-shams-navy")}>
            SHAMS
          </span>
          <span className={cn("text-[8px] md:text-[9px] font-sans font-semibold tracking-[0.14em] uppercase mt-1", isWhite ? "text-white/80" : "text-shams-navy/80")}>
            HEALTH IN ALL DIMENSIONS
          </span>
          <span className={cn("text-[7px] md:text-[8px] font-sans font-medium tracking-[0.12em] uppercase mt-0.5", isWhite ? "text-white/60" : "text-shams-navy/60")}>
            BODY • MIND • SPIRIT • SOCIETY
          </span>
        </div>
      )}
    </div>
  );
}
