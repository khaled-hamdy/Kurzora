
import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.signals': 'Signals',
    'nav.orders': 'Orders',
    'nav.performance': 'Performance',
    'nav.admin': 'Admin',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'nav.welcome': 'Welcome',
    
    // Landing Page
    'landing.title': 'Dominate the Markets with',
    'landing.titleHighlight': ' AI-Powered Signals',
    'landing.subtitle': 'Join 50,000+ traders achieving consistent profits with our proven signal technology. Average 78% win rate across all strategies.',
    'landing.startTrial': 'Start Free 7-Day Trial',
    'landing.viewSignals': 'View Live Signals',
    'landing.signIn': 'Sign In',
    'landing.getStarted': 'Get Started',
    'landing.features': 'Features',
    'landing.reviews': 'Reviews',
    'landing.pricing': 'Pricing',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': "Here's your trading performance overview for today.",
    'dashboard.todayPnl': "Today's P&L",
    'dashboard.activeSignals': 'Active Signals',
    'dashboard.portfolioValue': 'Portfolio Value',
    'dashboard.successRate': 'Success Rate',
    'dashboard.recentActivity': 'Recent Trade Activity',
    
    // Orders
    'orders.title': 'Order Management',
    'orders.subtitle': 'Review and place your trading orders',
    'orders.available': 'Available Orders',
    'orders.details': 'Order Details',
    'orders.entryPrice': 'Entry Price',
    'orders.stopLoss': 'Stop Loss',
    'orders.takeProfit': 'Take Profit',
    'orders.placeOrder': 'Place Order',
    'orders.selectOrder': 'Select an order to view details',
    'orders.view': 'View',
    
    // Footer
    'footer.platform': 'Platform',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.description': 'Professional stock signals and trading analytics for serious traders.',
    'footer.copyright': '© 2024 SignalPro. All rights reserved. Trading involves risk and may not be suitable for all investors.',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة القيادة',
    'nav.signals': 'الإشارات',
    'nav.orders': 'الطلبات',
    'nav.performance': 'الأداء',
    'nav.admin': 'المدير',
    'nav.profile': 'الملف الشخصي',
    'nav.settings': 'الإعدادات',
    'nav.logout': 'تسجيل الخروج',
    'nav.welcome': 'مرحباً',
    
    // Landing Page
    'landing.title': 'سيطر على الأسواق مع',
    'landing.titleHighlight': ' إشارات مدعومة بالذكاء الاصطناعي',
    'landing.subtitle': 'انضم إلى أكثر من 50,000 متداول يحققون أرباحاً ثابتة بتقنية الإشارات المثبتة لدينا. متوسط معدل نجاح 78% عبر جميع الاستراتيجيات.',
    'landing.startTrial': 'ابدأ تجربة مجانية لمدة 7 أيام',
    'landing.viewSignals': 'عرض الإشارات المباشرة',
    'landing.signIn': 'تسجيل الدخول',
    'landing.getStarted': 'ابدأ الآن',
    'landing.features': 'المميزات',
    'landing.reviews': 'التقييمات',
    'landing.pricing': 'الأسعار',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً بك مجدداً',
    'dashboard.overview': 'إليك نظرة عامة على أداء تداولك لليوم.',
    'dashboard.todayPnl': 'ربح/خسارة اليوم',
    'dashboard.activeSignals': 'الإشارات النشطة',
    'dashboard.portfolioValue': 'قيمة المحفظة',
    'dashboard.successRate': 'معدل النجاح',
    'dashboard.recentActivity': 'النشاط التجاري الأخير',
    
    // Orders
    'orders.title': 'إدارة الطلبات',
    'orders.subtitle': 'راجع وضع طلبات التداول الخاصة بك',
    'orders.available': 'الطلبات المتاحة',
    'orders.details': 'تفاصيل الطلب',
    'orders.entryPrice': 'سعر الدخول',
    'orders.stopLoss': 'وقف الخسارة',
    'orders.takeProfit': 'جني الأرباح',
    'orders.placeOrder': 'تنفيذ الطلب',
    'orders.selectOrder': 'اختر طلباً لعرض التفاصيل',
    'orders.view': 'عرض',
    
    // Footer
    'footer.platform': 'المنصة',
    'footer.support': 'الدعم',
    'footer.legal': 'قانوني',
    'footer.description': 'إشارات الأسهم المهنية وتحليلات التداول للمتداولين الجدّيين.',
    'footer.copyright': '© 2024 SignalPro. جميع الحقوق محفوظة. التداول ينطوي على مخاطر وقد لا يكون مناسباً لجميع المستثمرين.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
