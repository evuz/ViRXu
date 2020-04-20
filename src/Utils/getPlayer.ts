import { Board } from '../Game/Entities/Board';

export function getPlayer(id: string, board: Board) {
  const players = Array.from(board.keys());
  return players.filter((p) => p.getId() === id)[0];
}
