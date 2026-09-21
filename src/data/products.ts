export interface Product {
  id: string;
  name: string;
  nameEn: string;
  nameAr: string;
  category: string;
  goal?: 'energy' | 'sleep' | 'stress' | 'fitness' | 'nutrition' | 'beauty';
  lifeStage?: 'children' | 'adolescents' | 'adults' | 'middle-age' | 'older-adults' | 'special';
  healthNeed?: 'general' | 'sports' | 'aging' | 'sleep' | 'beauty' | 'mental';
  isDigital?: boolean;
  isPack?: boolean;
  isRecommended?: boolean;
  isPhase2?: 'aging-store' | 'kids' | 'women' | 'marketplace';
  price: number;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  suitableFor: string[];
  howItHelps: string[];
  scientificEvidence: string;
  safetyConsiderations: string[];
  usageSteps?: { stepNumber: number; title: string; instruction: string }[];
  importantConsiderations?: string[];
  recommendations?: string[];
}

export const shopGoals = [
  { id: 'energy', name: 'انرژی بیشتر', nameEn: 'More Energy', nameAr: 'طاقة أكبر' },
  { id: 'sleep', name: 'خواب بهتر', nameEn: 'Better Sleep', nameAr: 'نوم أفضل' },
  { id: 'stress', name: 'کاهش استرس', nameEn: 'Stress Reduction', nameAr: 'تقليل التوتر' },
  { id: 'fitness', name: 'تناسب اندام', nameEn: 'Fitness', nameAr: 'اللياقة البدنية' },
  { id: 'nutrition', name: 'تغذیه سالم', nameEn: 'Healthy Nutrition', nameAr: 'تغذية صحية' },
  { id: 'beauty', name: 'مراقبت بدن و زیبایی', nameEn: 'Beauty & Body Care', nameAr: 'العناية بالبشرة والجمال' },
];

export const shopLifeStages = [
  { id: 'children', name: 'کودکان', nameEn: 'Children', nameAr: 'الأطفال' },
  { id: 'adolescents', name: 'نوجوانان', nameEn: 'Adolescents', nameAr: 'المراهقون' },
  { id: 'adults', name: 'بزرگسالان', nameEn: 'Adults', nameAr: 'البالغون' },
  { id: 'middle-age', name: 'میانسالی', nameEn: 'Middle Age', nameAr: 'منتصف العمر' },
  { id: 'older-adults', name: 'سالمندان', nameEn: 'Older Adults', nameAr: 'كبار السن' },
  { id: 'special', name: 'جمعیت‌های خاص', nameEn: 'Special Populations', nameAr: 'فئات خاصة' },
];

export const shopHealthNeeds = [
  { id: 'general', name: 'سلامت عمومی: تغذیه، مکمل و وزن', nameEn: 'General Health & Nutrition', nameAr: 'الصحة العامة والتغذية والوزن' },
  { id: 'sports', name: 'ورزش و حرکت', nameEn: 'Sports & Movement', nameAr: 'الرياضة والحركة' },
  { id: 'aging', name: 'سالمندی سالم', nameEn: 'Healthy Aging', nameAr: 'الشيخوخة الصحية' },
  { id: 'sleep', name: 'خواب و آرامش', nameEn: 'Sleep & Relaxation', nameAr: 'النوم والاسترخاء' },
  { id: 'beauty', name: 'مراقبت بدن و زیبایی', nameEn: 'Body Care & Beauty', nameAr: 'العناية بالجسم والجمال' },
  { id: 'mental', name: 'بهزیستی روان و ذهن', nameEn: 'Mental Wellbeing', nameAr: 'الصحة النفسية والذهنية' },
];

export const productsCatalog: Product[] = [
  // Health Packs
  {
    id: 'pack-sleep',
    name: 'پک سلامت خواب شمس (SHAMS Better Sleep Pack)',
    nameEn: 'SHAMS Better Sleep Pack',
    nameAr: 'باقة شمس للنوم العميق',
    category: 'packs',
    goal: 'sleep',
    lifeStage: 'adults',
    healthNeed: 'sleep',
    isPack: true,
    isRecommended: true,
    price: 890000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1615486511484-92e172cb41ea?q=80&w=800&auto=format&fit=crop',
    description: 'مجموعه هم‌افزا شامل منیزیم بیس‌گلیسینات با جذب بالا، عصاره اسطوخودوس، چشم‌بند ارگونومیک مسدودکننده نور و دسترسی به برنامه صوتی تنظیم خواب ریتم شبانه‌روزی.',
    descriptionEn: 'Synergistic bundle containing chelated magnesium bisglycinate, chamomile extract, ergonomic 100% light-blocking mask, and circadian audio sleep training.',
    descriptionAr: 'حزمة متكاملة تحتوي على بيسغليسينات المغنيسيوم عالي الامتصاص، قناع حجب الضوء الكامل وتطبيق جلسات الاسترخاء الصوتي.',
    suitableFor: ['افراد با مشکل دیر به خواب رفتن', 'افرادی که صبح با احساس خستگی بیدار می‌شوند', 'شاغلینی با شیفت‌های کاری متغیر'],
    howItHelps: ['کاهش زمان تأخیر در شروع خواب (Sleep Onset Latency)', 'افزایش طول مدت خواب با امواج آهسته (خواب عمیق دپ)', 'آرام‌سازی عضلانی و فرونشانی سیستم سمپاتیک'],
    scientificEvidence: 'کارآزمایی‌های بالینی تصادفی نشان داده‌اند منیزیم بیس‌گلیسینات به طور معنادار سطح کورتیزول شبانه را کاهش داده و کیفیت خواب را تا ۴۲٪ ارتقا می‌بخشد (Nutrients Journal, 2021).',
    safetyConsiderations: ['در صورت ابتلا به نارسایی کلیوی پیش از مصرف با پزشک مشورت شود', 'تداخل احتمالی با برخی آنتی‌بیوتیک‌ها در مصرف همزمان']
  },
  {
    id: 'pack-muscle',
    name: 'پک قدرت و عضله شمس (SHAMS Muscle & Strength Pack)',
    nameEn: 'SHAMS Muscle & Strength Pack',
    nameAr: 'باقة شمس للقوة وبناء العضلات',
    category: 'packs',
    goal: 'fitness',
    lifeStage: 'adults',
    healthNeed: 'sports',
    isPack: true,
    isRecommended: true,
    price: 1450000,
    inStock: true,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=800&auto=format&fit=crop',
    description: 'ترکیب کامل کراتین میکرونایز خالص Creapure، ایزوله پروتئین وی با بالاترین خلوص اسیدهای آمینه ضروری، کش تمرینی مقاومتی و برنامه دوره تمرینات هایپرتروفی.',
    descriptionEn: 'Ultra-pure Creapure micronized creatine, cross-flow microfiltered whey isolate, heavy resistance loop, and hypertrophy periodization guide.',
    descriptionAr: 'مزيج الكرياتين النقي وبروتين مصل اللبن المعزول مع حبل المقاومة ودليل التدريب الاحترافي.',
    suitableFor: ['ورزشکاران قدرتی و فیتنس', 'افرادی که قصد حفظ یا ساخت توده عضلانی دارند', 'پیشگیری از تحلیل عضلانی ناشی از رژیم‌های کاهش وزن'],
    howItHelps: ['افزایش فسفوکراتین عضلانی برای انفجار قدرت در تکرارهای سنگین', 'تحریک سنتز پروتئین عضله (MPS) با لوسین بالا', 'ریکاوری سریع‌تر بین جلسات تمرینی'],
    scientificEvidence: 'بیش از ۵۰۰ مطالعه علمی ایمنی و اثربخشی کراتین را در افزایش ۱۰ الی ۲۰ درصدی ظرفیت تمرینی و حفظ بافت بدون چربی اثبات کرده‌اند (ISSN Position Stand, 2017).',
    safetyConsiderations: ['نوشیدن حداقل ۲.۵ تا ۳ لیتر آب در طول روز توصیه می‌شود', 'برای افراد دارای سابقه بیماری‌های حاد کلیه مناسب نیست']
  },
  {
    id: 'pack-heart',
    name: 'پک سلامت قلب و متابولیک (SHAMS Heart & Metabolic Pack)',
    nameEn: 'SHAMS Heart & Metabolic Health Pack',
    nameAr: 'باقة شمس لصحة القلب والتمثيل الغذائي',
    category: 'packs',
    goal: 'nutrition',
    lifeStage: 'middle-age',
    healthNeed: 'general',
    isPack: true,
    isRecommended: true,
    price: 1280000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop',
    description: 'فرمول ویژه حاوی امگا ۳ غلیظ با نسبت بالای EPA/DHA، کوآنزیم Q10 به فرم یوبیکینول فعال، سیر عصاره کهنه و راهنمای تغذیه DASH برای انعطاف‌پذیری دیواره عروق.',
    descriptionEn: 'High-potency EPA/DHA fish oil, bioidentical Ubiquinol CoQ10, aged garlic extract, and clinical DASH nutrition framework.',
    descriptionAr: 'زيت سمك عالي النقاء أوميغا ٣، إنزيم كيو ١٠ النشط، وخلاصة الثوم المعتق لدعم شرايين القلب.',
    suitableFor: ['افراد مبتلا به چربی خون یا قند مرزی', 'افراد با سابقه خانوادگی گرفتگی عروق', 'اشخاص بالای ۴۰ سال جویای پیشگیری'],
    howItHelps: ['کاهش تری‌گلیسرید خون و تثبیت پلاک‌های عروقی', 'تقویت انرژی میتوکندری ماهیچه قلب', 'کاهش فشار خون سیستولیک به روش طبیعی'],
    scientificEvidence: 'کارآزمایی REDUCE-IT نشان داد دوزهای خالص اسیدهای چرب امگا ۳ ریسک حوادث قلبی عمده را تا ۲۵٪ کاهش می‌دهد (NEJM, 2019).',
    safetyConsiderations: ['در صورت مصرف داروهای ضدانعقاد (مانند وارفارین) با پزشک هماهنگ شود']
  },
  {
    id: 'pack-aging',
    name: 'پک طول عمر و سالمندی سالم (SHAMS Healthy Aging Pack)',
    nameEn: 'SHAMS Healthy Aging Pack',
    nameAr: 'باقة شمس لطول العمر والشيخوخة الصحية',
    category: 'packs',
    goal: 'energy',
    lifeStage: 'older-adults',
    healthNeed: 'aging',
    isPack: true,
    price: 1620000,
    inStock: true,
    rating: 5.0,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    description: 'ترکیب آنتی‌اکسیدانی رزوراترول خالص، متیل‌فولات، ویتامین D3 و K2 ارگانیک، به همراه تست‌های تمرین تعادل صندلی برای کاهش ریسک زمین خوردن.',
    descriptionEn: 'Trans-resveratrol, methylfolate, synergistic D3/K2, and geriatric balance training curriculum.',
    descriptionAr: 'حزمة طول العمر مع ريسفيراترول النقي وفيتامين د٣ وك٢ وبرنامج توازن كبار السن.',
    suitableFor: ['افراد بالای ۵۵ سال', 'کسانی که به دنبال حفظ انرژی سلولی و مفاصل روان هستند', 'افرادی با سابقه پوکی استخوان'],
    howItHelps: ['حمایت از طول تلومرها و سلامت میتوکندری', 'رسوب کلسیم در استخوان و جلوگیری از رسوب در دیواره عروق', 'حفظ تعادل حرکتی و پیشگیری از سقوط'],
    scientificEvidence: 'مطالعات متعدد ترکیب D3 و K2 را به عنوان استاندارد پیشگیری از شکستگی‌های لگن و حفظ چگالی استخوان معرفی می‌کنند.',
    safetyConsiderations: ['پایش دوره‌ای سطح ویتامین D در خون']
  },

  // Digital Products
  {
    id: 'dig-sleep-course',
    name: 'دوره دیجیتال «مهندسی خواب عمیق شمس»',
    nameEn: 'SHAMS Deep Sleep Masterclass',
    nameAr: 'برنامج هندسة النوم العميق الرقمي',
    category: 'digital',
    goal: 'sleep',
    healthNeed: 'sleep',
    isDigital: true,
    isRecommended: true,
    price: 340000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    description: 'شامل ۱۲ جلسه صوتی هدایت‌شده ذهن‌آگاهی، فایل‌های صوتی امواج دوگوشی (Binaural Beats) دلتا، چک‌لیست تغییر محیط اتاق خواب و پرسشنامه بازخورد هفتگی.',
    descriptionEn: '12 guided audio mindfulness sessions, delta binaural soundscapes, bedroom chronobiology checklist, and weekly sleep diary.',
    descriptionAr: '١٢ جلسة صوتية موجهة، مقاطع ترددات ثنائية الأذن لدعم النوم العميق مع دليل البيئة الصحية للنوم.',
    suitableFor: ['افرادی که به دنبال راهکارهای بدون دارو برای بهبود خواب هستند', 'دانشجویان و کارمندان پراسترس'],
    howItHelps: ['فرود ایمن امواج مغزی از بتا به تتا و دلتا پیش از خواب', 'مدیریت نشخوارهای فکری شبانه'],
    scientificEvidence: 'مطالعات EEG نشان‌دهنده تغییر امواج مغزی و تسریع ۱۰ دقیقه‌ای ورود به خواب عمیق با محرک‌های صوتی فرکانس دلتاست.',
    safetyConsiderations: ['هنگام رانندگی یا کار با ابزار گوش داده نشود']
  },
  {
    id: 'dig-sedentary-prog',
    name: 'برنامه دیجیتال رهایی از بی‌تحرکی در محیط کار',
    nameEn: 'Office Sedentary Lifestyle Reduction Program',
    nameAr: 'برنامج تقليل الجلوس المكتبي الرقمي',
    category: 'digital',
    goal: 'fitness',
    healthNeed: 'sports',
    isDigital: true,
    price: 250000,
    inStock: true,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop',
    description: 'برنامه کاربردی تعاملی شامل ۲۱ ریزتمرین کششی و فعال‌ساز عضلات وضعیتی پشت میز کار بدون نیاز به تجهیزات، با زنگ یادآور هوشمند.',
    descriptionEn: 'Interactive program with 21 micro-mobility desk drills for posture, lumbar relief, and metabolic stimulation.',
    descriptionAr: 'برنامج حركي تفاعلي يضم ٢١ تمريناً مكتبياً لتخفيف آلام الظهر وتنشيط الدورة الدموية.',
    suitableFor: ['برنامه‌نویسان، کارمندان و دورکاران', 'افراد با سابقه کمردرد ناشی از نشستن طولانی'],
    howItHelps: ['فعال‌سازی مجدد عضله گلوتئوس و کاهش اسپاسم عضلات پس‌سر', 'بهبود گردش خون وریدی پاها'],
    scientificEvidence: 'وقفه ۳ دقیقه‌ای در هر ۳۰ دقیقه نشستن، قند خون پس از غذا را تا ۳۲٪ کاهش می‌دهد (Diabetes Care).',
    safetyConsiderations: ['حرکات به آرامی و بدون ضربه ناگهانی اجرا شوند']
  },

  // Individual Supplements & Tools
  {
    id: 'prod-magnesium',
    name: 'کپسول منیزیم بیس‌گلیسینات شمس (Magnesium Glycinate)',
    nameEn: 'SHAMS Magnesium Bisglycinate 400mg',
    nameAr: 'كبسولات بيسغليسينات المغنيسيوم ٤٠٠ ملغ',
    category: 'supplements',
    goal: 'sleep',
    healthNeed: 'sleep',
    isRecommended: true,
    price: 420000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
    description: 'منیزیم متصل به اسید آمینه گلیسین با بالاترین درصد جذب روده‌ای، بدون ایجاد اثرات ملینی، مؤثر در آرامش عضلات و کیفیت خواب.',
    descriptionEn: 'Chelated magnesium bonded with glycine for superior GI tolerability and central nervous system calming.',
    descriptionAr: 'شكل مخلبي من المغنيسيوم يوفر أعلى امتصاص حيوي لتهدئة الأعصاب وتخفيف التشنج.',
    suitableFor: ['گرفتگی‌های عضلانی شبانه', 'بی‌خوابی و استرس', 'میگرن و سردردهای تنشی'],
    howItHelps: ['بلوکه‌کننده گیرنده‌های تحریکی NMDA در مغز', 'افزایش ترشح GABA طبیعی بدن'],
    scientificEvidence: 'تحقیقات نشان می‌دهد فرم کلات گلیسینات تا ۴ برابر جذب بهتری نسبت به اکسید منیزیم دارد.',
    safetyConsiderations: ['بهتر است ۱ ساعت قبل از خواب با یک لیوان آب میل شود']
  },
  {
    id: 'prod-omega3',
    name: 'امگا ۳ خالص اولترا با غلظت بالای EPA/DHA',
    nameEn: 'SHAMS Ultra-Purified Omega-3 EPA/DHA',
    nameAr: 'أوميغا ٣ فائق النقاء عالي التركيز',
    category: 'supplements',
    goal: 'nutrition',
    healthNeed: 'general',
    price: 580000,
    inStock: true,
    rating: 4.8,
    reviewsCount: 115,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=800&auto=format&fit=crop',
    description: 'روغن ماهی اقیانوسی تقطیر مولکولی شده، عاری از فلزات سنگین و جیوه، حاوی ۱۰۰۰ میلی‌گرم اسیدهای چرب فعال در هر کپسول.',
    descriptionEn: 'Triple-strength molecularly distilled deep-sea fish oil with verified zero heavy metals.',
    descriptionAr: 'زيت سمك نقي مقطر جزيئياً وخالٍ من الزئبق لدعم صحة الدماغ والشرايين.',
    suitableFor: ['سلامت قلب، عروق و مفاصل', 'افزایش تمرکز و کارایی مغزی', 'کاهش التهاب کلی بدن'],
    howItHelps: ['تنظیم غشای سلولی و ترشح واسطه‌های ضدالتهاب Resolvin', 'کاهش تری‌گلیسرید سرم'],
    scientificEvidence: 'تأییدیه FDA و انجمن قلب آمریکا برای کنترل چربی‌های خون و محافظت از دیواره سرخرگ‌ها.',
    safetyConsiderations: ['همراه با وعده غذایی چرب مصرف شود تا حداکثر جذب حاصل گردد']
  },

  // Phase 2 Stores
  {
    id: 'aging-chair-assist',
    name: 'کیت تخصصی تمرینات تعادلی و موبیلیتی سالمندان',
    nameEn: 'Senior Balance & Stability Kit',
    nameAr: 'حقيبة تمارين التوازن والثبات لكبار السن',
    category: 'aging-store',
    lifeStage: 'older-adults',
    healthNeed: 'aging',
    isPhase2: 'aging-store',
    price: 690000,
    inStock: true,
    rating: 4.8,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
    description: 'فوم تعادلی بدون لغزش با چگالی ایمن، کش‌های سبک مقاومتی با دسته ارگونومیک اسفنجی، راهنمای تصویری پیشگیری از زمین‌خوردگی.',
    descriptionEn: 'Non-slip progressive balance pad, dual-loop comfort resistance bands, and fall-prevention poster.',
    descriptionAr: 'وسادة التوازن المقاومة للانزلاق مع أحزمة المقاومة المريحة وملصق تمارين التوازن.',
    suitableFor: ['سالمندان بالای ۶۰ سال', 'افرادی که احساس عدم اطمینان در گام برداشتن دارند'],
    howItHelps: ['تقویت حس عمقی مفاصل مچ پا و زانو', 'تقویت قدرت پاها جهت برخاستن راحت از زمین و مبل'],
    scientificEvidence: 'تمرینات تعادلی اختصاصی احتمال سقوط منجر به شکستگی در سالمندان را تا ۴۰٪ کاهش می‌دهد (Cochrane, 2019).',
    safetyConsiderations: ['در جلسات اولیه حتماً کنار دیوار یا با همراهی صندلی مستحکم انجام گیرد']
  },
  {
    id: 'kids-motor-kit',
    name: 'جعبه مهارت‌های بنیادین حرکتی شمس کودکان',
    nameEn: 'SHAMS Kids Motor Skill Playset',
    nameAr: 'مجموعة المهارات الحركية الأساسية للأطفال',
    category: 'kids',
    lifeStage: 'children',
    healthNeed: 'sports',
    isPhase2: 'kids',
    price: 490000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 53,
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop',
    description: 'مجموعه بازی‌های فعال خانگی شامل نقاط تعادل سیلیکونی، توپ‌های تقویت پنجه و کارت‌های چالش حرکتی والدین-کودک.',
    descriptionEn: 'Active play toolkit with sensory balance stones, tactile grip balls, and parent-child movement cards.',
    descriptionAr: 'حقيبة ألعاب حركية تفاعلية لتنمية التوازن والرشاقة والتنسيق العضلي للأطفال.',
    suitableFor: ['کودکان ۳ تا ۹ سال', 'کودکانی که زمان زیادی را پای تبلت و تلویزیون سپری می‌کنند'],
    howItHelps: ['توسعه سواد حرکتی، اعتماد به نفس فیزیکی و تعادل مرکزی'],
    scientificEvidence: 'مهارت‌های حرکتی بنیادین در کودکی ارتباط مستقیمی با سطح فعالیت بدنی در دوران نوجوانی و بزرگسالی دارد.',
    safetyConsiderations: ['ساخته شده از سیلیکون بهداشتی غذایی و رنگ‌های غیرسمی']
  },
  {
    id: 'women-vitality-pack',
    name: 'بسته هورمون و نشاط بهزیستی زنان (Women’s Flourish)',
    nameEn: 'Women’s Wellbeing & Hormone Vitality',
    nameAr: 'حزمة توازن الهرمونات ونشاط المرأة',
    category: 'women',
    goal: 'energy',
    lifeStage: 'adults',
    healthNeed: 'mental',
    isPhase2: 'women',
    price: 890000,
    inStock: true,
    rating: 4.9,
    reviewsCount: 71,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    description: 'ترکیب مایواینوزیتول، دی‌کایرو اینوزیتول، فیتونوترینت‌های گیاهی پنج‌انگشت و ویتامین B6 برای تعادل چرخه و آرامش سندروم پیش‌قاعدگی.',
    descriptionEn: 'Myo-inositol / D-chiro-inositol blend with standardized Vitex and active B6 for cycle harmony and PMS relief.',
    descriptionAr: 'تركيبة ميو-إينوزيتول مع مستخلصات الأعشاب وفيتامين ب٦ لتنظيم الدورة وتخفيف تقلبات المزاج.',
    suitableFor: ['بانوان با علائم PMS شدید', 'افراد با سندروم تخمدان پلی‌کیستیک (PCOS)', 'بانوان در فاز گذار پری‌منوپوز'],
    howItHelps: ['تنظیم حساسیت به انسولین در بافت تخمدان', 'تثبیت نوسانات خلقی و کاهش احساس نفخ'],
    scientificEvidence: 'نسبت ۴۰:۱ مایواینوزیتول به دی‌کایرو اینوزیتول در مقالات علمی استاندارد طلایی بهبود علائم سندرم تخمدان پلی‌کیستیک شناخته شده است.',
    safetyConsiderations: ['در دوران بارداری یا شیردهی بدون نظر پزشک مصرف نشود']
  }
];

export const sampleProducts = productsCatalog;
