
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ShoppingCart, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface OrderDetails {
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
}

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    
    // Check if we have a selected stock from navigation
    if (location.state?.selectedStock) {
      const stock = location.state.selectedStock;
      const orderDetails: OrderDetails = {
        symbol: stock.symbol,
        entryPrice: stock.price,
        stopLoss: stock.price * 0.95, // 5% below entry
        takeProfit: stock.price * 1.10, // 10% above entry
      };
      setSelectedOrder(orderDetails);
    }
  }, [user, location.state, navigate]);

  if (!user) return null;

  const sampleOrders: OrderDetails[] = [
    { symbol: 'AAPL', entryPrice: 155.88, stopLoss: 155.00, takeProfit: 165.00 },
    { symbol: 'TSLA', entryPrice: 242.18, stopLoss: 230.00, takeProfit: 260.00 },
    { symbol: 'MSFT', entryPrice: 350.25, stopLoss: 340.00, takeProfit: 370.00 },
    { symbol: 'GOOGL', entryPrice: 125.45, stopLoss: 120.00, takeProfit: 135.00 },
  ];

  const handlePlaceOrder = (order: OrderDetails) => {
    console.log('Placing order for:', order);
    // Add order placement logic here
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('orders.title')}
          </h1>
          <p className="text-slate-400">
            {t('orders.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Orders */}
          <div>
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-emerald-400" />
                  <span>{t('orders.available')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleOrders.map((order, index) => (
                    <div 
                      key={index}
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                    >
                      <div>
                        <div className="text-white font-semibold">{order.symbol}</div>
                        <div className="text-slate-400 text-sm">${order.entryPrice.toFixed(2)}</div>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                      >
                        {t('orders.view')}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div>
            {selectedOrder ? (
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    {t('orders.details')} - {selectedOrder.symbol}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-emerald-400" />
                        <span className="text-slate-300">{t('orders.entryPrice')}</span>
                      </div>
                      <span className="text-white font-semibold">${selectedOrder.entryPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-4 w-4 text-red-400" />
                        <span className="text-slate-300">{t('orders.stopLoss')}</span>
                      </div>
                      <span className="text-red-400 font-semibold">${selectedOrder.stopLoss.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                        <span className="text-slate-300">{t('orders.takeProfit')}</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">${selectedOrder.takeProfit.toFixed(2)}</span>
                    </div>
                    
                    {/* Risk Management Warning */}
                    <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-3 mt-4 mb-4">
                      <p className="text-amber-400 text-sm font-bold text-center">
                        ⚠️ Don't risk more than 2% of your allocated capital.
                      </p>
                    </div>
                    
                    <Button 
                      onClick={() => handlePlaceOrder(selectedOrder)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
                    >
                      {t('orders.placeOrder')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-slate-400">{t('orders.selectOrder')}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
