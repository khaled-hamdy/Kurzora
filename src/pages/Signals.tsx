
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SignalHeatmap from '../components/dashboard/SignalHeatmap';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Activity, TrendingUp, AlertCircle, Clock, ArrowRight, Shield } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Signals: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const stocks = [
    { 
      symbol: 'AAPL', 
      name: 'Apple Inc.', 
      price: 155.88, 
      change: '+2.34%', 
      signal: 'BUY', 
      score: 88,
      badge: 'strong',
      shariahCompliant: true
    },
    { 
      symbol: 'TSLA', 
      name: 'Tesla Inc.', 
      price: 242.18, 
      change: '+5.67%', 
      signal: 'BUY', 
      score: 92,
      badge: 'strong',
      shariahCompliant: true
    },
    { 
      symbol: 'MSFT', 
      name: 'Microsoft Corp.', 
      price: 350.25, 
      change: '+1.23%', 
      signal: 'HOLD', 
      score: 65,
      badge: 'valid',
      shariahCompliant: true
    },
    { 
      symbol: 'GOOGL', 
      name: 'Alphabet Inc.', 
      price: 125.45, 
      change: '-0.89%', 
      signal: 'BUY', 
      score: 75,
      badge: 'valid',
      shariahCompliant: false
    },
    { 
      symbol: 'NVDA', 
      name: 'NVIDIA Corp.', 
      price: 445.67, 
      change: '+8.92%', 
      signal: 'BUY', 
      score: 95,
      badge: 'strong',
      shariahCompliant: true
    },
    { 
      symbol: 'AMZN', 
      name: 'Amazon.com Inc.', 
      price: 134.78, 
      change: '+3.45%', 
      signal: 'HOLD', 
      score: 62,
      badge: 'valid',
      shariahCompliant: false
    },
    { 
      symbol: 'META', 
      name: 'Meta Platforms Inc.', 
      price: 320.54, 
      change: '-1.23%', 
      signal: 'SELL', 
      score: 25,
      badge: 'weak',
      shariahCompliant: false
    },
    { 
      symbol: 'JPM', 
      name: 'JPMorgan Chase & Co.', 
      price: 170.22, 
      change: '-0.45%', 
      signal: 'SELL', 
      score: 15,
      badge: 'ignore',
      shariahCompliant: false
    },
  ];

  const handleStockClick = (stock: any) => {
    navigate(`/signals/${stock.symbol}`, { state: { selectedStock: stock } });
  };

  const getBadgeClass = (badge: string) => {
    switch(badge) {
      case 'strong': return 'bg-emerald-600 text-white';
      case 'valid': return 'bg-blue-600 text-white';
      case 'weak': return 'bg-yellow-600 text-white';
      case 'ignore': return 'bg-red-600 text-white';
      default: return 'bg-slate-600 text-white';
    }
  }

  const getBadgeEmoji = (badge: string) => {
    switch(badge) {
      case 'strong': return '💎';
      case 'valid': return '✅';
      case 'weak': return '⚠️';
      case 'ignore': return '🚫';
      default: return '';
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            AI-Powered Trading Signals
          </h1>
          <p className="text-slate-400">
            Get high-probability trade alerts using institutional-grade algorithms
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
              <div className="text-2xl font-bold text-emerald-400">68%</div>
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
            <CardTitle className="text-lg text-white">Latest Stock Signals</CardTitle>
            <p className="text-slate-400 text-sm">Click on any stock to view detailed signal analysis</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Signal</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks.map((stock, index) => (
                  <TableRow 
                    key={index}
                    className="cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => handleStockClick(stock)}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div>
                          <div className="font-medium text-white">{stock.symbol}</div>
                          <div className="text-xs text-slate-400">{stock.name}</div>
                        </div>
                        {stock.shariahCompliant && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Shield className="h-3 w-3 text-green-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Shariah Compliant</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-white">${stock.price.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>
                      <div className={`${stock.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stock.change}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                        stock.signal === 'BUY' ? 'bg-emerald-600 text-white' : 
                        stock.signal === 'HOLD' ? 'bg-yellow-600 text-white' : 
                        'bg-red-600 text-white'
                      }`}>
                        {stock.signal}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getBadgeClass(stock.badge)}`}>
                          {getBadgeEmoji(stock.badge)} {stock.score}/100
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ArrowRight className="h-4 w-4 text-slate-400 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Main Signals Display */}
        <SignalHeatmap />
      </div>
    </Layout>
  );
};

export default Signals;
