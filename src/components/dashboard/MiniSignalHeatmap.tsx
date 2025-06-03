
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Activity } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Signal {
  '1H': number;
  '4H': number;
  '1D': number;
  '1W': number;
}

interface MiniSignalHeatmapProps {
  stockSymbol: string;
  signals: Signal;
  selectedTimeframe?: string;
}

const MiniSignalHeatmap: React.FC<MiniSignalHeatmapProps> = ({
  stockSymbol,
  signals,
  selectedTimeframe
}) => {
  const timeframes = ['1H', '4H', '1D', '1W'] as const;

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

  const getSignalCategory = (score: number) => {
    if (score >= 90) return 'Strong';
    if (score >= 80) return 'Valid';
    if (score >= 70) return 'Weak';
    return 'Below Threshold';
  };

  const getTooltipText = (timeframe: string, score: number) => {
    return `${stockSymbol} ${timeframe}: ${score}% confidence\nCategory: ${getSignalCategory(score)}\nClick to analyze this timeframe`;
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-white flex items-center space-x-2">
          <Activity className="h-4 w-4 text-emerald-400" />
          <span>{stockSymbol} Multi-Timeframe Signals</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Signal Row */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {timeframes.map(tf => {
            const score = signals[tf];
            const isSelected = tf === selectedTimeframe;
            return (
              <TooltipProvider key={tf}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className={`
                        px-3 py-2 rounded text-xs font-bold text-center cursor-pointer
                        transition-all duration-200 hover:scale-105 transform hover:shadow-lg
                        ${getSignalColor(score)}
                        ${isSelected ? 'ring-2 ring-emerald-400 ring-opacity-75' : ''}
                      `}
                      style={getSignalBackgroundColor(score)}
                    >
                      <div className="text-xs font-medium opacity-80">{tf}</div>
                      <div className="text-sm font-bold">
                        {getSignalIcon(score)} {score}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="whitespace-pre-line">{getTooltipText(tf, score)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(118, 95.3%, 49.8%)' }}></div>
            <span className="text-slate-300">Strong (90-100)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: 'hsl(208, 77.3%, 72.4%)' }}></div>
            <span className="text-slate-300">Valid (80-89)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#F1C40F' }}></div>
            <span className="text-slate-300">Weak (70-79)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded bg-gray-600"></div>
            <span className="text-slate-300">Below (0-69)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniSignalHeatmap;
