
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Mail, Lock, User, Github, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PlanIndicator from './PlanIndicator';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  selectedPlan?: {
    id: string;
    name: string;
    price: string;
    billingCycle?: string;
  };
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, selectedPlan }) => {
  const { signup, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [planInfo, setPlanInfo] = useState(selectedPlan || null);

  useEffect(() => {
    // Check URL parameters for plan info
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get('plan');
    const planName = urlParams.get('name');
    const price = urlParams.get('price');
    const billingCycle = urlParams.get('billing') || 'monthly';

    if (planId && planName && price) {
      setPlanInfo({
        id: planId,
        name: planName,
        price: price,
        billingCycle: billingCycle
      });
    } else {
      // Check localStorage as backup
      const savedPlan = localStorage.getItem('selectedPlan');
      if (savedPlan) {
        try {
          setPlanInfo(JSON.parse(savedPlan));
        } catch (error) {
          console.error('Error parsing saved plan:', error);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      await signup(formData.email, formData.password, formData.name);
      
      // Store plan selection for post-signup flow
      if (planInfo) {
        localStorage.setItem('selectedPlan', JSON.stringify(planInfo));
        localStorage.setItem('showWelcome', 'true');
      }
      
      toast.success('Account created successfully! Welcome to Kurzora.');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getButtonText = () => {
    if (planInfo) {
      return loading ? 'Starting Trial...' : 'Start Free Trial';
    }
    return loading ? 'Creating account...' : 'Continue to Payment';
  };

  return (
    <Card className="w-full max-w-md bg-slate-900/50 backdrop-blur-sm border-blue-800/30">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <img src="/lovable-uploads/2ac01661-8ff8-4932-a4f0-d685c8ce2aae.png" alt="Kurzora Logo" className="h-12 w-auto" />
        </div>
        <CardTitle className="text-2xl text-center text-white">Create account</CardTitle>
        <CardDescription className="text-center text-slate-400">
          Join thousands of successful traders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan Context Display */}
        {planInfo && (
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-gray-400">You're creating an account for</p>
            <h3 className="text-xl font-semibold text-white">{planInfo.name} Plan - ${planInfo.price}/month</h3>
            <p className="text-xs text-gray-400 mt-1">7-day free trial • Cancel anytime</p>
          </div>
        )}
        
        <PlanIndicator 
          planId={planInfo?.id}
          planName={planInfo?.name}
          price={planInfo?.price}
          billingCycle={planInfo?.billingCycle}
        />
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 bg-slate-800/50 border-blue-800/30 text-white placeholder-slate-400"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 bg-slate-800/50 border-blue-800/30 text-white placeholder-slate-400"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 bg-slate-800/50 border-blue-800/30 text-white placeholder-slate-400"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 bg-slate-800/50 border-blue-800/30 text-white placeholder-slate-400"
                required
              />
            </div>
          </div>

          {/* Payment Information Section */}
          {planInfo && (
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h4 className="font-medium mb-3 text-white">Payment Information</h4>
              <p className="text-xs text-gray-400 mb-4">
                🔒 Your card won't be charged for 7 days
              </p>
              {/* Stripe Card Element will go here */}
              <div id="card-element" className="p-3 bg-gray-900/50 rounded border border-gray-700"></div>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {planInfo ? 'Starting Trial...' : 'Creating account...'}
              </>
            ) : (
              getButtonText()
            )}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-blue-800/30" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="bg-slate-800/50 border-blue-800/30 text-slate-300 hover:bg-slate-700">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </Button>
          <Button variant="outline" className="bg-slate-800/50 border-blue-800/30 text-slate-300 hover:bg-slate-700">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        
        <div className="text-center text-sm">
          <span className="text-slate-400">Already have an account? </span>
          <button 
            onClick={onSwitchToLogin}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign in
          </button>
        </div>
        
        <div className="text-center text-xs text-slate-400">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
