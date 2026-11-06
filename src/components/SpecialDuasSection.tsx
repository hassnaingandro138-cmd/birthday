import { Heart, Globe, Gem, Sparkles, MapPin, Smile } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import { triggerHeartShower, triggerMegaCelebration } from '../utils/confetti';

export default function SpecialDuasSection() {
  const handleWishBlessings = () => {
    soundEngine.playSparkleSound();
    triggerHeartShower();
    setTimeout(() => triggerMegaCelebration(), 250);
  };

  return (
    <section id="duas" className="relative py-16 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] sm:w-[700px] h-[300px] sm:h-[500px] bg-amber-500/10 blur-[180px] pointer-events-none" />

      {/* Section Header - Natural & Elegant */}
      <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-serif font-medium">
          <Globe className="w-4 h-4" />
          <span>From Hassnain Ali · Heartfelt Emotions | Hassnain Ke Dili Jazbaat</span>
          <Globe className="w-4 h-4" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gold-gradient">
          No Matter How Great The Distance 🌍❤️
        </h2>
        <p className="font-serif text-sm sm:text-xl text-amber-300 font-bold">
          Faasle Chahe Kitne Bhi Hon, Dil Hamesha Jude Rahenge 🌍❤️
        </p>

        <p className="text-slate-300 max-w-2xl mx-auto text-xs sm:text-base font-serif px-2">
          Even though miles separate us right now, our brotherhood and friendship will forever remain unbreakable.
          <br />
          <span className="text-amber-300/80 text-xs sm:text-sm font-normal">
            Meelon ke faasle bhi Hassnain aur Umair ke la-zawal rishte ko kamzor nahi kar sakte.
          </span>
        </p>
      </div>

      {/* Hero Dedication Card: Long Distance & Sukoon */}
      <div className="relative mb-8 sm:mb-12 p-5 sm:p-10 rounded-3xl glass-card border border-amber-500/40 shadow-[0_20px_50px_rgba(212,175,55,0.2)] bg-gradient-to-br from-[#0c0e18] via-[#090b12] to-[#06070a]">
        {/* Top Floating Badge */}
        <div className="absolute -top-3.5 left-4 sm:left-8 px-3.5 sm:px-5 py-1 rounded-full bg-[#05060A] border border-amber-400/60 text-[11px] sm:text-xs font-serif text-amber-300 tracking-wider flex items-center gap-1.5 shadow-lg whitespace-nowrap">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Miles Apart, United In Heart · Faasle Be-Asar Hain</span>
        </div>

        <div className="space-y-4 pt-3">
          <div className="text-center sm:text-left">
            <span className="text-rose-400 font-serif text-sm sm:text-base font-bold inline-flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>I Love You, My Brother! | Mere Bhai, I Love You! ❤️</span>
            </span>
          </div>

          <div className="space-y-2.5">
            <h3 className="font-serif text-base sm:text-2xl font-bold text-amber-200 leading-snug">
              "Brother, Our Friendship Will Never Weaken And Will Never Break"
            </h3>
            <p className="font-serif text-sm sm:text-lg text-amber-300 font-semibold">
              "Bhai, Hamari Dosti Na Kabhi Kamzor Hogi Aur Na Kabhi Tootegi!"
            </p>

            <p className="font-serif text-xs sm:text-base text-slate-200 leading-relaxed italic">
              "Brother, may Almighty Allah always keep you happy, blessed, and prosperous! Even though we are far apart right now with miles between us, our friendship will never weaken and will never break. You are that cherished brother with whom talking and spending time brings true peace to my heart. I love you brother! Keep smiling always, my friend. Insha'Allah we will meet very soon! 🫂❤️"
            </p>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center sm:text-left">
              <p className="font-serif text-xs sm:text-base text-amber-100 leading-relaxed font-medium">
                "Bhai, Allah Pak aapko hamesha khush, salamat aur abad rakhe! Chahe aaj hamare darmiyan meelon ke faasle hon, hamari dosti na kabhi kamzor hogi aur na kabhi tootegi. Aap wo bhai ho jisse baat karke mere dil ko sacha sukoon milta hai. Bhai, I love you! Hamesha hanste muskurate raho. Insha'Allah bohot jald mulakat hogi! 🫂❤️"
              </p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-amber-500/25 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Spiritual Bond & Lifelong Loyalty · Sachi Wafadari</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
              "True bonds do not depend on distance. No matter how times or circumstances change, in Hassnain's heart, the respect, love, and prayers for Umair will only grow deeper. You are my pride, my brother."
            </p>
            <p className="text-xs text-amber-200/90 leading-relaxed font-serif">
              "Sache rishte faaslon ke mohtaj nahi hote. Halat kuch bhi hon, Hassnain ke dil me Umair ke liye izzat, pyar aur duayein hamesha qaim rahengi. Aap meri shaan ho mere bhai."
            </p>
          </div>

          {/* Signature */}
          <div className="pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-amber-300/90 gap-2 font-serif">
            <span className="font-medium text-slate-300">
              Your True Brother: <strong className="text-amber-400 text-sm">Hassnain Ali</strong> 🫂 Tera Bhai
            </span>
            <span className="text-rose-400 font-bold">
              I Love You Always ❤️
            </span>
            <span className="text-slate-400 italic">
              "Insha'Allah We Will Meet Soon · Insha'Allah Jald Milenge"
            </span>
          </div>
        </div>
      </div>

      {/* Two Highlight Cards: Bhabhi & Sukoon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {/* Bhabhi & Mangni Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-pink-500/30 hover:border-pink-400/60 transition-all shadow-[0_15px_40px_rgba(244,114,182,0.12)] bg-gradient-to-b from-[#140b12] to-[#070509] space-y-4 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 shadow-md">
              <Gem className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-slate-100">
                Brother, Always Stay Happy With Bhabhi! 😉❤️
              </h3>
              <p className="font-serif text-sm sm:text-lg text-pink-300 font-bold">
                Bhai, Bhabhi Ke Sath Hamesha Khush Raho! 😉❤️
              </p>
            </div>

            <p className="font-serif text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "My dearest brother, may you always stay joyful and blessed with Bhabhi! From the bottom of my heart, I pray that God blesses you with your chosen love, fulfills every pure wish of your heart, and grants us the joy of seeing your engagement and marriage very soon! May both of you always remain safe, flourishing, and filled with happiness! Amen! 💍✨"
            </p>

            <div className="p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs sm:text-sm text-pink-100 font-serif leading-relaxed">
              "Meri dil ki gehraiyon se dua hai ke Allah Pak aapko bhabhi ke sath hamesha khush rakhe, humein jald aapki mangni aur shadi ki khushiyan dekhna naseeb farmaye, aur aap dono hamesha hanste muskurate rahein! Ameen! 💍✨"
            </div>
          </div>

          <div className="pt-3 border-t border-pink-500/20 flex items-center justify-between text-xs text-pink-300 font-serif">
            <span>Special Prayer · Dili Dua</span>
            <span>From Hassnain ❤️ Hassnain Ki Taraf Se</span>
          </div>
        </div>

        {/* Sukoon Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-card border border-amber-500/30 hover:border-amber-400/60 transition-all shadow-[0_15px_40px_rgba(212,175,55,0.12)] bg-gradient-to-b from-[#141209] to-[#070604] space-y-4 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-md">
              <Smile className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-slate-100">
                "The One In Whose Company My Heart Finds Peace"
              </h3>
              <p className="font-serif text-sm sm:text-lg text-amber-300 font-bold">
                "Wo Bhai Jisse Baat Karke Dil Ko Sukoon Milta Hai ✨"
              </p>
            </div>

            <p className="font-serif text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "Umair, the truth is that you are that brother with whom a simple conversation lifts all worries and fatigue, bringing boundless peace to my heart. Your friendship is a priceless blessing in my life. May tears never touch your eyes and may laughter always accompany you!"
            </p>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-100 font-serif leading-relaxed">
              "Sach yeh hai ke Umair bhai aap wo bhai ho jisse baat karte hi dil ka sara bojh aur thakan utar jaati hai. Allah Pak aapke chehre par hamesha muskurahat sajaye rakhe!"
            </div>
          </div>

          <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-300 font-serif">
            <span>Pure Brotherhood · Sacha Bhai Chara</span>
            <span>Peace of Heart ✨ Dil Ka Sukoon</span>
          </div>
        </div>
      </div>

      {/* Blessings Grid - Clean & Natural */}
      <div className="p-5 sm:p-8 rounded-3xl glass-card border border-amber-500/30 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-500/20">
          <div>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-gold-gradient">
              Heartfelt Prayers For Umair Ali 🤲✨
            </h3>
            <p className="text-xs text-amber-300 font-serif">
              Umair Bhai Ke Liye Hassnain Ki Dili Duayein
            </p>
          </div>

          <button
            onClick={handleWishBlessings}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-gold-gradient rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Amen Ya Rab 🤲 Ameen Ya Rab</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-amber-500/25 space-y-1.5">
            <div className="text-amber-300 text-xs sm:text-sm font-serif font-bold flex items-center justify-between">
              <span>🤲 Health & Longevity</span>
              <span className="text-amber-400">Sehat Aur Lambi Umar</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
              "O Lord, bless my dear brother Umair with enduring vitality, wellness, peace, and a long, fruitful life."
            </p>
            <p className="text-xs text-amber-200/80 font-serif">
              "Ya Allah, mere bhai Umair ko behtareen sehat, tandrusti aur lambi babarakat zindagi ata farma. Ameen!"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-amber-500/25 space-y-1.5">
            <div className="text-amber-300 text-xs sm:text-sm font-serif font-bold flex items-center justify-between">
              <span>🤲 Success & High Honors</span>
              <span className="text-amber-400">Kamyabi Aur Buland Rutba</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
              "May Almighty God grant you outstanding triumphs in every test and aspiration, crowning your path with honor and dignity."
            </p>
            <p className="text-xs text-amber-200/80 font-serif">
              "Allah Ta'ala aapko zindagi ke har imtehan me shandar kamyabi aur buland izzat ata farmaye. Ameen!"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-pink-500/25 space-y-1.5">
            <div className="text-pink-300 text-xs sm:text-sm font-serif font-bold flex items-center justify-between">
              <span>💍 Joy & Happiness With Bhabhi</span>
              <span className="text-pink-400">Bhabhi Ke Sath Khushiyan & Mangni</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
              "May you be blessed with your true love, celebrate an amazing engagement soon, and spend a joyful, smiling life with Bhabhi!"
            </p>
            <p className="text-xs text-pink-200/90 font-serif">
              "Allah aapko bhabhi ke sath hamesha khush rakhe aur jald mangni aur shadi ki dhum dekhayein! Ameen!"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-amber-500/25 space-y-1.5">
            <div className="text-amber-300 text-xs sm:text-sm font-serif font-bold flex items-center justify-between">
              <span>🤝 Our Eternal Friendship</span>
              <span className="text-amber-400">La-Zawal Dosti Aur Bhai Chara</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
              "Though thousands of miles lie between us, may the friendship between Hassnain and Umair remain strong, blooming, and eternal!"
            </p>
            <p className="text-xs text-amber-200/80 font-serif">
              "Chahe hazaron miles ka faasla ho, Hassnain aur Umair ki dosti hamesha salamat aur chattan ki tarah mazboot rahegi!"
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <p className="font-serif text-xs sm:text-sm text-amber-200 font-bold italic">
            "May you always laugh and prosper, my brother! — Hassnain Ali ❤️ Hamesha Hanste Raho Bhai"
          </p>
        </div>
      </div>
    </section>
  );
}
