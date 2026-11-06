import { useState } from 'react';
import { Volume2, VolumeX, Gift, Sparkles, RefreshCw, Menu, X, Smile } from 'lucide-react';

interface NavbarProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenGift: () => void;
  onReplaySurprise: () => void;
  hasRevealedSurprise: boolean;
}

export default function Navbar({
  isMusicPlaying,
  onToggleMusic,
  onOpenGift,
  onReplaySurprise,
  hasRevealedSurprise,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#welcome', label: 'Surprise · Kholo' },
    { href: '#celebration', label: 'Cake 🎂 Cake Kaato' },
    { href: '#brotherhood', label: 'Brotherhood · Bhai Chara' },
    { href: '#duas', label: 'Prayers · Duayein 🤲' },
    { href: '#memories', label: 'Memories · Yaadein 📸' },
    { href: '#shayari', label: 'Poem · Shayari 📜' },
    { href: '#comedy', label: 'Comedy 😂 Mazaq' },
    { href: '#gift', label: 'Gift 🎁 Khas Tehfa' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-500/20 bg-[#05060A]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#welcome"
          className="font-serif text-xs sm:text-base md:text-lg font-bold tracking-tight text-gold-gradient whitespace-nowrap shrink flex items-center gap-1.5 sm:gap-2 group overflow-hidden"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0 group-hover:rotate-12 transition-transform" />
          <span className="truncate max-w-[140px] xs:max-w-[180px] sm:max-w-none">
            Umair Janeman · Hassnain Ali ❤️
          </span>
        </a>

        {/* Zone 2: Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-4 2xl:gap-5 text-xs font-serif font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-amber-300 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Mobile & Desktop Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {hasRevealedSurprise && (
            <button
              onClick={onReplaySurprise}
              title="Replay Surprise"
              className="p-1.5 sm:px-3 sm:py-1.5 text-xs font-serif font-medium text-amber-300/90 hover:text-amber-200 hover:bg-amber-500/10 rounded-lg transition-colors border border-amber-500/20 whitespace-nowrap flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Replay</span>
            </button>
          )}

          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? "Mute Music" : "Play Music"}
            className={`p-1.5 sm:px-3 sm:py-1.5 text-xs font-serif font-medium rounded-lg transition-all flex items-center gap-1.5 border cursor-pointer ${
              isMusicPlaying
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-amber-500/40'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline whitespace-nowrap">Music On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline whitespace-nowrap">Music</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenGift}
            className="px-2.5 sm:px-3.5 py-1.5 text-xs font-serif font-bold text-slate-950 bg-gold-gradient rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(212,175,55,0.35)] whitespace-nowrap flex items-center gap-1 sm:gap-1.5 cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden xs:inline">Gift</span>
            <span>🎁</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 text-slate-300 hover:text-amber-300 rounded-lg hover:bg-slate-800/80 transition-colors border border-slate-800 cursor-pointer"
            title="Menu"
            aria-label="Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-amber-500/20 bg-[#090b14]/98 backdrop-blur-xl px-4 py-3 space-y-1 animate-fade-in shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-serif text-slate-200 hover:text-amber-300 hover:bg-amber-500/10 border border-slate-800/80 flex items-center gap-1.5 transition-colors"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
