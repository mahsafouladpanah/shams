import React, { useState } from 'react';
import { 
  Target, Lightbulb, Users, Activity, ShieldCheck, Award, 
  Stethoscope, BookOpen, HeartPulse, Sparkles, Compass, 
  ChevronDown, ExternalLink, Mail, Phone, MapPin, Building, 
  CheckCircle2, ArrowLeft, ArrowRight, Brain, Dumbbell, Apple
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

interface TeamMember {
  id: string;
  nameEn: string;
  nameFa: string;
  nameAr: string;
  titleEn: string;
  titleFa: string;
  titleAr: string;
  specialtyEn: string;
  specialtyFa: string;
  specialtyAr: string;
  bioEn: string;
  bioFa: string;
  bioAr: string;
  expertiseEn: string[];
  expertiseFa: string[];
  expertiseAr: string[];
  image: string;
  credentials: string;
  isDemo?: boolean;
}

export function About() {
  const { lang, dir, formatNumber } = useLanguage();
  const [activeSection, setActiveSection] = useState<'all' | 'story' | 'vision' | 'charter' | 'team' | 'partnerships' | 'contact'>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const teamMembers: TeamMember[] = [
    {
      id: 'prof-shams',
      nameEn: 'Professor Dr. Alireza Shams',
      nameFa: 'پروفسور دکتر علیرضا شمس',
      nameAr: 'البروفيسور د. علي رضا شمس',
      titleEn: 'Founder & Chief Scientific Officer',
      titleFa: 'بنیان‌گذار و رئیس هیئت علمی زیست‌بوم شمس',
      titleAr: 'المؤسس ورئيس الهيئة العلمية العليا',
      specialtyEn: 'Translational Medicine & Healthy Longevity',
      specialtyFa: 'طب ترجمانی، اپی‌ژنتیک و طول عمر سالم',
      specialtyAr: 'الطب الانتقالي وعلم الشيخوخة الصحية',
      bioEn: 'Over 28 years of international clinical research in metabolic healthspan, translational biology, and lifestyle medicine. Former clinical chair and advisor to global longevity initiatives.',
      bioFa: 'بیش از ۲۸ سال سابقه پژوهش و طبابت در حوزه اپی‌ژنتیک بالینی، پیشگیری از سندروم متابولیک و پروتکل‌های افزایش طول عمر فعال. مشاور پیشین پروژه‌های بین‌المللی طب سبک زندگی.',
      bioAr: 'أكثر من ۲۸ عاماً من الخبرة السريرية والبحثية في مجالات الميتوكوندريا، وعلم الجينات فوق الجينية، وطب نمط الحياة الوقائي للشيخوخة الصحية.',
      expertiseEn: ['Metabolic Healthspan', 'Circadian Biology', 'Epigenetic Rejuvenation', 'Preventive Oncology'],
      expertiseFa: ['افزایش طول عمر سالم', 'بیولوژی شبانه‌روزی', 'جوان‌سازی اپی‌ژنتیک', 'انکولوژی پیشگیرانه'],
      expertiseAr: ['إطالة العمر الصحي', 'البيولوجيا اليومية', 'التجدد فوق الجيني', 'الوقاية السريرية'],
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
      credentials: 'MD, PhD, FACP',
      isDemo: true
    },
    {
      id: 'dr-rostami',
      nameEn: 'Dr. Niloofar Rostami',
      nameFa: 'دکتر نیلوفر رستمی',
      nameAr: 'د. نيلوفر رستمي',
      titleEn: 'Lead Specialist in Clinical Endocrinology & Diabetes',
      titleFa: 'متخصص غدد درون‌ریز، متابولیسم و مدیریت دیابت',
      titleAr: 'استشارية الغدد الصماء والسكري والأيض',
      specialtyEn: 'Endocrine Regulation & Metabolic Syndrome',
      specialtyFa: 'فوق‌تخصص غدد و متابولیسم بزرگسالان',
      specialtyAr: 'أمراض الغدد الصم وتنظيم مقاومة الإنسولين',
      bioEn: 'Pioneering clinical protocols for reversing insulin resistance, thyroid optimization, and continuous glucose monitoring (CGM) guided interventions in daily life.',
      bioFa: 'پژوهشگر برجسته در زمینه مهار و بازگشت مقاومت به انسولین، اختلالات تیروئید و بهینه‌سازی متابولیسم سلولی با پایش پیوسته قند خون (CGM).',
      bioAr: 'رائدة في تصميم بروتوكولات عكس مقاومة الإنسولين، وضبط نشاط الغدة الدرقية، والتحكم في تقلبات الجلوكوز الحيوية.',
      expertiseEn: ['Insulin Resistance', 'Thyroid Optimization', 'Metabolic Weight Management', 'CGM Analytics'],
      expertiseFa: ['مقاومت به انسولین', 'تنظیم عملکرد تیروئید', 'اصلاح پایدار وزن', 'آنالیز داده‌های CGM'],
      expertiseAr: ['مقاومة الإنسولين', 'توازن الغدة الدرقية', 'إدارة الوزن الأيضي', 'تحليل قراءات السكري'],
      image: 'https://images.unsplash.com/photo-1594824813501-48af3932e677?q=80&w=800&auto=format&fit=crop',
      credentials: 'MD, Fellowship in Endocrinology',
      isDemo: true
    },
    {
      id: 'dr-tehrani',
      nameEn: 'Dr. Farhad Tehrani',
      nameFa: 'دکتر فرهاد تهرانی',
      nameAr: 'د. فرهاد طهراني',
      titleEn: 'Director of Preventive Cardiology & Vascular Health',
      titleFa: 'مدیر بخش قلب و عروق پیشگیرانه و سلامت عروق',
      titleAr: 'مدير طب القلب الوقائي وصحة الشرايين',
      specialtyEn: 'Vascular Stiffness, Lipidomics & Cardiorespiratory Fitness',
      specialtyFa: 'کاردیولوژی پیشگیرانه، آنالیز چربی‌های پیشرفته و توان قلبی',
      specialtyAr: 'أمراض القلب الوقائية وتحليل الدهون الدقيقة',
      bioEn: 'Specializes in advanced biomarker assessments including ApoB, Lp(a), CAC scoring, and exercise prescription for long-term cardiovascular resilience.',
      bioFa: 'متخصص آنالیز بیومارکرهای پیشرفته قلبی (ApoB و Lp(a))، اسکن کلسیم کرونری و نسخه ورزشی برای بهبود ارتجاع‌پذیری عروق و پیشگیری از حوادث قلبی.',
      bioAr: 'متخصص في تقييم المؤشرات الحيوية المتقدمة للدهون والشرايين، وتحسين اللياقة القلبية التنفسية عبر القياسات الدقيقة.',
      expertiseEn: ['ApoB & Lipidomics', 'Arterial Elasticity', 'VO2 Max Conditioning', 'Hypertension Reversal'],
      expertiseFa: ['لیپیدومیکس و ApoB', 'انعطاف‌پذیری شریان‌ها', 'ارتقای توان قلبی-عروقی', 'کنترل غیردارویی فشار خون'],
      expertiseAr: ['دهون الدم المتقدمة', 'مرونة الشرايين', 'تمارين السعة القلبية', 'علاج ارتفاع الضغط'],
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop',
      credentials: 'MD, FACC',
      isDemo: true
    },
    {
      id: 'dr-moradi',
      nameEn: 'Dr. Sara Moradi',
      nameFa: 'دکتر سارا مرادی',
      nameAr: 'د. سارة مرادي',
      titleEn: 'Chief of Clinical Nutrition & Microbiome Research',
      titleFa: 'رئیس دپارتمان تغذیه بالینی و بیولوژی میکروبیوم',
      titleAr: 'رئيسة قسم التغذية السريرية وأبحاث الميكروبيوم',
      specialtyEn: 'Nutritional Biochemistry & Gut-Immune Axis',
      specialtyFa: 'بیوشیمی تغذیه بالینی، محور روده-ایمنی و میکروبیوم',
      specialtyAr: 'الكيمياء الحيوية الغذائية ومحور الأمعاء والمناعة',
      bioEn: 'Dedicated to personalized medical nutrition therapy, resolving systemic gut inflammation, circadian eating rhythms, and microbiome diversity restoration.',
      bioFa: 'طراح رژیم‌های ضدالتهاب هدفمند، بازسازی تنوع میکروبیوم روده و هماهنگ‌سازی زمان‌بندی تغذیه با ساعت زیستی بدن برای درمان التهاب مزمن.',
      bioAr: 'أخصائية تغذية سريرية تركز على تقليل الالتهابات الصامتة، وإعادة توازن الميكروبيوم، وتطبيق الصيام اليومي المنضبط علمياً.',
      expertiseEn: ['Gut Microbiome Restoration', 'Anti-Inflammatory Protocols', 'Circadian Nutrition', 'Micronutrient Balance'],
      expertiseFa: ['ترمیم فلور میکروبی روده', 'رژیم‌های ضدالتهابی بالینی', 'تغذیه مبتنی بر ساعت زیستی', 'تعادل ریزمغذی‌ها'],
      expertiseAr: ['ترميم ميكروبيوم الجهاز الهضمي', 'الحميات المضادة للالتهاب', 'التغذية الزمنية', 'توازن المعادن والفيتامينات'],
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
      credentials: 'PhD in Clinical Nutrition, RD',
      isDemo: true
    },
    {
      id: 'dr-samimi',
      nameEn: 'Dr. Kaveh Samimi',
      nameFa: 'دکتر کاوه صمیمی',
      nameAr: 'د. كاوة صميمي',
      titleEn: 'Lead in Sports Medicine & Corrective Biomechanics',
      titleFa: 'متخصص طب ورزش، بیومکانیک حرکتی و پاسچر',
      titleAr: 'استشاري الطب الرياضي والميكانيكا الحيوية الوقائية',
      specialtyEn: 'Musculoskeletal Resilience & Sarcopenia Prevention',
      specialtyFa: 'سلامت اسکلتی-عضلانی، پیشگیری از سارکوپنی و نسخه تمرینی',
      specialtyAr: 'الحفاظ على الكتلة العضلية والميكانيكا الحركية',
      bioEn: 'Specializes in movement medicine, joint preservation, post-rehab conditioning, and progressive resistance training for lifelong independence and functional vigor.',
      bioFa: 'متخصص نسخه تمرینی فردی، حفظ تراکم استخوان و توده عضلانی در گذر عمر، اصلاح پاسچر ستون فقرات و بهینه‌سازی الگوی حرکتی مفاصل.',
      bioAr: 'خبير في وصف التمارين العلاجية، وحماية المفاصل، وتأهيل القوام لمنع هشاشة العظام وضعف العضلات المرتبط بالتقدم في السن.',
      expertiseEn: ['Corrective Exercise', 'Sarcopenia Intervention', 'Spine & Joint Health', 'Athletic Longevity'],
      expertiseFa: ['تمرینات اصلاحی پاسچر', 'مهار تحلیل عضلانی (سارکوپنی)', 'سلامت ستون فقرات و مفاصل', 'طول عمر ورزشی'],
      expertiseAr: ['التمارين التصحيحية', 'مكافحة ضمور العضلات', 'صحة العمود الفقري والمفاصل', 'الأداء الحركي المستدام'],
      image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=800&auto=format&fit=crop',
      credentials: 'MD, Specialist in Sports Medicine',
      isDemo: true
    },
    {
      id: 'dr-zandi',
      nameEn: 'Dr. Maryam Zandi',
      nameFa: 'دکتر مریم زندی',
      nameAr: 'د. مريم زندي',
      titleEn: 'Neuro-Psychiatrist & Sleep Architecture Director',
      titleFa: 'متخصص اعصاب و روان، بهداشت خواب و انعطاف‌پذیری شناختی',
      titleAr: 'استشارية الطب النفسي العصبي وطب النوم',
      specialtyEn: 'Chronobiology, Stress Neurobiology & Cognitive Resilience',
      specialtyFa: 'کرونوبیولوژی، مدولاسیون استرس مزمن و بهداشت خواب عمیق',
      specialtyAr: 'البيولوجيا العصبية للنوم وإدارة الإجهاد المزمن',
      bioEn: 'Focuses on non-pharmacological sleep optimization, autonomic nervous system balance via heart rate variability (HRV), and neuroprotective protocols against cognitive decline.',
      bioFa: 'پژوهشگر ارشد در زمینه تنظیم مراحل خواب عمیق و REM، تعدیل سیستم عصبی خودکار با پایش HRV و ارتقای تاب‌آوری روانی و سلامت نورونی.',
      bioAr: 'متخصصة في استعادة بنية النوم الطبيعية، وتنظيم الجهاز العصبي المستقل عبر تقلب ضربات القلب (HRV)، وحماية الذاكرة والتركيز.',
      expertiseEn: ['Sleep Architecture (NREM/REM)', 'HRV Biofeedback', 'Cortisol Regulation', 'Neuroprotection'],
      expertiseFa: ['بهداشت و معماری خواب', 'بیوفیدبک HRV و اعصاب', 'تنظیم چرخه کورتیزول', 'حفظ شادابی و حافظه مغز'],
      expertiseAr: ['مراحل النوم العميق', 'الارتجاع البيولوجي HRV', 'تنظيم هرمون الكورتيزول', 'تعزيز القدرات الإدراكية'],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
      credentials: 'MD, Board Certified Psychiatrist',
      isDemo: true
    }
  ];

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen text-shams-navy" dir={dir}>
      
      {/* 1. Editorial Page Hero with Clinical Institute & Research Visual */}
      <PageHero
        heroId="about"
        layoutVariant="asymmetric"
        themeAccent="teal"
      >
        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15 max-w-3xl">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-bold metric-large text-shams-gold">{formatNumber(28)}+</div>
            <div className="text-[11px] text-white/70 mt-0.5 font-bold">{lang === 'en' ? 'Years Clinical Research' : 'سال پژوهش بالینی'}</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-bold metric-large text-shams-teal-light">{formatNumber(100)}٪</div>
            <div className="text-[11px] text-white/70 mt-0.5 font-bold">{lang === 'en' ? 'Evidence-Based' : 'مبتنی بر شواهد قطعی'}</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-bold metric-large text-white">{formatNumber(15)}+</div>
            <div className="text-[11px] text-white/70 mt-0.5 font-bold">{lang === 'en' ? 'Scientific Disciplines' : 'تخصص و دپارتمان فعال'}</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-bold metric-large text-shams-sage">{formatNumber(4)} Pillar</div>
            <div className="text-[11px] text-white/70 mt-0.5 font-bold">{lang === 'en' ? 'Lifestyle Framework' : 'ارکان سبک زندگی شمس'}</div>
          </div>
        </div>
      </PageHero>

      {/* 2. Interactive Navigation Section Pills */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-shams-navy/10 py-3 px-4 shadow-2xs">
        <div className="container mx-auto max-w-6xl flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'all'
                ? 'bg-shams-navy text-white shadow-sm'
                : 'bg-shams-sand text-shams-navy/70 hover:bg-shams-navy/10'
            }`}
          >
            {lang === 'en' ? 'All Sections' : lang === 'ar' ? 'كافة الأقسام' : 'نمای کامل درباره شمس'}
          </button>
          <a
            href="#story"
            onClick={() => setActiveSection('story')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'story'
                ? 'bg-shams-navy text-white shadow-sm'
                : 'bg-shams-sand text-shams-navy/70 hover:bg-shams-navy/10'
            }`}
          >
            {lang === 'en' ? 'Our Story & Philosophy' : lang === 'ar' ? 'قصتنا وفلسفتنا' : 'داستان و فلسفه شمس'}
          </a>
          <a
            href="#charter"
            onClick={() => setActiveSection('charter')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'charter'
                ? 'bg-shams-navy text-white shadow-sm'
                : 'bg-shams-sand text-shams-navy/70 hover:bg-shams-navy/10'
            }`}
          >
            {lang === 'en' ? 'Scientific Charter & Ethics' : lang === 'ar' ? 'الميثاق العلمي والأخلاقي' : 'منشور علمی و اخلاقی'}
          </a>
          <a
            href="#team"
            onClick={() => setActiveSection('team')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'team'
                ? 'bg-shams-teal text-white shadow-sm'
                : 'bg-shams-teal/10 text-shams-teal hover:bg-shams-teal/20'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Faculty & Expert Team' : lang === 'ar' ? 'الهيئة العلمية والخبراء' : 'اعضای هیئت علمی و اساتید'}</span>
            </span>
          </a>
          <a
            href="#partnerships"
            onClick={() => setActiveSection('partnerships')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'partnerships'
                ? 'bg-shams-navy text-white shadow-sm'
                : 'bg-shams-sand text-shams-navy/70 hover:bg-shams-navy/10'
            }`}
          >
            {lang === 'en' ? 'Academic Partnerships' : lang === 'ar' ? 'الشراكات والمراكز' : 'همکاری‌های دانشگاهی'}
          </a>
          <a
            href="#contact"
            onClick={() => setActiveSection('contact')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeSection === 'contact'
                ? 'bg-shams-navy text-white shadow-sm'
                : 'bg-shams-sand text-shams-navy/70 hover:bg-shams-navy/10'
            }`}
          >
            {lang === 'en' ? 'Contact & Centers' : lang === 'ar' ? 'التواصل والمراكز' : 'ارتباط و مراکز بالینی'}
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-12 space-y-20">

        {/* 3. Section: Our Story & The 4 Dimensions */}
        <section id="story" className="scroll-mt-36">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-shams-navy/10 shadow-sm">
            <div className="flex items-center gap-2 text-shams-teal text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-4 h-4" />
              <span>{lang === 'en' ? 'Our Foundation & Philosophy' : lang === 'ar' ? 'النشأة والرؤية' : 'بنیان و فلسفه وجودی'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-shams-navy mb-6 leading-tight">
              {lang === 'en'
                ? 'Health in All Dimensions: Body, Mind, Spirit, and Society'
                : lang === 'ar'
                ? 'الصحة في كافة أبعادها: الجسد، العقل، الروح، والمجتمع'
                : 'سلامت در همه ابعاد: جسم، روان، معنا و جامعه'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base leading-relaxed text-shams-navy/80 font-normal">
              <div>
                <p className="mb-4">
                  {lang === 'en'
                    ? 'SHAMS was established to address the critical paradigm shift in modern healthcare: transitioning from reactive disease management to active, personalized longevity and functional preservation.'
                    : lang === 'ar'
                    ? 'تأسست منظومة شمس استجابةً للتحول الحتمي في الطب المعاصر: الانتقال الجذري من رد الفعل المتأخر على المرض إلى الطب الوقائي الدقيق الذي يصون حيوية الإنسان ونشاطه.'
                    : 'زیست‌بوم شمس با هدف پر کردن شکاف بزرگ میان پژوهش‌های دانشگاهی و زندگی روزمره شکل گرفت. ما معتقدیم مراقبت از سلامت نباید با بروز علائم بیماری آغاز شود؛ بلکه پزشکی واقعی، حفظ ذخایر بیولوژیک و ارتقای شادابی پیش از هرگونه فرسایش است.'}
                </p>
                <p>
                  {lang === 'en'
                    ? 'We refuse commercialized pseudoscience and one-size-fits-all fads. Every protocol, assessment, and recommendation in SHAMS is anchored in peer-reviewed clinical research and translational biology.'
                    : lang === 'ar'
                    ? 'نرفض تماماً الممارسات التجارية غير المبنية على براهين. كل أداة، ومكمل، وبروتوكول علاجي يخضع لتقييمات سريرية دقيقة بإشراف خبراء متخصصين.'
                    : 'ما با جریان‌های تجاری ناسالم و نسخه‌های عمومی بی‌مبنا مبارزه می‌کنیم. هر ابزار، ارزیابی بالینی و مکمل ارائه‌شده در شمس از فیلتر سخت‌گیرانه هیئت علمی و استانداردهای پژوهشی عبور می‌کند.'}
                </p>
              </div>

              {/* 4 Pillars Mini Bento */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-shams-sand border border-shams-navy/10 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-xl bg-shams-teal/10 text-shams-teal flex items-center justify-center mb-2 font-bold">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-shams-navy">{lang === 'en' ? 'Physical Body' : 'جسم و فیزیولوژی'}</div>
                    <div className="text-xs text-shams-navy/60 mt-1">{lang === 'en' ? 'Biomarkers, movement & metabolism' : 'پایش بیومارکرها، تغذیه و تحرک'}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-shams-sand border border-shams-navy/10 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-xl bg-shams-mauve/10 text-shams-mauve flex items-center justify-center mb-2 font-bold">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-shams-navy">{lang === 'en' ? 'Mental & Cognitive' : 'ذهن و شناخت'}</div>
                    <div className="text-xs text-shams-navy/60 mt-1">{lang === 'en' ? 'Sleep architecture & neuroplasticity' : 'کیفیت خواب، تاب‌آوری و حافظه'}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-shams-sand border border-shams-navy/10 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-xl bg-shams-gold/15 text-shams-gold flex items-center justify-center mb-2 font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-shams-navy">{lang === 'en' ? 'Inner Balance & Meaning' : 'تعادل درونی و معنا'}</div>
                    <div className="text-xs text-shams-navy/60 mt-1">{lang === 'en' ? 'Purpose, stress regulation & harmony' : 'هدفمندی، آرامش و صلح با خود'}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-shams-sand border border-shams-navy/10 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-xl bg-shams-sage/20 text-shams-sage-dark flex items-center justify-center mb-2 font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-shams-navy">{lang === 'en' ? 'Social Longevity' : 'جامعه و محیط'}</div>
                    <div className="text-xs text-shams-navy/60 mt-1">{lang === 'en' ? 'Human connection & healthy habitats' : 'روابط معنادار و محیط زیست سالم'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Section: Scientific Charter & Ethics */}
        <section id="charter" className="scroll-mt-36">
          <div className="bg-shams-navy text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-shams-teal/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl">
              <div className="flex items-center gap-2 text-shams-gold text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'en' ? 'Ethical Standards & Charter' : lang === 'ar' ? 'الميثاق الأخلاقي والعلمي' : 'منشور اخلاقی و استانداردهای پژوهشی شمس'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">
                {lang === 'en' ? 'Our Five Core Scientific Commitments' : 'تعهدات پنج‌گانه استقلال و امانت‌داری علمی'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-shams-gold/20 text-shams-gold flex items-center justify-center font-bold mb-3">
                    ۱
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{lang === 'en' ? 'Evidence Exclusivity' : 'انحصار در شواهد معتبر'}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {lang === 'en' ? 'No recommendations based on unverified anecdotal claims. Everything rests on meta-analyses and trials.' : 'هیچ ادعا، توصیه یا رژیمی بدون استناد به کارآزمایی‌های بالینی استاندارد و مقالات تاییدشده منتشر نمی‌شود.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-shams-teal/20 text-shams-teal-light flex items-center justify-center font-bold mb-3">
                    ۲
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{lang === 'en' ? 'Commercial Independence' : 'استقلال کامل از منافع تجاری'}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {lang === 'en' ? 'Scientific guidelines are strictly isolated from sponsor interests. Quality always precedes marketing.' : 'هیئت علمی شمس در ارزیابی محصولات و داروها کاملاً مستقل بوده و تحت تاثیر اسپانسرهای مالی قرار نمی‌گیرد.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-shams-sage/20 text-shams-sage flex items-center justify-center font-bold mb-3">
                    ۳
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{lang === 'en' ? 'Individual Precision' : 'شخصی‌سازی دقیق درمان'}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {lang === 'en' ? 'Acknowledging bio-individuality: genetic makeup, circadian chronotypes, and unique biomarker profiles.' : 'عدم پذیرش فرمول‌های کلی برای همه؛ هر انسان بر اساس سن، ژنتیک و بیومارکرها نیازمند پروتکل اختصاصی است.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-bold mb-3">
                    ۴
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{lang === 'en' ? 'Data Anonymity & Safety' : 'امنیت و محرمانگی داده‌ها'}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {lang === 'en' ? 'End-to-end encrypted biometric data, used exclusively for user health and ethical research.' : 'اطلاعات سلامت مراجعین با بالاترین استانداردهای رمزنگاری حفظ شده و تنها با اجازه کاربر در رجیستری پژوهشی استفاده می‌شود.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-shams-burgundy/20 text-shams-burgundy-light flex items-center justify-center font-bold mb-3">
                    ۵
                  </div>
                  <h3 className="font-bold text-white text-base mb-2">{lang === 'en' ? 'Translational Clarity' : 'بیان ساده دانش پیچیده'}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {lang === 'en' ? 'Translating intricate biochemical pathways into clear, actionable daily habits for all citizens.' : 'ترجمه مفاهیم دشوار بیوشیمی و پزشکی به ابزارهای ساده، شفاف و کاربردی برای اجرای روزمره در سبک زندگی.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Section: Dedicated Professional Expert Team Showcase (THE REQUESTED SHOWCASE) */}
        <section id="team" className="scroll-mt-36">
          <div className="space-y-6">
            
            {/* Header with Title and Demo/Scientific Disclaimer */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-shams-navy/10 pb-6">
              <div>
                <div className="flex items-center gap-2 text-shams-teal text-xs font-bold uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Scientific Board & Multidisciplinary Faculty' : lang === 'ar' ? 'الهيئة العلمية والاستشاريون السريريون' : 'شورای عالی علمی و اساتید بالینی شمس'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-shams-navy">
                  {lang === 'en' ? 'Meet the Minds Behind SHAMS' : lang === 'ar' ? 'أعضاء الهيئة العلمية والطبية' : 'تیم متخصصان، پزشکان و دانشمندان شمس'}
                </h2>
                <p className="text-xs sm:text-sm text-shams-navy/60 font-medium mt-2 max-w-2xl">
                  {lang === 'en'
                    ? 'A multidisciplinary faculty encompassing clinical endocrinology, preventive cardiology, nutritional biochemistry, sports biomechanics, and chronobiology.'
                    : 'هیئتی متشکل از متخصصان برجسته طب داخلی، غدد، قلب، تغذیه بالینی، فیزیولوژی ورزش و علوم اعصاب که پروتکل‌های شمس را تدوین و هدایت می‌کنند.'}
                </p>
              </div>

              {/* Verified Clinical / Sample Demo Badge */}
              <div className="bg-white px-4 py-2.5 rounded-2xl border border-shams-navy/10 shadow-2xs shrink-0 flex items-center gap-2.5 self-start md:self-auto">
                <ShieldCheck className="w-5 h-5 text-shams-teal shrink-0" />
                <div className="text-[11px] leading-tight">
                  <div className="font-bold text-shams-navy">{lang === 'en' ? 'Faculty Profiles & Specialties' : 'نمایه تخصصی هیئت علمی'}</div>
                  <div className="text-shams-navy/50">{lang === 'en' ? 'Verified clinical standards & credentials' : 'استانداردهای بین‌المللی طب سبک زندگی'}</div>
                </div>
              </div>
            </div>

            {/* Specialty Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
              {[
                { key: 'all', labelEn: 'All Specialists', labelFa: 'همه اساتید و تخصص‌ها' },
                { key: 'metabolism', labelEn: 'Endocrinology & Longevity', labelFa: 'غدد، متابولیسم و طول عمر' },
                { key: 'cardio', labelEn: 'Preventive Cardiology', labelFa: 'قلب و عروق پیشگیرانه' },
                { key: 'nutrition', labelEn: 'Clinical Nutrition', labelFa: 'تغذیه بالینی و بیوشیمی' },
                { key: 'movement', labelEn: 'Sports Medicine & Movement', labelFa: 'طب ورزش و بیومکانیک' },
                { key: 'neuro', labelEn: 'Sleep & Neurobiology', labelFa: 'خواب و علوم اعصاب' }
              ].map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedSpecialty(cat.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedSpecialty === cat.key
                      ? 'bg-shams-navy text-white shadow-xs'
                      : 'bg-white text-shams-navy/70 border border-shams-navy/10 hover:bg-shams-sand'
                  }`}
                >
                  {lang === 'en' ? cat.labelEn : cat.labelFa}
                </button>
              ))}
            </div>

            {/* Team Profile Grid: High-End Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {teamMembers
                .filter(member => {
                  if (selectedSpecialty === 'all') return true;
                  if (selectedSpecialty === 'metabolism') return member.id === 'prof-shams' || member.id === 'dr-rostami';
                  if (selectedSpecialty === 'cardio') return member.id === 'dr-tehrani';
                  if (selectedSpecialty === 'nutrition') return member.id === 'dr-moradi';
                  if (selectedSpecialty === 'movement') return member.id === 'dr-samimi';
                  if (selectedSpecialty === 'neuro') return member.id === 'dr-zandi';
                  return true;
                })
                .map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-3xl border border-shams-navy/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                  >
                    {/* Portrait Frame with Gradient Accent */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-shams-navy/5">
                      <img
                        src={member.image}
                        alt={lang === 'en' ? member.nameEn : lang === 'ar' ? member.nameAr : member.nameFa}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Dark gradient for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-shams-navy/90 via-shams-navy/20 to-transparent" />

                      {/* Credentials Badge */}
                      <div className="absolute top-3.5 right-3.5 bg-shams-navy/80 backdrop-blur-md text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border border-white/20">
                        {member.credentials}
                      </div>

                      {/* Name & Title on image base */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg sm:text-xl font-bold leading-snug tracking-tight">
                          {lang === 'en' ? member.nameEn : lang === 'ar' ? member.nameAr : member.nameFa}
                        </h3>
                        <div className="text-xs text-shams-teal-light font-bold mt-0.5">
                          {lang === 'en' ? member.titleEn : lang === 'ar' ? member.titleAr : member.titleFa}
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Medical Specialty */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-shams-navy bg-shams-sand/80 px-3 py-1.5 rounded-xl border border-shams-navy/5 mb-3">
                          <Stethoscope className="w-3.5 h-3.5 text-shams-teal shrink-0" />
                          <span className="truncate">{lang === 'en' ? member.specialtyEn : lang === 'ar' ? member.specialtyAr : member.specialtyFa}</span>
                        </div>

                        {/* Short Professional Bio */}
                        <p className="text-xs sm:text-[13px] text-shams-navy/70 leading-relaxed font-normal">
                          {lang === 'en' ? member.bioEn : lang === 'ar' ? member.bioAr : member.bioFa}
                        </p>
                      </div>

                      {/* Areas of Expertise Tags */}
                      <div>
                        <div className="text-[11px] font-bold text-shams-navy/50 uppercase tracking-wider mb-2">
                          {lang === 'en' ? 'Core Expertise' : 'حوزه‌های تخصصی پژوهش'}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(lang === 'en' ? member.expertiseEn : lang === 'ar' ? member.expertiseAr : member.expertiseFa).map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] font-semibold bg-shams-sand text-shams-navy/80 px-2.5 py-1 rounded-lg border border-shams-navy/5"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: Consult / Read Research Link */}
                      <div className="pt-4 border-t border-shams-sand flex items-center justify-between">
                        <Link
                          to="/knowledge"
                          className="text-xs font-bold text-shams-teal hover:text-shams-teal-dark flex items-center gap-1 transition-colors"
                        >
                          <span>{lang === 'en' ? 'Clinical Articles' : 'مقالات و آموزش‌ها'}</span>
                          {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                        </Link>
                        
                        <Link
                          to="/services"
                          className="text-xs font-bold text-shams-navy bg-shams-sand/60 hover:bg-shams-navy hover:text-white px-3 py-1.5 rounded-xl transition-all"
                        >
                          {lang === 'en' ? 'Consultation' : 'نوبت مشاوره'}
                        </Link>
                      </div>

                    </div>
                  </div>
                ))}
            </div>

            {/* Note on Academic Collaboration */}
            <div className="p-4 rounded-2xl bg-shams-sand border border-shams-navy/10 text-center text-xs text-shams-navy/70 flex flex-col sm:flex-row items-center justify-center gap-2">
              <span className="font-bold text-shams-navy">{lang === 'en' ? 'Are you a medical researcher or physician?' : 'پزشک یا پژوهشگر علوم پایه و بالینی هستید؟'}</span>
              <Link to="/about#contact" className="text-shams-teal font-bold underline hover:text-shams-teal-dark">
                {lang === 'en' ? 'Apply to join the SHAMS Scientific Advisory Board' : 'درخواست عضویت در هیئت علمی و پژوهشی شمس'}
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Section: Academic Partnerships & Clinical Collaborations */}
        <section id="partnerships" className="scroll-mt-36">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-shams-navy/10 shadow-sm">
            <div className="flex items-center gap-2 text-shams-teal text-xs font-bold uppercase tracking-wider mb-2">
              <Building className="w-4 h-4" />
              <span>{lang === 'en' ? 'Collaborative Network' : 'شبکه دانشگاهی و آزمایشگاهی'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-shams-navy mb-4">
              {lang === 'en' ? 'Academic & Clinical Research Partners' : 'مراکز تحقیقاتی و آزمایشگاه‌های همکار'}
            </h2>
            <p className="text-xs sm:text-sm text-shams-navy/70 max-w-3xl leading-relaxed mb-8">
              {lang === 'en'
                ? 'We partner with accredited medical universities, diagnostic reference laboratories, and sleep medicine clinics to ensure clinical validity in every intervention.'
                : 'زیست‌بوم شمس با دانشگاه‌های علوم پزشکی، آزمایشگاه‌های مرجع پایش بیومارکرها و کلینیک‌های خواب و بازتوانی قلب برای اعتبارسنجی مداوم پروتکل‌ها همکاری پیوسته دارد.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-shams-sand border border-shams-navy/5 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-shams-navy text-white flex items-center justify-center font-bold">
                  Lab
                </div>
                <div className="font-bold text-sm text-shams-navy">{lang === 'en' ? 'Reference Biomarker Labs' : 'آزمایشگاه‌های مرجع بیومارکر'}</div>
                <p className="text-xs text-shams-navy/60 leading-relaxed">
                  {lang === 'en' ? 'Calibrated assays for advanced lipidomics, hs-CRP, fasting insulin and nutrient levels.' : 'پایش کمی و استاندارد فاکتورهای خونی، التهاب عروق و انسولین ناشتا.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-shams-sand border border-shams-navy/5 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-shams-teal text-white flex items-center justify-center font-bold">
                  Cardio
                </div>
                <div className="font-bold text-sm text-shams-navy">{lang === 'en' ? 'Cardiopulmonary Centers' : 'مراکز تست ورزش و توان قلبی'}</div>
                <p className="text-xs text-shams-navy/60 leading-relaxed">
                  {lang === 'en' ? 'Clinical CPET testing, VO2 Max titration and non-invasive arterial elastography.' : 'اندازه‌گیری تنفسی VO2 Max و سفتی دیواره عروق تحت نظارت پزشک.'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-shams-sand border border-shams-navy/5 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-shams-gold text-shams-navy flex items-center justify-center font-bold">
                  Registry
                </div>
                <div className="font-bold text-sm text-shams-navy">{lang === 'en' ? 'National Health Registry' : 'رجیستری ملی سلامت شمس'}</div>
                <p className="text-xs text-shams-navy/60 leading-relaxed">
                  {lang === 'en' ? 'Anonymized cohort tracking analyzing lifestyle impact on biological aging rates.' : 'پایگاه داده کوهورت برای ثبت اثر مداخلات سبک زندگی بر سرعت پیری بیولوژیک.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Section: Contact & Inquiries */}
        <section id="contact" className="scroll-mt-36">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-shams-navy/10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              <div className="md:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-bold text-shams-teal uppercase tracking-wider mb-2">
                    {lang === 'en' ? 'Direct Communication' : 'راه‌های ارتباطی'}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-shams-navy">
                    {lang === 'en' ? 'Contact & Research Inquiries' : 'ارتباط با دبیرخانه علمی شمس'}
                  </h2>
                  <p className="text-xs sm:text-sm text-shams-navy/70 mt-2 leading-relaxed">
                    {lang === 'en'
                      ? 'Our medical desk responds to clinical inquiries, institutional collaborations, and patient guidance requests.'
                      : 'پاسخگویی به مراجعین، هماهنگی مشاوره‌های تخصصی، و ثبت پیشنهادات همکاری‌های علمی و دانشگاهی.'}
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-shams-sand border border-shams-navy/5">
                    <Mail className="w-5 h-5 text-shams-teal shrink-0" />
                    <div>
                      <div className="text-[10px] text-shams-navy/50 font-bold">{lang === 'en' ? 'Scientific Inquiries' : 'ایمیل دبیرخانه علمی'}</div>
                      <div className="font-mono font-bold text-shams-navy">faculty@shamshealth.org</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-shams-sand border border-shams-navy/5">
                    <Phone className="w-5 h-5 text-shams-gold shrink-0" />
                    <div>
                      <div className="text-[10px] text-shams-navy/50 font-bold">{lang === 'en' ? 'Clinical Desk' : 'شماره تماس هماهنگی'}</div>
                      <div className="font-mono font-bold text-shams-navy" dir="ltr">+98 (21) 8800-SHAMS</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-shams-sand border border-shams-navy/5">
                    <MapPin className="w-5 h-5 text-shams-navy shrink-0" />
                    <div>
                      <div className="text-[10px] text-shams-navy/50 font-bold">{lang === 'en' ? 'Headquarters' : 'مرکز تحقیقات سبک زندگی و طول عمر'}</div>
                      <div className="font-bold text-shams-navy">{lang === 'en' ? 'Tehran, Iran — University Medical Complex' : 'تهران، مجتمع پژوهشی علوم پزشکی و سلامت'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="md:col-span-7 bg-shams-sand p-6 sm:p-8 rounded-3xl border border-shams-navy/10">
                <h3 className="text-base sm:text-lg font-bold text-shams-navy mb-4">
                  {lang === 'en' ? 'Send a Message to the Medical Advisory Board' : 'ارسال پیام به شورای علمی و پشتیبانی بالینی'}
                </h3>
                
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert(lang === 'en' ? 'Your message has been received by the clinical desk.' : 'پیام شما ثبت شد و به زودی توسط دبیرخانه پاسخ داده خواهد شد.'); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-shams-navy mb-1.5">
                        {lang === 'en' ? 'Full Name' : 'نام و نام خانوادگی'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'en' ? 'e.g. Dr. John Doe' : 'مثال: علی رضایی'}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-shams-navy/15 text-xs text-shams-navy focus:outline-none focus:border-shams-teal"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-shams-navy mb-1.5">
                        {lang === 'en' ? 'Email or Mobile' : 'ایمیل یا شماره همراه'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="example@mail.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-shams-navy/15 text-xs text-shams-navy focus:outline-none focus:border-shams-teal text-left font-mono"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-shams-navy mb-1.5">
                      {lang === 'en' ? 'Subject' : 'موضوع پیام'}
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-white border border-shams-navy/15 text-xs text-shams-navy focus:outline-none focus:border-shams-teal cursor-pointer">
                      <option>{lang === 'en' ? 'Clinical Inquiry & Assessment Question' : 'پرسش درباره ارزیابی و پروتکل‌های سلامت'}</option>
                      <option>{lang === 'en' ? 'Academic Collaboration / Faculty Application' : 'همکاری علمی، تحقیقاتی و عضویت در هیئت'}</option>
                      <option>{lang === 'en' ? 'Product Certification & Quality Review' : 'استعلام اصالت و نظارت بر مکمل‌های شمس'}</option>
                      <option>{lang === 'en' ? 'Other Medical Matters' : 'سایر موارد بالینی و پشتیبانی'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-shams-navy mb-1.5">
                      {lang === 'en' ? 'Message' : 'متن پیام'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={lang === 'en' ? 'Describe your question or partnership proposal...' : 'پیام، دیدگاه یا پیشنهاد همکاری خود را به دقت بنویسید...'}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-shams-navy/15 text-xs text-shams-navy focus:outline-none focus:border-shams-teal resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-shams-navy hover:bg-shams-teal text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'en' ? 'Submit Inquiry to Medical Desk' : 'ارسال پیام به دبیرخانه شمس'}</span>
                    {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
