/**
 * Kawaii Sound Engine using Web Audio API
 * Generates sparkling sound effects and gentle chiptune melodies without external audio assets.
 */

export interface MusicTrackInfo {
  id: string;
  name: string;
  mood: string;
  icon: string;
  tempo: string;
  description: string;
}

export const MUSIC_TRACKS: MusicTrackInfo[] = [
  {
    id: 'anniversary_love',
    name: '1st Anniversary Together Waltz',
    mood: 'Sweet, Joyful & Heartfelt',
    icon: '🌟',
    tempo: 'Festive 3/4 Waltz',
    description: 'A cheerful, tender music box melody celebrating 365 days of friendship and being together.'
  },
  {
    id: 'paris_cafe',
    name: "Kitty's French Cafe Waltz",
    mood: 'Charming & Cozy Musette',
    icon: '🥐',
    tempo: 'Bouncy 3/4 Waltz',
    description: 'Bouncing Paris bakery accordion melody with sweet pastry charm.'
  },
  {
    id: 'lullaby',
    name: 'Sanrio Starlight Music Box',
    mood: 'Dreamy & Soothing Celesta',
    icon: '✨',
    tempo: 'Gentle & Relaxing',
    description: 'Soft twinkling bell notes with soothing bedtime harmonies.'
  },
  {
    id: 'baking_rag',
    name: 'Pastry Kitchen Bounce',
    mood: 'Cheerful & Peppy Ragtime',
    icon: '🥧',
    tempo: 'Bouncy 4/4',
    description: 'Toe-tapping syncopated tune perfect for rolling pie dough!'
  },
  {
    id: 'kitty_cafe',
    name: "Kitty's Morning Walk",
    mood: 'Sunny & Heartwarming',
    icon: '☀️',
    tempo: 'Cheerful Stroll',
    description: 'Bright pastel melody exploring Sanrio Sweet Village.'
  },
  {
    id: 'starlight',
    name: 'Cinnamoroll Cloud Flight',
    mood: 'Airy & Shimmering Bells',
    icon: '☁️',
    tempo: 'Dreamy Arpeggios',
    description: 'Floating through pastel sunset clouds with sparkling bells.'
  },
  {
    id: 'arcade',
    name: 'Sugar Rush 8-Bit Arcade',
    mood: 'Energetic & Bouncy',
    icon: '🎮',
    tempo: 'Upbeat 135 BPM',
    description: 'Retro arcade groove with playful bassline and chip arpeggios.'
  }
];

interface NoteStep {
  lead: number;
  bass?: number;
}

class KawaiiAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicMuted: boolean = false;
  private currentTrack: string = 'paris_cafe';
  private musicTimer: number | null = null;
  private noteIndex: number = 0;
  private musicVolume: number = 0.6; // 0.0 to 1.0

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

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public isMusicPlaying(): boolean {
    return !this.isMusicMuted && this.musicTimer !== null;
  }

  public getCurrentTrack(): string {
    return this.currentTrack;
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
  }

  public getMusicVolume(): number {
    return this.musicVolume;
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

  // Play romantic bell chime
  public playChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const chimeNotes = [783.99, 1046.5, 1318.51, 1567.98]; // G5, C6, E6, G6
      chimeNotes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, this.ctx!.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.15, this.ctx!.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + idx * 0.08);
        osc.stop(this.ctx!.currentTime + idx * 0.08 + 0.35);
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

  // Switch to Next track in playlist
  public nextTrack(): string {
    const currentIndex = MUSIC_TRACKS.findIndex((t) => t.id === this.currentTrack);
    const nextIndex = (currentIndex + 1) % MUSIC_TRACKS.length;
    const nextTrackId = MUSIC_TRACKS[nextIndex].id;
    this.startMusic(nextTrackId);
    return nextTrackId;
  }

  // Switch to Previous track in playlist
  public prevTrack(): string {
    const currentIndex = MUSIC_TRACKS.findIndex((t) => t.id === this.currentTrack);
    const prevIndex = (currentIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    const prevTrackId = MUSIC_TRACKS[prevIndex].id;
    this.startMusic(prevTrackId);
    return prevTrackId;
  }

  // Procedural Kawaii BGM loops with Polyphonic Lead & Warm Bass
  public startMusic(track: string = 'paris_cafe') {
    this.currentTrack = track;
    this.stopMusic();
    if (this.isMusicMuted) return;

    this.initContext();
    this.noteIndex = 0;

    // --- TRACK MELODIES ---
    // Note frequencies:
    const C3 = 130.81, D3 = 146.83, E3 = 164.81, F3 = 174.61, G3 = 196.00, A3 = 220.00, B3 = 246.94;
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
    const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.00, B5 = 987.77;
    const C6 = 1046.50, D6 = 1174.66, E6 = 1318.51, F6 = 1396.91, G6 = 1567.98;

    // Track 1: Kitty's French Cafe Musette Waltz (3/4 time feel)
    const melodyParis: NoteStep[] = [
      { lead: E5, bass: C3 }, { lead: G5, bass: E3 }, { lead: C6, bass: G3 },
      { lead: B5, bass: G3 }, { lead: A5, bass: D3 }, { lead: G5, bass: F3 },
      { lead: F5, bass: D3 }, { lead: A5, bass: F3 }, { lead: D6, bass: A3 },
      { lead: C6, bass: A3 }, { lead: B5, bass: G3 }, { lead: A5, bass: F3 },
      { lead: G5, bass: C3 }, { lead: C6, bass: E3 }, { lead: E6, bass: G3 },
      { lead: D6, bass: G3 }, { lead: C6, bass: F3 }, { lead: B5, bass: D3 },
      { lead: C6, bass: C3 }, { lead: 0, bass: E3 },  { lead: 0, bass: G3 },
      { lead: G5, bass: C3 }, { lead: E5, bass: E3 }, { lead: D5, bass: G3 },
      { lead: C5, bass: C3 }, { lead: E5, bass: G3 }, { lead: G5, bass: E3 },
      { lead: A5, bass: F3 }, { lead: C6, bass: A3 }, { lead: A5, bass: F3 },
      { lead: G5, bass: C3 }, { lead: E5, bass: G3 }, { lead: D5, bass: E3 },
      { lead: C5, bass: C3 }, { lead: 0, bass: 0 },   { lead: 0, bass: 0 },
    ];

    // Track 2: Sanrio Starlight Music Box (gentle celesta lullaby)
    const melodyLullaby: NoteStep[] = [
      { lead: C5, bass: C3 }, { lead: E5, bass: 0 }, { lead: G5, bass: E3 }, { lead: C6, bass: 0 },
      { lead: B5, bass: G3 }, { lead: G5, bass: 0 }, { lead: E5, bass: C3 }, { lead: G5, bass: 0 },
      { lead: A5, bass: F3 }, { lead: C6, bass: 0 }, { lead: E6, bass: A3 }, { lead: D6, bass: 0 },
      { lead: C6, bass: G3 }, { lead: G5, bass: 0 }, { lead: E5, bass: C3 }, { lead: 0, bass: 0 },
      { lead: F5, bass: D3 }, { lead: A5, bass: 0 }, { lead: D6, bass: F3 }, { lead: C6, bass: 0 },
      { lead: B5, bass: G3 }, { lead: G5, bass: 0 }, { lead: D5, bass: G3 }, { lead: 0, bass: 0 },
      { lead: C5, bass: C3 }, { lead: E5, bass: 0 }, { lead: G5, bass: E3 }, { lead: B5, bass: 0 },
      { lead: C6, bass: C3 }, { lead: 0, bass: 0 },  { lead: 0, bass: 0 },  { lead: 0, bass: 0 },
    ];

    // Track 3: Pastry Kitchen Bounce (upbeat ragtime hop)
    const melodyBakingRag: NoteStep[] = [
      { lead: C5, bass: C3 }, { lead: D5, bass: G3 }, { lead: E5, bass: C3 }, { lead: G5, bass: G3 },
      { lead: A5, bass: F3 }, { lead: G5, bass: C3 }, { lead: E5, bass: G3 }, { lead: C5, bass: C3 },
      { lead: D5, bass: D3 }, { lead: F5, bass: A3 }, { lead: A5, bass: D3 }, { lead: F5, bass: A3 },
      { lead: G5, bass: G3 }, { lead: F5, bass: D3 }, { lead: E5, bass: G3 }, { lead: D5, bass: B3 },
      { lead: E5, bass: C3 }, { lead: G5, bass: G3 }, { lead: C6, bass: C3 }, { lead: A5, bass: F3 },
      { lead: G5, bass: C3 }, { lead: E5, bass: G3 }, { lead: D5, bass: G3 }, { lead: E5, bass: C3 },
      { lead: C5, bass: C3 }, { lead: 0, bass: G3 },  { lead: C5, bass: C3 }, { lead: 0, bass: 0 },
    ];

    // Track 4: Kitty's Morning Walk (sunny pastel stroll)
    const melodyCafe: NoteStep[] = [
      { lead: C5, bass: C3 }, { lead: E5, bass: G3 }, { lead: G5, bass: C3 }, { lead: E5, bass: G3 },
      { lead: A5, bass: F3 }, { lead: G5, bass: C3 }, { lead: E5, bass: G3 }, { lead: C5, bass: C3 },
      { lead: D5, bass: D3 }, { lead: F5, bass: A3 }, { lead: A5, bass: D3 }, { lead: G5, bass: G3 },
      { lead: E5, bass: C3 }, { lead: D5, bass: G3 }, { lead: C5, bass: C3 }, { lead: E5, bass: G3 },
      { lead: G5, bass: C3 }, { lead: A5, bass: F3 }, { lead: C6, bass: C3 }, { lead: A5, bass: F3 },
      { lead: G5, bass: C3 }, { lead: E5, bass: G3 }, { lead: D5, bass: G3 }, { lead: C5, bass: C3 },
      { lead: E5, bass: C3 }, { lead: D5, bass: G3 }, { lead: C5, bass: C3 }, { lead: A4, bass: F3 },
      { lead: C5, bass: C3 }, { lead: E5, bass: G3 }, { lead: C5, bass: C3 }, { lead: 0, bass: 0 }
    ];

    // Track 5: Cinnamoroll Cloud Flight (airy sparkling arpeggios)
    const melodyStarlight: NoteStep[] = [
      { lead: G5, bass: C3 }, { lead: C6, bass: 0 },  { lead: E6, bass: G3 }, { lead: G5, bass: 0 },
      { lead: A5, bass: F3 }, { lead: D6, bass: 0 },  { lead: F6, bass: A3 }, { lead: A5, bass: 0 },
      { lead: G5, bass: E3 }, { lead: B5, bass: 0 },  { lead: E6, bass: G3 }, { lead: G5, bass: 0 },
      { lead: E5, bass: A3 }, { lead: A5, bass: 0 },  { lead: C6, bass: E3 }, { lead: E5, bass: 0 },
      { lead: F5, bass: D3 }, { lead: A5, bass: 0 },  { lead: D6, bass: F3 }, { lead: F5, bass: 0 },
      { lead: D5, bass: G3 }, { lead: G5, bass: 0 },  { lead: B5, bass: D3 }, { lead: D5, bass: 0 },
      { lead: C5, bass: C3 }, { lead: E5, bass: 0 },  { lead: G5, bass: E3 }, { lead: C6, bass: 0 },
      { lead: E6, bass: C3 }, { lead: 0, bass: 0 },   { lead: 0, bass: 0 },   { lead: 0, bass: 0 }
    ];

    // Track 6: Sugar Rush 8-Bit Arcade
    const melodyArcade: NoteStep[] = [
      { lead: C5, bass: C3 }, { lead: C5, bass: C3 }, { lead: E5, bass: G3 }, { lead: G5, bass: G3 },
      { lead: C6, bass: C3 }, { lead: G5, bass: G3 }, { lead: E5, bass: C3 }, { lead: C5, bass: G3 },
      { lead: D5, bass: D3 }, { lead: D5, bass: D3 }, { lead: G5, bass: G3 }, { lead: A5, bass: A3 },
      { lead: B5, bass: G3 }, { lead: A5, bass: A3 }, { lead: G5, bass: G3 }, { lead: D5, bass: D3 },
      { lead: E5, bass: C3 }, { lead: G5, bass: G3 }, { lead: A5, bass: A3 }, { lead: C6, bass: C3 },
      { lead: D6, bass: D3 }, { lead: C6, bass: C3 }, { lead: A5, bass: A3 }, { lead: G5, bass: G3 },
      { lead: A5, bass: F3 }, { lead: G5, bass: E3 }, { lead: E5, bass: C3 }, { lead: D5, bass: G3 },
      { lead: C5, bass: C3 }, { lead: E5, bass: G3 }, { lead: C5, bass: C3 }, { lead: 0, bass: 0 }
    ];

    // Track 0: 1st Anniversary Together Waltz (Sweet & Festive Waltz)
    const melodyAnniversary: NoteStep[] = [
      { lead: E5, bass: C3 }, { lead: G5, bass: E3 }, { lead: C6, bass: G3 },
      { lead: B5, bass: G3 }, { lead: C6, bass: E3 }, { lead: D6, bass: G3 },
      { lead: E6, bass: C3 }, { lead: D6, bass: G3 }, { lead: C6, bass: E3 },
      { lead: A5, bass: F3 }, { lead: C6, bass: A3 }, { lead: F5, bass: D3 },
      { lead: G5, bass: G3 }, { lead: B5, bass: D3 }, { lead: D6, bass: G3 },
      { lead: C6, bass: C3 }, { lead: E5, bass: G3 }, { lead: G5, bass: E3 },
      { lead: A5, bass: F3 }, { lead: C6, bass: A3 }, { lead: E6, bass: F3 },
      { lead: D6, bass: G3 }, { lead: B5, bass: F3 }, { lead: G5, bass: D3 },
      { lead: C6, bass: C3 }, { lead: 0, bass: E3 },  { lead: 0, bass: 0 }
    ];

    let currentSteps = melodyAnniversary;
    let stepTime = 190; // ms
    let leadWaveType: OscillatorType = 'triangle';
    let bassWaveType: OscillatorType = 'sine';
    let filterFreq = 1800;

    if (track === 'anniversary_love' || track === 'anniversary_together') {
      currentSteps = melodyAnniversary;
      stepTime = 195;
      leadWaveType = 'triangle';
      filterFreq = 2000;
    } else if (track === 'paris_cafe') {
      currentSteps = melodyParis;
      stepTime = 175;
      leadWaveType = 'triangle';
      filterFreq = 2200;
    } else if (track === 'lullaby') {
      currentSteps = melodyLullaby;
      stepTime = 220;
      leadWaveType = 'sine';
      filterFreq = 1400;
    } else if (track === 'baking_rag') {
      currentSteps = melodyBakingRag;
      stepTime = 160;
      leadWaveType = 'triangle';
      filterFreq = 2000;
    } else if (track === 'starlight') {
      currentSteps = melodyStarlight;
      stepTime = 165;
      leadWaveType = 'sine';
      filterFreq = 1600;
    } else if (track === 'arcade') {
      currentSteps = melodyArcade;
      stepTime = 135;
      leadWaveType = 'triangle';
      filterFreq = 2500;
    } else {
      currentSteps = melodyCafe;
      stepTime = 185;
      leadWaveType = 'triangle';
      filterFreq = 1900;
    }

    const playStep = () => {
      if (this.isMusicMuted || !this.ctx) return;
      const step = currentSteps[this.noteIndex % currentSteps.length];
      const masterVol = this.musicVolume;

      // 1. Play Lead Voice
      if (step.lead > 0) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = leadWaveType;
        osc.frequency.setValueAtTime(step.lead, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(filterFreq, this.ctx.currentTime);

        const duration = (stepTime / 1000) * 0.88;
        const targetVol = 0.05 * masterVol;

        // Gentle attack ramp to avoid clicks
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(targetVol, this.ctx.currentTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      }

      // 2. Play Gentle Bass Accompaniment
      if (step.bass && step.bass > 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        const bassFilter = this.ctx.createBiquadFilter();

        bassOsc.type = bassWaveType;
        bassOsc.frequency.setValueAtTime(step.bass, this.ctx.currentTime);

        bassFilter.type = 'lowpass';
        bassFilter.frequency.setValueAtTime(600, this.ctx.currentTime);

        const bassDuration = (stepTime / 1000) * 0.95;
        const bassTargetVol = 0.035 * masterVol;

        bassGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        bassGain.gain.linearRampToValueAtTime(bassTargetVol, this.ctx.currentTime + 0.02);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + bassDuration);

        bassOsc.connect(bassFilter);
        bassFilter.connect(bassGain);
        bassGain.connect(this.ctx.destination);

        bassOsc.start();
        bassOsc.stop(this.ctx.currentTime + bassDuration);
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

