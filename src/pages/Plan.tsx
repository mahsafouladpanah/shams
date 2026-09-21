import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Circle, Droplet, Activity, Moon, Utensils, 
  Calendar, ArrowLeft, ArrowRight, Sun, 
  ShoppingBag, Plus, Video, Stethoscope, Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { sampleProducts } from '../data/products';
import { PageHero } from '../components/PageHero';

export function Plan() {
  const { lang, dir, t, formatNumber } = useLanguage();
  const { addToCart } = useCart();
  const [completedTasks, setCompletedTasks] = useState<number[]>([1, 2]);
  const [activeDay, setActiveDay] = useState<number>(3);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultBooked, setConsultBooked] = useState(false);

  const toggleTask = (id: number) => {
    setCompletedTasks(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const daysOfWeek = [
    { dayFa: 'شنبه', dayEn: 'Sat', dayAr: 'السبت', dateFa: '۱۴ مهر', dateEn: 'Oct 5', dateAr: '٥ أكتوبر', id: 0 },
    { dayFa: '۱شنبه', dayEn: 'Sun', dayAr: 'الأحد', dateFa: '۱۵ مهر', dateEn: 'Oct 6', dateAr: '٦ أكتوبر', id: 1 },
    { dayFa: '۲شنبه', dayEn: 'Mon', dayAr: 'الإثنين', dateFa: '۱۶ مهر', dateEn: 'Oct 7', dateAr: '٧ أكتوبر', id: 2 },
    { dayFa: '۳شنبه', dayEn: 'Tue', dayAr: 'الثلاثاء', dateFa: '۱۷ مهر', dateEn: 'Oct 8', dateAr: '٨ أكتوبر', id: 3 },
    { dayFa: '۴شنبه', dayEn: 'Wed', dayAr: 'الأربعاء', dateFa: '۱۸ مهر', dateEn: 'Oct 9', dateAr: '٩ أكتوبر', id: 4 },
    { dayFa: '۵شنبه', dayEn: 'Thu', dayAr: 'الخميس', dateFa: '۱۹ مهر', dateEn: 'Oct 10', dateAr: '١٠ أكتوبر', id: 5 },
    { dayFa: 'جمعه', dayEn: 'Fri', dayAr: 'الجمعة', dateFa: '۲۰ مهر', dateEn: 'Oct 11', dateAr: '١١ أكتوبر', id: 6 },
  ];

  // Targeted products for the plan
  const recommendedProducts = sampleProducts.filter(p => 
    p.id === 'pack-sleep' || p.id === 'pack-muscle' || p.id === 'prod-magnesium'
  );

  const tasksData = [
    {
      id: 1,
      time: '07:30',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
      titleFa: 'تمرین تنفس دیافراگمی صبحگاهی (۱۰ دقیقه)',
      titleEn: 'Morning Diaphragmatic Breathing (10 mins)',
      titleAr: 'تمرين التنفس البطني الصباحي (١٠ دقائق)',
      descFa: 'الگوی تنفس ۴-۷-۸ برای تنظیم تون عصب واگ و کاهش کورتیزول بیداری.',
      descEn: '4-7-8 breathing pattern to activate vagal tone and balance cortisol.',
      descAr: 'نمط التنفس ٤-٧-٨ لتحفيز العصب الحائر وتقليل كورتيزول الاستيقاظ.',
    },
    {
      id: 2,
      time: lang === 'en' ? 'Lunch' : lang === 'ar' ? 'مع الغداء' : 'همراه ناهار',
      icon: <Utensils className="w-3.5 h-3.5 text-shams-green-primary" />,
      titleFa: 'مصرف مکمل امگا-۳ و فیبر محلول',
      titleEn: 'Omega-3 & Soluble Fiber Supplementation',
      titleAr: 'تناول أوميغا-٣ والألياف القابلة للذوبان',
      descFa: 'یک کپسول روغن ماهی با دوز ۱۰۰۰ میلی‌گرم جهت بهبود پروفایل چربی خون.',
      descEn: '1000mg purified EPA/DHA softgel for lipid profile optimization.',
      descAr: 'كبسولة زيت سمك نقية لتحسين مستويات الدهون الثلاثية.',
    },
    {
      id: 3,
      time: '17:30',
      icon: <Activity className="w-3.5 h-3.5 text-shams-green-primary" />,
      titleFa: 'تمرینات قدرتی عملکردی با کش (۳۰ دقیقه)',
      titleEn: 'Functional Resistance Band Strength Workout (30 mins)',
      titleAr: 'تمارين المقاومة الوظيفية بالأربطة (٣٠ دقيقة)',
      descFa: '۳ ست اسکوات صندلی، پل باسن و روئینگ نشسته برای تقویت زنجیره خلفی.',
      descEn: '3 sets of chair squats, glute bridges, and seated rows.',
      descAr: '٣ مجموعات من القرفصاء وجسر الألوية والتجديف لتقوية العضلات.',
    },
    {
      id: 4,
      time: '22:00',
      icon: <Moon className="w-3.5 h-3.5 text-indigo-500" />,
      titleFa: 'خاموش کردن نمایشگرها و مصرف منیزیم',
      titleEn: 'Screen Curfew & Magnesium Glycinate Intake',
      titleAr: 'إيقاف الشاشات وتناول مغنيسيوم غلايسينات',
      descFa: 'آماده‌سازی ترشح طبیعی ملاتونین و آرام‌سازی عضلانی قبل از خواب.',
      descEn: 'Preparing natural melatonin onset and muscle relaxation for sleep.',
      descAr: 'تهيئة إفراز الميلاتونين واسترخاء العضلات لنوم عميق.',
    },
  ];

  return (
    <div className="w-full pb-24 bg-[#F4F9F5] min-h-screen text-shams-green-deep" dir={dir}>
      
      {/* Editorial Page Hero with Healthy Longevity & Vitality Routine Visual */}
      <PageHero
        heroId="plan"
        layoutVariant="asymmetric"
        themeAccent="sage"
      >
        <div className="flex flex-col gap-5 mt-4">
          {/* Quick Biological Health Score Pill */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl w-fit">
            <span className="text-shams-green-mint text-xs font-bold">
              {lang === 'en' ? 'Biological Health Index:' : 'شاخص سلامت بیولوژیک شما:'}
            </span>
            <span className="text-xl font-bold metric-large text-white">{formatNumber(78)}/<span className="font-numeric">{formatNumber(100)}</span></span>
            <Link 
              to="/assessment"
              className="text-[11px] text-white/80 hover:text-white underline font-bold"
            >
              {lang === 'en' ? 'Retake' : 'ارزیابی مجدد'}
            </Link>
          </div>

          {/* 4-Step Ecosystem Workflow Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-3xl">
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/15 text-[11px] text-white backdrop-blur-xs">
              <span className="text-shams-green-mint font-bold block mb-0.5">
                {lang === 'en' ? 'Stage 1: Assessment' : 'مرحله ۱: ارزیابی بالینی'}
              </span>
              <span className="opacity-80">
                {lang === 'en' ? 'Biometrics (Done)' : 'پرسشنامه‌ها (انجام شد)'}
              </span>
            </div>
            <div className="bg-shams-green-primary p-2.5 rounded-xl text-[11px] text-white shadow-sm font-medium">
              <span className="font-bold block mb-0.5">
                {lang === 'en' ? 'Stage 2: Personal Plan' : 'مرحله ۲: برنامه شخصی'}
              </span>
              <span>
                {lang === 'en' ? 'Protocol (Active)' : 'تمرین و تغذیه (فعال)'}
              </span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/15 text-[11px] text-white backdrop-blur-xs">
              <span className="text-shams-green-mint font-bold block mb-0.5">
                {lang === 'en' ? 'Stage 3: Targeted Nutrition' : 'مرحله ۳: مکمل هدفمند'}
              </span>
              <span className="opacity-80">
                {lang === 'en' ? 'Curated packs' : 'پک‌های کمبود زیستی'}
              </span>
            </div>
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/15 text-[11px] text-white backdrop-blur-xs">
              <span className="text-shams-green-mint font-bold block mb-0.5">
                {lang === 'en' ? 'Stage 4: Follow-up' : 'مرحله ۴: پایش و پیگیری'}
              </span>
              <span className="opacity-80">
                {lang === 'en' ? 'Lab reviews' : 'مشاوره آنلاین بالینی'}
              </span>
            </div>
          </div>
        </div>
      </PageHero>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 max-w-6xl -mt-6 relative z-20 space-y-8">
        
        {/* Daily Biomarkers Progress Rings */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <GoalCard 
            title={lang === 'en' ? 'Water Intake' : lang === 'ar' ? 'شرب الماء' : 'مصرف آب'} 
            current={formatNumber(5)} 
            total={formatNumber(8)} 
            unit={lang === 'en' ? 'glasses' : lang === 'ar' ? 'أكواب' : 'لیوان'} 
            percent={62} 
          />
          <GoalCard 
            title={lang === 'en' ? 'Daily Steps' : lang === 'ar' ? 'الخطوات اليومية' : 'گام‌های روزانه'} 
            current={formatNumber("6,200")} 
            total={formatNumber("8,500")} 
            unit={lang === 'en' ? 'steps' : lang === 'ar' ? 'خطوة' : 'قدم'} 
            percent={73} 
          />
          <GoalCard 
            title={lang === 'en' ? 'Sleep Duration' : lang === 'ar' ? 'مدة النوم' : 'کیفیت خواب'} 
            current={formatNumber(7.5)} 
            total={formatNumber(8.0)} 
            unit={lang === 'en' ? 'hrs' : lang === 'ar' ? 'ساعات' : 'ساعت'} 
            percent={93} 
          />
          <GoalCard 
            title={lang === 'en' ? 'Calorie Intake' : lang === 'ar' ? 'السعرات المستهلكة' : 'کالری دریافتی'} 
            current={formatNumber("1,850")} 
            total={formatNumber("2,200")} 
            unit="kcal" 
            percent={84} 
          />
          <GoalCard 
            title={lang === 'en' ? 'Net Protein' : lang === 'ar' ? 'البروتين الصافي' : 'پروتئین خالص'} 
            current={formatNumber(75)} 
            total={formatNumber(95)} 
            unit={lang === 'en' ? 'g' : lang === 'ar' ? 'غرام' : 'گرم'} 
            percent={78} 
          />
        </div>

        {/* 7-Day Calendar Strip */}
        <div className="bg-white rounded-3xl p-4 border border-shams-green-border shadow-xs">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-bold text-shams-green-deep flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-shams-green-primary" />
              {lang === 'en' ? 'Current Program Week:' : lang === 'ar' ? 'أيام الأسبوع الحالي:' : 'تقویم هفته جاری برنامه:'}
            </span>
            <span className="text-xs font-bold text-shams-green-primary">
              {lang === 'en' ? 'Week 4 of 12' : lang === 'ar' ? 'الأسبوع ٤ من ١٢' : 'هفته ۴ از ۱۲'}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((d) => {
              const dayLabel = lang === 'en' ? d.dayEn : lang === 'ar' ? d.dayAr : d.dayFa;
              const dateLabel = lang === 'en' ? d.dateEn : lang === 'ar' ? d.dateAr : d.dateFa;

              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDay(d.id)}
                  className={`p-3 rounded-2xl text-center transition-all cursor-pointer ${
                    activeDay === d.id
                      ? 'bg-shams-green-primary text-white shadow-md'
                      : 'bg-shams-green-light/40 text-shams-green-deep hover:bg-shams-green-light'
                  }`}
                >
                  <div className="text-xs font-bold">{dayLabel}</div>
                  <div className="text-[10px] opacity-70 mt-0.5">{dateLabel}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two Columns: Action Items & Stage 3/4 Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Today's Detailed Schedule (Stage 2) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-shams-green-border shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-shams-green-border/50 pb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-shams-green-deep">
                    {lang === 'en' ? "Today's Schedule & Habits" : lang === 'ar' ? 'جدول المهام اليومية' : 'برنامه زمان‌بندی امروز'}
                  </h3>
                  <p className="text-xs text-shams-green-deep/60">
                    {lang === 'en' ? 'Targeted interventions and behavioral actions' : lang === 'ar' ? 'إجراءات موصى بها لتعديل السلوك والتمارين' : 'اقدامات توصیه‌شده اصلاح رفتار و تمرین بدنی'}
                  </p>
                </div>
                <span className="text-xs font-bold text-shams-green-primary bg-shams-green-light px-3 py-1 rounded-full border border-shams-green-border">
                  {lang === 'en' 
                    ? `${formatNumber(completedTasks.length)} of ${formatNumber(tasksData.length)} Done`
                    : lang === 'ar'
                    ? `${formatNumber(completedTasks.length)} من ${formatNumber(tasksData.length)} مكتمل`
                    : `${formatNumber(completedTasks.length)} از ${formatNumber(tasksData.length)} انجام شد`}
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-4">
                {tasksData.map((task) => {
                  const isDone = completedTasks.includes(task.id);
                  const title = lang === 'en' ? task.titleEn : lang === 'ar' ? task.titleAr : task.titleFa;
                  const desc = lang === 'en' ? task.descEn : lang === 'ar' ? task.descAr : task.descFa;

                  return (
                    <div 
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isDone 
                          ? 'bg-shams-green-light/30 border-shams-green-border text-shams-green-deep/70' 
                          : 'bg-white border-shams-green-border hover:border-shams-green-primary text-shams-green-deep'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0 text-shams-green-primary cursor-pointer">
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5 opacity-40" />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-bold ${isDone ? 'line-through opacity-70' : ''}`}>
                            {title}
                          </span>
                          <span className="text-[10px] text-shams-green-deep/50 flex items-center gap-1 font-mono">
                            {task.icon} {task.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-shams-green-deep/70 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Stage 3 (Targeted Products) & Stage 4 (Follow-up) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Stage 3: Targeted Products for this Program */}
            <div className="bg-white rounded-3xl p-6 border border-shams-green-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-shams-green-primary" />
                  <h3 className="text-sm sm:text-base font-bold text-shams-green-deep">
                    {lang === 'en' ? 'Stage 3: Targeted Program Nutrition' : lang === 'ar' ? 'المرحلة ٣: مكملات وباقات هذا البرنامج' : 'مرحله ۳: مکمل‌ها و تجهیزات این برنامه'}
                  </h3>
                </div>
                <Link to="/shop" className="text-xs font-bold text-shams-green-primary hover:underline">
                  {t('nav.shop')}
                </Link>
              </div>
              <p className="text-xs text-shams-green-deep/70 leading-relaxed">
                {lang === 'en'
                  ? 'Clinically vetted vitamins and support packs to accelerate your adaptation.'
                  : lang === 'ar'
                  ? 'منتجات معتمدة طبياً لدعم تسريع النتائج وتحسين المؤشرات الحيوية.'
                  : 'محصولات مورد تایید پزشکی شمس برای تسریع نتایج این برنامه:'}
              </p>

              <div className="space-y-3">
                {recommendedProducts.map((prod) => (
                  <div key={prod.id} className="p-3 rounded-2xl border border-shams-green-border/70 bg-shams-green-light/20 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={prod.image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop'} 
                        alt={prod.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-shams-green-border" 
                      />
                      <div>
                        <div className="text-xs font-bold text-shams-green-deep">{prod.name}</div>
                        <div className="text-[11px] text-shams-green-primary font-bold mt-0.5">
                          {formatNumber(prod.price.toLocaleString())} {lang === 'en' ? 'Toman' : 'تومان'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(prod)}
                      className="px-3 py-1.5 rounded-xl bg-shams-green-primary text-white text-xs font-bold hover:bg-shams-green-deep transition-all flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t('shop.addToCart')}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage 4: Clinical Follow-up & Online Consultation */}
            <div className="bg-white rounded-3xl p-6 border border-shams-green-border shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-shams-green-primary" />
                <h3 className="text-sm sm:text-base font-bold text-shams-green-deep">
                  {lang === 'en' ? 'Stage 4: Clinical Follow-up' : lang === 'ar' ? 'المرحلة ٤: المتابعة السريرية' : 'مرحله ۴: پایش و پیگیری بالینی'}
                </h3>
              </div>
              
              <div className="p-4 rounded-2xl bg-shams-green-light/40 border border-shams-green-border/60 text-xs text-shams-green-deep space-y-2">
                <div className="font-bold flex items-center justify-between">
                  <span>{lang === 'en' ? 'Next Review Session:' : lang === 'ar' ? 'موعد الاستشارة القادمة:' : 'نوبت مشاوره بازبینی بعدی:'}</span>
                  <span className="text-shams-green-primary font-mono">{lang === 'en' ? 'Oct 9, 2026' : '۱۸ مهر ۱۴۰۳'}</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-80">
                  {lang === 'en'
                    ? 'Review progress on BMI, sleep architecture, and exercise dosage with a SHAMS sports physiologist.'
                    : lang === 'ar'
                    ? 'مراجعة التغيرات في مؤشرات الجسم، نوعية النوم، وضبط شدة التمارين مع أخصائي شمس.'
                    : 'جهت بررسی تغییرات شاخص توده بدنی، خواب و اصلاح دوز تمرینات هفتگی با متخصص فیزیولوژی ورزش شمس.'}
                </p>
              </div>

              {!consultBooked ? (
                <button
                  onClick={() => setShowConsultModal(true)}
                  className="w-full py-3 rounded-2xl bg-shams-green-deep hover:bg-shams-green-primary text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Video className="w-4 h-4 text-shams-green-mint" />
                  <span>{lang === 'en' ? 'Book Virtual Follow-Up Session' : lang === 'ar' ? 'حجز جلسة استشارة فيديو' : 'رزرو جلسه مشاوره تصویری پیگیری'}</span>
                </button>
              ) : (
                <div className="p-3 rounded-2xl bg-shams-green-primary text-white text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Follow-up appointment successfully booked' : lang === 'ar' ? 'تم تأكيد موعد المتابعة بنجاح' : 'نوبت پیگیری با موفقیت رزرو شد'}</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </section>

      {/* Booking Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-shams-green-border shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-shams-green-deep">
              {lang === 'en' ? 'Book Virtual Clinical Session' : lang === 'ar' ? 'حجز استشارة سريرية افتراضية' : 'رزرو جلسه مشاوره پیگیری آنلاین'}
            </h3>
            <p className="text-xs text-shams-green-deep/70 leading-relaxed">
              {lang === 'en'
                ? '45-minute clinical consultation with a lifestyle medicine specialist to analyze your monthly biometrics.'
                : lang === 'ar'
                ? 'استشارة مخصصة لمدة ٤٥ دقيقة مع أخصائي طب نمط الحياة لتحليل بياناتك الصحية.'
                : 'مشاوره اختصاصی ۴۵ دقیقه‌ای با متخصص طب ورزشی و سبک زندگی برای تحلیل داده‌های ماه اول شما.'}
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-shams-green-light border border-shams-green-border">
                <div className="font-bold text-shams-green-deep">
                  {lang === 'en' ? 'Consultant: Dr. Kaveh Mehran, MD' : lang === 'ar' ? 'الطبيب الاستشاري: د. كاوة مهران' : 'پزشک مشاور: دکتر کاوه مهران'}
                </div>
                <div className="text-[11px] text-shams-green-deep/60">
                  {lang === 'en' ? 'Sports & Lifestyle Medicine Specialist, SHAMS Scientific Council' : 'متخصص پزشکی ورزشی، عضو شورای علمی شمس'}
                </div>
              </div>
            </div>
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setShowConsultModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-shams-green-border text-xs font-bold text-shams-green-deep hover:bg-shams-green-light cursor-pointer"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => {
                  setConsultBooked(true);
                  setShowConsultModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-shams-green-primary text-white text-xs font-bold hover:bg-shams-green-deep cursor-pointer"
              >
                {lang === 'en' ? 'Confirm Booking' : lang === 'ar' ? 'تأكيد الحجز' : 'تایید و رزرو نهایی'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function GoalCard({
  title, current, total, unit, percent
}: {
  title: string; current: string; total: string; unit: string; percent: number;
}) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-shams-green-border shadow-xs text-center">
      <div className="text-[11px] font-bold text-shams-green-deep/70 mb-1">{title}</div>
      <div className="text-xl font-bold text-shams-green-deep mb-1 font-numeric">
        {current} <span className="text-[10px] font-normal opacity-60">/ {total} {unit}</span>
      </div>
      <div className="w-full bg-shams-green-light h-1.5 rounded-full overflow-hidden">
        <div className="bg-shams-green-primary h-full rounded-full" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
