
import React from 'react';
import { Button } from '../ui/button';

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
  market: string;
  timestamp: string;
}

interface SignalTableProps {
  filteredSignals: Signal[];
  timeFilter: string;
  highlightedCategory: string | null;
  language: string;
  onViewSignal: (signal: Signal, timeframe: string) => void;
}

const SignalTable: React.FC<SignalTableProps> = ({
  filteredSignals,
  timeFilter,
  highlightedCategory,
  language,
  onViewSignal
}) => {
  const timeframes = ['1H', '4H', '1D', '1W'];

  const getSignalColor = (score: number) => {
    if (score >= 90) return 'text-white shadow-lg border border-green-400'; // Strong - Green
    if (score >= 80) return 'text-white shadow-md border border-blue-300'; // Valid - Blue
    if (score >= 70) return 'text-black shadow-sm border border-yellow-400'; // Weak - Yellow
    return 'bg-gray-600 text-gray-400 opacity-50'; // Below threshold
  };

  const getSignalBackgroundColor = (score: number) => {
    if (score >= 90) return { backgroundColor: 'hsl(118, 95.3%, 49.8%)' }; // Strong - Green
    if (score >= 80) return { backgroundColor: 'hsl(208, 77.3%, 72.4%)' }; // Valid - Blue
    if (score >= 70) return { backgroundColor: '#F1C40F' }; // Weak - Yellow
    return { backgroundColor: '#6b7280' }; // Below threshold
  };

  const getSignalIcon = (score: number) => {
    if (score >= 90) return '💎';
    if (score >= 80) return '✅';
    if (score >= 70) return '⚠️';
    return '';
  };

  const formatPrice = (price: number, market: string) => {
    if (market === 'crypto') {
      if (price >= 1000) {
        return `$${price.toLocaleString()}`;
      } else if (price >= 1) {
        return `$${price.toFixed(2)}`;
      } else {
        return `$${price.toFixed(4)}`;
      }
    }
    return `$${price.toFixed(2)}`;
  };

  const getMarketFlag = (market: string) => {
    switch (market) {
      case 'usa': return '🇺🇸';
      case 'germany': return '🇩🇪';
      case 'uk': return '🇬🇧';
      case 'japan': return '🇯🇵';
      case 'saudi': return '🇸🇦';
      case 'uae': return '🇦🇪';
      case 'qatar': return '🇶🇦';
      case 'kuwait': return '🇰🇼';
      case 'bahrain': return '🇧🇭';
      case 'oman': return '🇴🇲';
      case 'crypto': return '₿';
      default: return '';
    }
  };

  const getTooltipText = (signal: Signal, timeframe: string, score: number) => {
    return `${signal.ticker} ${timeframe}: ${score}% confidence\nRSI: 28, MACD > 0, Volume: 2.1x`;
  };

  const shouldHighlightScore = (score: number) => {
    if (!highlightedCategory) return false;
    if (highlightedCategory === 'strong' && score >= 90) return true;
    if (highlightedCategory === 'valid' && score >= 80 && score < 90) return true;
    if (highlightedCategory === 'weak' && score >= 70 && score < 80) return true;
    return false;
  };

  const getHighlightedSignalColor = (score: number, isHighlighted: boolean) => {
    const baseColor = getSignalColor(score);
    if (isHighlighted) {
      return `${baseColor} ring-4 ring-emerald-300 ring-opacity-75 animate-pulse`;
    }
    return baseColor;
  };

  if (filteredSignals.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-slate-400">
          {language === 'ar' ? 'لا توجد إشارات تطابق المرشحات الحالية.' :
           language === 'de' ? 'Keine Signale entsprechen Ihren aktuellen Filtern.' :
           'No signals match your current filters.'}
        </div>
        <div className="text-slate-500 text-sm mt-1">
          {language === 'ar' ? 'حاول خفض عتبة النقاط أو تغيير مرشح القطاع.' :
           language === 'de' ? 'Versuchen Sie, die Punkteschwelle zu senken oder den Sektorfilter zu ändern.' :
           'Try lowering the score threshold or changing the market/sector filter.'}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Header Row */}
        <div className="grid grid-cols-6 gap-2 mb-2">
          <div className="text-slate-400 text-sm font-medium">{language === 'ar' ? 'السهم' : language === 'de' ? 'Aktie' : 'Asset'}</div>
          {timeframes.map(tf => (
            <div key={tf} className={`text-center text-slate-400 text-sm font-medium ${tf === timeFilter ? 'text-emerald-400' : ''}`}>
              {tf}
            </div>
          ))}
          <div className="text-slate-400 text-sm font-medium">{language === 'ar' ? 'الإجراءات' : language === 'de' ? 'Aktionen' : 'Actions'}</div>
        </div>

        {/* Signal Rows */}
        <div className="space-y-2">
          {filteredSignals.map((signal) => (
            <div key={signal.ticker} className="grid grid-cols-6 gap-2 items-center">
              {/* Stock Info */}
              <div className="flex flex-col">
                <div className="text-white font-bold text-sm flex items-center space-x-1">
                  <span>{getMarketFlag(signal.market)}</span>
                  <span>{signal.ticker}</span>
                </div>
                <div className="text-slate-400 text-xs truncate">{signal.name}</div>
                <div className="text-slate-300 text-xs">{formatPrice(signal.price, signal.market)}</div>
              </div>

              {/* Signal Scores for each timeframe */}
              {timeframes.map(tf => {
                const score = signal.signals[tf as keyof typeof signal.signals];
                const isHighlighted = tf === timeFilter && shouldHighlightScore(score);
                return (
                  <div key={tf} className="flex justify-center">
                    <div 
                      className={`
                        px-2 py-1 rounded text-xs font-bold text-center min-w-[50px] cursor-pointer
                        transition-all duration-200 hover:scale-105 transform
                        ${getHighlightedSignalColor(score, isHighlighted)}
                        ${tf === timeFilter ? 'ring-2 ring-emerald-400' : ''}
                      `}
                      style={getSignalBackgroundColor(score)}
                      title={getTooltipText(signal, tf, score)}
                      onClick={() => onViewSignal(signal, tf)}
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
                  onClick={() => onViewSignal(signal, timeFilter)}
                >
                  {language === 'ar' ? 'عرض' : language === 'de' ? 'Anzeigen' : 'View'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignalTable;
