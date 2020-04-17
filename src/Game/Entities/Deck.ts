import { Card, CardGenerator } from './Card';

type DeckItem = {
  card: CardGenerator;
  quantity: number;
};

export type Deck = Card[];

export function deckGenerator(deck: DeckItem[]): Deck {
  return deck.reduce((acc, item) => {
    return acc.concat(Array.from({ length: item.quantity }).map(() => item.card()));
  }, []);
}
