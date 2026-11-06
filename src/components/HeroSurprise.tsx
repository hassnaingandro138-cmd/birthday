import { useState, useEffect } from 'react';
import { Sparkles, Heart, ChevronDown, PartyPopper, Flame, Clock } from 'lucide-react';
import { triggerGoldenFireworks, triggerMegaCelebration } from '../utils/confetti';
import { soundEngine } from '../utils/audioEngine';

interface HeroSurpriseProps {
  isRevealed: boolean;
  onReveal: () => void;
  onReplay: () => void;
  onStartMusic: () => void;
  isFireworksActive?: boolean;
  onToggleFireworks?: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
}

function calculateCountdownToDec8(): TimeRemaining {
  const now = new Date();
  const currentYear = now.getFullYear();
  let target = new Date(currentYear, 11, 8, 0, 0, 0); // Month 11 is December (0-indexed)

  const isToday = now.getMonth() === 11 && now.getDate() === 8;

  // If Dec 8 has passed for the current year, count to next year's Dec 8
  if (now.getTime() > target.getTime() + 24 * 60 * 60 * 1000) {
    target = new Date(currentYear + 1, 11, 8, 0, 0, 0);
  }

  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isToday };
}

export default function HeroSurprise({
  isRevealed,
  onReveal,
  onStartMusic,
  isFireworksActive = false,
  onToggleFireworks,
}: HeroSurpriseProps) {
  const fullTypedMessage =
    "Umair, tu mere liye sirf best friend nahi hai, tu mere sage bhai se bhi barhkar hai jisse baat karke mere dil ko sacha sukoon milta hai. I love you so much mere bhai! Chahe aaj hum kitne bhi door hon aur darmiyan me hazaron miles hon, hamari dosti aur bhai chara na kabhi kamzor hoga aur na kabhi tootega. Meri dil se dua hai ke Allah Pak tujhe bhabhi ke sath hamesha khush, abad aur hansta muskurata rakhe, aur bohot jald hum teri mangni aur shadi ki dhum-dham dekhein! Insha'Allah hum bohot jald milenge! — Tera Mukhlis Bhai, Hassnain Ali 🫂❤️";

  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [celebrateCount, setCelebrateCount] = useState(0);
  const [countdown, setCountdown] = useState<TimeRemaining>(calculateCountdownToDec8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdownToDec8());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isRevealed) {
      setTypedText('');
      setIsTypingComplete(false);
      return;
    }

    let i = 0;
    setTypedText('');
    setIsTypingComplete(false);

    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < fullTypedMessage.length) {
          setTypedText(fullTypedMessage.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTypingComplete(true);
        }
      }, 20);

      return () => clearInterval(interval);
    }, 450);

    return () => clearTimeout(startDelay);
  }, [isRevealed]);

  const handleMegaCelebrateClick = () => {
    soundEngine.playSparkleSound();
    triggerMegaCelebration();
    setCelebrateCount((prev) => prev + 1);
  };

  return (
    <section id="welcome" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center px-3 sm:px-6 py-8 sm:py-14 overflow-hidden">
      {/* Decorative ambient radial lighting and animated floating elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[700px] h-[320px] sm:h-[700px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating party elements */}
      <div className="absolute top-6 left-4 text-2xl sm:text-4xl animate-float opacity-75 select-none pointer-events-none">
        🎈
      </div>
      <div className="absolute top-10 right-4 text-2xl sm:text-4xl animate-float opacity-75 select-none pointer-events-none" style={{ animationDelay: '1.2s' }}>
        🎂
      </div>
      <div className="absolute bottom-12 left-4 text-xl sm:text-3xl animate-float opacity-70 select-none pointer-events-none" style={{ animationDelay: '2.3s' }}>
        ✨
      </div>
      <div className="absolute bottom-14 right-4 text-2xl sm:text-4xl animate-float opacity-75 select-none pointer-events-none" style={{ animationDelay: '1.8s' }}>
        🎉
      </div>

      <div className="relative z-10 max-w-4xl w-full mx-auto text-center space-y-6 sm:space-y-8">
        {/* Top Badge */}
        <div className="space-y-3 px-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Dedicated Birthday Celebration · From Hassnain Ali | Hassnain Ka Pyar</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gold-gradient leading-tight filter drop-shadow-[0_4px_25px_rgba(212,175,55,0.5)] [text-wrap:balance]">
            HAPPY BIRTHDAY UMAIR JANEMAN FROM YOUR BROTHER HASSNAIN ALI ❤️🎂
          </h1>

          <p className="font-serif text-sm sm:text-xl text-amber-300 font-bold">
            Salgirah Mubarak Ho Mere Jigar Umair Ali! Hassnain Ki Taraf Se Dil Se Mubarakbaad 🎂❤️
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-rose-400 font-serif text-sm sm:text-xl font-bold">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-500 text-rose-500 animate-pulse" />
              <span>I Love You So Much, My Brother!</span>
            </div>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="text-xs sm:text-base">Mere Bhai, Hassnain Loves You Always! ❤️</span>
          </div>

          <h2 className="font-serif text-xs sm:text-base md:text-lg text-amber-200/90 font-medium tracking-wide [text-wrap:balance]">
            "Happy Birthday To My Brother, My Best Friend, My Forever Brother! 🫂❤️"
            <br />
            <span className="text-slate-300 text-xs sm:text-sm font-normal">
              "Mere jigri yaar, mere pyare bhai Umair ko salgirah ki dhero khushiyan mubarak hon!"
            </span>
          </h2>
        </div>

        {/* Dynamic Birthday Countdown to December 8th — Luxury Gold Digital Clock */}
        <div className="max-w-xl mx-auto p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl glass-card border border-amber-500/35 bg-gradient-to-b from-[#1c1608]/90 via-[#101018]/90 to-[#07080d]/95 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <div className="flex items-center justify-center gap-2 mb-3 text-amber-400">
            <Clock className="w-4 h-4 animate-pulse text-amber-400" />
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              Birthday Countdown · 8th December
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          {countdown.isToday ? (
            <div className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-amber-500/20 border border-amber-400/60 text-amber-200">
              <p className="text-base sm:text-xl font-bold font-serif text-gold-gradient animate-pulse">
                🎉 Aaj Umair Bhai Ka Mubarak Birthday Hai! 🎂✨
              </p>
              <p className="text-xs sm:text-sm text-amber-300/90 mt-1 font-serif">
                Happy Birthday to you, mere pyare bhai! Allah aapki sari duayein qabool farmaye!
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1.5 sm:gap-3">
              {/* Days */}
              <div className="flex-1 max-w-[76px] sm:max-w-[95px] bg-gradient-to-b from-amber-500/20 via-black/85 to-black border border-amber-500/40 rounded-xl sm:rounded-2xl py-2 sm:py-3 px-1 text-center shadow-[inset_0_1px_1px_rgba(255,215,0,0.3)]">
                <div className="text-2xl sm:text-4xl font-black font-mono tabular-nums text-amber-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">
                  {String(countdown.days).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-200/90 mt-0.5">
                  Days · Din
                </div>
                <div className="text-[9px] text-amber-400/70 font-serif">Remaining</div>
              </div>

              <span className="text-amber-400 font-mono text-xl sm:text-3xl font-black animate-pulse select-none">:</span>

              {/* Hours */}
              <div className="flex-1 max-w-[76px] sm:max-w-[95px] bg-gradient-to-b from-amber-500/20 via-black/85 to-black border border-amber-500/40 rounded-xl sm:rounded-2xl py-2 sm:py-3 px-1 text-center shadow-[inset_0_1px_1px_rgba(255,215,0,0.3)]">
                <div className="text-2xl sm:text-4xl font-black font-mono tabular-nums text-amber-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">
                  {String(countdown.hours).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-200/90 mt-0.5">
                  Hours · Ghante
                </div>
                <div className="text-[9px] text-amber-400/70 font-serif">Remaining</div>
              </div>

              <span className="text-amber-400 font-mono text-xl sm:text-3xl font-black animate-pulse select-none">:</span>

              {/* Minutes */}
              <div className="flex-1 max-w-[76px] sm:max-w-[95px] bg-gradient-to-b from-amber-500/20 via-black/85 to-black border border-amber-500/40 rounded-xl sm:rounded-2xl py-2 sm:py-3 px-1 text-center shadow-[inset_0_1px_1px_rgba(255,215,0,0.3)]">
                <div className="text-2xl sm:text-4xl font-black font-mono tabular-nums text-amber-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">
                  {String(countdown.minutes).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-200/90 mt-0.5">
                  Mins · Minute
                </div>
                <div className="text-[9px] text-amber-400/70 font-serif">Remaining</div>
              </div>

              <span className="text-amber-400 font-mono text-xl sm:text-3xl font-black animate-pulse select-none">:</span>

              {/* Seconds */}
              <div className="flex-1 max-w-[76px] sm:max-w-[95px] bg-gradient-to-b from-amber-500/20 via-black/85 to-black border border-amber-500/40 rounded-xl sm:rounded-2xl py-2 sm:py-3 px-1 text-center shadow-[inset_0_1px_1px_rgba(255,215,0,0.3)]">
                <div className="text-2xl sm:text-4xl font-black font-mono tabular-nums text-amber-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]">
                  {String(countdown.seconds).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-200/90 mt-0.5">
                  Secs · Second
                </div>
                <div className="text-[9px] text-amber-400/70 font-serif">Remaining</div>
              </div>
            </div>
          )}

          <p className="mt-2.5 text-[10px] sm:text-xs text-amber-200/70 font-serif italic text-center">
            Hassnain aapki birthday ke har lamhe ka besabri se intezar kar raha hai! 🫂❤️
          </p>
        </div>

        {/* Revealed Letter Container */}
        <div className="space-y-6 sm:space-y-8 transition-all duration-700 animate-fade-in">
          <div className="max-w-2xl mx-auto p-5 sm:p-9 rounded-3xl glass-card border border-amber-500/40 relative shadow-2xl bg-gradient-to-b from-[#13100a] via-[#0d0e17] to-[#07080d]">
            <div className="flex items-center justify-center gap-2 mb-3 text-amber-400">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-serif font-bold text-amber-300">
                From Hassnain's Heart · Hassnain Ali Ke Dil Se
              </span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 animate-pulse" />
            </div>

            <p className="text-sm sm:text-lg text-slate-100 leading-relaxed font-serif min-h-[5.5rem] italic text-left sm:text-center">
              "{typedText}
              {!isTypingComplete && (
                <span className="inline-block w-2 h-5 bg-amber-400 ml-1 animate-pulse" />
              )}
              "
            </p>

            <div className="mt-5 pt-4 border-t border-amber-500/25 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-amber-300/90 font-medium gap-2">
              <span>Hassnain & Umair · Brotherhood Forever 🤝</span>
              <span className="text-rose-400 font-bold">I Love You, Mere Bhai! ❤️</span>
            </div>
          </div>

          {/* Action Celebration Row — Works Everywhere across the full screen! */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
            <button
              onClick={handleMegaCelebrateClick}
              className="px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:shadow-[0_0_50px_rgba(212,175,55,1)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer w-full sm:w-auto justify-center"
            >
              <PartyPopper className="w-5 h-5 text-slate-950 animate-bounce" />
              <span>Full Screen Celebrate! 🎉 Dhamaka</span>
            </button>

            <a
              href="#celebration"
              className="px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 rounded-2xl border border-amber-500/40 hover:border-amber-400 transition-all flex items-center gap-2 justify-center"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Birthday Cake 🎂 Cake Kaato</span>
            </a>

            {/* Canvas Fireworks Display Toggle */}
            <button
              onClick={() => {
                soundEngine.playSparkleSound();
                if (onToggleFireworks) {
                  onToggleFireworks();
                } else {
                  triggerGoldenFireworks();
                }
              }}
              className={`px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold rounded-2xl border transition-all flex items-center gap-2 justify-center cursor-pointer ${
                isFireworksActive
                  ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 text-slate-950 font-bold border-amber-300 shadow-[0_0_35px_rgba(255,215,0,0.8)] animate-pulse'
                  : 'text-amber-200 bg-slate-900/80 hover:bg-slate-800 border-amber-500/40 hover:border-amber-400'
              }`}
              title={
                isFireworksActive
                  ? 'Stop Canvas Fireworks'
                  : 'Start Canvas Fireworks Across Screen'
              }
            >
              <Sparkles
                className={`w-4 h-4 ${
                  isFireworksActive ? 'text-slate-950 animate-spin' : 'text-amber-400'
                }`}
              />
              <span>
                {isFireworksActive
                  ? 'Fireworks: ON 🎆 Aatishbazi Shuru Hai'
                  : 'Fireworks: OFF 🎆 Aatishbazi Chalao'}
              </span>
            </button>
          </div>

          {/* Quick explainer badge for Canvas Fireworks */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                soundEngine.playSparkleSound();
                onToggleFireworks?.();
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] sm:text-xs text-amber-300 hover:bg-amber-500/20 transition-all cursor-pointer"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isFireworksActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'
                }`}
              />
              <span className="font-medium">
                {isFireworksActive
                  ? '✨ Full-Screen Canvas Fireworks running! Tap anywhere for more!'
                  : '✨ Click button above to start continuous screen fireworks!'}
              </span>
            </button>
          </div>

          {celebrateCount > 0 && (
            <p className="text-xs sm:text-sm text-amber-300 font-serif font-semibold animate-pulse">
              🎉 Full Screen Fireworks Blast: {celebrateCount} Times! ✨
            </p>
          )}

          {/* Scroll Down Affordance */}
          <div className="pt-4 sm:pt-6">
            <a
              href="#celebration"
              className="inline-flex flex-col items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors text-xs font-serif"
            >
              <span>Scroll to Explore More</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
