import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { ArrowUp, ArrowDown, TrendingUp, Filter, RotateCcw, Globe } from 'lucide-react';

interface Signal {
  symbol: string;
  name: string;
  price: number;
  change: number;
  score: number;
  sector: string;
  market: string;
}

const mockSignals: Signal[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.23, change: 2.45, score: 92, sector: 'technology', market: 'usa' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 750.12, change: 15.67, score: 88, sector: 'technology', market: 'usa' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.45, change: 5.23, score: 85, sector: 'technology', market: 'usa' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.18, change: -3.12, score: 78, sector: 'technology', market: 'usa' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 170.22, change: 1.87, score: 72, sector: 'finance', market: 'usa' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 162.45, change: -0.89, score: 68, sector: 'healthcare', market: 'usa' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 125.45, change: 4.32, score: 82, sector: 'technology', market: 'usa' },
  { symbol: 'META', name: 'Meta Platforms', price: 320.54, change: -2.15, score: 45, sector: 'technology', market: 'usa' },
  { symbol: 'V', name: 'Visa Inc.', price: 250.33, change: 1.25, score: 75, sector: 'finance', market: 'usa' },
  { symbol: 'UNH', name: 'UnitedHealth Group', price: 520.87, change: 3.45, score: 89, sector: 'healthcare', market: 'usa' },
  { symbol: 'HD', name: 'Home Depot', price: 345.67, change: -1.45, score: 65, sector: 'consumer', market: 'usa' },
  { symbol: 'PG', name: 'Procter & Gamble', price: 155.23, change: 0.87, score: 71, sector: 'consumer', market: 'usa' },
  { symbol: '2222.SR', name: 'Saudi Aramco', price: 32.15, change: 1.85, score: 84, sector: 'energy', market: 'saudi' },
  { symbol: 'EMAAR.DU', name: 'Emaar Properties', price: 5.67, change: 3.20, score: 82, sector: 'finance', market: 'uae' },
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change: 4.20, score: 89, sector: 'crypto', market: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 2680.50, change: 3.85, score: 86, sector: 'crypto', market: 'crypto' }
];

const Signals: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [scoreRange, setScoreRange] = useState([0]);
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('global');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500 text-white';
    if (score >= 60) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getScoreBorderColor = (score: number) => {
    if (score >= 80) return 'border-emerald-400';
    if (score >= 60) return 'border-yellow-400';
    return 'border-red-400';
  };

  const filteredSignals = mockSignals.filter(signal => {
    const meetsScore = signal.score >= scoreRange[0];
    const meetsSector = selectedSector === 'all' || signal.sector === selectedSector;
    const meetsMarket = selectedMarket === 'global' || signal.market === selectedMarket;
    return meetsScore && meetsSector && meetsMarket;
  });

  const resetFilters = () => {
    setScoreRange([0]);
    setSelectedSector('all');
    setSelectedMarket('global');
  };

  const handleViewDetails = (signal: Signal) => {
    navigate('/orders', { 
      state: { 
        selectedStock: {
          symbol: signal.symbol,
          name: signal.name,
          price: signal.price,
          change: signal.change,
          signalScore: signal.score
        }
      }
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-950">
        {/* Header Section */}
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <h1 className="text-2xl font-bold text-white">Trading Signals</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 font-medium">Market Open</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-slate-400">Live Signals</div>
                  <div className="text-lg font-bold text-white">{filteredSignals.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <div className="w-80 space-y-6">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Filter className="h-5 w-5 mr-2 text-blue-400" />
                      Filters
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-slate-400 hover:text-white"
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {/* Score Range */}
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">
                        Minimum Score: {scoreRange[0]}
                      </label>
                      <Slider
                        value={scoreRange}
                        onValueChange={setScoreRange}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                    </div>

                    {/* Market Filter */}
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">
                        Market
                      </label>
                      <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <Globe className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="global">🌐 Global</SelectItem>
                          <SelectItem value="usa">🇺🇸 USA</SelectItem>
                          <SelectItem value="saudi">🇸🇦 Saudi Arabia</SelectItem>
                          <SelectItem value="uae">🇦🇪 UAE</SelectItem>
                          <SelectItem value="qatar">🇶🇦 Qatar</SelectItem>
                          <SelectItem value="kuwait">🇰🇼 Kuwait</SelectItem>
                          <SelectItem value="bahrain">🇧🇭 Bahrain</SelectItem>
                          <SelectItem value="oman">🇴🇲 Oman</SelectItem>
                          <SelectItem value="crypto">₿ Crypto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sector Filter */}
                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-3 block">
                        Sector
                      </label>
                      <Select value={selectedSector} onValueChange={setSelectedSector}>
                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="all">All Sectors</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="consumer">Consumer</SelectItem>
                          <SelectItem value="energy">Energy</SelectItem>
                          <SelectItem value="crypto">Crypto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content - Signal Cards Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSignals.map((signal, index) => (
                  <Card 
                    key={index} 
                    className={`bg-slate-900/50 border-2 ${getScoreBorderColor(signal.score)} hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    <CardContent className="p-6">
                      {/* Score Badge */}
                      <div className="flex justify-center mb-4">
                        <Badge className={`${getScoreColor(signal.score)} text-2xl font-bold py-2 px-4 rounded-full`}>
                          {signal.score}
                        </Badge>
                      </div>

                      {/* Stock Info */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-white mb-1">{signal.symbol}</h3>
                        <p className="text-sm text-slate-400">{signal.name}</p>
                      </div>

                      {/* Price Info */}
                      <div className="text-center mb-6">
                        <div className="text-2xl font-bold text-white mb-1">
                          ${signal.price.toFixed(2)}
                        </div>
                        <div className={`flex items-center justify-center text-sm font-medium ${
                          signal.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {signal.change >= 0 ? (
                            <ArrowUp className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 mr-1" />
                          )}
                          {signal.change >= 0 ? '+' : ''}{signal.change.toFixed(2)}%
                        </div>
                      </div>

                      {/* View Details Button */}
                      <Button 
                        onClick={() => handleViewDetails(signal)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredSignals.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-slate-400 text-lg">No signals match your current filters</div>
                  <Button 
                    onClick={resetFilters}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signals;
