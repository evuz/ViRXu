import { Observable, merge, ReplaySubject } from 'rxjs';
import { scan, filter, tap } from 'rxjs/operators';

import { virusDeck } from './deck';
import { Player } from '../Entities/Player';
import { createSubject } from '../../Utils/createSubject';
import { dealerGenerator, Dealer } from '../Entities/Dealer';
import { actionableGenerator, Action } from '../Entities/Action';
import { EntitiesId } from '../Enums/EntitiesId';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { random } from '../../Utils/random';
import { ActionPayloadCurrentPlayer, ActionPayloadPlay } from '../Entities/ActionPayload';
import { VirusCardType } from '../Enums/VirusCardType';
import { CardPlayed } from '../Entities/CardPlayed';

export type VirusGame = ReturnType<typeof virusGenerator>;

export function virusGenerator(numberOfPlayers = 4) {
  let dealer: Dealer;
  let players: Player[] = [];
  let currentPlayer: Player = null;
  let gameActions$: Observable<Action>;

  const id = EntitiesId.Game;
  const deck = virusDeck;
  const board = new Map<Player, CardPlayed[]>();
  const [boardSubject, board$] = createSubject<Map<Player, CardPlayed[]>>(() => new ReplaySubject(1));
  const [playerSubject, player$] = createSubject<Player>();
  const [startSubject, start$] = createSubject<typeof gameActions$>();
  const [action$, fireAction] = actionableGenerator(id);
  const ready$ = player$.pipe(
    tap((player) => {
      players = players.concat([player]);
      board.set(player, []);
    }),
    scan((acc) => acc + 1, 0),
    filter((players) => players >= numberOfPlayers),
  );

  ready$.subscribe(() => {
    const playerActions = players.map((player) => player.action$);

    dealer = dealerGenerator(deck);
    gameActions$ = merge(...playerActions.concat([dealer.action$, action$]));

    deliverGameActions();
    startListeners();
    fireAction(EntitiesId.All, {
      action: ActionsPayloadType.Start,
      players: players,
    });
  });

  function deliverGameActions() {
    startSubject.next(gameActions$);
    players.forEach((player) => player.start(gameActions$));
    dealer.start(gameActions$);
    boardSubject.next(board);
  }

  function startListeners() {
    if (!gameActions$) {
      throw Error('Users are not ready!');
    }

    const allActions$ = gameActions$.pipe(filter((action) => action.to === EntitiesId.All));
    const myActions$ = gameActions$.pipe(filter((action) => action.to === id));

    allActions$
      .pipe(filter((action) => action.payload.action === ActionsPayloadType.CurrentPlayer))
      .subscribe((action) => {
        const payload = <ActionPayloadCurrentPlayer>action.payload;
        currentPlayer = payload.player;
      });

    allActions$.pipe(filter((action) => action.payload.action === ActionsPayloadType.Start)).subscribe(() => {
      fireAction(EntitiesId.All, {
        action: ActionsPayloadType.CurrentPlayer,
        player: players[random(players.length - 1)],
      });
    });

    myActions$.pipe(filter(({ payload }) => payload.action === ActionsPayloadType.Discard)).subscribe(() => {
      fireAction(EntitiesId.All, {
        action: ActionsPayloadType.CurrentPlayer,
        player: nextPlayer(),
      });
    });

    myActions$.pipe(filter(({ payload }) => payload.action === ActionsPayloadType.Play)).subscribe((action) => {
      const payload = <ActionPayloadPlay>action.payload;
      const playerAction = players.find((player) => player.getId() === action.from);
      const boardPlayer = board.get(playerAction);

      if (payload.cards.find((card) => card.type !== VirusCardType.Organ)) {
        return;
      }

      board.set(
        playerAction,
        boardPlayer.concat([{ cards: payload.cards, state: CardPlayed.calculateState(payload.cards) }]),
      );
      boardSubject.next(board);

      fireAction(EntitiesId.All, {
        action: ActionsPayloadType.CurrentPlayer,
        player: nextPlayer(),
      });
    });
  }

  function addPlayer(player: Player) {
    playerSubject.next(player);
    return actions;
  }

  function nextPlayer() {
    const currentIndex = players.indexOf(currentPlayer);
    const newIndex = players[currentIndex + 1] ? currentIndex + 1 : 0;
    return players[newIndex];
  }

  const actions = {
    start$,
    board$,
    addPlayer,
  };

  return actions;
}
