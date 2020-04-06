import React, { useState, FC, useEffect, useContext } from 'react';
import { Subscription } from 'rxjs';

import { playerGenerator, Player } from '../../Game/Entities/Player';

import { BoardPlayer } from '../components/BoardPlayer';
import { CurrentPlayerContext } from '../context/CurrentPlayer/CurrentPlayerContext';

type BoardProps = {
  onPlayerReady(player: Player): void;
};

export const Board: FC<BoardProps> = ({ onPlayerReady }) => {
  const currentPlayer = useContext(CurrentPlayerContext);
  const [players] = useState([
    playerGenerator({ id: '1', name: 'Player 1' }),
    playerGenerator({ id: '2', name: 'Player 2' }),
    playerGenerator({ id: '3', name: 'Player 3' }),
    playerGenerator({ id: '4', name: 'Player 4' }),
  ]);

  useEffect(() => {
    const subscriptions: Subscription[] = players.map((player) => player.ready$.subscribe(() => onPlayerReady(player)));
    () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [onPlayerReady, players]);

  return (
    <div className="Board">
      {players.map((player) => (
        <BoardPlayer key={player.getId()} active={currentPlayer?.getId() === player.getId()} player={player} />
      ))}
    </div>
  );
};
