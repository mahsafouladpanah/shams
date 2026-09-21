import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sampleDiseases } from '../data/diseases';
import { sampleProducts } from '../data/products';

interface BreadcrumbsProps {
  customLastLabel?: string;
  variant?: 'auto' | 'light' | 'dark';
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function Breadcrumbs({ customLastLabel, variant = 'auto', className = '' }: BreadcrumbsProps) {
  const location = useLocation();
  const { lang, isRTL } = useLanguage();
  const pathname = location.pathname;

  // Do not render breadcrumbs on root Home page
  if (pathname === '/' || pathname === '') {
    return null;
  }

  const items: BreadcrumbItem[] = [
    {
      label: lang === 'en' ? 'Home' : lang === 'ar' ? 'الرئيسية' : 'خانه',
      path: '/',
    },
  ];

  const pathSegments = pathname.split('/').filter(Boolean);

  // Build hierarchy based on path structure
  if (pathSegments[0] === 'knowledge') {
    items.push({
      label: lang === 'en' ? 'Knowledge' : lang === 'ar' ? 'المعرفة' : 'دانش',
      path: pathSegments.length > 1 ? '/knowledge' : undefined,
    });

    if (pathSegments[1] === 'diseases') {
      items.push({
        label: lang === 'en' ? 'Disease Bank' : lang === 'ar' ? 'بنك الأمراض' : 'بانک بیماری‌ها',
        path: pathSegments.length > 2 ? '/knowledge/diseases' : undefined,
      });

      if (pathSegments[2]) {
        const diseaseId = pathSegments[2];
        const disease = sampleDiseases.find((d) => d.id === diseaseId);
        const name = disease
          ? lang === 'en' ? disease.nameEn : lang === 'ar' ? disease.nameAr : disease.name
          : customLastLabel || (lang === 'en' ? 'Disease Detail' : lang === 'ar' ? 'تفاصيل المرض' : 'جزئیات بیماری');
        items.push({ label: name });
      }
    } else if (pathSegments[1] === 'lifestyle') {
      items.push({
        label: lang === 'en' ? 'Lifestyle Medicine' : lang === 'ar' ? 'طب نمط الحياة' : 'پزشکی سبک زندگی',
      });
    } else if (pathSegments[1] === 'sports') {
      items.push({
        label: lang === 'en' ? 'Sports Medicine' : lang === 'ar' ? 'الطب الرياضي' : 'علوم ورزشی',
      });
    } else if (pathSegments[1] === 'age-groups') {
      items.push({
        label: lang === 'en' ? 'Lifespan Stages' : lang === 'ar' ? 'المراحل العمرية' : 'گروه‌های سنی',
      });
    }
  } else if (pathSegments[0] === 'lifestyle') {
    items.push({
      label: lang === 'en' ? 'Knowledge' : lang === 'ar' ? 'المعرفة' : 'دانش',
      path: '/knowledge',
    });
    items.push({
      label: lang === 'en' ? 'Lifestyle Medicine' : lang === 'ar' ? 'طب نمط الحياة' : 'پزشکی سبک زندگی',
    });
  } else if (pathSegments[0] === 'sports') {
    items.push({
      label: lang === 'en' ? 'Knowledge' : lang === 'ar' ? 'المعرفة' : 'دانش',
      path: '/knowledge',
    });
    items.push({
      label: lang === 'en' ? 'Sports Medicine' : lang === 'ar' ? 'الطب الرياضي' : 'علوم ورزشی',
    });
  } else if (pathSegments[0] === 'age-groups') {
    items.push({
      label: lang === 'en' ? 'Knowledge' : lang === 'ar' ? 'المعرفة' : 'دانش',
      path: '/knowledge',
    });
    items.push({
      label: lang === 'en' ? 'Lifespan Stages' : lang === 'ar' ? 'المراحل العمرية' : 'گروه‌های سنی',
    });
  } else if (pathSegments[0] === 'diseases') {
    items.push({
      label: lang === 'en' ? 'Knowledge' : lang === 'ar' ? 'المعرفة' : 'دانش',
      path: '/knowledge',
    });
    items.push({
      label: lang === 'en' ? 'Disease Bank' : lang === 'ar' ? 'بنك الأمراض' : 'بانک بیماری‌ها',
    });
  } else if (pathSegments[0] === 'assessment') {
    items.push({
      label: lang === 'en' ? 'Assessments' : lang === 'ar' ? 'التقييمات' : 'ارزیابی‌ها',
      path: pathSegments.length > 1 ? '/assessment' : undefined,
    });

    if (pathSegments[1] === 'tools') {
      items.push({
        label: lang === 'en' ? 'Calculators & Tools' : lang === 'ar' ? 'أدوات وحاسبات الصحة' : 'ابزارها و ماشین‌حساب‌ها',
        path: pathSegments.length > 2 ? '/assessment/tools' : undefined,
      });

      if (pathSegments[2]) {
        const toolMap: Record<string, { fa: string; en: string; ar: string }> = {
          bmi: { fa: 'محاسبه‌گر BMI و ترکیب بدنی', en: 'BMI & Body Composition', ar: 'حاسبة مؤشر كتلة الجسم' },
          calorie: { fa: 'محاسبه‌گر کالری و TDEE', en: 'Calorie & TDEE Calculator', ar: 'حاسبة السعرات الحرارية' },
          diabetes: { fa: 'غربالگری دیابت (FINDRISC)', en: 'Diabetes Risk (FINDRISC)', ar: 'فحص مخاطر السكري' },
          metabolic: { fa: 'سندرم متابولیک و ریسک قلبی', en: 'Metabolic Syndrome Risk', ar: 'مخاطر المتلازمة الأيضية' },
          sleep: { fa: 'ارزیابی کیفیت خواب (PSQI)', en: 'Sleep Quality Index (PSQI)', ar: 'مؤشر جودة النوم' },
          'mental-health': { fa: 'بهزیستی روان (DASS-21)', en: 'Mental Wellbeing (DASS-21)', ar: 'تقييم الرفاه النفسي' },
          mobility: { fa: 'ارزیابی تحرک عملکردی', en: 'Functional Mobility', ar: 'تقييم الحركة الوظيفية' },
        };
        const tObj = toolMap[pathSegments[2]];
        const name = tObj
          ? lang === 'en' ? tObj.en : lang === 'ar' ? tObj.ar : tObj.fa
          : customLastLabel || (lang === 'en' ? 'Calculator' : 'محاسبه‌گر');
        items.push({ label: name });
      }
    } else if (pathSegments[1] === 'registry') {
      items.push({
        label: lang === 'en' ? 'National Health Registry' : lang === 'ar' ? 'السجل الصحي الوطني' : 'رجیستری ملی سلامت',
      });
    } else if (pathSegments[1] === 'result') {
      items.push({
        label: lang === 'en' ? 'Assessment Result' : lang === 'ar' ? 'نتيجة التقييم' : 'نتیجه ارزیابی',
      });
    } else if (pathSegments[1] === 'flow') {
      items.push({
        label: lang === 'en' ? 'Clinical Assessment' : lang === 'ar' ? 'التقييم السريري' : 'ارزیابی بالینی',
      });
    }
  } else if (pathSegments[0] === 'shop') {
    items.push({
      label: lang === 'en' ? 'SHAMS Shop' : lang === 'ar' ? 'متجر شمس' : 'فروشگاه شمس',
      path: pathSegments.length > 1 ? '/shop' : undefined,
    });

    if (pathSegments[1] === 'product' && pathSegments[2]) {
      const prod = sampleProducts.find((p) => p.id === pathSegments[2]);
      const name = prod
        ? lang === 'en' ? prod.nameEn : lang === 'ar' ? prod.nameAr : prod.name
        : customLastLabel || (lang === 'en' ? 'Product Detail' : 'جزئیات محصول');
      items.push({ label: name });
    }
  } else if (pathSegments[0] === 'cart') {
    items.push({
      label: lang === 'en' ? 'SHAMS Shop' : lang === 'ar' ? 'متجر شمس' : 'فروشگاه شمس',
      path: '/shop',
    });
    items.push({
      label: lang === 'en' ? 'Shopping Cart' : lang === 'ar' ? 'سلة التسوق' : 'سبد خرید',
    });
  } else if (pathSegments[0] === 'services') {
    items.push({
      label: lang === 'en' ? 'Clinical Services' : lang === 'ar' ? 'الخدمات السريرية' : 'خدمات بالینی',
      path: pathSegments.length > 1 ? '/services' : undefined,
    });

    if (pathSegments[1] === 'record') {
      items.push({
        label: lang === 'en' ? 'Health Record' : lang === 'ar' ? 'السجل الصحي' : 'پرونده سلامت',
      });
    } else if (pathSegments[1] === 'research') {
      items.push({
        label: lang === 'en' ? 'Research Panel' : lang === 'ar' ? 'لوحة الأبحاث' : 'پنل پژوهش',
      });
    }
  } else if (pathSegments[0] === 'dashboard') {
    items.push({
      label: lang === 'en' ? 'User Profile' : lang === 'ar' ? 'لوحة التحكم' : 'پروفایل کاربری',
      path: pathSegments.length > 1 ? '/dashboard' : undefined,
    });

    if (pathSegments[1] === 'record') {
      items.push({
        label: lang === 'en' ? 'Health Record' : lang === 'ar' ? 'السجل الصحي' : 'پرونده سلامت',
      });
    } else if (pathSegments[1] === 'events') {
      items.push({
        label: lang === 'en' ? 'My Events' : lang === 'ar' ? 'فعالياتي' : 'رویدادهای من',
      });
    }
  } else if (pathSegments[0] === 'events') {
    items.push({
      label: lang === 'en' ? 'Events & Webinars' : lang === 'ar' ? 'الفعاليات والندوات' : 'رویدادها و وبینارها',
      path: pathSegments.length > 1 ? '/events' : undefined,
    });

    if (pathSegments[1]) {
      items.push({
        label: customLastLabel || (lang === 'en' ? 'Event Details' : lang === 'ar' ? 'تفاصيل الفعالية' : 'جزئیات رویداد'),
      });
    }
  } else if (pathSegments[0] === 'plan') {
    items.push({
      label: lang === 'en' ? 'Personal Health Plan' : lang === 'ar' ? 'خطة الصحة الشخصية' : 'برنامه اختصاصی سلامت',
    });
  } else if (pathSegments[0] === 'about') {
    items.push({
      label: lang === 'en' ? 'About SHAMS' : lang === 'ar' ? 'عن شمس' : 'درباره شمس',
    });
  } else if (pathSegments[0] === 'search') {
    items.push({
      label: lang === 'en' ? 'Search' : lang === 'ar' ? 'البحث' : 'جستجو',
    });
  } else if (pathSegments[0] === 'settings') {
    items.push({
      label: lang === 'en' ? 'User Profile' : lang === 'ar' ? 'لوحة التحكم' : 'پروفایل کاربری',
      path: '/dashboard',
    });
    items.push({
      label: lang === 'en' ? 'Settings' : lang === 'ar' ? 'الإعدادات' : 'تنظیمات',
    });
  } else if (pathSegments[0] === 'notifications') {
    items.push({
      label: lang === 'en' ? 'User Profile' : lang === 'ar' ? 'لوحة التحكم' : 'پروفایل کاربری',
      path: '/dashboard',
    });
    items.push({
      label: lang === 'en' ? 'Notifications' : lang === 'ar' ? 'الإشعارات' : 'اعلان‌ها',
    });
  } else if (pathSegments[0] === 'login') {
    items.push({
      label: lang === 'en' ? 'Login' : lang === 'ar' ? 'تسجيل الدخول' : 'ورود به حساب',
    });
  } else if (pathSegments[0] === 'register') {
    items.push({
      label: lang === 'en' ? 'Register' : lang === 'ar' ? 'إنشاء حساب' : 'ثبت‌نام',
    });
  } else {
    // Fallback for custom or unknown pages
    items.push({
      label: customLastLabel || (lang === 'en' ? 'Page' : 'صفحه'),
    });
  }

  // Override last item label if customLastLabel is passed
  if (customLastLabel && items.length > 0) {
    items[items.length - 1].label = customLastLabel;
  }

  const Separator = isRTL ? ChevronLeft : ChevronRight;

  const isDark = variant === 'dark';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs font-semibold py-2 px-1 overflow-x-auto whitespace-nowrap scrollbar-none ${
        isDark ? 'text-white/80' : 'text-shams-navy/70'
      } ${className}`}
    >
      <ol className="flex items-center gap-1.5 flex-nowrap min-w-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="flex items-center gap-1.5 shrink-0">
              {index > 0 && (
                <Separator
                  className={`w-3.5 h-3.5 shrink-0 opacity-50 ${
                    isDark ? 'text-white/60' : 'text-shams-navy/40'
                  }`}
                />
              )}

              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 transition-colors hover:underline ${
                    isDark
                      ? 'hover:text-white text-white/80'
                      : 'hover:text-shams-teal text-shams-navy/70 font-medium'
                  }`}
                >
                  {isFirst && <Home className="w-3.5 h-3.5 shrink-0 mb-0.5" />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className={`flex items-center gap-1 font-bold ${
                    isDark ? 'text-white' : 'text-shams-navy'
                  } truncate max-w-[220px] sm:max-w-[360px]`}
                  title={item.label}
                >
                  {isFirst && <Home className="w-3.5 h-3.5 shrink-0 mb-0.5" />}
                  <span className="truncate">{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
