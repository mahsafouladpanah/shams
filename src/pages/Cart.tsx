import React, { useState } from 'react';
import { 
  ShoppingCart, Trash2, Plus, Minus, CreditCard, ShieldCheck, 
  ArrowLeft, ArrowRight, CheckCircle2, Truck, Sparkles, AlertCircle,
  Package, MapPin, Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';

export function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { lang, dir, t, formatNumber, formatCurrency, isRTL } = useLanguage();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderTrackingCode, setOrderTrackingCode] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    name: lang === 'en' ? 'Alex Taylor' : lang === 'ar' ? 'علي المنصوري' : 'علی رضایی',
    phone: lang === 'en' ? '+1 555-0199' : '۰۹۱۲۳۴۵۶۷۸۹',
    city: lang === 'en' ? 'Tehran / London' : 'تهران',
    address: lang === 'en' ? '12 Valiasr Ave, Suite 4' : 'خیابان ولیعصر، نرسیده به پارک وی، پلاک ۱۲، واحد ۴',
    postalCode: '۱۹۶۵۸۷۴۱۲۳'
  });

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'shams' || promoCode.trim().toLowerCase() === 'shams20') {
      setDiscountPercent(20);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError(
        lang === 'en' ? 'Invalid discount code (Try: SHAMS)' : 
        lang === 'ar' ? 'رمز الخصم غير صالح (جرب: SHAMS)' : 
        'کد تخفیف نامعتبر است (کد آزمایشی: SHAMS)'
      );
    }
  };

  const discountAmount = (totalPrice * discountPercent) / 100;
  const shippingFee = totalPrice > 500000 || totalPrice === 0 ? 0 : 45000;
  const finalPayable = totalPrice - discountAmount + shippingFee;

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const tracking = 'SHM-' + Math.floor(100000 + Math.random() * 900000);
    setOrderTrackingCode(tracking);
    setIsOrderPlaced(true);
    setIsCheckoutOpen(false);
    clearCart();
  };

  // Determine current active checkout pathway step
  const activeStep = isOrderPlaced ? 4 : isCheckoutOpen ? 3 : items.length > 0 ? 2 : 1;

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen" dir={dir}>
      {/* 100% Full-Width Visual Hero */}
      <PageHero heroId="cart" themeAccent="gold" />

      {/* SHOPPING FLOW STEPPER INDICATOR */}
      <section className="container mx-auto px-3 sm:px-4 max-w-5xl -mt-6 mb-6 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-shams-navy/10 shadow-sm">
          <div className="text-[11px] font-bold text-shams-navy/50 uppercase tracking-wider mb-2.5 sm:mb-3 text-center sm:text-start">
            {lang === 'en' ? 'Purchase Process Steps' : 'مراحل فرایند خرید شمس'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs">
            
            {/* Step 1: Product Selection */}
            <div className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all min-w-0 ${
              activeStep >= 1 ? 'bg-shams-sand/80 border-shams-navy/15 text-shams-navy font-bold' : 'bg-shams-sand/40 border-shams-navy/5 text-shams-navy/40'
            }`}>
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-shams-navy/15 text-shams-navy flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-numeric shrink-0">
                <Check className="w-3.5 h-3.5 text-shams-teal" />
              </span>
              <span className="truncate text-[11px] sm:text-xs">{lang === 'en' ? '1. Product & Steps' : '۱. انتخاب محصول و شیوه مصرف'}</span>
            </div>

            {/* Step 2: Review Cart */}
            <div className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all min-w-0 ${
              activeStep === 2
                ? 'bg-shams-teal/10 border-shams-teal/30 text-shams-teal font-bold shadow-xs'
                : activeStep > 2
                ? 'bg-shams-sand/80 border-shams-navy/15 text-shams-navy font-bold'
                : 'bg-shams-sand/40 border-shams-navy/5 text-shams-navy/40'
            }`}>
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-numeric shrink-0 ${
                activeStep === 2 ? 'bg-shams-teal text-white' : activeStep > 2 ? 'bg-shams-navy/15 text-shams-navy' : 'bg-shams-navy/10 text-shams-navy/40'
              }`}>
                {activeStep > 2 ? <Check className="w-3.5 h-3.5 text-shams-teal" /> : formatNumber(2)}
              </span>
              <span className="truncate text-[11px] sm:text-xs">{lang === 'en' ? '2. Review Cart' : '۲. بررسی سبد خرید'}</span>
            </div>

            {/* Step 3: Checkout */}
            <div className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all min-w-0 ${
              activeStep === 3
                ? 'bg-shams-teal/10 border-shams-teal/30 text-shams-teal font-bold shadow-xs'
                : activeStep > 3
                ? 'bg-shams-sand/80 border-shams-navy/15 text-shams-navy font-bold'
                : 'bg-shams-sand/40 border-shams-navy/5 text-shams-navy/40'
            }`}>
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-numeric shrink-0 ${
                activeStep === 3 ? 'bg-shams-teal text-white' : activeStep > 3 ? 'bg-shams-navy/15 text-shams-navy' : 'bg-shams-navy/10 text-shams-navy/40'
              }`}>
                {activeStep > 3 ? <Check className="w-3.5 h-3.5 text-shams-teal" /> : formatNumber(3)}
              </span>
              <span className="truncate text-[11px] sm:text-xs">{lang === 'en' ? '3. Shipping & Payment' : '۳. آدرس و درگاه پرداخت'}</span>
            </div>

            {/* Step 4: Purchase Confirmation */}
            <div className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border transition-all min-w-0 ${
              activeStep === 4
                ? 'bg-shams-green-primary/10 border-shams-green-primary/30 text-shams-green-primary font-bold shadow-xs'
                : 'bg-shams-sand/40 border-shams-navy/5 text-shams-navy/40'
            }`}>
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-numeric shrink-0 ${
                activeStep === 4 ? 'bg-shams-green-primary text-white' : 'bg-shams-navy/10 text-shams-navy/40'
              }`}>
                {formatNumber(4)}
              </span>
              <span className="truncate text-[11px] sm:text-xs">{lang === 'en' ? '4. Confirmation' : '۴. تایید نهایی سفارش'}</span>
            </div>

          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-5xl relative z-20">
        {items.length === 0 && !isOrderPlaced ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-shams-navy/10 space-y-4">
            <div className="w-20 h-20 bg-shams-sand rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-shams-navy/30" />
            </div>
            <h2 className="text-2xl font-bold text-shams-navy">{t('cart.empty')}</h2>
            <p className="text-shams-navy/60 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
              {t('cart.emptyDesc')}
            </p>
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center bg-shams-navy text-white px-8 py-3.5 rounded-2xl font-bold text-xs hover:bg-shams-teal transition-all shadow-md"
              >
                {t('cart.continueShopping')}
              </Link>
            </div>
          </div>
        ) : isOrderPlaced ? (
          /* PURCHASE CONFIRMATION VIEW */
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-lg border border-shams-navy/10 space-y-6">
            <div className="w-20 h-20 bg-shams-teal/10 rounded-full flex items-center justify-center mx-auto text-shams-teal animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-shams-green-primary/10 text-shams-green-primary text-xs font-bold mb-2">
                {lang === 'en' ? 'Step 4 of 4: Purchase Confirmed' : 'مرحله ۴ از ۴: سفارش قطعی شد'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-shams-navy mb-2">
                {lang === 'en' ? 'Your order has been placed successfully!' : lang === 'ar' ? 'تم تسجيل طلبك بنجاح!' : 'سفارش شما با موفقیت پرداخت و ثبت گردید!'}
              </h2>
              <p className="text-xs md:text-sm text-shams-navy/70 max-w-lg mx-auto leading-relaxed">
                {lang === 'en' 
                  ? 'An electronic invoice and tracking updates have been recorded. You can view your clinical protocols and schedule right from your SHAMS profile.'
                  : lang === 'ar'
                  ? 'تم إصدار الفاتورة الإلكترونية وتفاصيل التتبع. يمكنك مراجعة البروتوكولات الموصى بها في حسابك.'
                  : 'رسید الکترونیکی و دستورالعمل‌های اختصاصی در پرونده سلامت شما ثبت شد. محموله در بسته‌بندی محرمانه با ضمانت اصالت شمس ارسال خواهد شد.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-shams-sand/70 max-w-md mx-auto border border-shams-navy/10 space-y-3 text-xs">
              <div className="flex justify-between items-center text-shams-navy/70">
                <span>{lang === 'en' ? 'Order Reference Code:' : 'کد پیگیری سفارش:'}</span>
                <span className="font-numeric font-bold text-sm text-shams-navy">{orderTrackingCode}</span>
              </div>
              <div className="flex justify-between items-center text-shams-navy/70">
                <span>{lang === 'en' ? 'Delivery Address:' : 'آدرس تحویل:'}</span>
                <span className="font-bold text-shams-navy text-start truncate max-w-[200px]">{shippingAddress.address}</span>
              </div>
              <div className="flex justify-between items-center text-shams-navy/70">
                <span>{lang === 'en' ? 'Status:' : 'وضعیت مرسوله:'}</span>
                <span className="inline-flex items-center gap-1 text-shams-teal font-bold">
                  <Truck className="w-3.5 h-3.5" />
                  <span>آماده‌سازی در انبار مرکزی</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/shop"
                className="px-6 py-3.5 rounded-xl bg-shams-navy text-white text-xs font-bold hover:bg-shams-teal transition-all shadow-md"
              >
                {t('cart.continueShopping')}
              </Link>
              <Link
                to="/services/record"
                className="px-6 py-3.5 rounded-xl border border-shams-navy/20 text-shams-navy text-xs font-bold hover:bg-shams-sand transition-all"
              >
                {lang === 'en' ? 'View Health Record' : lang === 'ar' ? 'عرض السجل الصحي' : 'مشاهده پرونده سلامت'}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((cartItem) => {
                const product = cartItem.product || cartItem;
                const quantity = cartItem.quantity || 1;
                const itemId = String(product?.id || cartItem.id);

                return (
                  <div 
                    key={itemId}
                    className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-shams-navy/10 flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-between"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto min-w-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-shams-sand shrink-0 border border-shams-navy/10">
                        <img 
                          src={product?.image || 'https://images.unsplash.com/photo-1615486511484-92e172cb41ea?q=80&w=300'} 
                          alt={product?.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-shams-sand text-shams-navy/60 inline-block border border-shams-navy/5">
                          {product?.category === 'packs' ? 'پک سلامت شمس' : product?.category === 'digital' ? 'برنامه دیجیتال' : 'مکمل بالینی'}
                        </span>
                        <h3 className="font-bold text-sm text-shams-navy truncate">{product?.name}</h3>
                        <p className="text-xs font-numeric font-bold text-shams-teal">
                          {formatCurrency(product?.price || 0)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-shams-sand">
                      <div className="flex items-center border border-shams-navy/20 rounded-xl sm:rounded-2xl p-1 bg-white">
                        <button
                          onClick={() => updateQuantity(itemId, quantity - 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl hover:bg-shams-sand flex items-center justify-center font-bold text-shams-navy cursor-pointer transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 sm:w-8 text-center font-bold font-numeric text-xs text-shams-navy">{formatNumber(quantity)}</span>
                        <button
                          onClick={() => updateQuantity(itemId, quantity + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl hover:bg-shams-sand flex items-center justify-center font-bold text-shams-navy cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-numeric font-bold text-sm text-shams-navy min-w-[90px] text-end">
                        {formatCurrency((product?.price || 0) * quantity)}
                      </div>

                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="text-shams-navy/30 hover:text-shams-burgundy p-2 cursor-pointer transition-colors"
                        title={t('cart.remove')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-shams-navy/50 hover:text-shams-burgundy font-bold cursor-pointer transition-colors"
                >
                  {t('cart.clear')}
                </button>
                <Link
                  to="/shop"
                  className="text-xs font-bold text-shams-teal hover:underline flex items-center gap-1"
                >
                  <span>{t('cart.continueShopping')}</span>
                  {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </Link>
              </div>
            </div>

            {/* Sidebar Summary Box */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Discount / Coupon Box */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-shams-navy/10 space-y-3">
                <h3 className="font-bold text-xs text-shams-navy">
                  {lang === 'en' ? 'Discount Code / Voucher' : lang === 'ar' ? 'كوبون الخصم' : 'کد تخفیف یا هدیه شمس'}
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={lang === 'en' ? 'Enter SHAMS' : 'کد را وارد کنید (مثال: SHAMS)'}
                    className="flex-1 bg-shams-sand/50 border border-shams-navy/20 rounded-2xl px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-shams-teal text-shams-navy"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-shams-navy hover:bg-shams-teal text-white rounded-2xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? 'Apply' : lang === 'ar' ? 'تطبيق' : 'اعمال کد'}
                  </button>
                </div>

                {promoApplied && (
                  <div className="text-xs text-shams-green-primary font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {lang === 'en' ? '20% Welcome Discount applied!' : lang === 'ar' ? 'تم تطبيق خصم ٢٠٪ بنجاح!' : 'تخفیف ۲۰ درصدی شمس با موفقیت اعمال شد!'}
                    </span>
                  </div>
                )}

                {promoError && (
                  <div className="text-xs text-shams-burgundy font-bold flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{promoError}</span>
                  </div>
                )}
              </div>

              {/* Invoice Summary Box */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-shams-navy/10 space-y-4">
                <h3 className="font-bold text-sm text-shams-navy border-b border-shams-sand pb-3">
                  {lang === 'en' ? 'Order Invoice Summary' : lang === 'ar' ? 'ملخص الطلب' : 'خلاصه فاکتور سفارش'}
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-shams-navy/70">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-mono font-bold text-shams-navy">{formatCurrency(totalPrice)}</span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-shams-teal font-bold">
                      <span>{t('cart.discount')} ({formatNumber(discountPercent)}%)</span>
                      <span className="font-mono">- {formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-shams-navy/70">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-shams-navy/40" />
                      <span>{t('cart.shipping')}</span>
                    </span>
                    <span className="font-numeric font-bold text-shams-navy">
                      {shippingFee === 0 
                        ? (lang === 'en' ? 'Free Dispatch' : lang === 'ar' ? 'شحن مجاني' : 'رایگان (سفارش بالا)') 
                        : formatCurrency(shippingFee)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-shams-sand flex justify-between items-center text-sm font-bold text-shams-navy">
                    <span>{t('cart.total')}</span>
                    <span className="text-base text-shams-teal font-numeric font-bold">{formatCurrency(finalPayable)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-shams-teal hover:bg-shams-navy text-white text-xs sm:text-sm font-bold shadow-lg shadow-shams-teal/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Proceed to Checkout' : 'تکمیل اطلاعات و تسویه حساب'}</span>
                </button>

                <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-shams-navy/60">
                  <ShieldCheck className="w-4 h-4 text-shams-teal" />
                  <span>{lang === 'en' ? 'Guaranteed Genuine Formulation' : lang === 'ar' ? 'ضمان الأصالة والمطابقة السريرية' : 'تضمین اصالت دارویی و استاندارد GMP'}</span>
                </div>
              </div>

            </div>

          </div>
        )}
      </section>

      {/* Checkout Modal / Drawer */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-shams-navy/10 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-4 border-b border-shams-sand">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-shams-teal" />
                <div>
                  <h3 className="font-bold text-base text-shams-navy">
                    {lang === 'en' ? 'Shipping Details & Payment' : lang === 'ar' ? 'تفاصيل التوصيل وبوابة الدفع' : 'مرحله ۳: مشخصات تحویل و درگاه پرداخت'}
                  </h3>
                  <p className="text-[11px] text-shams-navy/50">گام نهایی تا ثبت و ارسال سفارش</p>
                </div>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-xs text-shams-navy/40 hover:text-shams-navy cursor-pointer font-bold w-7 h-7 rounded-full bg-shams-sand flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCompletePayment} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-shams-navy/70 mb-1">
                    {lang === 'en' ? 'Full Name' : lang === 'ar' ? 'الاسم الكامل' : 'نام و نام‌خانوادگی'}
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.name}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-shams-navy/20 font-bold focus:ring-2 focus:ring-shams-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-shams-navy/70 mb-1">
                    {lang === 'en' ? 'Phone Number' : lang === 'ar' ? 'رقم الهاتف' : 'شماره تماس همراه'}
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-shams-navy/20 font-bold focus:ring-2 focus:ring-shams-teal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-shams-navy/70 mb-1">
                  {lang === 'en' ? 'Delivery Address' : lang === 'ar' ? 'عنوان التوصيل بالتفصيل' : 'نشانی دقیق پستی'}
                </label>
                <textarea
                  required
                  rows={2}
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-shams-navy/20 font-bold leading-relaxed focus:ring-2 focus:ring-shams-teal outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-shams-navy/70 mb-1">
                    {lang === 'en' ? 'City' : lang === 'ar' ? 'المدينة' : 'شهر مقصد'}
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-shams-navy/20 font-bold focus:ring-2 focus:ring-shams-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-shams-navy/70 mb-1">
                    {lang === 'en' ? 'Postal Code' : lang === 'ar' ? 'الرمز البريدي' : 'کد پستی ۱۰ رقمی'}
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-shams-navy/20 font-mono focus:ring-2 focus:ring-shams-teal outline-none"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-shams-sand/60 border border-shams-navy/10 space-y-2">
                <div className="font-bold text-shams-navy flex items-center justify-between">
                  <span>{lang === 'en' ? 'Secure Payment Portal' : lang === 'ar' ? 'بوابة الدفع الإلكتروني الآمنة' : 'درگاه امن شاپرک (بانک سامان / ملت)'}</span>
                  <CreditCard className="w-4 h-4 text-shams-teal" />
                </div>
                <p className="text-[11px] text-shams-navy/60 leading-relaxed">
                  {lang === 'en' ? 'Payable Amount:' : lang === 'ar' ? 'المبلغ الإجمالي:' : 'مبلغ قابل پرداخت:'} <span className="font-bold text-shams-navy text-sm font-mono">{formatCurrency(finalPayable)}</span>
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-shams-navy/20 text-xs font-bold text-shams-navy hover:bg-shams-sand cursor-pointer"
                >
                  {lang === 'en' ? 'Cancel' : lang === 'ar' ? 'إلغاء' : 'انصراف'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-shams-teal text-white text-xs font-bold hover:bg-shams-navy transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Confirm & Complete' : lang === 'ar' ? 'تأكيد الدفع والطلب' : 'پرداخت و ثبت نهایی'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
