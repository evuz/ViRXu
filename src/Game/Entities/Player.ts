import { Observable } from 'rxjs';

import { Card } from './Card';
import { createSubject } from '../../Utils/createSubject';
import { actionableGenerator, Action } from './Action';

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
    gameActions$.subscribe((action) => console.log(`Player ${name} ->`, action));
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
