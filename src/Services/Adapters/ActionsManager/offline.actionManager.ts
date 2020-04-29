import { createSubject } from '../../../Utils/createSubject';
import { Action } from '../../../Game/Entities/Action';
import { ActionsManagerAdapter } from './actionsManager.adapter';

export function offlineActionManager(): ActionsManagerAdapter {
  const [actionSubject, actions$] = createSubject<Action>();

  function fireAction(action: Action) {
    actionSubject.next(action);
  }

  return {
    actions$,
    fireAction,
  };
}
