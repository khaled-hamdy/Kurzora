
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import SignalHeatmap from '../components/dashboard/SignalHeatmap';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Activity, TrendingUp, AlertCircle, Clock } from 'lucide-react';

const Signals: React.FC = () => {
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
            Live Trading Signals
          </h1>
          <p className="text-slate-400">
            Real-time market signals powered by AI analysis
          </p>
        </div>

        {/* Signal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Active Signals</CardTitle>
              <Activity className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">12</div>
              <p className="text-xs text-slate-400">3 new in last hour</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Win Rate Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-400">87%</div>
              <p className="text-xs text-emerald-500">+5% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">High Priority</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">3</div>
              <p className="text-xs text-slate-400">Urgent signals</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Avg Response</CardTitle>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">1.2s</div>
              <p className="text-xs text-slate-400">Signal delivery time</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Signals Display */}
        <SignalHeatmap />
      </div>
    </Layout>
  );
};

export default Signals;
