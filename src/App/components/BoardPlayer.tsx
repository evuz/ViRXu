import React, { FC, useState, useEffect } from 'react';

import { Button } from './Button';
import { CardPlayed } from './CardPlayed';
import { Player } from '../../Game/Entities/Player';
import { filterClassNames } from '../../Utils/filterClassNames';
import { CardPlayed as ICardPlayed } from '../../Game/Entities/CardPlayed';

type BoardPlayer = {
  player: Player;
  board: ICardPlayed[];
  active?: boolean;
};

export const BoardPlayer: FC<BoardPlayer> = ({ player, board, active = false }) => {
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
      <div className="BoardPlayer__cards">
        {board ? board.map((cards, index) => <CardPlayed key={index} card={cards} />) : null}
      </div>
    </div>
  );
};
