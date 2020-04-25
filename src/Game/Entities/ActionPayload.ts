import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { Card } from './Card';
import { IPlayer } from './Player';

export type ActionPayload =
  | ActionPayloadDraw
  | ActionPayloadStart
  | ActionPayloadNewPlayer
  | ActionPayloadCurrentPlayer
  | ActionPayloadDiscard
  | ActionPayloadPlay
  | ActionPayloadError;

export type ActionPayloadStart = {
  action: ActionsPayloadType.Start;
  players: IPlayer[];
};

export type ActionPayloadCurrentPlayer = {
  action: ActionsPayloadType.CurrentPlayer;
  player: IPlayer;
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
  errors: Array<{ key: string; message: string }>;
};

export type ActionPayloadPlay = {
  action: ActionsPayloadType.Play;
  cards: Card[];
  requirements?: Card[];
};

export type ActionPayloadNewPlayer = {
  action: ActionsPayloadType.NewPlayer;
  player: IPlayer;
};
