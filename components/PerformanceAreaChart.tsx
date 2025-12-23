import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';
import { formatRUB } from '../utils';

interface PerformanceAreaChartProps {
  data: ChartDataPoint[];
  isPositive?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload as ChartDataPoint;
    const tradingVal = dataPoint.tradingValue ?? 0;
    const isPos = tradingVal >= 0;

    return (
      <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-100 text-sm">
        <p className="text-slate-500 mb-1">{`${label} декабря 2025`}</p>
        <p className={`font-semibold mb-0.5 ${isPos ? 'text-slate-900' : 'text-slate-900'}`}>
           {tradingVal > 0 ? '+' : tradingVal < 0 ? '− ' : ''} {formatRUB(Math.abs(tradingVal), true)}
        </p>
        <p className={`${dataPoint.value >= 0 ? 'text-emerald-500' : 'text-red-500'} font-medium`}>
          {dataPoint.value > 0 ? '+' : dataPoint.value < 0 ? '− ' : ''} {Math.abs(dataPoint.value).toFixed(2).replace('.', ',')} %
        </p>
      </div>
    );
  }
  return null;
};

const PerformanceAreaChart: React.FC<PerformanceAreaChartProps> = ({ data, isPositive = true }) => {
  const color = isPositive ? '#10B981' : '#EF4444'; // Green or Red
  const gradientId = isPositive ? "colorValueGreen" : "colorValueRed";

  return (
    <div className="w-full mb-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Как менялся портфель</h3>
      
      {/* Chart container with fixed height ensures layout stability and prevents overflow onto next section */}
      <div className="h-[320px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorValueGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorValueRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              orientation="right" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              tickFormatter={(val) => `${val} %`}
              // Auto domain to handle negative values if needed
              domain={['auto', 'auto']}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ stroke: '#64748B', strokeWidth: 1, strokeDasharray: '4 4' }}
              wrapperStyle={{ zIndex: 1000 }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#${gradientId})`} 
              activeDot={{ r: 6, strokeWidth: 0, fill: color }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceAreaChart;