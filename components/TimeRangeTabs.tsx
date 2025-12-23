import React from 'react';

interface TimeRangeTabsProps {
  selected: string;
  onChange: (range: string) => void;
}

const RANGES = [
  { id: 'all', label: 'За все время' }, // All time
  { id: 'year', label: 'Год' },
  { id: 'ytd', label: 'С 1 января' },
  { id: '6m', label: '6 месяцев' },
  { id: '3m', label: '3 месяца' },
  { id: '1m', label: 'Месяц' },
  { id: '1w', label: 'Неделя' },
  { id: '1d', label: 'День' },
];

const TimeRangeTabs: React.FC<TimeRangeTabsProps> = ({ selected, onChange }) => {
  return (
    <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg w-full mb-6">
      {RANGES.map((range) => {
        const isActive = selected === range.id;
        return (
          <button
            key={range.id}
            onClick={() => onChange(range.id)}
            className={`
              flex-1 whitespace-nowrap text-center
              px-2 py-1.5 text-sm font-medium rounded-md transition-all duration-200
              ${isActive 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}
            `}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
};

export default TimeRangeTabs;