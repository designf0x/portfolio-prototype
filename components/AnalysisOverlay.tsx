import React from 'react';
import { X, Settings, ArrowLeft, Home, Briefcase, PieChart as ChartIcon, Clock } from 'lucide-react';
import TimeRangeTabs from './TimeRangeTabs';
import AssetList from './AssetList';
import AssetStructurePanel from './AssetStructurePanel';
import { AssetItem } from '../types';

interface AnalysisOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  timeRange: string;
  setTimeRange: (range: string) => void;
  assetData: AssetItem[];
}

const AnalysisOverlay: React.FC<AnalysisOverlayProps> = ({ 
  isOpen, 
  onClose, 
  timeRange, 
  setTimeRange, 
  assetData 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full h-full max-w-[1400px] bg-white rounded-2xl shadow-2xl overflow-hidden flex animate-in fade-in zoom-in duration-300">
        
        {/* Left Mini Sidebar */}
        <div className="w-16 border-r border-slate-100 flex flex-col items-center py-6 gap-6 bg-slate-50/50">
          <div className="p-2 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
            <Home size={24} />
          </div>
          <div className="p-2 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
            <Briefcase size={24} />
          </div>
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg cursor-pointer">
            <ChartIcon size={24} />
          </div>
          <div className="p-2 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors mt-auto">
            <Clock size={24} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-4">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-slate-900">Как менялся портфель</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-slate-600">
                <Settings size={20} />
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body Split */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            {/* Detailed Performance List */}
            <div className="flex-[1.5] p-6 overflow-y-auto border-r border-slate-100">
              <div className="max-w-3xl">
                <TimeRangeTabs selected={timeRange} onChange={setTimeRange} />
                <div className="mt-4">
                  <AssetList data={assetData} showPerformanceMode={true} />
                </div>
              </div>
            </div>

            {/* Structure Preview Panel */}
            <div className="flex-1 p-6 bg-slate-50/20 overflow-y-auto">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <AssetStructurePanel compactMode={true} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisOverlay;