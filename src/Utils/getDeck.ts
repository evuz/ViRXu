import { Game } from '../Game/Games';
import { deckGenerator } from '../Game/Entities/Deck';
import { virusDeck } from '../Game/Virus/deck';

export function getDeck(game: Game) {
  switch (game) {
    case Game.Virus:
      return deckGenerator(virusDeck);
    default:
      throw Error('Game not supported');
  }
}
