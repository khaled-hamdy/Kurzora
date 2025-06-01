
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { LogOut, BarChart3, User, Settings } from 'lucide-react';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {user && (
        <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-8 w-8 text-emerald-400" />
                  <span className="text-xl font-bold text-white">SignalPro</span>
                </div>
                <div className="hidden md:flex space-x-6 ml-8">
                  <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                  <Link to="/signals" className="text-slate-300 hover:text-white transition-colors">Signals</Link>
                  <Link to="/orders" className="text-slate-300 hover:text-white transition-colors">Orders</Link>
                  <Link to="/performance" className="text-slate-300 hover:text-white transition-colors">Performance</Link>
                  <Link to="/admin" className="text-slate-300 hover:text-white transition-colors">Admin</Link>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-slate-300">
                  Welcome, <span className="text-white font-medium">{user.name}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                  <Settings className="h-4 w-4 mr-1" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" onClick={logout} className="text-slate-300 hover:text-white">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-slate-900/50 border-t border-slate-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="h-6 w-6 text-emerald-400" />
                <span className="text-lg font-bold text-white">SignalPro</span>
              </div>
              <p className="text-slate-400 text-sm">
                Professional stock signals and trading analytics for serious traders.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Signals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 mt-8">
            <p className="text-center text-slate-400 text-sm">
              © 2024 SignalPro. All rights reserved. Trading involves risk and may not be suitable for all investors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
