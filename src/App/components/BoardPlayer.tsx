import React, { FC, useState, useEffect } from 'react';

import { Player } from '../../Game/Entities/Player';
import { Button } from './Button';
import { filterClassNames } from '../../Utils/filterClassNames';

type BoardPlayer = {
  player: Player;
  active?: boolean;
};

export const BoardPlayer: FC<BoardPlayer> = ({ player, active = false }) => {
  const [isReady, setIsReady] = useState(false);
  const classNames = filterClassNames({
    BoardPlayer: true,
    'BoardPlayer--active': active,
  });

  useEffect(() => {
    const subscription = player.ready$.subscribe(() => setIsReady(true));
    () => subscription.unsubscribe();
  }, [player.ready$]);

  return (
    <div className={classNames}>
      {player.getName()}
      {!isReady ? <Button onClick={() => player.ready(true)}>Ready!</Button> : null}
    </div>
  );
};
