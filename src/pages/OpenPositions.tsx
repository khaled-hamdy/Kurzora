import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Eye,
  X,
  BarChart3,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import PositionCloseDialog from '../components/orders/PositionCloseDialog';

interface Position {
  id: string;
  symbol: string;
  name: string;
  entryPrice: number;
  currentPrice: number;
  shares: number;
  entryDate: string;
  signalScore: number;
}

interface ClosedPosition {
  id: string;
  symbol: string;
  name: string;
  entryPrice: number;
  exitPrice: number;
  shares: number;
  pnl: number;
  pnlPercent: number;
  closedDate: string;
}

const OpenPositions: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [showAllHistory, setShowAllHistory] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  // Mock data for open positions
  const [openPositions, setOpenPositions] = useState<Position[]>([
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      entryPrice: 160.02,
      currentPrice: 165.20,
      shares: 227,
      entryDate: '2025-06-08',
      signalScore: 88
    },
    {
      id: '2',
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      entryPrice: 750.12,
      currentPrice: 748.30,
      shares: 45,
      entryDate: '2025-06-07',
      signalScore: 92
    },
    {
      id: '3',
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      entryPrice: 412.45,
      currentPrice: 419.80,
      shares: 120,
      entryDate: '2025-06-06',
      signalScore: 85
    }
  ]);

  // Mock data for closed positions
  const [closedPositions, setClosedPositions] = useState<ClosedPosition[]>([
    {
      id: '4',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      entryPrice: 225.50,
      exitPrice: 245.80,
      shares: 50,
      pnl: 1015,
      pnlPercent: 9.0,
      closedDate: '2025-06-05'
    },
    {
      id: '5',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      entryPrice: 142.30,
      exitPrice: 138.90,
      shares: 75,
      pnl: -255,
      pnlPercent: -2.4,
      closedDate: '2025-06-04'
    },
    {
      id: '6',
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      entryPrice: 152.80,
      exitPrice: 159.20,
      shares: 65,
      pnl: 416,
      pnlPercent: 4.2,
      closedDate: '2025-06-03'
    },
    {
      id: '7',
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      entryPrice: 325.40,
      exitPrice: 342.15,
      shares: 30,
      pnl: 502,
      pnlPercent: 5.1,
      closedDate: '2025-06-02'
    },
    {
      id: '8',
      symbol: 'NFLX',
      name: 'Netflix Inc.',
      entryPrice: 445.20,
      exitPrice: 428.90,
      shares: 22,
      pnl: -359,
      pnlPercent: -3.7,
      closedDate: '2025-06-01'
    }
  ]);

  // Check if there's a new closed position from navigation state
  useEffect(() => {
    if (location.state?.newClosedPosition) {
      const newClosedPosition = location.state.newClosedPosition;
      setClosedPositions(prev => [newClosedPosition, ...prev]);
      
      // Clear the navigation state
      navigate('/open-positions', { replace: true });
    }
  }, [location.state, navigate]);

  if (!user) {
    navigate('/');
    return null;
  }

  // Portfolio calculations
  const portfolioBalance = 100000;
  const totalPnL = openPositions.reduce((total, position) => {
    return total + ((position.currentPrice - position.entryPrice) * position.shares);
  }, 0);
  const totalPnLPercent = (totalPnL / portfolioBalance) * 100;

  const calculatePositionPnL = (position: Position) => {
    const pnl = (position.currentPrice - position.entryPrice) * position.shares;
    const pnlPercent = ((position.currentPrice - position.entryPrice) / position.entryPrice) * 100;
    return { pnl, pnlPercent };
  };

  const handleOpenCloseDialog = (position: Position) => {
    setSelectedPosition(position);
    setCloseDialogOpen(true);
  };

  const handleClosePosition = (positionId: string, closePrice: number) => {
    const position = openPositions.find(p => p.id === positionId);
    if (!position) return;

    const pnl = (closePrice - position.entryPrice) * position.shares;
    
    setOpenPositions(prev => prev.filter(p => p.id !== positionId));
    
    toast({
      title: "Position Closed",
      description: `${position.symbol} position closed at $${closePrice.toFixed(2)}. P&L: ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}`,
    });

    // TODO: Connect to backend logic via /src/backend-functions/ClosePosition.ts
  };

  const handleGoToSignals = () => {
    navigate('/signals');
  };

  const toggleHistoryView = () => {
    setShowAllHistory(!showAllHistory);
  };

  const displayedClosedPositions = showAllHistory ? closedPositions : closedPositions.slice(0, 3);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">My Open Positions</h1>
            <Button 
              onClick={handleGoToSignals}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Activity className="h-4 w-4 mr-2" />
              Browse Signals
            </Button>
          </div>

          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Portfolio Balance</p>
                    <p className="text-white font-bold text-xl">${portfolioBalance.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Total P&L</p>
                    <p className={`font-bold text-xl ${totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(0)} ({totalPnL >= 0 ? '+' : ''}{totalPnLPercent.toFixed(1)}%)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Active Trades</p>
                    <p className="text-white font-bold text-xl">{openPositions.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Win Rate</p>
                    <p className="text-white font-bold text-xl">78%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Open Positions Table */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center space-x-2">
              <Activity className="h-5 w-5 text-emerald-400" />
              <span>Open Positions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {openPositions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Symbol</TableHead>
                    <TableHead className="text-slate-300">Entry Price</TableHead>
                    <TableHead className="text-slate-300">Current Price</TableHead>
                    <TableHead className="text-slate-300">Shares</TableHead>
                    <TableHead className="text-slate-300">P&L</TableHead>
                    <TableHead className="text-slate-300">% Change</TableHead>
                    <TableHead className="text-slate-300">Score</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {openPositions.map((position) => {
                    const { pnl, pnlPercent } = calculatePositionPnL(position);
                    return (
                      <TableRow key={position.id} className="border-slate-700 hover:bg-slate-700/30">
                        <TableCell>
                          <div>
                            <div className="text-white font-semibold">{position.symbol}</div>
                            <div className="text-slate-400 text-sm">{position.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">${position.entryPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-white">${position.currentPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-white">{position.shares}</TableCell>
                        <TableCell>
                          <span className={`font-semibold ${pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {pnl >= 0 ? '+' : ''}${pnl.toFixed(0)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`font-semibold ${pnlPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-600 text-white">
                            {position.signalScore}/100
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleOpenCloseDialog(position)}
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Close
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">No open positions</h3>
                <p className="text-slate-400 mb-6">Browse signals to start paper trading</p>
                <Button 
                  onClick={handleGoToSignals}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Go to Signals
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <Eye className="h-5 w-5 text-blue-400" />
                <span>Recently Closed Positions</span>
              </CardTitle>
              <Button 
                onClick={toggleHistoryView}
                variant="ghost" 
                size="sm"
                className="text-blue-400 hover:text-blue-300 transition-all duration-300"
              >
                {showAllHistory ? (
                  <>
                    Show Less
                    <ChevronUp className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    View All History
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="transition-all duration-500 ease-in-out">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Symbol</TableHead>
                    <TableHead className="text-slate-300">Entry Price</TableHead>
                    <TableHead className="text-slate-300">Exit Price</TableHead>
                    <TableHead className="text-slate-300">Shares</TableHead>
                    <TableHead className="text-slate-300">Final P&L</TableHead>
                    <TableHead className="text-slate-300">Closed Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedClosedPositions.map((position) => (
                    <TableRow key={position.id} className="border-slate-700">
                      <TableCell>
                        <div>
                          <div className="text-white font-semibold">{position.symbol}</div>
                          <div className="text-slate-400 text-sm">{position.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">${position.entryPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-white">${position.exitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-white">{position.shares}</TableCell>
                      <TableCell>
                        <div>
                          <span className={`font-semibold ${position.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(0)}
                          </span>
                          <span className={`text-sm ml-2 ${position.pnlPercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            ({position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(1)}%)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-400">{position.closedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <PositionCloseDialog
          open={closeDialogOpen}
          onOpenChange={setCloseDialogOpen}
          position={selectedPosition}
          onConfirm={handleClosePosition}
        />
      </div>
    </Layout>
  );
};

export default OpenPositions;

}
