
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import WinRateGauge from '../components/dashboard/WinRateGauge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, DollarSign, Target, Calendar } from 'lucide-react';

const Performance: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      window.location.href = '/';
    }
  }, [user]);

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Performance Analytics
          </h1>
          <p className="text-slate-400">
            Detailed analysis of your trading performance and portfolio growth
          </p>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">+287%</div>
              <p className="text-xs text-emerald-500">All time high</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Monthly P&L</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">+$12,450</div>
              <p className="text-xs text-emerald-500">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Sharpe Ratio</CardTitle>
              <Target className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">2.34</div>
              <p className="text-xs text-slate-400">Risk-adjusted return</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <WinRateGauge winRate={84} totalTrades={127} winningTrades={107} />
          </div>
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
        </div>

        {/* Performance Metrics */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-emerald-400" />
              <span>Performance Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-emerald-400 text-xl font-bold">67%</div>
                <div className="text-slate-400 text-sm">Win Rate (7d)</div>
              </div>
              <div className="text-center">
                <div className="text-emerald-400 text-xl font-bold">$892</div>
                <div className="text-slate-400 text-sm">Avg Win</div>
              </div>
              <div className="text-center">
                <div className="text-red-400 text-xl font-bold">$324</div>
                <div className="text-slate-400 text-sm">Avg Loss</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-xl font-bold">2.75</div>
                <div className="text-slate-400 text-sm">Profit Factor</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Performance;
