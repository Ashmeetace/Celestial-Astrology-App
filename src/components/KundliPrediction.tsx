import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  User,
  Send,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { ShinyButton } from './ShinyButton';

interface KundliPredictionProps {
  onSwitchToHoroscope?: () => void;
}

export const KundliPrediction: React.FC<KundliPredictionProps> = ({ onSwitchToHoroscope }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Follow-up chat state
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleFillSample = () => {
    setName('Aarav Mehta');
    setDob('1998-11-14');
    setTimeOfBirth('06:45');
    setPlaceOfBirth('Varanasi, India');
    setError(null);
  };

  const handlePredictKundli = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dob || !timeOfBirth || !placeOfBirth.trim()) {
      setError('Please provide all birth details: Name, DOB, Time of Birth, and Place of Birth.');
      return;
    }

    setError(null);
    setIsLoading(true);
    setPrediction(null);
    setChatHistory([]);

    try {
      const response = await fetch('/api/kundli/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          dob,
          timeOfBirth,
          placeOfBirth: placeOfBirth.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.reading) {
        setPrediction(data.reading);
      } else {
        throw new Error(data.error || 'Failed to generate Kundli prediction');
      }
    } catch (err: any) {
      console.error('Prediction error:', err);
      setError('Unable to reach prediction engine. Please check your internet or retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim() || isChatLoading) return;

    const questionText = chatQuestion.trim();
    setChatQuestion('');
    setChatHistory((prev) => [...prev, { sender: 'user', text: questionText }]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/kundli/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionText,
          birthDetails: { name, dob, timeOfBirth, placeOfBirth },
        }),
      });

      const data = await response.json();
      const aiResponse = data.answer || data.error || 'No response received.';
      setChatHistory((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'I am Celestial Star, an AI dedicated exclusively to astrology and birth chart interpretations. Please ask a question related to astrology or your Kundli.',
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header banner */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-950/20 text-violet-300 text-[11px] font-mono tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>FEATURE 01 // VEDIC BIRTH CHART</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
            Vedic Kundli <span className="text-shimmer italic">Prediction.</span>
          </h2>
          <p className="font-sans text-neutral-400 text-xs sm:text-sm mt-1 max-w-xl font-light">
            Enter your exact natal coordinates to compute your Janma Kundli, Lagna, Rashi,
            and complete life vectors across Health, Wealth, Career, and Relationships.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleFillSample}
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-mono border border-white/10 transition-colors cursor-pointer"
          >
            Auto-Fill Sample Chart
          </button>
        </div>
      </div>

      {/* Input Form Card */}
      <div className="rounded-3xl border border-white/10 bg-[#080808]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[100px] opacity-25 bg-violet-600"
        />

        <form onSubmit={handlePredictKundli} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Name */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-violet-400" />
                  Full Name
                </span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arjun Sharma"
                className="w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-sans"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  Date of Birth
                </span>
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              />
            </div>

            {/* Time of Birth */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Time of Birth
                </span>
              </label>
              <input
                type="time"
                required
                value={timeOfBirth}
                onChange={(e) => setTimeOfBirth(e.target.value)}
                className="w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono"
              />
            </div>

            {/* Place of Birth */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Place of Birth
                </span>
              </label>
              <input
                type="text"
                required
                value={placeOfBirth}
                onChange={(e) => setPlaceOfBirth(e.target.value)}
                placeholder="e.g. Varanasi, India"
                className="w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
              />
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button: Predict Kundli */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
            <ShinyButton
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
              innerClassName="px-8 sm:px-12 py-3 sm:py-3.5 font-medium"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span>Computing Your Kundli...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Predict Kundli</span>
                </>
              )}
            </ShinyButton>
          </div>
        </form>
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div className="py-16 text-center rounded-3xl border border-white/5 bg-[#0A0A0E] p-8 flex flex-col items-center justify-center">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full border-2 border-violet-500/30 border-t-violet-400 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-serif text-white">
              ॐ
            </div>
          </div>
          <h3 className="font-serif text-2xl text-white mb-1">Aligning Natal Grahas & Bhavas</h3>
          <p className="font-mono text-xs text-neutral-400 max-w-sm">
            Auditing 12 Bhavas, calculating Lagna degrees, Moon constellation, and synthesizing Vedic remedies...
          </p>
        </div>
      )}

      {/* Prediction Output Results */}
      {prediction && !isLoading && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header of results */}
          <div className="rounded-3xl border border-white/10 bg-[#0A0A0E] p-6 sm:p-8 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Vedic Kundli Calculated Successfully</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Natal Horoscope for <span className="text-violet-300">{name}</span>
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                DOB: {dob} • Time: {timeOfBirth} • Place: {placeOfBirth}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 border border-white/10 transition-colors cursor-pointer"
              >
                Print / Save PDF
              </button>
              {onSwitchToHoroscope && (
                <button
                  onClick={onSwitchToHoroscope}
                  className="px-4 py-2 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 text-xs font-sans text-white border border-violet-500/40 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>View Daily Comic Horoscope</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive North Indian (Diamond) Kundli Chart Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#070709] p-6 flex flex-col items-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">
                Janma Kundli (North Indian Chakra)
              </span>

              {/* Diamond SVG Chart */}
              <div className="w-full max-w-[340px] aspect-square relative">
                <svg className="w-full h-full" viewBox="0 0 300 300">
                  {/* Outer Square */}
                  <rect x="5" y="5" width="290" height="290" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  
                  {/* Diagonals */}
                  <line x1="5" y1="5" x2="295" y2="295" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  <line x1="295" y1="5" x2="5" y2="295" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

                  {/* Inner Diamond */}
                  <polygon points="150,5 295,150 150,295 5,150" fill="rgba(139,92,246,0.03)" stroke="#8B5CF6" strokeWidth="1.5" />

                  {/* House 1 (Lagna / Tanu Bhava) Center Top Diamond */}
                  <text x="150" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="bold">
                    H1 (Lagna)
                  </text>
                  <text x="150" y="85" textAnchor="middle" fill="#22D3EE" fontSize="10" fontFamily="'JetBrains Mono', monospace">
                    Ascendant
                  </text>

                  {/* House 2 */}
                  <text x="75" y="45" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace">
                    H2 (Dhana)
                  </text>

                  {/* House 3 */}
                  <text x="45" y="75" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace">
                    H3
                  </text>

                  {/* House 4 (Sukha Bhava) */}
                  <text x="65" y="150" textAnchor="middle" fill="#A78BFA" fontSize="10" fontFamily="monospace">
                    H4 (Sukha)
                  </text>

                  {/* House 5 */}
                  <text x="45" y="225" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace">
                    H5
                  </text>

                  {/* House 6 (Ripu / Health) */}
                  <text x="75" y="255" textAnchor="middle" fill="#EF4444" fontSize="9" fontFamily="monospace">
                    H6 (Health)
                  </text>

                  {/* House 7 (Kalatra / Relationships) */}
                  <text x="150" y="235" textAnchor="middle" fill="#EC4899" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    H7 (Partner)
                  </text>

                  {/* House 8 */}
                  <text x="225" y="255" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace">
                    H8
                  </text>

                  {/* House 9 (Dharma) */}
                  <text x="255" y="225" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="monospace">
                    H9 (Dharma)
                  </text>

                  {/* House 10 (Karma / Career) */}
                  <text x="235" y="150" textAnchor="middle" fill="#10B981" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    H10 (Career)
                  </text>

                  {/* House 11 (Labha / Wealth) */}
                  <text x="255" y="75" textAnchor="middle" fill="#3B82F6" fontSize="9" fontFamily="monospace">
                    H11 (Wealth)
                  </text>

                  {/* House 12 */}
                  <text x="225" y="45" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace">
                    H12
                  </text>

                  {/* Center Emblem */}
                  <circle cx="150" cy="150" r="14" fill="#080808" stroke="#06B6D4" strokeWidth="1" />
                  <text x="150" y="154" textAnchor="middle" fill="#06B6D4" fontSize="11" fontFamily="serif">
                    ॐ
                  </text>
                </svg>
              </div>

              <div className="mt-4 text-[10px] font-mono text-neutral-500 text-center">
                North Indian Chakra mapping Kendra (1, 4, 7, 10) &amp; Trikona (1, 5, 9) houses.
              </div>
            </div>

            {/* Formatted Prediction Reading Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-white/10 bg-[#080808]/90 p-6 sm:p-8 backdrop-blur-xl text-neutral-200 font-sans leading-relaxed text-sm">
                <div className="prose prose-invert max-w-none space-y-4">
                  {prediction.split('---').map((block, idx) => {
                    const cleanBlock = block.trim();
                    if (!cleanBlock) return null;
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-colors"
                      >
                        <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {cleanBlock}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Follow-up Astrological Q&A Chat */}
          <div className="rounded-3xl border border-white/10 bg-[#070709] p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <h4 className="font-serif text-xl sm:text-2xl text-white">
                Ask Celestial Star <span className="text-shimmer italic">Follow-up Astrology Questions.</span>
              </h4>
            </div>
            <p className="text-xs font-sans text-neutral-400 mb-6 font-light">
              Inquire about your Dasha timeline, transit impacts, career auspicious moments, or specific gemstone rituals. Strictly guarded within Vedic astrology principles.
            </p>

            {/* Chat conversation messages */}
            {chatHistory.length > 0 && (
              <div className="space-y-3 mb-6 max-h-72 overflow-y-auto pr-2">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm font-sans leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-violet-600 text-white rounded-tr-none'
                          : 'bg-white/[0.05] border border-white/10 text-neutral-200 rounded-tl-none'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-neutral-400 mb-1 uppercase tracking-wider">
                        {msg.sender === 'user' ? 'You' : 'Celestial Star AI'}
                      </div>
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl px-4 py-2.5 bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>Consulting your chart...</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Chat input form */}
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
                placeholder="e.g. When will my next career Mahadasha begin? Or which gemstone aligns with my 10th house?"
                className="flex-1 rounded-2xl bg-black/60 border border-white/10 px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!chatQuestion.trim() || isChatLoading}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-neutral-200 active:scale-95 text-black font-sans font-semibold text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
