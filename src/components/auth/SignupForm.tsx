import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Mail, Lock, User, Github, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PlanIndicator from './PlanIndicator';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

// Your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51RYbcjP6fp0wCWWuIPxACqqw0ab8KVEa6aDn0s5TY0S8AeUdiAMggBvhyVsH9pAD4jj5iYsiBCcp1Bx6fycxdsKx00bBH9zv0Q';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

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
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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

    // Restore form data if available
    const savedFormData = localStorage.getItem('signupFormData');
    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData));
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // For now, just create account without payment processing
    // You can enable payment when you have proper Stripe keys
    if (planInfo && !paymentMethodId) {
      toast.error('Please enter your payment information');
      return;
    }
    
    try {
      setIsProcessingPayment(true);
      
      // First create the user account
      await signup(formData.email, formData.password, formData.name);
      
      // If there's a plan and payment method, create subscription
      if (planInfo && paymentMethodId) {
        // TODO: Connect to backend logic via /src/backend-functions/CreateSubscription.ts
        console.log('Creating subscription with payment method:', paymentMethodId);
        console.log('Plan info:', planInfo);
        
        // Store subscription info for later processing
        localStorage.setItem('pendingSubscription', JSON.stringify({
          planId: planInfo.id,
          paymentMethodId: paymentMethodId
        }));
      }
      
      // Store plan selection for post-signup flow
      if (planInfo) {
        localStorage.setItem('selectedPlan', JSON.stringify(planInfo));
        localStorage.setItem('showWelcome', 'true');
      }
      
      // Clear saved form data on successful signup
      localStorage.removeItem('signupFormData');
      
      toast.success('Account created successfully! Welcome to Kurzora.');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(newFormData);
    
    // Save form data to localStorage
    localStorage.setItem('signupFormData', JSON.stringify(newFormData));
  };

  const handleChangePlan = () => {
    // Save current form data before navigation
    localStorage.setItem('signupFormData', JSON.stringify(formData));
    window.location.href = '/pricing';
  };

  const handlePaymentSuccess = (paymentMethodId: string) => {
    setPaymentMethodId(paymentMethodId);
    setPaymentError(null);
    toast.success('Payment method added successfully');
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setPaymentMethodId(null);
  };

  const getButtonText = () => {
    if (isProcessingPayment) {
      return 'Setting up your subscription...';
    }
    if (loading) {
      return planInfo ? 'Creating account...' : 'Creating account...';
    }
    if (planInfo) {
      return 'Start Free Trial';
    }
    return 'Create Account';
  };

  const getPlanIcon = () => {
    if (!planInfo) return null;
    
    switch (planInfo.id) {
      case 'starter':
        return '📈';
      case 'professional':
        return '⭐';
      case 'elite':
        return '👑';
      default:
        return '⭐';
    }
  };

  const getPlanBadge = () => {
    if (!planInfo) return null;
    
    switch (planInfo.id) {
      case 'professional':
        return (
          <span className="inline-block bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full mb-2">
            Most Popular
          </span>
        );
      case 'elite':
        return (
          <span className="inline-block bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full mb-2">
            Best Value
          </span>
        );
      default:
        return null;
    }
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
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-6 text-center relative">
            <span className="text-green-400 text-xl mb-2">{getPlanIcon()}</span>
            <p className="text-sm text-gray-400 mb-1">You're signing up for</p>
            <h3 className="text-2xl font-bold text-white">{planInfo.name} Plan</h3>
            {getPlanBadge()}
            <p className="text-gray-400">${planInfo.price}/{planInfo.billingCycle || 'monthly'} after 7-day free trial</p>
            <button 
              onClick={handleChangePlan}
              className="text-blue-400 hover:text-blue-300 text-sm underline mt-2 inline-block"
            >
              Change plan
            </button>
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

          {/* Payment Information Section - Only show if plan is selected */}
          {planInfo && (
            <div className="mt-6">
              <Elements stripe={stripePromise}>
                <PaymentForm
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  loading={loading || isProcessingPayment}
                />
              </Elements>
              {paymentError && (
                <p className="text-sm text-red-400 mt-2">{paymentError}</p>
              )}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading || isProcessingPayment}
          >
            {(loading || isProcessingPayment) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {getButtonText()}
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
