import React, { useState, useEffect } from 'react';
import { 
  Activity, HeartPulse, Scale, Moon, Calendar, FileText, 
  ChevronLeft, ArrowUpRight, ShieldCheck, Download, CheckCircle2, 
  Clock, AlertCircle, Sparkles, User, Info, ArrowLeft, TrendingUp,
  Brain, Utensils, Zap, RefreshCw, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  BarChart, Bar, Cell
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { PrintableHealthRecordPDF } from './PrintableHealthRecordPDF';
import { generateHealthPdf } from '../utils/generateHealthPdf';

// Mock Data
const healthDimensionsData = [
  { name: 'فعالیت بدنی', score: 82, fullMark: 100, status: 'عالی', color: '#0EA5E9' },
  { name: 'کیفیت خواب', score: 74, fullMark: 100, status: 'مطلوب', color: '#0F888D' },
  { name: 'تغذیه', score: 68, fullMark: 100, status: 'نیازمند بهبود', color: '#D4AF37' },
  { name: 'سلامت روان', score: 78, fullMark: 100, status: 'خوب', color: '#7B3F7F' },
  { name: 'سلامت متابولیک', score: 86, fullMark: 100, status: 'ایده‌آل', color: '#A43E56' },
  { name: 'تحرک و انعطاف', score: 80, fullMark: 100, status: 'عالی', color: '#2A7B4D' },
  { name: 'سبک زندگی', score: 85, fullMark: 100, status: 'پایدار', color: '#0A2540' },
];

const healthTrendData = [
  { month: 'فروردین', score: 68, sleep: 6.5, activity: 6200 },
  { month: 'اردیبهشت', score: 72, sleep: 6.8, activity: 7100 },
  { month: 'خرداد', score: 75, sleep: 7.0, activity: 7500 },
  { month: 'تیر', score: 79, sleep: 7.2, activity: 8000 },
  { month: 'مرداد', score: 81, sleep: 7.4, activity: 8200 },
  { month: 'شهریور', score: 84, sleep: 7.6, activity: 8450 },
];

const kpiCardsData = [
  {
    id: 'score',
    title: 'امتیاز کلی سلامت',
    value: '۸۴',
    unit: 'از ۱۰۰',
    trend: '+۶٪ بهبود',
    isPositive: true,
    status: 'سطح عالی',
    icon: Sparkles,
    color: '#0F888D',
    bg: 'bg-[#0F888D]/10',
    sparkline: [68, 72, 75, 79, 81, 84]
  },
  {
    id: 'sleep',
    title: 'کیفیت و مدت خواب',
    value: '۷.۶',
    unit: 'ساعت/شب',
    trend: '+۸٪ بهبود',
    isPositive: true,
    status: 'ریتم مطلوب',
    icon: Moon,
    color: '#0EA5E9',
    bg: 'bg-[#0EA5E9]/10',
    sparkline: [6.5, 6.8, 7.0, 7.2, 7.4, 7.6]
  },
  {
    id: 'activity',
    title: 'فعالیت روزانه',
    value: '۸,۴۵۰',
    unit: 'گام/روز',
    trend: '+۱۲٪ بهبود',
    isPositive: true,
    status: 'فعال',
    icon: Activity,
    color: '#2A7B4D',
    bg: 'bg-[#2A7B4D]/10',
    sparkline: [6200, 7100, 7500, 8000, 8200, 8450]
  },
  {
    id: 'bmi',
    title: 'شاخص توده بدنی (BMI)',
    value: '۲۳.۸',
    unit: 'kg/m²',
    trend: '-۱.۲ پایداری',
    isPositive: true,
    status: 'محدوده نرمال',
    icon: Scale,
    color: '#D4AF37',
    bg: 'bg-[#D4AF37]/15',
    sparkline: [26.0, 25.4, 24.8, 24.4, 24.0, 23.8]
  },
  {
    id: 'metabolic',
    title: 'ریسک متابولیک',
    value: '۱۲٪',
    unit: 'احتمال خطرسنجی',
    trend: '-۳٪ کاهش ریسک',
    isPositive: true,
    status: 'کم‌خطر',
    icon: HeartPulse,
    color: '#A43E56',
    bg: 'bg-[#A43E56]/10',
    sparkline: [20, 18, 16, 15, 13, 12]
  },
  {
    id: 'stress',
    title: 'مدیریت استرس',
    value: '۲۸٪',
    unit: 'سطح تنش',
    trend: '-۱۵٪ کاهش استرس',
    isPositive: true,
    status: 'آرامش مطلوب',
    icon: Brain,
    color: '#7B3F7F',
    bg: 'bg-[#7B3F7F]/10',
    sparkline: [48, 42, 38, 35, 30, 28]
  },
  {
    id: 'fitness',
    title: 'آمادگی جسمانی',
    value: '۸۲',
    unit: 'از ۱۰۰',
    trend: '+۶٪ بهبود',
    isPositive: true,
    status: 'ایده‌آل',
    icon: Zap,
    color: '#0F888D',
    bg: 'bg-[#0F888D]/10',
    sparkline: [70, 72, 75, 78, 80, 82]
  },
  {
    id: 'nutrition',
    title: 'تغذیه و هیدراتاسیون',
    value: '۸۵',
    unit: 'از ۱۰۰',
    trend: '+۴٪ بهبود',
    isPositive: true,
    status: 'متوازن',
    icon: Utensils,
    color: '#D4AF37',
    bg: 'bg-[#D4AF37]/15',
    sparkline: [72, 75, 78, 80, 82, 85]
  }
];

const insightsData = [
  {
    id: 1,
    title: 'روند صعودی در فعالیت منظم بدنی',
    desc: 'میانگین گام‌های روزانه شما با افزایش ۱۲ درصدی به ۸,۴۵۰ گام رسیده است که تأثیر مستقیمی بر بهبود حساسیت انسولینی و پایش قند خون داشته است.',
    priority: 'روند مثبت',
    priorityClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: Activity,
    actionText: 'مشاهده برنامه حرکتی',
    link: '/sports'
  },
  {
    id: 2,
    title: 'فرصت بهینه‌سازی ثبات ساعت خواب',
    desc: 'با وجود میانگین ۷.۶ ساعت خواب در شب، نوسان ساعت بیداری در آخر هفته‌ها می‌تواند کیفیت خواب عمیق (SWS) را ارتقا دهد.',
    priority: 'پیشنهاد بهینه‌سازی',
    priorityClass: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    icon: Moon,
    actionText: 'راهنمای ریتم شبانه‌روزی',
    link: '/lifestyle'
  },
  {
    id: 3,
    title: 'وضعیت ایده‌آل شاخص‌های متابولیک و فشار خون',
    desc: 'میزان فشار خون متوسط ۱۱۸/۷۸ و شاخص‌های لیپیدی در بازه کاملاً محافظتی قرار دارند که نشان‌دهنده اثربخشی الگوی تغذیه‌ای شمس است.',
    priority: 'وضعیت عالی',
    priorityClass: 'bg-teal-500/10 text-teal-600 border-teal-500/20',
    icon: ShieldCheck,
    actionText: 'مشاهده چک‌آپ کامل',
    link: '/services/record'
  }
];

const timelineData = [
  {
    date: '۱۸ شهریور ۱۴۰۳',
    title: 'ثبت ارزیابی جامع ریسک متابولیک و قلبی',
    desc: 'ارزیابی دوره شش‌ماهه با موفقیت انجام شد. کسب امتیاز کلی ۸۴ (+۴ ارتقا نسبت به ارزیابی قبلی).',
    badge: 'ارزیابی جدید',
    color: 'bg-[#0F888D]'
  },
  {
    date: '۱۰ شهریور ۱۴۰۳',
    title: 'تکمیل دوره آموزشی «مدیریت ریتم شبانه‌روزی و خواب»',
    desc: 'تکمیل ماژول آموزشی اختصاصی و دریافت نشان پایبندی به برنامه شمس.',
    badge: 'دوره آموزشی',
    color: 'bg-[#0EA5E9]'
  },
  {
    date: '۲۵ مرداد ۱۴۰۳',
    title: 'ثبت نتایج آزمایشگاهی سه‌ماهه (پروفایل لیپیدی)',
    desc: 'شاخص‌های التهابی (hs-CRP) و چربی خون در محدوده مرجع بالینی ثبت شدند.',
    badge: 'چک‌آپ آزمایشگاه',
    color: 'bg-[#D4AF37]'
  },
  {
    date: '۱ مرداد ۱۴۰۳',
    title: 'آغاز برنامه تمرینات اصلاحی و حرکت‌درمانی',
    desc: 'شروع پروتکل اختصاصی برای تقویت عضلات عمقی ستون فقرات و اصلاح وضعیت نشستن.',
    badge: 'برنامه سلامتی',
    color: 'bg-[#2A7B4D]'
  },
  {
    date: '۱۵ فروردین ۱۴۰۳',
    title: 'ارزیابی پایه اولیه در سامانه شمس',
    desc: 'ثبت اولین پرونده سلامت با امتیاز اولیه ۶۸ و تدوین مسار اختصاصی پایش.',
    badge: 'ارزیابی اولیه',
    color: 'bg-[#A43E56]'
  }
];

const assessmentHistoryData = [
  { id: '1', name: 'ارزیابی جامع ریسک متابولیک و قلبی', date: '۱۸ شهریور ۱۴۰۳', score: 84, status: 'کم‌خطر (مطلوب)', progress: 84 },
  { id: '2', name: 'شاخص سنجش کیفیت خواب (PSQI)', date: '۱۰ شهریور ۱۴۰۳', score: 76, status: 'کیفیت مطلوب', progress: 76 },
  { id: '3', name: 'تست تحرک عملکردی و تقارن حرکتی', date: '۲۵ مرداد ۱۴۰۳', score: 80, status: 'تقارن خوب', progress: 80 },
  { id: '4', name: 'غربالگری دیجیتال ریسک دیابت نوع ۲', date: '۱۵ تیر ۱۴۰۳', score: 92, status: 'خطر بسیار پایین', progress: 92 },
];

export function NeonHealthAnalytics() {
  const { formatNumber } = useLanguage();
  const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [animatedScore, setAnimatedScore] = useState(0);
  const [activeDimension, setActiveDimension] = useState(healthDimensionsData[0]);

  useEffect(() => {
    // Smooth score animation count-up
    let current = 0;
    const target = 84;
    const timer = setInterval(() => {
      current += 2;
      if (current >= target) {
        setAnimatedScore(target);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, 25);
    return () => clearInterval(timer);
  }, []);

  const handleDownloadPdf = async () => {
    setDownloadState('loading');
    try {
      await new Promise(r => setTimeout(r, 600)); // allow DOM render
      await generateHealthPdf('shams-printable-pdf', 'SHAMS_Health_Record.pdf');
      setDownloadState('success');
      setTimeout(() => setDownloadState('idle'), 4000);
    } catch (err) {
      console.error('PDF Generation Failed', err);
      setDownloadState('error');
    }
  };

  return (
    <div className="w-full space-y-10 text-shams-navy dir-rtl font-sans" dir="rtl">
      
      {/* Download Status Toast / Modal */}
      {downloadState === 'loading' && (
        <div className="fixed inset-0 bg-shams-navy/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-shams-teal/20 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-shams-teal/10 text-shams-teal mx-auto flex items-center justify-center animate-spin">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-shams-navy">در حال آماده‌سازی پرونده سلامت...</h3>
            <p className="text-xs text-shams-navy/60 leading-relaxed">
              پردازش نمودارها، بیومارکه‌ها و استخراج فایل رسمی PDF با فرمت بالینی...
            </p>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-shams-teal h-full rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      )}

      {downloadState === 'success' && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="bg-[#0A2540] text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-shams-teal/40">
            <CheckCircle2 className="w-5 h-5 text-shams-teal" />
            <span>پرونده سلامت شما با موفقیت دانلود شد.</span>
          </div>
        </div>
      )}

      {downloadState === 'error' && (
        <div className="fixed inset-0 bg-shams-navy/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-rose-200 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">در تهیه پرونده سلامت مشکلی پیش آمد.</h3>
            <p className="text-xs text-slate-500">
              لطفاً مجدداً تلاش کنید یا اتصال اینترنت خود را بررسی نمایید.
            </p>
            <div className="flex gap-2 pt-2">
              <button 
                onClick={handleDownloadPdf}
                className="flex-1 bg-shams-teal text-white py-2.5 rounded-xl text-xs font-bold hover:bg-shams-navy transition-all"
              >
                تلاش مجدد
              </button>
              <button 
                onClick={() => setDownloadState('idle')}
                className="px-4 bg-slate-100 text-slate-600 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-200"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Control Bar & PDF Download Trigger */}
      <div className="bg-white rounded-3xl p-5 md:p-6 border border-shams-navy/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-shams-teal animate-pulse" />
            <h2 className="text-lg font-bold text-shams-navy">پایش هوشمند بیومارکرها و تحلیل سلامت شمس</h2>
          </div>
          <p className="text-xs text-shams-navy/60">
            آخرین به‌روزشده: <span className="font-bold text-shams-navy">۱۸ شهریور ۱۴۰۳</span> · کد پرونده: <span className="font-mono font-bold text-shams-teal">SHAMS-90214</span>
          </p>
        </div>

        <button
          onClick={handleDownloadPdf}
          disabled={downloadState === 'loading'}
          className="bg-shams-navy hover:bg-shams-teal text-white px-6 py-3 rounded-2xl font-bold text-xs transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer neon-glow-teal group"
        >
          <Download className="w-4 h-4 text-shams-teal group-hover:text-white transition-colors" />
          <span>دانلود پرونده سلامت (PDF)</span>
        </button>
      </div>

      {/* 1. PREMIUM HEALTH OVERVIEW */}
      <section className="bg-gradient-to-br from-white via-white to-shams-teal/5 rounded-[2.5rem] p-8 md:p-10 border border-shams-teal/20 shadow-xs relative overflow-hidden">
        {/* Subtle Neon Radial Accents */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0F888D]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Radial Progress Ring & Score */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                {/* Track */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Animated Neon Progress */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#neonTealGradient)"
                  strokeWidth="9"
                  strokeDasharray={314}
                  strokeDashoffset={314 - (314 * animatedScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out neon-glow-teal"
                />
                <defs>
                  <linearGradient id="neonTealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#0F888D" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-shams-navy tracking-tight font-numeric">
                  {formatNumber(animatedScore)}
                </span>
                <span className="text-xs font-semibold text-shams-navy/60 mt-1">از {formatNumber(100)}</span>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 bg-[#0F888D]/10 border border-[#0F888D]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-shams-teal">
              <span className="w-2 h-2 rounded-full bg-shams-teal animate-ping" />
              <span>ریسک متابولیک: کم‌خطر</span>
            </div>
          </div>

          {/* Executive Summary & Details */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-shams-navy text-white px-3 py-1 rounded-lg text-xs font-bold">
                ارزیابی جامع شمس
              </span>
              <span className="bg-[#0F888D]/10 text-shams-teal px-3 py-1 rounded-lg text-xs font-bold border border-[#0F888D]/20 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+{formatNumber(6)}٪ بهبود نسبت به ۳ ماه قبل</span>
              </span>
            </div>

            <h3 className="text-2xl font-bold text-shams-navy">
              تحلیل عملکرد بیومارکرها و وضعیت پایش فردی
            </h3>

            <p className="text-sm text-shams-navy/80 leading-relaxed font-medium">
              بر اساس داده‌های ارزیابی ۱۸ شهریور ۱۴۰۳، شاخص‌های حیاتی و متابولیک شما در بازه کاملاً بهینه قرار دارد. میزان پایبندی به برنامه تغذیه و تحرک بدنی منجر به ارتقای ۶ درصدی امتیاز سلامت و ثبات کیفیت خواب شده است.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-shams-navy/10 text-xs">
              <div>
                <span className="text-shams-navy/50 block mb-0.5">تاریخ ارزیابی:</span>
                <strong className="text-shams-navy font-bold">۱۸ شهریور ۱۴۰۳</strong>
              </div>
              <div>
                <span className="text-shams-navy/50 block mb-0.5">تعداد ارزیابی‌ها:</span>
                <strong className="text-shams-navy font-bold">{formatNumber(12)} آزمون تکمیل‌شده</strong>
              </div>
              <div>
                <span className="text-shams-navy/50 block mb-0.5">پزشک ناظر:</span>
                <strong className="text-shams-teal font-bold">دکتر کاوه مهران</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2 & 6. 8 PREMIUM KPI METRICS CARDS (Swipeable on Mobile) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
            <Activity className="w-5 h-5 text-shams-teal" />
            شاخص‌های کلیدی عملکرد و بیومارکرها (KPIs)
          </h3>
          <span className="text-xs text-shams-navy/50">برای دیدن سایر شاخص‌ها در موبایل پیمایش کنید</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto pb-2">
          {kpiCardsData.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div 
                key={kpi.id} 
                className="bg-white rounded-3xl p-5 border border-shams-navy/10 shadow-xs hover:shadow-md transition-all group hover:-translate-y-0.5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-shams-navy/60">{kpi.title}</span>
                  <div className={`w-9 h-9 rounded-2xl ${kpi.bg} flex items-center justify-center`} style={{ color: kpi.color }}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-2xl font-black text-shams-navy mb-1 flex items-baseline gap-1 font-numeric">
                  {formatNumber(kpi.value)}
                  <span className="text-xs font-semibold text-shams-navy/50">{kpi.unit}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                  <span className="font-bold text-shams-teal flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {kpi.trend}
                  </span>
                  <span className="text-shams-navy/50 font-medium">{kpi.status}</span>
                </div>

                {/* Mini SVG Sparkline */}
                <div className="mt-3 h-8 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                    <path
                      d={`M 0 ${30 - kpi.sparkline[0]} L 20 ${30 - kpi.sparkline[1]} L 40 ${30 - kpi.sparkline[2]} L 60 ${30 - kpi.sparkline[3]} L 80 ${30 - kpi.sparkline[4]} L 100 ${30 - kpi.sparkline[5]}`}
                      fill="none"
                      stroke={kpi.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy={30 - kpi.sparkline[5]} r="3.5" fill={kpi.color} className="animate-pulse" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. HEALTH DIMENSIONS RADAR CHART & 5. HEALTH TREND */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Radar Chart Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-shams-navy/10 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-shams-navy">تحلیل ابعاد هفت‌گانه سلامت</h3>
              <p className="text-xs text-shams-navy/50 mt-0.5">پروفایل عنکبوتی توازن زیستی شمس</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-shams-teal/10 text-shams-teal text-xs font-bold">
              توازن مطلوب
            </span>
          </div>

          <div className="h-[280px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={healthDimensionsData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#0A2540', fontSize: 11, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#CBD5E1" />
                <Radar 
                  name="امتیاز سلامت" 
                  dataKey="score" 
                  stroke="#0F888D" 
                  fill="#0F888D" 
                  fillOpacity={0.25} 
                  strokeWidth={2.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-medium">
              <strong className="block text-emerald-950 font-bold mb-0.5">قوی‌ترین حوزه:</strong>
              سلامت متابولیک (۸۶٪)
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 font-medium">
              <strong className="block text-amber-950 font-bold mb-0.5">نیازمند توجه:</strong>
              تغذیه و هیدراتاسیون (۶۸٪)
            </div>
          </div>
        </div>

        {/* 5. Health Trend Longitudinal Line/Area Chart */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-shams-navy/10 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-shams-navy">روند تغییرات امتیاز سلامت (۶ ماهه)</h3>
              <p className="text-xs text-shams-navy/50 mt-0.5">تغییرات طولی از فروردین تا شهریور ۱۴۰۳</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-shams-teal font-numeric">+{formatNumber(16)} نقطه</div>
              <div className="text-[10px] text-shams-navy/50">رشد طولی</div>
            </div>
          </div>

          <div className="h-[280px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthTrendData}>
                <defs>
                  <linearGradient id="colorScoreArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#0A2540', fontSize: 12, fontWeight: 600 }} />
                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fill: '#0A2540', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid #0EA5E9', background: '#fff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                  formatter={(val: any) => [`${formatNumber(val)} امتیاز`, 'امتیاز سلامت']}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#0EA5E9" 
                  strokeWidth={3.5} 
                  fillOpacity={1} 
                  fill="url(#colorScoreArea)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-shams-navy/70 pt-2 border-t border-slate-100">
            <span>امتیاز اولیه: <strong>۶۸</strong> (فروردین)</span>
            <span>امتیاز فعلی: <strong className="text-shams-teal">۸۴</strong> (شهریور)</span>
            <span>پیشرفت: <strong className="text-emerald-600">+۲۳.۵٪</strong></span>
          </div>
        </div>

      </section>

      {/* 7. PERSONALIZED INSIGHTS («بینش‌های سلامت شما») */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-shams-navy/10 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-shams-gold" />
            بینش‌های هوشمند و تحلیل‌های اختصاصی سلامت شما
          </h3>
          <span className="text-xs text-shams-navy/50">تولیدشده توسط موتور تحلیل الگوریتم شمس</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insightsData.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-shams-teal/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-shams-teal flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${item.priorityClass}`}>
                      {item.priority}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-shams-navy group-hover:text-shams-teal transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-xs text-shams-navy/70 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <Link 
                  to={item.link} 
                  className="text-xs font-bold text-shams-teal hover:text-shams-navy flex items-center gap-1.5 pt-3 border-t border-slate-200/80"
                >
                  <span>{item.actionText}</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. HEALTH TIMELINE */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-shams-navy/10 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
          <Clock className="w-5 h-5 text-shams-teal" />
          خط زمانی رویدادها و دستاوردهای سلامت (Health Timeline)
        </h3>

        <div className="relative pr-6 border-r-2 border-shams-teal/20 space-y-8 mr-2">
          {timelineData.map((item, idx) => (
            <div key={idx} className="relative pr-6 group">
              {/* Timeline Dot */}
              <span className={`absolute -right-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white ${item.color} shadow-xs group-hover:scale-125 transition-transform`} />

              <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-shams-navy">{item.title}</span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-shams-navy/70 font-mono">
                    {item.date}
                  </span>
                </div>
                <p className="text-xs text-shams-navy/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. ASSESSMENT HISTORY */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-shams-navy/10 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
            <FileText className="w-5 h-5 text-shams-teal" />
            تاریخچه ارزیابی‌های بالینی ثبت‌شده
          </h3>
          <Link to="/assessment" className="text-xs font-bold text-shams-teal hover:underline">
            انجام ارزیابی جدید +
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {assessmentHistoryData.map((item) => (
            <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 p-2 rounded-2xl transition-colors">
              <div className="space-y-1">
                <div className="font-bold text-xs text-shams-navy">{item.name}</div>
                <div className="text-[11px] text-shams-navy/50">تاریخ ثبت: {item.date}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-left">
                  <div className="text-xs font-bold text-shams-teal font-numeric">{formatNumber(item.score)} از ۱۰۰</div>
                  <div className="text-[10px] text-shams-navy/60">{item.status}</div>
                </div>

                <Link 
                  to={`/assessment/result/${item.id}`}
                  className="px-4 py-2 rounded-xl bg-shams-navy text-white text-xs font-bold hover:bg-shams-teal transition-all flex items-center gap-1"
                >
                  <span>مشاهده نتیجه</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offscreen Printable Container for PDF Engine */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none opacity-0 select-none z-[-9999]">
        <PrintableHealthRecordPDF 
          score={84}
          userName="علی رضایی"
          userCode="SHAMS-90214"
          reportDate="۱۸ شهریور ۱۴۰۳"
          riskLevel="کم‌خطر متابولیک"
          dimensions={healthDimensionsData}
          kpis={kpiCardsData.map(k => ({ label: k.title, value: k.value, trend: k.trend, status: k.status }))}
          insights={insightsData}
          history={assessmentHistoryData}
        />
      </div>

    </div>
  );
}
