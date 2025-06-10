import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Bell, Globe, Shield, Key, Monitor, Smartphone, Mail, MessageSquare, CheckCircle, XCircle, Clock, Eye, BarChart3, DollarSign, AlertTriangle, RefreshCw } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { selectedCurrency, setSelectedCurrency, formatCurrency, exchangeRate, isLoading, error, lastUpdated } = useCurrency();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Settings state
  const [signalThreshold, setSignalThreshold] = useState([75]);
  const [timeframes, setTimeframes] = useState({ '1H': true, '4H': true, '1D': true, '1W': false });
  const [sectors, setSectors] = useState({ tech: true, finance: false, healthcare: true, energy: false });
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [telegramAlerts, setTelegramAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [digestFreq, setDigestFreq] = useState('daily');
  const [twoFA, setTwoFA] = useState(false);
  const [autoTrading, setAutoTrading] = useState(false);
  const [showPnL, setShowPnL] = useState(true);
  const [showBacktest, setShowBacktest] = useState(false);
  const [uiDensity, setUiDensity] = useState('default');
  const [apiKey, setApiKey] = useState('sk-****************************');
  
  // Language preferences
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);

  // Only include languages that are actually supported in LanguageContext
  const languages = [
    { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
    { code: 'ar' as Language, label: 'العربية', flag: '🇸🇦' },
    { code: 'de' as Language, label: 'Deutsch', flag: '🇩🇪' }
  ];

  const currencies = [
    { code: 'USD', symbol: '$', label: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', label: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', symbol: '£', label: 'British Pound', flag: '🇬🇧' },
    { code: 'SAR', symbol: '﷼', label: 'Saudi Riyal', flag: '🇸🇦' },
    { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham', flag: '🇦🇪' },
    { code: 'JPY', symbol: '¥', label: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'INR', symbol: '₹', label: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'CNY', symbol: '¥', label: 'Chinese Yuan', flag: '🇨🇳' }
  ];

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const generateNewAPIKey = () => {
    const newKey = 'sk-' + Math.random().toString(36).substring(2, 30);
    setApiKey(newKey);
  };

  const handleLanguageChange = (langCode: string) => {
    const validLanguage = languages.find(lang => lang.code === langCode);
    if (validLanguage) {
      setSelectedLanguage(validLanguage.code);
      setLanguage(validLanguage.code);
      // TODO: Connect to backend logic via /src/backend-functions/UpdateUserPreferences.ts
    }
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    toast({
      title: "Currency Updated",
      description: `Currency preference changed to ${currencyCode}. All prices will be converted automatically.`,
    });
    // TODO: Connect to backend logic via /src/backend-functions/UpdateCurrencyPreferences.ts
  };

  const saveLanguageCurrencyPreferences = () => {
    // TODO: Connect to backend logic via /src/backend-functions/SavePreferences.ts
    toast({
      title: "Preferences Updated",
      description: `Language: ${languages.find(l => l.code === selectedLanguage)?.label}, Currency: ${selectedCurrency}`,
    });
  };

  return (
    <Layout>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t('settings.title')}</h1>
          <p className="text-slate-400">Customize your trading experience and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Language & Currency Preferences */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-400" />
                <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                Language & Currency Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Currency Status */}
              {(error || isLoading) && (
                <div className={`p-4 rounded-lg border ${error ? 'bg-red-500/10 border-red-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                  <div className="flex items-center space-x-2">
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin text-blue-400" />
                    ) : error ? (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    ) : null}
                    <span className={`text-sm ${error ? 'text-red-400' : 'text-blue-400'}`}>
                      {isLoading ? 'Fetching exchange rates...' : error ? `Exchange Rate Error: ${error}` : ''}
                    </span>
                    {lastUpdated && (
                      <span className="text-xs text-slate-400">
                        Last updated: {lastUpdated.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Language Selection */}
                <div>
                  <Label className="text-slate-300 text-sm font-medium flex items-center mb-3">
                    <Globe className="h-4 w-4 mr-2" />
                    Language
                  </Label>
                  <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center space-x-2">
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                            {selectedLanguage === lang.code && (
                              <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Currency Selection */}
                <div>
                  <Label className="text-slate-300 text-sm font-medium flex items-center mb-3">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Currency
                    <span className="ml-2 text-xs text-slate-400">(Live conversion rates)</span>
                  </Label>
                  <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center space-x-2">
                            <span>{currency.flag}</span>
                            <span className="font-mono font-bold">{currency.code}</span>
                            <span>{currency.symbol}</span>
                            <span className="text-slate-400">- {currency.label}</span>
                            {selectedCurrency === currency.code && (
                              <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Current Selection Display */}
              <div className="bg-slate-700/30 rounded-lg p-4 space-y-2">
                <div className="text-sm text-slate-400">Current Selection:</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{languages.find(l => l.code === selectedLanguage)?.flag}</span>
                    <span className="text-white font-medium">
                      {languages.find(l => l.code === selectedLanguage)?.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{currencies.find(c => c.code === selectedCurrency)?.flag}</span>
                    <span className="text-white font-medium">
                      {selectedCurrency} {currencies.find(c => c.code === selectedCurrency)?.symbol}
                    </span>
                  </div>
                </div>
                {selectedCurrency !== 'USD' && exchangeRate && (
                  <div className="text-xs text-slate-400 pt-2 border-t border-slate-600">
                    Exchange Rate: 1 USD = {exchangeRate.toFixed(4)} {selectedCurrency}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  onClick={saveLanguageCurrencyPreferences}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedLanguage(language);
                    setSelectedCurrency('USD');
                  }}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </div>

              {/* Helper Text */}
              <div className="text-xs text-slate-400 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <strong>💡 Note:</strong> Currency changes will update all prices, charts, and financial data across the platform using live exchange rates from Frankfurter.app. 
                Rates are cached for 1 hour and automatically refreshed. If conversion fails, the app will use cached rates or fall back to USD.
              </div>
            </CardContent>
          </Card>

          {/* Signal Preferences */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-emerald-400" />
                {t('settings.signalPrefs')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-slate-300 text-sm font-medium">{t('settings.minThreshold')}: {signalThreshold[0]}%</Label>
                <Slider
                  value={signalThreshold}
                  onValueChange={setSignalThreshold}
                  max={100}
                  min={50}
                  step={5}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label className="text-slate-300 text-sm font-medium">{t('settings.timeframes')}</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {Object.entries(timeframes).map(([timeframe, enabled]) => (
                    <div key={timeframe} className="flex items-center space-x-2">
                      <Switch
                        checked={enabled}
                        onCheckedChange={(checked) => setTimeframes(prev => ({ ...prev, [timeframe]: checked }))}
                      />
                      <Label className="text-slate-300">{timeframe}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-300 text-sm font-medium">{t('settings.sectors')}</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {Object.entries(sectors).map(([sector, enabled]) => (
                    <Badge
                      key={sector}
                      variant={enabled ? "default" : "outline"}
                      className={`cursor-pointer ${enabled ? 'bg-emerald-600 text-white' : 'border-slate-600 text-slate-400'}`}
                      onClick={() => setSectors(prev => ({ ...prev, [sector]: !enabled }))}
                    >
                      {sector.charAt(0).toUpperCase() + sector.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-400" />
                {t('settings.notifications')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <Label className="text-slate-300">{t('settings.emailAlerts')}</Label>
                </div>
                <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-slate-400" />
                  <Label className="text-slate-300">{t('settings.telegramAlerts')}</Label>
                </div>
                <Switch checked={telegramAlerts} onCheckedChange={setTelegramAlerts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-slate-400" />
                  <Label className="text-slate-300">{t('settings.pushNotifications')}</Label>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div>
                <Label className="text-slate-300 text-sm font-medium">{t('settings.digestFreq')}</Label>
                <Select value={digestFreq} onValueChange={setDigestFreq}>
                  <SelectTrigger className="mt-2 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-Time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Language & Locale */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Globe className="h-5 w-5 mr-2 text-purple-400" />
                {t('settings.language')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300 text-sm font-medium">Language</Label>
                <div className="flex space-x-2 mt-2">
                  <Badge variant={language === 'en' ? 'default' : 'outline'} className="cursor-pointer">
                    🇺🇸 English
                  </Badge>
                  <Badge variant={language === 'ar' ? 'default' : 'outline'} className="cursor-pointer">
                    🇸🇦 العربية
                  </Badge>
                  <Badge variant={language === 'de' ? 'default' : 'outline'} className="cursor-pointer">
                    🇩🇪 Deutsch
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-slate-300 text-sm font-medium">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger className="mt-2 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">EST (New York)</SelectItem>
                    <SelectItem value="cet">CET (Berlin)</SelectItem>
                    <SelectItem value="gst">GST (Dubai)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-400" />
                {t('settings.security')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                {t('settings.changePassword')}
              </Button>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">{t('settings.twoFA')}</Label>
                  <p className="text-xs text-slate-400">Add an extra layer of security</p>
                </div>
                <Switch checked={twoFA} onCheckedChange={setTwoFA} />
              </div>

              <div>
                <Label className="text-slate-300 text-sm font-medium">{t('settings.lastLogin')}</Label>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Last login:</span>
                    <span className="text-white">Today, 2:15 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">IP Address:</span>
                    <span className="text-white">192.168.1.1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Device:</span>
                    <span className="text-white">Chrome on macOS</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API & Auto-Trading */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Key className="h-5 w-5 mr-2 text-yellow-400" />
                {t('settings.api')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300 text-sm font-medium">API Key</Label>
                <div className="flex space-x-2 mt-2">
                  <Input 
                    value={apiKey}
                    readOnly
                    className="bg-slate-700 border-slate-600 text-white font-mono text-sm"
                  />
                  <Button onClick={generateNewAPIKey} variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                    Generate New
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">{t('settings.autoTrading')}</Label>
                  <p className="text-xs text-slate-400">Only for signals ≥ 85% confidence</p>
                </div>
                <Switch checked={autoTrading} onCheckedChange={setAutoTrading} />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-slate-300">{t('settings.brokerStatus')}</Label>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">IBKR Connected</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* UI & Data Preferences */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Monitor className="h-5 w-5 mr-2 text-cyan-400" />
                {t('settings.ui')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-slate-400" />
                  <Label className="text-slate-300">{t('settings.showPnL')}</Label>
                </div>
                <Switch checked={showPnL} onCheckedChange={setShowPnL} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <Label className="text-slate-300">{t('settings.showBacktest')}</Label>
                </div>
                <Switch checked={showBacktest} onCheckedChange={setShowBacktest} />
              </div>

              <div>
                <Label className="text-slate-300 text-sm font-medium">{t('settings.uiDensity')}</Label>
                <Select value={uiDensity} onValueChange={setUiDensity}>
                  <SelectTrigger className="mt-2 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {t('common.save')} {t('settings.title')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;

</edits_to_apply>
