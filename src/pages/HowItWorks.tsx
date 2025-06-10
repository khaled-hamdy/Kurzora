import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, AlertTriangle, Layers, Signal, Gauge, BrainCircuit } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('HowItWorks page: Auth state - loading:', loading, 'user:', user);
    
    // Only redirect if not loading and no user
    if (!loading && !user) {
      console.log('HowItWorks page: User not authenticated, redirecting to home');
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Show loading spinner while authentication state is being determined
  if (loading) {
    console.log('HowItWorks page: Still loading auth state');
    return (
      <Layout>
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  // Show nothing if no user (will redirect via useEffect)
  if (!user) {
    console.log('HowItWorks page: No user found, should redirect');
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">How Our Signals Work</h1>
          <p className="text-slate-400 max-w-3xl mx-auto">
            SwingTrader combines institutional-grade algorithms with advanced AI pattern recognition 
            to identify high-probability trading opportunities.
          </p>
        </div>

        {/* Signal Logic Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Our Signal Generation Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Layers className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-lg text-white">Multi-Timeframe Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  We scan price action across multiple timeframes (M5, H1, D1) to ensure signal 
                  confirmation at various market depths. All timeframes must align for highest 
                  confidence signals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Signal className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-lg text-white">Support/Resistance Detection</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Our AI identifies key price levels using volume cluster analysis, historical reversal 
                  points, and institutional order flow data to find high-probability entry zones.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Gauge className="h-6 w-6 text-green-400" />
                  </div>
                  <CardTitle className="text-lg text-white">Indicator Confirmation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Multiple technical indicators (RSI, MACD, Volume Profile, etc.) must align to trigger 
                  a signal. Each indicator is weighted based on current market conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-500/20 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-amber-400" />
                  </div>
                  <CardTitle className="text-lg text-white">Risk Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Every signal includes calculated stop-loss and take-profit levels to maintain favorable 
                  risk-reward ratios. We target minimum 1:2 risk-reward for all trades.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-red-500/20 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-red-400" />
                  </div>
                  <CardTitle className="text-lg text-white">Validation & Scoring</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Each signal receives a score (0-100) based on strength of confirmation, historical 
                  pattern success rate, and current market volatility conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-500/20 p-3 rounded-full">
                    <BrainCircuit className="h-6 w-6 text-indigo-400" />
                  </div>
                  <CardTitle className="text-lg text-white">AI Enhancement</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">
                  Machine learning algorithms continuously improve signal quality by analyzing successful 
                  patterns and adapting to changing market conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Signal Score Explanation */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Understanding Signal Scores</h2>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 bg-gradient-to-r from-emerald-900/50 to-emerald-800/30 rounded-lg border border-emerald-700">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">💎</span>
                    <h3 className="text-lg font-semibold text-white">Strong (80-100)</h3>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Highest confidence signals with multiple strong confirmations. 
                    Historical win rate over 75%.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-900/50 to-blue-800/30 rounded-lg border border-blue-700">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">✅</span>
                    <h3 className="text-lg font-semibold text-white">Valid (60-79)</h3>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Good quality signals with solid confirmations.
                    Historical win rate 60-75%.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-yellow-900/50 to-yellow-800/30 rounded-lg border border-yellow-700">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">⚠️</span>
                    <h3 className="text-lg font-semibold text-white">Weak (40-59)</h3>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Mixed confirmations with some conflicting indicators.
                    Use additional validation.
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-red-900/50 to-red-800/30 rounded-lg border border-red-700">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">🚫</span>
                    <h3 className="text-lg font-semibold text-white">Ignore (0-39)</h3>
                  </div>
                  <p className="text-slate-300 text-sm">
                    Multiple conflicting indicators. Not recommended for trading.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Backtesting Results */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Backtesting & Performance</h2>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">68%</div>
                  <div className="text-slate-400">Average Win Rate</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">180,000+</div>
                  <div className="text-slate-400">Trades Analyzed</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-emerald-400 mb-1">6%</div>
                  <div className="text-slate-400">Average ROI per Trade</div>
                </div>
              </div>
              
              <p className="text-slate-400 mb-4">
                Our signal algorithm has been extensively backtested across multiple market conditions, 
                including bull markets, bear markets, and sideways consolidations. Performance metrics 
                are constantly monitored and algorithms are updated to adapt to changing market dynamics.
              </p>
              
              <div className="bg-slate-900 rounded-md p-4 border border-slate-700">
                <p className="text-amber-400 text-sm flex items-center mb-2">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <strong>Important Risk Disclosure</strong>
                </p>
                <p className="text-slate-400 text-sm">
                  Past performance is not indicative of future results. All trading signals are algorithmic 
                  and not financial advice. Trading involves significant risk of loss and may not be suitable 
                  for all investors. Always conduct your own research and consider your financial situation 
                  before trading.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
