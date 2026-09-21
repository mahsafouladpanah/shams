import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeroConfig, pageHeroes } from '../data/heroImages';
import { Breadcrumbs } from './Breadcrumbs';

interface PageHeroProps {
  heroId?: string;
  config?: PageHeroConfig;
  customImage?: string;
  customImageAlt?: string;
  customTitle?: string;
  customSubtitle?: string;
  customTag?: string;
  visualConceptLabel?: string;
  layoutVariant?: 'split' | 'banner' | 'asymmetric' | 'overlay';
  themeAccent?: 'teal' | 'gold' | 'burgundy' | 'sage';
  children?: React.ReactNode;
  sideCard?: React.ReactNode;
  breadcrumbs?: { label: string; link?: string }[];
  className?: string;
}

export function PageHero({
  heroId,
  config: propConfig,
  customImage,
  customImageAlt,
  customTitle,
  customSubtitle,
  customTag,
  visualConceptLabel,
  layoutVariant: _propLayout,
  themeAccent: propAccent,
  children,
  sideCard,
  breadcrumbs,
  className = '',
}: PageHeroProps) {
  const { lang, dir, isRTL } = useLanguage();

  const config = propConfig || (heroId ? pageHeroes[heroId] : null);

  const title = customTitle || (config ? (lang === 'en' ? config.titleEn : lang === 'ar' ? config.titleAr : config.titleFa) : '');
  const subtitle = customSubtitle || (config ? (lang === 'en' ? config.subtitleEn : lang === 'ar' ? config.subtitleAr : config.subtitleFa) : '');
  const tag = customTag || (config ? (lang === 'en' ? config.categoryTagEn : lang === 'ar' ? config.categoryTagAr : config.categoryTagFa) : '');
  const imageUrl = customImage || config?.imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2400&auto=format&fit=crop';
  const imageAlt = customImageAlt || (config ? (lang === 'en' ? config.imageAltEn : config.imageAltFa) : 'SHAMS Clinical Medical Visual');
  const concept = visualConceptLabel || config?.visualConcept;

  const accent = propAccent || config?.themeAccent || 'teal';

  const accentStyles = {
    teal: {
      badge: 'bg-shams-teal/20 text-shams-teal-light border-shams-teal/40',
      glow: 'from-shams-teal/25',
      border: 'border-shams-teal/30',
      pill: 'bg-shams-teal text-white',
    },
    gold: {
      badge: 'bg-shams-gold/20 text-shams-gold border-shams-gold/40',
      glow: 'from-shams-gold/25',
      border: 'border-shams-gold/30',
      pill: 'bg-shams-gold text-shams-navy',
    },
    burgundy: {
      badge: 'bg-shams-burgundy/25 text-[#F2B5A8] border-shams-burgundy/40',
      glow: 'from-shams-burgundy/30',
      border: 'border-shams-burgundy/30',
      pill: 'bg-shams-burgundy text-white',
    },
    sage: {
      badge: 'bg-shams-sage/25 text-[#A6E8B9] border-shams-sage/40',
      glow: 'from-shams-sage/25',
      border: 'border-shams-sage/30',
      pill: 'bg-shams-sage text-white',
    },
  }[accent];

  // 100% FULL-WIDTH VISUAL HERO BANNER ACROSS ALL PAGES
  // Edge-to-edge photography + subtle Deep Navy directional gradient + elegant high-contrast typography
  return (
    <section 
      id={heroId ? `hero-${heroId}` : 'page-hero'}
      className={`relative w-full bg-shams-navy text-white overflow-hidden min-h-[380px] md:min-h-[440px] flex flex-col justify-center py-16 md:py-24 ${className}`}
      dir={dir}
    >
      {/* FULL-BLEED BACKGROUND PHOTOGRAPHIC LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src={imageUrl}
          alt={imageAlt}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transform scale-100 filter transition-transform duration-1000 ${
            imageUrl.endsWith('.svg')
              ? 'brightness-[0.92] contrast-[1.05]'
              : 'brightness-[0.76] contrast-[1.08]'
          }`}
        />

        {/* DIRECTIONAL DEEP NAVY OVERLAY
            Preserves clear visibility and beauty of the image while ensuring 100% WCAG AA text contrast:
            In RTL (Persian/Arabic): text is on the right, so gradient is dense deep navy on the right (~95%)
            fading to ~25% on the left to illuminate the visual focal point!
            In LTR (English): text is on the left, so gradient is dense on the left (~95%)
            fading to ~25% on the right! */}
        <div 
          className={`absolute inset-0 ${
            isRTL
              ? 'bg-gradient-to-l from-shams-navy/96 via-shams-navy/80 to-shams-navy/25'
              : 'bg-gradient-to-r from-shams-navy/96 via-shams-navy/80 to-shams-navy/25'
          }`} 
        />

        {/* Ambient radial vignette preventing harsh highlights */}
        <div className="absolute inset-0 bg-radial from-transparent via-shams-navy/20 to-shams-navy/60 mix-blend-multiply" />

        {/* Bottom edge transition gradient into page content */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-shams-navy/80 via-transparent to-transparent" />

        {/* Subtle accent color atmosphere */}
        <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-b ${accentStyles.glow} to-transparent`} />
      </div>

      {/* FOREGROUND CONTENT LAYER */}
      <div className="container mx-auto px-4 max-w-6xl relative z-10 w-full">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="flex items-center gap-2 text-xs font-bold text-white/70 mb-5 flex-wrap">
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="opacity-40">/</span>}
                {b.link ? (
                  <a href={b.link} className="hover:text-white transition-colors">{b.label}</a>
                ) : (
                  <span className="text-white/95">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        ) : (
          <div className="mb-4">
            <Breadcrumbs variant="dark" />
          </div>
        )}

        {sideCard ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Side (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {tag && (
                <div className="mb-2">
                  <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${accentStyles.badge} shadow-xs`}>
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>{tag}</span>
                  </span>
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight text-white drop-shadow-xs">
                {title}
              </h1>

              {subtitle && (
                <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-normal max-w-2xl drop-shadow-xs">
                  {subtitle}
                </p>
              )}

              {children && (
                <div className="pt-2">
                  {children}
                </div>
              )}
            </div>

            {/* Interactive Side Panel / Data Card (5 cols) — Rendered on top of the full-width visual hero */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6">
                {sideCard}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl space-y-4">
            {tag && (
              <div className="mb-2">
                <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${accentStyles.badge} shadow-xs`}>
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{tag}</span>
                </span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight text-white drop-shadow-xs">
              {title}
            </h1>

            {subtitle && (
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-normal max-w-2xl drop-shadow-xs">
                {subtitle}
              </p>
            )}

            {children && (
              <div className="pt-2">
                {children}
              </div>
            )}
          </div>
        )}

        {concept && (
          <div className="mt-10 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-white/60 font-mono">
            <span className="hidden sm:inline">EDITORIAL CONCEPT: {concept}</span>
            <span className="flex items-center gap-1.5 text-white/80">
              <ShieldCheck className="w-3.5 h-3.5 text-shams-gold" />
              <span>SHAMS CLINICAL EVIDENCE ACCREDITED</span>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
