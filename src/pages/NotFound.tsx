import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ArrowRight, Search, Stethoscope, ShoppingBag, ShieldCheck, Activity, HelpCircle, FileQuestion, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function NotFound() {
  const { lang, dir, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const text = {
    fa: {
      badge: 'خطای ۴۰۴ | آدرس نامعتبر',
      title: 'صفحه موردنظر پیدا نشد',
      subtitle: 'متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد، آدرس آن تغییر کرده یا به طور موقت از دسترس خارج شده است.',
      homeBtn: 'بازگشت به صفحه اصلی',
      backBtn: 'بازگشت به صفحه قبل',
      searchPlaceholder: 'جستجو در بانک بیماری‌ها، ابزارها و محصولات...',
      searchBtn: 'جستجو',
      quickNavTitle: 'پیشنهادهای مسیریابی سریع در سامانه شمس:',
      quickLinks: [
        { label: 'بانک بیماری‌ها و راهنماهای بالینی', link: '/knowledge/diseases', icon: Stethoscope },
        { label: 'ارزیابی‌ها و ماشین‌حساب‌های سلامت', link: '/assessment/tools', icon: Activity },
        { label: 'فروشگاه مکمل‌ها و تجهیزات (شمس لایف)', link: '/shop', icon: ShoppingBag },
        { label: 'پرونده یکپارچه سلامت کاربر', link: '/services/record', icon: ShieldCheck },
      ]
    },
    en: {
      badge: 'Error 404 | Invalid URL',
      title: 'Page Not Found',
      subtitle: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      homeBtn: 'Back to Home',
      backBtn: 'Go to Previous Page',
      searchPlaceholder: 'Search diseases, calculators, products...',
      searchBtn: 'Search',
      quickNavTitle: 'Recommended navigation links in SHAMS ecosystem:',
      quickLinks: [
        { label: 'Clinical Disease Bank & Guides', link: '/knowledge/diseases', icon: Stethoscope },
        { label: 'Health Tools & Calculators', link: '/assessment/tools', icon: Activity },
        { label: 'SHAMS LIFE Shop & Supplements', link: '/shop', icon: ShoppingBag },
        { label: 'Unified Personal Health Record', link: '/services/record', icon: ShieldCheck },
      ]
    },
    ar: {
      badge: 'خطأ ٤٠٤ | رابط غير صالح',
      title: 'الصفحة المطلوبة غیر موجودة',
      subtitle: 'عذراً، الصفحة التي تبحث عنها قد تكون حُذفت، أو تم تغيير اسمها، أو غير متاحة حالياً.',
      homeBtn: 'العودة إلى الصفحة الرئيسية',
      backBtn: 'الرجوع للصفحة السابقة',
      searchPlaceholder: 'البحث في الأمراض، الحاسبات، والمنتجات...',
      searchBtn: 'بحث',
      quickNavTitle: 'روابط التنقل السريع الموصى بها:',
      quickLinks: [
        { label: 'بنك الأمراض والأدلة السريرية', link: '/knowledge/diseases', icon: Stethoscope },
        { label: 'أدوات وحاسبات الصحة', link: '/assessment/tools', icon: Activity },
        { label: 'متجر شمس لايف للمكملات', link: '/shop', icon: ShoppingBag },
        { label: 'السجل الصحي الموحد', link: '/services/record', icon: ShieldCheck },
      ]
    }
  }[lang] || {
    badge: 'خطای ۴۰۴ | آدرس نامعتبر',
    title: 'صفحه موردنظر پیدا نشد',
    subtitle: 'متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد، آدرس آن تغییر کرده یا به طور موقت از دسترس خارج شده است.',
    homeBtn: 'بازگشت به صفحه اصلی',
    backBtn: 'بازگشت به صفحه قبل',
    searchPlaceholder: 'جستجو در بانک بیماری‌ها، ابزارها و محصولات...',
    searchBtn: 'جستجو',
    quickNavTitle: 'پیشنهادهای مسیریابی سریع در سامانه شمس:',
    quickLinks: [
      { label: 'بانک بیماری‌ها و راهنماهای بالینی', link: '/knowledge/diseases', icon: Stethoscope },
      { label: 'ارزیابی‌ها و ماشین‌حساب‌های سلامت', link: '/assessment/tools', icon: Activity },
      { label: 'فروشگاه مکمل‌ها و تجهیزات (شمس لایف)', link: '/shop', icon: ShoppingBag },
      { label: 'پرونده یکپارچه سلامت کاربر', link: '/services/record', icon: ShieldCheck },
    ]
  };

  return (
    <div className="w-full bg-shams-sand min-h-screen pb-24 flex flex-col justify-between" dir={dir}>
      {/* Top Breadcrumbs Strip */}
      <div className="bg-white border-b border-shams-navy/10 py-3 px-4">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs customLastLabel={text.title} />
        </div>
      </div>

      {/* Main 404 Container */}
      <div className="container mx-auto px-4 max-w-4xl py-12 my-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 border border-shams-navy/10 shadow-xl relative overflow-hidden text-center">
          
          {/* Subtle Ambient Background Halos */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-shams-teal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-shams-gold/10 rounded-full blur-3xl pointer-events-none" />

          {/* 404 Stylized Vector Graphic */}
          <div className="relative z-10 max-w-xs mx-auto mb-8">
            <svg viewBox="0 0 400 200" className="w-full h-auto drop-shadow-md">
              <defs>
                <linearGradient id="numGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0A2540" />
                  <stop offset="50%" stopColor="#0F888D" />
                  <stop offset="100%" stopColor="#F5A623" />
                </linearGradient>
                <radialGradient id="halo404" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0A2540" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx="200" cy="100" r="90" fill="url(#halo404)" />
              <circle cx="200" cy="100" r="75" fill="none" stroke="#0F888D" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.6" />
              <circle cx="200" cy="100" r="60" fill="none" stroke="#F5A623" strokeWidth="2" opacity="0.8" />

              {/* Pulse Wave Line Through Center */}
              <path d="M 30 100 L 130 100 L 145 75 L 160 125 L 175 60 L 190 140 L 205 85 L 220 115 L 235 100 L 370 100" 
                    fill="none" stroke="url(#numGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* 404 Large Numbers */}
              <text x="70" y="125" fill="#0A2540" fontSize="72" fontWeight="900" fontFamily="sans-serif" opacity="0.95">4</text>
              <text x="180" y="125" fill="#0F888D" fontSize="72" fontWeight="900" fontFamily="sans-serif" opacity="0.95">0</text>
              <text x="280" y="125" fill="#0A2540" fontSize="72" fontWeight="900" fontFamily="sans-serif" opacity="0.95">4</text>
            </svg>
          </div>

          {/* Badge & Title */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-shams-teal/10 text-shams-teal border border-shams-teal/20">
              <FileQuestion className="w-4 h-4" />
              <span>{text.badge}</span>
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-shams-navy tracking-tight">
              {text.title}
            </h1>

            <p className="text-sm sm:text-base text-shams-navy/70 leading-relaxed font-normal">
              {text.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="bg-shams-navy hover:bg-shams-teal text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>{text.homeBtn}</span>
              </Link>

              <button
                onClick={() => navigate(-1)}
                className="bg-shams-sand hover:bg-shams-navy/10 text-shams-navy border border-shams-navy/20 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
              >
                {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{text.backBtn}</span>
              </button>
            </div>

            {/* In-Page Quick Search */}
            <div className="pt-6">
              <form onSubmit={handleSearch} className="max-w-md mx-auto relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={text.searchPlaceholder}
                  className="w-full pl-4 pr-11 py-3 rounded-2xl bg-shams-sand border border-shams-navy/15 text-xs text-shams-navy placeholder:text-shams-navy/40 focus:outline-none focus:ring-2 focus:ring-shams-teal/30 focus:bg-white transition-all"
                  dir={dir}
                />
                <button
                  type="submit"
                  className={`absolute ${isRTL ? 'left-2' : 'right-2'} bg-shams-teal hover:bg-shams-teal/90 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{text.searchBtn}</span>
                </button>
              </form>
            </div>

            {/* Quick Link Recommendations */}
            <div className="pt-8 border-t border-shams-sand mt-8 text-right" dir={dir}>
              <h3 className="text-xs font-bold text-shams-navy/80 mb-4 text-center sm:text-start">
                {text.quickNavTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-start">
                {text.quickLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      to={item.link}
                      className="p-3.5 rounded-2xl bg-shams-sand/80 hover:bg-shams-teal/10 border border-shams-navy/10 hover:border-shams-teal/30 transition-all flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-shams-teal shadow-xs group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-shams-navy group-hover:text-shams-teal transition-colors flex-1">
                        {item.label}
                      </span>
                      {isRTL ? (
                        <ArrowLeft className="w-3.5 h-3.5 text-shams-navy/40 group-hover:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-shams-navy/40 group-hover:translate-x-1 transition-transform" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
