import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { useToast } from '../components/ui/use-toast';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Shield, Calculator, Clock, Target, AlertTriangle, CheckCircle, X, Minus } from 'lucide-react';

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
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [customShares, setCustomShares] = useState<number[]>([227]);
  
  // Portfolio settings
  const [portfolioBalance, setPortfolioBalance] = useState<number>(100000);
  const [portfolioInput, setPortfolioInput] = useState<string>('100000');
  const [closeOrderValue, setCloseOrderValue] = useState<string>('');
  const [isClosingOrder, setIsClosingOrder] = useState(false);
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

  const handlePortfolioBalanceChange = (value: string) => {
    setPortfolioInput(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setPortfolioBalance(numValue);
    }
  };

  const handleCancelOrder = () => {
    console.log('Canceling order for:', selectedOrder.symbol);
    toast({
      title: "Order Cancelled",
      description: `Order for ${selectedOrder.symbol} has been cancelled successfully.`,
    });
    // TODO: Connect to backend logic via /src/backend-functions/CancelOrder.ts
    navigate('/signals');
  };

  const handleCloseOrder = () => {
    const closeValue = parseFloat(closeOrderValue);
    if (isNaN(closeValue) || closeValue <= 0) {
      toast({
        title: "Invalid Close Value",
        description: "Please enter a valid closing price.",
        variant: "destructive",
    });
      return;
    }

    console.log('Closing order:', {
      symbol: selectedOrder.symbol,
      shares: recommendedShares,
      closePrice: closeValue,
      originalEntry: selectedOrder.entryPrice
    });

    const profit = (closeValue - selectedOrder.entryPrice) * recommendedShares;
    const newBalance = portfolioBalance + profit;
    setPortfolioBalance(newBalance);
    setPortfolioInput(newBalance.toString());

    toast({
      title: "Order Closed",
      description: `Order for ${selectedOrder.symbol} closed at $${closeValue.toFixed(2)}. ${profit >= 0 ? 'Profit' : 'Loss'}: $${Math.abs(profit).toFixed(2)}`,
    });
    
    // TODO: Connect to backend logic via /src/backend-functions/CloseOrder.ts
    setIsClosingOrder(false);
    setCloseOrderValue('');
  };

  const handleExecuteTrade = () => {
    console.log('Executing safe trade:', {
      symbol: selectedOrder.symbol,
      shares: recommendedShares,
      entryPrice: selectedOrder.entryPrice,
      riskAmount: maxRiskAmount
    });
    toast({
      title: "Trade Executed",
      description: `Safe trade executed for ${recommendedShares} shares of ${selectedOrder.symbol}`,
    });
    // TODO: Connect to backend logic via /src/backend-functions/ExecuteTrade.ts
    
    // Redirect to open positions page to see the new position
    navigate('/open-positions');
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

            {/* Portfolio Balance Input */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                  <span>Portfolio Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="portfolio-balance" className="text-slate-300">
                    Enter Portfolio Balance
                  </Label>
                  <Input
                    id="portfolio-balance"
                    type="number"
                    value={portfolioInput}
                    onChange={(e) => handlePortfolioBalanceChange(e.target.value)}
                    placeholder="100000"
                    min="0"
                    step="1000"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <p className="text-sm text-slate-400">
                    Current balance: ${portfolioBalance.toLocaleString()}
                  </p>
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

            {/* Order Management */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-orange-400" />
                  <span>Order Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    onClick={handleCancelOrder}
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white py-3"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel Order
                  </Button>
                  
                  <AlertDialog open={isClosingOrder} onOpenChange={setIsClosingOrder}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline"
                        className="border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white py-3"
                      >
                        <Minus className="h-4 w-4 mr-2" />
                        Close Order
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-800 border-slate-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Close Order</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-300">
                          Enter the closing price for your {selectedOrder.symbol} position.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="py-4">
                        <Label htmlFor="close-value" className="text-slate-300">
                          Close Order At: $
                        </Label>
                        <Input
                          id="close-value"
                          type="number"
                          value={closeOrderValue}
                          onChange={(e) => setCloseOrderValue(e.target.value)}
                          placeholder={selectedOrder.currentPrice.toFixed(2)}
                          min="0"
                          step="0.01"
                          className="bg-slate-700 border-slate-600 text-white mt-2"
                        />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-700 text-white border-slate-600">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleCloseOrder}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          Close Order
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
