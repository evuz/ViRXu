import { virusGenerator } from './Game/Virus/game';
import { playerGenerator } from './Game/Entities/Player';

console.log('Use window.virus to see the game');
const game = virusGenerator();
const players = [
  playerGenerator({ id: '1', name: 'Player 1' }),
  playerGenerator({ id: '2', name: 'Player 2' }),
  playerGenerator({ id: '3', name: 'Player 3' }),
  playerGenerator({ id: '4', name: 'Player 4' }),
];

(<any>window).virus = {
  game: game,
  player1: players[0],
  player2: players[1],
  player3: players[2],
  player4: players[3],
};

players.forEach((player) => game.addPlayer(player));
