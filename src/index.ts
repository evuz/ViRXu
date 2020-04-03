import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './App/App';

ReactDOM.render(React.createElement(App), document.getElementById('app'));

// import { virusGenerator } from './Game/Virus/game';
// import { playerGenerator } from './Game/Entities/Player';
// import { switchMap } from 'rxjs/operators';

// console.log('Use window.virus to see the game');
// const game = virusGenerator();
// const players = [
//   playerGenerator({ id: '1', name: 'Player 1' }),
//   playerGenerator({ id: '2', name: 'Player 2' }),
//   playerGenerator({ id: '3', name: 'Player 3' }),
//   playerGenerator({ id: '4', name: 'Player 4' }),
// ];

// (<any>window).virus = {
//   game: game,
//   player1: players[0],
//   player2: players[1],
//   player3: players[2],
//   player4: players[3],
// };

// game.start$.pipe(switchMap((actions$) => actions$)).subscribe((action) => {
//   console.log('actions$ ->', action);
// });

// players[0].hand$.subscribe((c) => console.log('Cards', c));

// players.forEach((player) => game.addPlayer(player));
