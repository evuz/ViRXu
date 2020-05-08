import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { Card } from './Card';
import { IPlayer } from './Player';
import { Game } from '../Games';

export type ActionPayload =
  | ActionPayloadDraw
  | ActionPayloadStart
  | ActionPayloadNewPlayer
  | ActionPayloadCurrentPlayer
  | ActionPayloadDiscard
  | ActionPayloadPlay
  | ActionPayloadError
  | ActionPayloadStack
  | ActionPayloadAssignDealer
  | ActionPayloadWin;

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

export type ActionPayloadStack = {
  action: ActionsPayloadType.Stack;
  cards: Card[];
};

export type ActionPayloadAssignDealer = {
  action: ActionsPayloadType.AssignDealer;
  game: Game;
  players: IPlayer[];
};

export type ActionPayloadWin = {
  action: ActionsPayloadType.Win;
  winner: IPlayer;
};
