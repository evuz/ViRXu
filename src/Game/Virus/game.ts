import { Observable, merge } from 'rxjs';
import { scan, filter, tap } from 'rxjs/operators';

import { virusDeck } from './deck';
import { Player } from '../Entities/Player';
import { createSubject } from '../../Utils/createSubject';
import { dealerGenerator, Dealer } from '../Entities/Dealer';
import { actionableGenerator, Action } from '../Entities/Action';
import { EntitiesId } from '../Enums/EntitiesId';
import { ActionsPayloadType } from '../Enums/ActionsPayloadType';

export type VirusGame = ReturnType<typeof virusGenerator>;

export function virusGenerator(numberOfPlayers = 4) {
  let dealer: Dealer;
  let players: Player[] = [];
  let gameActions$: Observable<Action>;

  const id = EntitiesId.Game;
  const deck = virusDeck;
  const [playerSubject, player$] = createSubject<Player>();
  const [startSubject, start$] = createSubject<typeof gameActions$>();
  const [action$, fireAction] = actionableGenerator(id);
  const ready$ = player$.pipe(
    tap((player) => (players = players.concat([player]))),
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
      players: players.map((player) => player.getId()),
    });
  });

  function deliverGameActions() {
    startSubject.next(gameActions$);
    players.forEach((player) => player.start(gameActions$));
    dealer.start(gameActions$);
  }

  function startListeners() {
    if (!gameActions$) {
      throw Error('Users are not ready!');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const allActions$ = gameActions$.pipe(filter((action) => action.to === EntitiesId.All));
    const myActions$ = gameActions$.pipe(filter((action) => action.to === id));
    myActions$.subscribe((action) => {
      console.log('Game ->', action);
    });
  }

  function addPlayer(player: Player) {
    playerSubject.next(player);
    return actions;
  }

  const actions = {
    start$,
    addPlayer,
  };

  return actions;
}
