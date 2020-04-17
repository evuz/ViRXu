import { Card } from './Card';
import { uid } from '../../Utils/uid';

type DeckItem = {
  card: Card;
  quantity: number;
};

export type Deck = Card[];

export function deckGenerator(deck: DeckItem[]): Deck {
  return deck.reduce((acc, item) => {
    return acc.concat(Array.from({ length: item.quantity }).map(() => Object.assign({}, item.card, { id: uid(6) })));
  }, []);
}
