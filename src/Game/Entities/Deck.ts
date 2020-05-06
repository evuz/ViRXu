import { Card, CardGenerator } from './Card';

type DeckItem = {
  card: CardGenerator;
  quantity: number;
};

export type DeckCollapsed = { [id: string]: DeckItem };
export type Deck = Card[];

export function deckGenerator(deck: DeckCollapsed): Deck {
  return Object.values(deck).reduce((acc, item) => {
    return acc.concat(Array.from({ length: item.quantity }).map(() => item.card()));
  }, []);
}
