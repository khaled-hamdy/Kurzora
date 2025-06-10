
import React from 'react';
import { Activity } from 'lucide-react';
import { Switch } from '../ui/switch';

interface SignalHeatmapHeaderProps {
  language: string;
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
}

const SignalHeatmapHeader: React.FC<SignalHeatmapHeaderProps> = ({
  language,
  autoRefresh,
  setAutoRefresh
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      {/* Left: Title */}
      <div className="text-xl text-white flex items-center space-x-3">
        <Activity className="h-6 w-6 text-emerald-400" />
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span>{language === 'ar' ? 'خريطة إشارات الشراء الحرارية' : language === 'de' ? 'BUY Signal Heatmap' : 'BUY Signal Heatmap'}</span>
        </div>
      </div>

      {/* Center: Last Updated */}
      <div className="flex-1 text-center">
        <div className="text-slate-300 font-medium">
          {language === 'ar' ? 'آخر تحديث: منذ دقيقتين' : language === 'de' ? 'Zuletzt aktualisiert: vor 2 Min.' : 'Last Updated: 2 min ago'}
        </div>
      </div>

      {/* Right: Auto Refresh Toggle */}
      <div className="flex items-center space-x-3">
        <span className="text-slate-300 font-medium">
          {language === 'ar' ? 'التحديث التلقائي:' : language === 'de' ? 'Auto-Refresh:' : 'Auto-refresh:'}
        </span>
        <Switch
          checked={autoRefresh}
          onCheckedChange={setAutoRefresh}
          className="data-[state=checked]:bg-emerald-600"
        />
        <span className={`font-bold ${autoRefresh ? 'text-emerald-400' : 'text-slate-500'}`}>
          {autoRefresh ? (language === 'ar' ? 'مفعل' : language === 'de' ? 'EIN' : 'ON') : (language === 'ar' ? 'مطفأ' : language === 'de' ? 'AUS' : 'OFF')}
        </span>
      </div>
    </div>
  );
};

export default SignalHeatmapHeader;
