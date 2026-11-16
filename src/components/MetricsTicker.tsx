import React from 'react';
import { METRICS_TICKER_ITEMS } from '../data/astrologyData';

export const MetricsTicker: React.FC = () => {
  // Duplicate array items for seamless infinite marquee loop
  const marqueeItems = [...METRICS_TICKER_ITEMS, ...METRICS_TICKER_ITEMS, ...METRICS_TICKER_ITEMS];

  return (
    <div className="w-full h-[60px] bg-black/40 border-y border-white/5 overflow-hidden flex items-center relative z-20 backdrop-blur-sm select-none">
      {/* Edge gradient mask for smooth fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#030303] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#030303] to-transparent z-10" />

      {/* Scrolling container */}
      <div className="animate-marquee flex items-center gap-10 sm:gap-14">
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 whitespace-nowrap">
              {item.label}
            </span>
            <span className="text-neutral-700 text-xs">/</span>
            <span className={`text-xs sm:text-sm font-mono tracking-wide ${item.color} font-medium whitespace-nowrap`}>
              {item.value}
            </span>
            <span className="text-neutral-800 ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
