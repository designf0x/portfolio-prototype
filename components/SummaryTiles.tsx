import React from 'react';
import { formatRUB } from '../utils';

interface SummaryTilesProps {
  portfolioValue: number;
  tradingResult: number;
}

const SummaryTiles: React.FC<SummaryTilesProps> = ({ portfolioValue, tradingResult }) => {
  const isPositive = tradingResult >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
      <div>
        <div className="text-slate-500 text-sm mb-1 font-medium">Стоимость портфеля</div>
        <div className="text-2xl font-bold text-slate-900 tracking-tight">
          {formatRUB(portfolioValue)}
        </div>
      </div>
      <div>
        <div className="text-slate-500 text-sm mb-1 font-medium">Торговый результат</div>
        <div className={`text-2xl font-bold tracking-tight ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
          {tradingResult > 0 ? '+' : tradingResult < 0 ? '− ' : ''} {formatRUB(Math.abs(tradingResult), true)}
        </div>
      </div>
    </div>
  );
};

export default SummaryTiles;