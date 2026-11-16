import React from 'react';
import { Compass, Sparkles, Shield, Terminal, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5 pt-20 pb-12 px-4 sm:px-6 z-20">
      <div className="max-w-7xl mx-auto">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/5">
          {/* Brand Column (takes 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-violet-500 via-purple-400 to-cyan-400 shadow-[0_0_12px_#8b5cf6]" />
              <span className="font-serif text-3xl font-normal tracking-tight text-white">
                Celestial Stars
              </span>
            </div>

            <p className="font-sans text-neutral-400 text-sm font-light max-w-sm leading-relaxed">
              Predict your future and daily horoscope with personalised comic insights.
              Merging ancient Vedic astrometry with celestial planetary movements
              and episodic graphic narratives.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-white/5 text-neutral-300 border border-white/10">
                VEDIC ASTROLOGY
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-violet-600/15 text-violet-300 border border-violet-500/20">
                COMIC INSIGHTS
              </span>
            </div>
          </div>

          {/* Column 1: Constellations & Horoscopes */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4">
              Zodiac Ephemeris
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-neutral-400">
              <li>
                <a href="#oracle" className="hover:text-white transition-colors">Daily Comic Horoscopes</a>
              </li>
              <li>
                <a href="#oracle" className="hover:text-white transition-colors">Love Synastry Matrix</a>
              </li>
              <li>
                <a href="#oracle" className="hover:text-white transition-colors">Career Velocity Forecast</a>
              </li>
              <li>
                <a href="#oracle" className="hover:text-white transition-colors">Saturn Return Protocols</a>
              </li>
              <li>
                <a href="#oracle" className="hover:text-white transition-colors">Karmic Moon Node Maps</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Star Council */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4">
              Star Council
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-neutral-400">
              <li>
                <a href="#astrologers" className="hover:text-white transition-colors">Verified Astrologers</a>
              </li>
              <li>
                <a href="#astrologers" className="hover:text-white transition-colors">Hellenistic Oracles</a>
              </li>
              <li>
                <a href="#astrologers" className="hover:text-white transition-colors">Vedic Kundali Masters</a>
              </li>
              <li>
                <a href="#astrologers" className="hover:text-white transition-colors">Astro-Comic Illustrators</a>
              </li>
              <li>
                <a href="#astrologers" className="hover:text-white transition-colors">Book 1-on-1 Consultation</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Telemetry */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4">
              Vedic & Planetary
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-neutral-400">
              <li>
                <a href="#kundli" className="hover:text-white transition-colors">Vedic Kundli Prediction</a>
              </li>
              <li>
                <a href="#planetary" className="hover:text-white transition-colors">Planetary Orrery Live</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Retrograde Early Radar</a>
              </li>
              <li>
                <a href="#oracle" className="hover:text-white transition-colors">Planetary Transits</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Privacy & Chart Sanctuary</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright on left, 'All Systems Operational' emerald status indicator with pulsing dot on right */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-sans text-neutral-500 font-light">
            © 2026 Celestial Stars Inc. Transmitting from the Kuiper Belt. All cosmic rights reserved.
          </p>

          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/5 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-medium">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
