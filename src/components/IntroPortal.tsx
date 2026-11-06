import { Sparkles, Gift, Heart } from 'lucide-react';

interface IntroPortalProps {
  onOpen: () => void;
}

export default function IntroPortal({ onOpen }: IntroPortalProps) {
  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center px-4 py-8 overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Floating party accents */}
      <div className="absolute top-8 left-6 text-2xl sm:text-4xl animate-float opacity-75 pointer-events-none">
        ✨
      </div>
      <div className="absolute top-12 right-6 text-2xl sm:text-4xl animate-float opacity-75 pointer-events-none" style={{ animationDelay: '1.4s' }}>
        🎁
      </div>
      <div className="absolute bottom-10 left-6 text-2xl sm:text-3xl animate-float opacity-70 pointer-events-none" style={{ animationDelay: '2.1s' }}>
        ⭐
      </div>
      <div className="absolute bottom-12 right-6 text-2xl sm:text-4xl animate-float opacity-75 pointer-events-none" style={{ animationDelay: '1.8s' }}>
        ❤️
      </div>

      <div className="relative z-10 max-w-lg w-full mx-auto text-center space-y-6 sm:space-y-8 flex flex-col items-center animate-fade-in my-auto">
        {/* Mysterious Luxury Gift Crest */}
        <div className="relative group cursor-pointer active:scale-95 transition-transform" onClick={onOpen}>
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-0.5 shadow-[0_0_40px_rgba(212,175,55,0.7)] group-hover:scale-105 transition-transform duration-500">
            <div className="w-full h-full rounded-[22px] bg-[#07080f] flex items-center justify-center border border-amber-400/50">
              <Gift className="w-10 h-10 sm:w-14 sm:h-14 text-amber-300 animate-bounce" />
            </div>
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-300"></span>
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-3 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] sm:text-xs font-serif tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Special Birthday Gift · From Hassnain Ali | Hassnain Ka Khas Tehfa</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-gold-gradient tracking-tight leading-tight filter drop-shadow-[0_4px_30px_rgba(212,175,55,0.6)]">
            Open Umair For U
          </h1>
          <p className="text-amber-200/90 font-serif text-sm sm:text-lg font-semibold">
            Umair bhai, yeh khas surprise sirf aapke liye hai! 🎁
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-rose-400 font-serif text-sm sm:text-lg font-bold tracking-wide">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>I Love You So Much, Mere Bhai!</span>
            </div>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="text-xs sm:text-base font-semibold">Hassnain Loves You So Much! ❤️</span>
          </div>

          <p className="font-serif text-xs sm:text-base text-slate-300 max-w-sm sm:max-w-md mx-auto font-light leading-relaxed">
            A personal, unforgettable surprise crafted just for you, my brother. Turn up your sound!
            <br />
            <span className="text-amber-300/80 text-xs sm:text-sm font-normal">
              Awaaz full karo aur apne bhai Hassnain ka pyar dekho! ✨
            </span>
          </p>
        </div>

        {/* Big Touch-Friendly Glowing Button */}
        <div className="pt-1 w-full flex justify-center">
          <button
            onClick={onOpen}
            className="group relative inline-flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-5 text-base sm:text-2xl font-bold text-slate-950 bg-gold-gradient rounded-full shadow-[0_0_40px_rgba(212,175,55,0.8)] hover:shadow-[0_0_70px_rgba(212,175,55,1)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse-glow"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 group-hover:rotate-45 transition-transform" />
              <span className="font-serif tracking-wide">Open Umair For U 🎁</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 border-t sm:border-t-0 sm:border-l border-slate-900/30 pt-0.5 sm:pt-0 sm:pl-2">
              Kholo Umair Bhai!
            </span>
          </button>
        </div>

        <p className="text-[11px] sm:text-xs text-amber-400/80 font-serif tracking-wider text-center">
          ✨ Button dabao aur celebration shuru karo ✨
        </p>
      </div>
    </div>
  );
}
