
import React, { createContext, useContext, useState } from 'react';

interface CurrencyContextType {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  formatCurrency: (amount: number) => string;
  getCurrencySymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencies = {
  USD: { symbol: '$', label: 'US Dollar' },
  EUR: { symbol: '€', label: 'Euro' },
  GBP: { symbol: '£', label: 'British Pound' },
  SAR: { symbol: '﷼', label: 'Saudi Riyal' },
  AED: { symbol: 'د.إ', label: 'UAE Dirham' },
  JPY: { symbol: '¥', label: 'Japanese Yen' },
  INR: { symbol: '₹', label: 'Indian Rupee' },
  CNY: { symbol: '¥', label: 'Chinese Yuan' }
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const formatCurrency = (amount: number) => {
    const currency = currencies[selectedCurrency as keyof typeof currencies];
    if (!currency) return `$${amount.toFixed(2)}`;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getCurrencySymbol = () => {
    const currency = currencies[selectedCurrency as keyof typeof currencies];
    return currency?.symbol || '$';
  };

  return (
    <CurrencyContext.Provider value={{
      selectedCurrency,
      setSelectedCurrency,
      formatCurrency,
      getCurrencySymbol
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
