
import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';

const AdminSignals: React.FC = () => {
  const signals = [
    {
      id: '1',
      symbol: 'EUR/USD',
      type: 'Long',
      status: 'active',
      entryPrice: '1.0950',
      currentPrice: '1.0975',
      pnl: '+2.3%',
      createdAt: '2024-06-10 14:30'
    },
    {
      id: '2',
      symbol: 'GBP/JPY',
      type: 'Short',
      status: 'closed',
      entryPrice: '189.45',
      currentPrice: '188.20',
      pnl: '+0.65%',
      createdAt: '2024-06-10 12:15'
    },
    {
      id: '3',
      symbol: 'USD/CHF',
      type: 'Long',
      status: 'pending',
      entryPrice: '0.8920',
      currentPrice: '0.8915',
      pnl: '-0.05%',
      createdAt: '2024-06-10 16:45'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Signal Management</h1>
            <p className="text-slate-400">Create and manage trading signals</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Signal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-300">Active Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24</div>
              <p className="text-xs text-green-400">+3 from yesterday</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-300">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">84.2%</div>
              <p className="text-xs text-green-400">+2.1% this week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-slate-300">Total P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+12.8%</div>
              <p className="text-xs text-green-400">+0.5% today</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Symbol</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Entry Price</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Current Price</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">P&L</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Created</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {signals.map((signal) => (
                    <tr key={signal.id} className="border-b border-slate-700/50">
                      <td className="py-3 px-4 text-white font-medium">{signal.symbol}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {signal.type === 'Long' ? (
                            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                          )}
                          <span className="text-slate-300">{signal.type}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={
                            signal.status === 'active' ? 'default' : 
                            signal.status === 'closed' ? 'secondary' : 'outline'
                          }
                        >
                          {signal.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{signal.entryPrice}</td>
                      <td className="py-3 px-4 text-slate-300">{signal.currentPrice}</td>
                      <td className="py-3 px-4">
                        <span className={signal.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                          {signal.pnl}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 text-sm">{signal.createdAt}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-600 text-red-400">
                            Close
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminSignals;
