import React, { FC, useState, useEffect } from 'react';

import { Player } from '../../Game/Entities/Player';

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
      {!isReady ? <button onClick={() => player.ready(true)}>Ready!</button> : null}
    </div>
  );
};
