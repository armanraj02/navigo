export type AudioChannel = "ambient" | "ui" | "transition" | "notification";

export interface AudioTrack {
  id: string;
  channel: AudioChannel;
  url: string;
  loop: boolean;
  volume: number;
}

export class AudioManagerClass {
  private static instance: AudioManagerClass;
  private enabled = false;
  private registry: Map<string, AudioTrack> = new Map();
  private playing: Set<string> = new Set();

  private constructor() {}

  public static getInstance(): AudioManagerClass {
    if (!AudioManagerClass.instance) {
      AudioManagerClass.instance = new AudioManagerClass();
    }
    return AudioManagerClass.instance;
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) this.stopAll();
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public register(track: AudioTrack): void {
    this.registry.set(track.id, track);
  }

  // Framework stub — actual Web Audio API implementation in future phase
  public play(trackId: string): void {
    if (!this.enabled) return;
    const track = this.registry.get(trackId);
    if (!track) {
      console.warn(`AudioManager: track "${trackId}" not registered.`);
      return;
    }
    this.playing.add(trackId);
    // Future: start Web Audio API node here
  }

  public stop(trackId: string): void {
    this.playing.delete(trackId);
    // Future: stop Web Audio API node here
  }

  public stopAll(): void {
    this.playing.forEach((id) => this.stop(id));
    this.playing.clear();
  }

  public playTransitionChime(): void {
    this.play("ui-transition");
  }

  public playButtonClick(): void {
    this.play("ui-click");
  }

  public getPlayingTracks(): string[] {
    return Array.from(this.playing);
  }
}

export const AudioManager = AudioManagerClass.getInstance();
