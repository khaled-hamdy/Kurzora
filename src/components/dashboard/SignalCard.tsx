
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';

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

interface SignalCardProps {
  signal: Signal;
  onViewDetails: () => void;
}

const SignalCard: React.FC<SignalCardProps> = ({ signal, onViewDetails }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500 text-white';
    if (score >= 60) return 'bg-amber-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getScoreBorderColor = (score: number) => {
    if (score >= 80) return 'border-emerald-500/20';
    if (score >= 60) return 'border-amber-500/20';
    return 'border-red-500/20';
  };

  const isPositive = signal.change >= 0;

  return (
    <Card className={`bg-slate-900/50 backdrop-blur-sm border-slate-800 hover:bg-slate-900/70 transition-all duration-300 hover:shadow-xl group ${getScoreBorderColor(signal.score)}`}>
      <CardContent className="p-6">
        {/* Score Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className={`rounded-xl px-3 py-2 text-lg font-bold ${getScoreColor(signal.score)} shadow-lg`}>
            {signal.score}
          </div>
          <div className="text-xs text-slate-400">{signal.timestamp}</div>
        </div>

        {/* Stock Info */}
        <div className="mb-4">
          <div className="text-xl font-bold text-white mb-1">{signal.symbol}</div>
          <div className="text-sm text-slate-400 leading-tight">{signal.company}</div>
        </div>

        {/* Price Info */}
        <div className="mb-4">
          <div className="text-lg font-semibold text-white">${signal.price.toFixed(2)}</div>
          <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {isPositive ? '+' : ''}{signal.change.toFixed(2)} ({isPositive ? '+' : ''}{signal.changePercent.toFixed(2)}%)
          </div>
        </div>

        {/* Sector Badge */}
        <div className="mb-4">
          <span className="inline-block bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-full">
            {signal.sector}
          </span>
        </div>

        {/* View Details Button */}
        <Button 
          onClick={onViewDetails}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 group-hover:bg-blue-500"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignalCard;
