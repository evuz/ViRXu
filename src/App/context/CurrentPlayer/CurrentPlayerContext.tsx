import React, { createContext, useState, useEffect, useContext } from 'react';
import { filter, switchMap } from 'rxjs/operators';

import { GameContext } from '../Game/GameContext';
import { ActionPayloadCurrentPlayer } from '../../../Game/Entities/ActionPayload';
import { ActionsPayloadType } from '../../../Game/Enums/ActionsPayloadType';
import { User } from '../../../Services/Auth/Entities/User';

export const CurrentPlayerContext = createContext<User>(null);

export function CurrentPlayerState({ children }) {
  const { game } = useContext(GameContext);
  const [currentPlayer, setCurrentPlayer] = useState<User>(null);

  useEffect(() => {
    const subscription = game?.start$
      .pipe(
        switchMap((actions$) => actions$),
        filter(({ payload }) => payload.action === ActionsPayloadType.CurrentPlayer),
      )
      .subscribe((action) => {
        const payload = action.payload as ActionPayloadCurrentPlayer;
        setCurrentPlayer(payload.player);
      });
    return () => subscription?.unsubscribe();
  }, [game]);

  return <CurrentPlayerContext.Provider value={currentPlayer}>{children}</CurrentPlayerContext.Provider>;
}
