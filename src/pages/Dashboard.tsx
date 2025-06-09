
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SignalCard from '../components/dashboard/SignalCard';
import SignalFilters from '../components/dashboard/SignalFilters';
import MarketStatus from '../components/dashboard/MarketStatus';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TrendingUp, DollarSign, Target, Bell, Activity } from 'lucide-react';

interface Signal {
  id: string;
  symbol: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
  score: number;
  sector: string;
  marketCap: string;
  timestamp: string;
}

const mockSignals: Signal[] = [
  {
    id: '1',
    symbol: 'AAPL',
    company: 'Apple Inc.',
    price: 185.23,
    change: 4.52,
    changePercent: 2.45,
    score: 92,
    sector: 'Technology',
    marketCap: 'Large',
    timestamp: '2 min ago'
  },
  {
    id: '2',
    symbol: 'NVDA',
    company: 'NVIDIA Corporation',
    price: 750.12,
    change: 35.67,
    changePercent: 4.98,
    score: 88,
    sector: 'Technology',
    marketCap: 'Large',
    timestamp: '5 min ago'
  },
  {
    id: '3',
    symbol: 'MSFT',
    company: 'Microsoft Corporation',
    price: 412.45,
    change: 8.23,
    changePercent: 2.03,
    score: 85,
    sector: 'Technology',
    marketCap: 'Large',
    timestamp: '8 min ago'
  },
  {
    id: '4',
    symbol: 'JPM',
    company: 'JPMorgan Chase & Co.',
    price: 170.22,
    change: 3.12,
    changePercent: 1.87,
    score: 78,
    sector: 'Finance',
    marketCap: 'Large',
    timestamp: '12 min ago'
  },
  {
    id: '5',
    symbol: 'JNJ',
    company: 'Johnson & Johnson',
    price: 155.80,
    change: -2.45,
    changePercent: -1.55,
    score: 65,
    sector: 'Healthcare',
    marketCap: 'Large',
    timestamp: '15 min ago'
  },
  {
    id: '6',
    symbol: 'GOOGL',
    company: 'Alphabet Inc.',
    price: 142.35,
    change: 6.78,
    changePercent: 5.00,
    score: 82,
    sector: 'Technology',
    marketCap: 'Large',
    timestamp: '18 min ago'
  },
  {
    id: '7',
    symbol: 'TSLA',
    company: 'Tesla Inc.',
    price: 242.18,
    change: 12.45,
    changePercent: 5.42,
    score: 76,
    sector: 'Technology',
    marketCap: 'Large',
    timestamp: '20 min ago'
  },
  {
    id: '8',
    symbol: 'META',
    company: 'Meta Platforms Inc.',
    price: 325.89,
    change: -5.67,
    changePercent: -1.71,
    score: 45,
    sector: 'Technology',
    marketCap: 'Large',
    timestamp: '25 min ago'
  }
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [sectorFilter, setSectorFilter] = useState('all');
  const [marketCapFilter, setMarketCapFilter] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const filteredSignals = mockSignals.filter(signal => {
    const meetsScore = signal.score >= scoreRange[0] && signal.score <= scoreRange[1];
    const meetsSector = sectorFilter === 'all' || signal.sector === sectorFilter;
    const meetsMarketCap = marketCapFilter === 'all' || signal.marketCap === marketCapFilter;
    return meetsScore && meetsSector && meetsMarketCap;
  });

  const resetFilters = () => {
    setScoreRange([0, 100]);
    setSectorFilter('all');
    setMarketCapFilter('all');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950">
        {/* Header Section */}
        <div className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold text-white">Trading Signals</h1>
                <MarketStatus />
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-300">
                  Welcome, <span className="text-white font-medium">{user.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80">
              <SignalFilters
                scoreRange={scoreRange}
                setScoreRange={setScoreRange}
                sectorFilter={sectorFilter}
                setSectorFilter={setSectorFilter}
                marketCapFilter={marketCapFilter}
                setMarketCapFilter={setMarketCapFilter}
                onReset={resetFilters}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">Active Signals</CardTitle>
                    <Activity className="h-4 w-4 text-emerald-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{filteredSignals.length}</div>
                    <p className="text-xs text-slate-400">Real-time alerts</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">Avg Score</CardTitle>
                    <Target className="h-4 w-4 text-amber-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-400">
                      {Math.round(filteredSignals.reduce((acc, signal) => acc + signal.score, 0) / filteredSignals.length || 0)}
                    </div>
                    <p className="text-xs text-slate-400">Signal strength</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">Strong Signals</CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-400">
                      {filteredSignals.filter(s => s.score >= 80).length}
                    </div>
                    <p className="text-xs text-emerald-500">Score ≥ 80</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-300">Portfolio Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-emerald-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">$38,734</div>
                    <p className="text-xs text-emerald-500">+287% all time</p>
                  </CardContent>
                </Card>
              </div>

              {/* Signal Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredSignals.map((signal) => (
                  <SignalCard
                    key={signal.id}
                    signal={signal}
                    onViewDetails={() => navigate(`/signals/${signal.symbol}`, { state: { selectedStock: signal } })}
                  />
                ))}
              </div>

              {filteredSignals.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-slate-400 text-lg">No signals match your current filters</div>
                  <p className="text-slate-500 text-sm mt-2">Try adjusting your score range or sector filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
