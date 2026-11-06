import { useState, useEffect } from 'react';
import { Gift, Heart, Sparkles, Send, RotateCcw } from 'lucide-react';
import { triggerGiftOpeningExplosion, triggerHeartShower, triggerMegaCelebration } from '../utils/confetti';
import { soundEngine } from '../utils/audioEngine';
import giftBoxImg from '../assets/images/gift_luxury_box_gold_1792665712333.jpg';

interface VirtualGiftSectionProps {
  onTriggerFinalSurprise: () => void;
}

export default function VirtualGiftSection({
  onTriggerFinalSurprise,
}: VirtualGiftSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRibbonUntying, setIsRibbonUntying] = useState(false);
  const [typedLetter, setTypedLetter] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  const letterLines = [
    "My Dearest Brother Umair Ali ❤️ | Mere Pyare Bhai Umair Ali,",
    "",
    "Yeh dili tehfa us bhai ke naam jiski dosti aur izzat mere dil me sab se barhkar hai. Tu mere liye sirf best friend nahi, balkay sage bhaiyon se bhi barhkar hai.",
    "",
    "Bhai, Allah Pak aapko hamesha khush, salamat aur hansta muskurata rakhe! Meelon ke faasle hamari dosti aur bhai charay ko na kabhi kamzor kar sakte hain aur na kabhi todenge. Aap wo anmol bhai ho jisse baat karke mere dil ko sacha sukoon milta hai.",
    "",
    "Aur bhai, bhabhi ke sath hamesha hanste muskurate raho! 😉❤️ Meri dil se dua hai ke Allah Pak aapko bhabhi ke sath hamesha khush rakhe, aur humein jald aapki mangni aur shadi ki dhum-dham dekhna naseeb farmaye! 💍✨",
    "",
    "Insha'Allah bohot jald hamari mulakat hogi aur hum bohot sari nayi yaadein banayenge. Duniya idhar se udhar ho jaye, Hassnain ki Umair ke liye mohabbat, izzat aur duayein hamesha qaim rahengi! Salgirah bohot bohot mubarak ho Umair bhai! ❤️🎂",
    "",
    "— I Love You So Much, Tera Bhai Hassnain Ali 🫂❤️ (Hamesha Ke Liye)"
  ];

  const fullLetter = letterLines.join('\n');

  const handleOpenGift = () => {
    if (isOpen || isRibbonUntying) return;

    soundEngine.playSparkleSound();
    setIsRibbonUntying(true);

    setTimeout(() => {
      soundEngine.playGiftOpenSound();
      triggerGiftOpeningExplosion();
      triggerHeartShower();
      setTimeout(() => triggerMegaCelebration(), 400);
      setIsOpen(true);
      setIsRibbonUntying(false);
    }, 700);
  };

  const handleResetGift = () => {
    setIsOpen(false);
    setTypedLetter('');
    setIsTypingDone(false);
  };

  // Letter typing animation
  useEffect(() => {
    if (!isOpen) {
      setTypedLetter('');
      setIsTypingDone(false);
      return;
    }

    let i = 0;
    setTypedLetter('');
    setIsTypingDone(false);

    const interval = setInterval(() => {
      if (i < fullLetter.length) {
        setTypedLetter(fullLetter.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 14);

    return () => clearInterval(interval);
  }, [isOpen, fullLetter]);

  return (
    <section id="gift" className="relative py-24 px-4 max-w-5xl mx-auto">
      {/* Background Section Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-serif font-medium">
          <Gift className="w-4 h-4" />
          <span>Special Gift · Khas Salgirah Ka Tehfa</span>
          <Gift className="w-4 h-4" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gold-gradient">
          Special Virtual Gift & Heartfelt Letter 🎁
        </h2>
        <p className="font-serif text-sm sm:text-xl text-amber-300 font-bold">
          Umair Bhai Ke Liye Khas Tehfa Aur Pyar Bhara Khat 🎁💌
        </p>

        <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base font-serif">
          Wrapped in silk and gold, this surprise was crafted just for you. Click on the box to reveal what lies within.
        </p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {!isOpen ? (
          /* Gift Box In Closed State */
          <div className="flex flex-col items-center space-y-6">
            <div
              onClick={handleOpenGift}
              className={`relative cursor-pointer group transition-all duration-500 ${
                isRibbonUntying ? 'scale-110 rotate-3' : 'hover:scale-105 active:scale-95'
              }`}
            >
              {/* Outer Golden Aura */}
              <div className="absolute -inset-4 rounded-3xl bg-amber-400/20 blur-xl group-hover:bg-amber-400/40 transition-all animate-pulse" />

              {/* Gift Box Card Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-amber-400 shadow-[0_20px_50px_rgba(212,175,55,0.4)]">
                <img
                  src={giftBoxImg}
                  alt="Luxury Golden Gift Box Wrapped in Silk Ribbon for Umair Ali"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('gift_box.jpg')) {
                      target.src = '/images/gift_box.jpg';
                    }
                  }}
                  loading="lazy"
                  decoding="async"
                />

                {/* Sparkling lights overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-amber-500/10" />

                {/* Floating sparkle badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/60 text-xs font-semibold font-serif text-amber-300 whitespace-nowrap flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click to Open · Kholne Ke Liye Click Karo</span>
                </div>
              </div>
            </div>

            {/* Instruction button */}
            <button
              onClick={handleOpenGift}
              className="px-8 py-4 text-sm sm:text-base font-bold text-slate-950 bg-gold-gradient rounded-full shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:shadow-[0_0_55px_rgba(212,175,55,0.9)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5"
            >
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-slate-950" />
                <span className="font-serif">Open Your Birthday Gift 🎁</span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 border-t sm:border-t-0 sm:border-l border-slate-900/30 pt-0.5 sm:pt-0 sm:pl-2">
                Kholo Umair Bhai!
              </span>
            </button>
          </div>
        ) : (
          /* Gift Box In Opened State: Secret Letter Revealed */
          <div className="w-full space-y-8 animate-fade-in">
            {/* The Secret Parchment Letter */}
            <div className="relative p-8 sm:p-12 rounded-3xl glass-card border border-amber-500/40 shadow-[0_20px_60px_rgba(212,175,55,0.3)] bg-gradient-to-b from-[#13110d] via-[#0d0f17] to-[#07080d]">
              {/* Top Seal */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-amber-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-slate-950 shadow-md">
                    <Heart className="w-5 h-5 fill-slate-950" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm sm:text-base font-bold text-amber-300">
                      A Brother's Private Letter
                    </h3>
                    <p className="text-[11px] text-slate-400 font-serif">From Hassnain Ali To His Beloved Brother</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetGift}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800/80 transition-colors"
                    title="Close Gift"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Letter Body with typing animation */}
              <div className="whitespace-pre-line font-serif text-base sm:text-lg text-slate-100 leading-relaxed font-normal min-h-[16rem]">
                {typedLetter}
                {!isTypingDone && (
                  <span className="inline-block w-2 h-5 bg-amber-400 ml-1 animate-pulse" />
                )}
              </div>

              {/* Footer Quote */}
              <div className="mt-8 pt-6 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-300/80 gap-3 font-serif">
                <span className="italic">"Not merely blood, but a sacred bond of loyalty and soul."</span>
                <span>Hassnain & Umair · Brotherhood Forever</span>
              </div>
            </div>

            {/* Final Glowing Button: "One More Surprise? ❤️" */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <button
                onClick={() => {
                  soundEngine.playSparkleSound();
                  triggerMegaCelebration();
                  onTriggerFinalSurprise();
                }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.7)] hover:shadow-[0_0_70px_rgba(212,175,55,1)] hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse-glow"
              >
                <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform" />
                <span className="font-serif">One More Surprise? ❤️</span>
                <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-slate-400 font-serif">
                Click to unveil the grand finale celebration and fireworks ✨
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
