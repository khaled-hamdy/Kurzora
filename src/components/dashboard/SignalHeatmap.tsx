
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import SignalFilters from './SignalFilters';
import SignalLegend from './SignalLegend';
import SignalTable from './SignalTable';
import SignalSummaryStats from './SignalSummaryStats';
import SignalHeatmapHeader from './SignalHeatmapHeader';
import { mockSignals } from '../../data/mockSignals';
import { filterSignals, calculateFinalScore } from '../../utils/signalCalculations';
import { Signal } from '../../types/signal';

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
    navigate('/orders', { 
      state: { 
        selectedStock: {
          symbol: signal.ticker,
          name: signal.name,
          price: signal.price,
          change: signal.change,
          signalScore: timeframe === 'final' ? 
            calculateFinalScore(signal.signals) :
            signal.signals[timeframe as keyof typeof signal.signals]
        }
      }
    });
  };

  const filteredSignals = filterSignals(
    mockSignals,
    timeFilter,
    scoreThreshold,
    sectorFilter,
    marketFilter
  );

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader>
        <CardTitle>
          <SignalHeatmapHeader
            language={language}
            autoRefresh={autoRefresh}
            setAutoRefresh={setAutoRefresh}
          />
        </CardTitle>

        <SignalLegend language={language} />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Filter Bar */}
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
