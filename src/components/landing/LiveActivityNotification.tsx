
import React, { useState, useEffect } from 'react';

interface Signal {
  id: number;
  content: string;
  time: string;
}

const signals: Signal[] = [
  {
    id: 1,
    content: 'NVDA signal triggered • +2.3% setup detected',
    time: '2 minutes ago'
  },
  {
    id: 2,
    content: 'AAPL momentum signal • Score: 87/100',
    time: '5 minutes ago'
  },
  {
    id: 3,
    content: 'TSLA breakout detected • +3.1% potential',
    time: '8 minutes ago'
  },
  {
    id: 4,
    content: 'AMD reversal pattern • High probability setup',
    time: '12 minutes ago'
  }
];

const LiveActivityNotification: React.FC = () => {
  const [currentSignal, setCurrentSignal] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Hide after 8 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 8000);

      return () => clearTimeout(hideTimer);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Rotate signals every 30 seconds
    const interval = setInterval(() => {
      setCurrentSignal((prev) => (prev + 1) % signals.length);
      setIsVisible(true);
      
      // Hide after showing for 8 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 8000);
    }, 30000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const signal = signals[currentSignal];

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-fade-in">
      <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 rounded-lg p-3 pr-4 shadow-lg max-w-xs sm:max-w-sm">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <p className="text-sm text-slate-200">
            <span className="font-medium">{signal.content.split(' ')[0]}</span> {signal.content.substring(signal.content.indexOf(' ') + 1)}
          </p>
        </div>
        <p className="text-xs text-slate-400 mt-1">{signal.time}</p>
      </div>
    </div>
  );
};

export default LiveActivityNotification;
