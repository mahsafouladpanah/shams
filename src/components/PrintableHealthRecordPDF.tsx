import React from 'react';
import { ShieldCheck, Activity, HeartPulse, Moon, Scale, Sparkles, Brain, Utensils, CheckCircle2 } from 'lucide-react';

interface PrintablePDFProps {
  score: number;
  userName: string;
  userCode: string;
  reportDate: string;
  riskLevel: string;
  dimensions: Array<{ name: string; score: number }>;
  kpis: Array<{ label: string; value: string; trend: string; status: string }>;
  insights: Array<{ title: string; desc: string; priority: string }>;
  history: Array<{ name: string; date: string; score: string; status: string }>;
}

export const PrintableHealthRecordPDF: React.FC<PrintablePDFProps> = ({
  score = 84,
  userName = "علی رضایی",
  userCode = "SHAMS-90214",
  reportDate = "۱۸ شهریور ۱۴۰۳",
  riskLevel = "کم‌خطر متابولیک",
  dimensions = [],
  kpis = [],
  insights = [],
  history = []
}) => {
  return (
    <div 
      id="shams-printable-pdf" 
      className="bg-white text-slate-900 p-8 w-[800px] font-sans text-right dir-rtl leading-normal border border-slate-200"
      dir="rtl"
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-6 border-b-2 border-[#0F888D] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#0A2540] text-white flex items-center justify-center font-bold text-xl">
            ش
          </div>
          <div>
            <h1 className="text-xl font-black text-[#0A2540] tracking-tight">سامانه جامع تحلیل و پایش سلامت شمس</h1>
            <p className="text-xs text-slate-500 font-medium">اکوسیستم هوشمند سلامت و ارتقای سبک زندگی - دانشگاه علوم پزشکی</p>
          </div>
        </div>
        <div className="text-left text-xs text-slate-600 font-mono space-y-1">
          <div><strong className="text-[#0A2540]">کد پرونده:</strong> {userCode}</div>
          <div><strong className="text-[#0A2540]">تاریخ گزارش:</strong> {reportDate}</div>
          <div><strong className="text-[#0A2540]">وضعیت ریسک:</strong> <span className="text-[#0F888D] font-bold">{riskLevel}</span></div>
        </div>
      </div>

      {/* Patient Profile & Overall Score Row */}
      <div className="grid grid-cols-3 gap-4 mb-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div className="col-span-2 space-y-2">
          <h2 className="text-sm font-bold text-[#0A2540]">اطلاعات متقاضی و خلاصه وضعیت بالینی</h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div><span className="text-slate-500">نام و نام خانوادگی:</span> <strong className="text-slate-800">{userName}</strong></div>
            <div><span className="text-slate-500">سن بیولوژیک برآوردی:</span> <strong className="text-[#0F888D]">۳۰ سال (تقویمی: ۳۳)</strong></div>
            <div><span className="text-slate-500">پزشک ناظر پرونده:</span> <strong className="text-slate-800">دکتر کاوه مهران</strong></div>
            <div><span className="text-slate-500">مرکز ارزیابی:</span> <strong className="text-slate-800">کلینیک دیجیتال شمس</strong></div>
          </div>
          <p className="text-xs text-slate-600 mt-2 pt-2 border-t border-slate-200 leading-relaxed">
            وضعیت شاخص‌های متابولیک، کیفیت خواب و فعالیت بدنی کاربر در سطح مطلوبی ارزیابی شده است. پیشنهاد می‌شود برای حفظ روند صعودی، توصیه‌های تغذیه‌ای و تمرینات اصلاحی تداوم یابد.
          </p>
        </div>

        <div className="col-span-1 bg-white p-4 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center">
          <div className="text-xs font-bold text-slate-500 mb-1">امتیاز کل سلامت</div>
          <div className="text-4xl font-black text-[#0F888D] my-1">{score}</div>
          <div 
            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(15, 136, 141, 0.12)', color: '#0F888D' }}
          >
            سطح مطلوب (از ۱۰۰)
          </div>
        </div>
      </div>

      {/* Core KPIs Summary */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-[#0F888D]" />
          شاخص‌های کلیدی بیومارکرها و عملکرد (KPIs)
        </h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="text-[10px] font-bold text-slate-500">{kpi.label}</div>
              <div className="text-sm font-black text-[#0A2540] my-0.5">{kpi.value}</div>
              <div className="text-[9px] font-bold text-[#0F888D]">{kpi.trend}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Health Dimensions Breakdown */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#0F888D]" />
          تحلیل ابعاد هفت‌گانه سلامت (Health Dimensions)
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {dimensions.map((dim, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-700">{dim.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#0F888D] h-full rounded-full" 
                    style={{ width: `${dim.score}%` }} 
                  />
                </div>
                <span className="font-bold text-[#0A2540] w-7 text-left">{dim.score}٪</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intelligent Insights */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          بینش‌های اختصاصی و توصیه‌های الگوریتم شمس
        </h3>
        <div className="space-y-2">
          {insights.map((ins, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border-r-4 border-[#0F888D] border-y border-l border-slate-200 text-xs">
              <div className="flex items-center justify-between font-bold text-[#0A2540] mb-0.5">
                <span>{ins.title}</span>
                <span 
                  className="text-[10px] px-2 py-0.5 rounded-md font-bold"
                  style={{ backgroundColor: 'rgba(15, 136, 141, 0.12)', color: '#0F888D' }}
                >
                  {ins.priority}
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">{ins.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment History Table */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider mb-3">
          سابقه ارزیابی‌های اخیر
        </h3>
        <table className="w-full text-xs text-right border-collapse">
          <thead>
            <tr className="bg-[#0A2540] text-white">
              <th className="p-2 rounded-r-lg font-bold">عنوان ارزیابی</th>
              <th className="p-2 font-bold">تاریخ</th>
              <th className="p-2 font-bold">امتیاز / نتیجه</th>
              <th className="p-2 rounded-l-lg font-bold">وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {history.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-2 font-bold text-slate-800">{item.name}</td>
                <td className="p-2 text-slate-600">{item.date}</td>
                <td className="p-2 font-bold text-[#0F888D]">{item.score}</td>
                <td className="p-2 text-slate-700">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer & Medical Disclaimer */}
      <div className="pt-4 border-t-2 border-slate-200 text-[10px] text-slate-500 space-y-1.5 text-center">
        <div className="flex items-center justify-between font-bold text-slate-700">
          <span>سامانه پایش هوشمند سلامت شمس (SHAMS Health Analytics)</span>
          <span>صفحه ۱ از ۱</span>
        </div>
        <p className="leading-relaxed text-slate-400">
          <strong>تکذیبیه پزشکی:</strong> اطلاعات مندرج در این گزارش بر اساس پایش داده‌ها و الگوریتم‌های تحلیلی هوشمند تولید شده است و جایگزین تشخیص، معاینه یا دستور مستقیم پزشک معالج نیست. در صورت بروز هرگونه علائم حاد یا سوالات تخصصی، با مرکز درمانی مشورت فرمایید.
        </p>
      </div>
    </div>
  );
};
