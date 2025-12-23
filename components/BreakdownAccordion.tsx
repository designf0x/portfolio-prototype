import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BreakdownItem } from '../types';
import { formatRUB } from '../utils';

interface BreakdownAccordionProps {
  data: BreakdownItem[];
  onAssetChangeClick?: () => void;
}

const BreakdownAccordion: React.FC<BreakdownAccordionProps> = ({ data, onAssetChangeClick }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['2', '3', '4']));

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
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Из чего складывается</h3>
      <div className="flex flex-col gap-3">
        {data.map((item) => {
          const isExpanded = expandedIds.has(item.id);
          const hasChildren = item.children && item.children.length > 0;
          const isAssetChange = item.id === '1';
          
          return (
            <div 
              key={item.id} 
              className={`
                bg-slate-50 rounded-lg overflow-hidden border border-slate-100 transition-all duration-200
                ${isAssetChange ? 'hover:border-blue-400 hover:bg-white cursor-pointer active:scale-[0.99] ring-offset-2 hover:ring-2 hover:ring-blue-100' : ''}
              `}
              onClick={() => {
                if (isAssetChange && onAssetChangeClick) {
                  onAssetChangeClick();
                } else if (hasChildren) {
                  toggleExpand(item.id);
                }
              }}
            >
              <div 
                className={`
                  flex items-center justify-between p-4
                  ${hasChildren ? 'cursor-pointer' : 'cursor-default'}
                `}
              >
                <span className="text-slate-700 font-medium">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className={`font-semibold ${item.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                    {item.value > 0 ? '+' : item.value < 0 ? '− ' : ''} {formatRUB(Math.abs(item.value), false)} ₽
                  </span>
                  {hasChildren && (
                    <span className="text-slate-400">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  )}
                </div>
              </div>

              {/* Sub-rows */}
              {hasChildren && isExpanded && (
                <div className="bg-white border-t border-slate-100 px-4 py-3 grid grid-cols-2 gap-y-2">
                  {item.children!.map((child, idx) => (
                    <div key={idx} className="flex flex-col">
                       <span className="text-slate-500 text-sm mb-0.5">{child.label}</span>
                       <span className="text-slate-900 font-medium">
                        {child.value > 0 ? '+' : child.value < 0 ? '− ' : ''} {formatRUB(Math.abs(child.value), false)} ₽
                       </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BreakdownAccordion;