import React, { useEffect, useState, useContext } from 'react';

import { Player, playerGenerator } from '../../../Game/Entities/Player';
import { filter, take } from 'rxjs/operators';
import { domain } from '../../../Services/domain';
import { ActionsPayloadType } from '../../../Game/Enums/ActionsPayloadType';
import { ActionPayloadNewPlayer } from '../../../Game/Entities/ActionPayload';
import { PlayerContext } from './context';
import { GameContext } from '../Game/GameContext';
import { random } from '../../../Utils/random';
import { User } from '../../../Services/Auth/Entities/User';

export function PlayerState({ children }) {
  const { game } = useContext(GameContext);

  const [player, setPlayer] = useState<Player>(null);
  const [players, setPlayers] = useState<User[]>([]);

  useEffect(() => {
    const subscription = domain()
      .get('user')
      .execute()
      .subscribe((user) => {
        console.log(user);
        setPlayer(user ? playerGenerator(user) : null);
      });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!player) {
      return;
    }
    setTimeout(() => {
      player.ready();
    }, 1000);
  }, [player]);

  useEffect(() => {
    // Choose dealer
    const subscription = domain()
      .adapter('actionsManager')
      .actions$.pipe(filter(({ payload }) => payload.action === ActionsPayloadType.NewPlayer))
      .subscribe((action) => {
        const payload = action.payload as ActionPayloadNewPlayer;
        setPlayers((p) => p.concat(payload.player));
      });
    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    // Choose dealer
    const subscription = domain()
      .adapter('actionsManager')
      .actions$.pipe(
        filter(({ payload }) => payload.action === ActionsPayloadType.Start),
        filter(() => players[0]?.id === player?.id),
        take(1),
      )
      .subscribe(() => {
        const dealer = players[random(players.length - 1)].id;
        game.assignDealer(dealer);
      });
    return () => subscription?.unsubscribe();
  }, [players, player, game]);

  return <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>;
}
