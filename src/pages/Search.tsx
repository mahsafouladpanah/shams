import React, { useState } from 'react';
import { Search as SearchIcon, ArrowLeft, BookOpen, ShoppingBag, FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

const categories = [
  { id: 'all', label: 'همه نتایج' },
  { id: 'articles', label: 'مقالات علمی', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'products', label: 'محصولات', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'assessments', label: 'ارزیابی‌ها', icon: <FileText className="w-4 h-4" /> },
  { id: 'events', label: 'رویدادها', icon: <Calendar className="w-4 h-4" /> },
];

const mockResults = [
  { id: 1, type: 'articles', title: 'تأثیر خواب عمیق بر سلامت متابولیک', desc: 'بررسی ارتباط بین کیفیت خواب و تنظیم انسولین در بدن بر اساس آخرین تحقیقات.', link: '/knowledge' },
  { id: 2, type: 'products', title: 'بسته مکمل سلامت خواب شمس', desc: 'ترکیبی از منیزیم و عصاره‌های گیاهی برای بهبود کیفیت خواب.', link: '/shop' },
  { id: 3, type: 'events', title: 'سمینار تخصصی خواب سالم', desc: '۲۵ شهریور، مرکز همایش‌های رازی. با حضور دکتر محمدی.', link: '/events/1' },
  { id: 4, type: 'assessments', title: 'ارزیابی جامع کیفیت خواب', desc: 'پرسشنامه علمی برای سنجش کیفیت و الگوهای خواب شما.', link: '/assessment' },
];

export function Search() {
  const [query, setQuery] = useState('خواب');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredResults = mockResults.filter(r => 
    (activeCategory === 'all' || r.type === activeCategory) && 
    (r.title.includes(query) || r.desc.includes(query) || query === '')
  );

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      <PageHero heroId="search" themeAccent="teal">
        <div className="relative max-w-2xl mt-2">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در مقالات، محصولات، رویدادها..."
            className="w-full bg-white/15 border-2 border-white/30 text-white placeholder-white/60 rounded-2xl px-6 py-4 pl-14 outline-none focus:border-shams-teal focus:bg-white/25 transition-all text-base md:text-lg font-bold backdrop-blur-md shadow-2xl"
          />
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/70" />
        </div>
      </PageHero>

      <section className="container mx-auto px-4 max-w-4xl -mt-8 relative z-20">
        
        {/* Categories */}
        <div className="bg-white rounded-2xl shadow-lg border border-shams-navy/5 p-2 flex gap-2 overflow-x-auto hide-scrollbar mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat.id 
                  ? 'bg-shams-navy text-white shadow-md' 
                  : 'text-shams-navy/60 hover:bg-shams-sand hover:text-shams-navy'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-shams-navy/5 p-6 md:p-8 min-h-[400px]">
          {query === '' ? (
            <div className="text-center py-20 text-shams-navy/40 font-bold text-lg">
              عبارت مورد نظر خود را جستجو کنید
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-shams-navy/40 font-bold text-lg mb-2">نتیجه‌ای برای «{query}» یافت نشد.</div>
              <p className="text-sm text-shams-navy/50">لطفاً کلمات کلیدی دیگری را امتحان کنید.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-sm font-bold text-shams-navy/50 mb-4 px-2">
                {filteredResults.length} نتیجه برای «{query}» یافت شد
              </div>
              {filteredResults.map(result => (
                <Link 
                  to={result.link} 
                  key={result.id}
                  className="flex items-center justify-between p-5 rounded-2xl border-2 border-transparent hover:border-shams-sand hover:bg-shams-sand/30 transition-all group"
                >
                  <div>
                    <h3 className="font-bold text-shams-navy text-lg mb-2 group-hover:text-shams-teal transition-colors">{result.title}</h3>
                    <p className="text-sm text-shams-navy/60 leading-relaxed max-w-2xl">{result.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-shams-sand flex items-center justify-center text-shams-navy group-hover:bg-shams-teal group-hover:text-white transition-colors shrink-0 mr-4 transform -rotate-45 group-hover:rotate-0">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </section>
    </div>
  );
}
