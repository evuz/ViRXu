import { BehaviorSubject } from 'rxjs';

import { Card } from './Card';
import { createSubject } from '../../Utils/createSubject';

export type PlayerItem = {
  id: string;
  name: string;
};

export type Player = ReturnType<typeof playerGenerator>;

export function playerGenerator({ id, name }: PlayerItem) {
  const [boardSubject, board$] = createSubject<Card[][], BehaviorSubject<Card[][]>>(
    () => new BehaviorSubject<Card[][]>([]),
  );
  const [readySubject, ready$] = createSubject<boolean>();
  let hand: Card[] = [];

  function addCardsHand(cards: []) {
    hand = hand.concat(cards);
    return actions;
  }

  function addCardsBoard(cards: []) {
    const board = (<BehaviorSubject<Card[][]>>boardSubject).getValue();
    boardSubject.next(board.concat(cards));
    return actions;
  }

  function ready(isReady = true) {
    readySubject.next(isReady);
    return actions;
  }

  const actions = {
    board$,
    ready$,
    ready,
    addCardsHand,
    addCardsBoard,
    getId: () => id,
    getName: () => name,
    getHand: () => hand.slice(),
    getBoard: () => boardSubject.getValue(),
  };

  return actions;
}
