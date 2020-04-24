import React, { useState, useCallback, useEffect, useContext } from 'react';
import { switchMap, filter } from 'rxjs/operators';

import { virusGenerator } from '../../Game/Virus/game';
import { Player } from '../../Game/Entities/Player';
import { Board } from '../containers/Board';
import { HandPlayer } from '../containers/HandPlayer';
import { GameContext } from '../context/Game/GameContext';
import { ActionsPayloadType } from '../../Game/Enums/ActionsPayloadType';
import { Action } from '../../Game/Entities/Action';
import { ActionPayloadError } from '../../Game/Entities/ActionPayload';
import { ManageSelectionContext, SelectionPlace } from '../context/ManageSelection/ManageSelectionContext';
import { CurrentPlayerContext } from '../context/CurrentPlayer/CurrentPlayerContext';

export const Virus = ({ params }) => {
  const { setContextGame } = useContext(GameContext);
  const currentPlayer = useContext(CurrentPlayerContext);
  const { setSelectionRequirements } = useContext(ManageSelectionContext);
  const [game] = useState(virusGenerator());

  const playerReady = useCallback(
    (player: Player) => {
      game.addPlayer(player);
    },
    [game],
  );

  useEffect(() => {
    console.log(params);
  }, [params]);

  useEffect(() => {
    setSelectionRequirements({ place: SelectionPlace.Hand });
  }, [currentPlayer, setSelectionRequirements]);

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
        setSelectionRequirements({ place: SelectionPlace.Hand });
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
