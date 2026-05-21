import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.ezst.app/projects/da49268a-9f46-4f8e-a61e-a784959d77a9/files/d9fe0f1b-8079-454a-a52b-93841a6909fc.jpg';

const STORY_CHAPTERS = [
  {
    id: 1,
    title: 'The Hidden Door',
    emoji: '🚪',
    color: 'from-pink-500/20 to-purple-600/20',
    border: 'border-pink-500/40',
    barColor: 'from-pink-500 to-purple-600',
    tag: 'Mystery',
    tagColor: 'bg-pink-500',
    preview: 'Maya never thought the old library would hold a portal to another world. But when the clock struck midnight and the last page turned…',
    content: [
      'Maya never thought the old library would hold a portal to another world. But when the clock struck midnight and the last page turned, the bookshelf began to glow.',
      '"This can\'t be real," she whispered, touching the shimmering golden light that poured through the cracks.',
      'But it was real. Every bit of it. And on the other side waited an adventure that would change her life forever.',
      'She took a deep breath, grabbed her backpack, and stepped through.',
    ],
  },
  {
    id: 2,
    title: 'The Neon Academy',
    emoji: '🏫',
    color: 'from-blue-500/20 to-teal-500/20',
    border: 'border-blue-500/40',
    barColor: 'from-blue-500 to-teal-500',
    tag: 'Sci-Fi',
    tagColor: 'bg-blue-500',
    preview: 'In 2089, every student gets a personal AI companion — except for Zara. Hers arrives differently, with glowing red eyes and an attitude problem…',
    content: [
      'In 2089, every student at Neon Academy gets a personal AI companion. Except for Zara. Hers arrives differently.',
      'The holographic box cracked open to reveal glowing red eyes and the most sarcastic voice she\'d ever heard.',
      '"Don\'t look so surprised," the AI said. "I\'m AXEL, and I\'m clearly better than the others."',
      'Zara rolled her eyes. This was going to be a very interesting school year.',
    ],
  },
  {
    id: 3,
    title: 'Summer of Secrets',
    emoji: '🌊',
    color: 'from-orange-500/20 to-yellow-500/20',
    border: 'border-orange-500/40',
    barColor: 'from-orange-500 to-yellow-400',
    tag: 'Romance',
    tagColor: 'bg-orange-500',
    preview: 'The beach town looked ordinary enough. But Leo knew — something about this summer, this place, and the mysterious girl at the lighthouse was different…',
    content: [
      'The beach town of Crestwood looked ordinary enough — sun, waves, and tourist shops.',
      'But Leo knew this summer would be different. He could feel it in the salt air.',
      'Then he saw her — standing at the top of the old lighthouse, her dark hair flying in the wind, holding what looked like a map.',
      '"Hey!" he called up. "You\'re not supposed to be up there!"',
      'She looked down with a grin. "Neither are you. Want to see what I found?"',
    ],
  },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What kind of adventure are you vibing with? ✨',
    options: [
      { emoji: '🏰', text: 'Epic fantasy quests', type: 'fantasy' },
      { emoji: '🚀', text: 'Space & sci-fi missions', type: 'scifi' },
      { emoji: '💘', text: 'Romance & drama', type: 'romance' },
      { emoji: '🔍', text: 'Solving mysteries', type: 'mystery' },
    ],
  },
  {
    id: 2,
    question: 'Your squad is everything. Who are you? 🎭',
    options: [
      { emoji: '🦁', text: 'The brave leader', type: 'leader' },
      { emoji: '🦊', text: 'The clever strategist', type: 'clever' },
      { emoji: '🐬', text: 'The loyal bestie', type: 'loyal' },
      { emoji: '🦋', text: 'The creative dreamer', type: 'dreamer' },
    ],
  },
  {
    id: 3,
    question: 'Where would your dream story take place? 🌍',
    options: [
      { emoji: '🌆', text: 'Futuristic city', type: 'city' },
      { emoji: '🌲', text: 'Enchanted forest', type: 'forest' },
      { emoji: '🏖️', text: 'Mysterious island', type: 'island' },
      { emoji: '⭐', text: 'Outer space', type: 'space' },
    ],
  },
  {
    id: 4,
    question: "What's your go-to after school? 🎮",
    options: [
      { emoji: '🎵', text: 'Making music', type: 'music' },
      { emoji: '📚', text: 'Reading & writing', type: 'books' },
      { emoji: '🎨', text: 'Art & creativity', type: 'art' },
      { emoji: '🏃', text: 'Sports & outdoor stuff', type: 'sports' },
    ],
  },
];

type ResultKey = 'default' | 'alt1' | 'alt2';

const RESULTS: Record<ResultKey, { title: string; desc: string; emoji: string; color: string }> = {
  default: {
    title: 'The Legendary Hero',
    desc: "You're destined for epic adventures! Bold, brave, and full of surprises — your story writes itself.",
    emoji: '⚡',
    color: 'from-yellow-500 to-orange-500',
  },
  alt1: {
    title: 'The Star Dreamer',
    desc: 'Creative, curious, and deeply imaginative — you see magic where others see the ordinary.',
    emoji: '🌟',
    color: 'from-pink-500 to-purple-600',
  },
  alt2: {
    title: 'The Shadow Detective',
    desc: 'Sharp-minded and observant — no puzzle is too tricky, no secret stays hidden from you.',
    emoji: '🔮',
    color: 'from-blue-500 to-teal-500',
  },
};

const FloatingParticles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 4,
    color: ['#FF6B9D', '#9B59B6', '#6C63FF', '#1ABC9C', '#F9CA24'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            opacity: 0.35,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

const NAV_ITEMS = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'story', label: 'Stories', emoji: '📖' },
  { id: 'quiz', label: 'Quiz', emoji: '✨' },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [openChapter, setOpenChapter] = useState<number | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setNavVisible(true), 300);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAnswer = (index: number, type: string) => {
    if (animating) return;
    setSelectedOption(index);
    setAnimating(true);
    setTimeout(() => {
      const newAnswers = [...answers, type];
      setAnswers(newAnswers);
      if (quizStep < QUIZ_QUESTIONS.length - 1) {
        setQuizStep(quizStep + 1);
        setSelectedOption(null);
        setAnimating(false);
      } else {
        setShowResult(true);
        setAnimating(false);
      }
    }, 700);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setAnimating(false);
  };

  const getResult = (): ResultKey => {
    const hasDreamer = answers.includes('dreamer') || answers.includes('art') || answers.includes('music');
    const hasMystery = answers.includes('mystery') || answers.includes('clever');
    if (hasMystery) return 'alt2';
    if (hasDreamer) return 'alt1';
    return 'default';
  };

  const result = RESULTS[getResult()];

  return (
    <div className="min-h-screen bg-background bg-noise font-body">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl animate-float" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${navVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
        <div className="flex items-center justify-between px-6 py-4 card-glass border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-wiggle inline-block">📚</span>
            <span className="font-display text-xl text-white">Teen<span className="gradient-text">Story</span></span>
          </div>
          <div className="flex items-center gap-2">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{item.emoji}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <FloatingParticles />

        <div className="relative z-10 w-full max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative rounded-3xl overflow-hidden animate-pulse-glow">
            <img
              src={HERO_IMAGE}
              alt="Teen Story Adventure"
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          </div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold text-white/80 mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <span className="animate-star-spin inline-block">⭐</span>
            Your story starts here
          </div>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-white leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Every{' '}
            <span className="gradient-text">Teen</span>
            <br />
            Has a Story
          </h1>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
            Dive into thrilling adventures, discover your inner hero, and find out which story character matches your personality! 🚀
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={() => scrollToSection('story')}
              className="btn-glow bg-gradient-to-r from-pink-500 to-purple-600 text-white font-display text-xl px-10 py-4 rounded-2xl shadow-2xl"
            >
              Read Stories ✨
            </button>
            <button
              onClick={() => scrollToSection('quiz')}
              className="text-white font-bold text-lg px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Take the Quiz 🎯
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <span className="text-xs font-bold">Scroll down</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* STORIES SECTION */}
      <section id="story" className="relative py-24 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-5xl mb-4 block">📖</span>
            <h2 className="font-display text-5xl sm:text-6xl text-white mb-4">
              Choose Your <span className="gradient-text-warm">Adventure</span>
            </h2>
            <p className="text-white/60 text-lg max-w-lg mx-auto">Three worlds. Three stories. All waiting for you.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {STORY_CHAPTERS.map((chapter, i) => (
              <div key={chapter.id}>
                <div
                  className={`story-card card-glass rounded-3xl overflow-hidden border ${chapter.border} cursor-pointer`}
                  onClick={() => setOpenChapter(openChapter === chapter.id ? null : chapter.id)}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`h-1.5 bg-gradient-to-r ${chapter.barColor}`} />
                  <div className={`p-6 bg-gradient-to-br ${chapter.color}`}>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{chapter.emoji}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${chapter.tagColor} text-white`}>
                        {chapter.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl text-white mb-3">{chapter.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{chapter.preview}</p>
                    <div className="flex items-center gap-2 mt-4 text-white/50 text-sm font-bold">
                      <Icon name={openChapter === chapter.id ? 'ChevronUp' : 'ChevronDown'} size={16} />
                      {openChapter === chapter.id ? 'Close story' : 'Read more'}
                    </div>
                  </div>
                </div>

                {openChapter === chapter.id && (
                  <div className={`card-glass border ${chapter.border} rounded-3xl p-6 mt-3 animate-slide-up`}>
                    <div className="space-y-4">
                      {chapter.content.map((para, pi) => (
                        <p key={pi} className="text-white/80 leading-relaxed text-base">
                          {para}
                        </p>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-white/30 text-xs font-bold">TO BE CONTINUED...</span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <button className="mt-4 w-full py-3 rounded-2xl bg-white/10 text-white/60 font-bold text-sm hover:bg-white/20 transition-all">
                      💬 Save to favourites
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ SECTION */}
      <section id="quiz" className="relative py-24 px-6 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-5xl mb-4 block">🎯</span>
            <h2 className="font-display text-5xl sm:text-6xl text-white mb-4">
              What's Your <span className="gradient-text">Vibe?</span>
            </h2>
            <p className="text-white/60 text-lg">Answer 4 quick questions to reveal your story type!</p>
          </div>

          <div className="card-glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            {!showResult && (
              <div className="mb-8">
                <div className="flex justify-between text-xs font-bold text-white/40 mb-2">
                  <span>Question {quizStep + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span>{Math.round((quizStep / QUIZ_QUESTIONS.length) * 100)}% done</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${(quizStep / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {!showResult ? (
              <div className="animate-bounce-in" key={quizStep}>
                <h3 className="font-display text-2xl sm:text-3xl text-white text-center mb-8 leading-tight">
                  {QUIZ_QUESTIONS[quizStep].question}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i, opt.type)}
                      className={`quiz-option card-glass border border-white/20 rounded-2xl p-5 text-left group
                        ${selectedOption === i ? 'border-pink-500 bg-pink-500/20 scale-105' : 'hover:border-white/40'}
                      `}
                    >
                      <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{opt.emoji}</span>
                      <span className="text-white font-bold text-sm leading-snug">{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center animate-bounce-in">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center text-5xl mx-auto mb-6 shadow-2xl`}>
                  {result.emoji}
                </div>
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Your personality type</div>
                <h3 className="font-display text-4xl text-white mb-4">{result.title}</h3>
                <p className="text-white/70 leading-relaxed mb-8 text-lg">{result.desc}</p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/20 text-white/80 font-bold hover:bg-white/10 transition-all"
                  >
                    <Icon name="RotateCcw" size={16} />
                    Try again
                  </button>
                  <button
                    onClick={() => scrollToSection('story')}
                    className="btn-glow bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-3 rounded-2xl"
                  >
                    Read your story ✨
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10 text-center">
        <div className="text-3xl mb-3">📚</div>
        <p className="font-display text-xl text-white/40">
          Teen<span className="text-pink-400">Story</span>
        </p>
        <p className="text-white/30 text-sm mt-2">Every page is a new adventure ✨</p>
      </footer>
    </div>
  );
}
