import React, { useState, useRef } from 'react';
import { User, Lock, Bell, Shield, Settings as SettingsIcon, Camera, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/PageHero';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showToast, setShowToast] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* 100% Full-Width Visual Hero */}
      <PageHero heroId="settings" themeAccent="teal" />

      <div className="container mx-auto px-4 -mt-8 relative z-20 max-w-6xl">
        
        {showToast && (
          <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
            <div className="bg-shams-green-deep text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 font-bold border border-shams-green-mint/30">
              <CheckCircle2 className="w-5 h-5 text-shams-green-mint" />
              تغییرات با موفقیت ذخیره شد.
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 pt-4">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<User />} text="اطلاعات شخصی" />
          <TabButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={<Lock />} text="امنیت حساب" />
          <TabButton active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={<Bell />} text="تنظیمات اعلان‌ها" />
          <TabButton active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')} icon={<Shield />} text="حریم خصوصی" />
          <TabButton active={activeTab === 'preferences'} onClick={() => setActiveTab('preferences')} icon={<SettingsIcon />} text="ترجیحات" />
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-[2rem] p-8 shadow-sm border border-shams-navy/5 min-h-[500px]">
          
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-shams-navy mb-6">ویرایش پروفایل</h2>
              
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-shams-sand">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-shams-green-border group">
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-shams-navy/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                </div>
                <div>
                  <button onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-shams-green-primary mb-2 hover:underline block cursor-pointer">تغییر تصویر پروفایل</button>
                  <button className="text-sm font-bold text-shams-burgundy hover:underline block cursor-pointer">حذف تصویر</button>
                </div>
              </div>

              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="نام و نام خانوادگی" defaultValue="علی رضایی" />
                <Input label="ایمیل" type="email" defaultValue="ali.rezaei@example.com" />
                <Input label="شماره موبایل" type="tel" defaultValue="09123456789" dir="ltr" />
                <Input label="تاریخ تولد" type="text" defaultValue="۱۳۶۵/۰۴/۱۲" />
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-shams-navy">جنسیت</label>
                  <select className="w-full bg-shams-sand border border-transparent focus:border-shams-green-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all text-shams-navy cursor-pointer">
                    <option>مرد</option>
                    <option>زن</option>
                    <option>سایر</option>
                  </select>
                </div>
                <Input label="شهر" defaultValue="تهران" />
                
                <div className="md:col-span-2">
                   <label className="block text-sm font-bold text-shams-navy mb-2">اهداف سلامت (کوتاه)</label>
                   <textarea className="w-full bg-shams-sand border border-transparent focus:border-shams-green-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all text-shams-navy min-h-[100px]" defaultValue="بهبود کیفیت خواب عمیق و کاهش استرس ناشی از کار." />
                </div>

                <div className="md:col-span-2 mt-4 flex justify-end">
                  <button type="submit" className="bg-shams-green-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-shams-green-deep transition-all shadow-md shadow-shams-green-primary/20 cursor-pointer">ذخیره تغییرات</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-2xl font-bold text-shams-navy mb-6">تنظیمات اعلان‌ها</h2>
              <div className="flex flex-col gap-6">
                <Toggle title="اعلان نتایج ارزیابی" desc="اطلاع‌رسانی هنگام آماده شدن نتایج و تحلیل‌های جدید." defaultChecked />
                <Toggle title="یادآوری برنامه سلامت" desc="یادآوری روزانه برای انجام فعالیت‌های برنامه سلامت شخصی." defaultChecked />
                <Toggle title="یادآوری فعالیت و خواب" desc="هشدارهای هوشمند برای تنظیم ساعت خواب و تحرک." />
                <Toggle title="اعلان رویدادها" desc="اطلاع از رویدادها، سمینارها و وبینارهای مرتبط با سلامت شما." defaultChecked />
                <Toggle title="خبرنامه و پیشنهادها" desc="دریافت ایمیل‌های آموزشی و پیشنهادهای محصولات شمس." />
                <div className="mt-6 flex justify-end">
                  <button onClick={handleSave} className="bg-shams-green-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-shams-green-deep transition-all shadow-md shadow-shams-green-primary/20 cursor-pointer">ذخیره تنظیمات</button>
                </div>
              </div>
            </div>
          )}
          
          {/* Other tabs */}
          {['security', 'privacy', 'preferences'].includes(activeTab) && (
            <div className="flex items-center justify-center h-full min-h-[400px] text-shams-navy/40 font-medium">
              محتوای بخش {activeTab}
            </div>
          )}

        </div>
      </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, text }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
        active ? 'bg-shams-green-light text-shams-green-deep border border-shams-green-border shadow-xs' : 'text-shams-navy/70 hover:bg-shams-sand hover:text-shams-navy'
      }`}
    >
      <div className="w-5 h-5">{icon}</div>
      {text}
    </button>
  );
}

function Input({ label, type = 'text', defaultValue, dir = 'rtl' }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-shams-navy">{label}</label>
      <input 
        type={type} 
        defaultValue={defaultValue} 
        dir={dir}
        className={`w-full bg-shams-sand border border-transparent focus:border-shams-green-primary focus:bg-white rounded-xl px-4 py-3 outline-none transition-all text-shams-navy ${dir === 'ltr' ? 'text-left' : 'text-right'}`}
      />
    </div>
  );
}

function Toggle({ title, desc, defaultChecked = false }: any) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-shams-sand hover:border-shams-green-border/60 transition-colors">
      <div>
        <div className="font-bold text-shams-navy mb-1">{title}</div>
        <div className="text-sm text-shams-navy/60">{desc}</div>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 cursor-pointer ${checked ? 'bg-shams-green-primary' : 'bg-shams-navy/20'}`}
      >
        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}
