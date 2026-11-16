import React from 'react';
import { ShinyButton } from './ShinyButton';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStartedKundli: () => void;
  onExploreHoroscope: () => void;
  onExploreAstrologers?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStartedKundli, onExploreHoroscope, onExploreAstrologers }) => {
  return (
    <section className="relative min-h-[88vh] flex flex-col items-center justify-center pt-32 pb-16 px-4 sm:px-6 overflow-hidden text-center">
      {/* Background radial gradients as specified:
          - Radial gradient at top-center (#8b5cf6/40)
          - Radial gradient at left-center (#06b6d4/0.08)
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[550px] rounded-full blur-[110px] opacity-75"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.05) 60%, transparent 80%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full blur-[130px] opacity-60"
        style={{
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0.02) 65%, transparent 85%)',
        }}
      />

      {/* Floating Ambient Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-28 right-[15%] w-44 h-44 rounded-full blur-[70px] bg-violet-600/30 animate-float-orb-1"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 left-[12%] w-56 h-56 rounded-full blur-[80px] bg-cyan-500/20 animate-float-orb-2"
      />

      {/* Ambient Celestial Grid / Star dust */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top Status Pill / Micro announcement */}
      <div className="relative z-10 mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-lg shadow-violet-950/20">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300">
          Vedic Kundli &amp; Daily Horoscopes
        </span>
      </div>

      {/* Massive font-serif heading with leading-0.9 and text shimmer on last word */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[-0.035em] text-white leading-[0.92] select-none">
          Predict your future with comic{' '}
          <span className="text-shimmer italic font-normal tracking-[-0.02em]">
            insights.
          </span>
        </h1>
      </div>

      {/* Subtext: Max-width 2xl, Inter font, neutral-400, text-lg */}
      <p className="relative z-10 mt-6 sm:mt-8 max-w-2xl mx-auto font-sans text-neutral-400 text-base sm:text-lg md:text-xl font-light leading-relaxed">
        Predict your future and daily horoscope with personalised comic insights.
        Explore Vedic Kundli interpretations across Health, Wealth, Career, and Relationships
        alongside bespoke illustrated cosmic narratives.
      </p>

      {/* Interactive CTA buttons: Shiny Border button and secondary text link */}
      <div className="relative z-10 mt-9 sm:mt-11 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <ShinyButton onClick={onGetStartedKundli}>
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Get Started — Predict Kundli</span>
          <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </ShinyButton>

        <button
          onClick={onExploreHoroscope}
          className="group inline-flex items-center gap-2 text-sm sm:text-base font-sans font-medium text-neutral-400 hover:text-white transition-colors py-3 px-4 cursor-pointer"
        >
          <span>Daily Comic Horoscope</span>
          <span className="text-violet-400 group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </section>
  );
};
