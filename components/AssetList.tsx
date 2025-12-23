import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AssetItem } from '../types';
import { formatRUB } from '../utils';

interface AssetListProps {
  data: AssetItem[];
  showPerformanceMode?: boolean; // If true, shows growth % instead of allocation %
}

const AssetList: React.FC<AssetListProps> = ({ data, showPerformanceMode = false }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['stocks', 'futures']));

  const toggleExpand = (id: string) => {
    const next = new Set(expandedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedIds(next);
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      {data.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedIds.has(item.id);
        
        // Mock performance calculation for demo: odd indices negative, even positive
        const isNegative = item.id.length % 2 === 0 && showPerformanceMode;
        const sign = isNegative ? '− ' : '+ ';
        const colorClass = showPerformanceMode 
          ? (isNegative ? 'text-red-500' : 'text-emerald-500') 
          : 'text-slate-900';

        return (
          <div key={item.id} className="rounded-lg bg-slate-50/50 transition-colors hover:bg-slate-100 border border-transparent hover:border-slate-100">
            <div 
              className={`
                flex items-center justify-between p-3 
                ${hasChildren ? 'cursor-pointer' : 'cursor-default'}
              `}
              onClick={() => hasChildren && toggleExpand(item.id)}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700 font-medium truncate pr-2">{item.name}</span>
              </div>
              
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-slate-900 tabular-nums hidden sm:block text-sm">
                  {formatRUB(item.value, true)}
                </span>
                <span className={`w-16 text-right font-medium text-sm ${colorClass}`}>
                  {showPerformanceMode ? sign : ''}{item.percent} %
                </span>
                <span className="text-slate-400 w-5 flex justify-center">
                  {hasChildren && (
                    isExpanded ? <ChevronDown size={16} /> : <ChevronDown size={16} className="-rotate-90" />
                  )}
                </span>
              </div>
            </div>

            {/* Children Rows */}
            {hasChildren && isExpanded && (
               <div className="bg-white/40 px-3 pb-2 pt-0">
                 {item.children!.map((child, idx) => {
                    const ticker = child.name.split(' ')[0].substring(0, 4).toUpperCase();
                    // Mock sub-performance: half positive, half negative
                    const isSubNeg = idx % 2 !== 0 && showPerformanceMode;
                    const subSign = isSubNeg ? '− ' : '+ ';
                    const subColor = showPerformanceMode 
                      ? (isSubNeg ? 'text-red-500' : 'text-emerald-500') 
                      : 'text-slate-900';

                    return (
                      <div key={idx} className="flex items-center justify-between py-2.5 pl-6 pr-0 border-t border-slate-100/50 group">
                         <div className="flex items-center gap-3 flex-1 min-w-0">
                           <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                             {ticker}
                           </div>
                           <span className="text-slate-600 text-sm truncate">{child.name}</span>
                         </div>
                         <div className="flex items-center gap-4 flex-shrink-0 text-sm">
                            <span className="text-slate-500 tabular-nums hidden sm:block">
                              {formatRUB(child.value, true)}
                            </span>
                            <span className={`w-16 text-right mr-5 font-medium ${subColor}`}>
                              {showPerformanceMode ? subSign : ''}{child.percent} %
                            </span>
                         </div>
                      </div>
                    );
                 })}
               </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AssetList;