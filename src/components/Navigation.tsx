import React, { useState } from 'react';
import { Sparkles, Layers, Menu, X } from 'lucide-react';

interface NavigationProps {
  onOpenKundli: () => void;
  onOpenHoroscope: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenKundli,
  onOpenHoroscope,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[672px]">
        <nav className="glass-pill rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl shadow-violet-950/20 flex items-center justify-between">
          {/* Left-aligned logo */}
          <a
            href="#"
            className="flex items-center gap-2 group cursor-pointer text-white no-underline shrink-0"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-violet-500 via-purple-400 to-cyan-400 shadow-[0_0_10px_#8b5cf6] animate-pulse" />
              <span className="absolute -inset-1 rounded-full bg-violet-500/20 blur-sm pointer-events-none" />
            </div>
            <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-white group-hover:text-violet-200 transition-colors">
              Celestial Stars
            </span>
          </a>

          {/* Top Bar: ONLY Kundli Prediction and Daily Horoscope */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenKundli}
              className="text-xs uppercase font-sans font-medium tracking-wider text-neutral-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Kundli Prediction</span>
            </button>

            <button
              onClick={onOpenHoroscope}
              className="text-xs uppercase font-sans font-medium tracking-wider text-neutral-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Daily Horoscope</span>
            </button>
          </div>

          {/* Right Action CTA Pill: Opens Kundli Prediction */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenKundli}
              className="bg-white hover:bg-neutral-200 active:scale-95 text-black font-sans text-xs font-semibold tracking-tight px-4 sm:px-5 py-2 rounded-full transition-all duration-200 shadow-[0_0_16px_rgba(255,255,255,0.25)] flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-600 fill-violet-600" />
              <span>Predict Kundli</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-1.5 text-neutral-400 hover:text-white rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown with ONLY Kundli Prediction and Daily Horoscope */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 rounded-3xl glass-panel border border-white/10 shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => {
                onOpenKundli();
                setMobileMenuOpen(false);
              }}
              className="text-xs uppercase font-sans font-medium tracking-wider text-neutral-200 hover:text-white px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2.5 text-left cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Kundli Prediction</span>
            </button>

            <button
              onClick={() => {
                onOpenHoroscope();
                setMobileMenuOpen(false);
              }}
              className="text-xs uppercase font-sans font-medium tracking-wider text-neutral-200 hover:text-white px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2.5 text-left cursor-pointer"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Daily Horoscope</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};
