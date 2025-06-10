import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Navigate } from 'react-router-dom';
import { Shield, TrendingUp, Signal, Zap, Users, Award, BarChart3, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import TestimonialCarousel from '../components/testimonials/TestimonialCarousel';
import PricingSection from '../components/pricing/PricingSection';
import LanguageToggle from '../components/LanguageToggle';

const LandingPage: React.FC = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const [showAuth, setShowAuth] = useState<'login' | 'signup' | null>(null);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Redirect if user is logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {showAuth === 'login' ? (
            <LoginForm onSwitchToSignup={() => setShowAuth('signup')} />
          ) : (
            <SignupForm onSwitchToLogin={() => setShowAuth('login')} />
          )}
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAuth(null)}
              className="text-slate-400 hover:text-white text-sm"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-blue-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="logo-container">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 chart-element" />
                  <span className="logo-text text-2xl font-bold">Kurzora</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">{t('landing.features')}</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">{t('landing.reviews')}</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">{t('landing.pricing')}</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <Button 
                variant="ghost" 
                onClick={() => setShowAuth('login')}
                className="text-slate-300 hover:text-white"
              >
                {t('landing.signIn')}
              </Button>
              <Button 
                onClick={() => setShowAuth('signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t('landing.getStarted')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            {/* New Kurzora Tagline */}
            <div className="mb-6">
              <span className="text-blue-400 text-lg font-semibold tracking-wide">KURZORA</span>
              <p className="text-emerald-400 text-xl font-medium mt-1">AI Signals. Smarter Trades.</p>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI-Powered Trading
              <span className="text-blue-400 block">Intelligence Platform</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Kurzora delivers real-time, multi-strategy signals for retail traders who want clarity, 
              confidence, and edge in every market condition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                onClick={() => setShowAuth('signup')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              >
                {t('landing.startTrial')}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
              >
                {t('landing.viewSignals')}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-blue-800/30 rounded-lg p-6">
                <div className="text-emerald-400 text-3xl font-bold mb-2">{t('landing.accuracy')}</div>
                <div className="text-slate-300 text-sm">Win Rate</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm border border-blue-800/30 rounded-lg p-6">
                <div className="text-emerald-400 text-3xl font-bold mb-2">{t('landing.avgRoi')}</div>
                <div className="text-slate-300 text-sm">Per Trade</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm border border-blue-800/30 rounded-lg p-6">
                <div className="text-emerald-400 text-3xl font-bold mb-2">{t('landing.tradesAnalyzed')}</div>
                <div className="text-slate-300 text-sm">Historical Data</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Traders Choose Kurzora</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Professional-grade AI tools and insights for high-probability trading
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-blue-800/30 rounded-lg p-8 hover:bg-slate-900/70 transition-all duration-300">
              <div className="p-3 bg-blue-600/20 rounded-full w-fit mb-6">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t('features.multiTimeframe')}</h3>
              <p className="text-slate-400">
                {t('features.multiTimeframeDesc')}
              </p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-blue-800/30 rounded-lg p-8 hover:bg-slate-900/70 transition-all duration-300">
              <div className="p-3 bg-emerald-600/20 rounded-full w-fit mb-6">
                <Signal className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t('features.supportResistance')}</h3>
              <p className="text-slate-400">
                {t('features.supportResistanceDesc')}
              </p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-blue-800/30 rounded-lg p-8 hover:bg-slate-900/70 transition-all duration-300">
              <div className="p-3 bg-amber-600/20 rounded-full w-fit mb-6">
                <BarChart3 className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t('features.optionsFlow')}</h3>
              <p className="text-slate-400">
                {t('features.optionsFlowDesc')}
              </p>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-blue-800/30 rounded-lg p-8 hover:bg-slate-900/70 transition-all duration-300">
              <div className="p-3 bg-emerald-600/20 rounded-full w-fit mb-6">
                <Zap className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{t('features.realTimeAlerts')}</h3>
              <p className="text-slate-400">
                {t('features.realTimeAlertsDesc')}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <div className="flex items-center bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-lg px-4 py-2 space-x-2">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">{t('legal.shariahCompliant')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{t('landing.trustedBy')}</h2>
        </div>
        <TestimonialCarousel />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <PricingSection />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of traders already profiting with Kurzora. Start your free trial today.
          </p>
          <Button 
            size="lg"
            onClick={() => setShowAuth('signup')}
            className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold"
          >
            {t('landing.startTrial')}
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
          <p className="text-blue-100 text-sm mt-4">
            No credit card required • Cancel anytime • Money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/50 border-t border-blue-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="logo-container">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 chart-element" />
                    <span className="logo-text text-lg font-bold">Kurzora</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Professional AI-powered trading intelligence with institutional-grade analysis.
              </p>
              <div className="flex items-center mt-4">
                <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Shariah Compliant
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Signals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800/30 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-center text-slate-400 text-sm">
                © 2024 Kurzora. All rights reserved. Trading involves risk and may not be suitable for all investors.
              </p>
              <div className="flex space-x-4 text-xs text-slate-400">
                <a href="#" className="hover:text-white transition-colors">GDPR Compliance</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Notice</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
