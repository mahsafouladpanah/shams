import React, { useState } from 'react';
import { 
  Info, Sparkles, Calendar, Clock, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';
import { NeonHealthAnalytics } from '../components/NeonHealthAnalytics';

export function HealthRecord() {
  const { lang, t, formatNumber } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'followups'>('overview');

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen font-sans dir-rtl text-shams-navy" dir="rtl">
      {/* Editorial Page Hero */}
      <PageHero
        heroId="healthRecord"
        layoutVariant="asymmetric"
        themeAccent="teal"
      />

      {/* Main Content Area */}
      <section className="container mx-auto px-4 max-w-6xl -mt-6 relative z-20 space-y-8">
        
        {/* Sample Data Disclaimer Banner */}
        <div className="bg-white rounded-2xl p-4 border border-shams-navy/10 shadow-xs flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 text-shams-navy">
            <Info className="w-4 h-4 text-shams-teal shrink-0" />
            <span className="font-bold">
              داده‌های ثبت‌شده پرونده سلامت هوشمند شمس - به‌روزشده بر اساس آخرین ارزیابی‌ها و بیومارکرهای بالینی
            </span>
          </div>
          <span className="text-[10px] text-shams-teal font-mono bg-shams-teal/10 px-2.5 py-1 rounded-full font-bold border border-shams-teal/20">
            DEMO PATIENT DOSSIER
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-1.5 border border-shams-navy/10 shadow-xs flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'overview' ? 'bg-shams-navy text-white shadow-xs' : 'text-shams-navy/70 hover:bg-shams-sand'
            }`}
          >
            <Sparkles className="w-4 h-4 text-shams-teal" />
            <span>پرونده جامع بیومارکرها و تحلیل هوشمند</span>
          </button>

          <button
            onClick={() => setActiveTab('followups')}
            className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'followups' ? 'bg-shams-navy text-white shadow-xs' : 'text-shams-navy/70 hover:bg-shams-sand'
            }`}
          >
            <Calendar className="w-4 h-4 text-shams-gold" />
            <span>برنامه پیگیری و مشاوره‌ها</span>
          </button>
        </div>

        {/* Tab 1: Comprehensive Neon Health Analytics */}
        {activeTab === 'overview' && (
          <NeonHealthAnalytics />
        )}

        {/* Tab 2: Follow-up appointments */}
        {activeTab === 'followups' && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-shams-navy/10 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-shams-navy">جلسات پیگیری بالینی و چک‌آپ‌های آینده</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-shams-teal/40 bg-shams-teal/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-shams-teal text-white flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-shams-navy">مشاوره بازبینی برنامه تمرینی و تغذیه</div>
                    <div className="text-[11px] text-shams-navy/60">تاریخ: چهارشنبه ۱۸ مهر ۱۴۰۳ · ساعت ۱۷:۰۰ (آنلاین)</div>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-shams-navy text-white text-xs font-bold hover:bg-shams-teal transition-colors">
                  ورود به اتاق مشاوره
                </button>
              </div>

              <div className="p-4 rounded-2xl border border-shams-sand bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-shams-sand text-shams-navy flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-shams-navy">چک‌آپ آزمایشگاهی سه‌ماهه دوم (پروفایل لیپیدی)</div>
                    <div className="text-[11px] text-shams-navy/60">بازه زمانی: آبان‌ماه ۱۴۰۳</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-shams-navy/40">در انتظار زمان موعد</span>
              </div>
            </div>
          </div>
        )}

      </section>
    </div>
  );
}

