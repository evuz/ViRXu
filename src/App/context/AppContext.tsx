import React, { FC } from 'react';

import { GameState } from './Game/GameContext';
import { CurrentPlayerState } from './CurrentPlayer/CurrentPlayerContext';
import { ManageSelectionState } from './ManageSelection/ManageSelectionContext';

export const AppContext: FC = ({ children }) => {
  return (
    <GameState>
      <CurrentPlayerState>
        <ManageSelectionState>{children}</ManageSelectionState>
      </CurrentPlayerState>
    </GameState>
  );
};
