import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AssetItem } from '../types';

interface DonutChartProps {
  data: AssetItem[];
  centerLabel?: string;
  centerSubLabel?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, centerLabel, centerSubLabel }) => {
  // Default to the first item (largest) if no specific label is provided
  const topItem = data[0];
  const displayLabel = centerLabel || (topItem ? `${topItem.percent} %` : '');
  const displaySubLabel = centerSubLabel || (topItem ? topItem.name.toLowerCase() : '');

  return (
    <div className="h-[300px] relative flex justify-center items-center">
      {/* Center Label - Rendered first so it sits behind the chart layers (including tooltip) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-8 text-center">
        <span className="text-3xl font-bold text-slate-900">{displayLabel}</span>
        <span className="text-slate-500 text-sm truncate w-full px-2">{displaySubLabel}</span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            paddingAngle={2}
            dataKey="percent"
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                strokeWidth={0} 
                style={{ outline: 'none' }}
              />
            ))}
          </Pie>
          <Tooltip 
             formatter={(value: number) => `${value} %`}
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
             wrapperStyle={{ zIndex: 1000 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;