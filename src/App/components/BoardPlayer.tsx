import React, { FC } from 'react';

import { OrganCard as OrganCardComponent } from './OrganCard';
import { filterClassNames } from '../../Utils/filterClassNames';
import { OrganCard } from '../../Game/Entities/OrganCard';
import { User } from '../../Services/Auth/Entities/User';

type BoardPlayer = {
  player: User;
  board: OrganCard[];
  onSelectCard: Function;
  selectable?: boolean;
  active?: boolean;
};

export const BoardPlayer: FC<BoardPlayer> = ({ player, board, selectable = false, active = false, onSelectCard }) => {
  const classNames = filterClassNames({
    BoardPlayer: true,
    'BoardPlayer--active': active,
  });

  return (
    <div className={classNames}>
      {player.name}
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
