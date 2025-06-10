
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Switch } from '../components/ui/switch';
import { TrendingUp, TrendingDown, DollarSign, Target, Shield, Settings } from 'lucide-react';

const Orders: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Orders page: Auth state - loading:', loading, 'user:', user);
    
    if (!loading && !user) {
      console.log('Orders page: User not authenticated, redirecting to home');
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Signal Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-white">EURUSD</h1>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                BUY SIGNAL
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
              <span className="text-2xl font-bold text-emerald-400">1.0542</span>
            </div>
          </div>
          <p className="text-slate-400">Active trading signal with automated risk management</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Signal Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trade Details Card */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Trade Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-400">Entry Price</Label>
                    <div className="text-2xl font-bold text-white">1.0520</div>
                  </div>
                  <div>
                    <Label className="text-slate-400">Current Price</Label>
                    <div className="text-2xl font-bold text-emerald-400">1.0542</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-400">Take Profit</Label>
                    <div className="text-xl font-semibold text-emerald-400">1.0580</div>
                  </div>
                  <div>
                    <Label className="text-slate-400">Stop Loss</Label>
                    <div className="text-xl font-semibold text-red-400">1.0480</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                  <div className="text-center">
                    <div className="text-slate-400 text-sm">P&L</div>
                    <div className="text-emerald-400 font-bold">+$220</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400 text-sm">Risk/Reward</div>
                    <div className="text-white font-bold">1:1.5</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400 text-sm">Duration</div>
                    <div className="text-white font-bold">2h 15m</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Settings Card */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Portfolio Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-400">Account Balance</Label>
                    <Input
                      type="number"
                      defaultValue="10000"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400">Risk per Trade (%)</Label>
                    <Input
                      type="number"
                      defaultValue="2"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-slate-400 mb-3 block">Risk Level</Label>
                  <Slider
                    defaultValue={[30]}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-2">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Smart Position Sizing */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Smart Position Sizing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-blue-400 text-sm mb-1">Recommended Position</div>
                  <div className="text-2xl font-bold text-white">10,000 units</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk Amount</span>
                    <span className="text-white">$200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Potential Profit</span>
                    <span className="text-emerald-400">$300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Win Rate Required</span>
                    <span className="text-white">40%</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-slate-400">Auto Position Sizing</Label>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-slate-400">Risk Management</Label>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Execute Trade
                </Button>
              </CardContent>
            </Card>

            {/* Risk Management Card */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Risk Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-400">Trailing Stop</Label>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label className="text-slate-400">Break Even</Label>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-slate-400">Partial Close</Label>
                  <Switch />
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <Label className="text-slate-400 mb-2 block">Max Daily Loss</Label>
                  <Input
                    type="number"
                    defaultValue="500"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
