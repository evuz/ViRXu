import React, { createContext, useState, useEffect, useContext } from 'react';
import { filter, switchMap } from 'rxjs/operators';

import { IPlayer } from '../../../Game/Entities/Player';
import { GameContext } from '../Game/GameContext';
import { ActionPayloadCurrentPlayer } from '../../../Game/Entities/ActionPayload';
import { ActionsPayloadType } from '../../../Game/Enums/ActionsPayloadType';

export const CurrentPlayerContext = createContext<IPlayer>(null);

export function CurrentPlayerState({ children }) {
  const { game } = useContext(GameContext);
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>(null);

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
