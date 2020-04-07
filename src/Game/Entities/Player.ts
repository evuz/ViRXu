import { Observable, ReplaySubject, zip, of } from 'rxjs';
import { filter, switchMap, take, pluck } from 'rxjs/operators';

import { Card } from './Card';
import { createSubject } from '../../Utils/createSubject';
import { actionableGenerator, Action } from './Action';
import { EntitiesId } from '../Enums/EntitiesId';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { ActionPayloadDraw, ActionPayloadPlay } from './ActionPayload';

export type PlayerItem = {
  id: string;
  name: string;
};

export type Player = ReturnType<typeof playerGenerator>;

export function playerGenerator({ id, name }: PlayerItem) {
  let hand: Card[] = [];

  const [handSubject, hand$] = createSubject<Card[]>(() => new ReplaySubject<Card[]>(1));
  const [readySubject, ready$] = createSubject<boolean>();
  const [action$, fireAction] = actionableGenerator(id);

  // TODO: make hand$ with scan operator
  function addCardsHand(cards: Card[]) {
    hand = hand.concat(cards);
    handSubject.next(hand);
    return actions;
  }

  // TODO: make hand$ with scan operator
  function removeCardsHand(cards: Card[]) {
    hand = hand.filter((card) => cards.indexOf(card) === -1);
    handSubject.next(hand);
    return actions;
  }

  function ready(isReady = true) {
    readySubject.next(isReady);
    return actions;
  }

  function start(gameActions$: Observable<Action>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const allActions$ = gameActions$.pipe(filter((action) => action.to === EntitiesId.All));
    const myActions$ = gameActions$.pipe(filter((action) => action.to === id));
    const playConfirm$ = gameActions$.pipe(
      filter((action) => action.to === EntitiesId.Game && action.from === id),
      filter(({ payload }) => payload.action === ActionsPayloadType.Play),
      switchMap((action) => zip(gameActions$, of(action)).pipe(take(1))),
      filter(([{ payload }]) => payload.action === ActionsPayloadType.CurrentPlayer),
      pluck('1'),
    );

    myActions$.pipe(filter((action) => action.payload.action === ActionsPayloadType.Draw)).subscribe((action) => {
      const payload = <ActionPayloadDraw>action.payload;
      if (!payload.cards) {
        return;
      }
      addCardsHand(payload.cards);
    });

    playConfirm$.subscribe((action) => {
      const payload = <ActionPayloadPlay>action.payload;
      removeCardsHand(payload.cards);
      fireAction(EntitiesId.Dealer, { action: ActionsPayloadType.Draw, cards: payload.cards });
    });
  }

  function discard(cards: Card[]) {
    removeCardsHand(cards);
    fireAction(EntitiesId.Game, { action: ActionsPayloadType.Discard, cards });
    return actions;
  }

  function play(cards: Card[]) {
    // TODO: remove cards when game say ok
    fireAction(EntitiesId.Game, { action: ActionsPayloadType.Play, cards });
    return actions;
  }

  const actions = {
    hand$,
    ready$,
    action$,
    ready,
    start,
    play,
    discard,
    getId: () => id,
    getName: () => name,
  };

  return actions;
}
