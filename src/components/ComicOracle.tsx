import React, { useState } from 'react';
import {
  ZODIAC_SIGNS,
  SAMPLE_COMIC_INSIGHTS,
  ZodiacSignInfo,
  ComicInsight,
} from '../data/astrologyData';
import {
  Sparkles,
  RefreshCw,
  Share2,
  Check,
  Compass,
  Zap,
  Moon,
  Clock,
  Palette,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { ShinyButton } from './ShinyButton';

interface ComicOracleProps {
  onSelectAstrologer?: (sign: string) => void;
}

export const ComicOracle: React.FC<ComicOracleProps> = ({ onSelectAstrologer }) => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSignInfo>(
    ZODIAC_SIGNS.find((s) => s.id === 'scorpio') || ZODIAC_SIGNS[0]
  );
  const [readingCategory, setReadingCategory] = useState<'daily' | 'love' | 'career' | 'destiny'>('daily');
  const [comicStyle, setComicStyle] = useState<'cyber' | 'tarot' | 'anime' | 'noir'>('cyber');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generationSeed, setGenerationSeed] = useState(1);

  // Dynamic insight generator based on chosen sign & category
  const activeInsight: ComicInsight = React.useMemo(() => {
    // If we have a curated one for this sign, use it as baseline
    const base = SAMPLE_COMIC_INSIGHTS[selectedSign.id] || SAMPLE_COMIC_INSIGHTS['scorpio'];

    const categorySubtitles = {
      daily: 'Daily Horoscope & Astral Transits',
      love: 'Romantic Synastry & Cosmic Resonance',
      career: 'Quantum Wealth & Authority Vectors',
      destiny: 'Karmic Prophecy & Future Timeline',
    };

    const categoryHeadlines = {
      daily: `The Astral Horizon: ${selectedSign.name}'s Daily Celestial Shift`,
      love: `Gravitational Pull: ${selectedSign.name}'s Synastry Intersection`,
      career: `Sovereign Vector: ${selectedSign.name}'s Unstoppable Momentum`,
      destiny: `The Quantum Oracle: ${selectedSign.name}'s Future Timeline Revealed`,
    };

    return {
      signId: selectedSign.id,
      signName: selectedSign.name,
      dateKey: `Galactic Transit • ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      headline: categoryHeadlines[readingCategory],
      cosmicMood: `${selectedSign.traits[0]} & ${selectedSign.traits[1]} Frequency`,
      luckyColorHex: selectedSign.accentHex,
      luckyNumbers: [
        ((selectedSign.name.length * 7 + generationSeed * 3) % 40) + 1,
        ((selectedSign.name.length * 11 + generationSeed * 5) % 60) + 7,
        ((selectedSign.name.length * 13 + generationSeed * 9) % 80) + 12,
        88,
      ],
      powerHour: `${((selectedSign.name.length * 3 + generationSeed) % 12) + 1}:40 ${generationSeed % 2 === 0 ? 'PM' : 'AM'} Zenith`,
      astralAffinity: `${selectedSign.ruler} Trine ${selectedSign.element === 'Fire' ? 'Jupiter' : selectedSign.element === 'Water' ? 'Neptune' : selectedSign.element === 'Earth' ? 'Saturn' : 'Uranus'}`,
      planetarySummary: `The cosmic web aligns ${selectedSign.ruler} directly across your natal horizon. What felt ambiguous yesterday solidifies into crisp strategic clairvoyance today.`,
      panels: base.panels.map((p, idx) => ({
        ...p,
        actTitle: `PANEL ${idx + 1}: ${idx === 0 ? 'THE ASTRAL AWAKENING' : idx === 1 ? 'THE CELESTIAL CRUCIBLE' : 'THE SOVEREIGN DESTINY'}`,
        dialogueSpeaker: idx === 0 ? `${selectedSign.name} Archetype` : idx === 1 ? 'Cosmic Observer' : 'Future Self',
        caption: `${categorySubtitles[readingCategory]} • Planetary Angle: ${(idx * 45 + 15).toFixed(1)}°`,
      })),
    };
  }, [selectedSign, readingCategory, generationSeed]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGenerationSeed((prev) => prev + 1);
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    const textToCopy = `✨ CELESTIAL STARS COMIC HOROSCOPE for ${selectedSign.name} ✨\n${activeInsight.headline}\nMood: ${activeInsight.cosmicMood}\nPlanetary Aspect: ${activeInsight.astralAffinity}\nLucky Numbers: ${activeInsight.luckyNumbers.join(', ')}\nPower Hour: ${activeInsight.powerHour}\n\nPredicted on Celestial Stars (celestialstars.app)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="oracle" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-96 rounded-full blur-[140px] opacity-35 bg-violet-600/30"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
            Personalised Comic Insight Engine
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] text-white">
          Predict your future in <span className="text-shimmer italic">three cosmic frames.</span>
        </h2>
        <p className="mt-4 font-sans text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          Select your Zodiac sign to render an episodic, hand-crafted graphic prophecy.
          Every panel maps your planetary transits, inner dialogues, and destined breakthroughs.
        </p>
      </div>

      {/* Zodiac Sign Carousel / Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
            Select Your Natal Constellation
          </span>
          <span className="text-xs font-mono text-cyan-400/80">
            Active: {selectedSign.name} ({selectedSign.symbol}) • {selectedSign.dates}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = selectedSign.id === sign.id;
            return (
              <button
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-white/[0.08] border-violet-500/70 shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] scale-[1.03]'
                    : 'bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {/* Active indicator dot */}
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#06B6D4]" />
                )}
                <span className="text-2xl mb-1 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
                  {sign.symbol}
                </span>
                <span className="text-[11px] font-sans font-medium text-white tracking-tight">
                  {sign.name}
                </span>
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                  {sign.element}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls Bar: Reading Categories & Art Style */}
      <div className="glass-panel rounded-2xl p-3 sm:p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Category tabs */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 mr-2 hidden sm:inline">
            Focus:
          </span>
          {[
            { id: 'daily', label: 'Daily Horoscope', icon: Moon },
            { id: 'love', label: 'Love Synastry', icon: Sparkles },
            { id: 'career', label: 'Career Vector', icon: Zap },
            { id: 'destiny', label: 'Future Prophecy', icon: Compass },
          ].map((cat) => {
            const Icon = cat.icon;
            const active = readingCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setReadingCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                  active
                    ? 'bg-violet-600/30 text-white border border-violet-500/50 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-violet-300' : 'text-neutral-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Comic Style selector & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-sans text-neutral-400">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={comicStyle}
              onChange={(e) => setComicStyle(e.target.value as any)}
              className="bg-black/60 border border-white/10 text-neutral-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
            >
              <option value="cyber">Cyber-Mystic Noir</option>
              <option value="tarot">Retro Cosmic Tarot</option>
              <option value="anime">Starlight Manga</option>
              <option value="noir">Vantablack Astro</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-sans"
            title="Regenerate Prophecy"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-violet-400 ${isGenerating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Recalculate</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-sans"
            title="Share Prophecy"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-neutral-400" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* The Rendered Comic Insight Strip Showcase */}
      <div className="relative rounded-3xl border border-white/10 bg-[#080808]/90 backdrop-blur-xl p-5 sm:p-8 shadow-2xl shadow-black/80 transition-all duration-500">
        {/* Glow accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -right-12 w-80 h-80 rounded-full blur-[100px] opacity-25"
          style={{ background: selectedSign.accentHex }}
        />

        {/* Comic Strip Metadata Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-white/5 gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-serif border border-white/10 shadow-lg"
              style={{ backgroundColor: selectedSign.iconBg, color: selectedSign.accentHex }}
            >
              {selectedSign.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                  {activeInsight.dateKey}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider bg-violet-500/10 text-violet-300 border border-violet-500/20">
                  PLANETARY TRANSIT
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight mt-0.5">
                {activeInsight.headline}
              </h3>
            </div>
          </div>

          {/* Quick Metrics pills */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2">
              <span className="text-neutral-500 text-[10px]">LUCKY:</span>
              <span className="text-white font-semibold">{activeInsight.luckyNumbers.join(' • ')}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-neutral-400">{activeInsight.powerHour}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedSign.accentHex }} />
              <span className="text-neutral-400">{selectedSign.ruler} Sovereign</span>
            </div>
          </div>
        </div>

        {/* 3-Panel Illustrated Comic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {activeInsight.panels.map((panel, idx) => (
            <div
              key={panel.panelNumber}
              className="group relative rounded-2xl border border-white/10 bg-[#0A0A0E] overflow-hidden flex flex-col justify-between hover:border-violet-500/40 hover:shadow-[0_0_25px_-5px_rgba(139,92,246,0.3)] transition-all duration-300"
            >
              {/* Panel Header */}
              <div className="p-3.5 bg-black/50 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 font-semibold uppercase">
                  {panel.actTitle}
                </span>
                <span className="text-[10px] font-mono text-cyan-400/90 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                  {panel.planetaryAspect}
                </span>
              </div>

              {/* Graphic Illustrated Panel Frame (SVG Celestial Art) */}
              <div className="relative h-60 bg-gradient-to-b from-[#0e0e16] to-[#060608] flex items-center justify-center p-4 overflow-hidden">
                {/* Halftone / Stardust backdrop */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #8B5CF6 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* Illustrated Scene Graphic depending on panel index */}
                {idx === 0 && (
                  <svg className="w-full h-full max-w-[220px]" viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="70" stroke="rgba(139,92,246,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="100" cy="100" r="50" stroke="rgba(6,182,212,0.35)" strokeWidth="1.5" />
                    <polygon points="100,30 160,150 40,150" stroke="#8B5CF6" strokeWidth="1.5" fill="rgba(139,92,246,0.06)" />
                    <circle cx="100" cy="30" r="4" fill="#22D3EE" />
                    <circle cx="160" cy="150" r="4" fill="#A855F7" />
                    <circle cx="40" cy="150" r="4" fill="#10B981" />
                    {/* Glowing Core */}
                    <circle cx="100" cy="110" r="16" fill="url(#coreGlow)" filter="drop-shadow(0 0 12px #8B5CF6)" />
                    <text x="100" y="116" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontFamily="serif">
                      {selectedSign.symbol}
                    </text>
                    <defs>
                      <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </radialGradient>
                    </defs>
                  </svg>
                )}

                {idx === 1 && (
                  <svg className="w-full h-full max-w-[220px]" viewBox="0 0 200 200" fill="none">
                    {/* Celestial Clash / Beam */}
                    <line x1="30" y1="40" x2="170" y2="160" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="170" y1="40" x2="30" y2="160" stroke="#8B5CF6" strokeWidth="2" />
                    {/* Energy Nodes */}
                    <circle cx="100" cy="100" r="28" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 4" />
                    <circle cx="100" cy="100" r="12" fill="#8B5CF6" className="animate-ping opacity-30" />
                    <circle cx="100" cy="100" r="8" fill="#FFFFFF" />
                    {/* Orbiting particles */}
                    <circle cx="60" cy="70" r="5" fill="#22D3EE" filter="drop-shadow(0 0 6px #22D3EE)" />
                    <circle cx="140" cy="130" r="5" fill="#F43F5E" filter="drop-shadow(0 0 6px #F43F5E)" />
                    <circle cx="145" cy="65" r="3" fill="#FBBF24" />
                  </svg>
                )}

                {idx === 2 && (
                  <svg className="w-full h-full max-w-[220px]" viewBox="0 0 200 200" fill="none">
                    {/* Dimensional Gateway / Portal */}
                    <ellipse cx="100" cy="100" rx="75" ry="35" stroke="rgba(16,185,129,0.4)" strokeWidth="1" transform="rotate(-15 100 100)" />
                    <ellipse cx="100" cy="100" rx="55" ry="25" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" transform="rotate(-15 100 100)" />
                    <ellipse cx="100" cy="100" rx="35" ry="15" stroke="#22D3EE" strokeWidth="2" transform="rotate(-15 100 100)" />
                    {/* Crown Star */}
                    <path d="M100 40 L104 60 L124 64 L104 68 L100 88 L96 68 L76 64 L96 60 Z" fill="#FBBF24" filter="drop-shadow(0 0 8px #FBBF24)" />
                    <circle cx="100" cy="100" r="5" fill="#FFFFFF" />
                  </svg>
                )}

                {/* Floating Thought / Speech Bubble inside panel */}
                {panel.thoughtBubble && (
                  <div className="absolute top-3 left-3 right-3 p-2 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md shadow-lg text-[11px] font-sans text-neutral-300 italic flex items-start gap-1.5">
                    <span className="text-violet-400 font-bold not-italic">💭</span>
                    <span>&ldquo;{panel.thoughtBubble}&rdquo;</span>
                  </div>
                )}
              </div>

              {/* Panel Dialogue & Caption */}
              <div className="p-4 bg-black/60 flex-1 flex flex-col justify-between gap-3 border-t border-white/5">
                <div>
                  <div className="text-[10px] font-mono text-violet-400 uppercase tracking-widest font-semibold mb-1">
                    {panel.dialogueSpeaker}:
                  </div>
                  <p className="text-xs sm:text-[13px] text-white font-sans font-medium leading-snug">
                    {panel.dialogueText}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span className="line-clamp-1">{panel.caption}</span>
                  <span className="text-neutral-400 shrink-0">#{idx + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Cosmic Verdict */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-950/20 via-black to-cyan-950/20 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold">
                Astrological Synthesis & Transits
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-0.5 leading-relaxed max-w-2xl">
                {activeInsight.planetarySummary}
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={() => {
                const el = document.getElementById('astrologers');
                el?.scrollIntoView({ behavior: 'smooth' });
                if (onSelectAstrologer) onSelectAstrologer(selectedSign.name);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-sans font-medium border border-white/15 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Consult an Astrologer for This Chart</span>
              <span className="text-violet-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
