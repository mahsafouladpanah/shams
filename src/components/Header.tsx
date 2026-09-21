import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, ShoppingCart, ChevronDown, Activity, Settings, 
  LogOut, BookOpen, FileText, Globe, Menu, X, 
  Stethoscope, Dumbbell, Users, HeartPulse, Scale, Brain, 
  Moon, Compass, ShieldCheck, Database, ShoppingBag, Sparkles, 
  Zap, ArrowRight, ArrowLeft, LogIn, Bell, CheckCheck, Calendar,
  Award, Heart, Target, Layers, ExternalLink, GraduationCap, Microscope
} from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage, Language } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { diseaseCategories } from '../data/diseases';
import { lifestyleTopics, sportsTopics, ageGroupTopics } from '../data/knowledgeData';
import { shopGoals, shopLifeStages, shopHealthNeeds } from '../data/products';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, dir, setLang, t, formatNumber } = useLanguage();
  const { totalCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  // Active Dropdowns
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [healthSubTab, setHealthSubTab] = useState<'diseases' | 'lifestyle' | 'assessment'>('diseases');
  
  // Header action menus
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  const navRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    setIsNotifOpen(false);
    setIsLangOpen(false);
  }, [location.pathname]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileCategory = (key: string) => {
    setMobileExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const languages: { code: Language; flag: string; label: string; native: string }[] = [
    { code: 'fa', flag: '🇮🇷', label: 'Persian', native: 'فارسی' },
    { code: 'en', flag: '🇬🇧', label: 'English', native: 'English' },
    { code: 'ar', flag: '🇸🇦', label: 'Arabic', native: 'العربية' },
  ];

  const currentLanguage = languages.find(l => l.code === lang) || languages[0];

  // Helper for notification localized string
  const getNotifTitle = (n: any) => lang === 'en' ? n.titleEn : lang === 'ar' ? n.titleAr : n.titleFa;
  const getNotifDesc = (n: any) => lang === 'en' ? n.descEn : lang === 'ar' ? n.descAr : n.descFa;
  const getNotifTime = (n: any) => lang === 'en' ? n.timeEn : lang === 'ar' ? n.timeAr : n.timeFa;

  const brandName = lang === 'en' ? 'PROFESSOR SHAMS' : lang === 'ar' ? 'البروفيسور شمس' : 'پروفسور شمس';
  const brandTagline = lang === 'en' ? 'Health • Science • Better Life' : lang === 'ar' ? 'الصحة • العلم • حياة أفضل' : 'سلامت • دانش • زندگی بهتر';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-shams-navy text-white shadow-md select-none">
      <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-3 lg:px-3.5 xl:px-5 h-14 lg:h-[58px] flex items-center justify-between gap-1 lg:gap-1.5 xl:gap-2.5 flex-nowrap overflow-x-visible">
        
        {/* Brand Logo & Tagline */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 group">
          <Logo variant="icon" className="w-7 h-7 sm:w-7.5 sm:h-7.5 group-hover:scale-105 transition-transform shrink-0" />
          <div className="flex flex-col justify-center">
            <span className="text-xs sm:text-sm xl:text-base font-bold text-white tracking-tight leading-none whitespace-nowrap">
              {brandName}
            </span>
            <span className="text-[8.5px] xl:text-[9.5px] text-shams-teal-light font-medium tracking-normal whitespace-nowrap mt-0.5 hidden xl:block">
              {brandTagline}
            </span>
          </div>
        </Link>

        {/* Desktop Single-Line Horizontal Navigation (11 Complete Categories - No Wrapping, No Scrolling) */}
        <nav 
          className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-nowrap shrink min-w-0" 
          ref={navRef}
        >
          
          {/* 1. PROFESSOR SHAMS */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveDropdown('prof')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'prof' ? null : 'prof')}
              className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 cursor-pointer shrink-0 ${
                location.pathname === '/' || location.pathname === '/about' || activeDropdown === 'prof'
                  ? 'text-shams-teal-light bg-white/10 shadow-xs border border-shams-teal/40'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'en' ? 'Prof. Shams' : lang === 'ar' ? 'د. شمس' : 'پروفسور شمس'}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-60 text-white shrink-0 transition-transform duration-200 ${activeDropdown === 'prof' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'prof' && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} mt-2 w-[520px] bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-shams-sand">
                  <div>
                    <div className="text-xs font-bold text-shams-navy flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-shams-gold" />
                      {brandName}
                    </div>
                    <div className="text-[11px] text-shams-teal font-bold mt-0.5">{brandTagline}</div>
                  </div>
                  <Link 
                    to="/about" 
                    className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1"
                  >
                    {lang === 'en' ? 'About Founder' : lang === 'ar' ? 'عن المؤسس' : 'بیوگرافی کامل'}
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-shams-navy">
                  <Link
                    to="/"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start gap-2.5"
                  >
                    <Activity className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                    <div>
                      <div>{t('submenu.profOverview')}</div>
                      <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                        {lang === 'en' ? 'Ecosystem landing & pillars' : lang === 'ar' ? 'بوابة المنظومة الصحية' : 'درگاه اصلی و بخش‌های زیست‌بوم'}
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/about"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start gap-2.5"
                  >
                    <Compass className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                    <div>
                      <div>{t('submenu.profVision')}</div>
                      <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                        {lang === 'en' ? 'Evidence-based longevity vision' : lang === 'ar' ? 'الرؤية العلمية لطب المعيشة' : 'دیدگاه علمی و پیام پیشگیری'}
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/about#faculty"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start gap-2.5"
                  >
                    <Users className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                    <div>
                      <div>{t('submenu.profFaculty')}</div>
                      <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                        {lang === 'en' ? 'Medical board & advisory' : lang === 'ar' ? 'المجلس العلمي السريري' : 'شورای علمی و اساتید بالینی'}
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/about#charter"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start gap-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                    <div>
                      <div>{t('submenu.profCharter')}</div>
                      <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                        {lang === 'en' ? 'Clinical ethics & standards' : lang === 'ar' ? 'الميثاق الأخلاقي لطب الحياة' : 'اصول و تعهدات بالینی شمس'}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 2. Shams Health (سلامت و سبک زندگی) */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveDropdown('health')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'health' ? null : 'health')}
              className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 cursor-pointer shrink-0 ${
                location.pathname.startsWith('/knowledge') || location.pathname.startsWith('/assessment') || location.pathname === '/plan' || activeDropdown === 'health'
                  ? 'text-shams-teal-light bg-white/10 shadow-xs border border-shams-teal/40'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'en' ? 'Health' : lang === 'ar' ? 'الصحة' : 'سلامت'}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-60 text-white shrink-0 transition-transform duration-200 ${activeDropdown === 'health' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'health' && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} mt-2 w-[720px] max-w-[90vw] bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="grid grid-cols-12 gap-6">
                  {/* Left Column: Subcategory Tabs & Health Program Banner */}
                  <div className={`col-span-4 ${dir === 'rtl' ? 'border-l pl-4' : 'border-r pr-4'} border-shams-sand space-y-2`}>
                    <div className="text-[11px] font-bold text-shams-navy/50 px-3 pb-1 uppercase tracking-wider">
                      {t('nav.shamsHealthSub')}
                    </div>

                    <button
                      onMouseEnter={() => setHealthSubTab('diseases')}
                      onClick={() => navigate('/knowledge/diseases')}
                      className={`w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        healthSubTab === 'diseases' ? 'bg-shams-navy text-white shadow-md' : 'text-shams-navy/70 hover:bg-shams-sand'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-shams-teal" />
                        {t('knowledge.diseases')}
                      </span>
                      <span className="text-[10px] opacity-70">۱۰</span>
                    </button>

                    <button
                      onMouseEnter={() => setHealthSubTab('lifestyle')}
                      onClick={() => navigate('/knowledge/lifestyle')}
                      className={`w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        healthSubTab === 'lifestyle' ? 'bg-shams-navy text-white shadow-md' : 'text-shams-navy/70 hover:bg-shams-sand'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-shams-teal" />
                        {t('knowledge.lifestyle')}
                      </span>
                      <span className="text-[10px] opacity-70">۹</span>
                    </button>

                    <button
                      onMouseEnter={() => setHealthSubTab('assessment')}
                      onClick={() => navigate('/assessment')}
                      className={`w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        healthSubTab === 'assessment' ? 'bg-shams-navy text-white shadow-md' : 'text-shams-navy/70 hover:bg-shams-sand'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-shams-gold" />
                        {t('nav.assessment')}
                      </span>
                      <span className="text-[10px] opacity-70">۷</span>
                    </button>

                    {/* Exclusively Green: Health Program Action */}
                    <div className="pt-2 border-t border-shams-sand">
                      <Link
                        to="/plan"
                        className="p-3 rounded-2xl bg-shams-green-primary text-white hover:bg-shams-green-deep transition-all block shadow-sm"
                      >
                        <div className="text-[10px] uppercase font-bold text-white/80 flex items-center gap-1">
                          <HeartPulse className="w-3 h-3 text-shams-green-mint" />
                          Health Program
                        </div>
                        <div className="text-xs font-bold mt-0.5">{t('submenu.healthProgram')}</div>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Content */}
                  <div className="col-span-8 overflow-y-auto max-h-[360px] pr-2">
                    {healthSubTab === 'diseases' && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-xs text-shams-navy">{t('submenu.diseaseLib')}</h4>
                          <Link to="/knowledge/diseases" className="text-xs font-bold text-shams-teal hover:underline">{t('common.viewAll')}</Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {diseaseCategories.map(cat => (
                            <Link
                              key={cat.id}
                              to={`/knowledge/diseases?cat=${cat.id}`}
                              className="p-2.5 rounded-xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/40 transition-all text-xs font-bold text-shams-navy/90 flex items-center justify-between"
                            >
                              <span className="truncate">{lang === 'en' ? cat.nameEn : lang === 'ar' ? cat.nameAr : cat.name}</span>
                              <span className="text-[10px] font-mono text-shams-navy/40">{formatNumber(cat.count)}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {healthSubTab === 'lifestyle' && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-xs text-shams-navy">{t('submenu.lifestylePillars')}</h4>
                          <Link to="/knowledge/lifestyle" className="text-xs font-bold text-shams-teal hover:underline">{t('common.viewAll')}</Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {lifestyleTopics.map(topic => (
                            <Link
                              key={topic.id}
                              to={`/knowledge/lifestyle?topic=${topic.id}`}
                              className="p-2.5 rounded-xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/40 transition-all text-xs font-bold text-shams-navy/90 flex items-center justify-between"
                            >
                              <span className="truncate">{lang === 'en' ? topic.titleEn : lang === 'ar' ? topic.titleAr : topic.title}</span>
                              {dir === 'rtl' ? <ArrowLeft className="w-3 h-3 text-shams-navy/30" /> : <ArrowRight className="w-3 h-3 text-shams-navy/30" />}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {healthSubTab === 'assessment' && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-xs text-shams-navy">{t('submenu.healthAssessment')}</h4>
                          <Link to="/assessment" className="text-xs font-bold text-shams-teal hover:underline">{t('common.viewAll')}</Link>
                        </div>
                        <div className="space-y-2">
                          <Link
                            to="/assessment"
                            className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/40 transition-all flex items-center justify-between text-xs font-bold text-shams-navy"
                          >
                            <div className="flex items-center gap-2">
                              <Activity className="w-4 h-4 text-shams-teal" />
                              <span>{t('submenu.healthAssessment')}</span>
                            </div>
                            <span className="text-[10px] text-shams-teal">{lang === 'en' ? 'Full Screening' : 'ارزیابی ۳۶۰ درجه'}</span>
                          </Link>

                          <Link
                            to="/assessment/tools"
                            className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/40 transition-all flex items-center justify-between text-xs font-bold text-shams-navy"
                          >
                            <div className="flex items-center gap-2">
                              <Scale className="w-4 h-4 text-shams-gold" />
                              <span>{t('submenu.healthTools')}</span>
                            </div>
                            <span className="text-[10px] text-shams-navy/50">{lang === 'en' ? 'BMI, TDEE, Sleep' : '۷ ابزار بالینی'}</span>
                          </Link>

                          <Link
                            to="/assessment/registry"
                            className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/40 transition-all flex items-center justify-between text-xs font-bold text-shams-navy"
                          >
                            <div className="flex items-center gap-2">
                              <Database className="w-4 h-4 text-shams-teal" />
                              <span>{t('submenu.healthRegistry')}</span>
                            </div>
                            <span className="text-[10px] text-shams-teal">{lang === 'en' ? 'Epidemiological' : 'سامانه ملی'}</span>
                          </Link>

                          <Link
                            to="/services/record"
                            className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/40 transition-all flex items-center justify-between text-xs font-bold text-shams-navy"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-shams-navy/70" />
                              <span>{t('submenu.healthRecord')}</span>
                            </div>
                            <span className="text-[10px] text-shams-navy/50">{lang === 'en' ? 'Biomarker Logs' : 'سوابق و آزمایش‌ها'}</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Shams Aging (سالمندی سالم و موفق) */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveDropdown('aging')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'aging' ? null : 'aging')}
              className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 cursor-pointer shrink-0 ${
                location.pathname.includes('age-groups') || activeDropdown === 'aging'
                  ? 'text-shams-teal-light bg-white/10 shadow-xs border border-shams-teal/40'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'en' ? 'Aging' : lang === 'ar' ? 'الشيخوخة' : 'سالمندی'}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-60 text-white shrink-0 transition-transform duration-200 ${activeDropdown === 'aging' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'aging' && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} mt-2 w-[540px] bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-shams-sand">
                  <div>
                    <div className="text-xs font-bold text-shams-navy flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-shams-teal" />
                      {t('nav.shamsAging')}
                    </div>
                    <div className="text-[11px] text-shams-navy/60 font-bold mt-0.5">{t('nav.shamsAgingSub')}</div>
                  </div>
                  <Link 
                    to="/knowledge/age-groups" 
                    className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1"
                  >
                    {t('common.viewAll')}
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </div>

                <div className="space-y-2 text-xs font-bold text-shams-navy">
                  <Link
                    to="/knowledge/age-groups"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Heart className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.agingGuide')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Evidence-based longevity protocols' : lang === 'ar' ? 'بروتوكولات طول العمر النشط' : 'راهنمای حفظ استقلال و شادابی سالمندان'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-shams-teal bg-shams-teal/10 px-2 py-0.5 rounded-md self-center">۶۵+</span>
                  </Link>

                  <Link
                    to="/assessment/tools"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Scale className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.agingAssessment')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Clinical fall risk & balance index' : lang === 'ar' ? 'فحص التوازن وخطر السقوط السريري' : 'ارزیابی بالینی تعادل و خطر سقوط سالمندی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-navy/40 font-mono self-center">Tool</span>
                  </Link>

                  <Link
                    to="/shop?need=aging"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <ShoppingBag className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.agingStore')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Nutritional support & mobility aids' : lang === 'ar' ? 'مكملات دعم المفاصل والحيوية' : 'مکمل‌های استاندارد مفاصل، حافظه و نشاط'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-teal font-mono self-center">{lang === 'en' ? 'Store' : 'فروشگاه'}</span>
                  </Link>

                  <Link
                    to="/events"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-shams-navy/70 shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.agingEvents')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Interactive webinars & social forums' : lang === 'ar' ? 'ندوات وورش عمل تفاعلية' : 'کارگاه‌های آموزشی سبک زندگی سالمندان'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-navy/40 font-mono self-center">{lang === 'en' ? 'Webinars' : 'وبینار'}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 4. Shams Performance (ورزش و عملکرد) */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveDropdown('performance')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'performance' ? null : 'performance')}
              className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 cursor-pointer shrink-0 ${
                location.pathname.includes('sports') || activeDropdown === 'performance'
                  ? 'text-shams-teal-light bg-white/10 shadow-xs border border-shams-teal/40'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'en' ? 'Performance' : lang === 'ar' ? 'الأداء' : 'ورزش'}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-60 text-white shrink-0 transition-transform duration-200 ${activeDropdown === 'performance' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'performance' && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} mt-2 w-[540px] bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-shams-sand">
                  <div>
                    <div className="text-xs font-bold text-shams-navy flex items-center gap-1.5">
                      <Dumbbell className="w-4 h-4 text-shams-gold" />
                      {t('nav.shamsPerformance')}
                    </div>
                    <div className="text-[11px] text-shams-navy/60 font-bold mt-0.5">{t('nav.shamsPerformanceSub')}</div>
                  </div>
                  <Link 
                    to="/knowledge/sports" 
                    className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1"
                  >
                    {t('common.viewAll')}
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </div>

                <div className="space-y-2 text-xs font-bold text-shams-navy">
                  <Link
                    to="/knowledge/sports"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Activity className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.sportsMedicine')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Biomechanical physiology & exercise dosing' : lang === 'ar' ? 'فسيولوجيا الحركة والجرعات التدريبية' : 'دانش بیومکانیک و نسخه ورزشی علمی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-teal font-mono self-center">۱۵ Topic</span>
                  </Link>

                  <Link
                    to="/assessment/tools"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Scale className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.fitnessAssessment')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'VO2 Max, aerobic capacity & recovery rate' : lang === 'ar' ? 'حساب VO2 Max والسعة القلبية التنفسية' : 'محاسبه توان هوازی و ضربان ریکاوری'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-gold font-mono self-center">VO2 Max</span>
                  </Link>

                  <Link
                    to="/shop?goal=fitness"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.sportsNutrition')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Targeted athletic supplements & protein' : lang === 'ar' ? 'مكملات التعافي والأداء البدني' : 'مکمل‌های تاییدشده بازتوانی عضلانی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-teal font-mono self-center">{lang === 'en' ? 'Store' : 'مکمل‌ها'}</span>
                  </Link>

                  <Link
                    to="/plan"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Target className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.posturePlan')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Core stability & corrective kinetics' : lang === 'ar' ? 'تصحيح القوام والثبات العضلي' : 'برنامه اصلاح پاسچر و بهبود حرکت'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-green-primary font-mono self-center">Program</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 5. Shams Academy (آموزش) */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveDropdown('academy')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'academy' ? null : 'academy')}
              className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 cursor-pointer shrink-0 ${
                location.pathname.startsWith('/events') || activeDropdown === 'academy'
                  ? 'text-shams-teal-light bg-white/10 shadow-xs border border-shams-teal/40'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'en' ? 'Academy' : lang === 'ar' ? 'الأكاديمية' : 'آکادمی'}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-60 text-white shrink-0 transition-transform duration-200 ${activeDropdown === 'academy' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'academy' && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} mt-2 w-[540px] bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-shams-sand">
                  <div>
                    <div className="text-xs font-bold text-shams-navy flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-shams-teal" />
                      {t('nav.shamsAcademy')}
                    </div>
                    <div className="text-[11px] text-shams-navy/60 font-bold mt-0.5">{t('nav.shamsAcademySub')}</div>
                  </div>
                  <Link 
                    to="/events" 
                    className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1"
                  >
                    {lang === 'en' ? 'All Events' : lang === 'ar' ? 'كافة الفعاليات' : 'مشاهده رویدادها'}
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </div>

                <div className="space-y-2 text-xs font-bold text-shams-navy">
                  <Link
                    to="/shop?type=digital"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.digitalCourses')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Video masterclasses & accredited certificates' : lang === 'ar' ? 'ماستركلاس مرئي وشهادات معتمدة' : 'مسترکلاس‌های ویدیویی، تنفس آگاهانه و خواب'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-gold font-mono self-center">Digital</span>
                  </Link>

                  <Link
                    to="/events"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.eventsWebinars')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Live medical webinars & interactive Q&A' : lang === 'ar' ? 'ندوات تفاعلية مباشرة مع الخبراء' : 'وبینارهای زنده با اعضای هیئت علمی بالینی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-teal font-mono self-center">{lang === 'en' ? 'Live' : 'رویداد'}</span>
                  </Link>

                  <Link
                    to="/knowledge"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <BookOpen className="w-4 h-4 text-shams-navy/70 shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.evidenceLibrary')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Clinical articles & lifestyle research reviews' : lang === 'ar' ? 'مقالات طبية مراجعة علمياً' : 'پایگاه مقالات مروری و شواهد پزشکی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-navy/40 font-mono self-center">Library</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 6. Shams Research (پژوهش) */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveDropdown('research')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'research' ? null : 'research')}
              className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 cursor-pointer shrink-0 ${
                location.pathname.startsWith('/services/research') || activeDropdown === 'research'
                  ? 'text-shams-teal-light bg-white/10 shadow-xs border border-shams-teal/40'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'en' ? 'Research' : lang === 'ar' ? 'الأبحاث' : 'پژوهش'}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-60 text-white shrink-0 transition-transform duration-200 ${activeDropdown === 'research' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'research' && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} mt-2 w-[540px] bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-shams-sand">
                  <div>
                    <div className="text-xs font-bold text-shams-navy flex items-center gap-1.5">
                      <Microscope className="w-4 h-4 text-shams-teal" />
                      {t('nav.shamsResearch')}
                    </div>
                    <div className="text-[11px] text-shams-navy/60 font-bold mt-0.5">{t('nav.shamsResearchSub')}</div>
                  </div>
                  <Link 
                    to="/services/research" 
                    className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1"
                  >
                    {lang === 'en' ? 'Research Panel' : lang === 'ar' ? 'لوحة الأبحاث' : 'ورود به پنل'}
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </div>

                <div className="space-y-2 text-xs font-bold text-shams-navy">
                  <Link
                    to="/services/research"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Database className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.researchPanel')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Aggregated population biomarkers & analytics' : lang === 'ar' ? 'تحليل المؤشرات الحيوية السكانية' : 'تحلیل داده‌های سلامت، ریسک بیماری‌ها و فاکتورها'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-teal font-mono self-center">Live Data</span>
                  </Link>

                  <Link
                    to="/assessment/registry"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.healthRegistry')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Contribute anonymous data to national registry' : lang === 'ar' ? 'مشاركة البيانات غير المعرفة لدعم الأبحاث' : 'ثبت نام در رجیستری پژوهشی سلامت شمس'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-gold font-mono self-center">Registry</span>
                  </Link>

                  <Link
                    to="/about"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Users className="w-4 h-4 text-shams-navy/70 shrink-0 mt-0.5" />
                      <div>
                        <div>{t('submenu.academicCollab')}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'University partnerships & clinical trial grants' : lang === 'ar' ? 'التعاون مع الجامعات والمراكز البحثية' : 'همکاری با دانشگاه‌ها و پژوهشکده‌های علوم پزشکی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-navy/40 font-mono self-center">Academic</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 7. Assessment */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveDropdown('assessment')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'assessment' ? null : 'assessment')}
              className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 cursor-pointer shrink-0 ${
                location.pathname.startsWith('/assessment') || activeDropdown === 'assessment'
                  ? 'text-shams-teal-light bg-white/10 shadow-xs border border-shams-teal/40'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'en' ? 'Assessment' : lang === 'ar' ? 'تقييم' : 'ارزیابی'}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-60 text-white shrink-0 transition-transform duration-200 ${activeDropdown === 'assessment' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'assessment' && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} mt-2 w-[500px] bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-shams-navy`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-shams-sand">
                  <div>
                    <div className="text-xs font-bold text-shams-navy flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-shams-teal" />
                      {lang === 'en' ? 'Clinical Assessments & Tools' : lang === 'ar' ? 'التقييمات السريرية والأدوات' : 'ارزیابی‌های بالینی و ابزارهای سنجش'}
                    </div>
                    <div className="text-[11px] text-shams-navy/60 font-bold mt-0.5">
                      {lang === 'en' ? 'Evidence-based risk calculation & biological age' : 'محاسبه سن زیستی، ریسک بیماری‌ها و ماشین‌حساب‌های سلامت'}
                    </div>
                  </div>
                  <Link 
                    to="/assessment" 
                    className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1"
                  >
                    {t('common.viewAll')}
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </div>

                <div className="space-y-2 text-xs font-bold text-shams-navy">
                  <Link
                    to="/assessment"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <HeartPulse className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Comprehensive Healthspan Assessment' : 'ارزیابی جامع ریسک بیولوژیک و طول عمر'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? '54 clinical factors analyzing metabolic and cardiovascular risk' : 'تحلیل ۵۴ شاخص متابولیک، سندروم فرسودگی و سن زیستی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-teal font-mono self-center">Clinical</span>
                  </Link>

                  <Link
                    to="/assessment/tools"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Activity className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Interactive Clinical Calculators' : 'ماشین‌حساب‌ها و ابزارهای سنجش بالینی'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'BMI, TDEE, FINDRISC diabetes risk, PSQI sleep score' : 'شاخص توده بدنی، ریسک دیابت و نمره خواب پیتزبورگ'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-gold font-mono self-center">Tools</span>
                  </Link>

                  <Link
                    to="/assessment/registry"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Database className="w-4 h-4 text-shams-navy/70 shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'National Health Registry Cohort' : 'سامانه ثبت ملی داده‌های سلامت و کوهورت'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Participate in population health studies with encrypted privacy' : 'مشارکت داوطلبانه در مطالعات جمعیتی با رمزنگاری پیشرفته'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-navy/40 font-mono self-center">Registry</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 8. Health Program (Distinctive Sage Green Visual Identity) */}
          <Link
            to="/plan"
            className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer shadow-xs shrink-0 ${
              location.pathname === '/plan'
                ? 'bg-shams-sage text-white shadow-sm'
                : 'bg-shams-sage/20 text-[#86D49C] border border-shams-sage/40 hover:bg-shams-sage hover:text-white'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5 text-shams-gold shrink-0" />
            <span>{lang === 'en' ? 'Plan' : lang === 'ar' ? 'البرنامج' : 'برنامه'}</span>
          </Link>

          {/* 9. Services */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveDropdown('services')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
              className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 cursor-pointer shrink-0 ${
                location.pathname.startsWith('/services') || activeDropdown === 'services'
                  ? 'text-shams-teal-light bg-white/10 shadow-xs border border-shams-teal/40'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'en' ? 'Services' : lang === 'ar' ? 'الخدمات' : 'خدمات'}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-60 text-white shrink-0 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'services' && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-[480px] max-w-[90vw] bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-shams-navy`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-shams-sand">
                  <div>
                    <div className="text-xs font-bold text-shams-navy flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-shams-teal" />
                      {lang === 'en' ? 'Clinical Services & Telehealth' : lang === 'ar' ? 'الخدمات السريرية والملف الطبي' : 'خدمات بالینی و پرونده سلامت'}
                    </div>
                    <div className="text-[11px] text-shams-navy/60 font-bold mt-0.5">
                      {lang === 'en' ? 'Personal medical record, research analytics & consults' : 'پرونده الکترونیک سلامت، پنل داده‌های پژوهشی و مشاوره'}
                    </div>
                  </div>
                  <Link 
                    to="/services" 
                    className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1"
                  >
                    {t('common.viewAll')}
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </div>

                <div className="space-y-2 text-xs font-bold text-shams-navy">
                  <Link
                    to="/services/record"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <FileText className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Personal Health Record (PHR)' : 'پرونده الکترونیک سلامت و بیومارکرها'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Consolidated timeline of lab tests and wearables' : 'بایگانی هوشمند نتایج آزمایش‌ها و روندهای سلامت'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-teal font-mono self-center">Record</span>
                  </Link>

                  <Link
                    to="/services/research"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Database className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Population Research & Analytics Panel' : 'پنل پژوهش‌های جمعیتی و تحلیل کلان‌داده'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Epidemiological trends and cohort statistics' : 'تحلیل شاخص‌های اپیدمیولوژیک و سبک زندگی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-gold font-mono self-center">Research</span>
                  </Link>

                  <Link
                    to="/services"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Stethoscope className="w-4 h-4 text-shams-navy/70 shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Specialized Telehealth & Clinic' : 'مشاوره تخصصی آنلاین و کلینیک شمس'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Direct consultations with medical advisory board members' : 'ویزیت و نوبت‌دهی مشاوره با اعضای هیئت علمی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-navy/40 font-mono self-center">Clinic</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 10. Shop / SHAMS LIFE */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveDropdown('shop')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'shop' ? null : 'shop')}
              className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 cursor-pointer shrink-0 ${
                location.pathname.startsWith('/shop') || activeDropdown === 'shop'
                  ? 'text-shams-teal-light bg-white/10 shadow-xs border border-shams-teal/40'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'en' ? 'Store' : lang === 'ar' ? 'متجر' : 'فروشگاه'}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-60 text-white shrink-0 transition-transform duration-200 ${activeDropdown === 'shop' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'shop' && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-[500px] max-w-[90vw] bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-shams-sand">
                  <div>
                    <div className="text-xs font-bold text-shams-navy flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-shams-gold" />
                      {lang === 'en' ? 'SHAMS LIFE Store & Supplements' : lang === 'ar' ? 'متجر شمس للمكملات المعتمدة' : 'فروشگاه مکمل‌ها و تجهیزات شمس لایف'}
                    </div>
                    <div className="text-[11px] text-shams-navy/60 font-bold mt-0.5">
                      {lang === 'en' ? 'Laboratory-verified formulations & clinical packs' : lang === 'ar' ? 'مكملات غذائية وحزم علاجية معتمدة سريرياً' : 'فرمولاسیون‌های تاییدشده آزمایشگاهی و پک‌های تخصصی'}
                    </div>
                  </div>
                  <Link 
                    to="/shop" 
                    className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1"
                  >
                    {t('common.viewAll')}
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </div>

                <div className="space-y-2 text-xs font-bold text-shams-navy">
                  <Link
                    to="/shop?category=supplements"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Targeted Clinical Supplements' : lang === 'ar' ? 'المكملات العلاجية الموجهة' : 'مکمل‌های تخصصی بالینی'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Omega-3, Vitamin D3+K2, Magnesium Glycinate, Probiotics' : 'امگا ۳ خالص، ویتامین D3+K2، منیزیم گلیسینات و پروبیوتیک'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-teal font-mono self-center">{lang === 'en' ? 'Supplements' : 'مکمل‌ها'}</span>
                  </Link>

                  <Link
                    to="/shop?tab=packs"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Target className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Integrated Health Packs' : lang === 'ar' ? 'باقات الرعاية الصحية المتكاملة' : 'پک‌های یکپارچه بهبود سلامت'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Longevity, metabolic reset, deep sleep & joint packs' : 'پک طول عمر و آنتی‌اکسیدان، سندروم متابولیک و مفاصل'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-gold font-mono self-center">Packs</span>
                  </Link>

                  <Link
                    to="/shop?type=digital"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-shams-navy/70 shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Digital Programs & Audio Masterclasses' : lang === 'ar' ? 'البرامج الرقمية والماستركلاس' : 'برنامه‌های دیجیتال و مسترکلاس‌های صوتی'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Circadian reset protocols, breathwork masterclasses' : 'راهنماهای صوتی تنفس آگاهانه، مراقبه و بهداشت خواب'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-navy/40 font-mono self-center">Digital</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 11. About SHAMS */}
          <div 
            className="relative shrink-0"
            onMouseEnter={() => setActiveDropdown('about')}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              className={`px-1.5 xl:px-2 py-1 rounded-lg text-[10.5px] xl:text-[11.5px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 cursor-pointer shrink-0 ${
                location.pathname.startsWith('/about') || activeDropdown === 'about'
                  ? 'text-shams-teal-light bg-white/10 shadow-xs border border-shams-teal/40'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{lang === 'en' ? 'About' : lang === 'ar' ? 'عن شمس' : 'درباره'}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-60 text-white shrink-0 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'about' && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-[480px] max-w-[90vw] bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-shams-sand">
                  <div>
                    <div className="text-xs font-bold text-shams-navy flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-shams-teal" />
                      {lang === 'en' ? 'About Professor Shams & Board' : lang === 'ar' ? 'عن البروفيسور شمس والهيئة العلمية' : 'درباره پروفسور شمس و هیئت علمی'}
                    </div>
                    <div className="text-[11px] text-shams-navy/60 font-bold mt-0.5">
                      {lang === 'en' ? 'Translational medicine, charter & clinical standards' : 'چشم‌انداز علمی، استانداردهای بالینی و ساختار زیست‌بوم'}
                    </div>
                  </div>
                  <Link 
                    to="/about" 
                    className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1"
                  >
                    {lang === 'en' ? 'Overview' : 'نمای کلی'}
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </div>

                <div className="space-y-2 text-xs font-bold text-shams-navy">
                  <Link
                    to="/about"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Users className="w-4 h-4 text-shams-teal shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Scientific Board & Faculty' : 'اعضای هیئت علمی و مشاوران بین‌المللی'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Multidisciplinary experts in lifestyle and longevity' : 'متخصصان قلب، غدد، تغذیه بالینی و فیزیولوژی ورزشی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-teal font-mono self-center">Faculty</span>
                  </Link>

                  <Link
                    to="/about#charter"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Evidence-Based Charter & Ethics' : 'منشور اخلاقی و استانداردهای پژوهشی شمس'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Commitment to transparency and independence' : 'تعهد بنیادین به استقلال علمی و سلامت عمومی'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-gold font-mono self-center">Charter</span>
                  </Link>

                  <Link
                    to="/about#contact"
                    className="p-3 rounded-2xl border border-shams-sand hover:border-shams-teal/40 hover:bg-shams-sand/50 transition-all flex items-start justify-between"
                  >
                    <div className="flex items-start gap-2.5">
                      <Compass className="w-4 h-4 text-shams-navy/70 shrink-0 mt-0.5" />
                      <div>
                        <div>{lang === 'en' ? 'Contact, Centers & Collaboration' : 'ارتباط، مراکز تحقیقاتی و همکاری‌های علمی'}</div>
                        <div className="text-[10px] text-shams-navy/50 font-normal mt-0.5">
                          {lang === 'en' ? 'Academic partnerships and clinical inquiries' : 'پاسخگویی به مراجعین و مراکز درمانی همکار'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-shams-navy/40 font-mono self-center">Contact</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </nav>

        {/* Right Section: Flag Language Switcher, Notifications, Search, Cart, Auth */}
        <div className="flex items-center gap-1 sm:gap-1.5 xl:gap-2 flex-nowrap shrink-0">
          
          {/* 1. Flag-Based Language Switcher */}
          <div className="relative shrink-0" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-1.5 sm:px-2 py-1 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
              title="Change Language / تغییر زبان / تغيير اللغة"
            >
              <span className="text-sm sm:text-base leading-none">{currentLanguage.flag}</span>
              <span className="hidden xl:inline-block text-[11px] font-bold">{currentLanguage.native}</span>
              <ChevronDown className={`w-2.5 h-2.5 opacity-70 text-white transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className={`absolute top-full ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-44 bg-white rounded-2xl shadow-xl border border-shams-navy/10 py-1.5 z-50 animate-in fade-in slide-in-from-top-2`}>
                <div className="px-3 py-1 text-[10px] font-bold text-shams-navy/50 uppercase tracking-wider border-b border-shams-sand mb-1">
                  {lang === 'en' ? 'Select Language' : lang === 'ar' ? 'اختر اللغة' : 'انتخاب زبان'}
                </div>
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                      lang === l.code ? 'bg-shams-teal/10 text-shams-teal' : 'text-shams-navy hover:bg-shams-sand'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{l.flag}</span>
                      <span>{l.native}</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono opacity-50">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Notification Bell Icon with Badge & Dropdown */}
          <div className="relative shrink-0" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all relative cursor-pointer"
              title={t('notif.title')}
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-shams-teal text-white text-[9px] font-bold font-numeric w-3.5 h-3.5 rounded-full flex items-center justify-center animate-scale-in">
                  {formatNumber(unreadCount)}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div 
                className={`absolute top-full ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2`}
              >
                {/* Notification Dropdown Header */}
                <div className="p-4 border-b border-shams-sand bg-shams-sand/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-shams-teal" />
                    <span className="font-bold text-xs text-shams-navy">{t('notif.title')}</span>
                    {unreadCount > 0 && (
                      <span className="bg-shams-teal/15 text-shams-teal text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        <span className="font-numeric font-bold">{formatNumber(unreadCount)}</span> {t('notif.unread')}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[11px] font-bold text-shams-teal hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>{t('notif.markAll')}</span>
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-[340px] overflow-y-auto divide-y divide-shams-sand/60">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center space-y-2">
                      <div className="w-10 h-10 bg-shams-sand rounded-full flex items-center justify-center mx-auto text-shams-navy/40">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-shams-navy">{t('notif.empty')}</div>
                      <div className="text-[11px] text-shams-navy/50">{t('notif.emptyDesc')}</div>
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markAsRead(n.id);
                          if (n.link) {
                            navigate(n.link);
                            setIsNotifOpen(false);
                          }
                        }}
                        className={`p-3.5 transition-colors cursor-pointer hover:bg-shams-sand/50 flex items-start gap-3 ${
                          !n.read ? 'bg-shams-teal/5' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-white border border-shams-navy/10 flex items-center justify-center shrink-0 shadow-2xs text-shams-teal">
                          {n.type === 'assessment' && <Activity className="w-4 h-4" />}
                          {n.type === 'plan' && <HeartPulse className="w-4 h-4 text-shams-green-primary" />}
                          {n.type === 'event' && <Calendar className="w-4 h-4 text-shams-navy" />}
                          {n.type === 'research' && <Database className="w-4 h-4 text-shams-gold" />}
                          {n.type === 'promotion' && <Sparkles className="w-4 h-4 text-shams-gold" />}
                          {n.type === 'system' && <ShieldCheck className="w-4 h-4 text-shams-teal" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <div className="text-xs font-bold text-shams-navy truncate">
                              {getNotifTitle(n)}
                            </div>
                            {!n.read && (
                              <span className="w-2 h-2 rounded-full bg-shams-teal shrink-0" />
                            )}
                          </div>
                          <div className="text-[11px] text-shams-navy/60 leading-relaxed mt-0.5 line-clamp-2">
                            {getNotifDesc(n)}
                          </div>
                          <div className="text-[10px] text-shams-navy/40 font-mono mt-1">
                            {getNotifTime(n)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer link to full notification page */}
                <div className="p-2.5 bg-shams-sand/40 border-t border-shams-sand text-center">
                  <Link
                    to="/notifications"
                    onClick={() => setIsNotifOpen(false)}
                    className="text-xs font-bold text-shams-teal hover:underline inline-flex items-center gap-1"
                  >
                    <span>{t('notif.viewAll')}</span>
                    {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 3. Search Button */}
          <Link 
            to="/search" 
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all shrink-0"
            title={t('nav.search')}
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>

          {/* 4. Cart Button */}
          <Link 
            to="/cart" 
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all relative shrink-0"
            title={t('nav.cart')}
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-shams-teal text-white text-[9px] font-bold font-numeric w-3.5 h-3.5 rounded-full flex items-center justify-center animate-scale-in">
                {formatNumber(totalCount)}
              </span>
            )}
          </Link>

          {/* 5. User Account / Login */}
          {isAuthenticated && user ? (
            <div className="relative shrink-0" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-shams-teal/30 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-white/20">
                  <img 
                    src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"} 
                    alt={user.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <ChevronDown className={`w-3 h-3 text-white/70 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className={`absolute top-full ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-shams-navy/10 overflow-hidden py-2 z-50 animate-in fade-in slide-in-from-top-2`}>
                  <div className="px-5 py-3.5 border-b border-shams-sand mb-2 bg-shams-sand/30">
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm shrink-0">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-shams-navy text-xs truncate">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-shams-navy/50 font-mono truncate" dir="ltr">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold bg-white px-3 py-1.5 rounded-xl border border-shams-navy/5">
                      <span className="text-shams-navy/70 flex items-center gap-1.5 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-shams-green-primary animate-pulse" />
                        {t('nav.healthScore')}
                      </span>
                      <span className="text-shams-green-primary font-bold font-numeric text-xs">{formatNumber(user.healthScore || 78)} / {formatNumber(100)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col px-2 space-y-1">
                    <Link to="/services/record" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-shams-navy hover:bg-shams-sand transition-all">
                      <FileText className="w-4 h-4 text-shams-teal" />
                      <span>{t('submenu.healthRecord')}</span>
                    </Link>
                    <Link to="/plan" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-shams-navy hover:bg-shams-sand transition-all">
                      <HeartPulse className="w-4 h-4 text-shams-green-primary" />
                      <span>{t('nav.program')}</span>
                    </Link>
                    <Link to="/dashboard/events" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-shams-navy hover:bg-shams-sand transition-all">
                      <Calendar className="w-4 h-4 text-shams-gold" />
                      <span>{lang === 'en' ? 'My Enrolled Events' : lang === 'ar' ? 'فعالياتي المسجلة' : 'رویدادهای من'}</span>
                    </Link>
                    <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-shams-navy hover:bg-shams-sand transition-all">
                      <Settings className="w-4 h-4 text-shams-navy/60" />
                      <span>{lang === 'en' ? 'Settings' : lang === 'ar' ? 'الإعدادات' : 'تنظیمات'}</span>
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }} 
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-shams-burgundy hover:bg-shams-burgundy/10 transition-all text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-2 sm:px-2.5 py-1 rounded-lg bg-shams-teal hover:bg-shams-teal-light text-white text-xs font-bold flex items-center gap-1 transition-all shadow-xs shrink-0"
            >
              <LogIn className="w-3 h-3 shrink-0" />
              <span className="hidden xl:inline-block">{t('nav.loginOrRegister')}</span>
              <span className="xl:hidden text-[11px]">{lang === 'en' ? 'Login' : lang === 'ar' ? 'دخول' : 'ورود'}</span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-white/90 hover:bg-white/10 transition-all shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-shams-navy/10 bg-white px-4 py-6 max-h-[calc(100vh-80px)] overflow-y-auto space-y-4 animate-in fade-in slide-in-from-top-2">
          
          {/* Mobile Language Switcher Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-shams-sand border border-shams-navy/5">
            <span className="text-xs font-bold text-shams-navy/70 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-shams-teal" />
              {lang === 'en' ? 'Language' : lang === 'ar' ? 'اللغة' : 'زبان سایت'}
            </span>
            <div className="flex gap-1">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    lang === l.code ? 'bg-shams-teal text-white shadow-xs' : 'bg-white text-shams-navy hover:bg-shams-sand'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span className="uppercase font-mono text-[10px]">{l.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 6 Mobile Pillars Accordion */}
          <div className="space-y-2">
            
            {/* 1. PROFESSOR SHAMS */}
            <div className="rounded-2xl border border-shams-sand overflow-hidden">
              <button
                onClick={() => toggleMobileCategory('prof')}
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy bg-shams-sand/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-shams-gold" />
                  <span>{t('nav.profShams')}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['prof'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['prof'] && (
                <div className="p-3 bg-white space-y-2 text-xs font-bold">
                  <Link to="/" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.profOverview')}
                  </Link>
                  <Link to="/about" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.profVision')}
                  </Link>
                  <Link to="/about#faculty" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.profFaculty')}
                  </Link>
                  <Link to="/about#charter" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.profCharter')}
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Shams Health */}
            <div className="rounded-2xl border border-shams-sand overflow-hidden">
              <button
                onClick={() => toggleMobileCategory('health')}
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy bg-shams-sand/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-shams-teal" />
                  <span>{t('nav.shamsHealth')}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['health'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['health'] && (
                <div className="p-3 bg-white space-y-2 text-xs font-bold">
                  <Link to="/knowledge/diseases" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.diseaseLib')}
                  </Link>
                  <Link to="/knowledge/lifestyle" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.lifestylePillars')}
                  </Link>
                  <Link to="/assessment" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.healthAssessment')}
                  </Link>
                  <Link to="/assessment/tools" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.healthTools')}
                  </Link>
                  <Link to="/plan" className="block p-2.5 rounded-xl bg-shams-green-primary text-white font-bold">
                    {t('submenu.healthProgram')}
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Shams Aging */}
            <div className="rounded-2xl border border-shams-sand overflow-hidden">
              <button
                onClick={() => toggleMobileCategory('aging')}
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy bg-shams-sand/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-shams-teal" />
                  <span>{t('nav.shamsAging')}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['aging'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['aging'] && (
                <div className="p-3 bg-white space-y-2 text-xs font-bold">
                  <Link to="/knowledge/age-groups" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.agingGuide')}
                  </Link>
                  <Link to="/assessment/tools" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.agingAssessment')}
                  </Link>
                  <Link to="/shop?need=aging" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.agingStore')}
                  </Link>
                  <Link to="/events" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.agingEvents')}
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Shams Performance */}
            <div className="rounded-2xl border border-shams-sand overflow-hidden">
              <button
                onClick={() => toggleMobileCategory('performance')}
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy bg-shams-sand/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-shams-gold" />
                  <span>{t('nav.shamsPerformance')}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['performance'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['performance'] && (
                <div className="p-3 bg-white space-y-2 text-xs font-bold">
                  <Link to="/knowledge/sports" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.sportsMedicine')}
                  </Link>
                  <Link to="/assessment/tools" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.fitnessAssessment')}
                  </Link>
                  <Link to="/shop?goal=fitness" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.sportsNutrition')}
                  </Link>
                  <Link to="/plan" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.posturePlan')}
                  </Link>
                </div>
              )}
            </div>

            {/* 5. Shams Academy */}
            <div className="rounded-2xl border border-shams-sand overflow-hidden">
              <button
                onClick={() => toggleMobileCategory('academy')}
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy bg-shams-sand/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-shams-teal" />
                  <span>{t('nav.shamsAcademy')}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['academy'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['academy'] && (
                <div className="p-3 bg-white space-y-2 text-xs font-bold">
                  <Link to="/shop?type=digital" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.digitalCourses')}
                  </Link>
                  <Link to="/events" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.eventsWebinars')}
                  </Link>
                  <Link to="/knowledge" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.evidenceLibrary')}
                  </Link>
                </div>
              )}
            </div>

            {/* 6. Shams Research */}
            <div className="rounded-2xl border border-shams-sand overflow-hidden">
              <button
                onClick={() => toggleMobileCategory('research')}
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy bg-shams-sand/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-shams-teal" />
                  <span>{t('nav.shamsResearch')}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['research'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['research'] && (
                <div className="p-3 bg-white space-y-2 text-xs font-bold">
                  <Link to="/services/research" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.researchPanel')}
                  </Link>
                  <Link to="/assessment/registry" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.healthRegistry')}
                  </Link>
                  <Link to="/about" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {t('submenu.academicCollab')}
                  </Link>
                </div>
              )}
            </div>

            {/* 7. Assessment */}
            <div className="rounded-2xl border border-shams-sand overflow-hidden">
              <button
                onClick={() => toggleMobileCategory('assessment')}
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy bg-shams-sand/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-shams-teal" />
                  <span>{lang === 'en' ? 'Assessment' : lang === 'ar' ? 'التقييم الصحي' : 'ارزیابی سلامت'}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['assessment'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['assessment'] && (
                <div className="p-3 bg-white space-y-2 text-xs font-bold">
                  <Link to="/assessment" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'Comprehensive Healthspan Assessment' : 'ارزیابی جامع ریسک بیولوژیک و طول عمر'}
                  </Link>
                  <Link to="/assessment/tools" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'Interactive Clinical Calculators' : 'ماشین‌حساب‌ها و ابزارهای سنجش بالینی'}
                  </Link>
                  <Link to="/assessment/registry" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'National Health Registry Cohort' : 'سامانه ثبت ملی داده‌های سلامت و کوهورت'}
                  </Link>
                </div>
              )}
            </div>

            {/* 8. Health Program (Sage Green) */}
            <div className="rounded-2xl border border-shams-sage/50 overflow-hidden bg-shams-sage/10">
              <Link
                to="/plan"
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy hover:bg-shams-sage hover:text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-shams-sage" />
                  <span>{t('nav.program')}</span>
                </div>
                <span className="text-[10px] font-bold bg-shams-sage text-white px-2 py-0.5 rounded-full">
                  {lang === 'en' ? 'Personalized' : 'برنامه اختصاصی'}
                </span>
              </Link>
            </div>

            {/* 9. Services */}
            <div className="rounded-2xl border border-shams-sand overflow-hidden">
              <button
                onClick={() => toggleMobileCategory('services')}
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy bg-shams-sand/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-shams-teal" />
                  <span>{lang === 'en' ? 'Services' : lang === 'ar' ? 'الخدمات' : 'خدمات بالینی'}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['services'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['services'] && (
                <div className="p-3 bg-white space-y-2 text-xs font-bold">
                  <Link to="/services/record" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'Personal Health Record (PHR)' : 'پرونده الکترونیک سلامت و بیومارکرها'}
                  </Link>
                  <Link to="/services/research" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'Population Research & Analytics Panel' : 'پنل پژوهش‌های جمعیتی و تحلیل کلان‌داده'}
                  </Link>
                  <Link to="/services" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'Specialized Telehealth & Clinic' : 'مشاوره تخصصی آنلاین و کلینیک شمس'}
                  </Link>
                </div>
              )}
            </div>

            {/* 10. Shop / SHAMS LIFE */}
            <div className="rounded-2xl border border-shams-sand overflow-hidden">
              <button
                onClick={() => toggleMobileCategory('shop')}
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy bg-shams-sand/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-shams-gold" />
                  <span>{lang === 'en' ? 'Shop / SHAMS LIFE' : lang === 'ar' ? 'متجر شمس لايف' : 'فروشگاه شمس لایف'}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['shop'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['shop'] && (
                <div className="p-3 bg-white space-y-2 text-xs font-bold">
                  <Link to="/shop" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'All Products & Store Home' : 'صفحه اصلی فروشگاه و همه محصولات'}
                  </Link>
                  <Link to="/shop?category=supplements" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'Targeted Clinical Supplements' : 'مکمل‌های تخصصی بالینی'}
                  </Link>
                  <Link to="/shop?tab=packs" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'Integrated Health Packs' : 'پک‌های یکپارچه بهبود سلامت'}
                  </Link>
                  <Link to="/shop?type=digital" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'Digital Audio & Video Programs' : 'دوره‌های دیجیتال و برنامه‌های صوتی'}
                  </Link>
                </div>
              )}
            </div>

            {/* 8. About SHAMS */}
            <div className="rounded-2xl border border-shams-sand overflow-hidden">
              <button
                onClick={() => toggleMobileCategory('about')}
                className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-shams-navy bg-shams-sand/40 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-shams-teal" />
                  <span>{lang === 'en' ? 'About SHAMS' : lang === 'ar' ? 'عن شمس' : 'درباره شمس'}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['about'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['about'] && (
                <div className="p-3 bg-white space-y-2 text-xs font-bold">
                  <Link to="/about" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'About Professor Shams & Scientific Board' : 'آشنایی با پروفسور شمس و هیئت علمی'}
                  </Link>
                  <Link to="/about#charter" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'Evidence-Based Ethics Charter' : 'منشور اخلاقی و استانداردهای پژوهشی'}
                  </Link>
                  <Link to="/about#contact" className="block p-2 rounded-xl text-shams-navy hover:bg-shams-sand">
                    {lang === 'en' ? 'Contact & Collaboration' : 'ارتباط، مراکز تحقیقاتی و همکاری‌های علمی'}
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Direct Links (Cart, Notifications, Account) */}
          <div className="pt-2 border-t border-shams-sand space-y-2">
            <Link
              to="/notifications"
              className="flex items-center justify-between p-3 rounded-2xl bg-shams-sand/50 text-xs font-bold text-shams-navy"
            >
              <span className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-shams-teal" />
                {t('notif.title')}
              </span>
              {unreadCount > 0 && (
                <span className="bg-shams-teal text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {formatNumber(unreadCount)}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="flex items-center justify-between p-3 rounded-2xl bg-shams-sand/50 text-xs font-bold text-shams-navy"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-shams-teal" />
                {t('nav.cart')}
              </span>
              {totalCount > 0 && (
                <span className="bg-shams-teal text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {formatNumber(totalCount)}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link
                to="/services/record"
                className="flex items-center justify-between p-3 rounded-2xl bg-shams-sand/50 text-xs font-bold text-shams-navy"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-shams-teal" />
                  {t('submenu.healthRecord')}
                </span>
                <span className="text-[10px] text-shams-green-primary font-bold font-numeric">
                  {formatNumber(user?.healthScore || 78)}/100
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-shams-navy text-white text-xs font-bold text-center"
              >
                <LogIn className="w-4 h-4" />
                <span>{t('nav.loginOrRegister')}</span>
              </Link>
            )}
          </div>

        </div>
      )}
    </header>
  );
}
