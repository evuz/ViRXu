import { Player } from './Player';
import { ActionPayload } from './ActionPayload';
import { EntitiesId } from '../Enums/EntitiesId';

export type Action<T = ActionPayload> = {
  to: ReturnType<Player['getId']> | EntitiesId;
  from: ReturnType<Player['getId']> | EntitiesId;
  payload: T;
};
