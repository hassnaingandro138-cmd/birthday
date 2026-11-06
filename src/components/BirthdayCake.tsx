import { useState } from 'react';
import { Sparkles, Heart, Flame, RotateCcw, PartyPopper } from 'lucide-react';
import { triggerCandleWishSparkles, triggerGoldenFireworks, triggerHeartShower, triggerMegaCelebration } from '../utils/confetti';
import { soundEngine } from '../utils/audioEngine';

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true]);
  const [hasMadeWish, setHasMadeWish] = useState<boolean>(false);
  const [wishCount, setWishCount] = useState<number>(0);

  const allCandlesOut = candlesLit.every(lit => !lit);

  const blowSingleCandle = (index: number) => {
    if (!candlesLit[index]) return;
    soundEngine.playCandleBlowSound();
    const newCandles = [...candlesLit];
    newCandles[index] = false;
    setCandlesLit(newCandles);

    if (newCandles.every(lit => !lit)) {
      handleAllBlown();
    }
  };

  const blowAllCandles = () => {
    if (allCandlesOut) return;
    soundEngine.playCandleBlowSound();
    setCandlesLit([false, false, false]);
    handleAllBlown();
  };

  const handleAllBlown = () => {
    setHasMadeWish(true);
    setWishCount(prev => prev + 1);
    soundEngine.playSparkleSound();
    triggerCandleWishSparkles();
    setTimeout(() => {
      triggerMegaCelebration();
    }, 250);
  };

  const relightCandles = () => {
    soundEngine.playSparkleSound();
    setCandlesLit([true, true, true]);
    setHasMadeWish(false);
  };

  const handleMegaBlast = () => {
    soundEngine.playSparkleSound();
    triggerMegaCelebration();
  };

  return (
    <section id="celebration" className="relative py-14 sm:py-20 px-3 sm:px-6 max-w-5xl mx-auto overflow-hidden">
      {/* Background Section Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-amber-400 font-serif font-semibold">
          <PartyPopper className="w-3.5 h-3.5" />
          <span>Interactive Celebration · Birthday Wishes | Dua Aur Khushiyan</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-gold-gradient">
          Make A Wish & Blow The Candles 🎂
        </h2>
        <p className="font-serif text-sm sm:text-lg text-amber-300 font-bold">
          Dua Maango Aur Mom-Batti Bujhao 🎂✨
        </p>
        <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-base font-serif px-2">
          Click the candles to blow them out and make your heartfelt birthday wish.
          <br />
          <span className="text-amber-300/80 text-xs sm:text-sm font-normal">
            Mom-batti par click karke bujhao aur dil se birthday wish maango!
          </span>
        </p>
      </div>

      {/* Main Cake Stage */}
      <div className="relative max-w-xl mx-auto p-4 sm:p-8 rounded-3xl glass-card border border-amber-500/40 flex flex-col items-center shadow-[0_20px_50px_rgba(212,175,55,0.2)] overflow-hidden">
        {/* Floating Accents */}
        <div className="absolute top-2 left-2 text-2xl sm:text-3xl animate-float opacity-75 select-none pointer-events-none">
          🎈
        </div>
        <div className="absolute top-2 right-2 text-2xl sm:text-3xl animate-float opacity-75 select-none pointer-events-none" style={{ animationDelay: '1.2s' }}>
          🎈
        </div>

        {/* 3 Candles */}
        <div className="flex items-end justify-center gap-6 sm:gap-8 mb-[-4px] z-10">
          {[0, 1, 2].map((idx) => {
            const isLit = candlesLit[idx];
            return (
              <div
                key={idx}
                onClick={() => blowSingleCandle(idx)}
                className="group flex flex-col items-center cursor-pointer relative active:scale-95 transition-transform"
                title={isLit ? "Click to blow out candle" : "Candle is blown out"}
              >
                {/* Flame or Rising Smoke */}
                <div className="h-9 sm:h-10 flex items-end justify-center mb-1">
                  {isLit ? (
                    <div className="relative">
                      {/* Candle flame */}
                      <div className="w-3.5 sm:w-4 h-7 sm:h-8 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 animate-flame shadow-[0_0_18px_rgba(255,180,0,1)]" />
                      {/* Inner blue hot core */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full bg-blue-400 opacity-80" />
                    </div>
                  ) : (
                    <div className="animate-smoke flex flex-col items-center text-slate-400 text-xs font-mono">
                      <span className="text-slate-400/80 text-xs">~</span>
                      <span className="text-slate-500/60 text-[10px]">~</span>
                    </div>
                  )}
                </div>

                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-slate-700" />

                {/* Candle Body */}
                <div className="w-4 sm:w-5 h-12 sm:h-16 rounded-t-sm bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 border border-amber-600/30 shadow-md relative overflow-hidden transition-transform group-hover:scale-105">
                  <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#996515_4px,#996515_8px)]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Tier Cake Graphics - Mobile Responsive */}
        <div className="w-full flex flex-col items-center max-w-full overflow-hidden">
          {/* Top Layer */}
          <div className="w-44 sm:w-60 h-12 sm:h-14 rounded-t-2xl bg-gradient-to-r from-[#201810] via-[#352516] to-[#201810] border-t border-x border-amber-500/40 relative shadow-inner flex items-center justify-center">
            <div className="absolute top-0 left-0 right-0 h-3 sm:h-4 bg-gradient-to-b from-amber-200 to-amber-400/90 rounded-b-md shadow-sm opacity-90" />
            <span className="font-serif text-[10px] sm:text-xs font-bold text-amber-200 tracking-widest pt-1 sm:pt-2">
              UMAIR ALI · MERA PYARA BHAI
            </span>
          </div>

          {/* Middle Layer */}
          <div className="w-56 sm:w-76 h-14 sm:h-16 rounded-t-lg bg-gradient-to-r from-[#17120c] via-[#2a1d12] to-[#17120c] border-t border-x border-amber-500/40 relative flex items-center justify-center shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-2.5 sm:h-3 bg-gradient-to-b from-amber-300 to-amber-500/80 rounded-b-md" />
            <div className="flex items-center gap-1.5 sm:gap-2 pt-1">
              <span className="text-amber-400 text-[10px] sm:text-xs">✨</span>
              <span className="font-serif text-[10px] sm:text-xs font-bold text-gold-gradient tracking-widest">
                FROM HASSNAIN ALI · TERA JIGAR
              </span>
              <span className="text-amber-400 text-[10px] sm:text-xs">✨</span>
            </div>
          </div>

          {/* Bottom Layer */}
          <div className="w-68 sm:w-96 max-w-full h-16 sm:h-20 rounded-t-lg bg-gradient-to-r from-[#120e09] via-[#24180d] to-[#120e09] border-t border-x border-amber-500/40 relative flex items-center justify-center shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-3 sm:h-4 bg-gradient-to-b from-amber-300 to-amber-500/80 rounded-b-md" />
            <span className="font-serif text-[10px] sm:text-xs md:text-sm font-medium text-amber-200/90 italic tracking-wider pt-2 text-center px-2">
              "I Love You So Much Mere Bhai ❤️ Hamesha Sath Hain"
            </span>
          </div>

          {/* Golden Platter / Stand */}
          <div className="w-[17.5rem] sm:w-[26rem] max-w-[95%] h-4 sm:h-5 rounded-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 shadow-[0_10px_30px_rgba(212,175,55,0.4)] border border-amber-400" />
          <div className="w-24 sm:w-32 h-5 sm:h-6 bg-gradient-to-b from-amber-600 to-amber-900 rounded-b-lg border-x border-b border-amber-500/30" />
        </div>

        {/* Revealed Wish Message upon blowing candles */}
        {hasMadeWish && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl bg-amber-500/15 border border-amber-400/60 text-center animate-fade-in space-y-2 max-w-md w-full shadow-[0_0_35px_rgba(212,175,55,0.35)]">
            <div className="flex items-center justify-center gap-1.5 text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
              <span className="font-serif text-base sm:text-xl font-bold text-gold-gradient">
                Mubarak Ho Umair Bhai! Dua Qabool Ho! ✨
              </span>
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
            </div>
            <p className="font-serif text-xs sm:text-sm text-amber-300 font-bold">
              Umair bhai, Allah aapke tamam khwab aur dili duayein qabool farmaye! Ameen 🤲❤️
            </p>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
              "Allah Pak aapko bhabhi ke sath hamesha hansta muskurata rakhe, lambi umar aur dhero kamyabiyan ata farmaye! Ameen Ya Rab 🤲❤️"
            </p>
          </div>
        )}

        {/* Cake Controls - Touch friendly on mobile */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full">
          {!allCandlesOut ? (
            <button
              onClick={blowAllCandles}
              className="px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-950 bg-gold-gradient rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer justify-center flex-1 sm:flex-initial"
            >
              <Flame className="w-4 h-4 text-slate-950" />
              <span>Blow Candles 💨 Phoonk Maro</span>
            </button>
          ) : (
            <button
              onClick={relightCandles}
              className="px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl hover:bg-amber-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer justify-center flex-1 sm:flex-initial"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Light Again 🕯️ Phir Jalao</span>
            </button>
          )}

          <button
            onClick={handleMegaBlast}
            className="px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer justify-center flex-1 sm:flex-initial"
          >
            <PartyPopper className="w-4 h-4 text-slate-950" />
            <span>Full Blast! 🎆 Dhamaka</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSparkleSound();
              triggerHeartShower();
            }}
            className="px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-slate-200 bg-slate-900/80 border border-slate-700 hover:border-red-500/40 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer justify-center"
          >
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>Send Love ❤️ Pyar Bhejo</span>
          </button>
        </div>

        {wishCount > 0 && (
          <p className="mt-3 text-[11px] sm:text-xs text-amber-300 font-serif">
            Celebrated: {wishCount} Times ✨
          </p>
        )}
      </div>
    </section>
  );
}
