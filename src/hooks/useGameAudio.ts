import { useCallback, useEffect, useRef, useState } from 'react';

type SoundEffect = 'click' | 'success' | 'levelup' | 'guide' | 'points';

const BG_MUSIC_URL =
  'https://d2xsxph8kpxj0f.cloudfront.net/310419663031122711/eeqBtMWiLGrHYESXxrvKCv/cerebro-preocupado-background-music-7kJ2mN9pQvR4xWsLtYzAbC.wav';

const SFX_URL =
  'https://d2xsxph8kpxj0f.cloudfront.net/310419663031122711/eeqBtMWiLGrHYESXxrvKCv/game-sound-effects-3pL8qK2rMvN5xYzAbC9dEf.wav';

const EFFECT_TIMINGS: Record<SoundEffect, number> = {
  click: 0,
  success: 3,
  levelup: 6,
  guide: 9,
  points: 12,
};

export function useGameAudio() {
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const soundEffectsRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const musicVolume = 0.25;
  const sfxVolume = 0.45;

  useEffect(() => {
    const bgMusic = new Audio(BG_MUSIC_URL);
    bgMusic.loop = true;
    bgMusic.volume = musicVolume;
    backgroundMusicRef.current = bgMusic;

    const sfx = new Audio(SFX_URL);
    sfx.volume = sfxVolume;
    soundEffectsRef.current = sfx;

    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      sfx.pause();
      sfx.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = isMuted ? 0 : musicVolume;
    }
    if (soundEffectsRef.current) {
      soundEffectsRef.current.volume = isMuted ? 0 : sfxVolume;
    }
  }, [isMuted]);

  const unlockAudio = useCallback(async () => {
    setHasInteracted(true);
    if (isMuted || !backgroundMusicRef.current) return;
    try {
      if (backgroundMusicRef.current.paused) {
        await backgroundMusicRef.current.play();
      }
    } catch {
      /* autoplay bloqueado até interação */
    }
  }, [isMuted]);

  const playSoundEffect = useCallback(
    async (effect: SoundEffect) => {
      await unlockAudio();
      if (isMuted || !soundEffectsRef.current) return;

      const sfx = soundEffectsRef.current;
      sfx.currentTime = EFFECT_TIMINGS[effect];
      try {
        await sfx.play();
      } catch {
        /* ignorar falha de reprodução */
      }
    },
    [isMuted, unlockAudio]
  );

  const startBackgroundMusic = useCallback(async () => {
    if (hasInteracted) {
      await unlockAudio();
    }
  }, [hasInteracted, unlockAudio]);

  const stopBackgroundMusic = useCallback(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    playSoundEffect,
    startBackgroundMusic,
    stopBackgroundMusic,
    toggleMute,
    unlockAudio,
    isMuted,
  };
}
