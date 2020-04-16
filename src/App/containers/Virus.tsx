import React, { useState, useCallback, useEffect, useContext } from 'react';
import { switchMap, filter, tap } from 'rxjs/operators';

import { virusGenerator } from '../../Game/Virus/game';
import { Player } from '../../Game/Entities/Player';
import { Board } from './Board';
import { HandPlayer } from './HandPlayer';
import { GameContext } from '../context/Game/GameContext';
import { ActionsPayloadType } from '../../Game/Enums/ActionsPayloadType';
import { Action } from '../../Game/Entities/Action';
import { ActionPayloadError } from '../../Game/Entities/ActionPayload';
import { ManageSelectionContext, SelectionPlace } from '../context/ManageTurn/ManageSelectionContext';

export const Virus = () => {
  const { setContextGame } = useContext(GameContext);
  const { setSelectionRequirements } = useContext(ManageSelectionContext);

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
        tap(() => setSelectionRequirements({ place: SelectionPlace.Hand })),
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
  }, [game, setSelectionRequirements]);

  return (
    <div className="Virus">
      <Board onPlayerReady={playerReady} />
      <HandPlayer />
    </div>
  );
};
