import { Action } from '../Game/Entities/Action';
import { ActionPayload } from '../Game/Entities/ActionPayload';
import { ActionsManagerAdapter } from '../Services/Adapters/ActionsManager/actionsManager.adapter';

export type Actionable = ReturnType<typeof actionableGenerator>;

export function actionableGenerator(manager: ActionsManagerAdapter, from: Action['from']) {
  function fireAction(to: Action['to'], payload: ActionPayload) {
    manager.fireAction({
      to,
      from,
      payload,
    });
  }
  return [manager.actions$, fireAction] as const;
}
