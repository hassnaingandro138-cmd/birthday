import { useState, useEffect } from 'react';
import { Camera, Eye, X, Upload, Sparkles, RefreshCw } from 'lucide-react';
import memorySunset from '../assets/images/memory_brotherhood_sunset_1792665712598.jpg';
import memoryLegend from '../assets/images/memory_legend_portrait_1792665711600.jpg';
import memoryCelebration from '../assets/images/memory_celebration_vibes_1792665712728.jpg';

export interface MemoryItem {
  id: string;
  title: string;
  category: 'favorite' | 'legend' | 'brotherhood';
  categoryLabel: string;
  image: string;
  fallbackImage: string;
  caption: string;
  date: string;
  isCustom?: boolean;
}

const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'Golden Sunset & Brotherhood · La-Zawal Dosti',
    category: 'brotherhood',
    categoryLabel: 'Brotherhood Forever 🤝 Bhai Chara',
    image: memorySunset,
    fallbackImage: '/images/memory_brotherhood.jpg',
    caption: 'Standing shoulder to shoulder on every road. Har mod par kandhe se kandha mila kar sath nibhana.',
    date: 'December 8th Memories',
  },
  {
    id: 'mem-2',
    title: 'Umair Ali — The Legend · Umair Bhai Ki Shaan',
    category: 'legend',
    categoryLabel: 'The Legend 😎 Hamari Shaan',
    image: memoryLegend,
    fallbackImage: '/images/memory_legend.jpg',
    caption: 'A dignified stance and a heart of pure gold. Aik ba-waqar muskurahat aur sone jaisa sacha dil.',
    date: 'Cherished Moments',
  },
  {
    id: 'mem-3',
    title: 'Late-Night Chai & Laughter · Chai Aur Qehqahey',
    category: 'favorite',
    categoryLabel: 'Favorite Memories 💖 Yaadgar Lamhe',
    image: memoryCelebration,
    fallbackImage: '/images/memory_celebration.jpg',
    caption: 'Late-night tea sessions and unforgettable laughs. Dair raat ki chai aur dil khol kar hansna.',
    date: 'Close To Heart',
  },
  {
    id: 'mem-4',
    title: 'A Support In Every Challenge · Har Mushkil Me Sahara',
    category: 'brotherhood',
    categoryLabel: 'Brotherhood Forever 🤝 Bhai Chara',
    image: memorySunset,
    fallbackImage: '/images/memory_brotherhood.jpg',
    caption: 'A brother in whom one can place blind trust. Jis par aankh band karke bharosa kiya ja sakay.',
    date: 'A Symbol of Loyalty',
  },
  {
    id: 'mem-5',
    title: 'Life of Every Gathering · Mehfil Ki Jaan',
    category: 'legend',
    categoryLabel: 'The Legend 😎 Hamari Shaan',
    image: memoryLegend,
    fallbackImage: '/images/memory_legend.jpg',
    caption: 'The life of every gathering — Umair Ali in all his glory. Yaaron ka yaar aur mehfil ki jaan.',
    date: 'Priceless Moment',
  },
  {
    id: 'mem-6',
    title: 'Celebration of Smiles · Duayein Aur Muskurahatein',
    category: 'favorite',
    categoryLabel: 'Favorite Memories 💖 Yaadgar Lamhe',
    image: memoryCelebration,
    fallbackImage: '/images/memory_celebration.jpg',
    caption: 'May every sunrise bring endless smiles and blessings! Allah Pak zindagi ko khushiyon se bhar de.',
    date: 'Celebration of Smiles',
  },
];

const STORAGE_KEY = 'umair_birthday_memories_v2';

export default function MemoriesGallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'favorite' | 'legend' | 'brotherhood'>('all');
  const [memories, setMemories] = useState<MemoryItem[]>(DEFAULT_MEMORIES);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMemories(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const saveMemories = (newMemories: MemoryItem[]) => {
    setMemories(newMemories);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMemories));
    } catch {
      // ignore
    }
  };

  const [isResetConfirming, setIsResetConfirming] = useState<boolean>(false);

  const resetToDefault = () => {
    setMemories(DEFAULT_MEMORIES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsResetConfirming(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, photoId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        const updated = memories.map((item) =>
          item.id === photoId ? { ...item, image: base64, isCustom: true } : item
        );
        saveMemories(updated);
        if (selectedPhoto && selectedPhoto.id === photoId) {
          setSelectedPhoto({ ...selectedPhoto, image: base64, isCustom: true });
        }
        setEditingPhotoId(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const filteredMemories =
    activeCategory === 'all'
      ? memories
      : memories.filter((m) => m.category === activeCategory);

  return (
    <section id="memories" className="relative py-24 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-400 font-serif font-medium">
          <Camera className="w-4 h-4" />
          <span>Cherished Moments · Yaadgar Lamhat</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gold-gradient">
          Treasured Memories Gallery 📸
        </h2>
        <p className="font-serif text-sm sm:text-xl text-amber-300 font-bold">
          Yaadgar Lamhat Aur Haseen Tasweerein 📸✨
        </p>

        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base font-serif">
          Capturing beautiful milestones of our brotherhood. You can also click on any memory card to upload real photos of you and Umair!
          <br />
          <span className="text-amber-300/80 text-xs sm:text-sm font-normal">
            Hamari dosti ke yaadgar aur sunhere lamhe. Aap card par click karke apni tasweerein bhi laga sakte hain!
          </span>
        </p>
      </div>

      {/* Interactive Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <div className="inline-flex flex-wrap p-1.5 rounded-xl bg-slate-900/80 border border-amber-500/20 backdrop-blur-md">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-serif font-medium rounded-lg transition-all ${
              activeCategory === 'all'
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            All · Sab Tasweerein
          </button>
          <button
            onClick={() => setActiveCategory('favorite')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-serif font-medium rounded-lg transition-all ${
              activeCategory === 'favorite'
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Favorites 💖 Pasandida
          </button>
          <button
            onClick={() => setActiveCategory('legend')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-serif font-medium rounded-lg transition-all ${
              activeCategory === 'legend'
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            The Legend 😎 Umair Ali
          </button>
          <button
            onClick={() => setActiveCategory('brotherhood')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-serif font-medium rounded-lg transition-all ${
              activeCategory === 'brotherhood'
                ? 'bg-gold-gradient text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Brotherhood 🤝 Bhai Chara
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredMemories.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl glass-card overflow-hidden border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(212,175,55,0.2)] flex flex-col"
          >
            {/* Image Container with 4:3 Ratio */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setSelectedPhoto(item)}>
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (item.fallbackImage && !target.src.includes(item.fallbackImage)) {
                    target.src = item.fallbackImage;
                  }
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <div className="p-3 rounded-full bg-gold-gradient text-slate-950 shadow-lg transform group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5" />
                </div>
              </div>

              <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md border border-amber-500/30 text-[11px] font-serif font-medium text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{item.categoryLabel}</span>
              </div>

              {item.isCustom && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-500/90 text-slate-950 text-[10px] font-bold font-serif">
                  Real Photo
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 leading-relaxed font-serif">
                  {item.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-serif">
                <span>{item.date}</span>

                <button
                  onClick={() => setEditingPhotoId(item.id)}
                  className="hover:text-amber-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  title="Upload your own photo here"
                >
                  <Upload className="w-3 h-3 text-amber-400" />
                  <span>Change Photo</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Helper Footer for user */}
      <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400 font-serif">
        <span className="flex items-center gap-1.5 text-amber-300/90">
          <Camera className="w-3.5 h-3.5" />
          Want to upload real photos of you and Umair? Click "Change Photo" on any card!
        </span>
        {!isResetConfirming ? (
          <button
            onClick={() => setIsResetConfirming(true)}
            className="text-slate-500 hover:text-slate-300 underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset To Default Photos</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-amber-500/30">
            <span className="text-amber-300">Reset photos?</span>
            <button
              onClick={resetToDefault}
              className="text-emerald-400 font-bold hover:underline cursor-pointer"
            >
              Yes
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setIsResetConfirming(false)}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              No
            </button>
          </div>
        )}
      </div>

      {/* Hidden File Input when clicking Replace Photo */}
      {editingPhotoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="glass-card max-w-md w-full p-6 sm:p-8 rounded-3xl border border-amber-500/50 space-y-5 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold text-slate-100 flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Real Photo</span>
              </h4>
              <button
                onClick={() => setEditingPhotoId(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              Select any photo of you and Umair from your phone or computer. It will update this memory frame instantly!
            </p>

            <label className="border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
              <Camera className="w-8 h-8 text-amber-400 animate-bounce" />
              <span className="text-xs font-serif font-bold text-slate-200">
                Click Here To Choose An Image
              </span>
              <span className="text-[10px] text-slate-400 font-mono">JPG, PNG, WebP Images</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, editingPhotoId)}
              />
            </label>

            <button
              onClick={() => setEditingPhotoId(null)}
              className="w-full py-2.5 text-xs font-serif text-slate-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl glass-card border border-amber-500/40 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Title and Close */}
            <div className="p-4 sm:px-6 border-b border-amber-500/20 flex items-center justify-between bg-slate-950/70">
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm sm:text-base font-bold text-amber-300">
                  {selectedPhoto.title}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-400 font-serif">{selectedPhoto.categoryLabel}</span>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res Image Preview */}
            <div className="relative max-h-[65vh] flex items-center justify-center bg-black overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (selectedPhoto.fallbackImage && !target.src.includes(selectedPhoto.fallbackImage)) {
                    target.src = selectedPhoto.fallbackImage;
                  }
                }}
              />
            </div>

            {/* Bottom Caption & Action */}
            <div className="p-4 sm:p-6 bg-slate-950/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-serif">
                  {selectedPhoto.caption}
                </p>
                <p className="text-[11px] text-amber-400/80 font-serif">
                  {selectedPhoto.date}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingPhotoId(selectedPhoto.id);
                  }}
                  className="px-4 py-2 text-xs font-serif font-bold text-slate-950 bg-gold-gradient rounded-lg hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
