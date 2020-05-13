import React, { FC } from 'react';

import { Card as ICard } from '../../Game/Entities/Card';
import { filterClassNames } from '../../Utils/filterClassNames';

import { cards as cardImages } from '../../Utils/images';

type CardProps = {
  card: ICard;
  selectable?: boolean;
  selected?: boolean;
};

export const Card: FC<CardProps> = ({ card: c, selected = false, selectable = true }) => {
  const urlImage = cardImages[c.cardId];
  const classNameColor = `Card--${c.color}`;
  const classNames = filterClassNames({
    Card: true,
    [classNameColor]: true,
    'Card--selectable': selectable,
    'Card--selected': selected,
  });

  return (
    <figure className={classNames}>
      <img draggable="false" className="Card__content" src={urlImage} alt={`${c.name} card`} />
    </figure>
  );
};
