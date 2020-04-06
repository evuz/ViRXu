import React, { createContext, useState, useCallback } from 'react';
import { VirusGame } from '../../../Game/Virus/game';

type IGameContext = {
  setContextGame(game: VirusGame): void;
  game: VirusGame;
};

export const GameContext = createContext<IGameContext>(null);

export function GameState({ children }) {
  const [game, setGameState] = useState<VirusGame>(null);

  const setContextGame = useCallback((g: VirusGame) => {
    setGameState(g);
  }, []);

  const context = {
    game,
    setContextGame,
  };

  return <GameContext.Provider value={context}>{children}</GameContext.Provider>;
}
