import { useState, useCallback } from 'react';
import type { GameState, GameScene, PlayerChoice } from '@/types/game';

const INITIAL_STATE: GameState = {
  currentScene: 'intro',
  act1Completed: false,
  act2Completed: false,
  act3Completed: false,
  couragePoints: 0,
  selfAwarenessPoints: 0,
  regulationPoints: 0,
  playerName: '',
  choices: {},
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  const moveToScene = useCallback((scene: GameScene) => {
    setGameState((prev) => ({
      ...prev,
      currentScene: scene,
    }));
  }, []);

  const setPlayerName = useCallback((name: string) => {
    setGameState((prev) => ({
      ...prev,
      playerName: name.trim(),
    }));
  }, []);

  const recordChoice = useCallback((act: 'act1' | 'act2' | 'act3', choice: PlayerChoice) => {
    setGameState((prev) => ({
      ...prev,
      choices: {
        ...prev.choices,
        [act]: choice,
      },
      [`${act}Completed`]: true,
      couragePoints: prev.couragePoints + (choice === 'confront' ? 10 : 5),
      selfAwarenessPoints: prev.selfAwarenessPoints + 5,
      regulationPoints: prev.regulationPoints + (choice === 'confront' ? 10 : 5),
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE);
  }, []);

  const getTotalPoints = useCallback(() => {
    return (
      gameState.couragePoints +
      gameState.selfAwarenessPoints +
      gameState.regulationPoints
    );
  }, [gameState]);

  const isGameComplete = useCallback(() => {
    return gameState.act1Completed && gameState.act2Completed && gameState.act3Completed;
  }, [gameState]);

  return {
    gameState,
    moveToScene,
    setPlayerName,
    recordChoice,
    resetGame,
    getTotalPoints,
    isGameComplete,
  };
}
