import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Activity, CheckCircle2, Scale, HeartPulse, Brain, Moon, ShieldCheck, Database, Wrench, Sparkles, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';

interface AssessmentItem {
  id: string;
  titleFa: string;
  titleEn: string;
  titleAr: string;
  descFa: string;
  descEn: string;
  descAr: string;
  timeFa: string;
  timeEn: string;
  timeAr: string;
  progress: number;
  category: 'sleep' | 'metabolic' | 'mental' | 'mobility';
  color: 'teal' | 'mauve' | 'burgundy' | 'gold';
  icon: React.ReactNode;
}

export function Assessment() {
  const { lang, t, formatNumber, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const assessmentsList: AssessmentItem[] = [
    {
      id: 'sleep',
      titleFa: 'تحلیل خواب و ریکاوری زیستی',
      titleEn: 'Sleep & Bio-Recovery Analysis',
      titleAr: 'تحليل النوم والاستشفاء الحيوي',
      descFa: 'ارزیابی الگوهای خواب، اختلالات احتمالی و تاثیر آن بر بازسازی سلولی.',
      descEn: 'Evaluate sleep architecture, circadian disruptions, and cellular recovery.',
      descAr: 'تقييم أنماط النوم والاضطرابات وتأثيرها على التجدد الخلوي.',
      timeFa: '۴ دقیقه',
      timeEn: '4 mins',
      timeAr: '٤ دقائق',
      progress: 100,
      category: 'sleep',
      color: 'teal',
      icon: <Moon className="w-4.5 h-4.5 text-shams-teal" />,
    },
    {
      id: 'bmi',
      titleFa: 'محاسبه BMI و ترکیب توده بدنی',
      titleEn: 'BMI & Body Composition',
      titleAr: 'حاسبة كتلة الجسم وتوزيع الدهون',
      descFa: 'بررسی شاخص توده بدنی، نسبت دور کمر به باسن و سوخت‌وساز پایه.',
      descEn: 'Calculate BMI, waist-to-hip ratio, and baseline metabolic metrics.',
      descAr: 'حساب مؤشر كتلة الجسم ونسبة الخصر إلى الورك والأيض الأساسي.',
      timeFa: '۲ دقیقه',
      timeEn: '2 mins',
      timeAr: 'دقيقتان',
      progress: 0,
      category: 'metabolic',
      color: 'teal',
      icon: <Scale className="w-4.5 h-4.5 text-shams-teal" />,
    },
    {
      id: 'mental-health',
      titleFa: 'سلامت روان و مدیریت استرس (DASS-21)',
      titleEn: 'Mental Wellbeing & Stress (DASS-21)',
      titleAr: 'الرفاه النفسي وإدارة التوتر',
      descFa: 'بررسی سطح استرس روزمره، کیفیت خلق‌وخو و نشانه‌های فرسودگی روانی.',
      descEn: 'Assess daily stress, mood balance, and emotional resilience scales.',
      descAr: 'تقييم مستويات التوتر، المزاج، وعلامات الإجهاد النفسي.',
      timeFa: '۵ دقیقه',
      timeEn: '5 mins',
      timeAr: '٥ دقائق',
      progress: 0,
      category: 'mental',
      color: 'mauve',
      icon: <Brain className="w-4.5 h-4.5 text-shams-mauve" />,
    },
    {
      id: 'diabetes',
      titleFa: 'خطر دیابت نوع ۲ (FINDRISC)',
      titleEn: 'Type 2 Diabetes Risk (FINDRISC)',
      titleAr: 'مخاطر السكري من النوع الثاني',
      descFa: 'سنجش فاکتورهای سبک زندگی و فیزیولوژیک برای پیش‌بینی دیابت.',
      descEn: 'Evaluate 10-year type 2 diabetes risk based on standardized clinical factors.',
      descAr: 'قياس عوامل خطر الاصابة بالسكري بناءً على معايير سريرية.',
      timeFa: '۵ دقیقه',
      timeEn: '5 mins',
      timeAr: '٥ دقائق',
      progress: 0,
      category: 'metabolic',
      color: 'burgundy',
      icon: <HeartPulse className="w-4.5 h-4.5 text-shams-burgundy" />,
    },
    {
      id: 'metabolic',
      titleFa: 'سندرم متابولیک و ریسک قلبی',
      titleEn: 'Metabolic Syndrome & Cardiac Risk',
      titleAr: 'المتلازمة الأيضية ومخاطر القلب',
      descFa: 'سنجش ۵ فاکتور کلیدی فشار خون، قند، تری‌گلیسرید، HDL و چاقی.',
      descEn: 'Screen 5 clinical pillars of metabolic syndrome and vascular risk.',
      descAr: 'فحص ٥ عوامل رئيسية لمتلازمة الأيض ومخاطر الأوعية الدموية.',
      timeFa: '۴ دقیقه',
      timeEn: '4 mins',
      timeAr: '٤ دقائق',
      progress: 0,
      category: 'metabolic',
      color: 'gold',
      icon: <ShieldCheck className="w-4.5 h-4.5 text-shams-gold" />,
    },
    {
      id: 'mobility',
      titleFa: 'آمادگی حرکتی و عملکرد اسکلتی',
      titleEn: 'Functional Mobility & Movement',
      titleAr: 'الحركة الوظيفية واللياقة البدنية',
      descFa: 'ارزیابی دامنه حرکتی مفاصل، تعادل ایستا و پایداری ستون فقرات.',
      descEn: 'Assess joint range of motion, static balance, and movement stability.',
      descAr: 'تقييم مدى حركة المفاصل، التوازن، واستقرار العمود الفقري.',
      timeFa: '۳ دقیقه',
      timeEn: '3 mins',
      timeAr: '٣ دقائق',
      progress: 0,
      category: 'mobility',
      color: 'teal',
      icon: <Activity className="w-4.5 h-4.5 text-shams-teal" />,
    },
  ];

  const categories = [
    { id: 'all', labelFa: 'همه ارزیابی‌ها (۶)', labelEn: 'All Assessments (6)', labelAr: 'جميع التقييمات (٦)' },
    { id: 'metabolic', labelFa: 'متابولیک و قلبی', labelEn: 'Metabolic & Cardiac', labelAr: 'الأيض والقلب' },
    { id: 'sleep', labelFa: 'خواب و ریکاوری', labelEn: 'Sleep & Recovery', labelAr: 'النوم والاستشفاء' },
    { id: 'mental', labelFa: 'سلامت روان', labelEn: 'Mental Health', labelAr: 'الصحة النفسية' },
    { id: 'mobility', labelFa: 'عملکرد حرکتی', labelEn: 'Mobility & Sports', labelAr: 'الحركة والأداء' },
  ];

  const filteredAssessments = activeCategory === 'all'
    ? assessmentsList
    : assessmentsList.filter(item => item.category === activeCategory);

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Editorial Page Hero */}
      <PageHero
        heroId="assessment"
        layoutVariant="asymmetric"
        themeAccent="teal"
      >
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Link 
            to="/assessment/tools" 
            className="bg-shams-teal text-white hover:bg-shams-teal/90 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Clinical Calculators' : 'ماشین‌حساب‌ها و ابزارهای بالینی'}</span>
          </Link>
          <Link 
            to="/404" 
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            <Database className="w-3.5 h-3.5 text-shams-gold" />
            <span>{lang === 'en' ? 'Health Registry Portal' : 'سامانه ثبت رجیستری سلامت'}</span>
          </Link>
        </div>
      </PageHero>

      {/* Main Compact Assessment Grid Container */}
      <section className="container mx-auto px-4 max-w-6xl -mt-6 relative z-20">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-shams-navy/10 shadow-sm mb-6 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-shams-teal" />
            <span className="text-xs font-bold text-shams-navy hidden sm:inline">
              {lang === 'en' ? 'Filter:' : 'دسته ارزیابی:'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
            {categories.map((cat) => {
              const label = lang === 'en' ? cat.labelEn : lang === 'ar' ? cat.labelAr : cat.labelFa;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-shams-navy text-white shadow-xs'
                      : 'bg-shams-sand text-shams-navy/70 hover:bg-shams-navy/10 hover:text-shams-navy'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact 3-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredAssessments.map((item) => (
            <CompactAssessmentCard 
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function CompactAssessmentCard({ item }: { item: AssessmentItem; key?: string }) {
  const { lang, isRTL } = useLanguage();
  const isCompleted = item.progress === 100;

  const title = lang === 'en' ? item.titleEn : lang === 'ar' ? item.titleAr : item.titleFa;
  const description = lang === 'en' ? item.descEn : lang === 'ar' ? item.descAr : item.descFa;
  const time = lang === 'en' ? item.timeEn : lang === 'ar' ? item.timeAr : item.timeFa;
  
  const borderStyles = {
    teal: 'hover:border-shams-teal shadow-shams-teal/5',
    mauve: 'hover:border-shams-mauve shadow-shams-mauve/5',
    burgundy: 'hover:border-shams-burgundy shadow-shams-burgundy/5',
    gold: 'hover:border-shams-gold shadow-shams-gold/5',
  }[item.color];

  return (
    <div className={`bg-white rounded-2xl p-4 sm:p-5 border border-shams-navy/10 shadow-sm hover:shadow-lg flex flex-col justify-between transition-all duration-300 group ${borderStyles}`}>
      <div>
        {/* Card Header: Icon, Title & Badge */}
        <div className="flex items-start justify-between gap-2.5 mb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-shams-sand flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-shams-navy leading-snug group-hover:text-shams-teal transition-colors line-clamp-1">
              {title}
            </h3>
          </div>
          {isCompleted && (
            <span className="shrink-0 inline-flex items-center gap-1 bg-shams-teal/10 text-shams-teal border border-shams-teal/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
              <CheckCircle2 className="w-3 h-3 text-shams-teal" />
              <span>{lang === 'en' ? 'Done' : 'تکمیل'}</span>
            </span>
          )}
        </div>
        
        {/* Compact Description with 2-line clamp */}
        <p className="text-shams-navy/70 text-[11px] sm:text-xs leading-relaxed line-clamp-2 min-h-[34px] mb-3">
          {description}
        </p>
      </div>

      {/* Footer: Metadata & Compact Action Button */}
      <div className="pt-3 border-t border-shams-sand/80">
        <div className="flex items-center justify-between gap-2 mb-3 text-[11px] text-shams-navy/60">
          <div className="inline-flex items-center gap-1 bg-shams-sand/80 px-2 py-0.5 rounded-md font-medium">
            <Clock className="w-3 h-3 text-shams-navy/50" />
            <span>{time}</span>
          </div>

          {item.progress > 0 && !isCompleted && (
            <div className="flex items-center gap-1.5 flex-1 max-w-[100px]">
              <div className="w-full bg-shams-sand h-1.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-shams-teal" style={{ width: `${item.progress}%` }} />
              </div>
              <span className="text-[10px] font-bold text-shams-navy">{item.progress}%</span>
            </div>
          )}
        </div>

        {isCompleted ? (
          <Link 
            to={`/assessment/result/${item.id}`} 
            className="w-full py-2 rounded-xl border border-shams-teal text-shams-teal text-xs font-bold flex justify-center items-center gap-1.5 hover:bg-shams-teal hover:text-white transition-all shadow-2xs"
          >
            <span>{lang === 'en' ? 'View Report' : 'مشاهده گزارش تحلیلی'}</span>
          </Link>
        ) : (
          <Link 
            to={`/assessment/flow/${item.id}`} 
            className="w-full py-2 rounded-xl bg-shams-navy text-white text-xs font-bold flex justify-center items-center gap-1.5 hover:bg-shams-teal transition-all shadow-xs group-hover:bg-shams-teal"
          >
            <span>{item.progress > 0 ? (lang === 'en' ? 'Continue' : 'ادامه ارزیابی') : (lang === 'en' ? 'Start' : 'شروع ارزیابی')}</span>
            {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        )}
      </div>
    </div>
  );
}

