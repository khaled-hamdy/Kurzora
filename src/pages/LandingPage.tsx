
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, TrendingUp, Shield, Zap, Users, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import TestimonialCarousel from '../components/testimonials/TestimonialCarousel';
import PricingSection from '../components/pricing/PricingSection';

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState<'login' | 'signup' | null>(null);

  if (user) {
    window.location.href = '/dashboard';
    return null;
  }

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold text-white">SignalPro</span>
            </div>
            
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Reviews</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setShowAuth('login')}
                className="text-slate-300 hover:text-white"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => setShowAuth('signup')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Dominate the Markets with
              <span className="text-emerald-400"> AI-Powered Signals</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Join 50,000+ traders achieving consistent profits with our proven signal technology. 
              Average 78% win rate across all strategies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                onClick={() => setShowAuth('signup')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg"
              >
                Start Free 7-Day Trial
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
              >
                View Live Signals
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                <div className="text-emerald-400 text-3xl font-bold mb-2">78%</div>
                <div className="text-slate-300 text-sm">Average Win Rate</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                <div className="text-emerald-400 text-3xl font-bold mb-2">50k+</div>
                <div className="text-slate-300 text-sm">Active Traders</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                <div className="text-emerald-400 text-3xl font-bold mb-2">$2.4B</div>
                <div className="text-slate-300 text-sm">Volume Tracked</div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
                <div className="text-emerald-400 text-3xl font-bold mb-2">24/7</div>
                <div className="text-slate-300 text-sm">Market Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Traders Choose SignalPro</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Professional-grade tools and insights that give you the edge in today's markets
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 hover:bg-slate-800/70 transition-all duration-300">
              <div className="p-3 bg-emerald-600/20 rounded-full w-fit mb-6">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Real-Time Signals</h3>
              <p className="text-slate-400">
                Get instant notifications for high-probability trades across stocks, options, and crypto markets.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 hover:bg-slate-800/70 transition-all duration-300">
              <div className="p-3 bg-emerald-600/20 rounded-full w-fit mb-6">
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Risk Management</h3>
              <p className="text-slate-400">
                Built-in stop-loss and take-profit levels to protect your capital and maximize returns.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 hover:bg-slate-800/70 transition-all duration-300">
              <div className="p-3 bg-emerald-600/20 rounded-full w-fit mb-6">
                <Zap className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Analysis</h3>
              <p className="text-slate-400">
                Advanced machine learning algorithms analyze market patterns and sentiment in real-time.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 hover:bg-slate-800/70 transition-all duration-300">
              <div className="p-3 bg-emerald-600/20 rounded-full w-fit mb-6">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Community Support</h3>
              <p className="text-slate-400">
                Join our exclusive Discord community with thousands of successful traders sharing strategies.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 hover:bg-slate-800/70 transition-all duration-300">
              <div className="p-3 bg-emerald-600/20 rounded-full w-fit mb-6">
                <Award className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Proven Track Record</h3>
              <p className="text-slate-400">
                Transparent performance history with detailed analytics and verified trade results.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 hover:bg-slate-800/70 transition-all duration-300">
              <div className="p-3 bg-emerald-600/20 rounded-full w-fit mb-6">
                <BarChart3 className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Advanced Analytics</h3>
              <p className="text-slate-400">
                Comprehensive performance tracking, portfolio optimization, and risk assessment tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-900/50">
        <TestimonialCarousel />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <PricingSection />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Join thousands of traders already profiting with SignalPro. Start your free trial today.
          </p>
          <Button 
            size="lg"
            onClick={() => setShowAuth('signup')}
            className="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold"
          >
            Start Free 7-Day Trial
          </Button>
          <p className="text-emerald-100 text-sm mt-4">
            No credit card required • Cancel anytime • Money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
