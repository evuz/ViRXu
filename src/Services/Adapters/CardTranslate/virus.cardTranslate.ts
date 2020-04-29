import { CardTranslate } from './cardTranslate.adapter';
import { virusDeck } from '../../../Game/Virus/deck';
import { Card } from '../../../Game/Entities/Card';

// TODO: make card translate generic
export function virusCardTranslate(): CardTranslate {
  const deck = virusDeck;

  function transcode(card: Card) {
    return {
      id: card.id,
      cardId: card.cardId,
    };
  }

  function decode({ id, cardId }: { id: Card['id']; cardId: Card['cardId'] }) {
    const cardGenerator = deck[cardId];
    if (!cardGenerator) {
      throw Error(`Card ${cardId} is unknown`);
    }
    const card = cardGenerator.card();
    card.id = id;
    return card;
  }

  return {
    decode,
    transcode,
  };
}
