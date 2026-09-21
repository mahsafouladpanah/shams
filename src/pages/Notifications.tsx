import React, { useState } from 'react';
import { 
  Bell, Calendar, FileText, Gift, Info, CheckCircle2, 
  Trash2, ArrowLeft, ArrowRight, ExternalLink, Activity, 
  HeartPulse, Database, Sparkles, ShieldCheck 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotifications, NotificationItem } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/PageHero';

export function Notifications() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();
  const { lang, dir, t, formatNumber } = useLanguage();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotifTitle = (n: NotificationItem) => lang === 'en' ? n.titleEn : lang === 'ar' ? n.titleAr : n.titleFa;
  const getNotifDesc = (n: NotificationItem) => lang === 'en' ? n.descEn : lang === 'ar' ? n.descAr : n.descFa;
  const getNotifTime = (n: NotificationItem) => lang === 'en' ? n.timeEn : lang === 'ar' ? n.timeAr : n.timeFa;

  const getIcon = (type: string) => {
    switch (type) {
      case 'assessment': return <Activity className="w-5 h-5 text-shams-teal" />;
      case 'event': return <Calendar className="w-5 h-5 text-shams-navy" />;
      case 'plan': return <HeartPulse className="w-5 h-5 text-shams-green-primary" />;
      case 'promotion': return <Sparkles className="w-5 h-5 text-shams-gold" />;
      case 'research': return <Database className="w-5 h-5 text-shams-teal" />;
      default: return <ShieldCheck className="w-5 h-5 text-shams-navy" />;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  return (
    <div className="w-full pb-24 bg-shams-sand min-h-screen">
      {/* Header Full-Width Visual Hero */}
      <PageHero heroId="notifications" themeAccent="teal">
        <div className="flex flex-wrap gap-2.5 mt-2">
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead} 
              className="text-xs font-bold text-white hover:bg-white/25 transition-all flex items-center gap-1.5 bg-white/15 px-4 py-2.5 rounded-xl backdrop-blur-md cursor-pointer border border-white/20"
            >
              <CheckCircle2 className="w-4 h-4 text-shams-teal-light" /> 
              <span>{t('notif.markAll')}</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button 
              onClick={clearAll} 
              className="text-xs font-bold text-white/80 hover:text-white hover:bg-white/15 transition-all flex items-center gap-1.5 px-3 py-2.5 rounded-xl cursor-pointer border border-white/10"
            >
              <Trash2 className="w-4 h-4" /> 
              <span>{t('notif.clearAll')}</span>
            </button>
          )}
        </div>
      </PageHero>

      {/* Main Content List */}
      <section className="container mx-auto px-4 max-w-4xl -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-shams-navy/10 overflow-hidden flex flex-col min-h-[420px]">
          
          {/* Controls Bar: Filter Tabs & Unread Count */}
          <div className="p-4 sm:p-5 border-b border-shams-sand flex flex-wrap justify-between items-center gap-3 bg-white/70">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === 'all' ? 'bg-shams-navy text-white shadow-xs' : 'bg-shams-sand text-shams-navy hover:bg-shams-sand/80'
                }`}
              >
                {lang === 'en' ? 'All Messages' : lang === 'ar' ? 'كافة الرسائل' : 'همه پیام‌ها'} ({formatNumber(notifications.length)})
              </button>

              <button
                onClick={() => setFilter('unread')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === 'unread' ? 'bg-shams-navy text-white shadow-xs' : 'bg-shams-sand text-shams-navy hover:bg-shams-sand/80'
                }`}
              >
                {lang === 'en' ? 'Unread Only' : lang === 'ar' ? 'غير المقروءة فقط' : 'خوانده‌نشده‌ها'} (<span className="font-numeric">{formatNumber(unreadCount)}</span>)
              </button>
            </div>

            <div className="text-xs font-semibold text-shams-navy/60 bg-shams-sand/60 px-3 py-1.5 rounded-xl">
              {unreadCount > 0 ? (
                <span className="text-shams-teal font-bold"><span className="font-numeric font-bold">{formatNumber(unreadCount)}</span> {t('notif.unread')}</span>
              ) : (
                <span>{lang === 'en' ? 'All up to date' : lang === 'ar' ? 'تمت قراءة كافة التنبيهات' : 'همه پیام‌ها خوانده شده است'}</span>
              )}
            </div>
          </div>

          {/* List items */}
          <div className="flex flex-col divide-y divide-shams-sand/80">
            {filteredNotifications.length === 0 ? (
              <div className="p-16 text-center space-y-3">
                <div className="w-16 h-16 bg-shams-sand rounded-full flex items-center justify-center mx-auto text-shams-navy/30">
                  <Bell className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-shams-navy">{t('notif.empty')}</h3>
                <p className="text-xs text-shams-navy/60 max-w-sm mx-auto leading-relaxed">
                  {t('notif.emptyDesc')}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 transition-all ${
                    !notification.read ? 'bg-shams-teal/5' : 'bg-white hover:bg-shams-sand/40'
                  }`}
                >
                  <div 
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.link) {
                        navigate(notification.link);
                      }
                    }}
                    className="flex items-start gap-4 flex-1 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white border border-shams-navy/10 flex items-center justify-center shrink-0 shadow-xs">
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm text-shams-navy">
                          {getNotifTitle(notification)}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-shams-teal shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-shams-navy/70 leading-relaxed max-w-2xl">
                        {getNotifDesc(notification)}
                      </p>
                      <div className="text-[11px] font-mono text-shams-navy/40 mt-2">
                        {getNotifTime(notification)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {notification.link && (
                      <Link
                        to={notification.link}
                        onClick={() => markAsRead(notification.id)}
                        className="px-3 py-1.5 rounded-xl border border-shams-navy/15 text-xs font-bold text-shams-navy hover:bg-shams-sand hover:text-shams-teal transition-all flex items-center gap-1"
                      >
                        <span>{lang === 'en' ? 'Open' : lang === 'ar' ? 'عرض' : 'مشاهده'}</span>
                        {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                      </Link>
                    )}
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="p-2 rounded-xl text-shams-navy/40 hover:text-shams-burgundy hover:bg-shams-burgundy/10 transition-all cursor-pointer"
                      title={lang === 'en' ? 'Remove' : 'حذف'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
