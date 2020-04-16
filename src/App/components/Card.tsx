import React, { FC } from 'react';

import { Card as ICard } from '../../Game/Entities/Card';
import { filterClassNames } from '../../Utils/filterClassNames';

type CardProps = {
  card: ICard;
  selectable?: boolean;
  selected?: boolean;
};

export const Card: FC<CardProps> = ({ card: c, selected = false, selectable = true }) => {
  const classNameColor = `Card--${c.color}`;
  const classNames = filterClassNames({
    Card: true,
    [classNameColor]: true,
    'Card--selectable': selectable,
    'Card--selected': selected,
  });
  return (
    <figure className={classNames}>
      <div className="Card__content">{c.name}</div>
    </figure>
  );
};
