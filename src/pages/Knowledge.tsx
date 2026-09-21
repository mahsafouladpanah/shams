import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Stethoscope, Dumbbell, Baby, ArrowLeft, ArrowRight, Search, Microscope, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';

export function Knowledge() {
  const { lang, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full bg-shams-sand min-h-screen pb-24">
      {/* Page Hero with Unique Scientific Laboratory Editorial Visual */}
      <PageHero
        heroId="knowledge"
        layoutVariant="asymmetric"
        themeAccent="teal"
      >
        <div className="relative max-w-xl mt-4">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search diseases, lifestyle protocols, nutrition...' : 'جستجو در مقالات، بانک بیماری‌ها، سبک زندگی، تغذیه...'}
            className="w-full bg-white/15 border border-white/25 rounded-2xl py-3.5 px-5 pr-12 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-shams-teal focus:bg-white/25 transition-all shadow-lg backdrop-blur-sm"
          />
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 ${isRTL ? 'right-4' : 'left-auto right-4'}`} />
        </div>
      </PageHero>

      {/* Main Categories */}
      <section className="py-12 -mt-6 relative z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategoryCard 
              to="/knowledge/diseases"
              image="https://images.unsplash.com/photo-1576091160550-2173ff9e5eb4?q=80&w=1200&auto=format&fit=crop"
              title={lang === 'en' ? 'Disease Encyclopedia' : 'بانک بیماری‌ها'}
              description={lang === 'en' ? 'Comprehensive pathology, symptom analysis, prevention and therapeutic guidelines.' : 'دایره‌المعارف جامع بیماری‌ها، علائم، پیشگیری و روش‌های درمان بر پایه شواهد علمی.'}
              icon={<Stethoscope className="w-6 h-6" />}
              color="teal"
              badge={lang === 'en' ? '10 Domains' : '۱۰ دپارتمان تخصصی'}
            />
            <CategoryCard 
              to="/lifestyle"
              image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop"
              title={lang === 'en' ? 'SHAMS Lifestyle Medicine' : 'شمس سبک زندگی'}
              description={lang === 'en' ? 'Circadian synchronization, restorative sleep, anti-inflammatory nutrition and daily stress modulation.' : 'تغذیه، خواب، مدیریت استرس و راهکارهای علمی برای ارتقای کیفیت زندگی روزمره.'}
              icon={<BookOpen className="w-6 h-6" />}
              color="sage"
              badge={lang === 'en' ? '9 Pillars' : '۹ ستون تندرستی'}
            />
            <CategoryCard 
              to="/sports"
              image="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
              title={lang === 'en' ? 'Sports & Movement Medicine' : 'شمس ورزش و پزشکی ورزشی'}
              description={lang === 'en' ? 'Human biomechanics, posture rehabilitation, sarcopenia prevention and personalized athletic prescriptions.' : 'پزشکی ورزشی، تناسب اندام، برنامه‌های تمرینی و سلامت ورزشکاران.'}
              icon={<Dumbbell className="w-6 h-6" />}
              color="gold"
              badge={lang === 'en' ? '15 Topics' : '۱۵ سرفصل بالینی'}
            />
            <CategoryCard 
              to="/age-groups"
              image="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop"
              title={lang === 'en' ? 'Lifespan Health & Healthy Aging' : 'سلامت در مراحل رشد و طول عمر'}
              description={lang === 'en' ? 'Evidence-based pediatric growth, adolescent hormonal shifts, and cellular longevity in active golden years.' : 'راهنمای تخصصی سلامت از نوزادی تا سالمندی، با توجه به نیازهای هر دوره.'}
              icon={<Baby className="w-6 h-6" />}
              color="teal"
              badge={lang === 'en' ? '5 Life Stages' : '۵ مرحله زیستی'}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ 
  to, 
  image, 
  title, 
  description, 
  icon, 
  color, 
  badge 
}: { 
  to: string; 
  image: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  color: 'teal'|'sage'|'gold'|'mauve';
  badge?: string;
}) {
  const { isRTL } = useLanguage();
  const colorStyles = {
    teal: 'group-hover:bg-shams-teal/90 text-shams-teal',
    sage: 'group-hover:bg-shams-sage/90 text-shams-sage',
    gold: 'group-hover:bg-shams-gold/90 text-shams-gold',
    mauve: 'group-hover:bg-shams-mauve/90 text-shams-mauve',
  };

  return (
    <Link to={to} className="group relative rounded-3xl overflow-hidden aspect-[16/9] block shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/40">
      <div className="absolute inset-0 bg-shams-navy/40 group-hover:bg-shams-navy/20 transition-colors z-10" />
      <img 
        src={image} 
        alt={title} 
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
      />
      
      <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end bg-gradient-to-t from-shams-navy/95 via-shams-navy/55 to-transparent">
        {badge && (
          <div className="mb-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md border border-white/20">
              {badge}
            </span>
          </div>
        )}
        <div className={`w-12 h-12 rounded-2xl bg-white mb-4 flex items-center justify-center transition-colors ${colorStyles[color]} group-hover:text-white shadow-md`}>
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{description}</p>
        
        <div className="mt-4 flex items-center gap-2 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all">
          <span>مشاهده سرفصل‌ها</span>
          {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </div>
      </div>
    </Link>
  );
}
