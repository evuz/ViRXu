import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Card } from './Card';
import { createSubject } from '../../Utils/createSubject';
import { actionableGenerator, Action } from './Action';
import { EntitiesId } from '../Enums/EntitiesId';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';

export type PlayerItem = {
  id: string;
  name: string;
};

export type Player = ReturnType<typeof playerGenerator>;

export function playerGenerator({ id, name }: PlayerItem) {
  let hand: Card[] = [];

  const [readySubject, ready$] = createSubject<boolean>();
  const [action$, fireAction] = actionableGenerator();

  function addCardsHand(cards: []) {
    hand = hand.concat(cards);
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

    myActions$
      .pipe(filter((action) => action.payload.action === ActionsPayloadType.Draw))
      .subscribe((action) => console.log(`Player ${name} ->`, action));
  }

  const actions = {
    ready$,
    action$,
    ready,
    start,
    fireAction,
    addCardsHand,
    getId: () => id,
    getName: () => name,
    getHand: () => hand.slice(),
  };

  return actions;
}
