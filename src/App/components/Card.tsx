import React, { FC } from 'react';

import { Card as ICard } from '../../Game/Entities/Card';
import { filterClassNames } from '../../Utils/filterClassNames';

type CardProps = {
  card: ICard;
  selected?: boolean;
};

export const Card: FC<CardProps> = ({ card: c, selected = false }) => {
  const classNameColor = `Card--${c.color}`;
  const classNames = filterClassNames({
    Card: true,
    [classNameColor]: true,
    'Card--selected': selected,
  });
  return (
    <figure className={classNames}>
      <div className="Card__content">{c.name}</div>
    </figure>
  );
};
