import { Action } from '../Game/Entities/Action';
import { ActionPayload } from '../Game/Entities/ActionPayload';
import { actionsManager } from '../Services/Adapters/ActionsManager';

export type Actionable = ReturnType<typeof actionableGenerator>;

export function actionableGenerator(from: Action['from']) {
  function fireAction(to: Action['to'], payload: ActionPayload) {
    actionsManager.fireAction({
      to,
      from,
      payload,
    });
  }
  return [actionsManager.actions$, fireAction] as const;
}
