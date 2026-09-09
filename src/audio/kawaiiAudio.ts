/**
 * Kawaii Sound Engine using Web Audio API
 * Generates sparkling sound effects and gentle chiptune melodies without external audio assets.
 */

class KawaiiAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicMuted: boolean = false;
  private currentTrack: string | null = null;
  private musicTimer: number | null = null;
  private noteIndex: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public setMusicMuted(muted: boolean) {
    this.isMusicMuted = muted;
    if (muted) {
      this.stopMusic();
    } else if (this.currentTrack) {
      this.startMusic(this.currentTrack);
    }
  }

  // Play a quick soft pop on button tap
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio not permitted yet
    }
  }

  // Play an adorable catch chime (apple / star caught)
  public playCatch(pitchMultiplier: number = 1.0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc2.type = 'sine';

      const baseFreq = 523.25 * pitchMultiplier; // C5
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, this.ctx.currentTime + 0.12);

      osc2.frequency.setValueAtTime(baseFreq * 2, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(this.ctx.currentTime + 0.14);
      osc2.stop(this.ctx.currentTime + 0.14);
    } catch {
      // Ignore
    }
  }

  // Play a cute soft hazard bonk
  public playHazard() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // Ignore
    }
  }

  // Play sweet fanfare / success chime
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.001, this.ctx!.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.18, this.ctx!.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.07 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.07);
        osc.stop(this.ctx!.currentTime + idx * 0.07 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  // Play sparkling Fever mode / Rainbow celebration
  public playFever() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const arpeggio = [523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5];
      arpeggio.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.15, this.ctx!.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.05 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.05);
        osc.stop(this.ctx!.currentTime + idx * 0.05 + 0.2);
      });
    } catch {
      // Ignore
    }
  }

  // Camera shutter snap
  public playCamera() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);

      // Shutter wind
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(500, this.ctx.currentTime);
        osc2.frequency.linearRampToValueAtTime(950, this.ctx.currentTime + 0.12);

        gain2.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);
        osc2.start();
        osc2.stop(this.ctx.currentTime + 0.12);
      }, 70);
    } catch {
      // Ignore
    }
  }

  // Cute happy kitty purr
  public playPurr() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25];
      notes.forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.12, this.ctx!.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + i * 0.06 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + i * 0.06);
        osc.stop(this.ctx!.currentTime + i * 0.06 + 0.18);
      });
    } catch {
      // Ignore
    }
  }

  // Procedural Kawaii BGM loops
  public startMusic(track: string = 'kitty_cafe') {
    this.currentTrack = track;
    if (this.isMusicMuted) return;
    this.stopMusic();

    this.initContext();
    this.noteIndex = 0;

    // Melody definitions (frequency in Hz and duration in 16th notes)
    // Melody 1: Sweet Cafe Morning (cheerful, warm pentatonic)
    const melodyCafe = [
      523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 523.25,
      587.33, 698.46, 880.0, 783.99, 659.25, 587.33, 523.25, 659.25,
      783.99, 880.0, 1046.5, 880.0, 783.99, 659.25, 587.33, 523.25,
      659.25, 587.33, 523.25, 440.0, 523.25, 659.25, 523.25, 0
    ];

    // Melody 2: Music Box Waltz (dreamy, soothing)
    const melodyWaltz = [
      659.25, 0, 783.99, 783.99, 880.0, 0, 783.99, 0,
      659.25, 0, 587.33, 587.33, 523.25, 0, 587.33, 0,
      659.25, 0, 783.99, 880.0, 1046.5, 0, 880.0, 0,
      783.99, 0, 659.25, 587.33, 523.25, 0, 0, 0
    ];

    // Melody 3: Sugar Arcade Rush (bouncy, energetic)
    const melodyArcade = [
      523.25, 523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 523.25,
      587.33, 587.33, 783.99, 880.0, 987.77, 880.0, 783.99, 587.33,
      659.25, 783.99, 880.0, 1046.5, 1174.66, 1046.5, 880.0, 783.99,
      880.0, 783.99, 659.25, 587.33, 523.25, 659.25, 523.25, 0
    ];

    const currentMelody = track === 'waltz' ? melodyWaltz : (track === 'arcade' ? melodyArcade : melodyCafe);
    const stepTime = track === 'arcade' ? 140 : 190;

    const playStep = () => {
      if (this.isMusicMuted || !this.ctx) return;
      const freq = currentMelody[this.noteIndex % currentMelody.length];
      if (freq > 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = track === 'waltz' ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (stepTime / 1000) * 0.9);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + (stepTime / 1000) * 0.9);
      }

      this.noteIndex++;
      this.musicTimer = window.setTimeout(playStep, stepTime);
    };

    playStep();
  }

  public stopMusic() {
    if (this.musicTimer !== null) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const kawaiiAudio = new KawaiiAudioEngine();
