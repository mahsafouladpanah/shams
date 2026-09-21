import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Users, ArrowLeft, Filter, Search, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';

const events = [
  {
    id: 1,
    title: 'سمینار تخصصی خواب سالم و سبک زندگی',
    type: 'سمینار',
    topic: 'خواب',
    date: '۲۵ شهریور ۱۴۰۵',
    time: '۱۶:۰۰ تا ۱۹:۰۰',
    duration: '۳ ساعت',
    speaker: 'دکتر محمدی',
    location: 'مرکز همایش‌های رازی',
    isOnline: false,
    capacity: 200,
    registered: 156,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    desc: 'بررسی علمی تأثیر کیفیت خواب بر سلامت روان و متابولیک همراه با ارائه راهکارهای عملی.'
  },
  {
    id: 2,
    title: 'وبینار تغذیه و سلامت متابولیک',
    type: 'وبینار',
    topic: 'تغذیه',
    date: '۲۸ شهریور ۱۴۰۵',
    time: '۱۸:۰۰ تا ۲۰:۰۰',
    duration: '۲ ساعت',
    speaker: 'دکتر رضوی',
    location: 'آنلاین (پلتفرم شمس)',
    isOnline: true,
    capacity: 500,
    registered: 342,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    desc: 'آشنایی با اصول تغذیه برای کنترل قند خون و پیشگیری از سندرم متابولیک.'
  },
  {
    id: 3,
    title: 'کارگاه حرکت صحیح و پیشگیری از آسیب',
    type: 'کارگاه',
    topic: 'ورزش',
    date: '۳۱ شهریور ۱۴۰۵',
    time: '۰۹:۰۰ تا ۱۳:۰۰',
    duration: '۴ ساعت',
    speaker: 'استاد کریمی',
    location: 'مجموعه ورزشی انقلاب',
    isOnline: false,
    capacity: 30,
    registered: 28,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
    desc: 'آموزش عملی الگوهای حرکتی صحیح برای کاهش دردهای مفصلی و آسیب‌های ورزشی.'
  },
  {
    id: 4,
    title: 'سمینار سالمندی سالم و فعال',
    type: 'سمینار',
    topic: 'سالمندی',
    date: '۱۵ شهریور ۱۴۰۵',
    time: '۱۵:۰۰ تا ۱۸:۰۰',
    duration: '۳ ساعت',
    speaker: 'دکتر احمدی',
    location: 'سالن همایش‌های شمس',
    isOnline: false,
    capacity: 150,
    registered: 80,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
    desc: 'چگونه در دوران میانسالی و سالمندی، کیفیت زندگی و استقلال جسمانی خود را حفظ کنیم؟'
  }
];

export function Events() {
  const [activeFilter, setActiveFilter] = useState('همه');
  const [activeTopic, setActiveTopic] = useState('همه');
  const [activeDate, setActiveDate] = useState<string | null>(null);

  const types = ['همه', 'سمینار', 'وبینار', 'کارگاه', 'رویداد ورزشی', 'رویداد علمی'];
  const topics = ['همه', 'تغذیه', 'ورزش', 'خواب', 'سلامت روان', 'سالمندی', 'سلامت متابولیک'];

  const eventDates = events.map(e => e.date);
  const daysOfWeek = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  const startDayOffset = 1; // Starts on Sunday
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const filteredEvents = events.filter(e => {
    if (activeFilter !== 'همه' && e.type !== activeFilter) return false;
    if (activeTopic !== 'همه' && e.topic !== activeTopic) return false;
    if (activeDate && e.date !== activeDate) return false;
    return true;
  });

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Editorial Page Hero with Academic Symposium Visual */}
      <PageHero
        heroId="academy"
        layoutVariant="asymmetric"
        themeAccent="burgundy"
      >
        <div className="flex bg-white/10 rounded-2xl p-1.5 max-w-md border border-white/20 mt-4 backdrop-blur-sm">
          <button className="flex-1 bg-white text-shams-navy py-2 rounded-xl font-bold text-xs shadow-sm cursor-pointer">تقویم رویدادها و دوره‌ها</button>
          <button className="flex-1 text-white py-2 rounded-xl font-bold text-xs hover:bg-white/10 transition-colors cursor-pointer">آرشیو کارگاه‌های گذشته</button>
        </div>
      </PageHero>

      {/* Filters */}
      <section className="container mx-auto px-4 -mt-6 relative z-20 mb-12">
        <div className="bg-white rounded-2xl shadow-lg border border-shams-navy/5 p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 text-shams-navy font-bold flex-shrink-0 px-4">
            <Filter className="w-5 h-5" /> فیلترها:
          </div>
          <div className="flex-1 w-full overflow-x-auto pb-2 md:pb-0 hide-scrollbar flex gap-2">
            {types.map(t => (
              <button 
                key={t}
                onClick={() => setActiveFilter(t)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === t ? 'bg-shams-teal text-white shadow-md' : 'bg-shams-sand text-shams-navy/70 hover:bg-shams-navy/5'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="w-px h-8 bg-shams-navy/10 hidden md:block" />
          <select 
            value={activeTopic}
            onChange={(e) => setActiveTopic(e.target.value)}
            className="w-full md:w-auto bg-shams-sand border-none rounded-xl px-4 py-2 text-sm font-medium text-shams-navy focus:ring-2 focus:ring-shams-teal outline-none cursor-pointer"
          >
            {topics.map(t => <option key={t} value={t}>{t === 'همه' ? 'همه موضوعات' : t}</option>)}
          </select>
        </div>
      </section>

      {/* Schedule Calendar */}
      <section className="container mx-auto px-4 mb-12">
        <div className="bg-white rounded-[2rem] shadow-lg border border-shams-navy/5 p-6 md:p-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-shams-navy flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-shams-teal" />
              تقویم رویدادها
            </h2>
            <div className="flex items-center gap-4">
              <div className="text-shams-navy/80 font-bold">شهریور ۱۴۰۵</div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-shams-sand flex items-center justify-center text-shams-navy hover:bg-shams-navy/10 transition-colors">
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
                <button className="w-8 h-8 rounded-full bg-shams-sand flex items-center justify-center text-shams-navy hover:bg-shams-navy/10 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-bold text-shams-navy/50 pb-2 border-b border-shams-sand">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            
            {daysInMonth.map(day => {
              const persianDay = new Intl.NumberFormat('fa-IR').format(day);
              const fullDateString = `${persianDay} شهریور ۱۴۰۵`;
              const hasEvent = eventDates.includes(fullDateString);
              const isSelected = activeDate === fullDateString;
              
              return (
                <button
                  key={day}
                  onClick={() => setActiveDate(isSelected ? null : fullDateString)}
                  disabled={!hasEvent}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all ${
                    isSelected 
                      ? 'bg-shams-teal text-white shadow-md scale-105' 
                      : hasEvent 
                        ? 'bg-shams-teal/10 text-shams-teal hover:bg-shams-teal/20 cursor-pointer' 
                        : 'text-shams-navy/30 bg-transparent cursor-default'
                  }`}
                >
                  <span className="font-bold text-lg">{persianDay}</span>
                  {hasEvent && !isSelected && (
                    <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-shams-teal" />
                  )}
                  {hasEvent && isSelected && (
                    <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>
              )
            })}
          </div>
          
          {activeDate && (
             <div className="mt-6 p-4 bg-shams-teal/5 border border-shams-teal/20 rounded-xl flex items-center justify-between animate-in fade-in zoom-in-95 duration-200">
                <div className="text-shams-navy font-bold text-sm">
                  در حال نمایش رویدادهای: <span className="text-shams-teal">{activeDate}</span>
                </div>
                <button 
                  onClick={() => setActiveDate(null)}
                  className="text-xs font-bold text-shams-burgundy bg-shams-burgundy/10 px-4 py-2 rounded-lg hover:bg-shams-burgundy/20 transition-colors"
                >
                  حذف فیلتر تقویم
                </button>
             </div>
          )}
        </div>
      </section>

      {/* Events List */}
      <section className="container mx-auto px-4">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 text-shams-navy/50 font-medium">
            رویدادی با این مشخصات یافت نشد.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-[2rem] border border-shams-navy/5 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col sm:flex-row group">
                <div className="w-full sm:w-2/5 aspect-video sm:aspect-auto bg-shams-sand relative overflow-hidden">
                  <img src={event?.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop'} alt={event?.title || 'رویداد شمس'} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-shams-navy shadow-sm">
                    {event.type}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-shams-teal text-sm font-bold mb-2">{event.topic}</div>
                  <h3 className="text-xl font-bold text-shams-navy mb-4 leading-snug line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-2 mb-6 text-sm text-shams-navy/70 font-medium">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-shams-navy/40" /> {event.date} - {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-shams-navy/40" /> {event.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-shams-navy/40" /> ظرفیت: {event.capacity} نفر
                    </div>
                  </div>
                  
                  <Link to={`/events/${event.id}`} className="mt-auto w-full py-3 rounded-xl border-2 border-shams-navy/10 text-shams-navy font-bold flex justify-center items-center gap-2 hover:bg-shams-sand transition-colors group-hover:border-shams-teal/30 group-hover:bg-shams-teal/5 group-hover:text-shams-teal">
                    مشاهده جزئیات <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
