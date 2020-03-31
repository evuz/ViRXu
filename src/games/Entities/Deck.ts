import { Card } from './Card';

type DeckItem = {
  card: Card;
  quantity: number;
};

export type Deck = Card[];

export function deckGenerator(deck: DeckItem[]): Deck {
  return deck.reduce((acc, item) => {
    return acc.concat(Array.from({ length: item.quantity }).map(() => item.card));
  }, []);
}
