import React, { FC, useState, useEffect } from 'react';

import { Button } from './Button';
import { OrganCard as OrganCardComponent } from './OrganCard';
import { Player } from '../../Game/Entities/Player';
import { filterClassNames } from '../../Utils/filterClassNames';
import { OrganCard } from '../../Game/Entities/OrganCard';

type BoardPlayer = {
  player: Player;
  board: OrganCard[];
  onSelectCard: Function;
  selectable?: boolean;
  active?: boolean;
};

export const BoardPlayer: FC<BoardPlayer> = ({ player, board, selectable = false, active = false, onSelectCard }) => {
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
        {board
          ? board.map((cards, index) => (
              <OrganCardComponent onClick={onSelectCard} selectable={selectable} key={index} card={cards} />
            ))
          : null}
      </div>
    </div>
  );
};
