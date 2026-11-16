export interface ZodiacSignInfo {
  id: string;
  name: string;
  symbol: string;
  dates: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  ruler: string;
  traits: string[];
  color: string;
  accentHex: string;
  iconBg: string;
}

export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    dates: 'Mar 21 - Apr 19',
    element: 'Fire',
    ruler: 'Mars',
    traits: ['Audacious', 'Pioneering', 'Passionate'],
    color: 'from-red-500/20 to-orange-500/20',
    accentHex: '#EF4444',
    iconBg: 'rgba(239, 68, 68, 0.15)',
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    dates: 'Apr 20 - May 20',
    element: 'Earth',
    ruler: 'Venus',
    traits: ['Grounded', 'Sensual', 'Tenacious'],
    color: 'from-emerald-500/20 to-teal-500/20',
    accentHex: '#10B981',
    iconBg: 'rgba(16, 185, 129, 0.15)',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    dates: 'May 21 - Jun 20',
    element: 'Air',
    ruler: 'Mercury',
    traits: ['Cerebral', 'Electric', 'Curious'],
    color: 'from-cyan-500/20 to-sky-500/20',
    accentHex: '#06B6D4',
    iconBg: 'rgba(6, 182, 212, 0.15)',
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    dates: 'Jun 21 - Jul 22',
    element: 'Water',
    ruler: 'Moon',
    traits: ['Intuitive', 'Tidal', 'Protective'],
    color: 'from-indigo-400/20 to-purple-400/20',
    accentHex: '#818CF8',
    iconBg: 'rgba(129, 140, 248, 0.15)',
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    dates: 'Jul 23 - Aug 22',
    element: 'Fire',
    ruler: 'Sun',
    traits: ['Radiant', 'Regal', 'Sovereign'],
    color: 'from-amber-500/20 to-yellow-500/20',
    accentHex: '#F59E0B',
    iconBg: 'rgba(245, 158, 11, 0.15)',
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    dates: 'Aug 23 - Sep 22',
    element: 'Earth',
    ruler: 'Mercury',
    traits: ['Methodical', 'Prismatic', 'Analytical'],
    color: 'from-lime-500/20 to-emerald-500/20',
    accentHex: '#84CC16',
    iconBg: 'rgba(132, 204, 22, 0.15)',
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    dates: 'Sep 23 - Oct 22',
    element: 'Air',
    ruler: 'Venus',
    traits: ['Equilibrium', 'Aesthetic', 'Diplomatic'],
    color: 'from-violet-500/20 to-fuchsia-500/20',
    accentHex: '#8B5CF6',
    iconBg: 'rgba(139, 92, 246, 0.15)',
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    dates: 'Oct 23 - Nov 21',
    element: 'Water',
    ruler: 'Pluto & Mars',
    traits: ['Magnetic', 'Alchemical', 'Unyielding'],
    color: 'from-purple-600/20 to-rose-600/20',
    accentHex: '#A855F7',
    iconBg: 'rgba(168, 85, 247, 0.15)',
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    dates: 'Nov 22 - Dec 21',
    element: 'Fire',
    ruler: 'Jupiter',
    traits: ['Cosmic Nomad', 'Philosophic', 'Unbound'],
    color: 'from-blue-500/20 to-violet-500/20',
    accentHex: '#3B82F6',
    iconBg: 'rgba(59, 130, 246, 0.15)',
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    dates: 'Dec 22 - Jan 19',
    element: 'Earth',
    ruler: 'Saturn',
    traits: ['Architect', 'Steadfast', 'Timeless'],
    color: 'from-zinc-500/20 to-stone-500/20',
    accentHex: '#71717A',
    iconBg: 'rgba(113, 113, 122, 0.15)',
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    dates: 'Jan 20 - Feb 18',
    element: 'Air',
    ruler: 'Uranus',
    traits: ['Visionary', 'Quantum Rebel', 'Altruist'],
    color: 'from-cyan-400/20 to-teal-400/20',
    accentHex: '#22D3EE',
    iconBg: 'rgba(34, 211, 238, 0.15)',
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    dates: 'Feb 19 - Mar 20',
    element: 'Water',
    ruler: 'Neptune',
    traits: ['Dream-Weaver', 'Mystic', 'Transcendent'],
    color: 'from-teal-400/20 to-indigo-500/20',
    accentHex: '#2DD4BF',
    iconBg: 'rgba(45, 212, 191, 0.15)',
  },
];

export interface ComicPanel {
  panelNumber: number;
  actTitle: string;
  sceneDescription: string;
  dialogueSpeaker: string;
  dialogueText: string;
  thoughtBubble?: string;
  caption: string;
  artworkType: 'constellation' | 'celestial_duel' | 'astral_portal' | 'oracle_mirror';
  planetaryAspect: string;
}

export interface ComicInsight {
  signId: string;
  signName: string;
  dateKey: string;
  headline: string;
  cosmicMood: string;
  luckyColorHex: string;
  luckyNumbers: number[];
  powerHour: string;
  astralAffinity: string;
  planetarySummary: string;
  panels: ComicPanel[];
}

export const SAMPLE_COMIC_INSIGHTS: Record<string, ComicInsight> = {
  scorpio: {
    signId: 'scorpio',
    signName: 'Scorpio',
    dateKey: 'Today & Galactic Week Ahead',
    headline: 'The Alchemical Phoenix: A Veil Tears Open at Midnight',
    cosmicMood: 'Electrically Sovereign & Piercingly Clairvoyant',
    luckyColorHex: '#A855F7',
    luckyNumbers: [8, 13, 21, 89],
    powerHour: '11:42 PM Astral',
    astralAffinity: 'Neptune in Pisces Trine Mars',
    planetarySummary: 'Pluto uncovers covert loyalties in your 8th house while Mars accelerates bold negotiations.',
    panels: [
      {
        panelNumber: 1,
        actTitle: 'ACT I: THE MIDNIGHT TRANSMISSION',
        sceneDescription: 'You stand atop a neon obsidian monolith beneath a fractured purple nebula. Holographic constellation sigils flicker around your wrists as your inner compass spins true North.',
        dialogueSpeaker: 'Astrologer Voice',
        dialogueText: '"Do not retreat from the shadows you cast; they hold the blueprints to your next evolution."',
        thoughtBubble: 'They think I did not notice the subtle planetary shift... but the ephemeris never lies.',
        caption: '02:00 UTC — Mars in Scorpio activates hidden subterranean reserves.',
        artworkType: 'astral_portal',
        planetaryAspect: 'Mars Sextile Pluto (0.12° Precision)',
      },
      {
        panelNumber: 2,
        actTitle: 'ACT II: THE CONVERSATION IN CODE',
        sceneDescription: 'A stranger or ally from a different frequency extends a cryptographic star-map. A sudden insight flashes through your mind, exposing false timelines.',
        dialogueSpeaker: 'The Cosmic Messenger',
        dialogueText: '"Your intuition solved this equation three weeks before they even asked the question."',
        thoughtBubble: 'The pieces click. The contract must be rewritten on my terms.',
        caption: 'Tension resolves as Moon trines Neptune in psychic alignment.',
        artworkType: 'celestial_duel',
        planetaryAspect: 'Moon in Pisces Trine Ascendant',
      },
      {
        panelNumber: 3,
        actTitle: 'ACT III: SOVEREIGN RESOLUTION',
        sceneDescription: 'Surrounded by twin glowing serpents of violet plasma, you step through the obsidian gateway, radiating diamond clarity into the dawn sky.',
        dialogueSpeaker: 'Future Self',
        dialogueText: '"Step through. The destiny you avoided was merely the doorway to the throne."',
        caption: 'Cosmic Verdict: Strike with surgical precision before the waxing lunar phase completes.',
        artworkType: 'oracle_mirror',
        planetaryAspect: 'Sun Conjunct North Node in House VIII',
      },
    ],
  },
  aries: {
    signId: 'aries',
    signName: 'Aries',
    dateKey: 'Today & Galactic Week Ahead',
    headline: 'The Vanguard Spark: Breaking Orbital Inertia',
    cosmicMood: 'Fierce Velocity & Unapologetic Initiative',
    luckyColorHex: '#EF4444',
    luckyNumbers: [1, 9, 19, 77],
    powerHour: '06:15 AM Solar Dawn',
    astralAffinity: 'Mars Conjunct Jupiter',
    planetarySummary: 'A fiery burst in your 1st house demands immediate action. The universe rewards the first mover today.',
    panels: [
      {
        panelNumber: 1,
        actTitle: 'ACT I: THE IGNITION PULSE',
        sceneDescription: 'Crimson solar flares erupt across your atmospheric helm. A frozen star system suddenly cracks open with geothermal magma.',
        dialogueSpeaker: 'The Aries Pioneer',
        dialogueText: '"Waiting for consensus is a polite way to die in the doldrums. We launch now."',
        thoughtBubble: 'The engines have been idling long enough.',
        caption: 'Solar flares ignite the 1st Decan with primal kinetic momentum.',
        artworkType: 'astral_portal',
        planetaryAspect: 'Mars in Aries Trine Solar Corona',
      },
      {
        panelNumber: 2,
        actTitle: 'ACT II: COLLISION COURSE',
        sceneDescription: 'A barrier constructed of old doubts looms in deep space. Instead of steering away, your craft accelerates straight through the perimeter shield.',
        dialogueSpeaker: 'Cosmic Navigator',
        dialogueText: '"Direct impact confirmed! The barrier was merely holographic!"',
        thoughtBubble: 'Fears crumble when met with unconditional velocity.',
        caption: 'Midday transit breaks the deadlock across financial & creative corridors.',
        artworkType: 'celestial_duel',
        planetaryAspect: 'Jupiter Direct in House X',
      },
      {
        panelNumber: 3,
        actTitle: 'ACT III: THE GOLDEN VECTOR',
        sceneDescription: 'Cruising through the debris of shattered limitations, you emerge into uncharted stellar territory, your standard planted firmly in cosmic rock.',
        dialogueSpeaker: 'Celestial Chronicle',
        dialogueText: '"Fortune crowns the audacious vanguard. The galaxy bows to genuine willpower."',
        caption: 'Prophecy: By dusk, the first significant victory of your lunar cycle manifests.',
        artworkType: 'constellation',
        planetaryAspect: 'Sun Sextile Uranus (2.0° Vector)',
      },
    ],
  },
  gemini: {
    signId: 'gemini',
    signName: 'Gemini',
    dateKey: 'Today & Galactic Week Ahead',
    headline: 'The Dual Quanta: Synchronizing Parallel Realities',
    cosmicMood: 'Hyperspeed Synapses & Mercurial Brilliance',
    luckyColorHex: '#06B6D4',
    luckyNumbers: [3, 5, 14, 42],
    powerHour: '03:33 PM Mercury Zenith',
    astralAffinity: 'Mercury Sextile Uranus',
    planetarySummary: 'Mercury supercharges your communication sector, synthesizing two contradictory concepts into an undisputed breakthrough.',
    panels: [
      {
        panelNumber: 1,
        actTitle: 'ACT I: THE ECHO CHAMBER',
        sceneDescription: 'Twin holographic avatars mirror your thoughts in a cyan digital sanctuary, debating two divergent life trajectories at quantum clock speed.',
        dialogueSpeaker: 'Twin 1 & Twin 2',
        dialogueText: '"Why choose between artistic madness and architectural discipline when we can fuse both?"',
        thoughtBubble: 'The world moves too slow for a mind running at 400 terahertz.',
        caption: 'Mercury enters a swift conductive trine with the Air signs.',
        artworkType: 'astral_portal',
        planetaryAspect: 'Mercury in 3rd House Direct',
      },
      {
        panelNumber: 2,
        actTitle: 'ACT II: THE CIPHER TRANSMISSION',
        sceneDescription: 'You intercept an encrypted psychic broadcast on an unmapped frequency. A single phrase decodes a month-long puzzle.',
        dialogueSpeaker: 'The Ether Oracle',
        dialogueText: '"Listen closely to what they don’t say. The truth is encoded in the cadence of the pause."',
        thoughtBubble: 'I already know what their response will be tomorrow.',
        caption: 'Mid-afternoon telepathic resonance reaches peak clarity.',
        artworkType: 'celestial_duel',
        planetaryAspect: 'Mercury Sextile Neptune in Deep Space',
      },
      {
        panelNumber: 3,
        actTitle: 'ACT III: HARMONIC BROADCAST',
        sceneDescription: 'Both twins touch hands, merging into a unified sovereign luminary that projects glowing geometric formulas into the night sky.',
        dialogueSpeaker: 'Unified Gemini',
        dialogueText: '"The message has been sent. Now watch the reality calibrate around our words."',
        caption: 'Prophecy: Send the pitch or reveal the truth today; reception will be unanimous.',
        artworkType: 'oracle_mirror',
        planetaryAspect: 'Venus Trine Mercury Zenith',
      },
    ],
  },
};

export interface Astrologer {
  id: string;
  name: string;
  avatar: string;
  zodiacSign: string;
  title: string;
  specialty: string;
  rating: number;
  readingsCount: number;
  status: 'Online in Orbit' | 'In Deep Reading' | 'Star Channeling';
  tags: string[];
  hourlyRate: string;
  quote: string;
  alignment: 'Hellenistic' | 'Vedic' | 'Evolutionary' | 'Quantum Astro-Comic';
}

export const ASTROLOGERS_MARQUEE: Astrologer[] = [
  {
    id: 'dr-lyra-vance',
    name: 'Dr. Lyra Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    zodiacSign: '♏ Scorpio Ascendant',
    title: 'Hellenistic Astrologer & Comic Oracle',
    specialty: 'Saturn Returns & Shadow Transits',
    rating: 5.0,
    readingsCount: 3840,
    status: 'Online in Orbit',
    tags: ['Saturn Return', 'Shadow Self', 'Comic Prophecy'],
    hourlyRate: '120 credits',
    quote: 'The planets do not compel, but they never bluff.',
    alignment: 'Hellenistic',
  },
  {
    id: 'cassian-sol',
    name: 'Master Cassian Sol',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    zodiacSign: '♌ Leo Stellium',
    title: 'Vedic Astrologer & Royal Ephemeris Master',
    specialty: 'Karmic Destiny & Planetary Doshas',
    rating: 4.98,
    readingsCount: 5210,
    status: 'Online in Orbit',
    tags: ['Kundali Mapping', 'Career Vectors', 'Solar Cycles'],
    hourlyRate: '145 credits',
    quote: 'Your birth chart is the architectural blueprint of your soul.',
    alignment: 'Vedic',
  },
  {
    id: 'aria-moonchild',
    name: 'Aria Moonchild',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    zodiacSign: '♓ Pisces Mystic',
    title: 'Astro-Cartoonist & Dream Interpreter',
    specialty: 'Subconscious Visions to Comic Strips',
    rating: 4.99,
    readingsCount: 2980,
    status: 'Star Channeling',
    tags: ['Dream Ephemeris', 'Illustrated Destiny', 'Neptune Transits'],
    hourlyRate: '110 credits',
    quote: 'I turn your nocturnal visions into illustrated cosmic prophecies.',
    alignment: 'Quantum Astro-Comic',
  },
  {
    id: 'kaelen-vane',
    name: 'Kaelen Vane',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    zodiacSign: '♒ Aquarius Cosmologist',
    title: 'Evolutionary Astrologer & Transit Hacker',
    specialty: 'Quantum Synastry & Outer Planet Shifts',
    rating: 4.96,
    readingsCount: 4120,
    status: 'Online in Orbit',
    tags: ['Synastry', 'Pluto in Aquarius', 'Timeline Bends'],
    hourlyRate: '130 credits',
    quote: 'Astrology is quantum physics meeting cosmic storytelling.',
    alignment: 'Evolutionary',
  },
  {
    id: 'seraphina-lin',
    name: 'Seraphina Lin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    zodiacSign: '♉ Taurus High Priestess',
    title: 'Venusian Astrologer & Abundance Cartographer',
    specialty: 'Wealth Ephemeris & Sensual Alignment',
    rating: 5.0,
    readingsCount: 3490,
    status: 'In Deep Reading',
    tags: ['Wealth Portals', 'Venus Direct', 'Earth Magic'],
    hourlyRate: '135 credits',
    quote: 'Ground your celestial light into tangible earthly abundance.',
    alignment: 'Hellenistic',
  },
  {
    id: 'dorian-thorne',
    name: 'Dorian Thorne',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    zodiacSign: '♐ Sagittarius Nomad',
    title: 'Cosmic Prophet & Astro-Cartographer',
    specialty: 'Relocation Astrology & Jupiterian Luck',
    rating: 4.97,
    readingsCount: 2750,
    status: 'Online in Orbit',
    tags: ['Astro-Cartography', 'Jupiter Trines', 'Global Destiny'],
    hourlyRate: '115 credits',
    quote: 'Change your geographic coordinates, change your celestial sky.',
    alignment: 'Evolutionary',
  },
];

export interface PlanetData {
  id: string;
  name: string;
  symbol: string;
  color: string;
  orbitRadius: number; // in relative px
  size: number;
  speed: number; // orbital period factor
  currentSign: string;
  currentDegree: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  archetype: string;
  comicRole: string;
  influence: string;
  hasRings?: boolean;
}

export const SOLAR_PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    symbol: '☿',
    color: '#94A3B8',
    orbitRadius: 90,
    size: 9,
    speed: 4.1,
    currentSign: 'Gemini',
    currentDegree: '18° 42\'',
    element: 'Air',
    archetype: 'The Winged Messenger',
    comicRole: 'The Hyper-Fast Informant',
    influence: 'Rapid communication, quantum data transfer, cryptographic insights.',
  },
  {
    id: 'venus',
    name: 'Venus',
    symbol: '♀',
    color: '#FBBF24',
    orbitRadius: 135,
    size: 13,
    speed: 2.8,
    currentSign: 'Taurus',
    currentDegree: '04° 15\'',
    element: 'Earth',
    archetype: 'The Harmonizer of Value',
    comicRole: 'The Aesthetic Diplomat',
    influence: 'Magnetism, aesthetic resonance, creative wealth, romantic synchronicity.',
  },
  {
    id: 'earth',
    name: 'Earth & Luna',
    symbol: '♁',
    color: '#06B6D4',
    orbitRadius: 185,
    size: 14,
    speed: 2.0,
    currentSign: 'Libra',
    currentDegree: '22° 11\'',
    element: 'Earth',
    archetype: 'The Living Sanctuary',
    comicRole: 'The Grounded Reality Anchor',
    influence: 'Material manifestation, biometric equilibrium, physical destiny.',
  },
  {
    id: 'mars',
    name: 'Mars',
    symbol: '♂',
    color: '#EF4444',
    orbitRadius: 240,
    size: 11,
    speed: 1.5,
    currentSign: 'Scorpio',
    currentDegree: '12° 08\'',
    element: 'Fire',
    archetype: 'The Cosmic Instigator',
    comicRole: 'The Unstoppable Striker',
    influence: 'Raw kinetic propulsion, bold boundaries, surgical execution.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    symbol: '♃',
    color: '#F59E0B',
    orbitRadius: 310,
    size: 26,
    speed: 0.9,
    currentSign: 'Gemini',
    currentDegree: '28° 50\'',
    element: 'Air',
    archetype: 'The Infinite Expander',
    comicRole: 'The Benevolent Titan',
    influence: 'Astronomical serendipity, philosophical wisdom, boundless scaling.',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    symbol: '♄',
    color: '#E2E8F0',
    orbitRadius: 385,
    size: 22,
    speed: 0.6,
    currentSign: 'Pisces',
    currentDegree: '19° 33\'',
    element: 'Water',
    archetype: 'The Lord of Karmic Architecture',
    comicRole: 'The Strict Reality Tester',
    influence: 'Mastery through discipline, long-range contracts, timeless legacy.',
    hasRings: true,
  },
  {
    id: 'uranus',
    name: 'Uranus',
    symbol: '♅',
    color: '#22D3EE',
    orbitRadius: 460,
    size: 17,
    speed: 0.38,
    currentSign: 'Taurus',
    currentDegree: '27° 19\'',
    element: 'Earth',
    archetype: 'The Lightning Awakener',
    comicRole: 'The Paradigm Disruptor',
    influence: 'Epiphanies, technological sudden shifts, liberation from obsolete cycles.',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    symbol: '♆',
    color: '#818CF8',
    orbitRadius: 535,
    size: 16,
    speed: 0.25,
    currentSign: 'Pisces',
    currentDegree: '29° 14\'',
    element: 'Water',
    archetype: 'The Weaver of the Cosmic Dream',
    comicRole: 'The Illusory Shaman',
    influence: 'Psychic imagery, transcendent artistic flow, dissolution of ego boundaries.',
  },
];

export const METRICS_TICKER_ITEMS = [
  { label: 'PLANETARY ALIGNMENT', value: '0.04° NEPTUNE TRINE MARS', color: 'text-violet-400' },
  { label: 'DAILY COMICS DRAWN', value: '1,489,204 PANELS', color: 'text-white' },
  { label: 'HOROSCOPE ACCURACY', value: '99.4% RESONANCE', color: 'text-emerald-400' },
  { label: 'PLANETARY TELEMETRY', value: 'REAL-TIME ORBITAL SYNC', color: 'text-cyan-400' },
  { label: 'STAR COUNCIL ORACLES', value: '48 ONLINE IN ORBIT', color: 'text-emerald-400' },
  { label: 'LUNAR PHASE', value: 'WAXING GIBBOUS (74%)', color: 'text-amber-300' },
  { label: 'RETROGRADE SHIELD', value: 'ALL INNER PLANETS DIRECT', color: 'text-cyan-400' },
  { label: 'COSMIC FREQUENCY', value: '432 HZ HARMONIC PULSE', color: 'text-violet-300' },
  { label: 'PROPHECIES SOLVED', value: '98,720 THIS CYCLE', color: 'text-white' },
];
