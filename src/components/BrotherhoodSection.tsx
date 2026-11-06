import { Heart, Shield, Sparkles, Star, Users } from 'lucide-react';

export default function BrotherhoodSection() {
  const englishMessage =
    "Umair Ali, some friends don't just enter your life as companions—they become your true brothers. You are one of those rare souls to me. Every moment shared with you is deeply precious, and speaking with you always brings peace and comfort to my heart. No matter how times change or miles separate us, our friendship will never weaken and will never break. Brother, always stay happy with Bhabhi! It is my heartfelt prayer that God grants you your true love, blesses you with the joy of engagement and marriage soon, and keeps you safe from every harm. Insha'Allah we will meet very soon! Happy Birthday to my wonderful brother! I love you! ❤️🫂";

  const urduMessage =
    "Umair Ali, kuch dost zindagi me sirf dost ban kar nahi aate balkay sage bhaiyon se bhi barhkar ban jaate hain. Tu mere liye wahi anmol bhai hai. Tere sath guzra har lamha qeemti hai aur tujh se baat karke mere dil ko haqeeqi sukoon milta hai. Chahe waqt badle ya hum hazaron miles door hon, hamari dosti aur bhai chara na kabhi kamzor hoga aur na kabhi tootega. Bhai, bhabhi ke sath hamesha hanste muskurate raho! Meri dil se dua hai ke Allah Pak tujhe bhabhi ke sath hamesha khush rakhe, jald mangni aur shadi ki khushiyan ata farmaye, aur har buri nazar se mehfooz rakhe. Insha'Allah hum bohot jald milenge! Salgirah bohot bohot mubarak ho mere bhai, I love you! ❤️🫂";

  const pillars = [
    {
      title: "A Bond Deeper Than Blood",
      titleUrdu: "Khoon Ke Rishton Se Bhi Gehra Rishta",
      desc: "Destiny gives us blood relatives, but loyalty, respect, and unconditional love bring souls closer than anything else. You are that brother to me.",
      descUrdu: "Qismat rishtey banati hai magar wafa, izzat aur be-laus pyar dilon ko jodta hai. Umair bhai, aap mere liye wahi sache bhai ho.",
      icon: Users,
    },
    {
      title: "Distance Cannot Weaken Us",
      titleUrdu: "Faasle Humein Kabhi Door Nahi Kar Sakte",
      desc: "No matter the physical distance, the bond between two sincere brothers never fades. Our brotherhood transcends both time and miles.",
      descUrdu: "Chahe kitna bhi faasla ho aur hum door hon, sache bhaiyon ka rishta na kabhi kamzor hota hai aur na kabhi tootega.",
      icon: Shield,
    },
    {
      title: "Peace of Heart & Joy With Bhabhi",
      titleUrdu: "Dil Ka Sukoon Aur Bhabhi Ke Sath Khushiyan",
      desc: "You are the brother whose conversation brings peace to the soul. My prayer is for your everlasting joy, high honors, and happiness with Bhabhi.",
      descUrdu: "Aap wo bhai ho jisse baat karke dil ko sukoon milta hai. Dua hai ke bhabhi ke sath aapki zindagi hamesha gulzar rahe!",
      icon: Star,
    },
  ];

  return (
    <section id="brotherhood" className="relative py-16 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[700px] h-[300px] sm:h-[400px] bg-amber-500/5 blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gold-gradient">
          Not Just Friendship, It's True Brotherhood ❤️
        </h2>
        <p className="font-serif text-sm sm:text-xl text-amber-300 font-bold">
          Sirf Dosti Nahi, Sage Bhaiyon Jaisa Atoot Rishta Hai ❤️
        </p>

        <p className="text-slate-300 max-w-2xl mx-auto text-xs sm:text-base font-serif px-2">
          From laughs and jokes to standing by each other at every crossroads in life — this bond is forever.
          <br />
          <span className="text-amber-300/80 text-xs sm:text-sm font-normal">
            Hansi mazaq se le kar zindagi ke har mod par sath nibhane tak — yeh dosti hamesha ke liye hai.
          </span>
        </p>
      </div>

      {/* Central Emotional Dedication Card */}
      <div className="relative mb-12 sm:mb-14 p-5 sm:p-12 rounded-3xl glass-card border border-amber-500/40 shadow-[0_15px_40px_-15px_rgba(212,175,55,0.25)] bg-gradient-to-br from-[#110e0a] via-[#0b0c14] to-[#06070a]">
        <div className="pt-2 pb-2 text-center">
          <span className="text-rose-400 font-serif text-sm sm:text-lg font-bold flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            <span>I Love You, My Brother!</span>
            <span className="text-slate-500">·</span>
            <span>Mere Bhai, I Love You So Much! ❤️</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          </span>
        </div>

        {/* English Message */}
        <blockquote className="font-serif text-xs sm:text-lg text-slate-200 leading-relaxed text-center italic max-w-4xl mx-auto pt-3">
          "{englishMessage}"
        </blockquote>

        {/* Roman Urdu Message for Umair to read easily */}
        <div className="my-5 p-4 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
          <p className="font-serif text-sm sm:text-xl text-amber-200 leading-relaxed font-medium">
            "{urduMessage}"
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-3 font-serif text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">Dedicated To:</span>
            <span className="text-slate-200">Umair Ali (My Dear Brother · Mera Jigar)</span>
          </div>
          <div className="flex items-center gap-2 text-rose-400 font-bold">
            <span>Brotherhood Forever 🤝 Bhai Chara Zindabad</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">From:</span>
            <span className="text-slate-200">Hassnain Ali 🫂❤️ Tera Bhai</span>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Brotherhood */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {pillars.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <div
              key={i}
              className="p-5 sm:p-8 rounded-2xl glass-card glass-card-hover border border-amber-500/25 space-y-3 sm:space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-base sm:text-xl font-bold text-slate-100">
                    {pillar.title}
                  </h3>
                  <p className="font-serif text-xs sm:text-sm text-amber-300 font-semibold">
                    {pillar.titleUrdu}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif">
                  {pillar.desc}
                </p>
                <p className="text-xs text-amber-200/80 leading-relaxed font-serif">
                  {pillar.descUrdu}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
