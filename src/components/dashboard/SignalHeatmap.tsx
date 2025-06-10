
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';

interface HeatmapSignal {
  symbol: string;
  name: string;
  price: number;
  change: number;
  score: number;
  sector: string;
  market: string;
}

const SignalHeatmap: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  // Mock data for the heatmap
  const signals: HeatmapSignal[] = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 185.23, change: 2.45, score: 92, sector: 'Technology', market: 'NASDAQ' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.45, change: 1.23, score: 88, sector: 'Technology', market: 'NASDAQ' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.67, change: -0.89, score: 85, sector: 'Technology', market: 'NASDAQ' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 426.32, change: 3.21, score: 94, sector: 'Technology', market: 'NASDAQ' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.91, change: -1.45, score: 82, sector: 'Automotive', market: 'NASDAQ' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 156.78, change: 0.67, score: 79, sector: 'E-commerce', market: 'NASDAQ' },
    { symbol: 'META', name: 'Meta Platforms', price: 512.34, change: 2.11, score: 87, sector: 'Social Media', market: 'NASDAQ' },
    { symbol: 'BTC', name: 'Bitcoin', price: 67432.10, change: 4.23, score: 91, sector: 'Cryptocurrency', market: 'Crypto' },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const handleViewSignal = (symbol: string) => {
    navigate(`/signals/${symbol}`);
  };

  const timeframes = ['1H', '4H', '1D', '1W'];

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
            <span>Signal Heatmap</span>
          </CardTitle>
          <div className="flex space-x-2">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={selectedTimeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(tf)}
                className={selectedTimeframe === tf ? 
                  "bg-emerald-600 hover:bg-emerald-700" : 
                  "border-slate-600 text-slate-300 hover:bg-slate-700"
                }
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {signals.map((signal) => (
            <div
              key={signal.symbol}
              className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-slate-500 transition-all duration-200 hover:bg-slate-700/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-white font-bold text-lg">{signal.symbol}</div>
                  <div className="text-slate-400 text-xs truncate">{signal.name}</div>
                </div>
                <Badge 
                  className={`${getScoreColor(signal.score)} text-white px-2 py-1 text-xs font-bold`}
                >
                  {signal.score}
                </Badge>
              </div>
              
              <div className="mb-3">
                <div className="text-white font-semibold">
                  ${signal.price.toLocaleString()}
                </div>
                <div className={`text-sm flex items-center ${
                  signal.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {signal.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {signal.change >= 0 ? '+' : ''}{signal.change}%
                </div>
              </div>

              <div className="text-xs text-slate-400 mb-3">
                {signal.sector} • {signal.market}
              </div>

              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleViewSignal(signal.symbol)}
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white"
              >
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalHeatmap;
