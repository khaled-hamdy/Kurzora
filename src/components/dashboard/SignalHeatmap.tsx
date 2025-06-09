import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import SignalFilters from './SignalFilters';
import SignalLegend from './SignalLegend';
import SignalTable from './SignalTable';
import SignalSummaryStats from './SignalSummaryStats';
import { Switch } from '../ui/switch';

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

const mockSignals: Signal[] = [
  // USA Market
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 185.23,
    change: 2.45,
    signals: { '1H': 92, '4H': 88, '1D': 95, '1W': 78 },
    sector: 'tech',
    market: 'usa',
    timestamp: '2 min ago'
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 750.12,
    change: 15.67,
    signals: { '1H': 85, '4H': 92, '1D': 89, '1W': 94 },
    sector: 'tech',
    market: 'usa',
    timestamp: '5 min ago'
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: 412.45,
    change: 5.23,
    signals: { '1H': 79, '4H': 84, '1D': 87, '1W': 82 },
    sector: 'tech',
    market: 'usa',
    timestamp: '8 min ago'
  },
  {
    ticker: 'JPM',
    name: 'JPMorgan Chase',
    price: 170.22,
    change: 3.12,
    signals: { '1H': 88, '4H': 91, '1D': 85, '1W': 89 },
    sector: 'finance',
    market: 'usa',
    timestamp: '12 min ago'
  },
  
  // Germany 🇩🇪
  {
    ticker: 'SAP.DE',
    name: 'SAP SE',
    price: 142.80,
    change: 3.45,
    signals: { '1H': 87, '4H': 84, '1D': 91, '1W': 86 },
    sector: 'tech',
    market: 'germany',
    timestamp: '4 min ago'
  },
  {
    ticker: 'SIE.DE',
    name: 'Siemens AG',
    price: 178.95,
    change: 2.20,
    signals: { '1H': 82, '4H': 89, '1D': 85, '1W': 91 },
    sector: 'tech',
    market: 'germany',
    timestamp: '6 min ago'
  },
  {
    ticker: 'VOW3.DE',
    name: 'Volkswagen AG',
    price: 95.60,
    change: 1.85,
    signals: { '1H': 76, '4H': 81, '1D': 88, '1W': 83 },
    sector: 'tech',
    market: 'germany',
    timestamp: '9 min ago'
  },
  
  // UK 🇬🇧
  {
    ticker: 'SHEL.L',
    name: 'Shell PLC',
    price: 28.45,
    change: 2.75,
    signals: { '1H': 84, '4H': 87, '1D': 82, '1W': 89 },
    sector: 'energy',
    market: 'uk',
    timestamp: '7 min ago'
  },
  {
    ticker: 'ULVR.L',
    name: 'Unilever PLC',
    price: 44.22,
    change: 1.95,
    signals: { '1H': 79, '4H': 83, '1D': 86, '1W': 81 },
    sector: 'tech',
    market: 'uk',
    timestamp: '11 min ago'
  },
  
  // Japan 🇯🇵
  {
    ticker: '7203.T',
    name: 'Toyota Motor Corp.',
    price: 2845.50,
    change: 45.20,
    signals: { '1H': 86, '4H': 91, '1D': 88, '1W': 84 },
    sector: 'tech',
    market: 'japan',
    timestamp: '5 min ago'
  },
  {
    ticker: '6758.T',
    name: 'Sony Group Corp.',
    price: 10850.00,
    change: 125.30,
    signals: { '1H': 83, '4H': 87, '1D': 91, '1W': 89 },
    sector: 'tech',
    market: 'japan',
    timestamp: '8 min ago'
  },
  
  // Saudi Arabia 🇸🇦
  {
    ticker: '2222.SR',
    name: 'Saudi Aramco',
    price: 32.15,
    change: 1.85,
    signals: { '1H': 84, '4H': 89, '1D': 91, '1W': 87 },
    sector: 'energy',
    market: 'saudi',
    timestamp: '3 min ago'
  },
  {
    ticker: '2010.SR',
    name: 'SABIC',
    price: 95.40,
    change: 2.30,
    signals: { '1H': 78, '4H': 83, '1D': 86, '1W': 81 },
    sector: 'tech',
    market: 'saudi',
    timestamp: '7 min ago'
  },
  
  // UAE 🇦🇪
  {
    ticker: 'EMAAR.DU',
    name: 'Emaar Properties',
    price: 5.67,
    change: 3.20,
    signals: { '1H': 82, '4H': 87, '1D': 84, '1W': 90 },
    sector: 'finance',
    market: 'uae',
    timestamp: '4 min ago'
  },
  {
    ticker: 'ADNOCDIST.AD',
    name: 'ADNOC Distribution',
    price: 3.89,
    change: 1.75,
    signals: { '1H': 76, '4H': 81, '1D': 88, '1W': 85 },
    sector: 'energy',
    market: 'uae',
    timestamp: '9 min ago'
  },
  
  // Qatar 🇶🇦
  {
    ticker: 'QNBK.QA',
    name: 'Qatar National Bank',
    price: 18.45,
    change: 0.95,
    signals: { '1H': 80, '4H': 85, '1D': 82, '1W': 88 },
    sector: 'finance',
    market: 'qatar',
    timestamp: '6 min ago'
  },
  {
    ticker: 'IQCD.QA',
    name: 'Industries Qatar',
    price: 12.78,
    change: 2.15,
    signals: { '1H': 73, '4H': 79, '1D': 85, '1W': 83 },
    sector: 'tech',
    market: 'qatar',
    timestamp: '11 min ago'
  },
  
  // Kuwait 🇰🇼
  {
    ticker: 'NBK.KW',
    name: 'National Bank of Kuwait',
    price: 1.12,
    change: 1.45,
    signals: { '1H': 77, '4H': 82, '1D': 86, '1W': 84 },
    sector: 'finance',
    market: 'kuwait',
    timestamp: '8 min ago'
  },
  {
    ticker: 'ZAIN.KW',
    name: 'Zain Group',
    price: 0.68,
    change: 2.85,
    signals: { '1H': 71, '4H': 76, '1D': 83, '1W': 79 },
    sector: 'tech',
    market: 'kuwait',
    timestamp: '13 min ago'
  },
  
  // Bahrain 🇧🇭
  {
    ticker: 'AHLI.BH',
    name: 'Ahli United Bank',
    price: 0.142,
    change: 1.20,
    signals: { '1H': 74, '4H': 78, '1D': 81, '1W': 86 },
    sector: 'finance',
    market: 'bahrain',
    timestamp: '10 min ago'
  },
  
  // Oman 🇴🇲
  {
    ticker: 'BKMUSCAT.OM',
    name: 'Bank Muscat',
    price: 0.385,
    change: 0.85,
    signals: { '1H': 72, '4H': 77, '1D': 84, '1W': 80 },
    sector: 'finance',
    market: 'oman',
    timestamp: '14 min ago'
  },
  {
    ticker: 'OMANTEL.OM',
    name: 'Omantel',
    price: 0.428,
    change: 1.95,
    signals: { '1H': 75, '4H': 80, '1D': 87, '1W': 82 },
    sector: 'tech',
    market: 'oman',
    timestamp: '16 min ago'
  },
  
  // Crypto
  {
    ticker: 'BTC',
    name: 'Bitcoin',
    price: 43250.00,
    change: 4.20,
    signals: { '1H': 89, '4H': 93, '1D': 91, '1W': 95 },
    sector: 'crypto',
    market: 'crypto',
    timestamp: '1 min ago'
  },
  {
    ticker: 'ETH',
    name: 'Ethereum',
    price: 2680.50,
    change: 3.85,
    signals: { '1H': 86, '4H': 90, '1D': 88, '1W': 92 },
    sector: 'crypto',
    market: 'crypto',
    timestamp: '1 min ago'
  },
  {
    ticker: 'SOL',
    name: 'Solana',
    price: 98.75,
    change: 7.20,
    signals: { '1H': 83, '4H': 87, '1D': 85, '1W': 89 },
    sector: 'crypto',
    market: 'crypto',
    timestamp: '2 min ago'
  },
  {
    ticker: 'XRP',
    name: 'Ripple',
    price: 0.62,
    change: 2.15,
    signals: { '1H': 79, '4H': 84, '1D': 82, '1W': 86 },
    sector: 'crypto',
    market: 'crypto',
    timestamp: '3 min ago'
  },
  {
    ticker: 'DOGE',
    name: 'Dogecoin',
    price: 0.078,
    change: 5.90,
    signals: { '1H': 75, '4H': 81, '1D': 78, '1W': 83 },
    sector: 'crypto',
    market: 'crypto',
    timestamp: '2 min ago'
  }
];

const SignalHeatmap: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('1D');
  const [scoreThreshold, setScoreThreshold] = useState([70]);
  const [sectorFilter, setSectorFilter] = useState('all');
  const [marketFilter, setMarketFilter] = useState('global');
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const handleViewSignal = (signal: Signal, timeframe: string) => {
    navigate(`/signals/${signal.ticker}`, { 
      state: { 
        selectedStock: signal,
        timeframe: timeframe,
        score: timeframe === 'final' ? 
          Math.round(signal.signals['1H'] * 0.4 + signal.signals['4H'] * 0.3 + signal.signals['1D'] * 0.2 + signal.signals['1W'] * 0.1) :
          signal.signals[timeframe as keyof typeof signal.signals]
      }
    });
  };

  const filteredSignals = mockSignals.filter(signal => {
    const score = signal.signals[timeFilter as keyof typeof signal.signals];
    const meetsThreshold = score >= scoreThreshold[0];
    const meetsSector = sectorFilter === 'all' || signal.sector === sectorFilter;
    const meetsMarket = marketFilter === 'global' || signal.market === marketFilter;
    return meetsThreshold && meetsSector && meetsMarket;
  });

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <CardTitle className="text-lg text-white flex items-center space-x-2">
              <Activity className="h-5 w-5 text-emerald-400" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>{language === 'ar' ? 'خريطة إشارات الشراء الحرارية' : language === 'de' ? 'BUY Signal Heatmap' : 'BUY Signal Heatmap'}</span>
              </div>
            </CardTitle>
            
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <span>{language === 'ar' ? 'آخر تحديث: منذ دقيقتين' : language === 'de' ? 'Zuletzt aktualisiert: vor 2 Min.' : 'Last Updated: 2 min ago'}</span>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs">{language === 'ar' ? 'التحديث التلقائي:' : language === 'de' ? 'Auto-Refresh:' : 'Auto-refresh:'}</span>
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <span className={`text-xs font-medium ${autoRefresh ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {autoRefresh ? (language === 'ar' ? 'مفعل' : language === 'de' ? 'EIN' : 'ON') : (language === 'ar' ? 'مطفأ' : language === 'de' ? 'AUS' : 'OFF')}
                </span>
              </div>
            </div>
          </div>
          
          <SignalFilters
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            scoreThreshold={scoreThreshold}
            setScoreThreshold={setScoreThreshold}
            sectorFilter={sectorFilter}
            setSectorFilter={setSectorFilter}
            marketFilter={marketFilter}
            setMarketFilter={setMarketFilter}
            language={language}
          />
        </div>

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
