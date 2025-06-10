
import React, { useEffect, useState } from 'react';
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
import { TrendingUp, DollarSign, Target, Shield, Settings, AlertTriangle, X, Clock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Orders: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [portfolioBalance, setPortfolioBalance] = useState(8000);
  const [customShares, setCustomShares] = useState([18]);
  
  // Trading parameters
  const riskPercentage = 2;
  const sharePrice = 8.81;
  const maxRisk = (portfolioBalance * riskPercentage) / 100;
  const recommendedShares = Math.floor(maxRisk / sharePrice);
  const customShareCount = customShares[0];
  const customInvestment = customShareCount * sharePrice;
  const customRiskPercentage = (customInvestment / portfolioBalance) * 100;

  useEffect(() => {
    console.log('Orders page: Auth state - loading:', loading, 'user:', user);
    
    if (!loading && !user) {
      console.log('Orders page: User not authenticated, redirecting to home');
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleExecuteTrade = () => {
    // TODO: Connect to backend logic via /src/backend-functions/ExecuteTrade.ts
    
    toast({
      title: "Trade Executed Successfully!",
      description: `EURUSD position opened with ${recommendedShares} shares`,
    });

    // Navigate to open positions page
    navigate('/open-positions');
  };

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
              </CardContent>
            </Card>

            {/* Portfolio Settings Card */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Portfolio Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-slate-400 mb-2 block">Enter Portfolio Balance</Label>
                  <Input
                    type="number"
                    value={portfolioBalance}
                    onChange={(e) => setPortfolioBalance(Number(e.target.value))}
                    className="bg-slate-700 border-slate-600 text-white text-lg"
                  />
                  <p className="text-slate-400 text-sm mt-1">
                    Current balance: ${portfolioBalance.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Smart Position Sizing Card */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Smart Position Sizing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-400">Portfolio Balance</Label>
                    <div className="text-xl font-bold text-white">${portfolioBalance.toLocaleString()}</div>
                  </div>
                  <div>
                    <Label className="text-slate-400">Maximum Risk (2%)</Label>
                    <div className="text-xl font-bold text-white">${maxRisk.toFixed(0)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-400">Risk Per Share</Label>
                    <div className="text-xl font-bold text-white">${sharePrice}</div>
                  </div>
                  <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                    <Label className="text-emerald-400">Recommended Shares</Label>
                    <div className="text-xl font-bold text-emerald-400">{recommendedShares} shares</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-400">Total Investment</Label>
                    <div className="text-xl font-bold text-white">${(recommendedShares * sharePrice).toLocaleString()}</div>
                  </div>
                  <div>
                    <Label className="text-slate-400">Risk Amount</Label>
                    <div className="text-xl font-bold text-white">${maxRisk.toFixed(0)}</div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-emerald-400 font-medium">Position size follows 2% risk rule</span>
                  </div>
                  <p className="text-slate-300">
                    Calculation: ${maxRisk.toFixed(0)} ÷ ${sharePrice} = {recommendedShares} shares
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Custom Position Size Card */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Custom Position Size
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400">Shares: {customShareCount}</span>
                  <span className="text-slate-400">Investment: ${customInvestment.toLocaleString()}</span>
                </div>

                <Slider
                  value={customShares}
                  onValueChange={setCustomShares}
                  max={1000}
                  min={1}
                  step={1}
                  className="w-full"
                />

                {customRiskPercentage > 2 && (
                  <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="text-red-400 font-medium">WARNING: This position risks more than 2% of your capital</span>
                    </div>
                    <p className="text-slate-300">
                      Recommended: {recommendedShares} shares | Your selection: {customShareCount} shares ({customRiskPercentage.toFixed(1)}% risk)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Management Card */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Order Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel Order
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/50"
                  >
                    Close Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <div className="text-slate-400 text-sm">Signal Generated</div>
                    <div className="text-white text-lg font-semibold">6/10/2025 1:07 AM</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <div className="text-slate-400 text-sm">Risk Level</div>
                    <div className="text-emerald-400 text-lg font-semibold">Low (2% max)</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-slate-400 mt-1" />
                  <div>
                    <div className="text-slate-400 text-sm">Potential Profit</div>
                    <div className="text-emerald-400 text-lg font-semibold">$70,279.2</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Execute Trade Button */}
            <Button 
              onClick={handleExecuteTrade}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold"
            >
              Execute Trade ({recommendedShares} shares)
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
