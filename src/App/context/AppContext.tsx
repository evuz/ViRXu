import React, { FC } from 'react';

import { GameState } from './Game/GameContext';
import { CurrentPlayerState } from './CurrentPlayer/CurrentPlayerContext';
import { ManageSelectionState } from './ManageSelection/ManageSelectionContext';
import { PlayerState } from './Player/PlayerContext';

export const AppContext: FC = ({ children }) => {
  return (
    <GameState>
      <PlayerState>
        <CurrentPlayerState>
          <ManageSelectionState>{children}</ManageSelectionState>
        </CurrentPlayerState>
      </PlayerState>
    </GameState>
  );
};
