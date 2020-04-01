import { Observable, merge } from 'rxjs';
import { scan, filter, tap } from 'rxjs/operators';

import { virusDeck } from './deck';
import { Player } from '../Entities/Player';
import { createSubject } from '../../Utils/createSubject';
import { dealerGenerator, Dealer } from '../Entities/Dealer';
import { random } from '../../Utils/random';
import { actionableGenerator, Action } from '../Entities/Action';

export type VirusGame = ReturnType<typeof virusGenerator>;

export function virusGenerator(numberOfPlayers = 4) {
  let dealer: Dealer;
  let players: Player[] = [];
  let gameActions$: Observable<Action>;

  const deck = virusDeck;
  const [playerSubject, player$] = createSubject<Player>();
  const [action$, fireAction] = actionableGenerator();
  const start$ = player$.pipe(
    tap((player) => (players = players.concat([player]))),
    scan((acc) => acc + 1, 0),
    filter((players) => players >= numberOfPlayers),
  );

  start$.subscribe(() => {
    dealer = dealerGenerator(deck);
    const playerActions = players.map((player) => player.action$);
    gameActions$ = merge(...playerActions.concat([dealer.action$, action$]));
    players.forEach((player) => player.start(gameActions$));
    dealer.start(gameActions$);
    startGame();
    fireAction({ type: 'Start game!' });
    fireAction({ type: 'Current user', payload: players[random(players.length - 1)].getId() });
  });

  function startGame() {
    if (!gameActions$) {
      throw Error('Users are not ready!');
    }
    gameActions$.subscribe((action) => {
      console.log('Game ->', action);
    });
  }

  function addPlayer(player: Player) {
    playerSubject.next(player);
    return actions;
  }

  const actions = {
    addPlayer,
  };

  return actions;
}
