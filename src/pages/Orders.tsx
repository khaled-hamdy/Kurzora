
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Shield, Calculator, Clock, Target, AlertTriangle, CheckCircle } from 'lucide-react';

interface OrderDetails {
  symbol: string;
  name: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  currentPrice: number;
  change: number;
  signalScore: number;
  signalDate: string;
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [customShares, setCustomShares] = useState<number[]>([227]);
  
  // Portfolio settings
  const portfolioBalance = 100000;
  const maxRiskPercent = 2;

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    
    // Check if we have a selected stock from navigation
    if (location.state?.selectedStock) {
      const stock = location.state.selectedStock;
      const orderDetails: OrderDetails = {
        symbol: stock.symbol,
        name: stock.name || `${stock.symbol} Inc.`,
        entryPrice: 160.02,
        stopLoss: 151.21,
        takeProfit: 175.50,
        currentPrice: stock.price || 185.23,
        change: stock.change || 2.45,
        signalScore: stock.signalScore || 88,
        signalDate: '6/10/2025 1:07 AM'
      };
      setSelectedOrder(orderDetails);
    } else {
      // Default AAPL example
      const defaultOrder: OrderDetails = {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        entryPrice: 160.02,
        stopLoss: 151.21,
        takeProfit: 175.50,
        currentPrice: 185.23,
        change: 2.45,
        signalScore: 88,
        signalDate: '6/10/2025 1:07 AM'
      };
      setSelectedOrder(defaultOrder);
    }
  }, [user, location.state, navigate]);

  if (!user || !selectedOrder) return null;

  // Risk calculations
  const riskPerShare = selectedOrder.entryPrice - selectedOrder.stopLoss;
  const maxRiskAmount = portfolioBalance * (maxRiskPercent / 100);
  const recommendedShares = Math.floor(maxRiskAmount / riskPerShare);
  const totalInvestment = recommendedShares * selectedOrder.entryPrice;
  const gainPotential = ((selectedOrder.takeProfit - selectedOrder.entryPrice) / selectedOrder.entryPrice) * 100;
  const riskPercentage = (riskPerShare / selectedOrder.entryPrice) * 100;
  const riskRewardRatio = (selectedOrder.takeProfit - selectedOrder.entryPrice) / riskPerShare;
  const potentialProfit = recommendedShares * (selectedOrder.takeProfit - selectedOrder.entryPrice);

  // Custom position calculations
  const currentShares = customShares[0];
  const customRiskAmount = currentShares * riskPerShare;
  const customRiskPercent = (customRiskAmount / portfolioBalance) * 100;
  const isCustomSafe = customRiskPercent <= maxRiskPercent;
  const customInvestment = currentShares * selectedOrder.entryPrice;

  const handleBackToSignals = () => {
    navigate('/signals');
  };

  const handleExecuteTrade = () => {
    console.log('Executing safe trade:', {
      symbol: selectedOrder.symbol,
      shares: recommendedShares,
      entryPrice: selectedOrder.entryPrice,
      riskAmount: maxRiskAmount
    });
    // TODO: Connect to backend logic via /src/backend-functions/ExecuteTrade.ts
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToSignals}
            className="mb-4 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Signals
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {selectedOrder.symbol} - {selectedOrder.name}
                </h1>
                <Badge className="bg-emerald-600 text-white px-3 py-1">
                  {selectedOrder.signalScore}/100
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-semibold text-white">
                  ${selectedOrder.currentPrice.toFixed(2)}
                </span>
                <span className={`text-lg ${selectedOrder.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  ({selectedOrder.change >= 0 ? '+' : ''}{selectedOrder.change}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Trade Setup */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trade Details */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center space-x-2">
                  <Target className="h-5 w-5 text-emerald-400" />
                  <span>Trade Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Entry Price</span>
                    <span className="text-white font-semibold">${selectedOrder.entryPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-emerald-500/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-slate-300">Take Profit</span>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-semibold">${selectedOrder.takeProfit.toFixed(2)}</div>
                      <div className="text-emerald-400 text-sm">+{gainPotential.toFixed(1)}% gain</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-red-400" />
                      <span className="text-slate-300">Stop Loss</span>
                    </div>
                    <div className="text-right">
                      <div className="text-red-400 font-semibold">${selectedOrder.stopLoss.toFixed(2)}</div>
                      <div className="text-red-400 text-sm">-{riskPercentage.toFixed(1)}% risk</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Risk/Reward Ratio</span>
                    <span className="text-white font-semibold">1:{riskRewardRatio.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Position Sizing */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-blue-400" />
                  <span>Smart Position Sizing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">Portfolio Balance</div>
                      <div className="text-white font-semibold">${portfolioBalance.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">Maximum Risk (2%)</div>
                      <div className="text-white font-semibold">${maxRiskAmount.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">Risk Per Share</div>
                      <div className="text-white font-semibold">${riskPerShare.toFixed(2)}</div>
                    </div>
                    <div className="p-3 bg-emerald-500/20 rounded-lg">
                      <div className="text-slate-400 text-sm">Recommended Shares</div>
                      <div className="text-emerald-400 font-bold text-lg">{recommendedShares} shares</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">Total Investment</div>
                      <div className="text-white font-semibold">${totalInvestment.toLocaleString()}</div>
                    </div>
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-slate-400 text-sm">Risk Amount</div>
                      <div className="text-white font-semibold">${maxRiskAmount.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Alert Box */}
            <Alert className="bg-emerald-500/20 border-emerald-500/50">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <AlertDescription className="text-emerald-400 font-medium">
                ✅ Position size follows 2% risk rule
                <div className="text-emerald-300 text-sm mt-1">
                  Calculation: ${maxRiskAmount.toLocaleString()} ÷ ${riskPerShare.toFixed(2)} = {recommendedShares} shares
                </div>
              </AlertDescription>
            </Alert>

            {/* Manual Override Section */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-yellow-400" />
                  <span>Custom Position Size</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-300">Shares: {currentShares}</span>
                      <span className="text-slate-300">Investment: ${customInvestment.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={customShares}
                      onValueChange={setCustomShares}
                      max={1000}
                      min={50}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  {!isCustomSafe && (
                    <Alert className="bg-red-500/20 border-red-500/50">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-400 font-medium">
                        ⚠️ WARNING: This position risks more than 2% of your capital
                        <div className="text-red-300 text-sm mt-1">
                          Recommended: {recommendedShares} shares | Your selection: {currentShares} shares ({customRiskPercent.toFixed(1)}% risk)
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Quick Info */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Quick Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="text-slate-400 text-sm">Signal Generated</div>
                      <div className="text-white font-medium">{selectedOrder.signalDate}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="text-slate-400 text-sm">Expected Hold Time</div>
                      <div className="text-white font-medium">1-3 days</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="text-slate-400 text-sm">Risk Level</div>
                      <div className="text-emerald-400 font-medium">Low (2% max)</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <div>
                      <div className="text-slate-400 text-sm">Potential Profit</div>
                      <div className="text-emerald-400 font-bold">${potentialProfit.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleExecuteTrade}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 text-lg"
              >
                Execute Safe Trade ({recommendedShares} shares)
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white py-3"
              >
                Set Price Alert
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-slate-600 text-slate-400 hover:bg-slate-600 hover:text-white py-3"
              >
                Add to Watchlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
