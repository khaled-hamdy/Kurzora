
import React, { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';

const MarketStatus: React.FC = () => {
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Simple market hours check (9:30 AM - 4:00 PM EST, Monday-Friday)
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const totalMinutes = hour * 60 + minute;
      
      const isWeekday = day >= 1 && day <= 5;
      const isMarketHours = totalMinutes >= 570 && totalMinutes < 960; // 9:30 AM to 4:00 PM
      
      setIsMarketOpen(isWeekday && isMarketHours);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <Circle 
        className={`h-2 w-2 fill-current ${isMarketOpen ? 'text-emerald-500' : 'text-red-500'}`}
      />
      <span className={`text-sm font-medium ${isMarketOpen ? 'text-emerald-400' : 'text-red-400'}`}>
        Market {isMarketOpen ? 'Open' : 'Closed'}
      </span>
      <span className="text-xs text-slate-400">
        {currentTime.toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        })} EST
      </span>
    </div>
  );
};

export default MarketStatus;
