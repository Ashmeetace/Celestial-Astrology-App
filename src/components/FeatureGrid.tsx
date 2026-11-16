import React from 'react';
import {
  Sparkles,
  Compass,
  Layers,
  Moon,
  Radio,
  Eye,
  ArrowUpRight,
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  metric: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconBg,
  iconColor,
  title,
  description,
  metric,
}) => {
  return (
    <div
      className="group relative rounded-3xl p-8 sm:p-10 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/40 hover:-translate-y-3 shadow-lg hover:shadow-[0_0_20px_-10px_rgba(139,92,246,0.4)] synapse-transition cursor-default flex flex-col justify-between"
    >
      {/* Top 48px square tinted box with icon */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 ${iconBg} ${iconColor} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
          >
            {icon}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 group-hover:text-violet-300 transition-colors">
            {metric}
          </span>
        </div>

        {/* Font-serif Title (32px+) */}
        <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mb-3 group-hover:text-violet-100 transition-colors">
          {title}
        </h3>

        {/* Body / UI: Inter font, neutral-400 */}
        <p className="font-sans text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
          {description}
        </p>
      </div>

      {/* Subtle indicator line at bottom */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
        <span className="tracking-widest uppercase text-[10px]">Active Protocol</span>
        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-violet-400" />
      </div>
    </div>
  );
};

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      iconBg: 'bg-violet-500/15',
      iconColor: 'text-violet-400',
      title: 'Personalised Comic Horoscopes',
      description:
        'Daily hand-rendered celestial narratives translating astral movements into episodic graphic insights, speech bubbles, and destined encounters.',
      metric: 'EPOCH 01 // COMIC',
    },
    {
      icon: <Compass className="w-5 h-5" />,
      iconBg: 'bg-cyan-500/15',
      iconColor: 'text-cyan-400',
      title: 'High-Precision Planetary Calculations',
      description:
        'Direct astronomical coordinate calculations synchronized with high-precision planetary orbits and natal degrees.',
      metric: '0.001° PRECISION',
    },
    {
      icon: <Layers className="w-5 h-5" />,
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
      title: 'Synastry & Destiny Mapping',
      description:
        'Decouple karmic ties and forecast interpersonal relationship vectors with dual-chart multi-quadrant graphic storyboard analysis.',
      metric: 'MULTI-CHART FUSION',
    },
    {
      icon: <Moon className="w-5 h-5" />,
      iconBg: 'bg-indigo-500/15',
      iconColor: 'text-indigo-400',
      title: 'Astral Dream Transmuter',
      description:
        'Convert subconscious sleep imagery into archetypal comic panels anchored to your lunar nodes and Neptune transit frequencies.',
      metric: 'LUNAR RECEPTOR',
    },
    {
      icon: <Radio className="w-5 h-5" />,
      iconBg: 'bg-rose-500/15',
      iconColor: 'text-rose-400',
      title: 'Quantum Retrograde Radar',
      description:
        'Early-warning telemetry pings before Mercury, Saturn, or Venus retrograde shadow periods trigger turbulence in your orbit.',
      metric: 'SHADOW RADAR v3',
    },
    {
      icon: <Eye className="w-5 h-5" />,
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
      title: 'Verified Astrologer Network',
      description:
        'Direct private consultations with vetted Hellenistic, Vedic, and Astro-Cartoonist masters accompanied by custom illustrated memoirs.',
      metric: '48 ORACLES LIVE',
    },
  ];

  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 bg-violet-600/30"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
            Synapse Astrology Architecture
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] text-white">
          Engineered for <span className="text-shimmer italic">celestial clarity.</span>
        </h2>
        <p className="mt-4 font-sans text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          Where ancient astronomical wisdom merges with real-time orbital mathematics
          and serialized episodic storytelling.
        </p>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};
