
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { DollarSign } from 'lucide-react';

const PortfolioPerformanceChart: React.FC = () => {
  // Mock data for portfolio performance vs S&P 500
  const data = [
    { month: '01', portfolio: 10000, sp500: 10000 },
    { month: '02', portfolio: 11200, sp500: 10150 },
    { month: '03', portfolio: 12800, sp500: 10300 },
    { month: '04', portfolio: 15200, sp500: 10450 },
    { month: '05', portfolio: 18600, sp500: 10600 },
    { month: '06', portfolio: 22400, sp500: 10750 },
    { month: '07', portfolio: 25100, sp500: 10900 },
    { month: '08', portfolio: 28900, sp500: 11050 },
    { month: '09', portfolio: 32200, sp500: 11200 },
    { month: '10', portfolio: 35800, sp500: 11350 },
    { month: '11', portfolio: 38200, sp500: 11500 },
    { month: '12', portfolio: 38734, sp500: 11280 },
  ];

  const chartConfig = {
    portfolio: {
      label: "Portfolio",
      color: "#10b981",
    },
    sp500: {
      label: "S&P 500",
      color: "#6b7280",
    },
  };

  const currentValue = data[data.length - 1].portfolio;
  const initialValue = data[0].portfolio;
  const portfolioReturn = ((currentValue - initialValue) / initialValue) * 100;
  const sp500Return = ((data[data.length - 1].sp500 - data[0].sp500) / data[0].sp500) * 100;

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-white flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-emerald-400" />
            <span>Portfolio Performance</span>
          </CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">+{portfolioReturn.toFixed(1)}%</div>
            <div className="text-sm text-slate-400">vs S&P 500: +{sp500Return.toFixed(1)}%</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip 
                content={<ChartTooltipContent 
                  formatter={(value, name) => [
                    `$${Number(value).toLocaleString()}`,
                    name === 'portfolio' ? 'Portfolio' : 'S&P 500'
                  ]}
                  labelFormatter={(label) => `Month ${label}`}
                />} 
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="var(--color-portfolio)"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, stroke: "var(--color-portfolio)", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="sp500"
                stroke="var(--color-sp500)"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
                activeDot={{ r: 4, stroke: "var(--color-sp500)", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <div className="flex justify-between items-center mt-4 text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-emerald-500"></div>
              <span className="text-slate-300">Portfolio</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-0.5 bg-slate-500" style={{ borderTop: '1px dashed #6b7280' }}></div>
              <span className="text-slate-300">S&P 500</span>
            </div>
          </div>
          <div className="text-slate-400">
            Last Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioPerformanceChart;
