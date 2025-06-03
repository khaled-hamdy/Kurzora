
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, Activity, Calendar, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('1D');
  const [scoreThreshold, setScoreThreshold] = useState([70]);
  const [sectorFilter, setSectorFilter] = useState('all');

  const getSignalColor = (score: number) => {
    if (score >= 90) return 'bg-green-500 hover:bg-green-600 text-white shadow-lg border border-green-400'; // Strong - Green hsl(118, 95.3%, 49.8%)
    if (score >= 80) return 'bg-blue-400 hover:bg-blue-500 text-white shadow-md border border-blue-300'; // Valid - Blue hsl(208, 77.3%, 72.4%)
    if (score >= 70) return 'bg-yellow-500 hover:bg-yellow-600 text-black shadow-sm border border-yellow-400'; // Weak - Yellow #F1C40F
    return 'bg-gray-600 text-gray-400 opacity-50'; // Below threshold
  };

  const getSignalIcon = (score: number) => {
    if (score >= 90) return '💎';
    if (score >= 80) return '✅';
    if (score >= 70) return '⚠️';
    return '';
  };

  const getTooltipText = (signal: Signal, timeframe: string, score: number) => {
    return `${signal.ticker} ${timeframe}: ${score}% confidence\nRSI: 28, MACD > 0, Volume: 2.1x`;
  };

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

  const timeframes = ['1H', '4H', '1D', '1W'];

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            <span>{language === 'ar' ? 'خريطة إشارات الشراء الحرارية' : language === 'de' ? 'BUY Signal Heatmap' : 'BUY Signal Heatmap'}</span>
          </CardTitle>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Score Threshold */}
            <div className="flex items-center space-x-2 min-w-[180px]">
              <Filter className="h-4 w-4 text-slate-400" />
              <Label className="text-slate-300 text-sm whitespace-nowrap">
                {language === 'ar' ? `الحد الأدنى: ${scoreThreshold[0]}%` : 
                 language === 'de' ? `Min Score: ${scoreThreshold[0]}%` : 
                 `Min Score: ${scoreThreshold[0]}%`}
              </Label>
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
                <SelectItem value="all">{language === 'ar' ? 'جميع القطاعات' : language === 'de' ? 'Alle Sektoren' : 'All Sectors'}</SelectItem>
                <SelectItem value="tech">{language === 'ar' ? 'التكنولوجيا' : language === 'de' ? 'Technologie' : 'Tech'}</SelectItem>
                <SelectItem value="finance">{language === 'ar' ? 'المالية' : language === 'de' ? 'Finanzen' : 'Finance'}</SelectItem>
                <SelectItem value="healthcare">{language === 'ar' ? 'الرعاية الصحية' : language === 'de' ? 'Gesundheitswesen' : 'Healthcare'}</SelectItem>
                <SelectItem value="energy">{language === 'ar' ? 'الطاقة' : language === 'de' ? 'Energie' : 'Energy'}</SelectItem>
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

        {/* Legend with updated colors */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-400">{language === 'ar' ? 'المفتاح:' : language === 'de' ? 'Legende:' : 'Legend:'}</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-green-500 rounded border border-green-400"></div>
            <span className="text-slate-300">💎 90-100 {language === 'ar' ? 'قوي' : language === 'de' ? 'Stark' : 'Strong'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-blue-400 rounded border border-blue-300"></div>
            <span className="text-slate-300">✅ 80-89 {language === 'ar' ? 'صحيح' : language === 'de' ? 'Gültig' : 'Valid'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-yellow-500 rounded border border-yellow-400"></div>
            <span className="text-slate-300">⚠️ 70-79 {language === 'ar' ? 'ضعيف' : language === 'de' ? 'Schwach' : 'Weak'}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Matrix Heatmap */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header Row */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-slate-400 text-sm font-medium">{language === 'ar' ? 'السهم' : language === 'de' ? 'Aktie' : 'Stock'}</div>
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
                            transition-all duration-200 hover:scale-105 transform
                            ${getSignalColor(score)}
                            ${tf === timeFilter ? 'ring-2 ring-emerald-400' : ''}
                          `}
                          title={getTooltipText(signal, tf, score)}
                          onClick={() => handleViewSignal(signal, tf)}
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
                      onClick={() => handleViewSignal(signal, timeFilter)}
                    >
                      {language === 'ar' ? 'عرض' : language === 'de' ? 'Anzeigen' : 'View'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats with updated color references */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-green-400 text-lg font-bold">
              {filteredSignals.filter(s => s.signals[timeFilter as keyof typeof s.signals] >= 90).length}
            </div>
            <div className="text-slate-400 text-sm">{language === 'ar' ? 'قوي (90+)' : language === 'de' ? 'Stark (90+)' : 'Strong (90+)'}</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 text-lg font-bold">
              {filteredSignals.filter(s => {
                const score = s.signals[timeFilter as keyof typeof s.signals];
                return score >= 80 && score < 90;
              }).length}
            </div>
            <div className="text-slate-400 text-sm">{language === 'ar' ? 'صحيح (80-89)' : language === 'de' ? 'Gültig (80-89)' : 'Valid (80-89)'}</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 text-lg font-bold">
              {filteredSignals.filter(s => {
                const score = s.signals[timeFilter as keyof typeof s.signals];
                return score >= 70 && score < 80;
              }).length}
            </div>
            <div className="text-slate-400 text-sm">{language === 'ar' ? 'ضعيف (70-79)' : language === 'de' ? 'Schwach (70-79)' : 'Weak (70-79)'}</div>
          </div>
          <div className="text-center">
            <div className="text-white text-lg font-bold">
              {filteredSignals.length}
            </div>
            <div className="text-slate-400 text-sm">{language === 'ar' ? 'إجمالي الإشارات' : language === 'de' ? 'Gesamtsignale' : 'Total Signals'}</div>
          </div>
        </div>

        {/* No Results Message */}
        {filteredSignals.length === 0 && (
          <div className="text-center py-8">
            <div className="text-slate-400">
              {language === 'ar' ? 'لا توجد إشارات تطابق المرشحات الحالية.' :
               language === 'de' ? 'Keine Signale entsprechen Ihren aktuellen Filtern.' :
               'No signals match your current filters.'}
            </div>
            <div className="text-slate-500 text-sm mt-1">
              {language === 'ar' ? 'حاول خفض عتبة النقاط أو تغيير مرشح القطاع.' :
               language === 'de' ? 'Versuchen Sie, die Punkteschwelle zu senken oder den Sektorfilter zu ändern.' :
               'Try lowering the score threshold or changing the sector filter.'}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SignalHeatmap;
