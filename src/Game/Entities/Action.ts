import { Player } from './Player';
import { ActionPayload } from './ActionPayload';
import { EntitiesId } from '../Enums/EntitiesId';

export type Action<T = ActionPayload> = {
  to: Player['id'] | EntitiesId;
  from: Player['id'] | EntitiesId;
  payload: T;
  id: string;
};
