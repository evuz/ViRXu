import { Deck } from './Deck';

export type Dealer = ReturnType<typeof dealerGenerator>;

export function dealerGenerator(deck: Deck) {
  let cards = deck.slice();
  function restart() {
    cards = deck.slice();
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
    card: (n = 1) => cards.splice(-n),
    shuffle,
    restart,
  };

  return actions;
}
