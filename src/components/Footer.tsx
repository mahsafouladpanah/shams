import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { lang, dir, t } = useLanguage();

  return (
    <footer className="bg-shams-navy text-shams-sand pt-16 pb-8 border-t-4 border-shams-teal" dir={dir}>
      <div className="container mx-auto px-4 xl:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start gap-6">
            <Logo variant="white" className="w-32" />
            <p className="text-shams-sand/80 text-xs sm:text-sm leading-relaxed max-w-xs">
              {lang === 'en'
                ? 'SHAMS is an integrated digital health ecosystem offering clinically validated assessments, lifestyle medicine, and precision health tracking.'
                : lang === 'ar'
                ? 'شمس؛ منظومة صحية رقمية متكاملة تقدم تقييمات سريرية، وطب نمط الحياة، ومتابعة دقيقة للصحة الحيوية.'
                : 'شمس؛ زیست‌بوم یکپارچه سلامت دیجیتال. مسیری برای ارزیابی بالینی، تغییر سبک زندگی و شکوفایی تندرستی بر پایه دانش معتبر.'}
            </p>
            <div className="flex gap-4 text-shams-sand/60">
              <a href="#" className="hover:text-shams-gold transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-shams-gold transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-shams-gold transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h3 className="text-sm sm:text-base font-bold mb-4 text-white border-b border-shams-sand/10 pb-2 inline-block">
              {lang === 'en' ? 'SHAMS Ecosystem' : lang === 'ar' ? 'منظومة شمس' : 'زیست‌بوم شمس'}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-shams-sand/80 font-medium">
              <li><Link to="/knowledge" className="hover:text-shams-teal transition-colors">{t('nav.knowledge')}</Link></li>
              <li><Link to="/assessment" className="hover:text-shams-teal transition-colors">{t('nav.assessment')}</Link></li>
              <li><Link to="/plan" className="hover:text-shams-sage transition-colors">{t('nav.program')}</Link></li>
              <li><Link to="/shop" className="hover:text-shams-teal transition-colors">{t('nav.shop')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm sm:text-base font-bold mb-4 text-white border-b border-shams-sand/10 pb-2 inline-block">
              {lang === 'en' ? 'Services & Clinical' : lang === 'ar' ? 'الخدمات والعيادة' : 'خدمات و پرونده'}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-shams-sand/80 font-medium">
              <li><Link to="/services/record" className="hover:text-shams-teal transition-colors">{t('services.record')}</Link></li>
              <li><Link to="/services/research" className="hover:text-shams-teal transition-colors">{t('services.research')}</Link></li>
              <li><Link to="/about" className="hover:text-shams-teal transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/assessment/registry" className="hover:text-shams-teal transition-colors">{t('assessment.registry')}</Link></li>
            </ul>
          </div>

          {/* Account & Support */}
          <div>
            <h3 className="text-sm sm:text-base font-bold mb-4 text-white border-b border-shams-sand/10 pb-2 inline-block">
              {lang === 'en' ? 'Account & Support' : lang === 'ar' ? 'الحساب والدعم' : 'حساب و پشتیبانی'}
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-shams-sand/80 font-medium">
              <li><Link to="/login" className="hover:text-shams-teal transition-colors">{t('nav.loginOrRegister')}</Link></li>
              <li><Link to="/settings" className="hover:text-shams-teal transition-colors">{lang === 'en' ? 'Account Settings' : lang === 'ar' ? 'إعدادات الحساب' : 'تنظیمات حساب'}</Link></li>
              <li><Link to="/assessment/tools" className="hover:text-shams-teal transition-colors">{t('assessment.healthTools')}</Link></li>
              <li><Link to="/cart" className="hover:text-shams-teal transition-colors">{t('nav.cart')}</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-shams-sand/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-shams-sand/60">
          <p>© {new Date().getFullYear()} SHAMS Health Ecosystem. All rights reserved.</p>
          <p dir="ltr" className="font-mono text-[11px] tracking-wider text-shams-teal">FROM EVIDENCE TO VIBRANT LIVING</p>
        </div>
      </div>
    </footer>
  );
}
