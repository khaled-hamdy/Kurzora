
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, Activity, Calendar, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { useLanguage } from '../../contexts/LanguageContext';

interface Signal {
  ticker: string;
  name: string;
  price: number;
  change: number;
  signals: {
    '1H': number;
    '4H': number;
    '1D': number;
    '1W': number;
  };
  sector: string;
  timestamp: string;
}

const mockSignals: Signal[] = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 185.23,
    change: 2.45,
    signals: { '1H': 92, '4H': 88, '1D': 95, '1W': 78 },
    sector: 'tech',
    timestamp: '2 min ago'
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 750.12,
    change: 15.67,
    signals: { '1H': 85, '4H': 92, '1D': 89, '1W': 94 },
    sector: 'tech',
    timestamp: '5 min ago'
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: 412.45,
    change: 5.23,
    signals: { '1H': 79, '4H': 84, '1D': 87, '1W': 82 },
    sector: 'tech',
    timestamp: '8 min ago'
  },
  {
    ticker: 'JPM',
    name: 'JPMorgan Chase',
    price: 170.22,
    change: 3.12,
    signals: { '1H': 88, '4H': 91, '1D': 85, '1W': 89 },
    sector: 'finance',
    timestamp: '12 min ago'
  },
  {
    ticker: 'JNJ',
    name: 'Johnson & Johnson',
    price: 155.78,
    change: 1.89,
    signals: { '1H': 76, '4H': 82, '1D': 88, '1W': 84 },
    sector: 'healthcare',
    timestamp: '15 min ago'
  },
  {
    ticker: 'XOM',
    name: 'Exxon Mobil',
    price: 118.45,
    change: 4.23,
    signals: { '1H': 83, '4H': 87, '1D': 81, '1W': 86 },
    sector: 'energy',
    timestamp: '18 min ago'
  }
];

const SignalHeatmap: React.FC = () => {
  const { t, language } = useLanguage();
  const [timeFilter, setTimeFilter] = useState('1D');
  const [scoreThreshold, setScoreThreshold] = useState([70]);
  const [sectorFilter, setSectorFilter] = useState('all');

  const getSignalColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500 text-white'; // Strong
    if (score >= 80) return 'bg-emerald-400 text-white'; // Valid
    if (score >= 70) return 'bg-yellow-500 text-black'; // Weak
    return 'bg-gray-600 text-gray-400'; // Below threshold
  };

  const getSignalIcon = (score: number) => {
    if (score >= 90) return '💎';
    if (score >= 80) return '✅';
    if (score >= 70) return '⚠️';
    return '';
  };

  const filteredSignals = mockSignals.filter(signal => {
    const score = signal.signals[timeFilter as keyof typeof signal.signals];
    const meetsThreshold = score >= scoreThreshold[0];
    const meetsSector = sectorFilter === 'all' || signal.sector === sectorFilter;
    return meetsThreshold && meetsSector;
  });

  const timeframes = ['1H', '4H', '1D', '1W'];

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            <span>BUY Signal Heatmap</span>
          </CardTitle>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Score Threshold */}
            <div className="flex items-center space-x-2 min-w-[180px]">
              <Filter className="h-4 w-4 text-slate-400" />
              <Label className="text-slate-300 text-sm whitespace-nowrap">Min Score: {scoreThreshold[0]}%</Label>
              <Slider
                value={scoreThreshold}
                onValueChange={setScoreThreshold}
                max={100}
                min={60}
                step={5}
                className="flex-1"
              />
            </div>

            {/* Sector Filter */}
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="energy">Energy</SelectItem>
              </SelectContent>
            </Select>

            {/* Timeframe Filter */}
            <div className="flex space-x-1">
              {timeframes.map((period) => (
                <Button
                  key={period}
                  variant={timeFilter === period ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeFilter(period)}
                  className={`text-xs ${
                    timeFilter === period 
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-400">Legend:</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-emerald-500 rounded"></div>
            <span className="text-slate-300">💎 90-100 Strong</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-emerald-400 rounded"></div>
            <span className="text-slate-300">✅ 80-89 Valid</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-slate-300">⚠️ 70-79 Weak</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Matrix Heatmap */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-slate-400 text-sm font-medium">Stock</div>
              {timeframes.map(tf => (
                <div key={tf} className={`text-center text-slate-400 text-sm font-medium ${tf === timeFilter ? 'text-emerald-400' : ''}`}>
                  {tf}
                </div>
              ))}
              <div className="text-slate-400 text-sm font-medium">Actions</div>
            </div>

            {/* Signal Rows */}
            <div className="space-y-2">
              {filteredSignals.map((signal) => (
                <div key={signal.ticker} className="grid grid-cols-6 gap-2 items-center">
                  {/* Stock Info */}
                  <div className="flex flex-col">
                    <div className="text-white font-bold text-sm">{signal.ticker}</div>
                    <div className="text-slate-400 text-xs truncate">{signal.name}</div>
                    <div className="text-slate-300 text-xs">${signal.price}</div>
                  </div>

                  {/* Signal Scores for each timeframe */}
                  {timeframes.map(tf => {
                    const score = signal.signals[tf as keyof typeof signal.signals];
                    return (
                      <div key={tf} className="flex justify-center">
                        <div 
                          className={`
                            px-2 py-1 rounded text-xs font-bold text-center min-w-[50px] cursor-pointer
                            transition-all duration-200 hover:scale-105
                            ${getSignalColor(score)}
                            ${tf === timeFilter ? 'ring-2 ring-emerald-400' : ''}
                          `}
                          title={`${tf}: ${score}% confidence`}
                        >
                          {getSignalIcon(score)} {score}
                        </div>
                      </div>
                    );
                  })}

                  {/* Action Button */}
                  <div className="flex justify-center">
                    <Button 
                      size="sm" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1"
                      onClick={() => console.log(`View ${signal.ticker} details`)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-emerald-400 text-lg font-bold">
              {filteredSignals.filter(s => s.signals[timeFilter as keyof typeof s.signals] >= 90).length}
            </div>
            <div className="text-slate-400 text-sm">Strong (90+)</div>
          </div>
          <div className="text-center">
            <div className="text-emerald-400 text-lg font-bold">
              {filteredSignals.filter(s => {
                const score = s.signals[timeFilter as keyof typeof s.signals];
                return score >= 80 && score < 90;
              }).length}
            </div>
            <div className="text-slate-400 text-sm">Valid (80-89)</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 text-lg font-bold">
              {filteredSignals.filter(s => {
                const score = s.signals[timeFilter as keyof typeof s.signals];
                return score >= 70 && score < 80;
              }).length}
            </div>
            <div className="text-slate-400 text-sm">Weak (70-79)</div>
          </div>
          <div className="text-center">
            <div className="text-white text-lg font-bold">
              {filteredSignals.length}
            </div>
            <div className="text-slate-400 text-sm">Total Signals</div>
          </div>
        </div>

        {/* No Results Message */}
        {filteredSignals.length === 0 && (
          <div className="text-center py-8">
            <div className="text-slate-400">No signals match your current filters.</div>
            <div className="text-slate-500 text-sm mt-1">Try lowering the score threshold or changing the sector filter.</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SignalHeatmap;
