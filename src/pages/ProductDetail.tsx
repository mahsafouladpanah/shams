import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Star, Check, Plus, Minus, ArrowLeft, 
  ArrowRight, ShieldCheck, AlertCircle, Sparkles, Truck, 
  RotateCcw, Info, Heart, ListOrdered, Lightbulb, PackageCheck, 
  ChevronRight, HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { sampleProducts, Product } from '../data/products';
import { PageHero } from '../components/PageHero';
import { NotFound } from './NotFound';

const defaultFallbackProduct: Product = {
  id: 'pack-sleep',
  name: 'پک سلامت خواب شمس (SHAMS Better Sleep Pack)',
  nameEn: 'SHAMS Better Sleep Pack',
  nameAr: 'باقة شمس للنوم العميق',
  category: 'packs',
  price: 890000,
  inStock: true,
  rating: 4.9,
  reviewsCount: 142,
  image: 'https://images.unsplash.com/photo-1615486511484-92e172cb41ea?q=80&w=800&auto=format&fit=crop',
  description: 'مجموعه هم‌افزا شامل منیزیم بیس‌گلیسینات با جذب بالا، عصاره اسطوخودوس و چشم‌بند ارگونومیک مسدودکننده نور.',
  descriptionEn: 'Synergistic bundle containing chelated magnesium bisglycinate and ergonomic sleep mask.',
  descriptionAr: 'حزمة متكاملة تحتوي على بيسغليسينات المغنيسيوم وقناع حجب الضوء.',
  suitableFor: ['افراد با مشکل دیر به خواب رفتن', 'شاغلینی با شیفت‌های کاری متغیر'],
  howItHelps: ['کاهش زمان شروع خواب', 'افزایش طول مدت خواب عمیق'],
  scientificEvidence: 'کارآزمایی‌های بالینی تصادفی نشان داده‌اند منیزیم بیس‌گلیسینات کیفیت خواب را تا ۴۲٪ ارتقا می‌بخشد.',
  safetyConsiderations: ['در صورت ابتلا به نارسایی کلیوی پیش از مصرف با پزشک مشورت شود']
};

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang, t, formatNumber, formatCurrency, isRTL } = useLanguage();
  const { addToCart, items } = useCart();

  const product = sampleProducts ? sampleProducts.find(p => p.id === id) : undefined;

  if (!product) {
    return <NotFound />;
  }

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.image);

  useEffect(() => {
    if (product?.image) {
      setSelectedImage(product.image);
    }
  }, [product?.id, product?.image]);

  const gallery = [
    product?.image || defaultFallbackProduct.image,
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=800&auto=format&fit=crop'
  ];

  const handleAdd = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  // Dedicated Steps / How to Use Data
  const defaultSteps = [
    {
      stepNumber: 1,
      title: lang === 'en' ? 'Review & Orientation' : lang === 'ar' ? 'المراجعة والتهيئة' : 'ارزیابی اولیه و آماده‌سازی',
      instruction: lang === 'en'
        ? 'Carefully check the product seal, read the dosage instructions, and review contraindications prior to opening.'
        : lang === 'ar'
        ? 'تحقق من سلامة العبوة والباركود، واقرأ الجرعة الموصى بها وموانع الاستعمال بعناية قبل البدء.'
        : 'بسته‌بندی و بارکد اصالت شمس را بررسی کرده و بروشور راهنمای دوز مصرفی یا فایل دستورالعمل همراه را مطالعه فرمایید.'
    },
    {
      stepNumber: 2,
      title: lang === 'en' ? 'Standard Administration / Protocol' : lang === 'ar' ? 'طريقة الاستخدام والبروتوكول' : 'طریقه مصرف و اجرای پروتکل بالینی',
      instruction: product.category === 'digital'
        ? (lang === 'en'
            ? 'Access your digital masterclass via the SHAMS Dashboard; complete one module daily in a quiet environment.'
            : lang === 'ar'
            ? 'سجل دخولك إلى المنصة الرقمية وأكمل وحدة تدريبية واحدة يومياً في بيئة هادئة.'
            : 'پس از ثبت سفارش، جلسات صوتی و فایل‌های تمرینی در پنل خدمات فعال شده و روزانه ۲۰ دقیقه به تمرین بپردازید.')
        : (lang === 'en'
            ? 'Take the prescribed serving with a glass of water, ideally synchronized with your meals or evening wind-down window.'
            : lang === 'ar'
            ? 'تناول الحصة المحددة مع كوب ماء، ويفضل أن يكون متزامناً مع وجبة رئيسية أو فترة الاسترخاء المسائية.'
            : 'دوز پیشنهادی را طبق راهنما همراه با یک لیوان کامل آب، ترجیحاً همراه با وعده غذایی یا ۱ ساعت پیش از زمان استراحت میل نمایید.')
    },
    {
      stepNumber: 3,
      title: lang === 'en' ? 'Monitoring & Longitudinal Feedback' : lang === 'ar' ? 'المتابعة وتقييم التحسن' : 'پایش مستمر و ثبت بازخورد در سامانه',
      instruction: lang === 'en'
        ? 'Track your daily markers (sleep latency, energy score, or joint mobility) inside the SHAMS Health Record for optimal outcome calibration.'
        : lang === 'ar'
        ? 'سجل المؤشرات اليومية في سجلك الصحي بشمس لملاحظة التطور ومطابقة النتائج مع أهدافك الصحية.'
        : 'روند تغییرات خواب، انرژی یا معیارهای سلامت خود را در پرونده الکترونیک سلامت شمس ثبت کنید تا الگوریتم‌های هوشمند نتایج را کالیبره کنند.'
    }
  ];

  const stepsToDisplay = product.usageSteps && product.usageSteps.length > 0 ? product.usageSteps : defaultSteps;

  const defaultConsiderations = product.importantConsiderations || [
    lang === 'en' ? 'Keep out of reach of children and store in a cool, dry place below 25°C.' : 'در جای خشک و خنک (دمای زیر ۲۵ درجه سانتی‌گراد) و دور از تابش مستقیم آفتاب نگهداری شود.',
    lang === 'en' ? 'Consult your physician if you are pregnant, nursing, or taking prescription pharmaceuticals.' : 'بانوان باردار یا شیرده و افراد تحت درمان دارویی مزمن پیش از شروع با پزشک مشورت نمایند.',
    lang === 'en' ? 'Food supplements and wellness packs are designed to support a balanced lifestyle, not substitute clinical treatment.' : 'مکمل‌ها و پک‌های شمس هم‌افزای سبک زندگی سالم بوده و جایگزین درمان‌های مستقیم دارویی نیستند.'
  ];

  const defaultRecommendations = product.recommendations || [
    lang === 'en' ? 'Synergize with the SHAMS Lifestyle Assessment for personalized biomarker tracking.' : 'جهت اثربخشی حداکثری، همگام با آزمون خودارزیابی سبک زندگی شمس استفاده گردد.',
    lang === 'en' ? 'Maintain consistent hydration (minimum 2 to 2.5 liters of filtered water daily).' : 'حفظ هیدراتاسیون کافی و نوشیدن حداقل ۸ لیوان آب در طول روز توصیه اکید می‌شود.',
    lang === 'en' ? 'Pair with regular light aerobic movement or evening circadian lighting hygiene.' : 'رعایت بهداشت نور شبانه و پرهیز از صفحات نمایشگر ۱ ساعت پیش از خواب هم‌افزایی ایجاد می‌کند.'
  ];

  // Related Products from the same or complementary categories
  const relatedProducts = sampleProducts
    .filter(p => p.id !== product.id && (p.goal === product.goal || p.category === product.category || p.healthNeed === product.healthNeed))
    .slice(0, 3);

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      
      {/* Full-Width Visual Hero Banner for the Specific Product */}
      <PageHero
        customTitle={product.name}
        customSubtitle={product.descriptionEn && lang === 'en' ? product.descriptionEn : product.description}
        customTag={product.category === 'packs' ? (lang === 'en' ? 'Synergistic Healthspan Bundle' : 'پک هم‌افزای تندرستی') : (lang === 'en' ? 'Clinical Grade Longevity Formula' : 'مکمل با استاندارد دارویی')}
        customImage={product.image || selectedImage}
        customImageAlt={product.name}
        visualConceptLabel="Verified Clean Longevity Formulation"
        themeAccent="gold"
        breadcrumbs={[
          { label: t('nav.home'), link: '/' },
          { label: t('nav.shop'), link: '/shop' },
          { label: product.name }
        ]}
      >
        <div className="flex items-center gap-3 pt-2">
          <Link 
            to="/shop" 
            className="text-xs font-bold text-white/90 hover:text-white bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-all shadow-xs"
          >
            {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{lang === 'en' ? 'Back to All Products' : 'بازگشت به همه محصولات'}</span>
          </Link>
          <span className="text-xs font-bold text-shams-gold flex items-center gap-1 bg-shams-gold/15 px-3 py-2 rounded-xl border border-shams-gold/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Third-Party Lab Tested' : 'تست‌شده در آزمایشگاه مرجع'}</span>
          </span>
        </div>
      </PageHero>

      <section className="container mx-auto px-3 sm:px-4 max-w-6xl -mt-8 relative z-20 space-y-8 sm:space-y-10">
        
        {/* PURCHASE FLOW PROGRESS STEPPER */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-shams-navy/10 shadow-xs">
          <div className="text-[11px] font-bold text-shams-navy/50 uppercase tracking-wider mb-3 text-center sm:text-start">
            {lang === 'en' ? 'SHAMS Purchase & Care Pathway' : 'مسیر هوشمند خرید و مراقبت بالینی شمس'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs">
            <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-shams-teal/10 border border-shams-teal/30 text-shams-teal font-bold min-w-0">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-shams-teal text-white flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-numeric shrink-0">{formatNumber(1)}</span>
              <span className="truncate text-[11px] sm:text-xs">{lang === 'en' ? '1. Product & Details' : '۱. انتخاب و مشخصات'}</span>
            </div>
            <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-shams-sand/80 border border-shams-navy/10 text-shams-navy font-bold min-w-0">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-shams-navy/20 text-shams-navy flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-numeric shrink-0">{formatNumber(2)}</span>
              <span className="truncate text-[11px] sm:text-xs">{lang === 'en' ? '2. Usage Steps' : '۲. مراحل و دستور مصرف'}</span>
            </div>
            <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-shams-sand/40 border border-shams-navy/5 text-shams-navy/60 font-medium min-w-0">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-shams-navy/10 text-shams-navy/60 flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-numeric shrink-0">{formatNumber(3)}</span>
              <span className="truncate text-[11px] sm:text-xs">{lang === 'en' ? '3. Cart Review' : '۳. سبد خرید'}</span>
            </div>
            <div className="flex items-center gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-shams-sand/40 border border-shams-navy/5 text-shams-navy/60 font-medium min-w-0">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-shams-navy/10 text-shams-navy/60 flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-numeric shrink-0">{formatNumber(4)}</span>
              <span className="truncate text-[11px] sm:text-xs">{lang === 'en' ? '4. Checkout & Dispatch' : '۴. تسویه و تحویل'}</span>
            </div>
          </div>
        </div>

        {/* Main Product Layout */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-shams-navy/10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Images Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-shams-sand border border-shams-navy/10 relative shadow-inner">
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.isRecommended && (
                <span className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-shams-gold text-shams-navy text-xs font-bold shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  فرمول تاییدشده شمس
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === imgUrl ? 'border-shams-teal shadow-md scale-102' : 'border-shams-sand opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={imgUrl} 
                    alt="gallery" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details & Purchase Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-shams-teal/10 text-shams-teal border border-shams-teal/20">
                  {product.category === 'packs' ? 'پک سلامت شمس' : product.category === 'digital' ? 'برنامه دیجیتال' : 'مکمل بالینی'}
                </span>
                <span className={`text-xs font-bold flex items-center gap-1 ${product.inStock ? 'text-shams-green-primary' : 'text-shams-burgundy'}`}>
                  <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-shams-green-primary' : 'bg-shams-burgundy'}`} />
                  {product.inStock ? 'موجود در انبار شمس' : 'اتمام موجودی'}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-shams-navy mb-1">{product.name}</h1>
              <div className="text-xs font-mono text-shams-navy/40 mb-4" dir="ltr">{product.nameEn}</div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-6 text-xs text-shams-navy/70">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-numeric font-bold text-shams-navy">{product.rating}</span>
                <span>(<span className="font-numeric font-semibold">{formatNumber(product.reviewsCount)}</span> نظر ثبت‌شده کاربران)</span>
              </div>

              {/* Price */}
              <div className="p-4 rounded-2xl bg-shams-sand/50 border border-shams-navy/5 mb-6 flex items-baseline justify-between">
                <span className="text-xs font-semibold text-shams-navy/60">قیمت مصرف‌کننده:</span>
                <div className="metric-large text-3xl font-bold text-shams-navy flex items-baseline gap-1.5">
                  <span className="font-numeric font-bold">{formatNumber(product.price)}</span> <span className="text-sm font-normal text-shams-navy/60">تومان</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-shams-navy/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quick Perks */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-shams-navy/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-shams-teal" />
                  <span>تضمین اصالت فرمولاسیون</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-shams-teal" />
                  <span>ارسال سریع سراسر کشور</span>
                </div>
              </div>
            </div>

            {/* Quantity Stepper & Actions */}
            <div className="pt-6 border-t border-shams-sand space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-shams-navy">تعداد:</span>
                <div className="flex items-center border border-shams-navy/20 rounded-2xl p-1 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl hover:bg-shams-sand flex items-center justify-center font-bold text-shams-navy cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-numeric font-bold text-sm text-shams-navy">{formatNumber(quantity)}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl hover:bg-shams-sand flex items-center justify-center font-bold text-shams-navy cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className={`py-3.5 rounded-2xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAdded
                      ? 'bg-shams-green-primary text-white shadow-md'
                      : 'bg-shams-navy text-white hover:bg-shams-teal shadow-md'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>به سبد خرید اضافه شد</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>افزودن به سبد خرید</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 rounded-2xl bg-shams-teal text-white font-semibold text-xs hover:bg-shams-navy transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>ادامه به سبد و تسویه حساب</span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* DEDICATED SECTION: STEPS / HOW TO USE & RECOMMENDATIONS */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-shams-navy/10 shadow-sm space-y-6 sm:space-y-8">
          <div className="border-b border-shams-sand pb-4 sm:pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-shams-teal/10 text-shams-teal text-xs font-semibold mb-2">
                <ListOrdered className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Clinical Protocol' : 'پروتکل بالینی مصرف'}</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-shams-navy">
                {lang === 'en' ? 'Steps / How to Use & Implementation Guide' : 'مراحل پیشنهادی و شیوه اصولی مصرف'}
              </h2>
            </div>
            <div className="text-xs text-shams-navy/60 max-w-sm leading-relaxed">
              {lang === 'en'
                ? 'Follow these structured steps to ensure maximum biological absorption and targeted physiological outcomes.'
                : 'برای دستیابی به حداکثر اثر زیستی و هماهنگی با ریتم شبانه‌روزی، مراحل سه‌گانه زیر را به دقت دنبال نمایید.'}
            </div>
          </div>

          {/* 3 Step-by-Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {stepsToDisplay.map((step) => (
              <div
                key={step.stepNumber}
                className="p-4 sm:p-6 rounded-2xl bg-shams-sand/50 border border-shams-navy/10 hover:border-shams-teal/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-shams-navy text-white text-xs font-bold font-numeric flex items-center justify-center shadow-xs">
                      {formatNumber(step.stepNumber)}
                    </span>
                    <span className="text-[11px] font-bold text-shams-teal">
                      {lang === 'en' ? `Step ${step.stepNumber}` : `مرحله ${formatNumber(step.stepNumber)}`}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-shams-navy mb-2">{step.title}</h3>
                  <p className="text-xs text-shams-navy/70 leading-relaxed">{step.instruction}</p>
                </div>
                <div className="pt-3 border-t border-shams-navy/5 flex items-center gap-1.5 text-[11px] font-bold text-shams-navy/50">
                  <Check className="w-3.5 h-3.5 text-shams-teal" />
                  <span>استاندارد راهنمای بالینی شمس</span>
                </div>
              </div>
            ))}
          </div>

          {/* Considerations & Recommendations Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-shams-sand">
            {/* Important Considerations */}
            <div className="p-4 sm:p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-shams-navy">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>نکات و ملاحظات حائز اهمیت (Important Considerations)</span>
              </div>
              <ul className="space-y-2 text-xs text-shams-navy/80">
                {defaultConsiderations.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Relevant Recommendations & Synergy */}
            <div className="p-4 sm:p-6 rounded-2xl bg-shams-teal/5 border border-shams-teal/20 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-shams-navy">
                <Lightbulb className="w-4 h-4 text-shams-teal" />
                <span>توصیه‌های هم‌افزا و سبک زندگی (Clinical Recommendations)</span>
              </div>
              <ul className="space-y-2 text-xs text-shams-navy/80">
                {defaultRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-shams-teal mt-1.5 shrink-0" />
                    <span className="leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Clinical Specification Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* 1. Who is this suitable for? */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-shams-navy/10 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-shams-navy">
              <Sparkles className="w-4 h-4 text-shams-teal" />
              <span>این محصول برای چه افرادی مناسب است؟ (Target Audience)</span>
            </div>
            {Array.isArray(product.suitableFor) ? (
              <ul className="list-disc list-inside space-y-1 text-xs text-shams-navy/80">
                {product.suitableFor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-shams-navy/80 leading-relaxed">{product.suitableFor}</p>
            )}
          </div>

          {/* 2. How can it help? */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-shams-navy/10 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-shams-navy">
              <ShieldCheck className="w-4 h-4 text-shams-gold" />
              <span>چگونه به سلامت شما کمک می‌کند؟ (Mechanism of Action)</span>
            </div>
            {Array.isArray(product.howItHelps) ? (
              <ul className="list-disc list-inside space-y-1 text-xs text-shams-navy/80">
                {product.howItHelps.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-shams-navy/80 leading-relaxed">{product.howItHelps}</p>
            )}
          </div>

          {/* 3. Scientific Evidence */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-shams-navy/10 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-shams-navy">
              <Info className="w-4 h-4 text-shams-mauve" />
              <span>شواهد علمی و مستندات بالینی (Scientific Evidence)</span>
            </div>
            <p className="text-xs text-shams-navy/80 leading-relaxed">
              {product.scientificEvidence}
            </p>
          </div>

          {/* 4. Safety Considerations */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-shams-navy/10 shadow-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-shams-navy">
              <AlertCircle className="w-4 h-4 text-shams-burgundy" />
              <span>ملاحظات ایمنی و موارد احتیاط (Safety & Precautions)</span>
            </div>
            {Array.isArray(product.safetyConsiderations) ? (
              <ul className="list-disc list-inside space-y-1 text-xs text-shams-navy/80">
                {product.safetyConsiderations.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-shams-navy/80 leading-relaxed">{product.safetyConsiderations}</p>
            )}
          </div>

        </div>

        {/* RELATED PRODUCTS / COMPLEMENTARY SERVICES */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-shams-navy/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-shams-navy">
                  {lang === 'en' ? 'Recommended Complementary Products' : 'محصولات مکمل و مرتبط پیشنهادی'}
                </h3>
                <p className="text-xs text-shams-navy/60">
                  {lang === 'en' ? 'Synergistic solutions designed to enhance your clinical outcomes.' : 'انتخاب‌هایی هماهنگ جهت تسریع اثربخشی و ارتقای شاخص‌های فیزیولوژیک.'}
                </p>
              </div>
              <Link to="/shop" className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1">
                <span>مشاهده همه محصولات</span>
                {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/shop/product/${rel.id}`}
                  className="p-4 rounded-2xl border border-shams-navy/10 hover:border-shams-teal/50 transition-all group flex flex-col justify-between space-y-3 bg-shams-sand/30"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-white mb-2">
                    <img src={rel.image} alt={rel.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-shams-navy group-hover:text-shams-teal line-clamp-2 transition-colors">
                      {rel.name}
                    </h4>
                    <div className="text-xs font-mono font-bold text-shams-teal mt-1">
                      {formatNumber(rel.price.toLocaleString())} تومان
                    </div>
                  </div>
                  <div className="pt-2 border-t border-shams-navy/5 flex items-center justify-between text-[11px] text-shams-navy/60 font-bold">
                    <span>مشاهده مشخصات</span>
                    {isRTL ? <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
}
