import React, { FC, useState, useEffect } from 'react';

import { Player } from '../../Game/Entities/Player';
import { Card as ICard } from '../../Game/Entities/Card';

import { Card } from './Card';

type HandPlayerProps = {
  player: Player;
};

export const HandPlayer: FC<HandPlayerProps> = ({ player }) => {
  const [cards, setCards] = useState<ICard[]>([]);
  useEffect(() => {
    const subscription = player.hand$.subscribe((c) => setCards(c));
    () => subscription.unsubscribe();
  });
  return (
    <div className="HandPlayer">
      <div className="HandPlayer__name">{player.getName()}</div>
      <div className="HandPlayer__cards">
        {cards.map((card, index) => (
          <Card key={`${index}-${card.id}`} card={card} />
        ))}
      </div>
    </div>
  );
};
