import React, { useState, useMemo } from 'react';
import DonutChart from './DonutChart';
import AssetList from './AssetList';
import { AssetItem } from '../types';
import { COLORS } from '../utils';

// --- Mock Data: Asset Classes ---
export const ASSET_DATA: AssetItem[] = [
  { 
    id: 'stocks', 
    name: 'Акции', 
    value: 607510075.09, 
    percent: 25, 
    color: COLORS[0],
    children: [
      { name: 'SBER Сбербанк', value: 243004030.04, percent: 10 },
      { name: 'GAZP Газпром', value: 194403224.03, percent: 8 },
      { name: 'LKOH Лукойл', value: 121502015.02, percent: 5 },
      { name: 'YNDX Яндекс', value: 48600806.00, percent: 2 },
    ]
  },
  { 
    id: 'blocked', 
    name: 'Заблокированные активы', 
    value: 364506045.05, 
    percent: 15, 
    color: COLORS[1],
    children: [
      { name: 'AAPL Apple Inc.', value: 121502015.02, percent: 5 },
      { name: 'TSLA Tesla Inc.', value: 121502015.02, percent: 5 },
      { name: 'AMZN Amazon.com', value: 121502015.01, percent: 5 },
    ]
  },
  { 
    id: 'bonds', 
    name: 'Облигации', 
    value: 291604836.04, 
    percent: 12, 
    color: COLORS[2],
    children: [
       { name: 'SU26238RMFS4 ОФЗ 26238', value: 145802418.02, percent: 6 },
       { name: 'SU26230RMFS1 ОФЗ 26230', value: 145802418.02, percent: 6 },
    ]
  },
  { 
    id: 'funds', 
    name: 'Фонды', 
    value: 243004030.04, 
    percent: 10, 
    color: COLORS[3],
    children: [
      { name: 'TMOS Индекс МосБиржи', value: 121502015.02, percent: 5 },
      { name: 'TGLD Золото', value: 121502015.02, percent: 5 },
    ]
  },
  { id: 'struct', name: 'Структурные продукты', value: 194403224.03, percent: 8, color: COLORS[4] },
  { 
    id: 'futures', 
    name: 'Фьючерсы', 
    value: 194403224.03, 
    percent: 8, 
    color: COLORS[5],
    children: [
      { name: 'MIX 12.25 Индекс мосбиржи', value: 97201612.03, percent: 4 },
      { name: 'LKOH 12.25 Лукойл', value: 97201612.00, percent: 4 },
    ]
  },
  { id: 'currency', name: 'Валюта', value: 170102821.03, percent: 7, color: COLORS[7] },
  { id: 'deposits', name: 'Депозитарные расписки', value: 145802418.02, percent: 6, color: COLORS[8] },
  { id: 'metals', name: 'Драгоценные металлы', value: 121502015.02, percent: 5, color: COLORS[9] },
  { id: 'options', name: 'Опционы', value: 97201612.01, percent: 4, color: COLORS[10] },
];

const CURRENCY_DATA: AssetItem[] = [
  { 
    id: 'rub', 
    name: 'Российский рубль', 
    value: 1409423374.21, 
    percent: 58, 
    color: COLORS[0],
    children: [
      { name: 'Рубль (Наличные)', value: 409423374.21, percent: 18 },
      { name: 'Рубль (Счета)', value: 1000000000.00, percent: 40 },
    ]
  },
  { id: 'usd', name: 'Доллар США', value: 534608866.08, percent: 22, color: COLORS[2] },
  { id: 'cny', name: 'Китайский юань', value: 291604836.04, percent: 12, color: COLORS[1] },
  { id: 'eur', name: 'Евро', value: 121502015.02, percent: 5, color: COLORS[3] },
  { id: 'hkd', name: 'Гонконгский доллар', value: 48600806.01, percent: 2, color: COLORS[4] },
  { id: 'try', name: 'Турецкая лира', value: 24300403.00, percent: 1, color: COLORS[6] },
];

const INDUSTRY_DATA: AssetItem[] = [
  { id: 'energy', name: 'Энергетика', value: 729012090.11, percent: 30, color: COLORS[5] },
  { id: 'finance', name: 'Финансы', value: 607510075.09, percent: 25, color: COLORS[3] },
  { id: 'it', name: 'IT и технологии', value: 486008060.07, percent: 20, color: COLORS[2] },
  { id: 'materials', name: 'Сырье и материалы', value: 364506045.05, percent: 15, color: COLORS[1] },
  { id: 'consumer', name: 'Потребительский сектор', value: 243004030.04, percent: 10, color: COLORS[0] },
];

const TABS = [
  { id: 'classes', label: 'По классам' },
  { id: 'currency', label: 'Валюты' },
  { id: 'industries', label: 'По отраслям' },
];

interface AssetStructurePanelProps {
  compactMode?: boolean;
}

const AssetStructurePanel: React.FC<AssetStructurePanelProps> = ({ compactMode = false }) => {
  const [activeTab, setActiveTab] = useState('classes');

  const currentData = useMemo(() => {
    switch (activeTab) {
      case 'currency':
        return CURRENCY_DATA;
      case 'industries':
        return INDUSTRY_DATA;
      default:
        return ASSET_DATA;
    }
  }, [activeTab]);

  return (
    <div className="h-full flex flex-col">
      <h2 className={`font-bold text-slate-900 ${compactMode ? 'text-base mb-2' : 'text-lg mb-4'}`}>
        Структура активов
      </h2>
      
      <div className="flex gap-1 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors
              ${activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={`${compactMode ? 'scale-90 -mt-4 -mb-4' : ''}`}>
        <DonutChart data={currentData} />
      </div>
      
      <AssetList data={currentData} />
    </div>
  );
};

export default AssetStructurePanel;