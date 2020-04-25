import { ActionsManagerAdapter } from '../Adapters/ActionsManager/actionsManager.adapter';
import { actionableGenerator } from '../../Utils/actionable';
import { Action } from '../../Game/Entities/Action';

export function createActionableService(actionsManager: ActionsManagerAdapter) {
  function execute(from: Action['from']) {
    return actionableGenerator(actionsManager, from);
  }
  return { execute };
}
