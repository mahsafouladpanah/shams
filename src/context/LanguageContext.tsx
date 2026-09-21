import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fa' | 'en' | 'ar';
export type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  lang: Language;
  dir: Direction;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  formatNumber: (n: number | string) => string;
  toPersianDigits: (n: number | string) => string;
  formatCurrency: (amount: number) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fa: {
    // Navigation & Header (Updated with 6 core pillars & tagline)
    'nav.brandName': 'پروفسور شمس',
    'nav.tagline': 'سلامت • دانش • زندگی بهتر',
    'nav.profShams': 'پروفسور شمس',
    'nav.shamsHealth': 'شمس سلامت',
    'nav.shamsHealthSub': 'سلامت و سبک زندگی',
    'nav.shamsAging': 'شمس سالمندی',
    'nav.shamsAgingSub': 'سالمندی سالم و موفق',
    'nav.shamsPerformance': 'شمس عملکرد',
    'nav.shamsPerformanceSub': 'ورزش و عملکرد',
    'nav.shamsAcademy': 'شمس آکادمی',
    'nav.shamsAcademySub': 'آموزش',
    'nav.shamsResearch': 'شمس پژوهش',
    'nav.shamsResearchSub': 'پژوهش',

    'nav.home': 'خانه',
    'nav.knowledge': 'دانش',
    'nav.assessment': 'ارزیابی',
    'nav.program': 'برنامه سلامت',
    'nav.services': 'خدمات',
    'nav.shop': 'فروشگاه',
    'nav.about': 'درباره شمس',
    'nav.startAssessment': 'شروع ارزیابی',
    'nav.profile': 'حساب کاربری',
    'nav.cart': 'سبد خرید',
    'nav.notifications': 'اعلان‌ها',
    'nav.search': 'جستجو',
    'nav.login': 'ورود',
    'nav.register': 'ثبت‌نام',
    'nav.loginOrRegister': 'ورود / عضویت',
    'nav.logout': 'خروج از حساب',
    'nav.healthScore': 'امتیاز سلامت',

    // Submenu Items
    'submenu.profOverview': 'صفحه اصلی و بیوگرافی علمی',
    'submenu.profVision': 'چشم‌انداز و پیام بنیان‌گذار',
    'submenu.profFaculty': 'هیئت علمی و شورای بالینی',
    'submenu.profCharter': 'منشور طب سبک زندگی شمس',
    'submenu.diseaseLib': 'دانشنامه جامع بیماری‌ها و پیشگیری',
    'submenu.lifestylePillars': 'ستون‌های سبک زندگی (خواب، تغذیه، استرس)',
    'submenu.healthAssessment': 'ارزیابی جامع و هوشمند سلامت',
    'submenu.healthTools': 'ابزارهای بالینی و ماشین‌حساب‌های زیستی',
    'submenu.healthRegistry': 'پایگاه ملی ثبت اطلاعات سلامت (رجیستری)',
    'submenu.healthRecord': 'پرونده سلامت و پایش فردی',
    'submenu.healthProgram': 'برنامه مداخله سلامت شمس (Health Program)',
    'submenu.agingGuide': 'راهنمای جامع سالمندی پویا و طول عمر سالم',
    'submenu.agingAssessment': 'غربالگری ریسک سقوط و توانایی عملکردی',
    'submenu.agingStore': 'فروشگاه مکمل‌ها و تجهیزات سالمندی',
    'submenu.agingRecord': 'پرونده پایش و مراقبت سالمندان',
    'submenu.agingEvents': 'کارگاه‌ها و وبینارهای توانمندسازی سالمندان',
    'submenu.sportsMedicine': 'پزشکی ورزشی و بهینه‌سازی عملکرد',
    'submenu.fitnessAssessment': 'ارزیابی آمادگی جسمانی، VO2 Max و استقامت',
    'submenu.sportsNutrition': 'تغذیه ورزشی و مکمل‌های ریکاوری',
    'submenu.posturePlan': 'اصلاح ساختار قامتی و پروتکل‌های حرکتی',
    'submenu.rehabScreening': 'آزمون‌های پیشگیری از آسیب و بازتوانی',
    'submenu.digitalCourses': 'دوره‌ها و مسترکلاس‌های صوتی و ویدیویی',
    'submenu.eventsWebinars': 'سمینارها، کارگاه‌ها و وبینارهای تخصصی',
    'submenu.evidenceLibrary': 'پایگاه دانش بالینی و مقالات علمی',
    'submenu.podcastsEbooks': 'کتاب‌های الکترونیک و پادکست‌های سلامت',
    'submenu.researchPanel': 'پنل پژوهش و تحلیل داده‌های جمعیتی',
    'submenu.anonymizedData': 'پایش شاخص‌های اپیدمیولوژیک ناشناس',
    'submenu.academicCollab': 'همکاری‌های پژوهشی و انتشارات علمی',

    // Notifications System
    'notif.title': 'پیام‌ها و اعلان‌ها',
    'notif.subtitle': 'آخرین پیام‌ها، یادآورها و رویدادهای حساب کاربری شما',
    'notif.unread': 'پیام خوانده نشده',
    'notif.markAll': 'خواندن همه',
    'notif.markAsRead': 'خوانده شد',
    'notif.empty': 'هیچ اعلان جدیدی وجود ندارد',
    'notif.emptyDesc': 'پیام‌ها و هشدارهای جدید سلامت در این بخش نمایش داده می‌شوند.',
    'notif.viewAll': 'مشاهده همه پیام‌ها',
    'notif.clearAll': 'پاک کردن همه',

    // Authentication (Login & Register)
    'auth.loginTitle': 'خوش آمدید به شمس',
    'auth.loginSubtitle': 'برای دسترسی به پرونده سلامت و برنامه‌های شخصی وارد حساب خود شوید.',
    'auth.registerTitle': 'ایجاد حساب کاربری شمس',
    'auth.registerSubtitle': 'شروع مسیر سلامت، تندرستی و خودشناسی علمی با زیست‌بوم شمس.',
    'auth.fullName': 'نام و نام خانوادگی',
    'auth.fullNamePlaceholder': 'مثال: علی رضایی',
    'auth.emailOrUser': 'ایمیل یا نام کاربری',
    'auth.emailOrUserPlaceholder': 'name@example.com',
    'auth.email': 'آدرس ایمیل',
    'auth.emailPlaceholder': 'you@domain.com',
    'auth.password': 'رمز عبور',
    'auth.passwordPlaceholder': 'حداقل ۶ کاراکتر',
    'auth.confirmPassword': 'تکرار رمز عبور',
    'auth.confirmPasswordPlaceholder': 'رمز عبور را مجدداً وارد نمایید',
    'auth.rememberMe': 'مرا به خاطر بسپار',
    'auth.forgotPassword': 'رمز عبور را فراموش کرده‌اید؟',
    'auth.loginButton': 'ورود به حساب کاربری',
    'auth.registerButton': 'تکمیل ثبت‌نام و ورود',
    'auth.dontHaveAccount': 'هنوز حساب کاربری ندارید؟',
    'auth.alreadyHaveAccount': 'قبلاً در شمس ثبت‌نام کرده‌اید؟',
    'auth.registerNow': 'هم‌اکنون عضو شوید',
    'auth.loginNow': 'ورود به حساب',
    'auth.termsAgreement': 'با ثبت‌نام، کلیه قوانین و ضوابط حریم خصوصی شمس را می‌پذیرم.',
    'auth.loggingIn': 'در حال اعتبارسنجی...',
    'auth.registering': 'در حال ایجاد حساب کاربری...',
    'auth.demoNotice': 'نسخه پیش‌نمایش تعاملی (Simulated Prototype)',
    'auth.demoNoticeDesc': 'این سامانه با یک حساب آزمایشی فعال است؛ می‌توانید مستقیماً وارد شوید یا با هر ایمیل دلخواه لاگین کنید.',
    'auth.quickDemoFill': 'ورود سریع با حساب دمو',
    'auth.errEmptyFields': 'لطفاً تمام فیلدهای الزامی را تکمیل کنید.',
    'auth.errInvalidEmail': 'فرمت آدرس ایمیل وارد شده نامعتبر است.',
    'auth.errInvalidPass': 'رمز عبور باید حداقل ۶ کاراکتر داشته باشد.',
    'auth.errPassMismatch': 'رمز عبور و تکرار آن با یکدیگر همخوانی ندارند.',
    'auth.errTermsRequired': 'لطفاً موافقت با قوانین و شرایط را تایید فرمایید.',
    'auth.quoteText': '«سلامتی یک مقصد مقطعی نیست؛ بلکه هماهنگی روزمره بین ذهن، جسم و شیوه زیستن است.»',
    'auth.quoteAuthor': 'هیئت علمی و پزشکی شمس',

    // Knowledge Submenu
    'knowledge.diseases': 'بانک بیماری‌ها',
    'knowledge.lifestyle': 'شمس سبک زندگی',
    'knowledge.sports': 'شمس ورزش و تربیت بدنی',
    'knowledge.ageGroups': 'مراحل رشد و طول عمر',
    'knowledge.searchPlaceholder': 'جستجو در بیماری‌ها، سبک زندگی، تغذیه و ورزش...',

    // Assessment Submenu & Page
    'assessment.title': 'سامانه ارزیابی هوشمند و بالینی شمس',
    'assessment.subtitle': 'وضعیت سلامت کنونی خود را با ابزارهای استاندارد، مقیاس‌های بالینی و ثبت در رجیستری بسنجید.',
    'assessment.healthTools': 'ابزارهای سلامت و ماشین‌حساب‌ها',
    'assessment.registry': 'رجیستری ملی سلامت',
    'assessment.bmi': 'محاسبه‌گر BMI و ترکیب بدنی',
    'assessment.calorie': 'محاسبه‌گر کالری و متابولیسم (TDEE)',
    'assessment.diabetes': 'ریسک دیابت نوع ۲ (FINDRISC)',
    'assessment.metabolic': 'ریسک سندرم متابولیک',
    'assessment.mental': 'ارزیابی بهزیستی روان (DASS-21)',
    'assessment.sleep': 'ارزیابی کیفیت خواب (PSQI)',
    'assessment.mobility': 'ارزیابی تحرک عملکردی',
    'assessment.completed': 'تکمیل شده',
    'assessment.start': 'شروع ارزیابی',
    'assessment.continue': 'ادامه ارزیابی',
    'assessment.viewReport': 'مشاهده گزارش تحلیلی',
    'assessment.duration': 'زمان پاسخ‌دهی',

    // Services Submenu & Pages
    'services.record': 'پرونده سلامت (داشبورد فردی)',
    'services.research': 'پنل پژوهش (داده‌های ناشناس جمعیت)',
    'services.title': 'خدمات و زیرساخت‌های بالینی شمس',
    'services.downloadPdf': 'دریافت نسخه چاپی / PDF پرونده',
    'services.demoNoticeBadge': 'داده‌های شبیه‌سازی‌شده آزمایشی',

    // Shop Submenu & Pages
    'shop.title': 'فروشگاه تندرستی و سبک زندگی شمس',
    'shop.all': 'تمام محصولات',
    'shop.byGoal': 'خرید بر اساس هدف',
    'shop.byLifeStage': 'خرید بر اساس دوره زندگی',
    'shop.byNeed': 'خرید بر اساس نیاز سلامت',
    'shop.digital': 'شمس دیجیتال',
    'shop.recommended': 'پیشنهادهای شمس',
    'shop.packs': 'پک‌های جامع سلامت',
    'shop.agingStore': 'فروشگاه سالمندی پویا',
    'shop.kidsStore': 'شمس کودکان و نوجوانان',
    'shop.women': 'بهزیستی و هورمون‌های زنان',
    'shop.marketplace': 'بازارگاه سلامت',

    // Cart & Checkout
    'cart.title': 'سبد خرید شما',
    'cart.empty': 'سبد خرید شما خالی است',
    'cart.emptyDesc': 'محصولات، مکمل‌ها و بسته‌های آموزشی را از فروشگاه انتخاب فرمایید.',
    'cart.continue': 'ادامه خرید از فروشگاه',
    'cart.summary': 'خلاصه سفارش',
    'cart.subtotal': 'مجموع اقلام',
    'cart.discount': 'تخفیف شمس',
    'cart.total': 'مبلغ نهایی قابل پرداخت',
    'cart.promoPlaceholder': 'کد تخفیف (مثال: SHAMS)',
    'cart.promoApply': 'اعمال کد',
    'cart.checkoutBtn': 'تکمیل سفارش و تسویه حساب',
    'cart.checkoutModalTitle': 'تسویه حساب و نهایی‌سازی سفارش',
    'cart.deliveryAddress': 'آدرس تحویل گیرنده',
    'cart.phoneNumber': 'شماره تماس هماهنگی',
    'cart.payMethod': 'درگاه پرداخت اینترنتی شتاب',
    'cart.confirmPayment': 'پرداخت و تایید نهایی',
    'cart.successTitle': 'سفارش با موفقیت ثبت شد!',
    'cart.successDesc': 'کد رهگیری پیامک گردید و جزئیات در پرونده سلامت ذخیره شد.',

    // Common
    'common.viewAll': 'مشاهده همه',
    'common.readMore': 'مطالعه بیشتر',
    'common.addToCart': 'افزودن به سبد',
    'common.added': 'اضافه شد',
    'common.checkout': 'تسویه حساب',
    'common.total': 'مجموع',
    'common.subtotal': 'مجموع جزء',
    'common.free': 'رایگان',
    'common.price': 'قیمت',
    'common.toman': 'تومان',
    'common.currency': 'تومان',
    'common.status': 'وضعیت',
    'common.date': 'تاریخ',
    'common.filter': 'فیلترها',
    'common.reset': 'بازنشانی',
    'common.save': 'ذخیره',
    'common.cancel': 'انصراف',
    'common.download': 'دانلود فایل',
    'common.scientificEvidence': 'شواهد علمی',
    'common.safety': 'ملاحظات ایمنی',
    'common.whoIsFor': 'مناسب برای چه افرادی؟',
    'common.howItHelps': 'مکانیسم اثربخشی',
    'common.verified': 'تایید شده توسط شورای علمی شمس',
    'common.sampleDataBadge': 'داده‌های نمایشی نمونه',

    // Health Program (Exclusively Green)
    'program.title': 'برنامه سلامت فردی شمس (Health Program)',
    'program.subtitle': 'مداخلات ۴ مرحله‌ای بر پایه پزشکی سبک زندگی، ارزیابی هوشمند و پایش مستمر',
    'program.step1': '۱. ارزیابی جامع',
    'program.step2': '۲. برنامه فردی‌سازی‌شده',
    'program.step3': '۳. مکمل و تغذیه هدفمند',
    'program.step4': '۴. پیگیری و پایش دوره‌ای',
    'program.calendar': 'تقویم هفتگی اقدامات',
    'program.todayTasks': 'وظایف روزمره امروز',
    'program.bookConsult': 'رزرو نوبت مشاوره تخصصی',

    // Homepage
    'home.hero.title1': 'سلامتی خودت را',
    'home.hero.title2': 'علمی و هوشمند بشناس',
    'home.hero.subtitle': 'با ارزیابی بالینی، دانشنامه جامع بیماری‌ها و برنامه‌های شخصی‌سازی‌شده، مسیر سلامت و تندرستی خود را با شواهد علمی بسازید.',
    'home.hero.cta': 'شروع ارزیابی سلامت',
    'home.hero.programCta': 'برنامه سلامت فردی (Health Program)',
    'home.bioScore': 'امتیاز بیولوژیک سلامت',
    'home.quickAssessmentTitle': 'از ارزیابی وضعیت فعلی‌ات شروع کن',
    'home.quickAssessmentSubtitle': 'با ماشین‌حساب‌های استاندارد و پرسشنامه‌های بالینی، شاخص‌های زیستی خود را دقیق بسنجید.',
    'home.viewAllTools': 'مشاهده تمامی ابزارهای بالینی',
    'home.ecosystemTitle': 'مسیر پیوسته زیست‌بوم شمس',
    'home.ecosystemSubtitle': 'از آگاهی و ارزیابی تا دریافت برنامه در بخش سلامت، تهیه محصولات مورد تایید و پیگیری دوره‌ای.',
  },

  en: {
    // Navigation & Header (Updated with 6 core pillars & tagline)
    'nav.brandName': 'PROFESSOR SHAMS',
    'nav.tagline': 'Health • Science • Better Life',
    'nav.profShams': 'PROFESSOR SHAMS',
    'nav.shamsHealth': 'Shams Health',
    'nav.shamsHealthSub': 'Health and Lifestyle',
    'nav.shamsAging': 'Shams Aging',
    'nav.shamsAgingSub': 'Healthy and Successful Aging',
    'nav.shamsPerformance': 'Shams Performance',
    'nav.shamsPerformanceSub': 'Sports and Performance',
    'nav.shamsAcademy': 'Shams Academy',
    'nav.shamsAcademySub': 'Education',
    'nav.shamsResearch': 'Shams Research',
    'nav.shamsResearchSub': 'Research',

    'nav.home': 'Home',
    'nav.knowledge': 'Knowledge',
    'nav.assessment': 'Assessment',
    'nav.program': 'Health Program',
    'nav.services': 'Services',
    'nav.shop': 'Shop',
    'nav.about': 'About SHAMS',
    'nav.startAssessment': 'Start Assessment',
    'nav.profile': 'Account',
    'nav.cart': 'Cart',
    'nav.notifications': 'Notifications',
    'nav.search': 'Search',
    'nav.login': 'Log In',
    'nav.register': 'Sign Up',
    'nav.loginOrRegister': 'Log In / Register',
    'nav.logout': 'Sign Out',
    'nav.healthScore': 'Health Score',

    // Submenu Items
    'submenu.profOverview': 'Overview & Founder Biography',
    'submenu.profVision': 'Scientific Vision & Mission',
    'submenu.profFaculty': 'Scientific & Clinical Advisory Board',
    'submenu.profCharter': 'Lifestyle Medicine Charter',
    'submenu.diseaseLib': 'Comprehensive Disease Library & Prevention',
    'submenu.lifestylePillars': 'Lifestyle Medicine Pillars (Sleep, Nutrition, Stress)',
    'submenu.healthAssessment': 'Smart Clinical Health Assessment',
    'submenu.healthTools': 'Biometric & Clinical Health Calculators',
    'submenu.healthRegistry': 'National Epidemiological Health Registry',
    'submenu.healthRecord': 'Personal Health Record & Metrics',
    'submenu.healthProgram': 'SHAMS Health Intervention Program',
    'submenu.agingGuide': 'Active Longevity & Healthy Aging Guide',
    'submenu.agingAssessment': 'Functional Mobility & Fall Risk Screening',
    'submenu.agingStore': 'Aging Vitality Supplements & Gear',
    'submenu.agingRecord': 'Geriatric Telecare & Monitoring Profile',
    'submenu.agingEvents': 'Active Aging Workshops & Seminars',
    'submenu.sportsMedicine': 'Sports Medicine & Biomechanics',
    'submenu.fitnessAssessment': 'Athletic Fitness & VO2 Max Screening',
    'submenu.sportsNutrition': 'Sports Nutrition & Muscle Recovery',
    'submenu.posturePlan': 'Posture Correction & Functional Mobility',
    'submenu.rehabScreening': 'Injury Prevention & Rehabilitation',
    'submenu.digitalCourses': 'Audio & Video Masterclasses',
    'submenu.eventsWebinars': 'Scientific Seminars, Workshops & Webinars',
    'submenu.evidenceLibrary': 'Evidence-Based Clinical Knowledge Library',
    'submenu.podcastsEbooks': 'Health E-Books, Audio Guides & Podcasts',
    'submenu.researchPanel': 'Epidemiological Research Panel & Analytics',
    'submenu.anonymizedData': 'Anonymized Population Biomarker Analysis',
    'submenu.academicCollab': 'Academic Collaborations & Research Papers',

    // Notifications System
    'notif.title': 'Notifications & Messages',
    'notif.subtitle': 'Latest alerts, reminders, and updates on your health profile',
    'notif.unread': 'unread message',
    'notif.markAll': 'Mark all as read',
    'notif.markAsRead': 'Mark read',
    'notif.empty': 'No new notifications',
    'notif.emptyDesc': 'New health reminders, assessment results, and alerts will appear here.',
    'notif.viewAll': 'View all notifications',
    'notif.clearAll': 'Clear all',

    // Authentication (Login & Register)
    'auth.loginTitle': 'Welcome to SHAMS',
    'auth.loginSubtitle': 'Sign in to access your personal health records, assessments, and tailored plans.',
    'auth.registerTitle': 'Create Your SHAMS Account',
    'auth.registerSubtitle': 'Begin your science-backed journey toward holistic vitality and wellbeing.',
    'auth.fullName': 'Full Name',
    'auth.fullNamePlaceholder': 'e.g., Sarah Johnson',
    'auth.emailOrUser': 'Email or Username',
    'auth.emailOrUserPlaceholder': 'name@example.com',
    'auth.email': 'Email Address',
    'auth.emailPlaceholder': 'you@domain.com',
    'auth.password': 'Password',
    'auth.passwordPlaceholder': 'At least 6 characters',
    'auth.confirmPassword': 'Confirm Password',
    'auth.confirmPasswordPlaceholder': 'Re-enter your password',
    'auth.rememberMe': 'Remember me',
    'auth.forgotPassword': 'Forgot password?',
    'auth.loginButton': 'Sign In',
    'auth.registerButton': 'Create Account',
    'auth.dontHaveAccount': 'Don\'t have an account?',
    'auth.alreadyHaveAccount': 'Already registered?',
    'auth.registerNow': 'Sign up now',
    'auth.loginNow': 'Sign in here',
    'auth.termsAgreement': 'By registering, I agree to the SHAMS Terms of Service and Privacy Policy.',
    'auth.loggingIn': 'Authenticating...',
    'auth.registering': 'Creating account...',
    'auth.demoNotice': 'Interactive Prototype Notice',
    'auth.demoNoticeDesc': 'Simulated demonstration authentication. You can sign in using demo credentials or any email.',
    'auth.quickDemoFill': 'Quick Demo Sign In',
    'auth.errEmptyFields': 'Please fill in all required fields.',
    'auth.errInvalidEmail': 'Please enter a valid email address.',
    'auth.errInvalidPass': 'Password must be at least 6 characters long.',
    'auth.errPassMismatch': 'Passwords do not match.',
    'auth.errTermsRequired': 'Please agree to the Terms of Service to proceed.',
    'auth.quoteText': '"Health is not a mere destination, but a daily harmony between mind, body, and deliberate living."',
    'auth.quoteAuthor': 'SHAMS Scientific & Clinical Board',

    // Knowledge Submenu
    'knowledge.diseases': 'Disease Library',
    'knowledge.lifestyle': 'SHAMS Lifestyle',
    'knowledge.sports': 'SHAMS Sports & Fitness',
    'knowledge.ageGroups': 'Lifespan & Age Groups',
    'knowledge.searchPlaceholder': 'Search diseases, lifestyle, nutrition, sports...',

    // Assessment Submenu & Page
    'assessment.title': 'SHAMS Intelligent Clinical Assessment Suite',
    'assessment.subtitle': 'Evaluate your baseline biomarkers with validated clinical calculators and register in the national health database.',
    'assessment.healthTools': 'Health Calculators & Tools',
    'assessment.registry': 'National Health Registry',
    'assessment.bmi': 'BMI & Body Composition',
    'assessment.calorie': 'Calorie & TDEE Calculator',
    'assessment.diabetes': 'Type 2 Diabetes Risk (FINDRISC)',
    'assessment.metabolic': 'Metabolic Syndrome Risk',
    'assessment.mental': 'Mental Wellbeing (DASS-21)',
    'assessment.sleep': 'Sleep Quality Index (PSQI)',
    'assessment.mobility': 'Functional Mobility & Movement',
    'assessment.completed': 'Completed',
    'assessment.start': 'Start Assessment',
    'assessment.continue': 'Continue',
    'assessment.viewReport': 'View Analytic Report',
    'assessment.duration': 'Duration',

    // Services Submenu & Pages
    'services.record': 'Health Record (Personal Dashboard)',
    'services.research': 'Research Panel (Anonymized Data)',
    'services.title': 'SHAMS Clinical Services & Infrastructure',
    'services.downloadPdf': 'Download Health Dossier (PDF)',
    'services.demoNoticeBadge': 'Simulated Demonstration Records',

    // Shop Submenu & Pages
    'shop.title': 'SHAMS Health & Wellbeing Store',
    'shop.all': 'All Products',
    'shop.byGoal': 'Shop by Goal',
    'shop.byLifeStage': 'Shop by Life Stage',
    'shop.byNeed': 'Shop by Health Need',
    'shop.digital': 'Digital SHAMS',
    'shop.recommended': 'SHAMS Recommended',
    'shop.packs': 'Comprehensive Health Packs',
    'shop.agingStore': 'Active Aging Store',
    'shop.kidsStore': 'Kids & Adolescents',
    'shop.women': 'Women\'s Hormonal Wellbeing',
    'shop.marketplace': 'Health Marketplace',

    // Cart & Checkout
    'cart.title': 'Your Shopping Cart',
    'cart.empty': 'Your cart is currently empty',
    'cart.emptyDesc': 'Explore targeted supplements, health packs, and digital programs in our store.',
    'cart.continue': 'Continue Shopping',
    'cart.summary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.discount': 'SHAMS Discount',
    'cart.total': 'Total Amount',
    'cart.promoPlaceholder': 'Promo code (e.g. SHAMS)',
    'cart.promoApply': 'Apply',
    'cart.checkoutBtn': 'Proceed to Checkout',
    'cart.checkoutModalTitle': 'Order Checkout & Payment',
    'cart.deliveryAddress': 'Delivery Address',
    'cart.phoneNumber': 'Contact Phone Number',
    'cart.payMethod': 'Secure Payment Gateway',
    'cart.confirmPayment': 'Confirm & Complete Order',
    'cart.successTitle': 'Order Successfully Placed!',
    'cart.successDesc': 'Confirmation details have been saved to your health profile.',

    // Common
    'common.viewAll': 'View All',
    'common.readMore': 'Read More',
    'common.addToCart': 'Add to Cart',
    'common.added': 'Added',
    'common.checkout': 'Checkout',
    'common.total': 'Total',
    'common.subtotal': 'Subtotal',
    'common.free': 'Free',
    'common.price': 'Price',
    'common.toman': 'USD',
    'common.currency': '$',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.filter': 'Filter',
    'common.reset': 'Reset',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.download': 'Download',
    'common.scientificEvidence': 'Scientific Evidence',
    'common.safety': 'Safety & Precautions',
    'common.whoIsFor': 'Who is this suitable for?',
    'common.howItHelps': 'Mechanism of Action',
    'common.verified': 'Verified by SHAMS Scientific Board',
    'common.sampleDataBadge': 'Simulated Demonstration Data',

    // Health Program (Exclusively Green)
    'program.title': 'SHAMS Personalized Health Program',
    'program.subtitle': 'Evidence-based guidance driven by intelligent assessment & lifestyle medicine',
    'program.step1': '1. Comprehensive Assessment',
    'program.step2': '2. Personalized Protocol',
    'program.step3': '3. Targeted Nutrition & Supplements',
    'program.step4': '4. Longitudinal Follow-up',
    'program.calendar': 'Weekly Action Calendar',
    'program.todayTasks': 'Today\'s Action Items',
    'program.bookConsult': 'Book Expert Clinical Consultation',

    // Homepage
    'home.hero.title1': 'Understand Your Health',
    'home.hero.title2': 'Scientifically & Intelligently',
    'home.hero.subtitle': 'Empowering you with clinically backed health assessments, rigorous knowledge libraries, and personalized lifestyle intervention programs.',
    'home.hero.cta': 'Start Health Assessment',
    'home.hero.programCta': 'Personal Health Program',
    'home.bioScore': 'Biological Health Score',
    'home.quickAssessmentTitle': 'Start by Assessing Your Current State',
    'home.quickAssessmentSubtitle': 'Measure key biomarkers accurately with validated digital tools and clinical scales.',
    'home.viewAllTools': 'View All 7 Health Tools',
    'home.ecosystemTitle': 'The SHAMS Continuous Ecosystem',
    'home.ecosystemSubtitle': 'From awareness to assessment, personalized intervention programs, verified supplements, and periodic follow-up.',
  },

  ar: {
    // Navigation & Header (Updated with 6 core pillars & tagline)
    'nav.brandName': 'البروفيسور شمس',
    'nav.tagline': 'الصحة • العلم • حياة أفضل',
    'nav.profShams': 'البروفيسور شمس',
    'nav.shamsHealth': 'شمس للصحة',
    'nav.shamsHealthSub': 'الصحة ونمط الحياة',
    'nav.shamsAging': 'شمس للشيخوخة',
    'nav.shamsAgingSub': 'الشيخوخة الصحية والناجحة',
    'nav.shamsPerformance': 'شمس للأداء',
    'nav.shamsPerformanceSub': 'الرياضة والأداء البدني',
    'nav.shamsAcademy': 'أكاديمية شمس',
    'nav.shamsAcademySub': 'التعليم والتدريب',
    'nav.shamsResearch': 'أبحاث شمس',
    'nav.shamsResearchSub': 'الأبحاث السريرية',

    'nav.home': 'الرئيسية',
    'nav.knowledge': 'المعرفة',
    'nav.assessment': 'التقييم',
    'nav.program': 'البرنامج الصحي',
    'nav.services': 'الخدمات',
    'nav.shop': 'المتجر',
    'nav.about': 'عن شمس',
    'nav.startAssessment': 'بدء التقييم',
    'nav.profile': 'الحساب',
    'nav.cart': 'سلة المشتريات',
    'nav.notifications': 'الإشعارات',
    'nav.search': 'بحث',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.loginOrRegister': 'دخول / تسجيل',
    'nav.logout': 'تسجيل الخروج',
    'nav.healthScore': 'مؤشر الصحة',

    // Submenu Items
    'submenu.profOverview': 'الصفحة الرئيسية والسيرة العلمية',
    'submenu.profVision': 'الرؤية العلمية ورسالة المؤسس',
    'submenu.profFaculty': 'الهيئة العلمية والاستشارية السريرية',
    'submenu.profCharter': 'ميثاق طب نمط الحياة لشمس',
    'submenu.diseaseLib': 'موسوعة الأمراض الشاملة والوقاية',
    'submenu.lifestylePillars': 'أركان طب نمط الحياة (النوم، التغذية، الإجهاد)',
    'submenu.healthAssessment': 'التقييم الصحي الذكي والشامل',
    'submenu.healthTools': 'الحاسبات الحيوية والأدوات السريرية',
    'submenu.healthRegistry': 'السجل الوطني للمعلومات الصحية',
    'submenu.healthRecord': 'الملف الصحي والمؤشرات الفردية',
    'submenu.healthProgram': 'برنامج شمس للتدخل الصحي (Health Program)',
    'submenu.agingGuide': 'دليل الشيخوخة النشطة وطول العمر الصحي',
    'submenu.agingAssessment': 'فحص مخاطر السقوط والقدرات الوظيفية',
    'submenu.agingStore': 'مكملات ومعدات دعم حيوية الشيخوخة',
    'submenu.agingRecord': 'ملف المتابعة والرعاية الصحية لكبار السن',
    'submenu.agingEvents': 'ورش عمل وندوات تمكين كبار السن',
    'submenu.sportsMedicine': 'الطب الرياضي وتحسين الأداء الحركي',
    'submenu.fitnessAssessment': 'تقييم اللياقة البدنية ومؤشر VO2 Max',
    'submenu.sportsNutrition': 'التغذية الرياضية ومكملات التعافي العضلي',
    'submenu.posturePlan': 'تصحيح القوام والبرامج الحركية الوقائية',
    'submenu.rehabScreening': 'فحوصات الوقاية من الإصابات والتأهيل',
    'submenu.digitalCourses': 'الدورات والماستركلاس الرقمية',
    'submenu.eventsWebinars': 'الندوات العلمية والورش المتخصصة',
    'submenu.evidenceLibrary': 'مكتبة المعرفة والبحوث المبنية على البراهين',
    'submenu.podcastsEbooks': 'الكتب الإلكترونية وبودكاست الصحة',
    'submenu.researchPanel': 'لوحة الأبحاث وتحليل البيانات السكانية',
    'submenu.anonymizedData': 'رصد المؤشرات الوبائية مجهولة الهوية',
    'submenu.academicCollab': 'التعاون الأكاديمي والمنشورات العلمية',

    // Notifications System
    'notif.title': 'الإشعارات والرسائل',
    'notif.subtitle': 'أحدث التنبيهات والتذكيرات وتحديثات ملفك الصحي',
    'notif.unread': 'رسالة غير مقروءة',
    'notif.markAll': 'تحديد الكل كمقروء',
    'notif.markAsRead': 'تمت القراءة',
    'notif.empty': 'لا توجد إشعارات جديدة',
    'notif.emptyDesc': 'ستظهر هنا التنبيهات الصحية ونتائج التقييمات والتذكيرات.',
    'notif.viewAll': 'عرض كافة الإشعارات',
    'notif.clearAll': 'مسح الكل',

    // Authentication (Login & Register)
    'auth.loginTitle': 'مرحباً بكم في شمس',
    'auth.loginSubtitle': 'سجل الدخول للوصول إلى سجلك الصحي وتقييماتك وبرامجك المخصصة.',
    'auth.registerTitle': 'إنشاء حساب جديد في شمس',
    'auth.registerSubtitle': 'ابدأ رحلتك القائمة على الأدلة العلمية نحو الصحة المتكاملة والرفاهية.',
    'auth.fullName': 'الاسم الكامل',
    'auth.fullNamePlaceholder': 'مثال: محمد العمري',
    'auth.emailOrUser': 'البريد الإلكتروني أو اسم المستخدم',
    'auth.emailOrUserPlaceholder': 'name@example.com',
    'auth.email': 'البريد الإلكتروني',
    'auth.emailPlaceholder': 'you@domain.com',
    'auth.password': 'كلمة المرور',
    'auth.passwordPlaceholder': '٦ أحرف على الأقل',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.confirmPasswordPlaceholder': 'أعد إدخال كلمة المرور',
    'auth.rememberMe': 'تذكرني',
    'auth.forgotPassword': 'هل نسيت كلمة المرور؟',
    'auth.loginButton': 'تسجيل الدخول',
    'auth.registerButton': 'إنشاء الحساب والمتابعة',
    'auth.dontHaveAccount': 'ليس لديك حساب بعد؟',
    'auth.alreadyHaveAccount': 'هل لديك حساب مسجل؟',
    'auth.registerNow': 'سجل الآن',
    'auth.loginNow': 'سجل دخولك هنا',
    'auth.termsAgreement': 'بالتسجيل، فإنك توافق على شروط الخدمة وسياسة الخصوصية لمنظومة شمس.',
    'auth.loggingIn': 'جارٍ التحقق...',
    'auth.registering': 'جارٍ إنشاء الحساب...',
    'auth.demoNotice': 'تنبيه النموذج التوضيحي',
    'auth.demoNoticeDesc': 'مصادقة توضيحية تفاعلية. يمكنك تسجيل الدخول باستخدام الحساب التجريبي أو أي بريد.',
    'auth.quickDemoFill': 'دخول سريع بالحساب التجريبي',
    'auth.errEmptyFields': 'يرجى ملء جميع الحقول المطلوبة.',
    'auth.errInvalidEmail': 'صيغة البريد الإلكتروني غير صحيحة.',
    'auth.errInvalidPass': 'يجب ألا تقل كلمة المرور عن ٦ خانات.',
    'auth.errPassMismatch': 'كلمتا المرور غير متطابقتين.',
    'auth.errTermsRequired': 'يرجى الموافقة على شروط الاستخدام للمتابعة.',
    'auth.quoteText': '«ليست الصحة مجرد غاية، بل هي تناغم يومي بين الجسد والفكر وأسلوب العيش المتوازن.»',
    'auth.quoteAuthor': 'المجلس العلمي والطبي لمنظومة شمس',

    // Knowledge Submenu
    'knowledge.diseases': 'مكتبة الأمراض',
    'knowledge.lifestyle': 'شمس نمط الحياة',
    'knowledge.sports': 'شمس الرياضة والنشاط',
    'knowledge.ageGroups': 'المراحل العمرية والنمو',
    'knowledge.searchPlaceholder': 'ابحث في الأمراض، نمط الحياة، التغذية والرياضة...',

    // Assessment Submenu & Page
    'assessment.title': 'منظومة التقييم السريري الذكي في شمس',
    'assessment.subtitle': 'قيّم مؤشراتك الحيوية باستخدام أدوات قياس معيارية وسجّل في قاعدة البيانات الصحية.',
    'assessment.healthTools': 'أدوات وحاسبات الصحة',
    'assessment.registry': 'السجل الصحي الوطني',
    'assessment.bmi': 'مؤشر كتلة الجسم وتركيب الدهون',
    'assessment.calorie': 'حاسبة السعرات والتمثيل الغذائي (TDEE)',
    'assessment.diabetes': 'مخاطر السكري من النوع الثاني (FINDRISC)',
    'assessment.metabolic': 'مخاطر المتلازمة الأيضية',
    'assessment.mental': 'تقييم الرفاه النفسي (DASS-21)',
    'assessment.sleep': 'مؤشر جودة النوم (PSQI)',
    'assessment.mobility': 'تقييم الحركة الوظيفية',
    'assessment.completed': 'مكتمل',
    'assessment.start': 'بدء التقييم',
    'assessment.continue': 'متابعة التقييم',
    'assessment.viewReport': 'عرض التقرير التحليلي',
    'assessment.duration': 'المدة المتوقعة',

    // Services Submenu & Pages
    'services.record': 'السجل الصحي (لوحة المعلومات الشخصية)',
    'services.research': 'لوحة الأبحاث (بيانات سكانية مجهولة المصدر)',
    'services.title': 'خدمات وبنية شمس التحتية',
    'services.downloadPdf': 'تحميل التقرير الصحي (PDF)',
    'services.demoNoticeBadge': 'بيانات نموذجية توضيحية',

    // Shop Submenu & Pages
    'shop.title': 'متجر شمس للصحة والرفاهية',
    'shop.all': 'جميع المنتجات',
    'shop.byGoal': 'التسوق حسب الهدف',
    'shop.byLifeStage': 'التسوق حسب المرحلة العمرية',
    'shop.byNeed': 'التسوق حسب الاحتياج الصحي',
    'shop.digital': 'شمس الرقمية',
    'shop.recommended': 'توصيات شمس',
    'shop.packs': 'باقات شمس الصحية الشاملة',
    'shop.agingStore': 'متجر الشيخوخة النشطة',
    'shop.kidsStore': 'شمس الأطفال واليافعين',
    'shop.women': 'صحة ورفاه المرأة وتوازن الهرمونات',
    'shop.marketplace': 'سوق شمس التفاعلي',

    // Cart & Checkout
    'cart.title': 'سلة المشتريات',
    'cart.empty': 'سلة مشترياتك فارغة حالياً',
    'cart.emptyDesc': 'استكشف المكملات المعتمدة والباقات الصحية من المتجر.',
    'cart.continue': 'متابعة التسوق',
    'cart.summary': 'ملخص الطلب',
    'cart.subtotal': 'المجموع الجزئي',
    'cart.discount': 'خصم شمس',
    'cart.total': 'المبلغ الإجمالي',
    'cart.promoPlaceholder': 'رمز الخصم (مثال: SHAMS)',
    'cart.promoApply': 'تطبيق',
    'cart.checkoutBtn': 'متابعة الدفع وإنهاء الطلب',
    'cart.checkoutModalTitle': 'إنهاء الطلب والدفع الإلكتروني',
    'cart.deliveryAddress': 'عنوان التوصيل',
    'cart.phoneNumber': 'رقم هاتف الاتصال',
    'cart.payMethod': 'بوابة الدفع الإلكتروني الآمنة',
    'cart.confirmPayment': 'تأكيد ودفع الطلب',
    'cart.successTitle': 'تم تسجيل طلبك بنجاح!',
    'cart.successDesc': 'تم حفظ تفاصيل الطلب في ملفك الصحي وإرسال رسالة التأكيد.',

    // Common
    'common.viewAll': 'عرض الكل',
    'common.readMore': 'اقرأ المزيد',
    'common.addToCart': 'إضافة إلى السلة',
    'common.added': 'تمت الإضافة',
    'common.checkout': 'إتمام الطلب',
    'common.total': 'المجموع',
    'common.subtotal': 'المجموع الفرعي',
    'common.free': 'مجاني',
    'common.price': 'السعر',
    'common.toman': 'دولار',
    'common.currency': '$',
    'common.status': 'الحالة',
    'common.date': 'التاريخ',
    'common.filter': 'تصفية',
    'common.reset': 'إعادة ضبط',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.download': 'تحميل',
    'common.scientificEvidence': 'الأدلة العلمية',
    'common.safety': 'المحاذير وإرشادات السلامة',
    'common.whoIsFor': 'لمن يناسب هذا؟',
    'common.howItHelps': 'آلية العمل والتأثير',
    'common.verified': 'معتمد من المجلس العلمي لشمس',
    'common.sampleDataBadge': 'بيانات توضيحية تجريبية',

    // Health Program (Exclusively Green)
    'program.title': 'برنامج شمس الصحي المخصص (Health Program)',
    'program.subtitle': 'إرشادات مبنية على الأدلة السريرية مدفوعة بالتقييم الذكي وطب نمط الحياة',
    'program.step1': '١. التقييم الشامل',
    'program.step2': '٢. البرنامج الفردي المخصص',
    'program.step3': '٣. المكملات والتغذية المستهدفة',
    'program.step4': '٤. المتابعة والرصد الدوري',
    'program.calendar': 'جدول الأنشطة الأسبوعي',
    'program.todayTasks': 'مهام اليوم الإلزامية',
    'program.bookConsult': 'حجز استشارة سريرية متخصصة',

    // Homepage
    'home.hero.title1': 'افهم صحتك وتعرف عليها',
    'home.hero.title2': 'بأسلوب علمي وذكي',
    'home.hero.subtitle': 'تمكينك بتقييمات صحية مدعومة بالأدلة السريرية، ومكتبات معرفية موثوقة، وبرامج تدخل شخصية لأسلوب الحياة.',
    'home.hero.cta': 'بدء التقييم الصحي',
    'home.hero.programCta': 'البرنامج الصحي الفردي',
    'home.bioScore': 'المؤشر البيولوجي للصحة',
    'home.quickAssessmentTitle': 'ابدأ بتقييم حالتك الراهنة',
    'home.quickAssessmentSubtitle': 'قِس المؤشرات الحيوية بدقة عبر أدواتنا المعيارية ومقاييسنا السريرية.',
    'home.viewAllTools': 'عرض كافة الأدوات السريرية السبعة',
    'home.ecosystemTitle': 'المسار المتصل لمنظومة شمس',
    'home.ecosystemSubtitle': 'من التوعية والتقييم، إلى تصميم البرامج الصحية المتخصصة، واقتناء المنتجات المعتمدة، والمتابعة الدورية.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('shams_lang');
      if (stored === 'en' || stored === 'ar' || stored === 'fa') {
        return stored;
      }
    } catch {
      // fallback
    }
    return 'fa';
  });

  const dir: Direction = lang === 'en' ? 'ltr' : 'rtl';

  useEffect(() => {
    try {
      localStorage.setItem('shams_lang', lang);
    } catch {
      // ignore
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['fa']?.[key] || key;
  };

  const formatNumber = (n: number | string): string => {
    if (n === null || n === undefined) return '';
    if (typeof n === 'number') {
      return n.toLocaleString('en-US');
    }
    return n.toString();
  };

  const toPersianDigits = (n: number | string): string => {
    if (n === null || n === undefined) return '';
    const numStr = n.toString();
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return numStr.replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
  };

  const formatCurrency = (amount: number): string => {
    if (lang === 'en') {
      const usd = Math.round(amount / 60000);
      return `$${usd.toLocaleString('en-US')}`;
    }
    if (lang === 'ar') {
      const usd = Math.round(amount / 60000);
      return `${usd.toLocaleString('en-US')} $`;
    }
    return `${amount.toLocaleString('en-US')} تومان`;
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, t, formatNumber, toPersianDigits, formatCurrency }}>
      {children}
    </LanguageContext.Provider>
  );
};

const defaultLanguageContext: LanguageContextType = {
  lang: 'fa',
  dir: 'rtl',
  setLang: () => {},
  t: (key: string) => translations['fa']?.[key] || key,
  formatNumber: (n: number | string) => (n !== null && n !== undefined ? n.toString() : ''),
  toPersianDigits: (n: number | string) => (n !== null && n !== undefined ? n.toString() : ''),
  formatCurrency: (amount: number) => `${amount.toLocaleString('en-US')} تومان`,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return defaultLanguageContext;
  }
  return context;
};
