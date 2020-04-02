import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Deck } from './Deck';
import { actionableGenerator, Action } from './Action';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { EntitiesId } from '../Enums/EntitiesId';
import { ActionPayloadStart } from './ActionPayload';
import { Card } from './Card';

export type Dealer = ReturnType<typeof dealerGenerator>;

export function dealerGenerator(deck: Deck) {
  let cards = deck.slice();

  const initialCardsByPlayer = 3;
  const id = EntitiesId.Dealer;
  const [action$, fireAction] = actionableGenerator();

  function restart() {
    cards = deck.slice();
    return actions;
  }

  function start(gameActions$: Observable<Action>) {
    shuffle();
    const allActions$ = gameActions$.pipe(filter((action) => action.to === EntitiesId.All));
    const myActions$ = gameActions$.pipe(filter((action) => action.to === id));

    allActions$.pipe(filter((action) => action.payload.action === ActionsPayloadType.Start)).subscribe(initialDraw);
    myActions$.pipe(filter((action) => action.payload?.action === ActionsPayloadType.Draw));
  }

  function initialDraw(action: Action<ActionPayloadStart>) {
    const payload = action.payload;
    const cardsByPlayer: { [e: string]: Card[] } = {};
    Array.from({ length: initialCardsByPlayer }).forEach(() => {
      payload.players.forEach((playerId) => {
        if (!cardsByPlayer[playerId]) {
          cardsByPlayer[playerId] = [];
        }
        cardsByPlayer[playerId] = cardsByPlayer[playerId].concat(actions.card());
      });
    });
    Object.keys(cardsByPlayer).forEach((key) => {
      fireAction({
        from: id,
        to: key,
        payload: {
          action: ActionsPayloadType.Draw,
          cards: cardsByPlayer[key],
        },
      });
    });
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
