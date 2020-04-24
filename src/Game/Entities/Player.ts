import { ReplaySubject, zip, of } from 'rxjs';
import { filter, switchMap, take, pluck } from 'rxjs/operators';

import { Card } from './Card';
import { createSubject } from '../../Utils/createSubject';
import { EntitiesId } from '../Enums/EntitiesId';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { ActionPayloadDraw, ActionPayloadPlay } from './ActionPayload';
import { actionableGenerator } from '../../Utils/actionable';

export type PlayerItem = {
  id: string;
  name: string;
};

export type Player = ReturnType<typeof playerGenerator>;

export function playerGenerator({ id, name }: PlayerItem) {
  let hand: Card[] = [];

  const [handSubject, hand$] = createSubject<Card[]>(() => new ReplaySubject<Card[]>(1));
  const [readySubject, ready$] = createSubject<boolean>();
  const [actions$, fireAction] = actionableGenerator(id);

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

  function start() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const allActions$ = actions$.pipe(filter((action) => action.to === EntitiesId.All));
    const myActions$ = actions$.pipe(filter((action) => action.to === id));
    const playConfirm$ = actions$.pipe(
      filter((action) => action.to === EntitiesId.Game && action.from === id),
      filter(({ payload }) => payload.action === ActionsPayloadType.Play),
      switchMap((action) => zip(actions$, of(action)).pipe(take(1))),
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

  function play(card: Card, requirements?: Card[]) {
    fireAction(EntitiesId.Game, { action: ActionsPayloadType.Play, cards: [card], requirements });
    return actions;
  }

  const actions = {
    hand$,
    ready$,
    ready,
    play,
    discard,
    getId: () => id,
    getName: () => name,
  };

  start();

  return actions;
}
