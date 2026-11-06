import { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import FireworksDisplay from './components/FireworksDisplay';
import Navbar from './components/Navbar';
import IntroPortal from './components/IntroPortal';
import HeroSurprise from './components/HeroSurprise';
import BirthdayCake from './components/BirthdayCake';
import BrotherhoodSection from './components/BrotherhoodSection';
import SpecialDuasSection from './components/SpecialDuasSection';
import MemoriesGallery from './components/MemoriesGallery';
import PoemSection from './components/PoemSection';
import ComedyCorner from './components/ComedyCorner';
import VirtualGiftSection from './components/VirtualGiftSection';
import FinalSurpriseModal from './components/FinalSurpriseModal';
import AudioControlBar from './components/AudioControlBar';
import Footer from './components/Footer';
import { soundEngine } from './utils/audioEngine';
import { triggerMegaCelebration } from './utils/confetti';

export default function App() {
  const [hasRevealedSurprise, setHasRevealedSurprise] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [showFinalSurprise, setShowFinalSurprise] = useState<boolean>(false);
  const [isFireworksActive, setIsFireworksActive] = useState<boolean>(false);

  const handleToggleMusic = () => {
    const nextState = soundEngine.toggleMusic((playing) => {
      setIsMusicPlaying(playing);
    });
    setIsMusicPlaying(nextState);
  };

  const handleOpenFromPortal = () => {
    soundEngine.playSparkleSound();
    triggerMegaCelebration();
    // Start music on first interaction
    if (!isMusicPlaying) {
      const nextState = soundEngine.toggleMusic((playing) => {
        setIsMusicPlaying(playing);
      });
      setIsMusicPlaying(nextState);
    }
    setHasRevealedSurprise(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplaySurprise = () => {
    setHasRevealedSurprise(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToGift = () => {
    const giftEl = document.getElementById('gift');
    if (giftEl) {
      giftEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#05060A] font-sans selection:bg-amber-400 selection:text-black">
      {/* Interactive Golden Canvas Background */}
      <ParticleBackground />

      {/* Full-Screen Dynamic Canvas Fireworks Display */}
      <FireworksDisplay
        isActive={isFireworksActive}
        onToggle={() => setIsFireworksActive((prev) => !prev)}
      />

      {/* Main Content Wrap */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {!hasRevealedSurprise ? (
          /* ================= FIRST PAGE: ONLY "OPEN UMAIR FOR U" ================= */
          <IntroPortal onOpen={handleOpenFromPortal} />
        ) : (
          /* ================= MAIN REVEALED CELEBRATION WEBSITE ================= */
          <div className="animate-fade-in flex flex-col min-h-screen">
            {/* Navigation Bar */}
            <Navbar
              isMusicPlaying={isMusicPlaying}
              onToggleMusic={handleToggleMusic}
              onOpenGift={scrollToGift}
              onReplaySurprise={handleReplaySurprise}
              hasRevealedSurprise={hasRevealedSurprise}
            />

            <main className="flex-1">
              {/* Grand Birthday Headline & Hassnain's Letter */}
              <HeroSurprise
                isRevealed={true}
                onReveal={handleOpenFromPortal}
                onReplay={handleReplaySurprise}
                onStartMusic={() => {}}
                isFireworksActive={isFireworksActive}
                onToggleFireworks={() => setIsFireworksActive((prev) => !prev)}
              />

              <div className="space-y-12 sm:space-y-16">
                {/* Interactive Birthday Celebration Cake */}
                <BirthdayCake />

                {/* Our Brotherhood — Heartfelt Message & Prayers */}
                <BrotherhoodSection />

                {/* Long-Distance Bond, Prayers, Bhabhi & Mangni Wishes */}
                <SpecialDuasSection />

                {/* Memories Gallery */}
                <MemoriesGallery />


                {/* A Special Birthday Poem */}
                <PoemSection />

                {/* Comedy Corner — Funny Jokes, Lateefay, Roasts & Friendship Shayari */}
                <ComedyCorner />

                {/* The Ultimate Virtual Gift Surprise */}
                <VirtualGiftSection
                  onTriggerFinalSurprise={() => setShowFinalSurprise(true)}
                />
              </div>
            </main>

            {/* Footer */}
            <Footer onReplaySurprise={handleReplaySurprise} />

            {/* Floating Audio Control Widget */}
            <AudioControlBar
              isPlaying={isMusicPlaying}
              onToggle={handleToggleMusic}
            />

            {/* Final Grand Birthday Screen Modal */}
            <FinalSurpriseModal
              isOpen={showFinalSurprise}
              onClose={() => setShowFinalSurprise(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
