import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ShoppingBag, Star, ArrowLeft, ArrowRight, Search, Filter, Sparkles, 
  Users, HeartPulse, Zap, Plus, Check, ShieldCheck, Tag 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { 
  sampleProducts, shopGoals, shopLifeStages, shopHealthNeeds, Product 
} from '../data/products';
import { PageHero } from '../components/PageHero';

export function Shop() {
  const { lang, t, formatNumber, isRTL } = useLanguage();
  const { addToCart, items } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeGoal = searchParams.get('goal');
  const activeStage = searchParams.get('lifestage');
  const activeNeed = searchParams.get('need');
  const activeFilter = searchParams.get('filter') || 'all';
  const activeStore = searchParams.get('store');

  const [searchQuery, setSearchQuery] = useState('');
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setJustAdded(product.id);
    setTimeout(() => setJustAdded(null), 1800);
  };

  const filteredProducts = sampleProducts.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }

    if (activeGoal && p.goal !== activeGoal) return false;
    if (activeStage && p.lifeStage !== activeStage) return false;
    if (activeNeed && p.healthNeed !== activeNeed) return false;

    if (activeFilter === 'packs' && p.category !== 'packs') return false;
    if (activeFilter === 'digital' && p.category !== 'digital') return false;
    if (activeFilter === 'recommended' && !p.isRecommended) return false;

    if (activeStore === 'aging' && p.healthNeed !== 'aging') return false;
    if (activeStore === 'kids' && p.lifeStage !== 'children') return false;
    if (activeStore === 'women' && p.goal !== 'beauty' && p.goal !== 'stress') return false;

    return true;
  });

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Editorial Page Hero with Clinical Nutraceutical Visual */}
      <PageHero
        heroId="shop"
        layoutVariant="asymmetric"
        themeAccent="gold"
      >
        <div className="relative max-w-xl mt-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search verified supplements, packs, digital protocols...' : 'جستجو در مکمل‌ها، پک‌های تخصصی، برنامه‌های دیجیتال...'}
            className="w-full bg-white/15 border border-white/25 rounded-2xl py-3.5 px-5 pr-12 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-shams-gold focus:bg-white/25 transition-all shadow-lg backdrop-blur-sm"
          />
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 ${isRTL ? 'right-4' : 'left-auto right-4'}`} />
        </div>
      </PageHero>

      {/* Main Shop View */}
      <section className="container mx-auto px-4 max-w-6xl -mt-6 relative z-20 space-y-8">
        
        {/* Navigation Categories Filter Bar */}
        <div className="bg-white rounded-3xl p-4 border border-shams-navy/10 shadow-md flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSearchParams({})}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              !activeGoal && !activeStage && !activeNeed && activeFilter === 'all' && !activeStore
                ? 'bg-shams-navy text-white'
                : 'text-shams-navy/70 hover:bg-shams-sand'
            }`}
          >
            همه محصولات
          </button>
          <button
            onClick={() => setSearchParams({ filter: 'packs' })}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'packs' ? 'bg-shams-navy text-white' : 'text-shams-navy/70 hover:bg-shams-sand'
            }`}
          >
            پک‌های سلامت شمس
          </button>
          <button
            onClick={() => setSearchParams({ filter: 'digital' })}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'digital' ? 'bg-shams-navy text-white' : 'text-shams-navy/70 hover:bg-shams-sand'
            }`}
          >
            شمس دیجیتال
          </button>
          <button
            onClick={() => setSearchParams({ filter: 'recommended' })}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === 'recommended' ? 'bg-shams-navy text-white' : 'text-shams-navy/70 hover:bg-shams-sand'
            }`}
          >
            پیشنهاد شمس
          </button>
          <button
            onClick={() => setSearchParams({ store: 'aging' })}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeStore === 'aging' ? 'bg-shams-navy text-white' : 'text-shams-navy/70 hover:bg-shams-sand'
            }`}
          >
            فروشگاه سالمندی سالم (فاز ۲)
          </button>
          <button
            onClick={() => setSearchParams({ store: 'kids' })}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeStore === 'kids' ? 'bg-shams-navy text-white' : 'text-shams-navy/70 hover:bg-shams-sand'
            }`}
          >
            شمس کودک (فاز ۲)
          </button>
          <button
            onClick={() => setSearchParams({ store: 'women' })}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeStore === 'women' ? 'bg-shams-navy text-white' : 'text-shams-navy/70 hover:bg-shams-sand'
            }`}
          >
            سلامت بانوان (فاز ۲)
          </button>
        </div>

        {/* Goal Sub-Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-shams-navy/50 font-bold shrink-0">فیلتر بر اساس هدف:</span>
          {shopGoals.map((g) => (
            <button
              key={g.id}
              onClick={() => setSearchParams({ goal: g.id })}
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                activeGoal === g.id
                  ? 'bg-shams-teal text-white border-shams-teal'
                  : 'bg-white border-shams-sand text-shams-navy/70 hover:bg-shams-sand'
              }`}
            >
              {lang === 'en' ? g.nameEn : lang === 'ar' ? g.nameAr : g.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const inCart = items.find(item => item.product?.id === p.id || item.id === p.id);
            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-5 border border-shams-navy/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-shams-sand mb-4 relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {p.isRecommended && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-shams-gold text-shams-navy text-[10px] font-bold shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        توصیه شمس
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[10px] font-numeric" dir="ltr">
                      <span className="font-bold">{p.rating}</span> ★ (<span className="font-semibold">{formatNumber(p.reviewsCount)}</span>)
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] text-shams-teal font-semibold px-2 py-0.5 rounded-md bg-shams-teal/10">
                      {p.category === 'packs' ? 'پک سلامت' : p.category === 'digital' ? 'محصول دیجیتال' : 'مکمل بالینی'}
                    </span>
                    <span className={`text-[10px] font-semibold ${p.inStock ? 'text-shams-green-primary' : 'text-shams-burgundy'}`}>
                      {p.inStock ? 'موجود در انبار' : 'اتمام موجودی'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-shams-navy mt-1 mb-0.5 group-hover:text-shams-teal transition-colors">
                    <Link to={`/shop/product/${p.id}`}>{p.name}</Link>
                  </h3>
                  <div className="text-[11px] text-shams-navy/40 font-mono mb-2" dir="ltr">{p.nameEn}</div>

                  <p className="text-xs text-shams-navy/70 line-clamp-2 leading-relaxed mb-4">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-shams-sand flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-shams-navy flex items-baseline gap-1">
                      <span className="font-numeric font-bold text-base">{formatNumber(p.price)}</span> <span className="text-[10px] font-normal text-shams-navy/60">تومان</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/shop/product/${p.id}`}
                      className="px-3 py-2 rounded-xl border border-shams-navy/15 text-xs font-semibold text-shams-navy hover:bg-shams-sand"
                    >
                      جزییات
                    </Link>
                    <button
                      onClick={() => handleAddToCart(p)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        justAdded === p.id 
                          ? 'bg-shams-green-primary text-white' 
                          : 'bg-shams-navy text-white hover:bg-shams-teal'
                      }`}
                    >
                      {justAdded === p.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>افزوده شد</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>خرید {inCart ? <span className="font-numeric font-bold mr-0.5">({formatNumber(inCart.quantity)})</span> : ''}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-shams-navy/10">
            <ShoppingBag className="w-12 h-12 text-shams-navy/30 mx-auto mb-3" />
            <p className="text-sm font-bold text-shams-navy">محصولی مطابق با فیلترهای انتخابی یافت نشد.</p>
            <button
              onClick={() => { setSearchQuery(''); setSearchParams({}); }}
              className="mt-4 px-6 py-2 rounded-xl bg-shams-navy text-white text-xs font-bold cursor-pointer"
            >
              مشاهده تمام محصولات
            </button>
          </div>
        )}

      </section>
    </div>
  );
}
