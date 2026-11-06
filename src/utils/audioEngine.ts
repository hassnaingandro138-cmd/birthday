/**
 * Web Audio API synthesized ambient acoustic birthday melody & chime sound effects.
 * Completely self-contained, no external audio file dependencies.
 */

class AudioController {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private currentStep: number = 0;
  private volumeGain: GainNode | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isCustomAudioActive: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeGain = this.ctx.createGain();
      this.volumeGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.volumeGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Melodic notes for "Happy Birthday" (Warm acoustic chime / Kalimba vibe)
  // Frequencies in Hz: C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25, D5=587.33
  private melody: Array<{ note: number; duration: number; chord?: number[] }> = [
    { note: 261.63, duration: 380, chord: [130.81, 196.00] }, // Hap-
    { note: 261.63, duration: 250 },                          // py
    { note: 293.66, duration: 600, chord: [146.83, 220.00] }, // Birth-
    { note: 261.63, duration: 600 },                          // day
    { note: 349.23, duration: 600, chord: [174.61, 261.63] }, // to
    { note: 329.63, duration: 1100, chord: [130.81, 196.00] },// you...

    { note: 261.63, duration: 380, chord: [130.81, 196.00] }, // Hap-
    { note: 261.63, duration: 250 },                          // py
    { note: 293.66, duration: 600, chord: [146.83, 220.00] }, // Birth-
    { note: 261.63, duration: 600 },                          // day
    { note: 392.00, duration: 600, chord: [196.00, 293.66] }, // to
    { note: 349.23, duration: 1100, chord: [174.61, 261.63] },// you...

    { note: 261.63, duration: 380, chord: [130.81, 196.00] }, // Hap-
    { note: 261.63, duration: 250 },                          // py
    { note: 523.25, duration: 650, chord: [261.63, 329.63] }, // Birth-
    { note: 440.00, duration: 650, chord: [220.00, 261.63] }, // day
    { note: 349.23, duration: 600, chord: [174.61, 220.00] }, // dear
    { note: 329.63, duration: 600, chord: [130.81, 196.00] }, // U-
    { note: 293.66, duration: 1100, chord: [146.83, 220.00] },// mair...

    { note: 466.16, duration: 380, chord: [233.08, 293.66] }, // Hap-
    { note: 466.16, duration: 250 },                          // py
    { note: 440.00, duration: 650, chord: [220.00, 261.63] }, // Birth-
    { note: 349.23, duration: 650, chord: [174.61, 261.63] }, // day
    { note: 392.00, duration: 650, chord: [196.00, 246.94] }, // to
    { note: 349.23, duration: 1400, chord: [174.61, 220.00, 261.63] } // you!
  ];

  private playTone(freq: number, durationMs: number, type: OscillatorType = 'triangle', gainMultiplier = 1) {
    if (!this.ctx || !this.volumeGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    const durSec = durationMs / 1000;

    // Bell/Kalimba style envelope: instant attack, gentle exponential decay
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.28 * gainMultiplier, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec * 1.5);

    osc.connect(gain);
    gain.connect(this.volumeGain);

    osc.start(now);
    osc.stop(now + durSec * 1.6);
  }

  private scheduleNext() {
    if (!this.isPlaying) return;
    const item = this.melody[this.currentStep];

    // Play primary chime melody
    this.playTone(item.note, item.duration, 'sine', 1.0);
    this.playTone(item.note * 2, item.duration, 'triangle', 0.2); // subtle harmonic sparkle

    // If step has chord, play ambient lower harmonics
    if (item.chord) {
      item.chord.forEach(bassFreq => {
        this.playTone(bassFreq, item.duration * 1.4, 'sine', 0.4);
      });
    }

    this.currentStep = (this.currentStep + 1) % this.melody.length;
    const delay = item.duration + (this.currentStep === 0 ? 1200 : 80);

    this.timerId = window.setTimeout(() => {
      this.scheduleNext();
    }, delay);
  }

  public playSparkleSound() {
    this.initContext();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 250, 'sine', 0.5);
      }, idx * 60);
    });
  }

  public playCandleBlowSound() {
    this.initContext();
    if (!this.ctx || !this.volumeGain) return;
    // Whoosh / breath puff sound using noise buffer
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.35);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.volumeGain);

    whiteNoise.start();
  }

  public playGiftOpenSound() {
    this.initContext();
    if (!this.ctx) return;
    const chords = [392.00, 493.88, 587.33, 783.99, 987.77, 1174.66];
    chords.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 500, 'sine', 0.6);
      }, i * 70);
    });
  }

  public playFireworkPop() {
    this.initContext();
    if (!this.ctx || !this.volumeGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 + Math.random() * 80, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.22);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(this.volumeGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.23);
    } catch {
      // Audio context may be restricted before user gesture
    }
  }

  public toggleMusic(callback?: (playing: boolean) => void) {
    if (this.isCustomAudioActive && this.customAudio) {
      if (this.customAudio.paused) {
        this.customAudio.play();
        this.isPlaying = true;
      } else {
        this.customAudio.pause();
        this.isPlaying = false;
      }
      if (callback) callback(this.isPlaying);
      return this.isPlaying;
    }

    this.initContext();
    if (this.isPlaying) {
      this.isPlaying = false;
      if (this.timerId) clearTimeout(this.timerId);
      if (callback) callback(false);
      return false;
    } else {
      this.isPlaying = true;
      this.scheduleNext();
      if (callback) callback(true);
      return true;
    }
  }

  public setCustomAudio(url: string) {
    if (this.isPlaying && this.timerId) {
      clearTimeout(this.timerId);
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = 0.5;
    this.isCustomAudioActive = true;
    this.customAudio.play();
    this.isPlaying = true;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundEngine = new AudioController();
