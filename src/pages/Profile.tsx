
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Separator } from '../components/ui/separator';
import { User, CreditCard, BarChart3, Shield, Settings, MessageSquare, Download, Trash2, LogOut, CheckCircle2, FileText } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567'
  });

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Layout>
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{t('profile.title')}</h1>
          <p className="text-slate-400">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* User Info */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-400" />
                  {t('profile.userInfo')}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  {isEditing ? t('common.save') : t('common.edit')}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={userInfo.name} />
                  <AvatarFallback className="bg-emerald-600 text-white text-lg">
                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300 text-sm">Full Name</Label>
                      {isEditing ? (
                        <Input
                          value={userInfo.name}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                          className="mt-1 bg-slate-700 border-slate-600 text-white"
                        />
                      ) : (
                        <p className="text-white font-medium">{userInfo.name}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-slate-300 text-sm">Email</Label>
                      {isEditing ? (
                        <Input
                          value={userInfo.email}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                          className="mt-1 bg-slate-700 border-slate-600 text-white"
                        />
                      ) : (
                        <p className="text-white font-medium">{userInfo.email}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-slate-300 text-sm">Phone (Optional)</Label>
                      {isEditing ? (
                        <Input
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                          className="mt-1 bg-slate-700 border-slate-600 text-white"
                        />
                      ) : (
                        <p className="text-white font-medium">{userInfo.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Plan */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-emerald-400" />
                {t('profile.subscription')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{t('profile.currentPlan')}</span>
                      <Badge className="bg-emerald-600 text-white">Pro Plan</Badge>
                    </div>
                    <p className="text-slate-400 text-sm">$99/month • Renews Dec 15, 2024</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                      Upgrade
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                      Cancel
                    </Button>
                  </div>
                </div>
                
                <Separator className="bg-slate-700" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{t('profile.paymentMethod')}</span>
                    <span className="text-white">**** **** **** 1234</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{t('profile.billingDate')}</span>
                    <span className="text-white">December 15, 2024</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                  <FileText className="h-4 w-4 mr-2" />
                  {t('profile.billingHistory')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-400" />
                {t('profile.usage')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">1,247</div>
                  <div className="text-slate-400 text-sm">{t('profile.signalsViewed')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">72%</div>
                  <div className="text-slate-400 text-sm">{t('profile.avgAccuracy')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">34%</div>
                  <div className="text-slate-400 text-sm">Click-to-Trade Rate</div>
                </div>
                <div className="text-center">
                  <div className="space-y-1">
                    <div className="text-white font-medium">{t('profile.topTickers')}</div>
                    <div className="text-sm text-slate-400">AAPL, TSLA, NVDA</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal & Consent */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-400" />
                {t('profile.legal')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-slate-300">Risk Disclosure</span>
                  </div>
                  <span className="text-slate-400 text-sm">Accepted Nov 28, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-slate-300">Privacy Policy</span>
                  </div>
                  <span className="text-slate-400 text-sm">Accepted Nov 28, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-slate-300">Terms of Service</span>
                  </div>
                  <span className="text-slate-400 text-sm">Accepted Nov 28, 2024</span>
                </div>
                <div className="mt-4">
                  <Badge className="bg-green-600 text-white">Account Status: Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-orange-400" />
                {t('profile.helpImprove')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 text-sm mb-4">
                Rate our signals and help us improve our algorithm accuracy.
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Provide Feedback
              </Button>
            </CardContent>
          </Card>

          {/* Account Controls */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Settings className="h-5 w-5 mr-2 text-slate-400" />
                {t('profile.account')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                  <Download className="h-4 w-4 mr-2" />
                  {t('profile.exportData')} (GDPR)
                </Button>
                <Button variant="outline" className="w-full justify-start bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout from all sessions
                </Button>
                <Button variant="outline" className="w-full justify-start bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                  Deactivate account
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('profile.deleteAccount')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
