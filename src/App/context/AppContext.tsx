import React, { FC } from 'react';

import { GameState } from './Game/GameContext';
import { CurrentPlayerState } from './CurrentPlayer/CurrentPlayerContext';

export const AppContext: FC = ({ children }) => {
  return (
    <GameState>
      <CurrentPlayerState>{children}</CurrentPlayerState>
    </GameState>
  );
};
