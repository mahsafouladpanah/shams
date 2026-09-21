import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, EyeOff, Lock, Mail, User as UserIcon, ArrowRight, ArrowLeft, 
  CheckCircle2, AlertCircle, ShieldCheck, HeartPulse, Sparkles, Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from '../components/Logo';

export function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const { lang, dir, t, formatNumber } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMsg(t('auth.errEmptyFields'));
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg(t('auth.errInvalidEmail'));
      return;
    }

    if (password.length < 6) {
      setErrorMsg(t('auth.errInvalidPass'));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(t('auth.errPassMismatch'));
      return;
    }

    if (!agreeTerms) {
      setErrorMsg(t('auth.errTermsRequired'));
      return;
    }

    const res = await register(name, email, password);
    if (res.success) {
      setSuccessMsg(lang === 'en' ? 'Account created successfully! Welcome to SHAMS.' : lang === 'ar' ? 'تم إنشاء الحساب بنجاح! مرحباً بك في شمس.' : 'حساب کاربری شما با موفقیت ایجاد شد! به شمس خوش آمدید.');
      setTimeout(() => {
        navigate('/services/record');
      }, 800);
    } else {
      setErrorMsg(lang === 'en' ? 'Could not create account. Please try again.' : 'خطا در ایجاد حساب کاربری.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-5.5rem)] flex items-stretch bg-shams-sand text-shams-navy" dir={dir}>
      <div className="w-full flex flex-col lg:flex-row shadow-2xl overflow-hidden min-h-[calc(100vh-5.5rem)]">
        
        {/* Left/Right Form Column (Width 50%) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-12 bg-white z-10">
          
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Header Brand & Titles */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                <Logo variant="icon" className="w-9 h-9 group-hover:scale-105 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-shams-navy tracking-tight leading-none">
                    {lang === 'en' ? 'SHAMS' : 'شمس'}
                  </span>
                  <span className="text-[10px] text-shams-teal font-semibold tracking-wider mt-0.5">
                    {lang === 'en' ? 'HEALTH ECOSYSTEM' : 'زیست‌بوم جامع سلامت'}
                  </span>
                </div>
              </Link>

              <h1 className="text-2xl sm:text-3xl font-bold text-shams-navy tracking-tight">
                {t('auth.registerTitle')}
              </h1>
              <p className="mt-1.5 text-xs text-shams-navy/70 leading-relaxed">
                {t('auth.registerSubtitle')}
              </p>
            </div>

            {/* Notifications */}
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-shams-burgundy/10 border border-shams-burgundy/20 text-shams-burgundy text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-2xl bg-shams-teal/10 border border-shams-teal/20 text-shams-teal text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-shams-navy">
                  {t('auth.fullName')}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-shams-navy/40`}>
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('auth.fullNamePlaceholder')}
                    className={`w-full py-3 rounded-2xl bg-shams-sand/50 border border-shams-navy/15 text-xs text-shams-navy font-medium placeholder-shams-navy/40 focus:outline-none focus:ring-2 focus:ring-shams-teal focus:bg-white transition-all ${
                      dir === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-shams-navy">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-shams-navy/40`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('auth.emailPlaceholder')}
                    className={`w-full py-3 rounded-2xl bg-shams-sand/50 border border-shams-navy/15 text-xs text-shams-navy font-medium placeholder-shams-navy/40 focus:outline-none focus:ring-2 focus:ring-shams-teal focus:bg-white transition-all ${
                      dir === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-shams-navy">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-shams-navy/40`}>
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.passwordPlaceholder')}
                    className={`w-full py-3 rounded-2xl bg-shams-sand/50 border border-shams-navy/15 text-xs text-shams-navy font-medium placeholder-shams-navy/40 focus:outline-none focus:ring-2 focus:ring-shams-teal focus:bg-white transition-all ${
                      dir === 'rtl' ? 'pr-10 pl-11' : 'pl-10 pr-11'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 ${dir === 'rtl' ? 'left-0 pl-3.5' : 'right-0 pr-3.5'} flex items-center text-shams-navy/40 hover:text-shams-navy transition-colors cursor-pointer`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-shams-navy">
                  {t('auth.confirmPassword')}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-shams-navy/40`}>
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    className={`w-full py-3 rounded-2xl bg-shams-sand/50 border border-shams-navy/15 text-xs text-shams-navy font-medium placeholder-shams-navy/40 focus:outline-none focus:ring-2 focus:ring-shams-teal focus:bg-white transition-all ${
                      dir === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Agreement checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded-md border-shams-navy/30 text-shams-teal focus:ring-shams-teal cursor-pointer"
                  />
                  <span className="text-[11px] text-shams-navy/70 leading-relaxed">
                    {t('auth.termsAgreement')}
                  </span>
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-shams-teal hover:bg-shams-navy text-white text-xs sm:text-sm font-bold shadow-lg shadow-shams-teal/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t('auth.registering')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('auth.registerButton')}</span>
                    {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </button>
            </form>

            {/* Switch to Login */}
            <div className="pt-3 border-t border-shams-navy/10 text-center text-xs text-shams-navy/70">
              <span>{t('auth.alreadyHaveAccount')} </span>
              <Link to="/login" className="font-bold text-shams-teal hover:underline inline-flex items-center gap-1">
                <span>{t('auth.loginNow')}</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Right Hero Image Column (Width 50%) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-shams-navy text-white overflow-hidden items-end p-12 lg:p-16">
          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1600&auto=format&fit=crop"
            alt="SHAMS Movement and Wellness"
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 filter brightness-95"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-shams-navy via-shams-navy/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-shams-navy/40 to-transparent" />
          
          <div className="absolute top-12 left-12 w-48 h-48 bg-shams-teal/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-12 right-12 w-56 h-56 bg-shams-mauve/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-lg space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white backdrop-blur-md text-xs font-semibold shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-shams-gold" />
              <span>{lang === 'en' ? 'Join 24,000+ Health Conscious Members' : <>پیوستن به بیش از <span className="font-numeric font-bold">{formatNumber('24,000')}</span> عضو آگاه زیست‌بوم شمس</>}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              {lang === 'en' ? 'Holistic Health Centered Around You' : 'سلامت یکپارچه، متمرکز بر ویژگی‌های فردی شما'}
            </h2>

            <div className="space-y-3 pt-2 text-xs text-white/85">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-shams-teal/30 flex items-center justify-center text-shams-teal border border-shams-teal">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <span>{lang === 'en' ? 'Evidence-based clinical assessments & calculators' : 'دسترسی نامحدود به ابزارها و ارزیابی‌های استاندارد بالینی'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-shams-sage/30 flex items-center justify-center text-shams-sage border border-shams-sage">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <span>{lang === 'en' ? 'Personalized lifestyle medicine protocols' : 'طراحی برنامه‌های فردی‌سازی شده سلامت و فعالیت بدنی'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-shams-gold/30 flex items-center justify-center text-shams-gold border border-shams-gold">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <span>{lang === 'en' ? 'Secure digital health records and monitoring' : 'پرونده یکپارچه سلامت الکترونیک و پایش شاخص‌های زیستی'}</span>
              </div>
            </div>

            {/* Author Attribution */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/20">
              <div className="w-10 h-10 rounded-full bg-shams-teal flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{t('auth.quoteAuthor')}</div>
                <div className="text-[10px] text-white/70">
                  {lang === 'en' ? 'Translating clinical research into better daily life' : 'تبدیل شواهد پزشکی به کیفیت برتر زندگی روزمره'}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
