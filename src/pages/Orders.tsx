
import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Orders: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Orders page: Auth state - loading:', loading, 'user:', user);
    
    // Only redirect if not loading and no user
    if (!loading && !user) {
      console.log('Orders page: User not authenticated, redirecting to home');
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Show loading spinner while authentication state is being determined
  if (loading) {
    console.log('Orders page: Still loading auth state');
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
    console.log('Orders page: No user found, should redirect');
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Orders</h1>
          <p className="text-slate-400">Manage your trading orders</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
          <p className="text-slate-300">Orders page content goes here...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
