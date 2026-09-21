import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
  Activity, ShieldCheck, Database, Filter, Download, 
  Calendar, Layers, Users, Sparkles, Lock, ArrowUpRight, 
  Search, AlertCircle, RefreshCw 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';

const ageDistributionData = [
  { name: 'زیر ۱۸ سال', value: 12, fill: '#0B7B8A' },
  { name: '۱۸ تا ۳۰ سال', value: 28, fill: '#0A2540' },
  { name: '۳۱ تا ۵۰ سال', value: 38, fill: '#8C5E7A' },
  { name: '۵۱ تا ۶۵ سال', value: 16, fill: '#C59B27' },
  { name: 'بالای ۶۵ سال', value: 6, fill: '#7C3238' },
];

const chronicPrevalenceData = [
  { disease: 'پرفشاری خون', rate: 26.4 },
  { disease: 'سندروم متابولیک', rate: 22.8 },
  { disease: 'کبد چرب غیرالکلی', rate: 28.1 },
  { disease: 'پیش‌دیابت', rate: 19.5 },
  { disease: 'اختلالات اسکلتی عضلانی', rate: 34.2 },
  { disease: 'کمبود ویتامین D', rate: 46.7 },
];

const lifestyleAdherenceTrend = [
  { month: 'فروردین', adherence: 64, activeCases: 12400 },
  { month: 'اردیبهشت', adherence: 68, activeCases: 15600 },
  { month: 'خرداد', adherence: 71, activeCases: 19800 },
  { month: 'تیر', adherence: 75, activeCases: 24200 },
  { month: 'مرداد', adherence: 79, activeCases: 29500 },
  { month: 'شهریور', adherence: 83, activeCases: 35100 },
];

export function ResearchPanel() {
  const { lang, t, formatNumber } = useLanguage();
  const [selectedCohort, setSelectedCohort] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('national');
  const [dateRange, setDateRange] = useState('1year');
  const [filterQuery, setFilterQuery] = useState('');

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Editorial Page Hero with Genomic Epidemiology Visual */}
      <PageHero
        heroId="research"
        layoutVariant="asymmetric"
        themeAccent="teal"
      >
        <div className="flex items-center gap-3 mt-4">
          <button 
            onClick={() => alert('خروجی گزارش پژوهشی آماده شد.')}
            className="bg-shams-teal hover:bg-white hover:text-shams-navy text-white px-5 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>خروجی داده‌های آماری (CSV / JSON)</span>
          </button>
        </div>
      </PageHero>

      {/* Main Container */}
      <section className="container mx-auto px-4 max-w-6xl -mt-6 relative z-20 space-y-8">
        
        {/* Privacy & No-PII Certification Banner */}
        <div className="bg-white rounded-3xl p-5 border border-shams-navy/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-shams-navy">
            <div className="w-9 h-9 rounded-2xl bg-shams-teal/15 text-shams-teal flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-shams-navy">محیط ایزوله پژوهشی منطبق بر اصل ناشناس‌سازی k-Anonymity (k &ge; 50)</div>
              <p className="text-shams-navy/60 text-[11px] leading-relaxed">
                تمام رکوردهای این داشبورد عاری از شناسه شخصی (PII) بوده و تنها الگوهای توزیعی و کوهورت‌های آماری نمایش داده می‌شوند.
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-shams-navy text-white shrink-0">
            HIPAA & GDPR Compliant
          </span>
        </div>

        {/* Global Filter Bar */}
        <div className="bg-white rounded-3xl p-5 border border-shams-navy/10 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-shams-navy/60 mb-1">کوهورت مطالعاتی</label>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-shams-navy/15 text-xs font-bold text-shams-navy bg-white"
            >
              <option value="all">تمام کوهورت‌ها (۱۴۸,۲۵۰ پرونده)</option>
              <option value="metabolic">کوهورت سندروم متابولیک</option>
              <option value="cardio">کوهورت سلامت قلبی‌عروقی</option>
              <option value="aging">کوهورت سالمندی فعال</option>
              <option value="sports">ورزشکاران و تحرک عملکردی</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-shams-navy/60 mb-1">حوزه جغرافیایی</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-shams-navy/15 text-xs font-bold text-shams-navy bg-white"
            >
              <option value="national">پایش سراسری کشور (۳۱ استان)</option>
              <option value="tehran">منطقه مرکزی و پایتخت</option>
              <option value="north">حوزه البرز و شمال</option>
              <option value="south">حوزه جنوب و خلیج فارس</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-shams-navy/60 mb-1">بازه زمانی تحلیل</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-shams-navy/15 text-xs font-bold text-shams-navy bg-white"
            >
              <option value="1year">۱۲ ماه گذشته (سلسله‌ای)</option>
              <option value="6months">۶ ماه اخیر</option>
              <option value="3years">طولی ۳ ساله</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => alert('فیلترهای تحلیل بر داده‌های ناشناس اعمال شد.')}
              className="w-full py-2.5 rounded-xl bg-shams-navy text-white font-bold text-xs hover:bg-shams-teal transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>به‌روزرسانی کوئری پژوهش</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-shams-navy/10 shadow-sm">
            <span className="text-[11px] font-semibold text-shams-navy/60">حجم جامعه آماری ناشناس</span>
            <div className="text-2xl font-bold text-shams-navy mt-1">
              <span className="metric-large font-bold">{formatNumber('148,250')}</span>
            </div>
            <div className="text-[10px] text-shams-teal mt-1">
              نرخ رشد ماهانه: <span className="font-numeric font-semibold">+{formatNumber('8.4%')}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-shams-navy/10 shadow-sm">
            <span className="text-[11px] font-semibold text-shams-navy/60">میانگین سن بیولوژیک کوهورت</span>
            <div className="text-2xl font-bold text-shams-navy mt-1 flex items-baseline gap-1.5">
              <span className="metric-large font-bold">{formatNumber(41.8)}</span> <span className="text-xs font-normal text-shams-navy/60">سال</span>
            </div>
            <div className="text-[10px] text-shams-navy/50 mt-1">
              دامنه: <span className="font-numeric font-medium">{formatNumber(18)}</span> تا <span className="font-numeric font-medium">{formatNumber(82)}</span> سال
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-shams-navy/10 shadow-sm">
            <span className="text-[11px] font-semibold text-shams-navy/60">اثربخشی برنامه مداخله ورزشی</span>
            <div className="text-2xl font-bold text-shams-navy mt-1">
              <span className="metric-large font-bold">{formatNumber('73.6%')}</span>
            </div>
            <div className="text-[10px] text-shams-teal mt-1">
              کاهش معنادار ریسک (<span className="font-numeric">p &lt; 0.001</span>)
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-shams-navy/10 shadow-sm">
            <span className="text-[11px] font-semibold text-shams-navy/60">نرخ پایبندی به برنامه شمس</span>
            <div className="text-2xl font-bold text-shams-navy mt-1">
              <span className="metric-large font-bold">{formatNumber('83.1%')}</span>
            </div>
            <div className="text-[10px] text-shams-gold mt-1">
              در دوره <span className="font-numeric font-semibold">{formatNumber(12)}</span> هفته‌ای مداخله
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Chronic Condition Prevalence (Bar Chart) */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-shams-navy">شیوع درصدی فاکتورهای خطر مزمن در جمعیت پایش‌شده</h3>
                <p className="text-xs text-shams-navy/50">بر اساس ۱۰۰,۰۰۰ رکورد غربالگری استاندارد</p>
              </div>
              <span className="text-xs font-bold text-shams-navy/40 font-mono">ICD-10 CODES</span>
            </div>

            <div className="h-72 w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chronicPrevalenceData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#ECE6DE" />
                  <XAxis type="number" domain={[0, 50]} unit="%" tick={{ fill: '#0A2540', fontSize: 11 }} />
                  <YAxis dataKey="disease" type="category" width={110} tick={{ fill: '#0A2540', fontSize: 11 }} />
                  <Tooltip formatter={(value) => [`${value}%`, 'میزان شیوع']} contentStyle={{ borderRadius: '12px' }} />
                  <Bar dataKey="rate" fill="#0B7B8A" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Age Cohort Distribution (Pie Chart) */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-shams-navy/10 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-shams-navy">توزیع جمعیتی بر حسب گروه‌های سنی</h3>
                <p className="text-xs text-shams-navy/50">سهم درصدی مشارکت‌کنندگان در پایگاه رجیستری</p>
              </div>
            </div>

            <div className="h-72 w-full flex items-center justify-center" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ageDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [`${val}%`, 'درصد مشارکت']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Longitudinal Adherence Line Chart */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-shams-navy/10 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-shams-navy">روند ماهانه نرخ پایبندی به برنامه مداخله و حجم پرونده‌های فعال</h3>
              <p className="text-xs text-shams-navy/50">مقایسه نرخ پایبندی رفتاری (درصد) با رشد پایگاه پژوهش</p>
            </div>
            <span className="text-xs font-bold text-shams-teal bg-shams-teal/10 px-3 py-1 rounded-full">
              سیر صعودی پایدار
            </span>
          </div>

          <div className="h-72 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lifestyleAdherenceTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECE6DE" />
                <XAxis dataKey="month" tick={{ fill: '#0A2540', fontSize: 12 }} />
                <YAxis domain={[50, 100]} unit="%" tick={{ fill: '#0A2540', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px' }} />
                <Line type="monotone" dataKey="adherence" name="نرخ پایبندی (%)" stroke="#8C5E7A" strokeWidth={3.5} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Research Insights Summary */}
        <div className="bg-white rounded-3xl p-8 border border-shams-navy/10 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-shams-navy flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-shams-gold" />
            یافته‌های کلیدی پژوهشی شمس در فصل اخیر:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-shams-sand/40 border border-shams-navy/5 text-xs text-shams-navy/80 space-y-1">
              <div className="font-bold text-shams-navy">۱. کاهش ۲۸٪ مقاومت به انسولین</div>
              <p className="leading-relaxed">
                شرکت‌کنندگانی که حداقل ۱۵۰ دقیقه پیاده‌روی سریع هفتگی به همراه تمرینات مقاومتی سبک انجام داده‌اند، بهبود چشمگیری در HbA1c نشان داده‌اند.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-shams-sand/40 border border-shams-navy/5 text-xs text-shams-navy/80 space-y-1">
              <div className="font-bold text-shams-navy">۲. ارتقای ۶۴ درصدی کیفیت خواب</div>
              <p className="leading-relaxed">
                رعایت پروتکل کاهش نور آبی شبانه و مکمل منیزیم گلیسینات باعث افزایش زمان خواب مفید از ۵.۵ به ۷.۲ ساعت در کوهورت کم‌خواب شده است.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-shams-sand/40 border border-shams-navy/5 text-xs text-shams-navy/80 space-y-1">
              <div className="font-bold text-shams-navy">۳. بهبود تعادل حرکتی در سالمندان</div>
              <p className="leading-relaxed">
                کاهش ۴۱ درصدی ریسک سقوط در افراد بالای ۶۰ سال متعاقب انجام برنامه ۱۲ هفته‌ای سواد حرکتی و تمرینات تقارن ایستا.
              </p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
