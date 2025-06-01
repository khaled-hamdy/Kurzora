import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SignalHeatmap from '../components/dashboard/SignalHeatmap';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Activity, TrendingUp, AlertCircle, Clock, ArrowRight } from 'lucide-react';

const Signals: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 155.88, change: '+2.34%', signal: 'BUY' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.18, change: '+5.67%', signal: 'BUY' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 350.25, change: '+1.23%', signal: 'HOLD' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 125.45, change: '-0.89%', signal: 'BUY' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 445.67, change: '+8.92%', signal: 'BUY' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 134.78, change: '+3.45%', signal: 'HOLD' },
  ];

  const handleStockClick = (stock: any) => {
    navigate('/orders', { state: { selectedStock: stock } });
  };

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

        {/* Stock List */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-white">Stock Signals</CardTitle>
            <p className="text-slate-400 text-sm">Click on any stock to view order details</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stocks.map((stock, index) => (
                <div 
                  key={index}
                  onClick={() => handleStockClick(stock)}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors group"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-white font-semibold">{stock.symbol}</div>
                      <div className="text-slate-400 text-sm">{stock.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-white font-semibold">${stock.price.toFixed(2)}</div>
                      <div className={`text-sm ${stock.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stock.change}
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      stock.signal === 'BUY' ? 'bg-emerald-600 text-white' : 'bg-yellow-600 text-white'
                    }`}>
                      {stock.signal}
                    </div>
                    
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Signals Display */}
        <SignalHeatmap />
      </div>
    </Layout>
  );
};

export default Signals;
