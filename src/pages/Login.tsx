import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft, CheckCircle2, 
  AlertCircle, ShieldCheck, HeartPulse, Sparkles, UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from '../components/Logo';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  const { lang, dir, t } = useLanguage();

  const [emailOrUser, setEmailOrUser] = useState('ali.rezaei@example.com');
  const [password, setPassword] = useState('shams12345');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Read redirect destination if available
  const redirectPath = (location.state as { from?: string })?.from || '/services/record';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!emailOrUser.trim() || !password.trim()) {
      setErrorMsg(t('auth.errEmptyFields'));
      return;
    }

    const emailToUse = emailOrUser.includes('@') ? emailOrUser : `${emailOrUser}@shams-health.com`;
    const res = await login(emailToUse, password, rememberMe);

    if (res.success) {
      setSuccessMsg(lang === 'en' ? 'Welcome back! Redirecting to your dashboard...' : lang === 'ar' ? 'مرحباً بعودتك! جارٍ التوجيه إلى لوحة التحكم...' : 'خوش آمدید! در حال انتقال به پرونده سلامت...');
      setTimeout(() => {
        navigate(redirectPath);
      }, 700);
    } else {
      if (res.error === 'invalid_email') {
        setErrorMsg(t('auth.errInvalidEmail'));
      } else if (res.error === 'invalid_password') {
        setErrorMsg(t('auth.errInvalidPass'));
      } else {
        setErrorMsg(lang === 'en' ? 'Authentication failed. Please verify credentials.' : 'اطلاعات ورود صحیح نمی‌باشد.');
      }
    }
  };

  const handleQuickDemo = async () => {
    setEmailOrUser('ali.rezaei@example.com');
    setPassword('shams12345');
    setErrorMsg(null);
    const res = await login('ali.rezaei@example.com', 'shams12345', true);
    if (res.success) {
      setSuccessMsg(lang === 'en' ? 'Demo user authenticated!' : 'ورود با حساب کاربری دمو انجام شد.');
      setTimeout(() => navigate('/services/record'), 600);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      alert(t('auth.errInvalidEmail'));
      return;
    }
    setForgotSent(true);
    setTimeout(() => {
      setForgotSent(false);
      setForgotModalOpen(false);
      setForgotEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-5.5rem)] flex items-stretch bg-shams-sand text-shams-navy" dir={dir}>
      <div className="w-full flex flex-col lg:flex-row shadow-2xl overflow-hidden min-h-[calc(100vh-5.5rem)]">
        
        {/* Left/Right Form Column (Width 50%) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-12 bg-white z-10">
          
          <div className="max-w-md w-full mx-auto space-y-8">
            
            {/* Header Brand & Titles */}
            <div>
              <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
                <Logo variant="icon" className="w-10 h-10 group-hover:scale-105 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-shams-navy tracking-tight leading-none">
                    {lang === 'en' ? 'SHAMS' : 'شمس'}
                  </span>
                  <span className="text-[10px] text-shams-teal font-semibold tracking-wider mt-0.5">
                    {lang === 'en' ? 'HEALTH ECOSYSTEM' : 'زیست‌بوم جامع سلامت'}
                  </span>
                </div>
              </Link>

              <h1 className="text-3xl sm:text-4xl font-bold text-shams-navy tracking-tight">
                {t('auth.loginTitle')}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-shams-navy/70 leading-relaxed">
                {t('auth.loginSubtitle')}
              </p>
            </div>

            {/* Prototype Notice Badge */}
            <div className="p-3.5 rounded-2xl bg-shams-sand border border-shams-navy/10 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-shams-teal shrink-0 mt-0.5" />
              <div className="text-xs">
                <div className="font-bold text-shams-navy">{t('auth.demoNotice')}</div>
                <div className="text-shams-navy/70 text-[11px] mt-0.5 leading-relaxed">{t('auth.demoNoticeDesc')}</div>
              </div>
            </div>

            {/* Feedback Notifications */}
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email / Username field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-shams-navy">
                  {t('auth.emailOrUser')}
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-shams-navy/40`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={emailOrUser}
                    onChange={(e) => setEmailOrUser(e.target.value)}
                    placeholder={t('auth.emailOrUserPlaceholder')}
                    className={`w-full py-3.5 rounded-2xl bg-shams-sand/50 border border-shams-navy/15 text-xs text-shams-navy font-medium placeholder-shams-navy/40 focus:outline-none focus:ring-2 focus:ring-shams-teal focus:bg-white transition-all ${
                      dir === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-shams-navy">
                    {t('auth.password')}
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-[11px] font-bold text-shams-teal hover:underline cursor-pointer"
                  >
                    {t('auth.forgotPassword')}
                  </button>
                </div>
                
                <div className="relative">
                  <div className={`absolute inset-y-0 ${dir === 'rtl' ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-shams-navy/40`}>
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('auth.passwordPlaceholder')}
                    className={`w-full py-3.5 rounded-2xl bg-shams-sand/50 border border-shams-navy/15 text-xs text-shams-navy font-medium placeholder-shams-navy/40 focus:outline-none focus:ring-2 focus:ring-shams-teal focus:bg-white transition-all ${
                      dir === 'rtl' ? 'pr-10 pl-11' : 'pl-10 pr-11'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 ${dir === 'rtl' ? 'left-0 pl-3.5' : 'right-0 pr-3.5'} flex items-center text-shams-navy/40 hover:text-shams-navy transition-colors cursor-pointer`}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-md border-shams-navy/30 text-shams-teal focus:ring-shams-teal cursor-pointer"
                  />
                  <span className="text-xs text-shams-navy/80 font-medium">
                    {t('auth.rememberMe')}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-shams-teal hover:bg-shams-navy text-white text-xs sm:text-sm font-bold shadow-lg shadow-shams-teal/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t('auth.loggingIn')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('auth.loginButton')}</span>
                    {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </>
                )}
              </button>

              {/* Quick Demo Button */}
              <button
                type="button"
                onClick={handleQuickDemo}
                className="w-full py-3 rounded-2xl border border-shams-navy/15 bg-shams-sand/40 hover:bg-shams-sand text-shams-navy text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-shams-gold" />
                <span>{t('auth.quickDemoFill')}</span>
              </button>
            </form>

            {/* Switch to Registration */}
            <div className="pt-4 border-t border-shams-navy/10 text-center text-xs text-shams-navy/70">
              <span>{t('auth.dontHaveAccount')} </span>
              <Link to="/register" className="font-bold text-shams-teal hover:underline inline-flex items-center gap-1">
                <span>{t('auth.registerNow')}</span>
              </Link>
            </div>

          </div>
        </div>

        {/* Right Hero Image Column (Width 50%) — Art-Directed Health & Vitality */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-shams-navy text-white overflow-hidden items-end p-12 lg:p-16">
          
          {/* High-Resolution Art-Directed Health & Wellbeing Image */}
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop"
            alt="SHAMS Vitality and Health"
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 filter brightness-95 contrast-105"
          />

          {/* Deep Navy to Teal Tinted Radial & Linear Gradients Matching Palette */}
          <div className="absolute inset-0 bg-gradient-to-t from-shams-navy via-shams-navy/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-shams-navy/40 to-transparent" />
          
          {/* Subtle Color Accent Flares from Authoritative Palette */}
          <div className="absolute top-10 right-10 w-48 h-48 bg-shams-gold/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-shams-teal/20 rounded-full blur-3xl pointer-events-none" />

          {/* Foreground Overlay Content */}
          <div className="relative z-10 max-w-lg space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white backdrop-blur-md text-xs font-bold shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-shams-gold" />
              <span>{lang === 'en' ? 'From Science to Better Living' : lang === 'ar' ? 'من العلم إلى حياة أرقى' : 'از دانش تا زندگی بهتر'}</span>
            </div>

            {/* Inspirational Quote */}
            <blockquote className="text-xl sm:text-2xl font-bold leading-relaxed text-white drop-shadow-md">
              {t('auth.quoteText')}
            </blockquote>

            {/* Author Attribution */}
            <div className="flex items-center gap-3 pt-2 border-t border-white/20">
              <div className="w-10 h-10 rounded-full bg-shams-teal flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{t('auth.quoteAuthor')}</div>
                <div className="text-[10px] text-white/70">
                  {lang === 'en' ? 'Lifestyle Medicine & Preventative Care' : 'پزشکی سبک زندگی و پیشگیری'}
                </div>
              </div>
            </div>

            {/* Color Palette Indicators */}
            <div className="flex items-center gap-2 pt-2">
              <span className="w-3 h-3 rounded-full bg-shams-navy border border-white/40" title="Deep Navy" />
              <span className="w-3 h-3 rounded-full bg-shams-teal border border-white/40" title="Teal" />
              <span className="w-3 h-3 rounded-full bg-shams-sage border border-white/40" title="Sage Green" />
              <span className="w-3 h-3 rounded-full bg-shams-gold border border-white/40" title="Warm Gold" />
              <span className="w-3 h-3 rounded-full bg-shams-mauve border border-white/40" title="Mauve Purple" />
              <span className="w-3 h-3 rounded-full bg-shams-burgundy border border-white/40" title="Burgundy Red" />
            </div>

          </div>

        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-shams-navy/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-shams-navy/10 space-y-5">
            <div>
              <h3 className="text-xl font-bold text-shams-navy">{t('auth.forgotPassword')}</h3>
              <p className="text-xs text-shams-navy/70 mt-1">
                {lang === 'en' ? 'Enter your email address to receive password reset instructions.' : 'ایمیل ثبت‌شده خود را وارد فرمایید تا لینک بازیابی ارسال شود.'}
              </p>
            </div>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-shams-teal/10 border border-shams-teal/20 text-shams-teal text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{lang === 'en' ? 'Reset link sent! Please check your inbox.' : 'لینک بازیابی رمز عبور با موفقیت به ایمیل شما ارسال شد.'}</span>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-shams-navy mb-1">{t('auth.email')}</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full py-3 px-4 rounded-xl bg-shams-sand/40 border border-shams-navy/15 text-xs text-shams-navy focus:outline-none focus:ring-2 focus:ring-shams-teal"
                    required
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-shams-navy/20 text-xs font-bold text-shams-navy hover:bg-shams-sand"
                  >
                    {t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-shams-teal text-white text-xs font-bold hover:bg-shams-navy transition-all"
                  >
                    {lang === 'en' ? 'Send Link' : 'ارسال لینک'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
