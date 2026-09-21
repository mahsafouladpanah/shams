import React, { useState } from 'react';
import { 
  Database, ShieldCheck, FileCheck, Users, Activity, CheckCircle2, 
  Lock, ArrowLeft, HeartPulse, Building2, DownloadCloud 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';

export function HealthRegistry() {
  const { lang, t, formatNumber } = useLanguage();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    nationalId: '',
    birthYear: '1368',
    city: 'تهران',
    bloodType: 'O+',
    chronicConditions: [] as string[],
    lifestyleConsent: true,
    biobankConsent: false,
    anonymizedResearchConsent: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggleCondition = (cond: string) => {
    setFormData(prev => ({
      ...prev,
      chronicConditions: prev.chronicConditions.includes(cond)
        ? prev.chronicConditions.filter(c => c !== cond)
        : [...prev.chronicConditions, cond]
    }));
  };

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Editorial Page Hero with Clinical Health Registry Visual */}
      <PageHero
        heroId="registry"
        layoutVariant="asymmetric"
        themeAccent="teal"
      >
        {/* Registry Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mt-4">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-bold text-shams-gold metric-large">{formatNumber('148,250')}</div>
            <div className="text-[11px] text-white/70 mt-0.5">پرونده ثبت‌شده فعال</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-bold text-shams-teal metric-large">{formatNumber('31')}</div>
            <div className="text-[11px] text-white/70 mt-0.5">استان تحت پوشش</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-bold text-shams-sage metric-large">{formatNumber('100%')}</div>
            <div className="text-[11px] text-white/70 mt-0.5">رمزنگاری HIPAA</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-bold text-shams-mauve metric-large">{formatNumber('84')}</div>
            <div className="text-[11px] text-white/70 mt-0.5">مرکز دانشگاهی همکار</div>
          </div>
        </div>
      </PageHero>

      {/* Main Workflow Form Container */}
      <section className="container mx-auto px-4 max-w-4xl -mt-6 relative z-20">
        <div className="bg-white rounded-3xl p-6 md:p-12 border border-shams-navy/10 shadow-2xl">
          
          {!isSubmitted ? (
            <div>
              {/* Stepper Tabs */}
              <div className="flex items-center justify-between border-b border-shams-sand pb-6 mb-8">
                {[
                  { step: 1, title: 'احراز هویت پایه' },
                  { step: 2, title: 'پروفایل زیستی و بیماری‌ها' },
                  { step: 3, title: 'رضایت‌نامه و امنیت داده' },
                ].map(item => (
                  <div key={item.step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      activeStep === item.step 
                        ? 'bg-shams-teal text-white shadow-md'
                        : activeStep > item.step ? 'bg-shams-navy text-white' : 'bg-shams-sand text-shams-navy/40'
                    }`}>
                      {formatNumber(item.step)}
                    </div>
                    <span className={`text-xs font-bold hidden sm:inline ${
                      activeStep === item.step ? 'text-shams-navy' : 'text-shams-navy/40'
                    }`}>{item.title}</span>
                  </div>
                ))}
              </div>

              {/* Step 1: Identity */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-shams-navy">گام ۱: مشخصات اولیه ثبت در رجیستری سلامت</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-shams-navy mb-1.5">کد ملی یا شناسه شهروندی</label>
                      <input 
                        type="text" 
                        placeholder="مثال: ۰۰۱۲۳۴۵۶۷۸"
                        value={formData.nationalId}
                        onChange={e => setFormData({ ...formData, nationalId: e.target.value })}
                        className="w-full p-3 rounded-2xl border border-shams-navy/15 text-xs font-bold text-shams-navy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-shams-navy mb-1.5">سال تولد (شمسی)</label>
                      <input 
                        type="number" 
                        value={formData.birthYear}
                        onChange={e => setFormData({ ...formData, birthYear: e.target.value })}
                        className="w-full p-3 rounded-2xl border border-shams-navy/15 text-xs font-bold text-shams-navy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-shams-navy mb-1.5">شهر محل سکونت اصلی</label>
                      <input 
                        type="text" 
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full p-3 rounded-2xl border border-shams-navy/15 text-xs font-bold text-shams-navy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-shams-navy mb-1.5">گروه خونی</label>
                      <select 
                        value={formData.bloodType}
                        onChange={e => setFormData({ ...formData, bloodType: e.target.value })}
                        className="w-full p-3 rounded-2xl border border-shams-navy/15 text-xs font-bold text-shams-navy bg-white"
                      >
                        <option value="A+">A مثبت</option>
                        <option value="A-">A منفی</option>
                        <option value="B+">B مثبت</option>
                        <option value="B-">B منفی</option>
                        <option value="AB+">AB مثبت</option>
                        <option value="AB-">AB منفی</option>
                        <option value="O+">O مثبت</option>
                        <option value="O-">O منفی</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button 
                      onClick={() => setActiveStep(2)}
                      className="px-8 py-3 rounded-2xl bg-shams-navy text-white font-bold text-xs hover:bg-shams-teal transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>مرحله بعد: سوابق بیماری‌ها</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Biomarkers & Conditions */}
              {activeStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-shams-navy">گام ۲: غربالگری سوابق بیماری‌های مزمن</h3>
                  <p className="text-xs text-shams-navy/60">لطفاً بیماری‌هایی که سابقه تشخیص پزشکی قطعی آنها را دارید انتخاب نمایید:</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'پرفشاری خون', 'دیابت نوع ۲', 'کبد چرب گرید ۱ یا ۲',
                      'آرتروز یا دیسک کمری', 'آسم و آلرژی تنفسی', 'سندروم روده تحریک‌پذیر (IBS)',
                      'اختلالات تیروئید', 'چربی خون بالا', 'سابقه بیماری قلبی'
                    ].map(cond => (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => handleToggleCondition(cond)}
                        className={`p-3 rounded-2xl border text-xs font-bold text-right transition-all cursor-pointer ${
                          formData.chronicConditions.includes(cond)
                            ? 'bg-shams-teal text-white border-shams-teal shadow-xs'
                            : 'bg-shams-sand/40 border-shams-navy/10 text-shams-navy hover:bg-shams-sand'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button 
                      onClick={() => setActiveStep(1)}
                      className="px-6 py-3 rounded-2xl border border-shams-navy/15 text-shams-navy font-bold text-xs hover:bg-shams-sand transition-all"
                    >
                      بازگشت
                    </button>
                    <button 
                      onClick={() => setActiveStep(3)}
                      className="px-8 py-3 rounded-2xl bg-shams-navy text-white font-bold text-xs hover:bg-shams-teal transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>مرحله بعد: رضایت‌نامه اخلاق پژوهش</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Consent & Security */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-shams-navy">گام ۳: ضوابط حفظ حریم خصوصی و رضایت‌نامه پژوهشی</h3>
                  
                  <div className="bg-shams-sand/50 p-4 rounded-2xl border border-shams-navy/10 space-y-2 text-xs text-shams-navy/80 leading-relaxed">
                    <div className="flex items-center gap-2 font-bold text-shams-navy">
                      <Lock className="w-4 h-4 text-shams-teal" />
                      تعهدنامه امنیت و بی‌نام‌سازی داده‌های بالینی
                    </div>
                    <p>
                      پایگاه رجیستری شمس کلیه اطلاعات هویتی و آزمایشگاهی را با الگوریتم‌های رمزنگاری نامتقارن محافظت نموده و هرگز اطلاعات دارای هویت را با اشخاص ثالث به اشتراک نمی‌گذارد. نتایج تجمیعی صرفاً در راستای پژوهش‌های اپیدمیولوژی و بهبود سیاست‌های سلامت عمومی استفاده خواهد شد.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3 rounded-2xl border border-shams-sand hover:bg-shams-sand/40 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.anonymizedResearchConsent}
                        onChange={e => setFormData({ ...formData, anonymizedResearchConsent: e.target.checked })}
                        className="mt-1 w-4 h-4 text-shams-teal accent-shams-teal"
                      />
                      <span className="text-xs font-bold text-shams-navy">
                        موافقت با استفاده از داده‌های سلامت من به صورت کاملاً ناشناس در مطالعات علمی دانشگاهی
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-2xl border border-shams-sand hover:bg-shams-sand/40 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={formData.lifestyleConsent}
                        onChange={e => setFormData({ ...formData, lifestyleConsent: e.target.checked })}
                        className="mt-1 w-4 h-4 text-shams-teal accent-shams-teal"
                      />
                      <span className="text-xs font-bold text-shams-navy">
                        دریافت توصیه‌های پیشگیرانه اختصاصی دوره‌ای از طریق پیامک یا کارپوشه شمس
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button 
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-3 rounded-2xl border border-shams-navy/15 text-shams-navy font-bold text-xs hover:bg-shams-sand transition-all"
                    >
                      بازگشت
                    </button>
                    <button 
                      onClick={() => setIsSubmitted(true)}
                      className="px-8 py-3 rounded-2xl bg-shams-teal text-white font-bold text-xs hover:bg-shams-navy transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ثبت نهایی در پایگاه رجیستری شمس</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Success confirmation */
            <div className="text-center py-10 space-y-6 animate-in fade-in">
              <div className="w-20 h-20 rounded-full bg-shams-teal/10 text-shams-teal flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-shams-navy">ثبت موفقیت‌آمیز پرونده در رجیستری ملی شمس</h2>
              <p className="text-xs text-shams-navy/70 max-w-md mx-auto leading-relaxed">
                شناسه یکتای پرونده رجیستری سلامت شما تولید و به سوابق شخصی پیوست شد. پرونده شما به صورت ایمن در پایگاه طولی فعال است.
              </p>
              <div className="bg-shams-sand/60 p-4 rounded-2xl max-w-sm mx-auto font-numeric text-xs font-bold text-shams-navy border border-shams-navy/10 tracking-wider">
                SHAMS-REG-849201
              </div>
              <div className="pt-4 flex justify-center gap-4">
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-shams-navy/15 text-xs font-bold text-shams-navy hover:bg-shams-sand"
                >
                  ویرایش اطلاعات ثبت‌شده
                </button>
                <button 
                  onClick={() => window.print()}
                  className="px-6 py-2.5 rounded-xl bg-shams-navy text-white text-xs font-bold hover:bg-shams-teal flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <DownloadCloud className="w-4 h-4" />
                  چاپ گواهی ثبت
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
