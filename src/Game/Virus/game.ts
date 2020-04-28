import { ReplaySubject } from 'rxjs';
import { scan, filter, tap } from 'rxjs/operators';

import { virusDeck } from './deck';
import { IPlayer } from '../Entities/Player';
import { createSubject } from '../../Utils/createSubject';
import { dealerGenerator, Dealer } from '../Entities/Dealer';
import { Action } from '../Entities/Action';
import { EntitiesId } from '../Enums/EntitiesId';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { random } from '../../Utils/random';
import { ActionPayloadCurrentPlayer, ActionPayloadPlay, ActionPayloadNewPlayer } from '../Entities/ActionPayload';
import { requirementsValidator } from '../Entities/Requirements/Validators';
import { Board } from '../Entities/Board';
import { domain } from '../../Services/domain';
import { deckGenerator } from '../Entities/Deck';

export type VirusGame = ReturnType<typeof virusGenerator>;

export function virusGenerator(numberOfPlayers = 4) {
  let dealer: Dealer;
  let players: IPlayer[] = [];
  let currentPlayer: IPlayer = null;
  let board: Board = new Map();

  const id = EntitiesId.Game;
  const deck = deckGenerator(virusDeck);
  const [boardSubject, board$] = createSubject<Board>(() => new ReplaySubject(1));
  const [playerSubject, player$] = createSubject<IPlayer>();
  const [startSubject, start$] = createSubject<typeof gameActions$>();
  const [gameActions$, fireAction] = domain.get('createActionable').execute(id);

  const ready$ = player$.pipe(
    tap((player) => {
      players = players.concat([player]);
      board.set(player.id, []);
    }),
    scan((acc) => acc + 1, 0),
    filter((players) => players >= numberOfPlayers),
  );

  ready$.subscribe(() => {
    dealer = dealerGenerator(deck);

    deliverGameActions();
    startListeners();
    fireAction(EntitiesId.All, {
      action: ActionsPayloadType.Start,
      players: players,
    });
  });

  const newPlayer$ = gameActions$.pipe(
    filter((action) => action.to === id),
    filter(({ payload }) => payload.action === ActionsPayloadType.NewPlayer),
  );

  newPlayer$.subscribe((action) => {
    const payload = <ActionPayloadNewPlayer>action.payload;
    playerSubject.next(payload.player);
  });

  function deliverGameActions() {
    startSubject.next(gameActions$);
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

    myActions$
      .pipe(filter(({ payload }) => payload.action === ActionsPayloadType.Play))
      .subscribe((action: Action<ActionPayloadPlay>) => {
        const payload = action.payload;

        if (payload.cards.length !== 1) {
          throw Error('Can only play one card at a time');
        }

        const card = payload.cards[0];
        const errors = requirementsValidator(action, board);

        if (errors) {
          return fireAction(action.from, {
            action: ActionsPayloadType.Error,
            errors,
          });
        }

        if (card.action) {
          const { board: b, discard } = card.action(action, board);
          board = new Map(b.entries());
          boardSubject.next(board);
          dealer.toStack(discard);
        }

        fireAction(EntitiesId.All, {
          action: ActionsPayloadType.CurrentPlayer,
          player: nextPlayer(),
        });
      });
  }

  function nextPlayer() {
    const currentIndex = players.findIndex((player) => player.id === currentPlayer.id);
    const newIndex = players[currentIndex + 1] ? currentIndex + 1 : 0;
    return players[newIndex];
  }

  const actions = {
    start$,
    board$,
  };

  return actions;
}
