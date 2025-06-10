
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface PaymentFormProps {
  onPaymentSuccess: (paymentMethodId: string) => void;
  onPaymentError: (error: string) => void;
  loading: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentSuccess, onPaymentError, loading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<string | null>(null);

  const handleCardChange = (event: any) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  const createPaymentMethod = async () => {
    if (!stripe || !elements) {
      onPaymentError('Stripe not loaded');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onPaymentError('Card element not found');
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setCardError(error.message || 'Payment failed');
        onPaymentError(error.message || 'Payment failed');
      } else {
        setCardError(null);
        onPaymentSuccess(paymentMethod.id);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      setCardError(errorMessage);
      onPaymentError(errorMessage);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Payment Information</h3>
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <span>🔒</span>
        <span>Your card won't be charged for 7 days</span>
      </div>
      
      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <CardElement 
          onChange={handleCardChange}
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#6b7280',
                },
                backgroundColor: 'transparent',
              },
              invalid: {
                color: '#ef4444',
              },
            },
          }}
        />
      </div>
      
      {cardError && (
        <p className="text-sm text-red-400">{cardError}</p>
      )}
      
      <p className="text-xs text-gray-500">
        You can cancel anytime during your trial. We'll send a reminder email 2 days before your trial ends.
      </p>
    </div>
  );
};

export default PaymentForm;
