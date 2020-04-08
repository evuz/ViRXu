import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { Card } from './Card';
import { Player } from './Player';

export type ActionPayload =
  | ActionPayloadDraw
  | ActionPayloadStart
  | ActionPayloadCurrentPlayer
  | ActionPayloadDiscard
  | ActionPayloadPlay
  | ActionPayloadError;

export type ActionPayloadStart = {
  action: ActionsPayloadType.Start;
  players: Player[];
};

export type ActionPayloadCurrentPlayer = {
  action: ActionsPayloadType.CurrentPlayer;
  player: Player;
};

export type ActionPayloadDraw = {
  action: ActionsPayloadType.Draw;
  cards: Card[];
};

export type ActionPayloadDiscard = {
  action: ActionsPayloadType.Discard;
  cards: Card[];
};

export type ActionPayloadError = {
  action: ActionsPayloadType.Error;
  message: string;
};

export type ActionPayloadPlay = {
  action: ActionsPayloadType.Play;
  cards: Card[];
  requirements?: Card[];
};
