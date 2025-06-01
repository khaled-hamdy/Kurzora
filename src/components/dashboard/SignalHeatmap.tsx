
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, TrendingDown, Activity, Calendar } from 'lucide-react';
import { Button } from '../ui/button';

interface Signal {
  ticker: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  indicators: string[];
  price: number;
  change: number;
  timestamp: string;
}

const mockSignals: Signal[] = [
  { ticker: 'AAPL', signal: 'BUY', confidence: 92, indicators: ['RSI', 'MACD'], price: 185.23, change: 2.45, timestamp: '2 min ago' },
  { ticker: 'NVDA', signal: 'BUY', confidence: 88, indicators: ['Bollinger', 'SMA'], price: 750.12, change: 15.67, timestamp: '5 min ago' },
  { ticker: 'TSLA', signal: 'SELL', confidence: 85, indicators: ['RSI', 'Volume'], price: 242.18, change: -8.90, timestamp: '8 min ago' },
  { ticker: 'MSFT', signal: 'BUY', confidence: 79, indicators: ['MACD', 'EMA'], price: 412.45, change: 5.23, timestamp: '12 min ago' },
  { ticker: 'GOOGL', signal: 'HOLD', confidence: 65, indicators: ['RSI'], price: 145.67, change: -1.22, timestamp: '15 min ago' },
  { ticker: 'META', signal: 'BUY', confidence: 82, indicators: ['Bollinger', 'RSI'], price: 325.89, change: 7.45, timestamp: '18 min ago' },
  { ticker: 'AMD', signal: 'SELL', confidence: 76, indicators: ['MACD', 'Volume'], price: 142.33, change: -4.12, timestamp: '22 min ago' },
  { ticker: 'AMZN', signal: 'BUY', confidence: 87, indicators: ['SMA', 'EMA'], price: 155.78, change: 3.89, timestamp: '25 min ago' }
];

const SignalHeatmap: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('1H');

  const getSignalColor = (signal: string, confidence: number) => {
    if (signal === 'BUY') {
      return confidence >= 80 ? 'bg-emerald-500' : 'bg-emerald-600';
    } else if (signal === 'SELL') {
      return confidence >= 80 ? 'bg-red-500' : 'bg-red-600';
    }
    return 'bg-yellow-500';
  };

  const getSignalTextColor = (signal: string) => {
    if (signal === 'BUY') return 'text-emerald-400';
    if (signal === 'SELL') return 'text-red-400';
    return 'text-yellow-400';
  };

  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 80) return 'High';
    if (confidence >= 60) return 'Medium';
    return 'Low';
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            <span>Live Signal Heatmap</span>
          </CardTitle>
          <div className="flex space-x-2">
            {['1H', '4H', '1D', '1W'].map((period) => (
              <Button
                key={period}
                variant={timeFilter === period ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFilter(period)}
                className={`text-xs ${
                  timeFilter === period 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockSignals.map((signal, index) => (
            <div 
              key={signal.ticker}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/50"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="text-white font-bold text-sm">{signal.ticker}</div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getSignalColor(signal.signal, signal.confidence)} text-white`}>
                    {signal.signal}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-slate-300 text-sm">${signal.price}</div>
                  <div className={`flex items-center text-xs ${signal.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {signal.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {signal.change >= 0 ? '+' : ''}{signal.change}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className={`text-sm font-medium ${getSignalTextColor(signal.signal)}`}>
                    {signal.confidence}% {getConfidenceLevel(signal.confidence)}
                  </div>
                  <div className="text-xs text-slate-400">
                    {signal.indicators.join(', ')}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center text-xs text-slate-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    {signal.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-emerald-400 text-lg font-bold">
              {mockSignals.filter(s => s.signal === 'BUY').length}
            </div>
            <div className="text-slate-400 text-sm">Buy Signals</div>
          </div>
          <div className="text-center">
            <div className="text-red-400 text-lg font-bold">
              {mockSignals.filter(s => s.signal === 'SELL').length}
            </div>
            <div className="text-slate-400 text-sm">Sell Signals</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 text-lg font-bold">
              {mockSignals.filter(s => s.signal === 'HOLD').length}
            </div>
            <div className="text-slate-400 text-sm">Hold Signals</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalHeatmap;
