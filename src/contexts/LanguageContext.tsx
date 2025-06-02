import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'ar' | 'de';

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
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.howItWorks': 'How It Works',
    
    // Landing Page
    'landing.title': 'AI-Powered Swing Trading Signals with',
    'landing.titleHighlight': ' Institutional Logic',
    'landing.subtitle': 'Scan 6,000+ stocks. Get high-probability trade alerts. Trade with confidence.',
    'landing.startTrial': 'Start Free Trial',
    'landing.viewSignals': 'See Live Signals',
    'landing.signIn': 'Sign In',
    'landing.getStarted': 'Get Started',
    'landing.features': 'Features',
    'landing.reviews': 'Reviews',
    'landing.pricing': 'Pricing',
    'landing.accuracy': 'Accuracy Rate: 68%',
    'landing.avgRoi': 'Avg ROI: 6%',
    'landing.tradesAnalyzed': 'Trades Analyzed: 180,000+',
    'landing.uptime': '98.2% Uptime',
    'landing.trustedBy': 'Trusted by Smart Traders Worldwide',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.overview': 'Here\'s your trading overview for today',
    'dashboard.todayPnl': 'Today\'s P&L',
    'dashboard.activeSignals': 'Active Signals',
    'dashboard.portfolioValue': 'Portfolio Value',
    'dashboard.successRate': 'Success Rate',
    'dashboard.recentActivity': 'Recent Activity',
    
    // Settings
    'settings.title': 'Settings',
    'settings.signalPrefs': 'Signal Preferences',
    'settings.notifications': 'Notification Settings',
    'settings.language': 'Language & Locale',
    'settings.security': 'Security',
    'settings.api': 'API & Auto-Trading',
    'settings.ui': 'UI & Data Preferences',
    'settings.minThreshold': 'Minimum Signal Threshold',
    'settings.timeframes': 'Timeframe Filters',
    'settings.sectors': 'Sector Preferences',
    'settings.emailAlerts': 'Email Alerts',
    'settings.telegramAlerts': 'Telegram Alerts',
    'settings.pushNotifications': 'Push Notifications',
    'settings.digestFreq': 'Digest Frequency',
    'settings.changePassword': 'Change Password',
    'settings.twoFA': 'Two-Factor Authentication',
    'settings.lastLogin': 'Last Login Activity',
    'settings.generateAPI': 'Generate API Key',
    'settings.autoTrading': 'Enable Auto-Trading',
    'settings.brokerStatus': 'Broker Connection',
    'settings.showPnL': 'Show P&L Estimates',
    'settings.showBacktest': 'Show Historical Backtest Data',
    'settings.uiDensity': 'UI Density',
    
    // Profile
    'profile.title': 'Profile',
    'profile.userInfo': 'User Information',
    'profile.subscription': 'Subscription Plan',
    'profile.usage': 'Usage Statistics',
    'profile.legal': 'Legal & Consent',
    'profile.account': 'Account Controls',
    'profile.feedback': 'Feedback',
    'profile.currentPlan': 'Current Plan',
    'profile.billingDate': 'Next Billing Date',
    'profile.paymentMethod': 'Payment Method',
    'profile.billingHistory': 'Billing History',
    'profile.signalsViewed': 'Signals Viewed',
    'profile.avgAccuracy': 'Average Signal Accuracy',
    'profile.topTickers': 'Top Viewed Tickers',
    'profile.exportData': 'Export My Data',
    'profile.deleteAccount': 'Request Account Deletion',
    'profile.helpImprove': 'Help us improve',
    
    // Features
    'features.multiTimeframe': 'Multi-Timeframe Confirmation',
    'features.multiTimeframeDesc': 'Verify signals across M5, H1, and D1 timeframes for maximum accuracy',
    'features.supportResistance': 'Automated Support/Resistance Detection',
    'features.supportResistanceDesc': 'AI identifies key price levels using volume cluster analysis',
    'features.optionsFlow': 'Options Flow Scanning',
    'features.optionsFlowDesc': 'Track institutional money movement through options activity',
    'features.realTimeAlerts': 'Real-Time Alerts via Telegram & Email',
    'features.realTimeAlertsDesc': 'Get instant notifications when high-probability signals trigger',
    
    // Signal Details
    'signal.title': 'Signal Details',
    'signal.score': 'Signal Score',
    'signal.strong': 'Strong',
    'signal.valid': 'Valid',
    'signal.weak': 'Weak',
    'signal.ignore': 'Ignore',
    'signal.component': 'Component',
    'signal.condition': 'Condition Applied',
    'signal.status': 'Status',
    'signal.backToSignals': '← Back to Signals',
    'signal.learnHow': 'Learn How Signals Are Calculated',
    'signal.summary': 'This signal was generated using 5 multi-indicator confirmations across 3 timeframes.',
    
    // Tooltips
    'tooltip.rsi': 'RSI below 30 indicates oversold conditions, potential reversal',
    'tooltip.macd': 'MACD above 0 indicates bullish momentum',
    'tooltip.volume': 'Volume above average confirms signal strength',
    'tooltip.support': 'Support zones identified through volume cluster analysis',
    'tooltip.timeframe': 'All timeframes must align for signal confirmation',
    
    // Legal
    'legal.riskDisclosure': 'Risk Disclosure',
    'legal.privacyPolicy': 'Privacy Policy',
    'legal.termsOfService': 'Terms of Service',
    'legal.gdprCompliance': 'GDPR Compliance',
    'legal.cookieNotice': 'Cookie Notice',
    'legal.shariahCompliant': 'Shariah Compliant',
    'legal.acceptRisk': 'I accept the Risk Disclosure',
    'legal.acceptTerms': 'I accept the Terms of Service',
    'legal.acceptPrivacy': 'I accept the Privacy Policy',
    
    // Footer
    'footer.platform': 'Platform',
    'footer.support': 'Support',
    'footer.legal': 'Legal',
    'footer.company': 'Company',
    'footer.resources': 'Resources',
    'footer.description': 'Professional AI-powered swing trading signals with institutional-grade analysis.',
    'footer.copyright': '© 2024 SwingTrader. All rights reserved. Trading involves risk and may not be suitable for all investors.',
    'footer.address': 'The Greenway, Iconic Offices, St Stephen\'s Green, Dublin, Ireland',
    'footer.phone.ie': '+353 1 254 4000',
    'footer.phone.de': '+49 30 3080 6500',
    'footer.email': 'support@swingtrader.com',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.on': 'On',
    'common.off': 'Off',
    'common.enabled': 'Enabled',
    'common.disabled': 'Disabled',
    'common.connected': 'Connected',
    'common.disconnected': 'Disconnected',
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
    'nav.pricing': 'الأسعار',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.about': 'حولنا',
    'nav.contact': 'اتصل بنا',
    'nav.howItWorks': 'كيف يعمل',
    
    // Landing Page
    'landing.title': 'إشارات التداول المتأرجح مدعومة بالذكاء الاصطناعي مع',
    'landing.titleHighlight': ' منطق مؤسسي',
    'landing.subtitle': 'مسح أكثر من 6000 سهم. احصل على تنبيهات تداول عالية الاحتمال. تداول بثقة.',
    'landing.startTrial': 'ابدأ تجربة مجانية',
    'landing.viewSignals': 'شاهد الإشارات المباشرة',
    'landing.signIn': 'تسجيل الدخول',
    'landing.getStarted': 'ابدأ الآن',
    'landing.features': 'المميزات',
    'landing.reviews': 'التقييمات',
    'landing.pricing': 'الأسعار',
    'landing.accuracy': 'معدل الدقة: 68%',
    'landing.avgRoi': 'متوسط العائد: 6%',
    'landing.tradesAnalyzed': 'الصفقات المحللة: 180,000+',
    'landing.uptime': 'وقت التشغيل: 98.2%',
    'landing.trustedBy': 'موثوق من قبل المتداولين الأذكياء حول العالم',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً',
    'dashboard.overview': 'إليك نظرة عامة على التداول لليوم',
    'dashboard.todayPnl': 'الربح والخسارة اليوم',
    'dashboard.activeSignals': 'الإشارات النشطة',
    'dashboard.portfolioValue': 'قيمة المحفظة',
    'dashboard.successRate': 'معدل النجاح',
    'dashboard.recentActivity': 'النشاط الحديث',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.signalPrefs': 'تفضيلات الإشارة',
    'settings.notifications': 'إعدادات الإشعارات',
    'settings.language': 'اللغة والموقع',
    'settings.security': 'الأمان',
    'settings.api': 'واجهة برمجة التطبيقات والتداول التلقائي',
    'settings.ui': 'تفضيلات الواجهة والبيانات',
    'settings.minThreshold': 'الحد الأدنى لعتبة الإشارة',
    'settings.timeframes': 'مرشحات الإطار الزمني',
    'settings.sectors': 'تفضيلات القطاع',
    'settings.emailAlerts': 'تنبيهات البريد الإلكتروني',
    'settings.telegramAlerts': 'تنبيهات تيليجرام',
    'settings.pushNotifications': 'الإشعارات الفورية',
    'settings.digestFreq': 'تكرار الملخص',
    'settings.changePassword': 'تغيير كلمة المرور',
    'settings.twoFA': 'المصادقة الثنائية',
    'settings.lastLogin': 'نشاط آخر تسجيل دخول',
    'settings.generateAPI': 'إنشاء مفتاح API',
    'settings.autoTrading': 'تمكين التداول التلقائي',
    'settings.brokerStatus': 'اتصال الوسيط',
    'settings.showPnL': 'إظهار تقديرات الربح والخسارة',
    'settings.showBacktest': 'إظهار بيانات الاختبار التاريخي',
    'settings.uiDensity': 'كثافة الواجهة',
    
    // Profile
    'profile.title': 'الملف الشخصي',
    'profile.userInfo': 'معلومات المستخدم',
    'profile.subscription': 'خطة الاشتراك',
    'profile.usage': 'إحصائيات الاستخدام',
    'profile.legal': 'القانونية والموافقة',
    'profile.account': 'ضوابط الحساب',
    'profile.feedback': 'التعليقات',
    'profile.currentPlan': 'الخطة الحالية',
    'profile.billingDate': 'تاريخ الفوترة التالي',
    'profile.paymentMethod': 'طريقة الدفع',
    'profile.billingHistory': 'تاريخ الفوترة',
    'profile.signalsViewed': 'الإشارات المشاهدة',
    'profile.avgAccuracy': 'متوسط دقة الإشارة',
    'profile.topTickers': 'أكثر الرموز مشاهدة',
    'profile.exportData': 'تصدير بياناتي',
    'profile.deleteAccount': 'طلب حذف الحساب',
    'profile.helpImprove': 'ساعدنا في التحسين',
    
    // Features
    'features.multiTimeframe': 'تأكيد متعدد الأطر الزمنية',
    'features.multiTimeframeDesc': 'التحقق من الإشارات عبر أطر M5 و H1 و D1 لأقصى دقة',
    'features.supportResistance': 'كشف الدعم والمقاومة التلقائي',
    'features.supportResistanceDesc': 'الذكاء الاصطناعي يحدد مستويات الأسعار الرئيسية باستخدام تحليل عناقيد الحجم',
    'features.optionsFlow': 'مسح تدفق الخيارات',
    'features.optionsFlowDesc': 'تتبع حركة أموال المؤسسات من خلال نشاط الخيارات',
    'features.realTimeAlerts': 'تنبيهات فورية عبر تيليغرام والبريد الإلكتروني',
    'features.realTimeAlertsDesc': 'احصل على إشعارات فورية عند تفعيل إشارات عالية الاحتمال',
    
    // Signal Details
    'signal.title': 'تفاصيل الإشارة',
    'signal.score': 'درجة الإشارة',
    'signal.strong': 'قوية',
    'signal.valid': 'صالحة',
    'signal.weak': 'ضعيفة',
    'signal.ignore': 'تجاهل',
    'signal.component': 'المكون',
    'signal.condition': 'الشرط المطبق',
    'signal.status': 'الحالة',
    'signal.backToSignals': '← العودة إلى الإشارات',
    'signal.learnHow': 'تعلم كيف يتم حساب الإشارات',
    'signal.summary': 'تم إنشاء هذه الإشارة باستخدام 5 تأكيدات متعددة المؤشرات عبر 3 أطر زمنية.',
    
    // Tooltips
    'tooltip.rsi': 'مؤشر RSI أقل من 30 يشير إلى حالة بيع مفرط، انعكاس محتمل',
    'tooltip.macd': 'مؤشر MACD فوق 0 يشير إلى زخم صعودي',
    'tooltip.volume': 'الحجم فوق المتوسط يؤكد قوة الإشارة',
    'tooltip.support': 'مناطق الدعم محددة من خلال تحليل عناقيد الحجم',
    'tooltip.timeframe': 'يجب أن تتماشى جميع الأطر الزمنية لتأكيد الإشارة',
    
    // Legal
    'legal.riskDisclosure': 'الإفصاح عن المخاطر',
    'legal.privacyPolicy': 'سياسة الخصوصية',
    'legal.termsOfService': 'شروط الخدمة',
    'legal.gdprCompliance': 'امتثال GDPR',
    'legal.cookieNotice': 'إشعار ملفات تعريف الارتباط',
    'legal.shariahCompliant': 'متوافق مع الشريعة',
    'legal.acceptRisk': 'أوافق على الإفصاح عن المخاطر',
    'legal.acceptTerms': 'أوافق على شروط الخدمة',
    'legal.acceptPrivacy': 'أوافق على سياسة الخصوصية',
    
    // Footer
    'footer.platform': 'المنصة',
    'footer.support': 'الدعم',
    'footer.legal': 'قانوني',
    'footer.company': 'الشركة',
    'footer.resources': 'الموارد',
    'footer.description': 'إشارات تداول متأرجحة مهنية مدعومة بالذكاء الاصطناعي مع تحليل من الدرجة المؤسسية.',
    'footer.copyright': '© 2024 SwingTrader. جميع الحقوق محفوظة. التداول ينطوي على مخاطر وقد لا يكون مناسباً لجميع المستثمرين.',
    'footer.address': 'The Greenway, Iconic Offices, St Stephen\'s Green, Dublin, Ireland',
    'footer.phone.ie': '+353 1 254 4000',
    'footer.phone.de': '+49 30 3080 6500',
    'footer.email': 'support@swingtrader.com',
    
    // Common
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.edit': 'تحرير',
    'common.delete': 'حذف',
    'common.confirm': 'تأكيد',
    'common.close': 'إغلاق',
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.on': 'تشغيل',
    'common.off': 'إيقاف',
    'common.enabled': 'مفعل',
    'common.disabled': 'معطل',
    'common.connected': 'متصل',
    'common.disconnected': 'غير متصل',
  },
  de: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.signals': 'Signale',
    'nav.orders': 'Aufträge',
    'nav.performance': 'Performance',
    'nav.admin': 'Admin',
    'nav.profile': 'Profil',
    'nav.settings': 'Einstellungen',
    'nav.logout': 'Abmelden',
    'nav.welcome': 'Willkommen',
    'nav.pricing': 'Preise',
    'nav.faq': 'FAQ',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.howItWorks': 'Funktionsweise',
    
    // Landing Page
    'landing.title': 'KI-gestützte Swing-Trading-Signale mit',
    'landing.titleHighlight': ' institutioneller Logik',
    'landing.subtitle': 'Scannen Sie über 6.000 Aktien. Erhalten Sie hochwahrscheinliche Handelsalarme. Handeln Sie mit Vertrauen.',
    'landing.startTrial': 'Kostenlose Testversion starten',
    'landing.viewSignals': 'Live-Signale ansehen',
    'landing.signIn': 'Anmelden',
    'landing.getStarted': 'Loslegen',
    'landing.features': 'Funktionen',
    'landing.reviews': 'Bewertungen',
    'landing.pricing': 'Preise',
    'landing.accuracy': 'Genauigkeitsrate: 68%',
    'landing.avgRoi': 'Durchschn. ROI: 6%',
    'landing.tradesAnalyzed': 'Analysierte Trades: 180.000+',
    'landing.uptime': '98,2% Verfügbarkeit',
    'landing.trustedBy': 'Vertraut von intelligenten Tradern weltweit',
    
    // Dashboard
    'dashboard.welcome': 'Willkommen',
    'dashboard.overview': 'Hier ist Ihre heutige Trading-Übersicht',
    'dashboard.todayPnl': 'Heutiger P&L',
    'dashboard.activeSignals': 'Aktive Signale',
    'dashboard.portfolioValue': 'Portfolio-Wert',
    'dashboard.successRate': 'Erfolgsquote',
    'dashboard.recentActivity': 'Kürzliche Aktivität',
    
    // Settings
    'settings.title': 'Einstellungen',
    'settings.signalPrefs': 'Signal-Präferenzen',
    'settings.notifications': 'Benachrichtigungseinstellungen',
    'settings.language': 'Sprache & Gebietsschema',
    'settings.security': 'Sicherheit',
    'settings.api': 'API & Auto-Trading',
    'settings.ui': 'UI & Daten-Präferenzen',
    'settings.minThreshold': 'Minimale Signal-Schwelle',
    'settings.timeframes': 'Zeitrahmen-Filter',
    'settings.sectors': 'Sektor-Präferenzen',
    'settings.emailAlerts': 'E-Mail-Benachrichtigungen',
    'settings.telegramAlerts': 'Telegram-Benachrichtigungen',
    'settings.pushNotifications': 'Push-Benachrichtigungen',
    'settings.digestFreq': 'Digest-Häufigkeit',
    'settings.changePassword': 'Passwort ändern',
    'settings.twoFA': 'Zwei-Faktor-Authentifizierung',
    'settings.lastLogin': 'Letzte Login-Aktivität',
    'settings.generateAPI': 'API-Schlüssel generieren',
    'settings.autoTrading': 'Auto-Trading aktivieren',
    'settings.brokerStatus': 'Broker-Verbindung',
    'settings.showPnL': 'P&L-Schätzungen anzeigen',
    'settings.showBacktest': 'Historische Backtest-Daten anzeigen',
    'settings.uiDensity': 'UI-Dichte',
    
    // Profile
    'profile.title': 'Profil',
    'profile.userInfo': 'Benutzerinformationen',
    'profile.subscription': 'Abonnement-Plan',
    'profile.usage': 'Nutzungsstatistiken',
    'profile.legal': 'Rechtliches & Einverständnis',
    'profile.account': 'Konto-Steuerung',
    'profile.feedback': 'Feedback',
    'profile.currentPlan': 'Aktueller Plan',
    'profile.billingDate': 'Nächstes Abrechnungsdatum',
    'profile.paymentMethod': 'Zahlungsmethode',
    'profile.billingHistory': 'Abrechnungshistorie',
    'profile.signalsViewed': 'Angesehene Signale',
    'profile.avgAccuracy': 'Durchschnittliche Signal-Genauigkeit',
    'profile.topTickers': 'Meistbetrachtete Ticker',
    'profile.exportData': 'Meine Daten exportieren',
    'profile.deleteAccount': 'Konto-Löschung beantragen',
    'profile.helpImprove': 'Helfen Sie uns zu verbessern',
    
    // Features
    'features.multiTimeframe': 'Multi-Zeitrahmen-Bestätigung',
    'features.multiTimeframeDesc': 'Signale über M5-, H1- und D1-Zeitrahmen für maximale Genauigkeit verifizieren',
    'features.supportResistance': 'Automatische Support/Resistance-Erkennung',
    'features.supportResistanceDesc': 'KI identifiziert wichtige Preisniveaus mittels Volumen-Cluster-Analyse',
    'features.optionsFlow': 'Options-Flow-Scanning',
    'features.optionsFlowDesc': 'Institutionelle Geldbewegungen durch Optionsaktivität verfolgen',
    'features.realTimeAlerts': 'Echtzeit-Alerts via Telegram & E-Mail',
    'features.realTimeAlertsDesc': 'Sofortige Benachrichtigungen bei hochwahrscheinlichen Signalen',
    
    // Signal Details
    'signal.title': 'Signal-Details',
    'signal.score': 'Signal-Score',
    'signal.strong': 'Stark',
    'signal.valid': 'Gültig',
    'signal.weak': 'Schwach',
    'signal.ignore': 'Ignorieren',
    'signal.component': 'Komponente',
    'signal.condition': 'Angewandte Bedingung',
    'signal.status': 'Status',
    'signal.backToSignals': '← Zurück zu Signalen',
    'signal.learnHow': 'Erfahren Sie, wie Signale berechnet werden',
    'signal.summary': 'Dieses Signal wurde mit 5 Multi-Indikator-Bestätigungen über 3 Zeitrahmen generiert.',
    
    // Tooltips
    'tooltip.rsi': 'RSI unter 30 zeigt überverkaufte Bedingungen, mögliche Umkehr',
    'tooltip.macd': 'MACD über 0 bedeutet Aufwärtsmomentum',
    'tooltip.volume': 'Volumen über Durchschnitt bestätigt Signalstärke',
    'tooltip.support': 'Support-Zonen durch Volumen-Cluster-Analyse identifiziert',
    'tooltip.timeframe': 'Alle Zeitrahmen müssen für Signalbestätigung übereinstimmen',
    
    // Legal
    'legal.riskDisclosure': 'Risikoaufklärung',
    'legal.privacyPolicy': 'Datenschutzerklärung',
    'legal.termsOfService': 'Nutzungsbedingungen',
    'legal.gdprCompliance': 'DSGVO-Konformität',
    'legal.cookieNotice': 'Cookie-Hinweis',
    'legal.shariahCompliant': 'Scharia-konform',
    'legal.acceptRisk': 'Ich akzeptiere die Risikoaufklärung',
    'legal.acceptTerms': 'Ich akzeptiere die Nutzungsbedingungen',
    'legal.acceptPrivacy': 'Ich akzeptiere die Datenschutzerklärung',
    
    // Footer
    'footer.platform': 'Plattform',
    'footer.support': 'Support',
    'footer.legal': 'Rechtliches',
    'footer.company': 'Unternehmen',
    'footer.resources': 'Ressourcen',
    'footer.description': 'Professionelle KI-gestützte Swing-Trading-Signale mit institutioneller Analyse.',
    'footer.copyright': '© 2024 SwingTrader. Alle Rechte vorbehalten. Trading birgt Risiken und ist möglicherweise nicht für alle Anleger geeignet.',
    'footer.address': 'The Greenway, Iconic Offices, St Stephen\'s Green, Dublin, Ireland',
    'footer.phone.ie': '+353 1 254 4000',
    'footer.phone.de': '+49 30 3080 6500',
    'footer.email': 'support@swingtrader.com',
    
    // Common
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.confirm': 'Bestätigen',
    'common.close': 'Schließen',
    'common.loading': 'Lädt...',
    'common.error': 'Fehler',
    'common.success': 'Erfolg',
    'common.on': 'Ein',
    'common.off': 'Aus',
    'common.enabled': 'Aktiviert',
    'common.disabled': 'Deaktiviert',
    'common.connected': 'Verbunden',
    'common.disconnected': 'Getrennt',
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
