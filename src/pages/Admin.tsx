
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { HelpCircle, Shield, Settings, FileText, Mail, Phone } from 'lucide-react';

const Admin: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      window.location.href = '/';
    }
  }, [user]);

  if (!user) return null;

  const handleHelpClick = () => {
    console.log('Opening Help/FAQ');
    // Add help/FAQ logic here
  };

  const handlePrivacyClick = () => {
    console.log('Opening Privacy Policy');
    // Add privacy policy logic here
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Center
          </h1>
          <p className="text-slate-400">
            Manage your account settings and access support resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Help/FAQ Card */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <HelpCircle className="h-6 w-6 text-blue-400" />
                <span>Help/FAQ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                Get answers to frequently asked questions and access our help documentation.
              </p>
              <Button 
                onClick={handleHelpClick}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Access Help Center
              </Button>
            </CardContent>
          </Card>

          {/* Privacy Policy Card */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <Shield className="h-6 w-6 text-emerald-400" />
                <span>Privacy Policy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                Review our privacy policy and data protection practices.
              </p>
              <Button 
                onClick={handlePrivacyClick}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                View Privacy Policy
              </Button>
            </CardContent>
          </Card>

          {/* Account Settings Card */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <Settings className="h-6 w-6 text-yellow-400" />
                <span>Account Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                Manage your account preferences and security settings.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Manage Account
              </Button>
            </CardContent>
          </Card>

          {/* Documentation Card */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <FileText className="h-6 w-6 text-purple-400" />
                <span>Documentation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                Access trading guides, API documentation, and tutorials.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                View Docs
              </Button>
            </CardContent>
          </Card>

          {/* Contact Support Card */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center space-x-2">
                <Mail className="h-6 w-6 text-red-400" />
                <span>Contact Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                Get in touch with our support team for assistance.
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Info Card */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <label className="text-slate-400 text-sm">Name</label>
                  <p className="text-white">{user.name}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Email</label>
                  <p className="text-white">{user.email}</p>
                </div>
                {user.subscription && (
                  <div>
                    <label className="text-slate-400 text-sm">Subscription</label>
                    <p className="text-emerald-400">{user.subscription.tier}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
