
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Filter } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface CategoryDropdownProps {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  language: string;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categoryFilter,
  setCategoryFilter,
  language
}) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'all':
        return language === 'ar' ? 'جميع الفئات' : language === 'de' ? 'Alle Kategorien' : 'All Categories';
      case 'strong':
        return language === 'ar' ? 'قوي (90+)' : language === 'de' ? 'Stark (90+)' : 'Strong (90+)';
      case 'valid':
        return language === 'ar' ? 'صحيح (80-89)' : language === 'de' ? 'Gültig (80-89)' : 'Valid (80-89)';
      case 'weak':
        return language === 'ar' ? 'ضعيف (70-79)' : language === 'de' ? 'Schwach (70-79)' : 'Weak (70-79)';
      default:
        return 'All Categories';
    }
  };

  const getTooltipText = (category: string) => {
    switch (category) {
      case 'strong':
        return language === 'ar' ? 'إشارات قوية بنقاط 90% أو أكثر' : 
               language === 'de' ? 'Starke Signale mit 90% oder mehr Punkten' : 
               'Strong signals with 90% or higher weighted final scores';
      case 'valid':
        return language === 'ar' ? 'إشارات صحيحة بنقاط 80-89%' : 
               language === 'de' ? 'Gültige Signale mit 80-89% Punkten' : 
               'Valid signals with 80-89% weighted final scores';
      case 'weak':
        return language === 'ar' ? 'إشارات ضعيفة بنقاط 70-79%' : 
               language === 'de' ? 'Schwache Signale mit 70-79% Punkten' : 
               'Weak signals with 70-79% weighted final scores';
      default:
        return language === 'ar' ? 'عرض جميع الإشارات بغض النظر عن القوة' : 
               language === 'de' ? 'Alle Signale unabhängig von der Stärke anzeigen' : 
               'Show all signals regardless of strength';
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-3">
        <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
        <div className="flex items-center space-x-2">
          <span className="text-slate-300 text-sm font-medium whitespace-nowrap">
            {language === 'ar' ? 'فئة القوة:' : language === 'de' ? 'Stärke-Kategorie:' : 'Strength Category:'}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white hover:bg-slate-600 focus:ring-2 focus:ring-emerald-400 transition-all duration-200 rounded-lg shadow-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600 rounded-lg shadow-xl z-50">
                    <SelectItem value="all" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">
                      🌐 {getCategoryLabel('all')}
                    </SelectItem>
                    <SelectItem value="strong" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">
                      💎 {getCategoryLabel('strong')}
                    </SelectItem>
                    <SelectItem value="valid" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">
                      ✅ {getCategoryLabel('valid')}
                    </SelectItem>
                    <SelectItem value="weak" className="hover:bg-slate-600 focus:bg-slate-600 rounded cursor-pointer">
                      ⚠️ {getCategoryLabel('weak')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-800 border-slate-600 text-slate-200 rounded-lg shadow-lg max-w-xs">
              <p className="text-xs">{getTooltipText(categoryFilter)}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CategoryDropdown;
