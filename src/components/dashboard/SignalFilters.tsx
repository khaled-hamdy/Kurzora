
import React from 'react';
import { Filter, Calendar, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

interface SignalFiltersProps {
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  scoreThreshold: number[];
  setScoreThreshold: (value: number[]) => void;
  sectorFilter: string;
  setSectorFilter: (value: string) => void;
  marketFilter: string;
  setMarketFilter: (value: string) => void;
  language: string;
}

const SignalFilters: React.FC<SignalFiltersProps> = ({
  timeFilter,
  setTimeFilter,
  scoreThreshold,
  setScoreThreshold,
  sectorFilter,
  setSectorFilter,
  marketFilter,
  setMarketFilter,
  language
}) => {
  const timeframes = ['1H', '4H', '1D', '1W'];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Score Threshold */}
      <div className="flex items-center space-x-3 min-w-[240px]">
        <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
        <Label className="text-slate-300 text-sm whitespace-nowrap font-medium">
          {language === 'ar' ? `الحد الأدنى: ${scoreThreshold[0]}%` : 
           language === 'de' ? `Min Score: ${scoreThreshold[0]}%` : 
           `Min Score: ${scoreThreshold[0]}%`}
        </Label>
        <div className="flex-1 min-w-[140px]">
          <Slider
            value={scoreThreshold}
            onValueChange={setScoreThreshold}
            max={100}
            min={60}
            step={5}
            className="w-full [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-emerald-500 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-lg [&_.slider-track]:h-3 [&_.slider-range]:h-3 [&_.slider-range]:bg-emerald-500"
          />
        </div>
      </div>

      {/* Market Filter */}
      <Select value={marketFilter} onValueChange={setMarketFilter}>
        <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white hover:bg-slate-600 focus:ring-2 focus:ring-emerald-400 transition-all duration-200 rounded-lg shadow-lg">
          <Globe className="h-4 w-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-700 border-slate-600 rounded-lg shadow-xl z-50">
          <SelectItem value="global" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">🌐 Global</SelectItem>
          <SelectItem value="usa" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">🇺🇸 USA</SelectItem>
          <SelectItem value="saudi" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">🇸🇦 Saudi Arabia</SelectItem>
          <SelectItem value="uae" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">🇦🇪 UAE</SelectItem>
          <SelectItem value="qatar" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">🇶🇦 Qatar</SelectItem>
          <SelectItem value="kuwait" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">🇰🇼 Kuwait</SelectItem>
          <SelectItem value="bahrain" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">🇧🇭 Bahrain</SelectItem>
          <SelectItem value="oman" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">🇴🇲 Oman</SelectItem>
          <SelectItem value="crypto" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">₿ Crypto</SelectItem>
        </SelectContent>
      </Select>

      {/* Sector Filter */}
      <Select value={sectorFilter} onValueChange={setSectorFilter}>
        <SelectTrigger className="w-36 bg-slate-700 border-slate-600 text-white hover:bg-slate-600 focus:ring-2 focus:ring-emerald-400 transition-all duration-200 rounded-lg shadow-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-700 border-slate-600 rounded-lg shadow-xl z-50">
          <SelectItem value="all" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">{language === 'ar' ? 'جميع القطاعات' : language === 'de' ? 'Alle Sektoren' : 'All Sectors'}</SelectItem>
          <SelectItem value="tech" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">{language === 'ar' ? 'التكنولوجيا' : language === 'de' ? 'Technologie' : 'Tech'}</SelectItem>
          <SelectItem value="finance" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">{language === 'ar' ? 'المالية' : language === 'de' ? 'Finanzen' : 'Finance'}</SelectItem>
          <SelectItem value="healthcare" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">{language === 'ar' ? 'الرعاية الصحية' : language === 'de' ? 'Gesundheitswesen' : 'Healthcare'}</SelectItem>
          <SelectItem value="energy" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">{language === 'ar' ? 'الطاقة' : language === 'de' ? 'Energie' : 'Energy'}</SelectItem>
          <SelectItem value="crypto" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">{language === 'ar' ? 'العملات المشفرة' : language === 'de' ? 'Kryptowährung' : 'Crypto'}</SelectItem>
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
            className={`text-xs transition-all duration-200 rounded-lg shadow-md hover:shadow-lg ${
              timeFilter === period 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-400/25' 
                : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
          >
            {period}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SignalFilters;
