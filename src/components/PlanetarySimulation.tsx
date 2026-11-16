import React, { useState, useEffect, useRef } from 'react';
import { SOLAR_PLANETS, PlanetData } from '../data/astrologyData';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
  Sliders,
  Eye,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface PlanetarySimulationProps {
  onFocusPlanetProphecy?: (planetName: string) => void;
}

export const PlanetarySimulation: React.FC<PlanetarySimulationProps> = ({
  onFocusPlanetProphecy,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData>(SOLAR_PLANETS[2]); // Default to Earth
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetData | null>(null);

  // Store planet orbital angles in a ref to avoid React re-render lag in canvas loop
  const anglesRef = useRef<{ [key: string]: number }>({
    mercury: 0.4,
    venus: 1.2,
    earth: 2.1,
    mars: 3.8,
    jupiter: 0.9,
    saturn: 4.5,
    uranus: 2.8,
    neptune: 5.1,
    comet: 1.0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const height = Math.min(Math.max(width * 0.75, 520), 720);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Stars background static array
    const stars: { x: number; y: number; r: number; opacity: number }[] = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * 1200,
        y: Math.random() * 800,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const render = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const centerX = width / 2;
      const centerY = height / 2;

      // Dynamic scale based on canvas width
      const baseScale = Math.min(width / 1150, 0.95);

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Draw faint stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc((star.x * width) / 1200, (star.y * height) / 800, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Solar Center (The Sun)
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 4, centerX, centerY, 55 * baseScale);
      sunGradient.addColorStop(0, '#FFFFFF');
      sunGradient.addColorStop(0.25, '#F59E0B');
      sunGradient.addColorStop(0.55, '#8B5CF6');
      sunGradient.addColorStop(1, 'transparent');

      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 55 * baseScale, 0, Math.PI * 2);
      ctx.fill();

      // Sun core
      ctx.fillStyle = '#FEF08A';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 16 * baseScale, 0, Math.PI * 2);
      ctx.fill();

      // Sun pulse aura
      const sunPulse = Math.sin(time * 0.003) * 3;
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, (22 + sunPulse) * baseScale, 0, Math.PI * 2);
      ctx.stroke();

      // Update angles if playing
      if (isPlaying) {
        SOLAR_PLANETS.forEach((planet) => {
          const deltaAngle = (planet.speed * 0.45 * speedMultiplier * delta);
          anglesRef.current[planet.id] = (anglesRef.current[planet.id] + deltaAngle) % (Math.PI * 2);
        });
        // Comet
        anglesRef.current['comet'] = (anglesRef.current['comet'] + 0.35 * speedMultiplier * delta) % (Math.PI * 2);
      }

      // Draw Elliptical Comet
      const cometAngle = anglesRef.current['comet'];
      const cometA = 480 * baseScale;
      const cometB = 220 * baseScale;
      const cometX = centerX + Math.cos(cometAngle) * cometA;
      const cometY = centerY + Math.sin(cometAngle) * cometB;

      // Comet tail
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cometX - Math.sin(cometAngle) * 35, cometY + Math.cos(cometAngle) * 35);
      ctx.lineTo(cometX, cometY);
      ctx.stroke();

      // Comet head
      ctx.fillStyle = '#22D3EE';
      ctx.beginPath();
      ctx.arc(cometX, cometY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Draw Orbiting Planets
      SOLAR_PLANETS.forEach((planet) => {
        const radius = planet.orbitRadius * baseScale;
        const angle = anglesRef.current[planet.id] || 0;
        const planetX = centerX + Math.cos(angle) * radius;
        const planetY = centerY + Math.sin(angle) * (radius * 0.82); // slight orbital perspective tilt

        // Draw Orbit Line
        if (showOrbits) {
          ctx.strokeStyle =
            selectedPlanet.id === planet.id
              ? 'rgba(139, 92, 246, 0.4)'
              : 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = selectedPlanet.id === planet.id ? 1.5 : 1;
          ctx.setLineDash(selectedPlanet.id === planet.id ? [4, 4] : []);
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, radius, radius * 0.82, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Selected halo
        if (selectedPlanet.id === planet.id) {
          ctx.strokeStyle = '#8B5CF6';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(planetX, planetY, (planet.size / 2 + 7) * baseScale, 0, Math.PI * 2);
          ctx.stroke();

          // Outer beacon
          ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
          ctx.beginPath();
          ctx.arc(planetX, planetY, (planet.size / 2 + 14) * baseScale, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Saturn's Rings
        if (planet.hasRings) {
          ctx.strokeStyle = 'rgba(226, 232, 240, 0.45)';
          ctx.lineWidth = 2.5 * baseScale;
          ctx.beginPath();
          ctx.ellipse(
            planetX,
            planetY,
            (planet.size * 1.6) * baseScale,
            (planet.size * 0.5) * baseScale,
            Math.PI / 6,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }

        // Draw Planet Body
        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(planetX, planetY, (planet.size / 2) * baseScale, 0, Math.PI * 2);
        ctx.fill();

        // Planet atmospheric glow
        const glow = ctx.createRadialGradient(
          planetX,
          planetY,
          1,
          planetX,
          planetY,
          (planet.size) * baseScale
        );
        glow.addColorStop(0, planet.color);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(planetX, planetY, (planet.size) * baseScale, 0, Math.PI * 2);
        ctx.fill();

        // Earth's Luna
        if (planet.id === 'earth') {
          const moonAngle = time * 0.005;
          const moonRadius = 14 * baseScale;
          const moonX = planetX + Math.cos(moonAngle) * moonRadius;
          const moonY = planetY + Math.sin(moonAngle) * moonRadius;
          ctx.fillStyle = '#CBD5E1';
          ctx.beginPath();
          ctx.arc(moonX, moonY, 2.5 * baseScale, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Labels
        if (showLabels) {
          ctx.fillStyle = selectedPlanet.id === planet.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)';
          ctx.font = `${Math.max(10 * baseScale, 9)}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(
            `${planet.name} ${planet.symbol}`,
            planetX,
            planetY + (planet.size / 2 + 13) * baseScale
          );
          ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
          ctx.font = `${Math.max(8 * baseScale, 7.5)}px 'JetBrains Mono', monospace`;
          ctx.fillText(
            planet.currentDegree,
            planetX,
            planetY + (planet.size / 2 + 22) * baseScale
          );
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isPlaying, speedMultiplier, showOrbits, showLabels, selectedPlanet]);

  // Click on canvas to select closest planet
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const baseScale = Math.min(width / 1150, 0.95);

    let closestPlanet: PlanetData | null = null;
    let minDistance = 35; // click radius threshold

    SOLAR_PLANETS.forEach((planet) => {
      const radius = planet.orbitRadius * baseScale;
      const angle = anglesRef.current[planet.id] || 0;
      const planetX = centerX + Math.cos(angle) * radius;
      const planetY = centerY + Math.sin(angle) * (radius * 0.82);

      const dist = Math.hypot(x - planetX, y - planetY);
      if (dist < minDistance) {
        minDistance = dist;
        closestPlanet = planet;
      }
    });

    if (closestPlanet) {
      setSelectedPlanet(closestPlanet);
    }
  };

  return (
    <section id="planetary" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20 border-t border-white/5">
      {/* Background ambient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/3 w-[600px] h-[400px] rounded-full blur-[150px] opacity-25 bg-violet-600/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[350px] rounded-full blur-[140px] opacity-20 bg-cyan-500/25"
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-4">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-300">
            Real-Time Planetary Orrery Simulation
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] text-white">
          The clockwork of <span className="text-shimmer italic">destiny in motion.</span>
        </h2>
        <p className="mt-4 font-sans text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          Interactive celestial orbital simulation with real-time planetary vectors.
          Click any orbiting sphere or select below to examine its current cosmic transits and comic storytelling archetype.
        </p>
      </div>

      {/* Orrery Visualizer Container */}
      <div className="relative rounded-3xl border border-white/10 bg-[#060608]/90 backdrop-blur-xl shadow-2xl overflow-hidden p-4 sm:p-6 mb-8">
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-cyan-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isPlaying ? 'Pause Orbits' : 'Resume'}</span>
            </button>

            <button
              onClick={() => setShowOrbits(!showOrbits)}
              className={`px-3 py-2 rounded-xl border transition-colors cursor-pointer ${
                showOrbits ? 'bg-violet-600/20 text-violet-300 border-violet-500/30' : 'bg-white/5 text-neutral-500 border-white/10'
              }`}
            >
              Orbital Rings
            </button>

            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-3 py-2 rounded-xl border transition-colors cursor-pointer ${
                showLabels ? 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30' : 'bg-white/5 text-neutral-500 border-white/10'
              }`}
            >
              Transit Labels
            </button>
          </div>

          {/* Speed Multiplier slider */}
          <div className="flex items-center gap-3 bg-white/[0.03] px-3.5 py-1.5 rounded-xl border border-white/5">
            <span className="text-neutral-500 text-[10px] uppercase tracking-wider">Velocity:</span>
            <input
              type="range"
              min="0.2"
              max="3.5"
              step="0.1"
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
              className="w-24 accent-violet-500 cursor-pointer"
            />
            <span className="text-violet-300 w-8">{speedMultiplier.toFixed(1)}x</span>
          </div>
        </div>

        {/* Canvas Simulation */}
        <div className="relative w-full flex items-center justify-center cursor-crosshair">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full block rounded-2xl"
          />

          {/* Micro HUD Overlay */}
          <div className="absolute top-4 left-4 pointer-events-none hidden sm:block">
            <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-neutral-400">
              <span className="text-emerald-400 mr-2">●</span>
              HELIOCENTRIC COORDINATE GRID ACTIVE
            </div>
          </div>
        </div>

        {/* Planet Quick-Select Selector Bar */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 whitespace-nowrap mr-2">
            Inspect Body:
          </span>
          {SOLAR_PLANETS.map((planet) => {
            const isSelected = selectedPlanet.id === planet.id;
            return (
              <button
                key={planet.id}
                onClick={() => setSelectedPlanet(planet)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-white/10 text-white border border-violet-500/50 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: planet.color }} />
                <span>{planet.name}</span>
                <span className="text-neutral-500 text-[10px]">{planet.symbol}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Planet Astrological Inspector Card */}
      <div className="rounded-3xl border border-white/10 bg-[#0A0A0E] p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-serif border border-white/10 shadow-lg shrink-0"
            style={{
              backgroundColor: `${selectedPlanet.color}20`,
              color: selectedPlanet.color,
              borderColor: `${selectedPlanet.color}40`,
            }}
          >
            {selectedPlanet.symbol}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {selectedPlanet.name}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-cyan-950/40 text-cyan-300 border border-cyan-800/40">
                In {selectedPlanet.currentSign} ({selectedPlanet.currentDegree})
              </span>
            </div>

            <div className="text-xs font-mono text-violet-400 mt-1">
              {selectedPlanet.archetype} • Comic Role: &ldquo;{selectedPlanet.comicRole}&rdquo;
            </div>

            <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-sans max-w-2xl leading-relaxed">
              {selectedPlanet.influence}
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <button
            onClick={() => {
              const el = document.getElementById('oracle');
              el?.scrollIntoView({ behavior: 'smooth' });
              if (onFocusPlanetProphecy) onFocusPlanetProphecy(selectedPlanet.name);
            }}
            className="w-full md:w-auto px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-sans font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-white/10 cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span>Generate Prophecy for {selectedPlanet.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
