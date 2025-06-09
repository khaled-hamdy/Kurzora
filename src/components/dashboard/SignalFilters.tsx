
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

      {/* Market Filter */}
      <Select value={marketFilter} onValueChange={setMarketFilter}>
        <SelectTrigger className="w-36 bg-slate-700 border-slate-600 text-white">
          <Globe className="h-4 w-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-700 border-slate-600">
          <SelectItem value="global">🌐 Global</SelectItem>
          <SelectItem value="usa">🇺🇸 USA</SelectItem>
          <SelectItem value="saudi">🇸🇦 Saudi Arabia</SelectItem>
          <SelectItem value="uae">🇦🇪 UAE</SelectItem>
          <SelectItem value="qatar">🇶🇦 Qatar</SelectItem>
          <SelectItem value="kuwait">🇰🇼 Kuwait</SelectItem>
          <SelectItem value="bahrain">🇧🇭 Bahrain</SelectItem>
          <SelectItem value="oman">🇴🇲 Oman</SelectItem>
          <SelectItem value="crypto">₿ Crypto</SelectItem>
        </SelectContent>
      </Select>

      {/* Sector Filter */}
      <Select value={sectorFilter} onValueChange={setSectorFilter}>
        <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-700 border-slate-600">
          <SelectItem value="all">{language === 'ar' ? 'جميع القطاعات' : language === 'de' ? 'Alle Sektoren' : 'All Sectors'}</SelectItem>
          <SelectItem value="tech">{language === 'ar' ? 'التكنولوجيا' : language === 'de' ? 'Technologie' : 'Tech'}</SelectItem>
          <SelectItem value="finance">{language === 'ar' ? 'المالية' : language === 'de' ? 'Finanzen' : 'Finance'}</SelectItem>
          <SelectItem value="healthcare">{language === 'ar' ? 'الرعاية الصحية' : language === 'de' ? 'Gesundheitswesen' : 'Healthcare'}</SelectItem>
          <SelectItem value="energy">{language === 'ar' ? 'الطاقة' : language === 'de' ? 'Energie' : 'Energy'}</SelectItem>
          <SelectItem value="crypto">{language === 'ar' ? 'العملات المشفرة' : language === 'de' ? 'Kryptowährung' : 'Crypto'}</SelectItem>
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
  );
};

export default SignalFilters;
