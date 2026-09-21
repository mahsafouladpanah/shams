import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Stethoscope, Search, ArrowLeft, Filter, BookOpen, 
  Heart, Activity, Brain, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { diseaseCategories, sampleDiseases } from '../data/diseases';
import { PageHero } from '../components/PageHero';
import { diseaseCategoryHeroes } from '../data/heroImages';

export function Diseases() {
  const { lang, t, formatNumber, isRTL } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get('cat') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategoryObj = diseaseCategories.find(c => c.id === activeCat);
  const activeCategoryHero = activeCat !== 'all' ? diseaseCategoryHeroes[activeCat] : null;

  const filteredDiseases = sampleDiseases.filter(d => {
    const matchesCat = activeCat === 'all' || d.category === activeCat;
    const matchesSearch = searchQuery.trim() === '' || 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Editorial Page Hero with Pathology / Cellular Diagnostic Visual */}
      <PageHero
        heroId="diseases"
        customImage={activeCategoryHero?.imageUrl}
        customTitle={
          activeCategoryObj 
            ? (lang === 'en' ? `${activeCategoryObj.nameEn} Protocols` : `پروتکل‌های تخصصی ${activeCategoryObj.name}`)
            : undefined
        }
        customTag={
          activeCategoryObj 
            ? (lang === 'en' ? activeCategoryObj.nameEn : activeCategoryObj.name)
            : undefined
        }
        visualConceptLabel={activeCategoryHero?.visualConcept}
        layoutVariant="asymmetric"
        themeAccent="teal"
      >
        <div className="relative max-w-xl mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search by disease name, symptom, or keyword...' : 'جستجو در نام بیماری، علائم بالینی، درمان...'}
            className="w-full bg-white/15 border border-white/25 rounded-2xl py-3.5 px-5 pr-12 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-shams-teal focus:bg-white/25 transition-all shadow-lg backdrop-blur-sm"
          />
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 ${isRTL ? 'right-4' : 'left-auto right-4'}`} />
        </div>
      </PageHero>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 max-w-6xl -mt-6 relative z-20">
        
        {/* Categories Pills */}
        <div className="bg-white rounded-3xl p-4 border border-shams-navy/10 shadow-md mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSearchParams({})}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCat === 'all'
                ? 'bg-shams-navy text-white shadow-xs'
                : 'text-shams-navy/70 hover:bg-shams-sand'
            }`}
          >
            {lang === 'en' ? 'All Categories (10)' : 'همه حوزه‌ها (۱۰)'}
          </button>
          {diseaseCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ cat: cat.id })}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCat === cat.id
                  ? 'bg-shams-teal text-white shadow-xs'
                  : 'text-shams-navy/70 hover:bg-shams-sand'
              }`}
            >
              {lang === 'en' ? cat.nameEn : lang === 'ar' ? cat.nameAr : cat.name}
            </button>
          ))}
        </div>

        {/* Diseases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDiseases.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-3xl p-6 md:p-8 border border-shams-navy/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-shams-teal/10 text-shams-teal border border-shams-teal/20">
                    {lang === 'en' ? d.categoryEn : lang === 'ar' ? d.categoryAr : diseaseCategories.find(c => c.id === d.category)?.name}
                  </span>
                  <span className="text-xs font-mono text-shams-navy/40 uppercase" dir="ltr">{d.id}</span>
                </div>

                <h3 className="text-xl font-bold text-shams-navy mb-1 group-hover:text-shams-teal transition-colors">
                  {lang === 'en' ? d.nameEn : lang === 'ar' ? d.nameAr : d.name}
                </h3>
                <div className="text-xs font-sans text-shams-navy/50 font-medium mb-4" dir="ltr">{d.nameEn}</div>

                <p className="text-xs text-shams-navy/70 leading-relaxed line-clamp-3 mb-6">
                  {d.shortDesc}
                </p>

                {/* Key indicators preview */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="p-2.5 rounded-xl bg-shams-sand/60 text-[11px] text-shams-navy/80">
                    <span className="font-bold text-shams-navy block mb-0.5">علائم اولیه:</span>
                    <span className="truncate block">{d.symptoms[0]}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-shams-sand/60 text-[11px] text-shams-navy/80">
                    <span className="font-bold text-shams-navy block mb-0.5">توصیه ورزشی:</span>
                    <span className="truncate block">{d.exerciseRecommendations[0]}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-shams-sand flex items-center justify-between">
                <span className="text-[11px] text-shams-navy/50">
                  {formatNumber(d.faqs.length)} پرسش متداول · فایل‌های آموزشی
                </span>
                <Link
                  to={`/knowledge/diseases/${d.id}`}
                  className="px-5 py-2.5 rounded-2xl bg-shams-navy text-white text-xs font-bold hover:bg-shams-teal transition-all flex items-center gap-2 group-hover:gap-3"
                >
                  <span>{lang === 'en' ? 'Full Medical Guide' : 'راهنمای کامل بیماری'}</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-shams-navy/10">
            <p className="text-sm font-bold text-shams-navy/70">موردی با این عبارت جستجو یافت نشد.</p>
            <button
              onClick={() => { setSearchQuery(''); setSearchParams({}); }}
              className="mt-4 px-6 py-2 rounded-xl bg-shams-navy text-white text-xs font-bold"
            >
              مشاهده تمام بیماری‌ها
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
