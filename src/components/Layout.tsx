
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Shield, User, Settings, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import LanguageToggle from './LanguageToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const { t, language } = useLanguage();
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const getNavLinkClasses = (path: string) => {
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap";
    if (isActiveRoute(path)) {
      return `${baseClasses} bg-blue-600 text-white shadow-lg transform scale-105`;
    }
    return `${baseClasses} text-slate-300 hover:text-white hover:bg-slate-700/50`;
  };

  const handleFooterLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {user && (
        <nav className="navbar bg-slate-900/50 backdrop-blur-sm border-b border-blue-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20 lg:h-24">
              <div className="flex items-center">
                <div className="logo-container">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 chart-element" />
                    <span className="logo-text text-2xl font-bold">Kurzora</span>
                  </div>
                </div>
                <div className="nav-items hidden lg:flex space-x-2 xl:space-x-3 ml-8">
                  <Link 
                    to="/dashboard" 
                    className={getNavLinkClasses('/dashboard')}
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <Link 
                    to="/signals" 
                    className={getNavLinkClasses('/signals')}
                  >
                    {t('nav.signals')}
                  </Link>
                  <Link 
                    to="/open-positions" 
                    className={getNavLinkClasses('/open-positions')}
                  >
                    Open Positions
                  </Link>
                  <Link 
                    to="/orders" 
                    className={getNavLinkClasses('/orders')}
                  >
                    Orders
                  </Link>
                  <Link 
                    to="/pricing" 
                    className={getNavLinkClasses('/pricing')}
                  >
                    {t('nav.pricing')}
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center mr-2">
                  <Shield className="h-4 w-4 text-emerald-400 mr-1" />
                  <span className="text-xs text-emerald-400 hidden sm:block">{t('legal.shariahCompliant')}</span>
                </div>
                <LanguageToggle />
                <div className="text-sm text-slate-300 hidden md:block">
                  {t('nav.welcome')}, <span className="text-white font-medium">{user.name}</span>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                      <User className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-700 text-white" align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        {t('nav.profile')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center cursor-pointer">
                        <Settings className="h-4 w-4 mr-2" />
                        {t('nav.settings')}
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin() && (
                      <>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="flex items-center cursor-pointer text-red-400 hover:text-red-300">
                            🔧 Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem onClick={logout} className="flex items-center cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-slate-950/50 border-t border-blue-800/30 mt-20">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="logo-container">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 chart-element" />
                    <span className="logo-text text-lg font-bold">Kurzora</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                {t('footer.description')}
              </p>
              <div className="flex items-center mt-4">
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  {t('legal.shariahCompliant')}
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
                <li><Link to="/dashboard" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('nav.dashboard')}</Link></li>
                <li><Link to="/signals" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('nav.signals')}</Link></li>
                <li><Link to="/how-it-works" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('nav.howItWorks')}</Link></li>
                <li><Link to="/pricing" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('nav.pricing')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.support')}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/faq" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/contact" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
                <li><a href="https://t.me/kurzora" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram</a></li>
                <li><Link to="/about" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/privacy-policy" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('legal.privacyPolicy')}</Link></li>
                <li><Link to="/terms-of-service" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('legal.termsOfService')}</Link></li>
                <li><Link to="/risk-disclosure" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('legal.riskDisclosure')}</Link></li>
                <li><Link to="/shariah-compliance" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('legal.shariahCompliant')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800/30 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-center text-slate-400 text-sm">
                {t('footer.copyright').replace('SwingTrader', 'Kurzora')}
              </p>
              <div className="flex space-x-4 text-xs text-slate-400">
                <Link to="/gdpr-compliance" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('legal.gdprCompliance')}</Link>
                <Link to="/cookie-notice" onClick={handleFooterLinkClick} className="hover:text-white transition-colors">{t('legal.cookieNotice')}</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
