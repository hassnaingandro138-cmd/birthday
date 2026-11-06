import { useState } from 'react';
import { Smile, Sparkles, Copy, Check, Share2, Heart, Laugh, ThumbsUp, Shuffle, MessageCircle } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';
import { triggerGoldenFireworks, triggerHeartShower } from '../utils/confetti';

interface ComedyItem {
  id: string;
  category: 'joke' | 'shayari' | 'roast';
  categoryLabel: string;
  title: string;
  contentUrdu: string;
  contentEnglish: string;
  punchline?: string;
  authorNote: string;
  defaultLikes: number;
  defaultLaughs: number;
}

const COMEDY_ITEMS: ComedyItem[] = [
  {
    id: 'c-1',
    category: 'joke',
    categoryLabel: 'Funny Joke 😂 Lateefa',
    title: 'Definition of a Best Friend · Sache Dost Ki Tareef',
    contentUrdu: 'Umair ne pucha: "Hassnain, sache jigri dost ki asal tareef kya hai?"\nMaine kaha: "Jo aaj birthday par royal dinner khilaye... aur kal subah poora bill sood ke sath bhej de!" 😂',
    contentEnglish: 'Umair asked: "Hassnain, what is the definition of a best friend?"\nI said: "The guy who treats you to a royal birthday dinner today... and sends you an itemized bill with interest tomorrow morning!" 😂',
    punchline: 'Brotherhood is priceless, but receipts are eternal! / Dosti apni jagah, hisaab apni jagah! 😉',
    authorNote: 'Dedicated to Birthday Boy Umair',
    defaultLikes: 42,
    defaultLaughs: 88,
  },
  {
    id: 'c-2',
    category: 'roast',
    categoryLabel: 'Bro-Roast 😜 Bhabhi Ka Protocol',
    title: "Bhabhi's Chore Plan · Bhabhi Ki Duty",
    contentUrdu: 'Meri dil se dua hai ke Umair bhai ki jald mangni aur shadi ho jaye...\nTakay bhabhi rozana raat ko saare bartan dhone ki VIP duty Umair bhai ko saupein! 🍽️🤣',
    contentEnglish: 'My heartfelt prayer is for your quick engagement and wedding...\nSo Bhabhi can give you the VIP duty of washing all the dishes every single night! 🍽️🤣',
    punchline: 'Bhabhi Zindabad, Umair bartano par tayyar! 💍',
    authorNote: 'Playful Roast From Hassnain',
    defaultLikes: 56,
    defaultLaughs: 104,
  },
  {
    id: 'c-3',
    category: 'shayari',
    categoryLabel: 'Brotherhood Poetry 📜 Shayari',
    title: 'United In Heart · Dilon Ka Rishta',
    contentUrdu: 'Faasle hazaar sahi par dil me wafa hai,\nHassnain ka Umair ke liye har lamha dua hai! 🫂❤️',
    contentEnglish: "Though thousands of miles stand between our way,\nMy love and prayers for you grow stronger every day! 🫂❤️",
    punchline: 'True brotherhood knows no borders! / Sacha bhai chara faaslon ka mohtaj nahi! ✨',
    authorNote: 'Heartfelt Words from Hassnain',
    defaultLikes: 95,
    defaultLaughs: 18,
  },
  {
    id: 'c-4',
    category: 'joke',
    categoryLabel: 'Funny Joke 😂 Chai Ka Adda',
    title: 'Conquering The World · Duniya Fatah Karne Ka Plan',
    contentUrdu: 'Hum dono bhai mil kar poori duniya fatah kar sakte hain...\nShart bas itni hai ke chai aur samoson ke paise koi teesra banda ada kare! ☕😂',
    contentEnglish: 'Together, our brotherhood could conquer the entire world...\nProvided someone else pays for our cups of tea and samosas! ☕😂',
    punchline: 'Tea lovers and brothers for life! / Chai ke deewane aur sache bhai! ☕',
    authorNote: 'Late Night Adda Memories',
    defaultLikes: 48,
    defaultLaughs: 73,
  },
  {
    id: 'c-5',
    category: 'shayari',
    categoryLabel: 'Humorous Poem 📜 Bill Aur Duayein',
    title: 'The Bill & The Duas · Bill Ki Baari',
    contentUrdu: 'Umair bhai khana khate waqt jigri bhai rehte hain,\nJaise hi bill ki baari aati hai, kehte hain: "Yaar Hassnain, bas Allah tujhe bohot dega, tu hi de de!" 💸🤣',
    contentEnglish: 'You are my best brother while eating dinner...\nUntil the bill arrives, then you say: "Bro Hassnain, Allah will reward you immensely, you pay it!" 💸🤣',
    punchline: 'A 100% verified brotherhood fact! / 100% tasdeeq shuda sachai! 💸',
    authorNote: 'Classic Umair Move',
    defaultLikes: 67,
    defaultLaughs: 92,
  },
  {
    id: 'c-6',
    category: 'roast',
    categoryLabel: 'Bro-Roast 😜 8 Dec Ka Moajza',
    title: 'The Legend of Dec 8 · 8 December Ka Moajza',
    contentUrdu: '8 December ko duniya me aik nayab aur tareekhi hasti ne janam liya...\nBaad me pata chala wo to apna shararti bhai Umair Ali hai! 😎🔥❤️',
    contentEnglish: 'On the 8th of December, a legendary soul was born into this world...\nAnd then we found out it was just our crazy, lovable brother Umair Ali! 😎🔥❤️',
    punchline: 'Happy Birthday, my dear brother! / Salgirah Mubarak mere pyare bhai! 🫂',
    authorNote: 'The One & Only Umair Ali',
    defaultLikes: 84,
    defaultLaughs: 65,
  },
];

export default function ComedyCorner() {
  const [activeTab, setActiveTab] = useState<'all' | 'joke' | 'shayari' | 'roast'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reactions, setReactions] = useState<Record<string, { likes: number; laughs: number }>>({});
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const getReactions = (id: string, defaultLikes: number, defaultLaughs: number) => {
    return reactions[id] || { likes: defaultLikes, laughs: defaultLaughs };
  };

  const handleReaction = (id: string, type: 'like' | 'laugh') => {
    soundEngine.playSparkleSound();
    if (type === 'like') {
      triggerHeartShower();
    } else {
      triggerGoldenFireworks();
    }

    setReactions((prev) => {
      const current = prev[id] || {
        likes: COMEDY_ITEMS.find((item) => item.id === id)?.defaultLikes || 0,
        laughs: COMEDY_ITEMS.find((item) => item.id === id)?.defaultLaughs || 0,
      };
      return {
        ...prev,
        [id]: {
          likes: type === 'like' ? current.likes + 1 : current.likes,
          laughs: type === 'laugh' ? current.laughs + 1 : current.laughs,
        },
      };
    });
  };

  const handleCopy = (item: ComedyItem) => {
    const textToCopy = `😂 *Happy Birthday Umair Janeman!* ❤️\n\n"${item.contentUrdu}"\n\n(${item.contentEnglish})\n\n— From your brother Hassnain Ali 🫂`;
    navigator.clipboard.writeText(textToCopy);
    soundEngine.playSparkleSound();
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareWhatsApp = (item: ComedyItem) => {
    const message = encodeURIComponent(
      `🎉 *Birthday Humor For Umair Ali* 😂🎂\n\n"${item.contentUrdu}"\n\n— Love and laughter from Hassnain Ali! 🫂❤️`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const handleRandomSpin = () => {
    soundEngine.playSparkleSound();
    const available = filteredItems.length > 0 ? filteredItems : COMEDY_ITEMS;
    const randomItem = available[Math.floor(Math.random() * available.length)];
    setHighlightedId(randomItem.id);

    const el = document.getElementById(`comedy-card-${randomItem.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const filteredItems =
    activeTab === 'all'
      ? COMEDY_ITEMS
      : COMEDY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="comedy" className="relative py-16 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-serif font-medium">
          <Smile className="w-4 h-4 text-amber-400" />
          <span>Brotherly Laughter · Hassnain Aur Umair Ka Mazaq</span>
          <Smile className="w-4 h-4 text-amber-400" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gold-gradient">
          A Little Laughter & Brotherly Humor 😂🎭
        </h2>
        <p className="font-serif text-sm sm:text-xl text-amber-300 font-bold">
          Bhaiyon Ki Hansi Mazaq, Bhabhi Ke Charche Aur Chutkule 🤣
        </p>

        <p className="text-slate-300 max-w-2xl mx-auto text-xs sm:text-base font-serif px-2">
          True brotherhood isn't complete without playful roasts, inside jokes, and uncontrollable laughter!
          <br />
          <span className="text-amber-300/80 text-xs sm:text-sm font-normal">
            Sacha bhai chara hansi mazaq aur muskurahaton ke baghair adhoora hai.
          </span>
        </p>
      </div>

      {/* Control Bar: Filter Tabs + Random Spinner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 p-2 sm:p-3 rounded-2xl glass-card border border-amber-500/20">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-serif font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            All · Sab
          </button>
          <button
            onClick={() => setActiveTab('joke')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-serif font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === 'joke'
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Jokes 😂 Lateefay
          </button>
          <button
            onClick={() => setActiveTab('shayari')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-serif font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === 'shayari'
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Poetry 📜 Shayari
          </button>
          <button
            onClick={() => setActiveTab('roast')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-serif font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === 'roast'
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Bro-Roast 😜 Roast
          </button>
        </div>

        {/* Action Button: Random Shuffle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomSpin}
            className="px-3.5 py-1.5 text-xs font-serif font-bold rounded-xl bg-gold-gradient text-slate-950 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Random 🎲 Chutkula</span>
          </button>
        </div>
      </div>

      {/* Grid of Comedy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredItems.map((item) => {
          const stats = getReactions(item.id, item.defaultLikes, item.defaultLaughs);
          const isHighlighted = highlightedId === item.id;

          return (
            <div
              key={item.id}
              id={`comedy-card-${item.id}`}
              className={`p-5 sm:p-6 rounded-3xl glass-card transition-all duration-300 flex flex-col justify-between space-y-4 border ${
                isHighlighted
                  ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_30px_rgba(212,175,55,0.4)] scale-[1.02]'
                  : 'border-amber-500/25 hover:border-amber-400/50 hover:-translate-y-1'
              }`}
            >
              {/* Card Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-amber-400 font-serif">
                  <span className="font-bold">{item.categoryLabel}</span>
                  <span className="text-[11px] text-slate-400">{item.authorNote}</span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-slate-100">
                  {item.title}
                </h3>

                {/* Urdu Content (Primary) */}
                <div className="p-4 rounded-2xl bg-black/50 border border-amber-500/20 text-center sm:text-right" dir="rtl">
                  <p className="font-serif text-sm sm:text-base text-amber-100 font-semibold leading-relaxed whitespace-pre-line">
                    "{item.contentUrdu}"
                  </p>
                </div>

                {/* English Content (Translation) */}
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                  <p className="font-serif text-[11px] sm:text-xs text-slate-300 italic leading-relaxed whitespace-pre-line">
                    "{item.contentEnglish}"
                  </p>
                </div>

                {item.punchline && (
                  <p className="text-[11px] sm:text-xs text-amber-300/90 font-serif font-medium">
                    ✨ {item.punchline}
                  </p>
                )}
              </div>

              {/* Card Footer: Interactive Reactions + Share + Copy */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                {/* Reactions */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => handleReaction(item.id, 'laugh')}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 text-xs font-serif flex items-center gap-1 transition-all cursor-pointer border border-slate-800"
                    title="Hilarious! 😂"
                  >
                    <Laugh className="w-3.5 h-3.5 text-amber-400" />
                    <span>{stats.laughs}</span>
                  </button>

                  <button
                    onClick={() => handleReaction(item.id, 'like')}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs font-serif flex items-center gap-1 transition-all cursor-pointer border border-slate-800"
                    title="Send Love! ❤️"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>{stats.likes}</span>
                  </button>
                </div>

                {/* Copy & WhatsApp */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800/60 transition-colors cursor-pointer"
                    title="Copy Joke"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleShareWhatsApp(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800/60 transition-colors cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Fun Quote */}
      <div className="mt-10 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center max-w-lg mx-auto">
        <p className="font-serif text-xs sm:text-sm text-amber-200 italic">
          "You make thousands of friends in a lifetime, but the one who laughs at your worst jokes and still hugs you like a brother is only Umair Ali! ❤️🫂"
        </p>
      </div>
    </section>
  );
}
