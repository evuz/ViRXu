import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { Card } from './Card';
import { Game } from '../Games';
import { User } from '../../Services/Auth/Entities/User';

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
  players: User[];
};

export type ActionPayloadCurrentPlayer = {
  action: ActionsPayloadType.CurrentPlayer;
  player: User;
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
  player: User;
};

export type ActionPayloadStack = {
  action: ActionsPayloadType.Stack;
  cards: Card[];
};

export type ActionPayloadAssignDealer = {
  action: ActionsPayloadType.AssignDealer;
  game: Game;
  players: User[];
};

export type ActionPayloadWin = {
  action: ActionsPayloadType.Win;
  winner: User;
};
