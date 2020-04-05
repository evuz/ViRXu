import React, { FC, useState, useEffect } from 'react';

import { Player } from '../../Game/Entities/Player';
import { Button } from './Button';

type BoardPlayer = {
  player: Player;
};

export const BoardPlayer: FC<BoardPlayer> = ({ player }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const subscription = player.ready$.subscribe(() => setIsReady(true));
    () => subscription.unsubscribe();
  }, [player.ready$]);

  return (
    <div className="BoardPlayer">
      {player.getName()}
      {!isReady ? <Button onClick={() => player.ready(true)}>Ready!</Button> : null}
    </div>
  );
};
