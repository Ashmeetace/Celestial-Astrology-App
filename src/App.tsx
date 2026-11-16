import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { MetricsTicker } from './components/MetricsTicker';
import { AstrologersMarquee } from './components/AstrologersMarquee';
import { FeatureGrid } from './components/FeatureGrid';
import { PlanetarySimulation } from './components/PlanetarySimulation';
import { Footer } from './components/Footer';
import { FeatureWindowModal } from './components/FeatureWindowModal';
import { AstrologyChatbot } from './components/AstrologyChatbot';

export default function App() {
  // Separate Application Window state
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [activeWindowFeature, setActiveWindowFeature] = useState<'kundli' | 'horoscope'>('kundli');
  const [isWindowMinimized, setIsWindowMinimized] = useState(false);

  const handleOpenFeatureWindow = (feature: 'kundli' | 'horoscope' = 'kundli') => {
    setActiveWindowFeature(feature);
    setIsWindowMinimized(false);
    setIsWindowOpen(true);
  };

  const handleCloseWindow = () => {
    setIsWindowOpen(false);
    setIsWindowMinimized(false);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col font-sans selection:bg-violet-600/30 selection:text-violet-200 relative overflow-x-hidden">
      {/* 1. Fixed Navigation Pill: ONLY Kundli Prediction & Daily Horoscope */}
      <Navigation
        onOpenKundli={() => handleOpenFeatureWindow('kundli')}
        onOpenHoroscope={() => handleOpenFeatureWindow('horoscope')}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onGetStartedKundli={() => handleOpenFeatureWindow('kundli')}
          onExploreHoroscope={() => handleOpenFeatureWindow('horoscope')}
          onExploreAstrologers={() => {
            const el = document.getElementById('astrologers');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Metrics Ticker */}
        <MetricsTicker />

        {/* 4. Astrologers Infinite Scrolling Marquee */}
        <AstrologersMarquee />

        {/* 5. Synapse Feature Architecture */}
        <FeatureGrid />

        {/* 6. Planetary Orrery Live Simulation */}
        <PlanetarySimulation
          onFocusPlanetProphecy={() => handleOpenFeatureWindow('kundli')}
        />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 8. SEPARATE FEATURE WINDOW (Opens when clicking Kundli Prediction or Daily Horoscope) */}
      <FeatureWindowModal
        isOpen={isWindowOpen}
        onClose={handleCloseWindow}
        activeFeature={activeWindowFeature}
        onSwitchFeature={(feat) => setActiveWindowFeature(feat)}
        isMinimized={isWindowMinimized}
        onToggleMinimize={() => setIsWindowMinimized(!isWindowMinimized)}
      />

      {/* 9. ASTROLOGY CHATBOT POP-UP (Floating on the bottom-right corner) */}
      <AstrologyChatbot />
    </div>
  );
}
