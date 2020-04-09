import React, { useState, useCallback, useEffect, useContext } from 'react';
import { switchMap, filter } from 'rxjs/operators';

import { virusGenerator } from '../../Game/Virus/game';
import { Player } from '../../Game/Entities/Player';
import { Board } from './Board';
import { HandPlayer } from '../components/HandPlayer';
import { GameContext } from '../context/Game/GameContext';
import { CurrentPlayerContext } from '../context/CurrentPlayer/CurrentPlayerContext';
import { ActionsPayloadType } from '../../Game/Enums/ActionsPayloadType';
import { Action } from '../../Game/Entities/Action';
import { ActionPayloadError } from '../../Game/Entities/ActionPayload';

export const Virus = () => {
  const { setContextGame } = useContext(GameContext);
  const currentPlayer = useContext(CurrentPlayerContext);

  const [game] = useState(virusGenerator());

  const playerReady = useCallback(
    (player: Player) => {
      game.addPlayer(player);
    },
    [game],
  );

  useEffect(() => {
    setContextGame(game);
  }, [game, setContextGame]);

  useEffect(() => {
    const subscription = game?.start$
      .pipe(
        switchMap((actions$) => actions$),
        filter(({ payload }) => payload.action === ActionsPayloadType.Error),
      )
      .subscribe((action: Action<ActionPayloadError>) => {
        const { payload } = action;
        payload.errors.forEach((error) => {
          console.error(error.message);
        });
      });
    () => subscription?.unsubscribe();
  }, [game]);

  return (
    <div className="Virus">
      <Board onPlayerReady={playerReady} />
      {currentPlayer ? <HandPlayer player={currentPlayer} /> : null}
    </div>
  );
};
