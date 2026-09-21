import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, UserCircle, CheckCircle2, X } from 'lucide-react';
import { PageHero } from '../components/PageHero';

export function EventDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Mock handling registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-shams-sand min-h-screen pb-24">
      {/* 100% Full-Width Visual Hero */}
      <PageHero
        customTitle="سمینار تخصصی خواب سالم و سبک زندگی"
        customSubtitle="بررسی علمی تأثیر کیفیت خواب بر سلامت روان و متابولیک همراه با ارائه پروتکل‌های عملی بازسازی شبانه."
        customTag="سمینار تخصصی بالینی"
        customImage="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2400&auto=format&fit=crop"
        customImageAlt="سمینار تخصصی خواب سالم"
        visualConceptLabel="Medical Symposium & Clinical Longevity Masterclass"
        themeAccent="teal"
      >
        <div className="flex flex-wrap gap-4 text-white/90 font-medium pt-2">
          <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 text-xs sm:text-sm">
            <Calendar className="w-4 h-4 text-shams-teal-light" /> ۲۵ شهریور ۱۴۰۵
          </div>
          <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 text-xs sm:text-sm">
            <Clock className="w-4 h-4 text-shams-teal-light" /> ۱۶:۰۰ تا ۱۹:۰۰
          </div>
        </div>
      </PageHero>

      {/* Main Content */}
      <section className="container mx-auto px-4 max-w-5xl -mt-10 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Details Col */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-shams-navy/5">
              <h2 className="text-2xl font-bold text-shams-navy mb-4">درباره رویداد</h2>
              <p className="text-shams-navy/80 leading-relaxed mb-6 text-lg">
                خواب یکی از ارکان اصلی سلامت انسان است که تأثیر مستقیمی بر عملکرد فیزیکی، سلامت روان و تنظیم متابولیسم دارد. در این سمینار، با تکیه بر جدیدترین یافته‌های علمی، به بررسی مکانیزم‌های خواب، اختلالات شایع و راهکارهای عملی برای بهبود کیفیت خواب می‌پردازیم.
              </p>
              
              <h3 className="text-xl font-bold text-shams-navy mb-4 mt-8">محورهای اصلی</h3>
              <ul className="space-y-3">
                {['فیزیولوژی خواب و ریتم شبانه‌روزی', 'ارتباط خواب با بیماری‌های متابولیک و قلب و عروق', 'نقش تغذیه در بهبود کیفیت خواب', 'معرفی تکنیک‌های آرام‌سازی پیش از خواب'].map((item, i) => (
                   <li key={i} className="flex items-start gap-2 text-shams-navy/70">
                     <CheckCircle2 className="w-5 h-5 text-shams-sage shrink-0" />
                     {item}
                   </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-shams-navy/5">
              <h2 className="text-2xl font-bold text-shams-navy mb-6">سخنران</h2>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-shams-sand shrink-0">
                  <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" alt="دکتر محمدی" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-shams-navy mb-1">دکتر محمدی</h3>
                  <div className="text-shams-teal font-medium text-sm mb-3">متخصص اعصاب و روان، فلوشیپ اختلالات خواب</div>
                  <p className="text-shams-navy/70 text-sm leading-relaxed max-w-md">
                    عضو هیئت علمی دانشگاه علوم پزشکی تهران و مدیر مرکز تحقیقات خواب شمس.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-shams-navy/5 sticky top-32">
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-3 text-shams-navy/80">
                  <MapPin className="w-5 h-5 text-shams-teal" />
                  <span className="font-medium">مرکز همایش‌های رازی</span>
                </div>
                <div className="flex items-center gap-3 text-shams-navy/80">
                  <Clock className="w-5 h-5 text-shams-teal" />
                  <span className="font-medium">مدت: ۳ ساعت</span>
                </div>
                <div className="flex items-center gap-3 text-shams-navy/80">
                  <Users className="w-5 h-5 text-shams-teal" />
                  <span className="font-medium">ظرفیت: ۲۰۰ نفر (۴۴ نفر باقی‌مانده)</span>
                </div>
              </div>

              <div className="border-t border-shams-sand pt-6 mb-6">
                <div className="text-sm text-shams-navy/50 font-bold mb-1">هزینه ثبت‌نام</div>
                <div className="text-3xl font-bold text-shams-navy">رایگان</div>
              </div>

              {isRegistered ? (
                <div className="w-full py-4 rounded-xl bg-shams-sage/10 text-shams-sage font-bold flex justify-center items-center gap-2 border border-shams-sage/20 cursor-default">
                  <CheckCircle2 className="w-5 h-5" />
                  ثبت‌نام شد
                </div>
              ) : (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 rounded-xl bg-shams-navy text-white font-bold flex justify-center items-center hover:bg-shams-navy/90 transition-colors shadow-lg"
                >
                  ثبت‌نام در رویداد
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-shams-navy/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-shams-sand text-shams-navy/50 hover:text-shams-navy hover:bg-shams-sand/80 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 pb-0">
              <h2 className="text-2xl font-bold text-shams-navy mb-2">ثبت‌نام در رویداد</h2>
              <p className="text-shams-navy/60 text-sm mb-6">سمینار تخصصی خواب سالم و سبک زندگی</p>
            </div>
            
            <form onSubmit={handleRegister} className="p-8 pt-0 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-shams-navy mb-2">نام</label>
                  <input required type="text" className="w-full bg-shams-sand border border-shams-sand focus:border-shams-teal focus:bg-white rounded-xl px-4 py-3 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-shams-navy mb-2">نام خانوادگی</label>
                  <input required type="text" className="w-full bg-shams-sand border border-shams-sand focus:border-shams-teal focus:bg-white rounded-xl px-4 py-3 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-shams-navy mb-2">شماره تماس</label>
                <input required type="tel" dir="ltr" placeholder="0912..." className="w-full bg-shams-sand border border-shams-sand focus:border-shams-teal focus:bg-white rounded-xl px-4 py-3 outline-none transition-all text-left" />
              </div>
              <div>
                <label className="block text-sm font-bold text-shams-navy mb-2">ایمیل (اختیاری)</label>
                <input type="email" dir="ltr" className="w-full bg-shams-sand border border-shams-sand focus:border-shams-teal focus:bg-white rounded-xl px-4 py-3 outline-none transition-all text-left" />
              </div>
              
              <button type="submit" className="mt-4 w-full py-4 rounded-xl bg-shams-teal text-white font-bold flex justify-center items-center hover:bg-shams-teal/90 transition-colors shadow-md">
                تأیید و ثبت‌نام
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
