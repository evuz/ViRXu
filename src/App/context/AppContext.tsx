import React, { FC } from 'react';

import { GameState } from './Game/GameContext';
import { CurrentPlayerState } from './CurrentPlayer/CurrentPlayerContext';
import { ManageTurnState } from './ManageTurn/ManageTurnContext';

export const AppContext: FC = ({ children }) => {
  return (
    <GameState>
      <CurrentPlayerState>
        <ManageTurnState>{children}</ManageTurnState>
      </CurrentPlayerState>
    </GameState>
  );
};
