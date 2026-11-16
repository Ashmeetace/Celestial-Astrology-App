import React, { useState } from 'react';
import {
  X,
  Minus,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { KundliPrediction } from './KundliPrediction';
import { ComicOracle } from './ComicOracle';

interface FeatureWindowModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeFeature: 'kundli' | 'horoscope';
  onSwitchFeature: (feature: 'kundli' | 'horoscope') => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const FeatureWindowModal: React.FC<FeatureWindowModalProps> = ({
  isOpen,
  onClose,
  activeFeature,
  onSwitchFeature,
  isMinimized,
  onToggleMinimize,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isOpen) return null;

  // Minimized dock pill (visible when minimized so it looks separate but unobtrusive)
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-bottom-3 duration-200">
        <div className="flex items-center gap-2 p-1.5 rounded-full glass-panel bg-[#0B0B10]/90 border border-white/15 shadow-2xl shadow-violet-950/40">
          <div className="flex items-center gap-2 px-3 py-1 text-xs font-mono text-white">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Window Minimized:</span>
            <span className="text-violet-300 font-semibold">
              {activeFeature === 'kundli' ? 'Kundli Prediction' : 'Daily Horoscope'}
            </span>
          </div>

          <button
            onClick={onToggleMinimize}
            className="px-3.5 py-1 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Restore Window</span>
          </button>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            title="Close window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200 overflow-hidden">
      {/* The Separate Application Window Container */}
      <div
        className={`w-full flex flex-col rounded-3xl border border-white/15 bg-[#07070B] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-300 ${
          isMaximized
            ? 'h-[98vh] max-w-[99vw] rounded-2xl'
            : 'h-[92vh] max-w-6xl max-h-[860px]'
        }`}
      >
        {/* Window Top Titlebar with 3 Mac/Synapse Control Dots */}
        <div className="px-4 sm:px-6 py-3.5 bg-black/80 border-b border-white/10 flex items-center justify-between select-none shrink-0">
          {/* Left: Window Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:brightness-110 active:scale-90 transition-all border border-red-500/40 flex items-center justify-center group cursor-pointer"
              title="Close window"
            >
              <X className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={onToggleMinimize}
              className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] hover:brightness-110 active:scale-90 transition-all border border-yellow-500/40 flex items-center justify-center group cursor-pointer"
              title="Minimize window"
            >
              <Minus className="w-2.5 h-2.5 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3.5 h-3.5 rounded-full bg-[#27C93F] hover:brightness-110 active:scale-90 transition-all border border-green-500/40 flex items-center justify-center group cursor-pointer"
              title={isMaximized ? 'Restore size' : 'Maximize window'}
            >
              {isMaximized ? (
                <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
              ) : (
                <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>

            {/* Window Path / Title */}
            <div className="ml-3 hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-300 font-medium">celestial-stars-app</span>
              <span className="text-neutral-600">/</span>
              <span className="text-cyan-400">
                {activeFeature === 'kundli' ? 'kundli-prediction' : 'daily-horoscope'}
              </span>
            </div>
          </div>

          {/* Center Feature Quick Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/5">
            <button
              onClick={() => onSwitchFeature('kundli')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFeature === 'kundli'
                  ? 'bg-violet-600/40 text-white border border-violet-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-violet-300" />
              <span>1. Kundli Prediction</span>
            </button>

            <button
              onClick={() => onSwitchFeature('horoscope')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFeature === 'horoscope'
                  ? 'bg-cyan-600/40 text-white border border-cyan-500/50 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3 text-cyan-300" />
              <span>2. Daily Horoscope</span>
            </button>
          </div>

          {/* Right Status */}
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WINDOW ACTIVE</span>
          </div>
        </div>

        {/* Window Content: Multi-pane Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#050508]">
          {/* Left Pane inside the window (Dedicated Left Pane as requested) */}
          <div className="w-full md:w-64 lg:w-72 bg-[#08080D] border-b md:border-b-0 md:border-r border-white/10 p-4 sm:p-5 flex flex-col justify-between shrink-0 select-none">
            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 px-2">
                Astrology Features
              </div>

              {/* Feature 1: Kundli Prediction */}
              <button
                onClick={() => onSwitchFeature('kundli')}
                className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                  activeFeature === 'kundli'
                    ? 'bg-violet-600/25 border border-violet-500/50 shadow-lg text-white'
                    : 'bg-white/[0.02] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      activeFeature === 'kundli'
                        ? 'bg-violet-500/30 text-violet-200'
                        : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-sans font-medium text-white">
                      Kundli Prediction
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500">
                      Feature 01 // Vedic Chart
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 ${
                    activeFeature === 'kundli' ? 'text-violet-400' : 'text-neutral-600'
                  }`}
                />
              </button>

              {/* Feature 2: Daily Horoscope */}
              <button
                onClick={() => onSwitchFeature('horoscope')}
                className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                  activeFeature === 'horoscope'
                    ? 'bg-cyan-600/25 border border-cyan-500/50 shadow-lg text-white'
                    : 'bg-white/[0.02] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      activeFeature === 'horoscope'
                        ? 'bg-cyan-500/30 text-cyan-200'
                        : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-sans font-medium text-white">
                      Daily Horoscope
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500">
                      Feature 02 // Comic Insights
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 ${
                    activeFeature === 'horoscope' ? 'text-cyan-400' : 'text-neutral-600'
                  }`}
                />
              </button>
            </div>

            {/* Window Footer Action */}
            <div className="pt-3 border-t border-white/5 hidden md:block">
              <button
                onClick={onClose}
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-mono transition-colors text-center cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>

          {/* Right/Main Content Area of Window (scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 scrollbar-thin">
            {activeFeature === 'kundli' ? (
              <KundliPrediction onSwitchToHoroscope={() => onSwitchFeature('horoscope')} />
            ) : (
              <ComicOracle onSelectAstrologer={onClose} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
