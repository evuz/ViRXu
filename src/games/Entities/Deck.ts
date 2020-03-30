import { Card } from './Card';

type DeckItem = {
  card: Card;
  quantity: number;
};

export type Deck = ReturnType<typeof deckGenerator>;

export function deckGenerator(deck: DeckItem[]) {
  let cards: Card[] = deckToCards();

  function deckToCards() {
    return deck.reduce((acc, item) => {
      return acc.concat(Array.from({ length: item.quantity }).map(() => item.card));
    }, []);
  }

  function restart() {
    console.log(deck);
    cards = deckToCards();
    return actions;
  }

  function shuffle() {
    // Durstenfeld shuffle
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return actions;
  }

  const actions = {
    getCards: () => cards,
    shuffle,
    restart,
  };

  return actions;
}
