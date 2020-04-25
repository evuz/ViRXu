import { filter } from 'rxjs/operators';

import { Deck } from './Deck';
import { Action } from './Action';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { EntitiesId } from '../Enums/EntitiesId';
import { ActionPayloadStart, ActionPayloadDiscard, ActionPayloadPlay } from './ActionPayload';
import { Card } from './Card';
import { domain } from '../../Services/domain';

export type Dealer = ReturnType<typeof dealerGenerator>;

export function dealerGenerator(deck: Deck) {
  let cards = deck.slice();
  let stack = [];

  const initialCardsByPlayer = 3;
  const id = EntitiesId.Dealer;
  const [actions$, fireAction] = domain.get('createActionable').execute(id);

  function restart() {
    cards = deck.slice();
    return actions;
  }

  function start() {
    const gameActions$ = actions$.pipe(filter((action) => action.to === EntitiesId.Game));
    const allActions$ = actions$.pipe(filter((action) => action.to === EntitiesId.All));
    const myActions$ = actions$.pipe(filter((action) => action.to === id));

    shuffle();

    gameActions$.pipe(filter(({ payload }) => payload.action === ActionsPayloadType.Discard)).subscribe((action) => {
      toStack((<ActionPayloadDiscard>action.payload).cards);
      actionDrawCards(action);
    });
    allActions$.pipe(filter((action) => action.payload.action === ActionsPayloadType.Start)).subscribe(initialDraw);
    myActions$.pipe(filter((action) => action.payload?.action === ActionsPayloadType.Draw)).subscribe(actionDrawCards);
  }

  function actionDrawCards(action: Action) {
    const payload = <ActionPayloadDiscard | ActionPayloadPlay>action.payload;
    fireAction(action.from, {
      action: ActionsPayloadType.Draw,
      cards: drawCards(payload.cards.length),
    });
  }

  function initialDraw(action: Action<ActionPayloadStart>) {
    const payload = action.payload;
    const cardsByPlayer: { [e: string]: Card[] } = {};
    Array.from({ length: initialCardsByPlayer }).forEach(() => {
      payload.players.forEach((player) => {
        const playerId = player.id;
        if (!cardsByPlayer[playerId]) {
          cardsByPlayer[playerId] = [];
        }
        cardsByPlayer[playerId] = cardsByPlayer[playerId].concat(drawCards());
      });
    });
    Object.keys(cardsByPlayer).forEach((key) => {
      fireAction(key, {
        action: ActionsPayloadType.Draw,
        cards: cardsByPlayer[key],
      });
    });
  }

  function shuffle(useStack = true) {
    if (useStack) {
      cards = cards.concat(stack);
      stack = [];
    }
    // Durstenfeld shuffle
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return actions;
  }

  function drawCards(n = 1) {
    if (n < 1) {
      throw Error('You have to draw at least one card');
    }
    if (cards.length < n) {
      shuffle();
    }
    return cards.splice(-n);
  }

  function toStack(cards: Card[] = []) {
    stack = stack.concat(cards);
  }

  const actions = {
    shuffle,
    restart,
    toStack,
  };

  start();
  return actions;
}
