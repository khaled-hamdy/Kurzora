
import React from 'react';

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

interface SignalSummaryStatsProps {
  filteredSignals: Signal[];
  timeFilter: string;
  highlightedCategory: string | null;
  setHighlightedCategory: (category: string | null) => void;
  language: string;
}

const SignalSummaryStats: React.FC<SignalSummaryStatsProps> = ({
  filteredSignals,
  timeFilter,
  highlightedCategory,
  setHighlightedCategory,
  language
}) => {
  // Get stocks for each category with their scores
  const getStocksForCategory = (category: string) => {
    return filteredSignals
      .map(signal => ({
        ticker: signal.ticker,
        score: signal.signals[timeFilter as keyof typeof signal.signals]
      }))
      .filter(item => {
        if (category === 'strong') return item.score >= 90;
        if (category === 'valid') return item.score >= 80 && item.score < 90;
        if (category === 'weak') return item.score >= 70 && item.score < 80;
        return false;
      });
  };

  return (
    <div className="mt-6 pt-4 border-t border-slate-700">
      {/* Add timeframe indicator label */}
      <div className="mb-4 text-center">
        <div className="text-slate-300 text-sm font-medium">
          {language === 'ar' ? `الإحصائيات تعكس الإطار الزمني النشط: ${timeFilter}` :
           language === 'de' ? `Statistiken spiegeln nur den aktiven Zeitrahmen wider: ${timeFilter}` :
           `Summary reflects only the active timeframe: ${timeFilter}`}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Strong (90+) */}
        <div 
          className="text-center cursor-pointer hover:bg-slate-700/30 rounded-lg p-2 transition-all duration-200"
          onMouseEnter={() => setHighlightedCategory('strong')}
          onMouseLeave={() => setHighlightedCategory(null)}
        >
          <div className="text-lg font-bold" style={{ color: 'hsl(118, 95.3%, 49.8%)' }}>
            {filteredSignals.filter(s => s.signals[timeFilter as keyof typeof s.signals] >= 90).length}
          </div>
          <div className="text-slate-400 text-sm">{language === 'ar' ? 'قوي (90+)' : language === 'de' ? 'Stark (90+)' : 'Strong (90+)'}</div>
          {highlightedCategory === 'strong' && getStocksForCategory('strong').length > 0 && (
            <div className="mt-1 text-xs text-slate-300">
              {getStocksForCategory('strong').map(item => (
                <div key={item.ticker}>{item.ticker} ({item.score})</div>
              ))}
            </div>
          )}
        </div>

        {/* Valid (80-89) */}
        <div 
          className="text-center cursor-pointer hover:bg-slate-700/30 rounded-lg p-2 transition-all duration-200"
          onMouseEnter={() => setHighlightedCategory('valid')}
          onMouseLeave={() => setHighlightedCategory(null)}
        >
          <div className="text-lg font-bold" style={{ color: 'hsl(208, 77.3%, 72.4%)' }}>
            {filteredSignals.filter(s => {
              const score = s.signals[timeFilter as keyof typeof s.signals];
              return score >= 80 && score < 90;
            }).length}
          </div>
          <div className="text-slate-400 text-sm">{language === 'ar' ? 'صحيح (80-89)' : language === 'de' ? 'Gültig (80-89)' : 'Valid (80-89)'}</div>
          {highlightedCategory === 'valid' && getStocksForCategory('valid').length > 0 && (
            <div className="mt-1 text-xs text-slate-300">
              {getStocksForCategory('valid').map(item => (
                <div key={item.ticker}>{item.ticker} ({item.score})</div>
              ))}
            </div>
          )}
        </div>

        {/* Weak (70-79) */}
        <div 
          className="text-center cursor-pointer hover:bg-slate-700/30 rounded-lg p-2 transition-all duration-200"
          onMouseEnter={() => setHighlightedCategory('weak')}
          onMouseLeave={() => setHighlightedCategory(null)}
        >
          <div className="text-yellow-400 text-lg font-bold">
            {filteredSignals.filter(s => {
              const score = s.signals[timeFilter as keyof typeof s.signals];
              return score >= 70 && score < 80;
            }).length}
          </div>
          <div className="text-slate-400 text-sm">{language === 'ar' ? 'ضعيف (70-79)' : language === 'de' ? 'Schwach (70-79)' : 'Weak (70-79)'}</div>
          {highlightedCategory === 'weak' && getStocksForCategory('weak').length > 0 && (
            <div className="mt-1 text-xs text-slate-300">
              {getStocksForCategory('weak').map(item => (
                <div key={item.ticker}>{item.ticker} ({item.score})</div>
              ))}
            </div>
          )}
        </div>

        {/* Total Signals */}
        <div className="text-center">
          <div className="text-white text-lg font-bold">
            {filteredSignals.length}
          </div>
          <div className="text-slate-400 text-sm">{language === 'ar' ? 'إجمالي الإشارات' : language === 'de' ? 'Gesamtsignale' : 'Total Signals'}</div>
        </div>
      </div>
    </div>
  );
};

export default SignalSummaryStats;
