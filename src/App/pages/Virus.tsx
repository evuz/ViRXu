import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'wouter';
import { switchMap, filter } from 'rxjs/operators';

import { Board } from '../containers/Board';
import { HandPlayer } from '../containers/HandPlayer';
import { GameContext } from '../context/Game/GameContext';
import { ActionsPayloadType } from '../../Game/Enums/ActionsPayloadType';
import { Action } from '../../Game/Entities/Action';
import { ActionPayloadError, ActionPayloadWin } from '../../Game/Entities/ActionPayload';
import { ManageSelectionContext, SelectionPlace } from '../context/ManageSelection/ManageSelectionContext';
import { CurrentPlayerContext } from '../context/CurrentPlayer/CurrentPlayerContext';
import { domain } from '../../Services/domain';
import { Room } from '../../Services/Room/Entities/Room';

export const Virus = ({ params }) => {
  const { game } = useContext(GameContext);
  const currentPlayer = useContext(CurrentPlayerContext);
  const { setSelectionRequirements } = useContext(ManageSelectionContext);
  const [, setLocation] = useLocation();

  const [room, setRoom] = useState<Room>(null);

  useEffect(() => {
    domain()
      .get('getRoom')
      .execute(params.roomId)
      .then((room) => {
        setRoom(room);
        domain().get('enterRoom').execute(room.id);
      })
      .catch(() => {
        setLocation('/not-found', true);
      });
    return () => domain().get('enterRoom').execute(null);
  }, [params, setLocation]);

  useEffect(() => {
    setSelectionRequirements({ place: SelectionPlace.Hand });
  }, [currentPlayer, setSelectionRequirements]);

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
    return () => subscription?.unsubscribe();
  }, [game, setSelectionRequirements]);

  useEffect(() => {
    const subscription = domain()
      .adapter('actionsManager')
      .actions$.pipe(filter(({ payload }) => payload.action === ActionsPayloadType.Win))
      .subscribe((action: Action<ActionPayloadWin>) => {
        const { payload } = action;
        console.log(`%c ${payload.winner.name} is the winner!`, 'color: #bada55');
      });
    return () => subscription?.unsubscribe();
  }, [game, setSelectionRequirements]);

  if (!room) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="Virus">
      <Board />
      <HandPlayer />
    </div>
  );
};
