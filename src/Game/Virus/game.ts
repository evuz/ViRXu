import { scan, filter, tap } from 'rxjs/operators';

import { virusDeck } from './deck';
import { Player } from '../Entities/Player';
import { createSubject } from '../../Utils/createSubject';
import { dealerGenerator, Dealer } from '../Entities/Dealer';
import { random } from '../../Utils/random';

export type VirusGame = ReturnType<typeof generateVirusGame>;

export function generateVirusGame(numberOfPlayers = 4) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let dealer: Dealer;
  let players = [];
  const deck = virusDeck;
  const [playerSubject, player$] = createSubject<Player>();
  const [currentPlayerSubject, currentPlayer$] = createSubject<Player>();
  const start$ = player$.pipe(
    tap((player) => (players = players.concat([player]))),
    scan((acc) => acc + 1, 0),
    filter((players) => players >= numberOfPlayers),
  );

  start$.subscribe(() => {
    dealer = dealerGenerator(deck);
    currentPlayerSubject.next(players[random(players.length - 1)]);
  });

  function addPlayer(player: Player) {
    playerSubject.next(player);
  }

  const actions = {
    addPlayer,
    currentPlayer$,
  };

  return actions;
}
