import React, { useState } from 'react';
import { ASTROLOGERS_MARQUEE, Astrologer } from '../data/astrologyData';
import { Star, ShieldCheck, Sparkles, Calendar, MessageSquare, X, CheckCircle, ArrowRight } from 'lucide-react';

export const AstrologersMarquee: React.FC = () => {
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');

  // Duplicate the astrologers list for continuous infinite marquee
  const marqueeList = [...ASTROLOGERS_MARQUEE, ...ASTROLOGERS_MARQUEE];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedAstrologer(null);
      setUserQuestion('');
    }, 2800);
  };

  return (
    <section id="astrologers" className="relative py-24 overflow-hidden border-t border-white/5 scroll-mt-20">
      {/* Background ambient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-10 w-96 h-96 rounded-full blur-[140px] bg-violet-600/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-10 w-80 h-80 rounded-full blur-[130px] bg-cyan-600/15"
      />

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
            Verified Star Council • 48 Oracles Active
          </span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] text-white">
          Meet the cosmic minds behind <span className="text-shimmer italic">your prophecy.</span>
        </h2>
        <p className="mt-4 font-sans text-neutral-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          Hover to pause the council orbit. Each verified practitioner pairs deep astrological ephemeris
          with bespoke episodic comic art to bring your future timeline alive.
        </p>
      </div>

      {/* Marquee Wrapper with left/right fade masks */}
      <div className="relative w-full overflow-hidden select-none py-4">
        {/* Left & Right gradient edge masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#030303] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#030303] to-transparent z-10" />

        {/* Infinite Scrolling Track */}
        <div className="animate-marquee flex items-center gap-6">
          {marqueeList.map((astrologer, index) => (
            <div
              key={`${astrologer.id}-${index}`}
              onClick={() => setSelectedAstrologer(astrologer)}
              className="w-[320px] sm:w-[350px] shrink-0 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/50 hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.4)] backdrop-blur-md p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              {/* Top row: Avatar & Status */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img
                      src={astrologer.avatar}
                      alt={astrologer.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10 group-hover:border-violet-500 transition-colors shadow-lg"
                    />
                    <span className="absolute -bottom-1 -right-1 p-1 bg-black/80 rounded-full border border-white/10">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{astrologer.status}</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 mt-1 uppercase">
                      {astrologer.alignment}
                    </span>
                  </div>
                </div>

                {/* Name & Zodiac */}
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-violet-200 transition-colors">
                      {astrologer.name}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  </div>
                  <span className="text-xs font-mono text-violet-400 font-medium">
                    {astrologer.zodiacSign}
                  </span>
                </div>

                {/* Title & Quote */}
                <p className="text-xs font-sans text-neutral-300 line-clamp-1 mb-2">
                  {astrologer.title}
                </p>
                <p className="text-xs font-sans italic text-neutral-400 line-clamp-2 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-white/5">
                  &ldquo;{astrologer.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Tags & Metrics */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-mono text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-white">{astrologer.rating}</span>
                  <span className="text-neutral-500 text-[10px]">({astrologer.readingsCount})</span>
                </div>

                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-full bg-white/10 group-hover:bg-violet-600 group-hover:text-white text-neutral-300 text-xs font-sans font-medium transition-all duration-200 flex items-center gap-1 cursor-pointer"
                >
                  <span>Book Reading</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Astrologer Detail & Booking Modal */}
      {selectedAstrologer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-[#0A0A0E] p-6 sm:p-8 shadow-2xl shadow-violet-950/40 max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedAstrologer(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {bookingConfirmed ? (
              <div className="py-12 text-center flex flex-col items-center">
                <CheckCircle className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="font-serif text-3xl text-white mb-2">Cosmic Session Initiated</h3>
                <p className="font-sans text-neutral-400 text-sm max-w-md">
                  {selectedAstrologer.name} is tuning into your ephemeris coordinates. You will receive your bespoke 3-panel illustrated comic prophecy in your private astral inbox.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={selectedAstrologer.avatar}
                    alt={selectedAstrologer.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-violet-500/50 shadow-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                        {selectedAstrologer.name}
                      </h3>
                      <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-xs font-mono text-violet-400">
                      {selectedAstrologer.zodiacSign} • {selectedAstrologer.alignment}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center text-amber-400 text-xs font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                        <span className="text-white font-semibold">{selectedAstrologer.rating}</span>
                        <span className="text-neutral-500 ml-1">({selectedAstrologer.readingsCount} prophecies delivered)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-1">
                      Astrological Specialty
                    </div>
                    <p className="text-sm text-neutral-200 font-sans">
                      {selectedAstrologer.specialty}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedAstrologer.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-violet-600/20 text-violet-300 border border-violet-500/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleBook} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Ask Your Cosmic Question or Future Vector
                      </label>
                      <textarea
                        required
                        value={userQuestion}
                        onChange={(e) => setUserQuestion(e.target.value)}
                        placeholder="e.g. I am undergoing a Saturn Return in my 10th House. Illustrate what transition I should anticipate next month..."
                        rows={3}
                        className="w-full rounded-xl bg-black/60 border border-white/10 p-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-violet-500"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30 flex items-center justify-between text-xs font-mono text-cyan-300">
                      <span>Reading Rate: {selectedAstrologer.hourlyRate}</span>
                      <span>Format: Illustrated 3-Panel Comic</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-sans font-semibold text-sm tracking-wide transition-all shadow-lg shadow-white/10 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-violet-600" />
                      <span>Request Illustrated Prophecy</span>
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
