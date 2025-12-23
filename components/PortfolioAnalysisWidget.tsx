
import React, { useState } from 'react';
// Fix: Import PieChart as ChartIcon from lucide-react to resolve "Cannot find name 'ChartIcon'" error
import { X, Settings, PieChart as ChartIcon } from 'lucide-react';
import TimeRangeTabs from './TimeRangeTabs';
import SummaryTiles from './SummaryTiles';
import PerformanceAreaChart from './PerformanceAreaChart';
import BreakdownAccordion from './BreakdownAccordion';
import AssetStructurePanel, { ASSET_DATA } from './AssetStructurePanel';
import AnalysisOverlay from './AnalysisOverlay';
import { ChartDataPoint, BreakdownItem } from '../types';

// Mock Data Definitions
const PORTFOLIO_VALUE = 2430040300.36;

// Chart Data
const MOCK_DATA: Record<string, { tradingResult: number; data: ChartDataPoint[] }> = {
  'all': {
    tradingResult: 92344455,
    data: [
      { day: '01', value: 10, percent: 1.2, tradingValue: 24000000 },
      { day: '04', value: 15, percent: 1.8, tradingValue: 36000000 },
      { day: '08', value: 20, percent: 2.1, tradingValue: 48000000 },
      { day: '12', value: 18, percent: 1.9, tradingValue: 43000000 },
      { day: '16', value: 17, percent: 1.7, tradingValue: 40000000 },
      { day: '20', value: 22, percent: 2.5, tradingValue: 52000000 },
      { day: '24', value: 35, percent: 3.8, tradingValue: 84000000 },
      { day: '28', value: 38, percent: 4.0, tradingValue: 92344455 },
    ]
  },
  'year': {
    tradingResult: 85200100,
    data: [
      { day: 'Янв', value: 5, percent: 0.5, tradingValue: 12000000 },
      { day: 'Мар', value: 12, percent: 1.2, tradingValue: 28000000 },
      { day: 'Май', value: 18, percent: 1.8, tradingValue: 43000000 },
      { day: 'Июл', value: 25, percent: 2.5, tradingValue: 60000000 },
      { day: 'Сен', value: 22, percent: 2.2, tradingValue: 52000000 },
      { day: 'Ноя', value: 30, percent: 3.0, tradingValue: 72000000 },
      { day: 'Дек', value: 35, percent: 3.5, tradingValue: 85200100 },
    ]
  },
  'ytd': {
    tradingResult: 78000000,
    data: [
      { day: '01', value: 2, percent: 0.2, tradingValue: 4000000 },
      { day: '05', value: 8, percent: 0.8, tradingValue: 19000000 },
      { day: '10', value: 15, percent: 1.5, tradingValue: 36000000 },
      { day: '15', value: 22, percent: 2.2, tradingValue: 52000000 },
      { day: '20', value: 28, percent: 2.8, tradingValue: 67000000 },
      { day: '25', value: 32, percent: 3.2, tradingValue: 78000000 },
    ]
  },
  '6m': {
    tradingResult: 48780000,
    data: [
      { day: 'Июн', value: 0.5, percent: 0.05, tradingValue: 1200000 },
      { day: 'Июл', value: 1.2, percent: 0.12, tradingValue: 2900000 },
      { day: 'Авг', value: 1.5, percent: 0.15, tradingValue: 3600000 },
      { day: 'Сен', value: 1.1, percent: 0.11, tradingValue: 2600000 },
      { day: 'Окт', value: 1.8, percent: 0.18, tradingValue: 4300000 },
      { day: 'Ноя', value: 2.01, percent: 0.20, tradingValue: 48780000 },
    ]
  },
  '3m': {
    tradingResult: 21350000,
    data: [
      { day: '01', value: 0.2, percent: 0.02, tradingValue: 480000 },
      { day: '15', value: 0.4, percent: 0.04, tradingValue: 960000 },
      { day: '30', value: 0.3, percent: 0.03, tradingValue: 720000 },
      { day: '45', value: 0.6, percent: 0.06, tradingValue: 1440000 },
      { day: '60', value: 0.7, percent: 0.07, tradingValue: 1680000 },
      { day: '90', value: 0.88, percent: 0.09, tradingValue: 21350000 },
    ]
  },
  '1m': {
    tradingResult: -6350000,
    data: [
      { day: '01', value: 0.1, percent: 0.01, tradingValue: 240000 },
      { day: '05', value: -0.05, percent: -0.005, tradingValue: -120000 },
      { day: '10', value: -0.1, percent: -0.01, tradingValue: -240000 },
      { day: '15', value: -0.15, percent: -0.015, tradingValue: -360000 },
      { day: '20', value: -0.2, percent: -0.02, tradingValue: -480000 },
      { day: '25', value: -0.26, percent: -0.026, tradingValue: -6350000 },
    ]
  },
  '1w': {
    tradingResult: 2840000,
    data: [
      { day: 'Пн', value: 0.02, percent: 0.002, tradingValue: 48000 },
      { day: 'Вт', value: 0.04, percent: 0.004, tradingValue: 96000 },
      { day: 'Ср', value: 0.03, percent: 0.003, tradingValue: 72000 },
      { day: 'Чт', value: 0.08, percent: 0.008, tradingValue: 192000 },
      { day: 'Пт', value: 0.12, percent: 0.012, tradingValue: 2840000 },
    ]
  },
  '1d': {
    tradingResult: -415000,
    data: [
      { day: '10:00', value: 0, percent: 0, tradingValue: 0 },
      { day: '12:00', value: -0.01, percent: -0.001, tradingValue: -200000 },
      { day: '14:00', value: -0.005, percent: -0.0005, tradingValue: -100000 },
      { day: '16:00', value: -0.015, percent: -0.0015, tradingValue: -300000 },
      { day: '18:00', value: -0.02, percent: -0.002, tradingValue: -415000 },
    ]
  },
};

// Breakdown Data Helper
const createBreakdown = (
  assetChange: number, 
  commissions: number, 
  coupons: number, 
  deposits: number
): BreakdownItem[] => [
  {
    id: '1',
    label: 'Изменение активов',
    value: assetChange,
    isPositive: assetChange >= 0,
  },
  {
    id: '2',
    label: 'Комиссии и налоги',
    value: commissions,
    isPositive: commissions >= 0,
    children: [
      { label: 'Комиссии', value: commissions * 0.1 },
      { label: 'Налоги', value: commissions * 0.9 },
    ],
  },
  {
    id: '3',
    label: 'Купоны и дивиденды',
    value: coupons,
    isPositive: true,
    children: [
      { label: 'Купоны', value: coupons * 0.3 },
      { label: 'Дивиденды', value: coupons * 0.7 },
    ],
  },
  {
    id: '4',
    label: 'Пополнения и выводы',
    value: deposits,
    isPositive: deposits >= 0,
    children: [
      { label: 'Пополнения', value: Math.abs(deposits * 2) },
      { label: 'Выводы', value: -Math.abs(deposits) },
    ],
  },
];

// Breakdown Data Dictionary
const MOCK_BREAKDOWN: Record<string, BreakdownItem[]> = {
  'all': createBreakdown(89500000, -1345545, 1345345, 2844655),
  'year': createBreakdown(82000000, -1100000, 1100000, 3200000),
  'ytd': createBreakdown(76000000, -950000, 950000, 2000000),
  '6m': createBreakdown(50000000, -2000000, 780000, 2100000),
  '3m': createBreakdown(22000000, -1000000, 350000, 1000000),
  '1m': createBreakdown(-6000000, -350000, 0, 500000),
  '1w': createBreakdown(3000000, -160000, 0, -10000),
  '1d': createBreakdown(-400000, -15000, 0, 0),
};

const PortfolioAnalysisWidget: React.FC = () => {
  const [timeRange, setTimeRange] = useState('all');
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

  // Select data based on timeRange or fallback to 'all'
  const currentData = MOCK_DATA[timeRange] || MOCK_DATA['all'];
  const currentBreakdown = MOCK_BREAKDOWN[timeRange] || MOCK_BREAKDOWN['all'];
  const isPositive = currentData.tradingResult >= 0;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 flex justify-center items-start">
      <div className="w-full max-w-[1400px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
                 <ChartIcon size={18} />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Анализ портфеля</h1>
           </div>
           <div className="flex items-center gap-2 text-slate-400">
             <Settings className="w-5 h-5 cursor-pointer hover:text-slate-600" />
             <X className="w-5 h-5 cursor-pointer hover:text-slate-600" />
           </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          
          {/* Left Column (Performance) */}
          <div className="w-full lg:w-[60%] p-6 lg:p-8">
            <TimeRangeTabs selected={timeRange} onChange={setTimeRange} />
            <SummaryTiles 
              portfolioValue={PORTFOLIO_VALUE} 
              tradingResult={currentData.tradingResult} 
            />
            <PerformanceAreaChart 
              data={currentData.data} 
              isPositive={isPositive} 
            />
            <BreakdownAccordion 
              data={currentBreakdown} 
              onAssetChangeClick={() => setIsAnalysisOpen(true)}
            />
          </div>

          {/* Right Column (Structure) */}
          <div className="w-full lg:w-[40%] p-6 lg:p-8 bg-slate-50/30">
            <AssetStructurePanel />
          </div>

        </div>
      </div>

      {/* Analysis Overlay (The Modal from the second screenshot) */}
      <AnalysisOverlay 
        isOpen={isAnalysisOpen} 
        onClose={() => setIsAnalysisOpen(false)}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        assetData={ASSET_DATA}
      />
    </div>
  );
};

export default PortfolioAnalysisWidget;
