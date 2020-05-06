import React, { createContext, useState, useEffect } from 'react';
import { VirusGame, virusGenerator } from '../../../Game/Virus/game';

type IGameContext = {
  game: VirusGame;
};

export const GameContext = createContext<IGameContext>(null);

export function GameState({ children }) {
  const [game, setGameState] = useState<VirusGame>(null);

  useEffect(() => {
    setGameState(virusGenerator());
  }, []);

  const context = {
    game,
  };

  return <GameContext.Provider value={context}>{children}</GameContext.Provider>;
}
