import React, { createContext, useContext, useState, useEffect } from 'react';

export interface NotificationItem {
  id: string;
  type: 'assessment' | 'event' | 'plan' | 'promotion' | 'research' | 'system';
  titleFa: string;
  titleEn: string;
  titleAr: string;
  descFa: string;
  descEn: string;
  descAr: string;
  timeFa: string;
  timeEn: string;
  timeAr: string;
  link?: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'assessment',
    titleFa: 'نتیجه ارزیابی کیفیت خواب شما آماده شد',
    titleEn: 'Sleep Quality Assessment Result Ready',
    titleAr: 'نتيجة تقييم جودة النوم جاهزة الآن',
    descFa: 'تحلیل شاخص PSQI و توصیه‌های بالینی شخصی‌سازی‌شده شما در بخش ارزیابی ثبت گردید.',
    descEn: 'Your PSQI score analysis and personalized clinical recommendations are now ready.',
    descAr: 'تم تسجيل تحليل مؤشر PSQI والتوصيات السريرية المخصصة في حسابك.',
    timeFa: '۲ ساعت پیش',
    timeEn: '2 hours ago',
    timeAr: 'منذ ساعتين',
    link: '/assessment/tools',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'plan',
    titleFa: 'یادآور برنامه سلامت روزانه شمس',
    titleEn: 'Daily Health Program Reminder',
    titleAr: 'تذكير بمهام البرنامج الصحي اليومي',
    descFa: 'تکمیل وظایف تنفس آگاهانه و هیدراتاسیون امروز را در برنامه سلامت ثبت نمایید.',
    descEn: 'Log your mindful breathing and hydration tasks today in your Health Program.',
    descAr: 'سجل إنجاز مهام التنفس الواعي والترطيب لليوم في برنامجك الصحي.',
    timeFa: '۴ ساعت پیش',
    timeEn: '4 hours ago',
    timeAr: 'منذ ٤ ساعات',
    link: '/plan',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'event',
    titleFa: 'وبینار تخصصی سالمندی پویا و سلامت مغز',
    titleEn: 'Active Aging & Neuroprotection Webinar',
    titleAr: 'ندوة الشيخوخة النشطة وحماية الدماغ',
    descFa: 'ثبت‌نام در رویداد آنلاین آکادمی شمس با سخنرانی اعضای هیئت علمی آغاز شد.',
    descEn: 'Registration for the upcoming SHAMS Academy masterclass webinar is open.',
    descAr: 'بدأ التسجيل في الفعالية العلمية عبر الإنترنت لأكاديمية شمس.',
    timeFa: 'دیروز',
    timeEn: 'Yesterday',
    timeAr: 'أمس',
    link: '/events',
    read: false,
  },
  {
    id: 'notif-4',
    type: 'research',
    titleFa: 'به‌روزرسانی داده‌های پنل پژوهش شمس',
    titleEn: 'Research Panel Analytics Updated',
    titleAr: 'تحديث بيانات لوحة الأبحاث السريرية',
    descFa: 'تحلیل مقطعی شاخص‌های متابولیک ۵۰۰ کاربر جدید در پنل پژوهش قرار گرفت.',
    descEn: 'Cross-sectional epidemiological analysis of 500 new participants is now live.',
    descAr: 'تم إدراج التحليل المقطعي للمؤشرات الأيضية لـ ٥٠٠ مشارك جديد.',
    timeFa: '۳ روز پیش',
    timeEn: '3 days ago',
    timeAr: 'منذ ٣ أيام',
    link: '/services/research',
    read: true,
  },
  {
    id: 'notif-5',
    type: 'promotion',
    titleFa: 'کد تخفیف ۲۰٪ محصولات سلامت شمس',
    titleEn: 'Special 20% Clinical Welcome Offer',
    titleAr: 'رمز تخفيض ٢٠٪ على باقات شمس',
    descFa: 'با کد تخفیف SHAMS از ۲۰ درصد تخفیف پک‌های ارتقای سلامت و خواب بهره‌مند شوید.',
    descEn: 'Use code SHAMS at checkout to receive 20% off targeted nutritional packs.',
    descAr: 'استخدم الرمز SHAMS للحصول على خصم ٢٠٪ على باقات المكملات الغذائية.',
    timeFa: 'هفته گذشته',
    timeEn: 'Last week',
    timeAr: 'الأسبوع الماضي',
    link: '/shop',
    read: true,
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('shams_notifications');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read notifications from storage', e);
    }
    return initialNotifications;
  });

  useEffect(() => {
    try {
      localStorage.setItem('shams_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Could not save notifications to storage', e);
    }
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
