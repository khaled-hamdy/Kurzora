
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { LogOut, Shield, User, Settings } from 'lucide-react';
import { Button } from './ui/button';
import LanguageToggle from './LanguageToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {user && (
        <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {/* SwingTrader Logo - Increased size */}
                  <img src="/lovable-uploads/d645d78a-8c0d-4796-9dfc-d29d882c7652.png" alt="SwingTrader Logo" className="h-12 w-auto" />
                </div>
                <div className="hidden lg:flex space-x-6 ml-8">
                  <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors whitespace-nowrap">{t('nav.dashboard')}</Link>
                  <Link to="/signals" className="text-slate-300 hover:text-white transition-colors whitespace-nowrap">{t('nav.signals')}</Link>
                  <Link to="/orders" className="text-slate-300 hover:text-white transition-colors whitespace-nowrap">{t('nav.orders')}</Link>
                  <Link to="/performance" className="text-slate-300 hover:text-white transition-colors whitespace-nowrap">{t('nav.performance')}</Link>
                  <Link to="/how-it-works" className="text-slate-300 hover:text-white transition-colors whitespace-nowrap">How It Works</Link>
                  <Link to="/pricing" className="text-slate-300 hover:text-white transition-colors whitespace-nowrap">{t('nav.pricing')}</Link>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center mr-2">
                  <Shield className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-xs text-green-400 hidden sm:block">{t('legal.shariahCompliant')}</span>
                </div>
                <LanguageToggle />
                <div className="text-sm text-slate-300 hidden md:block">
                  {t('nav.welcome')}, <span className="text-white font-medium">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white" asChild>
                  <Link to="/profile">
                    <User className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">{t('nav.profile')}</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white" asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">{t('nav.settings')}</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={logout} className="text-slate-300 hover:text-white">
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">{t('nav.logout')}</span>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-slate-900/50 border-t border-slate-700 mt-20">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="/lovable-uploads/d645d78a-8c0d-4796-9dfc-d29d882c7652.png" alt="SwingTrader Logo" className="h-10 w-auto" />
              </div>
              <p className="text-slate-400 text-sm mb-4">
                {t('footer.description')}
              </p>
              <div className="flex items-center mt-4 space-x-2">
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  {t('legal.shariahCompliant')}
                </span>
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  {t('landing.uptime')}
                </span>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-slate-400 text-xs">{t('footer.address')}</p>
                <p className="text-slate-400 text-xs">IE: {t('footer.phone.ie')} | DE: {t('footer.phone.de')}</p>
                <p className="text-slate-400 text-xs">{t('footer.email')}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.platform')}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">{t('nav.dashboard')}</Link></li>
                <li><Link to="/signals" className="hover:text-white transition-colors">{t('nav.signals')}</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">{t('nav.howItWorks')}</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">{t('nav.pricing')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.support')}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
                <li><a href="https://t.me/swingtrader" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram</a></li>
                <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t('legal.privacyPolicy')}</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">{t('legal.termsOfService')}</Link></li>
                <li><Link to="/risk-disclosure" className="hover:text-white transition-colors">{t('legal.riskDisclosure')}</Link></li>
                <li><Link to="/shariah" className="hover:text-white transition-colors">{t('legal.shariahCompliant')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-center text-slate-400 text-sm">
                {t('footer.copyright')}
              </p>
              <div className="flex space-x-4 text-xs text-slate-400">
                <Link to="/gdpr" className="hover:text-white transition-colors">{t('legal.gdprCompliance')}</Link>
                <Link to="/cookies" className="hover:text-white transition-colors">{t('legal.cookieNotice')}</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
