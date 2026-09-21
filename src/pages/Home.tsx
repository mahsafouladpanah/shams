import React from 'react';
import { 
  ArrowLeft, ArrowRight, Brain, Activity, HeartPulse, Scale, 
  Moon, Sparkles, ChevronLeft, ChevronRight, BookOpen, Dumbbell, 
  Users, ShoppingBag, ShieldCheck, Award, Microscope, Stethoscope, 
  Clock, CheckCircle2, TrendingUp, Compass, Dna 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Home() {
  const { lang, dir, t, formatNumber, isRTL } = useLanguage();

  const primaryEcosystemPillars = [
    {
      id: 'health',
      titleFa: 'شمس هلث (سلامت و سبک زندگی)',
      titleEn: 'Shams Health',
      titleAr: 'شمس للصحة ونمط الحياة',
      taglineFa: 'پزشکی سبک زندگی و ۹ ستون تندرستی پایدار بر مبنای راهنماهای بین‌المللی',
      taglineEn: 'Lifestyle Medicine & 9 Pillars of Vitality',
      taglineAr: 'طب نمط الحياة وركائز الحيوية المستدامة',
      icon: <HeartPulse className="w-6 h-6 text-shams-gold" />,
      link: '/lifestyle',
      badgeFa: 'پزشکی سبک زندگی',
      badgeEn: 'Lifestyle Medicine',
      badgeAr: 'طب نمط الحياة',
      statFa: '۹ ستون تندرستی',
      statEn: '9 Clinical Pillars',
      statAr: '٩ ركائز صحية',
      metricFa: '۵۰+ مقاله و ویدیو',
      metricEn: '50+ Guides & Media',
      metricAr: '+٥٠ دليلاً تعليمياً',
    },
    {
      id: 'aging',
      titleFa: 'شمس ایجینگ (سالمندی و طول عمر)',
      titleEn: 'Shams Aging & Longevity',
      titleAr: 'شمس للشيخوخة وطول العمر',
      taglineFa: 'تحقیقات طول عمر سالم، ساعت اپی‌ژنتیک، پیشگیری از افتادن و بیولوژی پیری',
      taglineEn: 'Longevity Science, Epigenetics & Healthy Aging',
      taglineAr: 'علوم طول العمر وساعة الشيخوخة الحيوية',
      icon: <Dna className="w-6 h-6 text-shams-gold" />,
      link: '/age-groups?stage=older-adults',
      badgeFa: 'علوم طول عمر',
      badgeEn: 'Longevity Science',
      badgeAr: 'علوم طول العمر',
      statFa: '۷ دوره زندگی',
      statEn: '7 Lifespan Stages',
      statAr: '٧ مراحل عمرية',
      metricFa: 'پروتکل‌های ساعت زیستی',
      metricEn: 'Epigenetic Clock Metrics',
      metricAr: 'بروتوكولات العمر الحيوي',
    },
    {
      id: 'performance',
      titleFa: 'شمس پرفورمنس (علوم ورزشی)',
      titleEn: 'Shams Performance & Sports',
      titleAr: 'شمس للأداء الرياضي',
      taglineFa: '۱۵ سرفصل پزشکی ورزشی، توانبخشی، تغذیه عملکردی و ارتقای توان انسانی',
      taglineEn: 'Sports Medicine, Kinesiology & Human Performance',
      taglineAr: 'الطب الرياضي وتطوير الأداء البشري',
      icon: <Dumbbell className="w-6 h-6 text-shams-gold" />,
      link: '/sports',
      badgeFa: 'طب حرکت و عملکرد',
      badgeEn: 'Sports Medicine',
      badgeAr: 'الطب الرياضي',
      statFa: '۱۵ سرفصل تخصصی',
      statEn: '15 Sports Domains',
      statAr: '١٥ تخصصاً رياضياً',
      metricFa: 'تست‌های غربالگری FMS',
      metricEn: 'FMS & VO2 Screenings',
      metricAr: 'فحوصات اللياقة FMS',
    },
    {
      id: 'academy',
      titleFa: 'شمس آکادمی (آموزش تخصصی)',
      titleEn: 'Shams Academy',
      titleAr: 'أكاديمية شمس التعليمية',
      taglineFa: 'دوره‌ها، وبینارها و مقالات آموزش بالینی عمومی و حرفه‌ای برای پزشکان و عموم',
      taglineEn: 'Clinical Courses & Public Health Education',
      taglineAr: 'الدورات السريرية والتعليم الطبي المستمر',
      icon: <BookOpen className="w-6 h-6 text-shams-gold" />,
      link: '/knowledge',
      badgeFa: 'آموزش مداوم',
      badgeEn: 'Academy',
      badgeAr: 'أكاديمية شمس',
      statFa: '۱۰۰+ محتوای آموزشی',
      statEn: '100+ CME Modules',
      statAr: '+١٠٠ وحدة تعليمية',
      metricFa: 'گواهینامه‌های رسمی',
      metricEn: 'Accredited Tracks',
      metricAr: 'شهادات معتمدة',
    },
    {
      id: 'research',
      titleFa: 'شمس ریسرچ (پژوهش و شواهد)',
      titleEn: 'Shams Research & Registry',
      titleAr: 'شمس للأبحاث السريرية',
      taglineFa: 'کارآزمایی‌های بالینی، مطالعات کوهورت و رجیستری یکپارچه سلامت ایرانیان',
      taglineEn: 'Clinical Trials & Epidemiological Registry',
      taglineAr: 'التجارب السريرية وسجلات البيانات الصحية',
      icon: <Microscope className="w-6 h-6 text-shams-gold" />,
      link: '/assessment/registry',
      badgeFa: 'پژوهش و داده',
      badgeEn: 'Clinical Research',
      badgeAr: 'الأبحاث والبيانات',
      statFa: 'رجیستری ملی سلامت',
      statEn: 'National Registry',
      statAr: 'السجل الوطني للصحة',
      metricFa: 'داده‌های بالینی همگام',
      metricEn: 'Real-World Evidence',
      metricAr: 'أدلة إكلينيكية واقعية',
    },
    {
      id: 'shop',
      titleFa: 'شمس لایف (محصولات و مکمل‌ها)',
      titleEn: 'SHAMS LIFE Shop',
      titleAr: 'متجر شمس لايف',
      taglineFa: 'مکمل‌های تاییدشده آزمایشگاهی، پکیج‌های اختصاصی سلامت و تجهیزات پایش',
      taglineEn: 'Third-Party Verified Supplements & Diagnostics',
      taglineAr: 'المكملات الغذائية وحزم الرعاية الصحية',
      icon: <ShoppingBag className="w-6 h-6 text-shams-gold" />,
      link: '/shop',
      badgeFa: 'فروشگاه شمس لایف',
      badgeEn: 'SHAMS LIFE',
      badgeAr: 'متجر شمس لايف',
      statFa: 'تضمین اصالت بالینی',
      statEn: 'Lab-Verified Quality',
      statAr: 'جودة معتمدة مخبرياً',
      metricFa: 'تجهیزات و بسته‌ها',
      metricEn: 'Certified Products',
      metricAr: 'منتجات طبية معتمدة',
    },
  ];

  const cardsData = [
    {
      toolId: 'bmi',
      icon: <Scale className="w-6 h-6" />,
      titleFa: 'محاسبه BMI و وزن ایده‌آل',
      titleEn: 'BMI & Ideal Weight Calculator',
      titleAr: 'حاسبة مؤشر كتلة الجسم والوزن المثالي',
      descFa: 'محاسبه نسبت توده بدنی با تفکیک بافت عضلانی و چربی بر پایه استانداردهای جهانی.',
      descEn: 'Evaluate body mass index with muscle and adipose distribution metrics.',
      descAr: 'تقييم مؤشر كتلة الجسم ونسب الدهون والعضلات وفق المعايير السريرية.',
      timeFa: '۲ دقیقه',
      timeEn: '2 mins',
      timeAr: 'دقيقتان',
    },
    {
      toolId: 'calorie',
      icon: <HeartPulse className="w-6 h-6" />,
      titleFa: 'محاسبه کالری روزانه (TDEE)',
      titleEn: 'Daily Calorie & TDEE Calculator',
      titleAr: 'حاسبة السعرات الحرارية اليومية (TDEE)',
      descFa: 'تعیین میزان متابولیسم پایه و سوخت‌وساز کل روزانه بر اساس سطح فعالیت بدنی.',
      descEn: 'Determine your basal metabolic rate and total daily expenditure.',
      descAr: 'تحديد معدل الأيض الأساسي وإجمالي حرق السعرات اليومي.',
      timeFa: '۳ دقیقه',
      timeEn: '3 mins',
      timeAr: '٣ دقائق',
    },
    {
      toolId: 'diabetes',
      icon: <Activity className="w-6 h-6" />,
      titleFa: 'غربالگری دیابت (FINDRISC)',
      titleEn: 'Type 2 Diabetes Screening (FINDRISC)',
      titleAr: 'فحص مخاطر السكري (FINDRISC)',
      descFa: 'پیش‌بینی ریسک ۱۰ ساله ابتلا به اختلال قند خون با امتیازدهی استاندارد بالینی.',
      descEn: 'Calculate 10-year risk of developing type 2 diabetes with clinical factors.',
      descAr: 'توقع احتمالية الإصابة بالسكري خلال ١٠ سنوات بناءً على معايير سريرية.',
      timeFa: '۴ دقیقه',
      timeEn: '4 mins',
      timeAr: '٤ دقائق',
    },
    {
      toolId: 'sleep',
      icon: <Moon className="w-6 h-6" />,
      titleFa: 'شاخص کیفیت خواب (PSQI)',
      titleEn: 'Sleep Quality Index (PSQI)',
      titleAr: 'مؤشر جودة النوم السريري (PSQI)',
      descFa: 'سنجش عمق، تداوم و چرخه بهینگی استراحت شبانه و بازسازی سلولی.',
      descEn: 'Measure latency, circadian rhythm efficiency, and restorative sleep architecture.',
      descAr: 'قياس كفاءة النوم، العمق، والراحة البيولوجية الليلية.',
      timeFa: '۴ دقیقه',
      timeEn: '4 mins',
      timeAr: '٤ دقائق',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-shams-sand text-shams-navy" dir={dir}>
      {/* Hero Section — 100% Full-Width Editorial Photography + Deep Navy Directional Scrim */}
      <section id="hero-section" className="relative w-full overflow-hidden bg-shams-navy text-white min-h-[520px] md:min-h-[600px] flex flex-col justify-center pt-16 pb-20 md:pt-20 md:pb-24">
        {/* Full-bleed background photo spanning 100% edge-to-edge */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/Gemini_Generated_Image_wlb6rswlb6rswlb6 1 (4).png"
            alt={lang === 'en' ? 'Evidence-based longevity and multi-generational vitality' : 'پزشکی مبتنی بر شواهد برای طول عمر سالم و زندگی پرنشاط'}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('hero-family.png')) {
                target.src = '/hero-family.png';
              }
            }}
            className="w-full h-full object-cover object-[center_30%] sm:object-[center_35%] lg:object-center transform scale-100 filter brightness-[0.78] contrast-[1.06] transition-transform duration-1000"
          />

          {/* Directional Deep Navy overlay preserving image radiance while guaranteeing 100% WCAG contrast */}
          <div 
            className={`absolute inset-0 ${
              isRTL
                ? 'bg-gradient-to-l from-shams-navy/95 via-shams-navy/80 sm:via-shams-navy/65 to-shams-navy/30'
                : 'bg-gradient-to-r from-shams-navy/95 via-shams-navy/80 sm:via-shams-navy/65 to-shams-navy/30'
            }`} 
          />

          {/* Ambient radial vignette preventing high-contrast glare */}
          <div className="absolute inset-0 bg-radial from-transparent via-shams-navy/15 to-shams-navy/55 mix-blend-multiply" />

          {/* Bottom edge transition gradient into page content */}
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-shams-navy via-shams-navy/60 to-transparent" />

          {/* Subtle gold accent atmospheric glow */}
          <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[650px] h-[650px] bg-shams-gold/10 rounded-full blur-3xl pointer-events-none`} />
        </div>
        
        <div className="container mx-auto px-4 xl:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-shams-gold/30 text-white font-bold text-xs shadow-sm backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-shams-gold animate-pulse" />
              <span className="tracking-wide">
                {lang === 'en' ? 'PROFESSOR SHAMS • Health • Science • Better Life' : lang === 'ar' ? 'بروفيسور شمس • الصحة • العلم • حياة أفضل' : 'پروفسور شمس • سلامت • علم • زندگی بهتر'}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.25] tracking-tight drop-shadow-xs">
              {lang === 'en' ? (
                <>Science-Backed Medicine <br /><span className="text-shams-gold">For A Flourishing Healthspan</span></>
              ) : lang === 'ar' ? (
                <>الطب القائم على الأدلة العلمية <br /><span className="text-shams-gold">لحياة أطول وأكثر حیوية</span></>
              ) : (
                <>پزشکی مبتنی بر شواهد <br /><span className="text-shams-gold">برای طول عمر سالم و زندگی پرنشاط</span></>
              )}
            </h1>
            
            <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl drop-shadow-xs font-normal">
              {lang === 'en'
                ? 'An integrated ecosystem uniting precision lifestyle interventions, clinical sports science, and longevity research to prevent chronic disease and maximize daily human performance.'
                : lang === 'ar'
                ? 'منظومة طبية متكاملة تجمع بین طب نمط الحياة الدقيق، علوم الرياضة المتقدمة، وأبحاث طول العمر لتعزيز جودة الحياة والوقاية من الأمراض المزمنة.'
                : 'زیست‌بوم جامع علمی پروفسور شمس با پیوند پزشکی سبک زندگی، علوم پیشرفته ورزشی و تحقیقات طول عمر، راهنمای شما در پیشگیری از بیماری‌های مزمن و ارتقای کیفیت زیست است.'}
            </p>
            
            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mt-2">
              <Link 
                to="/assessment" 
                className="bg-shams-gold text-shams-navy px-7 py-3.5 rounded-2xl font-semibold text-xs md:text-sm hover:bg-white transition-all shadow-xl flex items-center gap-2"
              >
                <span>{lang === 'en' ? 'Start Health Assessment' : lang === 'ar' ? 'بدء التقييم الصحي الذكي' : 'شروع ارزیابی هوشمند سلامت'}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
              
              <Link 
                to="/plan" 
                className="bg-shams-green-primary text-white px-6 py-3.5 rounded-2xl font-semibold text-xs md:text-sm hover:bg-shams-green-deep transition-all shadow-md flex items-center gap-2 border border-shams-green-mint/30"
              >
                <Sparkles className="w-4 h-4 text-shams-green-mint" />
                <span>{lang === 'en' ? 'Specialized Health Program' : lang === 'ar' ? 'برنامج شمس الصحي' : 'برنامه سلامت شمس'}</span>
              </Link>

              <Link 
                to="/knowledge" 
                className="bg-white/10 text-white px-5 py-3.5 rounded-2xl font-semibold text-xs md:text-sm hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2 backdrop-blur-sm"
              >
                <BookOpen className="w-4 h-4 text-shams-gold" />
                <span>{lang === 'en' ? 'Medical Knowledge' : lang === 'ar' ? 'المعرفة الطبية' : 'دانشنامه پزشکی'}</span>
              </Link>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-white/70 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-shams-gold" />
                {lang === 'en' ? 'Evidence-Based Protocols' : 'پروتکل‌های مبتنی بر شواهد بالینی'}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-shams-gold" />
                {lang === 'en' ? 'Clinical Lab Standards' : 'استانداردهای بین‌المللی ارزیابی'}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-shams-gold" />
                {lang === 'en' ? 'Epigenetic Healthspan' : 'بهینه‌سازی سن بیولوژیک'}
              </span>
            </div>

          </div>
          
          {/* Hero Visual Panel / Dedicated Image Showcase + Compact Clinical Metrics */}
          <div className="lg:col-span-5 relative space-y-4">
            
            {/* The Dedicated Photo Showcase Card */}
            <div 
              id="hero-featured-image-card" 
              className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-white/10 backdrop-blur-md group transition-all duration-500 hover:border-shams-gold/50"
            >
              <div className="aspect-[16/10] w-full overflow-hidden relative">
                <img
                  id="hero-featured-photo"
                  src="/Gemini_Generated_Image_wlb6rswlb6rswlb6 1 (4).png"
                  alt={lang === 'en' ? 'Multi-generational family vitality and evidence-based longevity' : 'طول عمر و نشاط چندنسلی در سبک زندگی سالم و فعال'}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('hero-family.png')) {
                      target.src = 'assets/hero-family.png';
                    }
                  }}
                  className="w-full h-full object-cover object-[center_35%] transform group-hover:scale-105 transition-transform duration-700 filter contrast-[1.04]"
                />
                
                {/* Visual Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-shams-navy/85 via-transparent to-black/20 pointer-events-none" />

                {/* Top Floating Badge */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-shams-navy/80 backdrop-blur-md border border-white/20 text-white font-bold text-[11px] shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-shams-gold animate-pulse" />
                    {lang === 'en' ? 'Active Longevity & Family Vitality' : 'طول عمر و نشاط چندنسلی'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-shams-gold text-shams-navy font-bold font-numeric text-[10px] shadow-md uppercase tracking-wider">
                    SHAMS 360°
                  </span>
                </div>

                {/* Bottom Floating Stats */}
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-[11px] pointer-events-none">
                  <div className="flex items-center gap-1.5 font-semibold drop-shadow-md">
                    <Activity className="w-3.5 h-3.5 text-shams-gold" />
                    <span>{lang === 'en' ? 'Optimal Biological Rhythm' : 'ریتم بهینه بیولوژیک'}</span>
                  </div>
                  <div className="font-numeric text-shams-gold font-semibold drop-shadow-md text-[10px]">
                    VO2 Max • HRV • Epigenetics
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Biological Health Index Mini-Panel */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-white/15 bg-shams-navy/60 backdrop-blur-md p-4 space-y-3">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-shams-gold/20 text-shams-gold flex items-center justify-center font-bold">
                    <Activity className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white leading-tight">
                      {lang === 'en' ? 'Biological Health Index' : 'شاخص تندرستی و طول عمر'}
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-shams-gold px-2 py-0.5 rounded-full bg-shams-gold/15 border border-shams-gold/30">
                  {lang === 'en' ? 'Optimal Range' : 'وضعیت بهینه'}
                </span>
              </div>

              {/* Visual Metric Gauges */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/70 mb-1">{lang === 'en' ? 'Cardio Fitness (VO2)' : 'آمادگی قلبی (VO2)'}</div>
                  <div className="font-numeric font-bold text-shams-gold text-xs">{formatNumber(48.5)} <span className="font-vazirmatn text-[10px] text-white/70">ml/kg/min</span></div>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-1.5 overflow-hidden">
                    <div className="bg-shams-gold h-full rounded-full w-[82%]" />
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/70 mb-1">{lang === 'en' ? 'HRV & Sleep Restoration' : 'تغییرپذیری ضربان (HRV)'}</div>
                  <div className="font-numeric font-bold text-shams-gold text-xs">{formatNumber(78)} <span className="font-vazirmatn text-[10px] text-white/70">ms</span></div>
                  <div className="w-full bg-white/10 rounded-full h-1 mt-1.5 overflow-hidden">
                    <div className="bg-shams-gold h-full rounded-full w-[76%]" />
                  </div>
                </div>
              </div>

              {/* Quick Assessment Launcher Link */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-[10px] text-white/60">
                  {lang === 'en' ? 'Clinical health questionnaire' : 'تکمیل ارزیابی جامع سن بیولوژیک'}
                </span>
                <Link
                  to="/assessment"
                  className="px-3 py-1 rounded-xl bg-shams-gold text-shams-navy font-semibold text-[11px] hover:bg-white transition-all shrink-0 shadow-sm"
                >
                  {lang === 'en' ? 'Start Assessment' : 'محاسبه سن زیستی'}
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Six Pillars of the SHAMS Ecosystem */}
      <section className="py-20 bg-white border-b border-shams-navy/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-shams-sand rounded-full text-xs font-bold mb-3 text-shams-navy">
              <Sparkles className="w-3.5 h-3.5 text-shams-gold" />
              <span>{lang === 'en' ? 'Integrated Ecosystem' : lang === 'ar' ? 'أركان المنظومة' : 'ارکان زیست‌بوم جامع شمس'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-shams-navy mb-3">
              {lang === 'en' ? 'Explore the SHAMS Ecosystem' : lang === 'ar' ? 'استكشف قطاعات منظومة شمس' : 'بخش‌های تخصصی و ساختار شمس'}
            </h2>
            <p className="text-shams-navy/70 text-xs sm:text-sm">
              {lang === 'en'
                ? 'From personalized medicine to high performance and certified supplements, explore every branch of our scientific platform.'
                : 'دسترسی سریع به دپارتمان‌های سلامت، سالمندی، ورزش، آکادمی، پژوهش و فروشگاه تخصصی شمس لایف.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {primaryEcosystemPillars.map((pillar) => {
              const title = lang === 'en' ? pillar.titleEn : lang === 'ar' ? pillar.titleAr : pillar.titleFa;
              const tagline = lang === 'en' ? pillar.taglineEn : lang === 'ar' ? pillar.taglineAr : pillar.taglineFa;
              const badge = lang === 'en' ? pillar.badgeEn : lang === 'ar' ? pillar.badgeAr : pillar.badgeFa;
              const stat = lang === 'en' ? pillar.statEn : lang === 'ar' ? pillar.statAr : pillar.statFa;
              const metric = lang === 'en' ? pillar.metricEn : lang === 'ar' ? pillar.metricAr : pillar.metricFa;

              return (
                <Link
                  key={pillar.id}
                  to={pillar.link}
                  className="p-6 rounded-3xl bg-white border border-shams-navy/10 shadow-xs hover:shadow-xl hover:border-shams-gold/60 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-shams-sand/80 border border-shams-navy/10 flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                        {pillar.icon}
                      </div>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-shams-navy/5 text-shams-navy/70 font-numeric">
                        {badge}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-shams-navy mb-2 group-hover:text-shams-navy">
                      {title}
                    </h3>

                    <p className="text-xs text-shams-navy/70 leading-relaxed mb-4">
                      {tagline}
                    </p>

                    {/* Data Badges & Department Highlights */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-shams-sand/80 border border-shams-navy/10 text-[10px] font-semibold text-shams-navy font-numeric">
                        <CheckCircle2 className="w-3 h-3 text-shams-teal" />
                        <span>{stat}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-shams-gold/10 border border-shams-gold/30 text-[10px] font-semibold text-shams-navy font-numeric">
                        <Sparkles className="w-3 h-3 text-shams-gold" />
                        <span>{metric}</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-shams-navy/10 flex items-center justify-between text-xs font-semibold text-shams-gold">
                    <span>{lang === 'en' ? 'Explore Department' : lang === 'ar' ? 'عرض القسم' : 'مشاهده این بخش'}</span>
                    {isRTL ? (
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clinical Assessment Tools Section */}
      <section className="py-20 bg-shams-sand/60">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-semibold mb-3 text-shams-navy border border-shams-navy/10">
              <Activity className="w-3.5 h-3.5 text-shams-gold" />
              <span>{lang === 'en' ? 'Interactive Clinical Screening' : 'ابزارها و غربالگری‌های بالینی'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-shams-navy mb-3">
              {t('home.quickAssessmentTitle')}
            </h2>
            <p className="text-shams-navy/70 text-xs sm:text-sm">
              {t('home.quickAssessmentSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cardsData.map((card) => {
              const title = lang === 'en' ? card.titleEn : lang === 'ar' ? card.titleAr : card.titleFa;
              const desc = lang === 'en' ? card.descEn : lang === 'ar' ? card.descAr : card.descFa;
              const time = lang === 'en' ? card.timeEn : lang === 'ar' ? card.timeAr : card.timeFa;

              return (
                <Link
                  key={card.toolId}
                  to={`/assessment/tools/${card.toolId}`}
                  className="p-5 rounded-2xl bg-white border border-shams-navy/10 shadow-xs hover:shadow-md hover:border-shams-teal transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-shams-sand flex items-center justify-center mb-3.5 text-shams-teal transition-transform group-hover:scale-105 border border-shams-navy/5 shrink-0">
                      {card.icon}
                    </div>
                    <h3 className="text-sm font-bold text-shams-navy mb-2 group-hover:text-shams-teal transition-colors leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-shams-navy/70 leading-relaxed min-h-[36px] line-clamp-2 mb-4">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-shams-sand/80 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-shams-navy/60 bg-shams-sand/80 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-shams-teal shrink-0" />
                      <span className="font-numeric">{time}</span>
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-shams-sand group-hover:bg-shams-teal group-hover:text-white text-shams-navy/60 transition-all flex items-center justify-center shrink-0">
                      {isRTL ? (
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                      ) : (
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/assessment/tools" 
              className="inline-flex items-center gap-2 text-shams-navy font-semibold text-xs hover:text-shams-gold transition-all"
            >
              <span>{t('home.viewAllTools')}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </div>
      </section>

      {/* Professor Shams Scientific Mission & Philosophy */}
      <section className="py-20 bg-shams-navy text-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-shams-gold text-xs font-semibold border border-shams-gold/30">
                <Award className="w-4 h-4" />
                <span>{lang === 'en' ? 'Scientific Leadership' : 'رهبری علمی و پزشکی پروفسور شمس'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
                {lang === 'en'
                  ? 'Redefining Healthcare: From Symptom Suppression to Cellular Vitality'
                  : 'بازتعریف سلامت: گذر از سرکوب مقطعی علائم به سوی احیای سلولی و طول عمر فعال'}
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                {lang === 'en'
                  ? 'Professor Shams brings decades of translational clinical experience to combine nutritional biochemistry, exercise prescription, and autonomic neuroscience into an actionable personal operating system.'
                  : 'دیدگاه بنیادین شمس بر این حقیقت استوار است که بیش از ۸۰ درصد بیماری‌های مزمن معاصر با مداخلات اصلاحی رفتار، تنفس، خواب، تغذیه ضدالتهاب و تمرینات هدفمند قابل پیشگیری و بهبود هستند.'}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-shams-gold font-numeric">{formatNumber(10)}+</div>
                  <div className="text-[11px] text-white/70 mt-1">
                    {lang === 'en' ? 'Disease Libraries' : 'دانشنامه تخصصی بیماری‌ها'}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-shams-gold font-numeric">{formatNumber(15)}</div>
                  <div className="text-[11px] text-white/70 mt-1">
                    {lang === 'en' ? 'Sports Domains' : 'شاخه تخصصی علوم ورزشی'}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-2xl font-bold text-shams-gold font-numeric">{formatNumber(9)}</div>
                  <div className="text-[11px] text-white/70 mt-1">
                    {lang === 'en' ? 'Lifestyle Pillars' : 'ستون سبک زندگی سالم'}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-shams-navy font-semibold text-xs hover:bg-shams-gold transition-all"
                >
                  <span>{lang === 'en' ? 'About Professor Shams & Scientific Board' : 'آشنایی کامل با پروفسور شمس و اهداف راهبردی'}</span>
                  {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-white/10 border border-white/15 space-y-4">
                <div className="text-xs font-semibold text-shams-gold uppercase tracking-wider">
                  {lang === 'en' ? 'Core Clinical Commitments' : 'تعهدات بالینی زیست‌بوم شمس'}
                </div>
                <ul className="space-y-3 text-xs text-white/90">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                    <span>مبتنی بر شواهد بدون توصیه‌های تجاری بدون پشتوانه بالینی</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                    <span>محرمانه ماندن اطلاعات پرونده سلامت و رجیستری ملی</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                    <span>پشتیبانی مداوم در اجرای برنامه‌های سبک زندگی و پایش دوره‌ای</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-shams-gold shrink-0 mt-0.5" />
                    <span>تأییدیه کیفی آزمایشگاهی برای تمام مکمل‌های فروشگاه شمس لایف</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dedicated Green Health Program Banner */}
      <section className="py-14 bg-gradient-to-r from-shams-green-deep via-[#0d3824] to-shams-green-deep text-white border-t border-shams-green-mint/20">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-shams-green-mint/20 text-shams-green-mint text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Dedicated Clinical Intervention' : 'بخش اختصاصی برنامه سلامت'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              {lang === 'en' ? 'SHAMS Tailored Health Program' : 'برنامه اختصاصی سلامت و تندرستی شمس'}
            </h3>
            <p className="text-xs text-white/80 max-w-lg leading-relaxed">
              {lang === 'en'
                ? 'Comprehensive personalized protocol integrating nutritional medicine, tailored exercise, and ongoing clinical surveillance.'
                : 'پروتکل جامع و شخصی‌سازی‌شده سلامت همراه با رژیم درمانی، تمرینات بالینی و پایش مداوم بیومارکرها.'}
            </p>
          </div>
          <Link
            to="/plan"
            className="px-7 py-3.5 rounded-2xl bg-shams-green-mint text-shams-green-deep font-semibold text-xs hover:bg-white transition-all shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>{lang === 'en' ? 'Enroll in Health Program' : 'ثبت نام در برنامه سلامت'}</span>
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </section>
    </div>
  );
}
