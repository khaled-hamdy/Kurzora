
import React from 'react';

interface SignalLegendProps {
  language: string;
}

const SignalLegend: React.FC<SignalLegendProps> = ({ language }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <span className="text-slate-400">{language === 'ar' ? 'المفتاح:' : language === 'de' ? 'Legende:' : 'Legend:'}</span>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 rounded border" style={{ backgroundColor: 'hsl(118, 95.3%, 49.8%)', borderColor: 'hsl(118, 95.3%, 49.8%)' }}></div>
        <span className="text-slate-300">💎 90-100 {language === 'ar' ? 'قوي' : language === 'de' ? 'Stark' : 'Strong'}</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 rounded border" style={{ backgroundColor: 'hsl(208, 77.3%, 72.4%)', borderColor: 'hsl(208, 77.3%, 72.4%)' }}></div>
        <span className="text-slate-300">✅ 80-89 {language === 'ar' ? 'صحيح' : language === 'de' ? 'Gültig' : 'Valid'}</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-4 h-4 bg-yellow-500 rounded border border-yellow-400"></div>
        <span className="text-slate-300">⚠️ 70-79 {language === 'ar' ? 'ضعيف' : language === 'de' ? 'Schwach' : 'Weak'}</span>
      </div>
    </div>
  );
};

export default SignalLegend;
