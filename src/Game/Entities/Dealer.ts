import { Observable } from 'rxjs';

import { Deck } from './Deck';
import { actionableGenerator, Action } from './Action';

export type Dealer = ReturnType<typeof dealerGenerator>;

export function dealerGenerator(deck: Deck) {
  let cards = deck.slice();
  const [action$, fireAction] = actionableGenerator();

  function restart() {
    cards = deck.slice();
    return actions;
  }

  function start(gameActions$: Observable<Action>) {
    gameActions$.subscribe((action) => console.log(`Dealer ->`, action));
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
    action$,
    start,
    shuffle,
    restart,
    fireAction,
    card: (n = 1) => cards.splice(-n),
  };

  return actions;
}
