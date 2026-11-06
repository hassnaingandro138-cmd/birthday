import { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, X, Flame } from 'lucide-react';
import { soundEngine } from '../utils/audioEngine';

interface FireworksDisplayProps {
  isActive: boolean;
  onToggle?: () => void;
}

interface FireworkRocket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  trail: Array<{ x: number; y: number; alpha: number }>;
  color: string;
  burstType: 'peony' | 'heart' | 'ring' | 'willow' | 'streamer';
  exploded: boolean;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  friction: number;
  size: number;
  flicker: boolean;
}

const LUXURY_PALETTES = [
  ['#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFA000'], // Pure Royal Gold
  ['#FF8A80', '#FF5252', '#FF1744', '#D50000', '#FFD700'], // Crimson & Gold
  ['#B388FF', '#7C4DFF', '#651FFF', '#FFD700', '#00E5FF'], // Cosmic Violet & Gold
  ['#A7FFEB', '#64FFDA', '#1DE9B6', '#00BFA5', '#FFD700'], // Emerald & Gold
  ['#FF80AB', '#FF4081', '#F50057', '#C51162', '#FFE57F'], // Rose Love & Champagne
];

export default function FireworksDisplay({
  isActive,
  onToggle,
}: FireworksDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [burstCount, setBurstCount] = useState<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastSoundTimeRef = useRef<number>(0);

  // Play subtle sound effect on burst (throttled to avoid sound clutter)
  const triggerBurstSound = useCallback(() => {
    const now = performance.now();
    if (now - lastSoundTimeRef.current > 350) {
      lastSoundTimeRef.current = now;
      soundEngine.playFireworkPop?.();
    }
  }, []);

  useEffect(() => {
    if (!isActive) {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const rockets: FireworkRocket[] = [];
    const particles: SparkParticle[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const burstRocket = (
      x: number,
      y: number,
      burstType: FireworkRocket['burstType'],
      palette: string[]
    ) => {
      triggerBurstSound();
      setBurstCount((prev) => prev + 1);

      const baseParticleCount = width < 640 ? 55 : 95;

      if (burstType === 'heart') {
        // Heart mathematical formula burst
        const points = 75;
        for (let i = 0; i < points; i++) {
          const t = (Math.PI * 2 * i) / points;
          // Parametric heart curve
          const hx = 16 * Math.pow(Math.sin(t), 3);
          const hy = -(
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t)
          );
          const speed = (0.28 + Math.random() * 0.08) * (width < 640 ? 0.8 : 1);
          particles.push({
            x,
            y,
            vx: hx * speed,
            vy: hy * speed,
            color: palette[Math.floor(Math.random() * palette.length)],
            alpha: 1,
            decay: Math.random() * 0.012 + 0.012,
            gravity: 0.04,
            friction: 0.965,
            size: Math.random() * 2.5 + 1.8,
            flicker: true,
          });
        }
      } else if (burstType === 'ring') {
        // Expanding ring burst
        const count = 60;
        const speed = Math.random() * 2.5 + 3.5;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: palette[i % palette.length],
            alpha: 1,
            decay: Math.random() * 0.014 + 0.012,
            gravity: 0.045,
            friction: 0.97,
            size: Math.random() * 2.2 + 1.5,
            flicker: Math.random() > 0.4,
          });
        }
      } else if (burstType === 'willow') {
        // Slow falling golden willow
        const count = baseParticleCount + 20;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 1;
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: '#FFD700',
            alpha: 1,
            decay: Math.random() * 0.008 + 0.007, // long lingering
            gravity: 0.07,
            friction: 0.955,
            size: Math.random() * 2.6 + 1.4,
            flicker: true,
          });
        }
      } else {
        // Classic spherical Peony burst
        const count = baseParticleCount;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6.5 + 1.5;
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: palette[Math.floor(Math.random() * palette.length)],
            alpha: 1,
            decay: Math.random() * 0.016 + 0.012,
            gravity: 0.05,
            friction: 0.968,
            size: Math.random() * 2.8 + 1.2,
            flicker: Math.random() > 0.5,
          });
        }
      }
    };

    const spawnRocket = (startX?: number, targetX?: number, targetY?: number) => {
      const sx = startX ?? Math.random() * (width * 0.8) + width * 0.1;
      const tx = targetX ?? sx + (Math.random() - 0.5) * 160;
      const ty = targetY ?? Math.random() * (height * 0.45) + height * 0.12;

      const dx = tx - sx;
      const dy = ty - height;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = Math.random() * 3 + 12;

      const burstTypes: FireworkRocket['burstType'][] = [
        'peony',
        'heart',
        'ring',
        'willow',
      ];
      const burstType =
        burstTypes[Math.floor(Math.random() * burstTypes.length)];
      const palette =
        LUXURY_PALETTES[Math.floor(Math.random() * LUXURY_PALETTES.length)];

      rockets.push({
        x: sx,
        y: height,
        targetX: tx,
        targetY: ty,
        vx: (dx / dist) * speed,
        vy: (dy / dist) * speed,
        trail: [],
        color: palette[0],
        burstType,
        exploded: false,
      });
    };

    // Auto-launch timer
    let lastLaunchTime = performance.now();
    const launchInterval = 700; // Launch a rocket every 700ms

    // Initial volley of 3 fireworks immediately on activation
    spawnRocket(width * 0.25, width * 0.25, height * 0.22);
    spawnRocket(width * 0.5, width * 0.5, height * 0.18);
    spawnRocket(width * 0.75, width * 0.75, height * 0.24);

    // Global click listener to launch a rocket to tapped location
    const handleGlobalClick = (e: MouseEvent | TouchEvent) => {
      const clientX =
        'touches' in e && e.touches.length > 0
          ? e.touches[0].clientX
          : (e as MouseEvent).clientX;
      const clientY =
        'touches' in e && e.touches.length > 0
          ? e.touches[0].clientY
          : (e as MouseEvent).clientY;

      if (clientX !== undefined && clientY !== undefined) {
        spawnRocket(clientX + (Math.random() - 0.5) * 60, clientX, clientY);
      }
    };

    window.addEventListener('pointerdown', handleGlobalClick);

    // Animation Loop
    const animate = (time: number) => {
      // Clear with soft fade to preserve trails without darkening the web page
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Auto-spawn rockets
      if (time - lastLaunchTime > launchInterval) {
        lastLaunchTime = time;
        spawnRocket();
        if (Math.random() > 0.5) {
          setTimeout(() => spawnRocket(), 200);
        }
      }

      // Update & Render Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 7) r.trail.shift();

        // Draw trail
        for (let t = 0; t < r.trail.length; t++) {
          const pt = r.trail[t];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${(t / r.trail.length) * 0.8})`;
          ctx.fill();
        }

        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.08; // Rocket gravity curve

        // Check if rocket reached apex or target
        if (r.vy >= -0.5 || r.y <= r.targetY) {
          r.exploded = true;
          const palette =
            LUXURY_PALETTES[
              Math.floor(Math.random() * LUXURY_PALETTES.length)
            ];
          burstRocket(r.x, r.y, r.burstType, palette);
          rockets.splice(i, 1);
        } else {
          // Draw rocket head
          ctx.beginPath();
          ctx.arc(r.x, r.y, 3.2, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FFD700';
          ctx.fill();
        }
      }

      // Update & Render Burst Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const currentAlpha = p.flicker
          ? Math.random() > 0.2
            ? p.alpha
            : p.alpha * 0.4
          : p.alpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.alpha), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      ctx.restore();

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handleGlobalClick);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isActive, triggerBurstSound]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden transition-opacity duration-300">
      {/* Interactive Full Screen Canvas for dynamic fireworks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />

      {/* Floating Status Toast HUD with quick toggle off */}
      <div className="absolute top-20 right-3 sm:right-6 pointer-events-auto z-50 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-amber-400/50 shadow-[0_0_25px_rgba(255,215,0,0.4)] text-amber-200 animate-slide-up text-xs sm:text-sm">
        <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
        <span className="font-semibold text-amber-300 hidden sm:inline">
          Fireworks Show Active
        </span>
        <span className="font-medium text-amber-100 text-[11px] sm:text-xs">
          (Tap anywhere for bursts! · {burstCount} Bursts)
        </span>
        {onToggle && (
          <button
            onClick={onToggle}
            className="ml-1 p-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Stop Fireworks"
            aria-label="Stop Fireworks"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
