
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PlanIndicator from './PlanIndicator';
import PlanDisplay from './PlanDisplay';
import SignupFormFields from './SignupFormFields';
import SocialAuth from './SocialAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

// Use your actual test key for testing with test cards
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51RYbcjP6fp0wCWWukGV48u4rYD6mhqCxFlEKjsKmwmqNkPJcDI7bKrNlqe7SPGBu4dyxy2kpBnejKQDgS0YU5uVL00omhfiN1n';
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
        <PlanDisplay planInfo={planInfo} onChangePlan={handleChangePlan} />
        
        <PlanIndicator 
          planId={planInfo?.id}
          planName={planInfo?.name}
          price={planInfo?.price}
          billingCycle={planInfo?.billingCycle}
        />
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <SignupFormFields formData={formData} onChange={handleChange} />

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
        
        <SocialAuth />
        
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
