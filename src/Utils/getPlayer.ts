import { Board } from '../Game/Entities/Board';

export function getPlayer(id: string, board: Board) {
  const players = Array.from(board.keys());
  return players.filter((playerId) => playerId === id)[0];
}
