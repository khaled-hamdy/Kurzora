
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, DollarSign } from 'lucide-react';

const performanceData = [
  { date: '2024-01', portfolio: 10000, benchmark: 10000 },
  { date: '2024-02', portfolio: 12500, benchmark: 10300 },
  { date: '2024-03', portfolio: 11800, benchmark: 9800 },
  { date: '2024-04', portfolio: 15200, benchmark: 10500 },
  { date: '2024-05', portfolio: 18900, benchmark: 11200 },
  { date: '2024-06', portfolio: 22100, benchmark: 10800 },
  { date: '2024-07', portfolio: 25600, benchmark: 11500 },
  { date: '2024-08', portfolio: 24800, benchmark: 11000 },
  { date: '2024-09', portfolio: 28300, benchmark: 11800 },
  { date: '2024-10', portfolio: 31200, benchmark: 12200 },
  { date: '2024-11', portfolio: 35400, benchmark: 12500 },
  { date: '2024-12', portfolio: 38700, benchmark: 12800 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const portfolioValue = payload[0].value;
    const benchmarkValue = payload[1].value;
    const outperformance = ((portfolioValue - benchmarkValue) / benchmarkValue * 100).toFixed(1);
    
    return (
      <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-3 shadow-lg">
        <p className="text-slate-300 text-sm mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <span className="text-white text-sm">Portfolio: ${portfolioValue.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
            <span className="text-white text-sm">S&P 500: ${benchmarkValue.toLocaleString()}</span>
          </div>
          <div className="text-emerald-300 text-xs mt-2">
            Outperformance: +{outperformance}%
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const PerformanceChart: React.FC = () => {
  const currentValue = performanceData[performanceData.length - 1].portfolio;
  const initialValue = performanceData[0].portfolio;
  const totalReturn = ((currentValue - initialValue) / initialValue * 100).toFixed(1);
  
  const benchmarkCurrent = performanceData[performanceData.length - 1].benchmark;
  const benchmarkInitial = performanceData[0].benchmark;
  const benchmarkReturn = ((benchmarkCurrent - benchmarkInitial) / benchmarkInitial * 100).toFixed(1);

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            <span>Portfolio Performance</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">+{totalReturn}%</div>
            <div className="text-xs text-slate-400">vs S&P 500: +{benchmarkReturn}%</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(52 211 153)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="rgb(52 211 153)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(148 163 184)" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="rgb(148 163 184)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(71 85 105)" />
              <XAxis 
                dataKey="date" 
                stroke="rgb(148 163 184)"
                fontSize={12}
                tickFormatter={(value) => value.slice(-2)}
              />
              <YAxis 
                stroke="rgb(148 163 184)"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="rgb(148 163 184)"
                strokeWidth={2}
                fill="url(#benchmarkGradient)"
                name="S&P 500"
              />
              <Area
                type="monotone"
                dataKey="portfolio"
                stroke="rgb(52 211 153)"
                strokeWidth={3}
                fill="url(#portfolioGradient)"
                name="Your Portfolio"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-700">
          <div className="text-center">
            <div className="text-emerald-400 text-xl font-bold">${currentValue.toLocaleString()}</div>
            <div className="text-slate-400 text-sm">Current Value</div>
          </div>
          <div className="text-center">
            <div className="text-emerald-400 text-xl font-bold">+${(currentValue - initialValue).toLocaleString()}</div>
            <div className="text-slate-400 text-sm">Total Gain</div>
          </div>
          <div className="text-center">
            <div className="text-emerald-400 text-xl font-bold">+{((currentValue - benchmarkCurrent) / benchmarkCurrent * 100).toFixed(1)}%</div>
            <div className="text-slate-400 text-sm">vs Benchmark</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
