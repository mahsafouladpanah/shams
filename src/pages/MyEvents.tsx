import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Users, ArrowLeft, Filter, Search, CheckCircle2, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

const myEvents = [
  {
    id: 1,
    title: 'سمینار تخصصی خواب سالم و سبک زندگی',
    type: 'سمینار',
    status: 'آینده',
    date: '۲۵ شهریور ۱۴۰۵',
    time: '۱۶:۰۰ تا ۱۹:۰۰',
    location: 'مرکز همایش‌های رازی',
    ticketCode: 'SHM-8492X',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'وبینار تغذیه و سلامت متابولیک',
    type: 'وبینار',
    status: 'گذشته',
    date: '۱۵ مرداد ۱۴۰۵',
    time: '۱۸:۰۰ تا ۲۰:۰۰',
    location: 'آنلاین (پلتفرم شمس)',
    ticketCode: 'SHM-2947Y',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    certificate: true
  },
  {
    id: 3,
    title: 'کارگاه حرکت صحیح و پیشگیری از آسیب',
    type: 'کارگاه',
    status: 'گذشته',
    date: '۱۰ تیر ۱۴۰۵',
    time: '۰۹:۰۰ تا ۱۳:۰۰',
    location: 'مجموعه ورزشی انقلاب',
    ticketCode: 'SHM-1123Z',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
    certificate: false
  }
];

export function MyEvents() {
  const [activeTab, setActiveTab] = useState('آینده');

  const filteredEvents = myEvents.filter(e => e.status === activeTab);

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Header */}
      <section className="bg-shams-navy text-white pt-16 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-shams-gold via-transparent to-transparent" />
        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-bold mb-4 border border-white/20">
            <Ticket className="w-4 h-4" /> بلیت‌ها و رویدادها
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">رویدادهای من</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            مدیریت رویدادهای ثبت‌نام شده، دریافت بلیت ورود و مشاهده گواهینامه‌های دوره‌های گذرانده شده.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="container mx-auto px-4 -mt-6 relative z-20 mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-shams-navy/5 p-2 flex max-w-md mx-auto">
          <button 
            onClick={() => setActiveTab('آینده')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'آینده' ? 'bg-shams-teal text-white shadow-md' : 'text-shams-navy/60 hover:bg-shams-sand'}`}
          >
            رویدادهای پیش‌رو
          </button>
          <button 
            onClick={() => setActiveTab('گذشته')}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'گذشته' ? 'bg-shams-navy text-white shadow-md' : 'text-shams-navy/60 hover:bg-shams-sand'}`}
          >
            سوابق رویدادها
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 max-w-5xl">
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-12 text-center border border-shams-navy/5 shadow-sm">
            <div className="w-16 h-16 bg-shams-sand rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-shams-navy/30" />
            </div>
            <h3 className="text-xl font-bold text-shams-navy mb-2">رویدادی یافت نشد</h3>
            <p className="text-shams-navy/60 mb-6">شما در حال حاضر در هیچ رویدادی ثبت‌نام نکرده‌اید.</p>
            <Link to="/events" className="inline-flex items-center gap-2 bg-shams-navy text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-shams-navy/90 transition-colors">
              مشاهده تقویم رویدادها <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-[2rem] border border-shams-navy/5 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-64 h-48 md:h-auto bg-shams-sand relative">
                  <img src={event?.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop'} alt={event?.title || 'رویداد'} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-shams-navy shadow-sm">
                    {event.type}
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-shams-navy mb-4">{event.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-shams-navy/70 font-medium mb-6">
                      <div className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4 text-shams-teal" /> {event.date}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-shams-teal" /> {event.time}</div>
                      <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-shams-teal" /> {event.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-shams-sand">
                    {event.status === 'آینده' ? (
                      <div className="bg-shams-sand px-4 py-2 rounded-xl border border-shams-navy/10 flex items-center justify-between sm:justify-start gap-4">
                        <span className="text-xs font-bold text-shams-navy/50">کد بلیت:</span>
                        <span className="font-mono font-bold text-lg text-shams-navy tracking-wider">{event.ticketCode}</span>
                      </div>
                    ) : event.certificate ? (
                      <div className="flex items-center gap-2 text-shams-sage font-bold text-sm bg-shams-sage/10 px-4 py-2 rounded-xl">
                        <CheckCircle2 className="w-4 h-4" /> گواهینامه صادر شده
                      </div>
                    ) : (
                      <div className="text-sm font-bold text-shams-navy/40">بدون گواهینامه</div>
                    )}
                    
                    <div className="flex gap-2">
                      {event.status === 'آینده' ? (
                        <>
                           <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl border-2 border-shams-navy/10 text-shams-navy font-bold text-sm hover:bg-shams-sand transition-colors">لغو ثبت‌نام</button>
                           <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-shams-teal text-white font-bold text-sm hover:bg-shams-teal/90 transition-colors shadow-md">دریافت بلیت PDF</button>
                        </>
                      ) : event.certificate ? (
                        <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-shams-navy text-white font-bold text-sm hover:bg-shams-navy/90 transition-colors shadow-md">دانلود گواهینامه</button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
