import React, { FC, useLayoutEffect, useRef } from 'react';

import { Card as ICard } from '../../Game/Entities/Card';
import { filterClassNames } from '../../Utils/filterClassNames';

import { cards as cardImages } from '../../Utils/images';

type CardProps = {
  card: ICard;
  selectable?: boolean;
  selected?: boolean;
  onSize?(measure: DOMRect): void;
};

export const Card: FC<CardProps> = ({ children, card: c, selected = false, selectable = true, onSize = () => {} }) => {
  const cardEl = useRef<HTMLElement>(null);

  const urlImage = cardImages[c.cardId];
  const classNameColor = `Card--${c.color}`;
  const classNames = filterClassNames({
    Card: true,
    [classNameColor]: true,
    'Card--selectable': selectable,
    'Card--selected': selected,
  });

  const handleSize = () => {
    onSize(cardEl.current.getBoundingClientRect());
  };

  useLayoutEffect(() => {
    handleSize();
  }, [cardEl]); // eslint-disable-line

  return (
    <figure ref={cardEl} className={classNames}>
      <img draggable="false" onLoad={handleSize} className="Card__content" src={urlImage} alt={`${c.name} card`} />
      {children}
    </figure>
  );
};
