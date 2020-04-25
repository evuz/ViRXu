import React, { createContext, useState, useEffect, useContext } from 'react';
import { filter, switchMap } from 'rxjs/operators';

import { playerGenerator, Player } from '../../../Game/Entities/Player';
import { GameContext } from '../Game/GameContext';
import { ActionPayloadCurrentPlayer } from '../../../Game/Entities/ActionPayload';
import { ActionsPayloadType } from '../../../Game/Enums/ActionsPayloadType';

export const PlayerContext = createContext<Player>(null);

let _players: Player[];
function playersGen() {
  if (!_players) {
    _players = [
      playerGenerator({ name: 'Player 1' }),
      playerGenerator({ name: 'Player 2' }),
      playerGenerator({ name: 'Player 3' }),
      playerGenerator({ name: 'Player 4' }),
    ];
  }
  return _players;
}

export function PlayerState({ children }) {
  const { game } = useContext(GameContext);
  const [players] = useState(playersGen());
  const [player, setPlayer] = useState<Player>(null);

  useEffect(() => {
    setTimeout(() => {
      players.forEach((p) => p.ready());
    }, 1000);
  }, []); // eslint-disable-line

  useEffect(() => {
    const subscription = game?.start$
      .pipe(
        switchMap((actions$) => actions$),
        filter(({ payload }) => payload.action === ActionsPayloadType.CurrentPlayer),
      )
      .subscribe((action) => {
        const payload = action.payload as ActionPayloadCurrentPlayer;
        const currentPlayer = players.find((p) => p.id === payload.player.id);
        setPlayer(currentPlayer);
      });
    () => subscription?.unsubscribe();
  }, [game, players]);

  return <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>;
}
