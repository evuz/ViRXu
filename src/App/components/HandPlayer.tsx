import React, { FC, useState, useEffect } from 'react';

import { Player } from '../../Game/Entities/Player';
import { Card as ICard } from '../../Game/Entities/Card';

import { Card } from './Card';
import { Button } from './Button';

type HandPlayerProps = {
  player: Player;
};

export const HandPlayer: FC<HandPlayerProps> = ({ player }) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [cardsSelected, setCardsSelected] = useState<Map<ICard, boolean>>(new Map());
  const numberCardsSelected = Array.from(cardsSelected.values()).filter((v) => !!v).length;
  const disableDiscard = !numberCardsSelected;
  const disablePlay = numberCardsSelected != 1;

  useEffect(() => {
    const subscription = player.hand$.subscribe((c) => setCards(c));
    () => subscription.unsubscribe();
  }, [player.hand$]);

  function selectCard(card) {
    setCardsSelected((prev) => {
      const cardState = prev.get(card);
      prev.set(card, !cardState);
      return new Map(prev.entries());
    });
  }

  function discard() {
    if (disableDiscard) {
      return;
    }
    player.discard(Array.from(cardsSelected.keys()));
    setCardsSelected(new Map());
  }

  return (
    <div className="HandPlayer">
      <div className="HandPlayer__name">{player.getName()}</div>
      <div className="HandPlayer__cards">
        {cards.map((card, index) => (
          <button onClick={() => selectCard(card)} key={`${index}-${card.id}`}>
            <Card card={card} selected={cardsSelected.get(card)} />
          </button>
        ))}
      </div>
      <div className="HandPlayer__buttons">
        <Button full disabled={disablePlay}>
          Play
        </Button>
        <Button onClick={discard} full disabled={disableDiscard}>
          Discard
        </Button>
      </div>
    </div>
  );
};
