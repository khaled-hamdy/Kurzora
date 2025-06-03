
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import SignalFilters from './SignalFilters';
import SignalLegend from './SignalLegend';
import SignalTable from './SignalTable';
import SignalSummaryStats from './SignalSummaryStats';

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
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('1D');
  const [scoreThreshold, setScoreThreshold] = useState([70]);
  const [sectorFilter, setSectorFilter] = useState('all');
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);

  const handleViewSignal = (signal: Signal, timeframe: string) => {
    navigate(`/signals/${signal.ticker}`, { 
      state: { 
        selectedStock: signal,
        timeframe: timeframe,
        score: signal.signals[timeframe as keyof typeof signal.signals]
      }
    });
  };

  const filteredSignals = mockSignals.filter(signal => {
    const score = signal.signals[timeFilter as keyof typeof signal.signals];
    const meetsThreshold = score >= scoreThreshold[0];
    const meetsSector = sectorFilter === 'all' || signal.sector === sectorFilter;
    return meetsThreshold && meetsSector;
  });

  // Check if any filters are active
  const hasActiveFilters = scoreThreshold[0] > 70 || sectorFilter !== 'all';

  const getFilterStatusText = () => {
    const parts = [];
    
    if (scoreThreshold[0] > 70) {
      if (language === 'ar') {
        parts.push(`الحد الأدنى ≥ ${scoreThreshold[0]} في ${timeFilter}`);
      } else if (language === 'de') {
        parts.push(`Min Score ≥ ${scoreThreshold[0]} in ${timeFilter}`);
      } else {
        parts.push(`Min Score ≥ ${scoreThreshold[0]} in ${timeFilter}`);
      }
    }

    if (sectorFilter !== 'all') {
      const sectorNames = {
        tech: language === 'ar' ? 'التكنولوجيا' : language === 'de' ? 'Technologie' : 'Tech',
        finance: language === 'ar' ? 'المالية' : language === 'de' ? 'Finanzen' : 'Finance',
        healthcare: language === 'ar' ? 'الرعاية الصحية' : language === 'de' ? 'Gesundheitswesen' : 'Healthcare',
        energy: language === 'ar' ? 'الطاقة' : language === 'de' ? 'Energie' : 'Energy'
      };
      
      if (language === 'ar') {
        parts.push(`القطاع: ${sectorNames[sectorFilter as keyof typeof sectorNames]}`);
      } else if (language === 'de') {
        parts.push(`Sektor: ${sectorNames[sectorFilter as keyof typeof sectorNames]}`);
      } else {
        parts.push(`Sector: ${sectorNames[sectorFilter as keyof typeof sectorNames]}`);
      }
    }

    return parts.join(', ');
  };

  const clearFilters = () => {
    setScoreThreshold([70]);
    setSectorFilter('all');
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            <span>{language === 'ar' ? 'خريطة إشارات الشراء الحرارية' : language === 'de' ? 'BUY Signal Heatmap' : 'BUY Signal Heatmap'}</span>
          </CardTitle>
          
          <SignalFilters
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            scoreThreshold={scoreThreshold}
            setScoreThreshold={setScoreThreshold}
            sectorFilter={sectorFilter}
            setSectorFilter={setSectorFilter}
            language={language}
          />
        </div>

        {/* Filter Status Indicator */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3 border border-slate-600">
            <div className="flex items-center space-x-2">
              <div className="text-sm text-slate-300">
                {language === 'ar' ? 'مُرشح بواسطة:' : language === 'de' ? 'Gefiltert nach:' : 'Filtered by:'} 
                <span className="font-medium text-emerald-400 ml-1">{getFilterStatusText()}</span>
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-3 w-3" />
              <span>{language === 'ar' ? 'مسح' : language === 'de' ? 'Löschen' : 'Clear'}</span>
            </button>
          </div>
        )}

        <SignalLegend language={language} />
      </CardHeader>

      <CardContent>
        <SignalTable
          filteredSignals={filteredSignals}
          timeFilter={timeFilter}
          highlightedCategory={highlightedCategory}
          language={language}
          onViewSignal={handleViewSignal}
        />

        <SignalSummaryStats
          filteredSignals={filteredSignals}
          timeFilter={timeFilter}
          highlightedCategory={highlightedCategory}
          setHighlightedCategory={setHighlightedCategory}
          language={language}
        />
      </CardContent>
    </Card>
  );
};

export default SignalHeatmap;
