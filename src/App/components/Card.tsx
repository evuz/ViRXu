import React, { FC } from 'react';

import { Card as ICard } from '../../Game/Entities/Card';
import { filterClassNames } from '../../Utils/filterClassNames';

type CardProps = {
  card: ICard;
};

export const Card: FC<CardProps> = ({ card: c }) => {
  const classNameColor = `Card--${c.color}`;
  const classNames = filterClassNames({
    Card: true,
    [classNameColor]: true,
  });
  return (
    <figure className={classNames}>
      <div className="Card__content">{c.name}</div>
    </figure>
  );
};
