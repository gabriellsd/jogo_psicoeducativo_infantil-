import { useState, type ReactNode } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useGameAudio } from '@/hooks/useGameAudio';
import { GAME_SCENES, SCENARIO_HOME_URL, SCENARIO_SCHOOL_URL } from '@/types/game';
import type { PlayerChoice } from '@/types/game';
import IntroScene from '@/components/IntroScene';
import ActScene from '@/components/ActScene';
import ResultScene from '@/components/ResultScene';
import ReflectionScene from '@/components/ReflectionScene';
import CertificateScene from '@/components/CertificateScene';
import AudioControls from '@/components/AudioControls';

export default function Home() {
  const {
    gameState,
    moveToScene,
    setPlayerName,
    recordChoice,
    resetGame,
    getTotalPoints,
  } = useGameState();

  const { playSoundEffect, stopBackgroundMusic, toggleMute, unlockAudio, isMuted } =
    useGameAudio();

  const [showResult, setShowResult] = useState(false);
  const [lastChoice, setLastChoice] = useState<PlayerChoice | null>(null);

  const handleStartGame = async () => {
    await unlockAudio();
    playSoundEffect('click');
    moveToScene('act1');
  };

  const handleChoice = async (choice: PlayerChoice) => {
    await unlockAudio();
    playSoundEffect('click');

    const actMap = {
      act1: 'act1' as const,
      act2: 'act2' as const,
      act3: 'act3' as const,
    };

    if (gameState.currentScene in actMap) {
      recordChoice(actMap[gameState.currentScene as keyof typeof actMap], choice);
      setLastChoice(choice);
      setShowResult(true);
    }
  };

  const handleContinueFromResult = () => {
    playSoundEffect('levelup');
    setShowResult(false);

    if (gameState.currentScene === 'act1') {
      moveToScene('act2');
    } else if (gameState.currentScene === 'act2') {
      moveToScene('act3');
    } else if (gameState.currentScene === 'act3') {
      moveToScene('reflection');
    }
  };

  const handleGoToCertificate = () => {
    playSoundEffect('success');
    moveToScene('certificate');
  };

  const handlePlayAgain = () => {
    playSoundEffect('click');
    resetGame();
    setShowResult(false);
    setLastChoice(null);
    moveToScene('intro');
  };

  const getScenarioImage = () => {
    switch (gameState.currentScene) {
      case 'act1':
        return SCENARIO_HOME_URL;
      case 'act2':
      case 'act3':
        return SCENARIO_SCHOOL_URL;
      default:
        return '';
    }
  };

  const sceneLabel = GAME_SCENES[gameState.currentScene].title;

  const shell = (content: ReactNode) => (
    <>
      <a href="#conteudo-jogo" className="skip-link">
        Ir para o conteúdo do jogo
      </a>
      <AudioControls isMuted={isMuted} onToggleMute={toggleMute} />
      <main id="conteudo-jogo" aria-label={sceneLabel}>
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {sceneLabel}
        </div>
        {content}
      </main>
    </>
  );

  if (gameState.currentScene === 'intro') {
    return shell(
      <IntroScene
        playerName={gameState.playerName}
        onPlayerNameChange={setPlayerName}
        onStart={handleStartGame}
      />
    );
  }

  if (['act1', 'act2', 'act3'].includes(gameState.currentScene)) {
    const scene = GAME_SCENES[gameState.currentScene];

    if (showResult && lastChoice) {
      return shell(
        <ResultScene scene={scene} choice={lastChoice} onContinue={handleContinueFromResult} />
      );
    }

    return shell(
      <ActScene
        scene={scene}
        scenarioImage={getScenarioImage()}
        onChoice={handleChoice}
      />
    );
  }

  if (gameState.currentScene === 'reflection') {
    return shell(<ReflectionScene onCertificate={handleGoToCertificate} />);
  }

  if (gameState.currentScene === 'certificate') {
    return shell(
      <CertificateScene
        playerName={gameState.playerName}
        totalPoints={getTotalPoints()}
        onPlayAgain={() => {
          stopBackgroundMusic();
          handlePlayAgain();
        }}
      />
    );
  }

  return null;
}
