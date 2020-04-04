import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Card } from './Card';
import { createSubject } from '../../Utils/createSubject';
import { actionableGenerator, Action } from './Action';
import { EntitiesId } from '../Enums/EntitiesId';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { ActionPayloadDrawDealer } from './ActionPayload';

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

  function addCardsHand(cards: Card[]) {
    // TODO: make hand$ with scan operator
    hand = hand.concat(cards);
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

    myActions$.pipe(filter((action) => action.payload.action === ActionsPayloadType.Draw)).subscribe((action) => {
      console.log(`Player ${name} ->`, action);
      const payload = <ActionPayloadDrawDealer>action.payload;
      if (!payload.cards) {
        return;
      }
      addCardsHand(payload.cards);
    });
  }

  const actions = {
    hand$,
    ready$,
    action$,
    ready,
    start,
    fireAction,
    getId: () => id,
    getName: () => name,
  };

  return actions;
}
