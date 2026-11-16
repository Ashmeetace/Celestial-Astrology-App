import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Send,
  RotateCcw,
  Bot,
  User,
  ShieldCheck,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'model';
  text: string;
  timestamp: string;
}

// Safety function to guarantee zero asterisks and zero em-dashes
export function sanitizeNoAsteriskOrEmDash(str: string): string {
  if (!str) return '';
  return str
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/[—–]/g, '-');
}

export const AstrologyChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'model',
      text: sanitizeNoAsteriskOrEmDash(
        'Greetings! I am Celestial Star Astrology, your dedicated Vedic and horoscopic assistant. How can I illuminate your chart, planetary transits, or remedies today?'
      ),
      timestamp: 'Just now',
    },
  ]);

  const quickQuestions = [
    'How does Saturn transit affect my career?',
    'What does the 7th house signify in Kundli?',
    'Explain the importance of Moon sign (Rashi)',
    'What remedies balance Rahu and Ketu?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: sanitizeNoAsteriskOrEmDash(text),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();
      const rawReply = data.reply || data.answer || "I'm Celestial Star Astrology, and I can help only with astrology-related questions. Ask me about your Kundli, horoscope, zodiac sign, compatibility, or planetary influences.";
      
      const cleanReply = sanitizeNoAsteriskOrEmDash(rawReply);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'model',
        text: cleanReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackReply = sanitizeNoAsteriskOrEmDash(
        "I am Celestial Star Astrology. In Vedic astrology, your natal planetary positions guide your path. Please ask any question about your Kundli, horoscope, or astrological remedies."
      );

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'model',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'model',
        text: sanitizeNoAsteriskOrEmDash(
          'Chat session reset. I am Celestial Star Astrology. Ask me about your Kundli, horoscope, zodiac sign, compatibility, or planetary influences.'
        ),
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Trigger Button (when closed or minimized) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group relative flex items-center gap-3 p-1 rounded-full cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95 shadow-2xl shadow-violet-950/50"
          aria-label="Open Celestial Astrology Chatbot"
        >
          {/* Pulsing neon halo border */}
          <span
            aria-hidden="true"
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity animate-pulse"
          />

          <div className="relative z-10 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0A0A0E] border border-white/15 text-white">
            <div className="relative flex items-center justify-center">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center shadow-[0_0_12px_#8b5cf6]">
                <Sparkles className="w-4 h-4 text-white" />
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-xs font-serif font-medium text-white tracking-wide">
                Celestial Star AI
              </div>
              <div className="text-[10px] font-mono text-cyan-400">
                Astrology Chatbot
              </div>
            </div>
          </div>
        </button>
      )}

      {/* Floating Chat Window Pop-up */}
      {isOpen && (
        <div
          className={`w-[92vw] sm:w-[410px] rounded-3xl border border-white/15 bg-[#08080E]/95 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[560px] max-h-[82vh]'
          }`}
        >
          {/* Window Header */}
          <div className="px-4 py-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between select-none">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center shadow-[0_0_10px_#8b5cf6]">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-medium text-white tracking-tight leading-none">
                  Celestial Star Astrology
                </h3>
                <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Vedic Astrology Guide
                </span>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close chatbot"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Window Body (when not minimized) */}
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col animate-message-slide-up ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl p-3 text-xs sm:text-[13px] font-sans leading-relaxed transition-all ${
                        msg.sender === 'user'
                          ? 'bg-violet-600 text-white rounded-tr-none shadow-md shadow-violet-950/40'
                          : 'bg-white/[0.04] border border-white/10 text-neutral-200 rounded-tl-none backdrop-blur-md'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-neutral-400 mb-1 flex items-center justify-between gap-2">
                        <span>{msg.sender === 'user' ? 'You' : 'Celestial Star AI'}</span>
                        <span className="text-[9px] text-neutral-500">{msg.timestamp}</span>
                      </div>
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start animate-message-slide-up">
                    <div className="rounded-2xl rounded-tl-none p-3 bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      <span>Celestial Star is consulting the stars...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Starter Suggestions */}
              {messages.length <= 2 && (
                <div className="px-4 py-2 border-t border-white/5 bg-black/30">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-2">
                    Suggested Questions:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="text-[11px] font-sans px-2.5 py-1 rounded-xl bg-white/[0.03] hover:bg-violet-600/20 hover:border-violet-500/40 border border-white/5 text-neutral-300 hover:text-white transition-all text-left cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input Bar */}
              <div className="p-3.5 bg-black/60 border-t border-white/10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about your Kundli, horoscope, or transits..."
                    className="flex-1 rounded-2xl bg-black/70 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 font-sans"
                  />

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isLoading}
                    className="p-2.5 rounded-2xl bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-neutral-500 px-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Vedic Astrology Guidance
                  </span>
                  <span>Direct Insights</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
