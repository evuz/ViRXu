import { createSubject } from '../../../Utils/createSubject';
import { Action } from '../../../Game/Entities/Action';
import { ActionsManagerAdapter } from './actionsManager.adapter';
import { uid } from '../../../Utils/uid';

export function offlineActionManager(): ActionsManagerAdapter {
  const [actionSubject, actions$] = createSubject<Action>();

  function fireAction(action: Action) {
    action = Object.assign({}, action, { id: uid(12) });
    actionSubject.next(action);
  }

  return {
    actions$,
    fireAction,
  };
}
