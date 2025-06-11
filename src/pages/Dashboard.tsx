
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import WinRateGauge from '../components/dashboard/WinRateGauge';
import PortfolioPerformanceChart from '../components/dashboard/PortfolioPerformanceChart';
import SignalHeatmap from '../components/dashboard/SignalHeatmap';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, DollarSign, Target, Bell, Briefcase, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Check if we should show welcome banner
    const shouldShowWelcome = localStorage.getItem('showWelcome');
    const savedPlan = localStorage.getItem('selectedPlan');
    
    if (shouldShowWelcome === 'true') {
      setShowWelcome(true);
      if (savedPlan) {
        try {
          setSelectedPlan(JSON.parse(savedPlan));
        } catch (error) {
          console.error('Error parsing selected plan:', error);
        }
      }
    }
  }, [user, navigate]);

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    localStorage.removeItem('showWelcome');
    localStorage.removeItem('selectedPlan');
  };

  const handleExploreFeatures = () => {
    navigate('/signals');
    handleDismissWelcome();
  };

  const handleCompleteSetup = () => {
    navigate('/settings');
    handleDismissWelcome();
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        {showWelcome && (
          <WelcomeBanner
            planName={selectedPlan?.name}
            onDismiss={handleDismissWelcome}
            onExploreFeatures={handleExploreFeatures}
            onCompleteSetup={handleCompleteSetup}
          />
        )}

        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('dashboard.welcome')}, {user.name}!
          </h1>
          <p className="text-slate-400">
            Welcome to your Kurzora trading intelligence dashboard
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-blue-800/30 hover:bg-slate-900/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Today's Signals</CardTitle>
              <Bell className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-slate-400">3 Strong, 9 Valid</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-blue-800/30 hover:bg-slate-900/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{t('dashboard.activeSignals')}</CardTitle>
              <Bell className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-slate-400">3 new since last hour</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-blue-800/30 hover:bg-slate-900/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Avg Signal Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">82</div>
              <p className="text-xs text-emerald-500">Quality threshold met</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-blue-800/30 hover:bg-slate-900/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Success Rate</CardTitle>
              <Target className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">61%</div>
              <p className="text-xs text-slate-400">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/50 backdrop-blur-sm border-blue-800/30 hover:bg-slate-900/70 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-600/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300 font-medium">Best Performer</div>
                  <div className="text-lg font-bold text-white">AAPL</div>
                  <div className="text-xs text-emerald-400">+$487 (+3.2%)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-blue-800/30 hover:bg-slate-900/70 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Briefcase className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300 font-medium">Active Signals</div>
                  <div className="text-lg font-bold text-white">3</div>
                  <div className="text-xs text-slate-400">signals in play</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-blue-800/30 hover:bg-slate-900/70 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-600/20 rounded-lg">
                  <Zap className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300 font-medium">Latest Signal</div>
                  <div className="text-lg font-bold text-white">NVDA</div>
                  <div className="text-xs text-amber-400">Score: 92 • 15 min ago</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-blue-800/30 hover:bg-slate-900/70 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600/20 rounded-lg">
                  <Bell className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300 font-medium">Alerts</div>
                  <div className="text-lg font-bold text-white">2</div>
                  <div className="text-xs text-red-400">positions near target</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <WinRateGauge winRate={61} totalTrades={127} winningTrades={77} />
          </div>
          <div className="lg:col-span-3">
            <PortfolioPerformanceChart />
          </div>
        </div>

        <div className="mb-8">
          <SignalHeatmap />
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 text-center mt-4">
          *Hypothetical results based on following all signals. Not actual trading results.
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
