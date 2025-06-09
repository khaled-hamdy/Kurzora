
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Filter, RotateCcw } from 'lucide-react';

interface SignalFiltersProps {
  scoreRange: number[];
  setScoreRange: (value: number[]) => void;
  sectorFilter: string;
  setSectorFilter: (value: string) => void;
  marketCapFilter: string;
  setMarketCapFilter: (value: string) => void;
  onReset: () => void;
}

const SignalFilters: React.FC<SignalFiltersProps> = ({
  scoreRange,
  setScoreRange,
  sectorFilter,
  setSectorFilter,
  marketCapFilter,
  setMarketCapFilter,
  onReset
}) => {
  return (
    <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 sticky top-8">
      <CardHeader>
        <CardTitle className="text-lg text-white flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-400" />
          <span>Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Range */}
        <div className="space-y-3">
          <Label className="text-slate-300 font-medium">
            Signal Score Range: {scoreRange[0]} - {scoreRange[1]}
          </Label>
          <Slider
            value={scoreRange}
            onValueChange={setScoreRange}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>0 (Weak)</span>
            <span>100 (Strong)</span>
          </div>
        </div>

        {/* Sector Filter */}
        <div className="space-y-3">
          <Label className="text-slate-300 font-medium">Sector</Label>
          <Select value={sectorFilter} onValueChange={setSectorFilter}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Energy">Energy</SelectItem>
              <SelectItem value="Consumer">Consumer</SelectItem>
              <SelectItem value="Industrial">Industrial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Market Cap Filter */}
        <div className="space-y-3">
          <Label className="text-slate-300 font-medium">Market Cap</Label>
          <Select value={marketCapFilter} onValueChange={setMarketCapFilter}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
              <SelectValue placeholder="All Market Caps" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Market Caps</SelectItem>
              <SelectItem value="Large">Large Cap ($10B+)</SelectItem>
              <SelectItem value="Mid">Mid Cap ($2B-$10B)</SelectItem>
              <SelectItem value="Small">Small Cap ($300M-$2B)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <Button
          onClick={onReset}
          variant="outline"
          className="w-full bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignalFilters;
