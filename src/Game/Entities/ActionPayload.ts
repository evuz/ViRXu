import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { Card } from './Card';
import { Player } from './Player';

export type ActionPayload = ActionPayloadDraw | ActionPayloadStart | ActionPayloadCurrentPlayer;

export type ActionPayloadStart = {
  action: ActionsPayloadType.Start;
  players: Player[];
};

export type ActionPayloadCurrentPlayer = {
  action: ActionsPayloadType.CurrentPlayer;
  player: Player;
};

export type ActionPayloadDraw = ActionPayloadDrawPlayer | ActionPayloadDrawDealer;

type ActionPayloadDrawPlayer = {
  action: ActionsPayloadType.Draw;
  quantity: number;
};

type ActionPayloadDrawDealer = {
  action: ActionsPayloadType.Draw;
  cards: Card[];
};
