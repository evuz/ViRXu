import React, { useState, useCallback, useEffect, useContext } from 'react';

import { virusGenerator } from '../../Game/Virus/game';
import { Player } from '../../Game/Entities/Player';
import { Board } from './Board';
import { HandPlayer } from '../components/HandPlayer';
import { GameContext } from '../context/Game/GameContext';
import { CurrentPlayerContext } from '../context/CurrentPlayer/CurrentPlayerContext';

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

  return (
    <div className="Virus">
      <Board onPlayerReady={playerReady} />
      {currentPlayer ? <HandPlayer player={currentPlayer} /> : null}
    </div>
  );
};
