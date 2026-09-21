import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Activity, Moon, Utensils, Brain, Trophy, ChevronLeft, ArrowUpRight, Plus, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';

const activityData = [
  { name: 'شنبه', steps: 4000 },
  { name: '۱ش', steps: 5000 },
  { name: '۲ش', steps: 8000 },
  { name: '۳ش', steps: 6500 },
  { name: '۴ش', steps: 9000 },
  { name: '۵ش', steps: 7500 },
  { name: 'جمعه', steps: 11000 },
];

const healthRadarData = [
  { subject: 'فعالیت', A: 80, fullMark: 100 },
  { subject: 'تغذیه', A: 65, fullMark: 100 },
  { subject: 'خواب', A: 90, fullMark: 100 },
  { subject: 'روان', A: 70, fullMark: 100 },
  { subject: 'متابولیک', A: 85, fullMark: 100 },
];

export function Dashboard() {
  const { lang, formatNumber, isRTL } = useLanguage();

  return (
    <div className="w-full bg-shams-sand pb-24">
      {/* Editorial Page Hero with Biometric Analytics & Monitoring Interface */}
      <PageHero
        heroId="dashboard"
        layoutVariant="split"
        themeAccent="teal"
      >
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Link 
            to="/assessment" 
            className="bg-shams-gold text-shams-navy px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-white transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'en' ? 'New Clinical Assessment' : 'ثبت ارزیابی جدید'}</span>
          </Link>
          <Link 
            to="/dashboard/record" 
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            <FileText className="w-4 h-4 text-shams-gold" />
            <span>{lang === 'en' ? 'Electronic Health Record (EHR)' : 'مشاهده پرونده الکترونیک'}</span>
          </Link>
        </div>
      </PageHero>

      <div className="container mx-auto px-4 py-8 max-w-7xl -mt-6 relative z-20">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column (Left/RTL -> Right side visually) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Health Score Card */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-shams-green-border/80 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-shams-green-light rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative w-40 h-40 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#EAF5EE" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2A7B4D" strokeWidth="8" strokeDasharray="283" strokeDashoffset="283 * 0.22" className="drop-shadow-md" style={{ strokeDashoffset: 283 - (283 * 78) / 100 }} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="metric-large text-4xl font-bold text-shams-green-deep">{formatNumber(78)}</span>
                <span className="text-xs text-shams-green-deep/70 font-semibold">از <span className="font-numeric font-semibold">{formatNumber(100)}</span></span>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-right z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-shams-green-light text-shams-green-deep border border-shams-green-border text-sm font-semibold mb-3">
                <ArrowUpRight className="w-4 h-4 text-shams-green-primary" />
                <span><span className="font-numeric font-bold">{formatNumber(4)}</span> امتیاز رشد سلامت</span>
              </div>
              <h2 className="text-2xl font-bold text-shams-navy mb-2">شاخص سلامت عمومی شما</h2>
              <p className="text-shams-navy/70 leading-relaxed mb-6">
                وضعیت شاخص‌های سلامت شما نسبت به ماه گذشته بهبود یافته است. تمرکز بر تغذیه طبیعی و خواب پایدار نتایج اثربخشی داشته است.
              </p>
              <Link to="/dashboard/record" className="inline-flex items-center gap-2 text-shams-green-primary font-bold hover:text-shams-green-deep hover:gap-3 transition-all">
                مشاهده پرونده کامل سلامت
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-shams-green-border/60">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-shams-navy flex items-center gap-2">
                <Activity className="w-6 h-6 text-shams-green-primary" />
                فعالیت بدنی (قدم‌ها)
              </h3>
              <select className="bg-shams-green-subtle border border-shams-green-border/50 rounded-lg text-sm px-3 py-1.5 text-shams-green-deep font-bold outline-none cursor-pointer">
                <option>۷ روز گذشته</option>
                <option>۳۰ روز گذشته</option>
              </select>
            </div>
            <div className="h-[250px] w-full" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#082F4A', opacity: 0.5, fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#082F4A', opacity: 0.5, fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: '1px solid #C4E4CE', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)' }}
                    itemStyle={{ color: '#2A7B4D', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="steps" stroke="#2A7B4D" strokeWidth={4} dot={{ r: 4, fill: '#2A7B4D', strokeWidth: 0 }} activeDot={{ r: 8, strokeWidth: 0, fill: '#68AF7B' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          
          {/* Radar Chart */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-shams-green-border/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-shams-navy">تعادل ابعاد سلامت</h3>
              <span className="text-xs font-semibold bg-shams-green-light text-shams-green-deep px-2.5 py-1 rounded-full">
                میانگین <span className="font-numeric font-bold">{formatNumber('82%')}</span>
              </span>
            </div>
            <div className="h-[200px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={healthRadarData}>
                  <PolarGrid stroke="#EAF5EE" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#082F4A', fontSize: 12, fontWeight: 600 }} />
                  <Radar name="شما" dataKey="A" stroke="#2A7B4D" fill="#68AF7B" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-shams-green-border/60">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-shams-navy flex items-center gap-2">
                <Trophy className="w-5 h-5 text-shams-gold" />
                اهداف سلامت امروز
              </h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <GoalItem icon={<Activity />} title={`${formatNumber(8000)} قدم`} current={6500} total={8000} color="green" />
              <GoalItem icon={<Moon />} title={`${formatNumber(7.5)} ساعت خواب`} current={6} total={7.5} color="sage" />
              <GoalItem icon={<Utensils />} title="کالری مصرفی" current={1800} total={2200} color="burgundy" />
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
  );
}

function GoalItem({ icon, title, current, total, color }: any) {
  const { formatNumber } = useLanguage();
  const percent = Math.min(100, Math.round((current / total) * 100));
  
  const colorHex = {
    green: '#2A7B4D',
    sage: '#68AF7B',
    burgundy: '#A43E56',
  }[color as string] || '#2A7B4D';

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-shams-navy font-medium text-sm">
          <div className="text-shams-green-primary w-4 h-4">{icon}</div>
          {title}
        </div>
        <div className="text-xs font-semibold text-shams-navy/70">
          <span className="font-numeric font-bold">{formatNumber(current)}</span> / <span className="font-numeric font-bold">{formatNumber(total)}</span>
        </div>
      </div>
      <div className="w-full bg-shams-green-light h-2 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percent}%`, backgroundColor: colorHex }} />
      </div>
    </div>
  );
}
