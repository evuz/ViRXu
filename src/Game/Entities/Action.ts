import { Player } from './Player';
import { ActionPayload } from './ActionPayload';
import { createSubject } from '../../Utils/createSubject';
import { EntitiesId } from '../Enums/EntitiesId';

export type Action<T = ActionPayload> = {
  to: ReturnType<Player['getId']> | EntitiesId;
  from: ReturnType<Player['getId']> | EntitiesId;
  payload: T;
};
export type Actionable = ReturnType<typeof actionableGenerator>;

export function actionableGenerator() {
  const [actionSubject, action$] = createSubject<Action>();

  function fireAction(action: Action) {
    actionSubject.next(action);
  }
  return [action$, fireAction] as const;
}
