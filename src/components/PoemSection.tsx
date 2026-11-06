import { useState } from 'react';
import { Feather, Copy, Check, Share2, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import { triggerGoldenFireworks, triggerMegaCelebration } from '../utils/confetti';

export default function PoemSection() {
  const [copied, setCopied] = useState(false);

  interface PoemStanza {
    urdu: string[];
    english: string[];
  }

  const poemStanzas: PoemStanza[] = [
    {
      urdu: [
        "Aaj ka din hai mere jigri bhai ke naam ❤️",
        "Khushiyon se mehke teri har subah aur har shaam"
      ],
      english: [
        "Today belongs entirely to my brother, ❤️",
        "May endless smiles brighten your every morning and evening."
      ]
    },
    {
      urdu: [
        "Door ho kar bhi dil ke sab se paas rehta hai tu,",
        "Mere liye sage bhaiyon se bhi khas rehta hai tu!"
      ],
      english: [
        "Though miles divide our roads across the land,",
        "You remain closer to my heart than anyone else."
      ]
    },
    {
      urdu: [
        "Salgirah Mubarak ho mere bhai, mere yaar 🎂",
        "Hamari dosti rahegi hamesha bar-qarar! 🫂❤️"
      ],
      english: [
        "Happy Birthday to my closest brother and friend,",
        "A bond of brotherhood that will never end! 🫂❤️"
      ]
    }
  ];

  const fullPoemText = poemStanzas
    .map((s) => `${s.urdu.join('\n')}\n(${s.english.join(' ')})`)
    .join('\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPoemText);
    setCopied(true);
    soundEngine.playSparkleSound();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`*Happy Birthday Umair Janeman!* 🎂❤️\n\n${fullPoemText}\n\n— With love from Hassnain Ali ✨`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <section id="shayari" className="relative py-24 px-4 max-w-5xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-medium">
          <Feather className="w-4 h-4" />
          <span>Poem & Shayari · Umair Bhai Ke Liye Shayari</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gold-gradient">
          A Special Birthday Poem 📜
        </h2>
        <p className="font-serif text-sm sm:text-xl text-amber-300 font-bold">
          Salgirah Ki Khubsurat Shayari Aur Nazm 📜✨
        </p>

        <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base font-serif">
          My words, but my truest feelings for you. A special tribute dedicated to my dear brother.
        </p>
      </div>

      {/* Luxury Poem Scroll Card */}
      <div className="relative max-w-2xl mx-auto p-8 sm:p-14 rounded-3xl glass-card border border-amber-500/40 shadow-[0_20px_50px_rgba(212,175,55,0.2)] flex flex-col items-center">
        {/* Ornate corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 rounded-tl" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400/60 rounded-tr" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400/60 rounded-bl" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 rounded-br" />

        {/* Feather & Heart Crest */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600/30 via-amber-400/20 to-transparent border border-amber-400/40 flex items-center justify-center mb-8 shadow-inner">
          <Feather className="w-6 h-6 text-amber-300" />
        </div>

        <h3 className="font-serif text-base sm:text-xl font-bold tracking-widest text-amber-200/90 uppercase mb-8 pb-3 border-b border-amber-500/30 flex items-center gap-2 text-center">
          <span>Tribute: Dedicated To My Brother · Umair Ali (Mera Jigar)</span>
          <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
        </h3>

        {/* The 3 Stanzas */}
        <div className="space-y-8 text-center w-full">
          {poemStanzas.map((stanza, sIdx) => (
            <div key={sIdx} className="space-y-2 p-3 rounded-2xl bg-amber-500/5 border border-amber-500/15">
              {/* Roman Urdu Verse */}
              <div className="space-y-1">
                {stanza.urdu.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className="font-serif text-lg sm:text-2xl text-amber-200 font-bold tracking-wide leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </div>
              {/* English Translation */}
              <div className="pt-1.5 border-t border-amber-500/10 space-y-0.5">
                {stanza.english.map((line, lIdx) => (
                  <p
                    key={lIdx}
                    className="font-serif text-xs sm:text-sm text-slate-300 italic font-light"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider with Gold Diamond */}
        <div className="my-8 flex items-center justify-center gap-3 w-48 text-amber-400/50">
          <div className="h-[1px] flex-1 bg-amber-500/30" />
          <Sparkles className="w-4 h-4 text-amber-400" />
          <div className="h-[1px] flex-1 bg-amber-500/30" />
        </div>

        {/* Action Controls: Copy & Share */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 text-xs sm:text-sm font-serif font-bold rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Poem Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-400" />
                <span>Copy Poem</span>
              </>
            )}
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="px-5 py-2.5 text-xs sm:text-sm font-serif font-bold rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>Share On WhatsApp</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playSparkleSound();
              triggerMegaCelebration();
            }}
            className="px-5 py-2.5 text-xs sm:text-sm font-serif font-bold rounded-xl bg-gold-gradient text-slate-950 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Celebrate Poem ✨</span>
          </button>
        </div>
      </div>
    </section>
  );
}
