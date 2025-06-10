
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CurrencyContextType {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  formatCurrency: (amount: number) => string;
  getCurrencySymbol: () => string;
  convertFromUSD: (amountUSD: number) => Promise<number>;
  exchangeRate: number;
  lastUpdated: Date | null;
  isLoading: boolean;
  error: string | null;
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

// Cache key for localStorage
const CACHE_KEY = 'currency_rates_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface CachedRate {
  rate: number;
  timestamp: number;
  currency: string;
}

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load cached rate on mount
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const cachedData: CachedRate = JSON.parse(cached);
        const isExpired = Date.now() - cachedData.timestamp > CACHE_DURATION;
        
        if (!isExpired && cachedData.currency === selectedCurrency) {
          setExchangeRate(cachedData.rate);
          setLastUpdated(new Date(cachedData.timestamp));
          console.log(`Using cached exchange rate: 1 USD = ${cachedData.rate} ${selectedCurrency}`);
          return;
        }
      } catch (e) {
        console.warn('Failed to parse cached exchange rate:', e);
      }
    }
    
    // If no valid cache, fetch new rate
    if (selectedCurrency !== 'USD') {
      fetchExchangeRate();
    }
  }, [selectedCurrency]);

  const fetchExchangeRate = async () => {
    if (selectedCurrency === 'USD') {
      setExchangeRate(1);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Using Frankfurter.app - free API, no key required
      const response = await fetch(`https://api.frankfurter.app/latest?from=USD&to=${selectedCurrency}`);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      const rate = data.rates[selectedCurrency];
      
      if (!rate) {
        throw new Error(`Exchange rate not found for ${selectedCurrency}`);
      }

      setExchangeRate(rate);
      setLastUpdated(new Date());
      
      // Cache the rate
      const cacheData: CachedRate = {
        rate,
        timestamp: Date.now(),
        currency: selectedCurrency
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      
      console.log(`Fetched exchange rate: 1 USD = ${rate} ${selectedCurrency}`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch exchange rate';
      setError(errorMessage);
      console.error('Exchange rate fetch error:', err);
      
      // Try to use cached rate as fallback
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const cachedData: CachedRate = JSON.parse(cached);
          if (cachedData.currency === selectedCurrency) {
            setExchangeRate(cachedData.rate);
            setLastUpdated(new Date(cachedData.timestamp));
            setError(`Using cached rate (${errorMessage})`);
          }
        } catch (e) {
          console.warn('Failed to use cached rate as fallback:', e);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const convertFromUSD = async (amountUSD: number): Promise<number> => {
    if (selectedCurrency === 'USD') {
      return amountUSD;
    }
    
    // If we have a rate, use it
    if (exchangeRate && exchangeRate !== 1) {
      return amountUSD * exchangeRate;
    }
    
    // If no rate and not loading, try to fetch
    if (!isLoading) {
      await fetchExchangeRate();
    }
    
    return amountUSD * exchangeRate;
  };

  const formatCurrency = (amount: number) => {
    const currency = currencies[selectedCurrency as keyof typeof currencies];
    if (!currency) return `$${amount.toFixed(2)}`;
    
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: selectedCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (e) {
      // Fallback formatting if Intl.NumberFormat fails
      return `${currency.symbol}${amount.toFixed(2)}`;
    }
  };

  const getCurrencySymbol = () => {
    const currency = currencies[selectedCurrency as keyof typeof currencies];
    return currency?.symbol || '$';
  };

  const handleSetSelectedCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    // Clear cache when currency changes
    localStorage.removeItem(CACHE_KEY);
  };

  return (
    <CurrencyContext.Provider value={{
      selectedCurrency,
      setSelectedCurrency: handleSetSelectedCurrency,
      formatCurrency,
      getCurrencySymbol,
      convertFromUSD,
      exchangeRate,
      lastUpdated,
      isLoading,
      error
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
