
import React from 'react';

interface PlanDisplayProps {
  planInfo: {
    id: string;
    name: string;
    price: string;
    billingCycle?: string;
  } | null;
  onChangePlan: () => void;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ planInfo, onChangePlan }) => {
  if (!planInfo) return null;

  const getPlanIcon = () => {
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
    <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-6 text-center relative">
      <span className="text-green-400 text-xl mb-2">{getPlanIcon()}</span>
      <p className="text-sm text-gray-400 mb-1">You're signing up for</p>
      <h3 className="text-2xl font-bold text-white">{planInfo.name} Plan</h3>
      {getPlanBadge()}
      <p className="text-gray-400">${planInfo.price}/{planInfo.billingCycle || 'monthly'} after 7-day free trial</p>
      <button 
        onClick={onChangePlan}
        className="text-blue-400 hover:text-blue-300 text-sm underline mt-2 inline-block"
      >
        Change plan
      </button>
    </div>
  );
};

export default PlanDisplay;
