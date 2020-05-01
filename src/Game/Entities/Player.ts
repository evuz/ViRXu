import { ReplaySubject, zip, of } from 'rxjs';
import { filter, switchMap, take, pluck } from 'rxjs/operators';

import { Card } from './Card';
import { createSubject } from '../../Utils/createSubject';
import { EntitiesId } from '../Enums/EntitiesId';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { ActionPayloadDraw, ActionPayloadPlay, ActionPayloadAssignDealer } from './ActionPayload';
import { uid } from '../../Utils/uid';
import { domain } from '../../Services/domain';
import { dealerGenerator } from './Dealer';
import { getDeck } from '../../Utils/getDeck';

export type IPlayer = {
  id: string;
  name: string;
};

export type Player = ReturnType<typeof playerGenerator>;

export type PlayerItem = {
  id?: IPlayer['id'];
  name: IPlayer['name'];
};

export function playerGenerator({ id = uid(6), name }: PlayerItem) {
  let hand: Card[] = [];

  const [handSubject, hand$] = createSubject<Card[]>(() => new ReplaySubject<Card[]>(1));
  const [actions$, fireAction] = domain.get('createActionable').execute(id);

  // TODO: make hand$ with scan operator
  function addCardsHand(cards: Card[]) {
    hand = hand.concat(cards);
    handSubject.next(hand);
    return actions;
  }

  // TODO: make hand$ with scan operator
  function removeCardsHand(cards: Card[]) {
    hand = hand.filter((card) => !cards.find((c) => c.id === card.id));
    handSubject.next(hand);
    return actions;
  }

  function ready() {
    fireAction(EntitiesId.Game, { action: ActionsPayloadType.NewPlayer, player: { id, name } });
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
      filter(([{ payload }]) => payload.action !== ActionsPayloadType.Error),
      pluck('1'),
    );

    myActions$
      .pipe(
        filter((action) => action.payload.action === ActionsPayloadType.AssignDealer),
        take(1),
      )
      .subscribe((action) => {
        const payload = <ActionPayloadAssignDealer>action.payload;
        dealerGenerator({ deck: getDeck(payload.game), players: payload.players });
      });

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

  function play(card: Card, requirements: Card[] = []) {
    fireAction(EntitiesId.Game, { action: ActionsPayloadType.Play, cards: [card], requirements });
    return actions;
  }

  const actions = {
    hand$,
    ready,
    play,
    discard,
    id,
    name,
  };

  start();

  return actions;
}
