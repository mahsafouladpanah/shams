import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, Activity, Database, Sparkles, ChevronLeft, 
  ArrowLeft, ShieldCheck, HeartPulse, LineChart as ChartIcon, BarChart2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';

export function Services() {
  const { lang, t, formatNumber, isRTL } = useLanguage();

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Editorial Page Hero with Clinical Health Services Visual */}
      <PageHero
        heroId="services"
        layoutVariant="asymmetric"
        themeAccent="teal"
      />

      {/* Main Services Grid */}
      <section className="container mx-auto px-4 max-w-6xl -mt-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 1. Health Record (Personal Dashboard) */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-shams-navy/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-shams-teal/10 text-shams-teal flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileText className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-shams-teal/10 text-shams-teal border border-shams-teal/20">
                  داشبورد فردی
                </span>
              </div>

              <h2 className="text-2xl font-bold text-shams-navy mb-2 group-hover:text-shams-teal transition-colors">
                {t('services.record')}
              </h2>
              <p className="text-xs md:text-sm text-shams-navy/70 leading-relaxed mb-6">
                مرکز نگهداری و مشاهده سوابق سلامت، نمودارهای روند وزن، فشار خون، تحلیل خواب و برنامه چک‌آپ‌های آینده به همراه توصیه‌های شخصی پزشک و هوش مصنوعی.
              </p>

              <div className="space-y-2 mb-6">
                <div className="p-3 rounded-xl bg-shams-sand/50 text-xs font-bold text-shams-navy flex items-center justify-between">
                  <span>پایش مداوم شاخص توده بدنی و فشار خون</span>
                  <ShieldCheck className="w-4 h-4 text-shams-teal" />
                </div>
                <div className="p-3 rounded-xl bg-shams-sand/50 text-xs font-bold text-shams-navy flex items-center justify-between">
                  <span>سوابق ارزیابی‌های جامع و تاریخچه آزمایش‌ها</span>
                  <ShieldCheck className="w-4 h-4 text-shams-teal" />
                </div>
                <div className="p-3 rounded-xl bg-shams-sand/50 text-xs font-bold text-shams-navy flex items-center justify-between">
                  <span>برنامه پیگیری و جلسات مشاوره‌ای آنلاین</span>
                  <ShieldCheck className="w-4 h-4 text-shams-teal" />
                </div>
              </div>
            </div>

            <Link
              to="/services/record"
              className="w-full py-4 rounded-2xl bg-shams-navy text-white text-center font-bold text-xs hover:bg-shams-teal transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>ورود به پرونده سلامت</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* 2. Research Panel (Anonymous Data Analysis) */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-shams-navy/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-shams-mauve/15 text-shams-mauve flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Database className="w-7 h-7" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-shams-mauve/10 text-shams-mauve border border-shams-mauve/20">
                  پنل پژوهش ناشناس
                </span>
              </div>

              <h2 className="text-2xl font-bold text-shams-navy mb-2 group-hover:text-shams-teal transition-colors">
                {t('services.research')}
              </h2>
              <p className="text-xs md:text-sm text-shams-navy/70 leading-relaxed mb-6">
                سامانه هوش سلامت جمعیتی بر پایه بیش از ۱۴۸,۰۰۰ رکورد ناشناس‌سازی‌شده برای تحلیل شیوع بیماری‌ها، سن بیولوژیک و اثربخشی مداخلات سبک زندگی.
              </p>

              <div className="space-y-2 mb-6">
                <div className="p-3 rounded-xl bg-shams-sand/50 text-xs font-bold text-shams-navy flex items-center justify-between">
                  <span>منطبق بر استانداردهای HIPAA و ناشناس‌سازی کامل</span>
                  <ShieldCheck className="w-4 h-4 text-shams-mauve" />
                </div>
                <div className="p-3 rounded-xl bg-shams-sand/50 text-xs font-bold text-shams-navy flex items-center justify-between">
                  <span>فیلتر کوهورت‌های مطالعاتی و تفکیک استانی</span>
                  <ShieldCheck className="w-4 h-4 text-shams-mauve" />
                </div>
                <div className="p-3 rounded-xl bg-shams-sand/50 text-xs font-bold text-shams-navy flex items-center justify-between">
                  <span>خروجی آماری ساختاریافته برای مراکز دانشگاهی</span>
                  <ShieldCheck className="w-4 h-4 text-shams-mauve" />
                </div>
              </div>
            </div>

            <Link
              to="/services/research"
              className="w-full py-4 rounded-2xl bg-shams-navy text-white text-center font-bold text-xs hover:bg-shams-teal transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>ورود به پنل پژوهش شمس</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
