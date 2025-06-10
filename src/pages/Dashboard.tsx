import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import WinRateGauge from '../components/dashboard/WinRateGauge';
import PortfolioPerformanceChart from '../components/dashboard/PortfolioPerformanceChart';
import SignalHeatmap from '../components/dashboard/SignalHeatmap';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, DollarSign, Target, Bell } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <CardTitle className="text-sm font-medium text-slate-300">{t('dashboard.todayPnl')}</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">+$2,847</div>
              <p className="text-xs text-emerald-500">+12.3% from yesterday</p>
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
              <CardTitle className="text-sm font-medium text-slate-300">{t('dashboard.portfolioValue')}</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$38,734</div>
              <p className="text-xs text-emerald-500">+287% all time</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 backdrop-blur-sm border-blue-800/30 hover:bg-slate-900/70 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{t('dashboard.successRate')}</CardTitle>
              <Target className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">84%</div>
              <p className="text-xs text-slate-400">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid - Win Rate and Portfolio Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <WinRateGauge winRate={84} totalTrades={127} winningTrades={107} />
          </div>
          <div className="lg:col-span-3">
            <PortfolioPerformanceChart />
          </div>
        </div>

        {/* Signal Heatmap */}
        <div className="mb-8">
          <SignalHeatmap />
        </div>

        {/* Recent Activity */}
        <Card className="bg-slate-900/50 backdrop-blur-sm border-blue-800/30">
          <CardHeader>
            <CardTitle className="text-lg text-white">{t('dashboard.recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '2 min ago', action: 'BUY', symbol: 'AAPL', price: '$185.23', result: '+$487', status: 'profit' },
                { time: '15 min ago', action: 'SELL', symbol: 'TSLA', price: '$242.18', result: '+$1,240', status: 'profit' },
                { time: '32 min ago', action: 'BUY', symbol: 'NVDA', price: '$750.12', result: '+$825', status: 'profit' },
                { time: '1 hour ago', action: 'SELL', symbol: 'META', price: '$325.89', result: '-$156', status: 'loss' },
              ].map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.action === 'BUY' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {trade.action}
                    </div>
                    <div>
                      <div className="text-white font-medium">{trade.symbol}</div>
                      <div className="text-slate-400 text-sm">{trade.price}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      trade.status === 'profit' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {trade.result}
                    </div>
                    <div className="text-slate-400 text-sm">{trade.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
