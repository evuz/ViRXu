import { ActionsPayloadType } from '../Enums/ActionsPayloadType';
import { Card } from './Card';
import { Player } from './Player';

export type ActionPayload = ActionPayloadDraw | ActionPayloadStart | ActionPayloadCurrentPlayer;

export type ActionPayloadStart = {
  action: ActionsPayloadType.Start;
  players: Array<ReturnType<Player['getId']>>;
};

export type ActionPayloadCurrentPlayer = {
  action: ActionsPayloadType.CurrentPlayer;
  player: ReturnType<Player['getId']>;
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
