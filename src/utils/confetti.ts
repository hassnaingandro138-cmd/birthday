import confetti from 'canvas-confetti';

const GOLD_PALETTE = ['#FFE699', '#F5D77F', '#D4AF37', '#AA820A', '#FFFFFF', '#FF3366', '#FFD166', '#FF6B6B'];

// Full-screen omnipresent burst for mobile & desktop
export const triggerMegaCelebration = () => {
  // Wave 1: Immediate full-screen burst from all 4 corners + center
  confetti({
    particleCount: 120,
    spread: 160,
    origin: { x: 0.5, y: 0.4 },
    colors: GOLD_PALETTE,
    startVelocity: 45,
    scalar: 1.2,
    zIndex: 10000
  });

  confetti({
    particleCount: 80,
    angle: 60,
    spread: 80,
    origin: { x: 0.05, y: 0.75 },
    colors: GOLD_PALETTE,
    startVelocity: 55,
    zIndex: 10000
  });

  confetti({
    particleCount: 80,
    angle: 120,
    spread: 80,
    origin: { x: 0.95, y: 0.75 },
    colors: GOLD_PALETTE,
    startVelocity: 55,
    zIndex: 10000
  });

  // Wave 2: Falling celebratory golden rain from top of screen
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 270,
      spread: 120,
      origin: { x: 0.3, y: 0.05 },
      colors: ['#FFE699', '#D4AF37', '#FFFFFF', '#FF4D6D'],
      startVelocity: 25,
      zIndex: 10000
    });
    confetti({
      particleCount: 100,
      angle: 270,
      spread: 120,
      origin: { x: 0.7, y: 0.05 },
      colors: ['#FFE699', '#D4AF37', '#FFFFFF', '#FF4D6D'],
      startVelocity: 25,
      zIndex: 10000
    });
  }, 250);

  // Wave 3: Bottom mega upward cannons
  setTimeout(() => {
    confetti({
      particleCount: 140,
      angle: 90,
      spread: 140,
      origin: { x: 0.5, y: 0.9 },
      colors: GOLD_PALETTE,
      startVelocity: 65,
      zIndex: 10000
    });
  }, 550);

  // Wave 4: Heart & Star shower floating across entire mobile screen
  setTimeout(() => {
    const scalar = 2.4;
    const heart = confetti.shapeFromText({ text: '❤️', scalar });
    const star = confetti.shapeFromText({ text: '⭐', scalar });
    const sparkle = confetti.shapeFromText({ text: '✨', scalar });

    confetti({
      shapes: [heart, star, sparkle],
      scalar,
      particleCount: 50,
      spread: 180,
      origin: { x: 0.5, y: 0.25 },
      startVelocity: 20,
      zIndex: 10000
    });
  }, 850);
};

export const triggerBirthdayBlast = () => {
  triggerMegaCelebration();
};

export const triggerGoldenFireworks = () => {
  triggerMegaCelebration();
};

export const triggerGiftOpeningExplosion = () => {
  confetti({
    particleCount: 180,
    spread: 140,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#FFE699', '#F5D77F', '#D4AF37', '#FF4D6D', '#FFFFFF', '#FFD700'],
    shapes: ['star', 'circle'],
    scalar: 1.4,
    startVelocity: 50,
    zIndex: 10000
  });

  // Also blast from sides
  setTimeout(() => {
    confetti({
      particleCount: 90,
      angle: 60,
      spread: 75,
      origin: { x: 0.1, y: 0.6 },
      colors: GOLD_PALETTE,
      startVelocity: 50,
      zIndex: 10000
    });
    confetti({
      particleCount: 90,
      angle: 120,
      spread: 75,
      origin: { x: 0.9, y: 0.6 },
      colors: GOLD_PALETTE,
      startVelocity: 50,
      zIndex: 10000
    });
  }, 200);
};

export const triggerCandleWishSparkles = () => {
  confetti({
    particleCount: 140,
    angle: 90,
    spread: 120,
    origin: { x: 0.5, y: 0.55 },
    colors: ['#FFE699', '#F5D77F', '#D4AF37', '#FFF', '#FFD700'],
    shapes: ['star'],
    scalar: 1.3,
    startVelocity: 45,
    zIndex: 10000
  });
};

export const triggerHeartShower = () => {
  const scalar = 2.4;
  const heart = confetti.shapeFromText({ text: '❤️', scalar });
  const rose = confetti.shapeFromText({ text: '🌹', scalar });

  confetti({
    shapes: [heart, rose],
    scalar,
    particleCount: 60,
    spread: 140,
    origin: { x: 0.5, y: 0.3 },
    startVelocity: 30,
    zIndex: 10000
  });
};
