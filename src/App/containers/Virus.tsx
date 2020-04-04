import React, { useState, useCallback, useEffect } from 'react';
import { switchMap, filter } from 'rxjs/operators';

import { virusGenerator } from '../../Game/Virus/game';
import { Player } from '../../Game/Entities/Player';
import { ActionsPayloadType } from '../../Game/Enums/ActionsPayloadType';
import { ActionPayloadCurrentPlayer } from '../../Game/Entities/ActionPayload';

import { Board } from './Board';
import { HandPlayer } from '../components/HandPlayer';

export const Virus = () => {
  const [game] = useState(virusGenerator());
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const playerReady = useCallback(
    (player: Player) => {
      game.addPlayer(player);
    },
    [game],
  );

  useEffect(() => {
    const subscription = game.start$
      .pipe(
        switchMap((actions$) => actions$),
        filter(({ payload }) => payload.action === ActionsPayloadType.CurrentPlayer),
      )
      .subscribe((action) => {
        const payload = action.payload as ActionPayloadCurrentPlayer;
        setCurrentPlayer(payload.player);
      });
    () => subscription.unsubscribe();
  }, [game.start$]);

  return (
    <div className="Virus">
      <Board onPlayerReady={playerReady} />
      {currentPlayer ? <HandPlayer player={currentPlayer} /> : null}
    </div>
  );
};
