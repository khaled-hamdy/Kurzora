
import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Signals',
      value: '56',
      icon: BarChart3,
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Success Rate',
      value: '84.2%',
      icon: TrendingUp,
      change: '+2.1%',
      changeType: 'positive'
    },
    {
      title: 'Pending Issues',
      value: '3',
      icon: AlertTriangle,
      change: '-2',
      changeType: 'negative'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Overview of platform performance and statistics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-slate-300">New user registered: john@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-300">Signal created: EUR/USD Long</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-slate-300">System maintenance completed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors">
                  Create Signal
                </button>
                <button className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors">
                  Add User
                </button>
                <button className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors">
                  View Reports
                </button>
                <button className="p-3 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm font-medium transition-colors">
                  System Settings
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
