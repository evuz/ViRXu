import { createSubject } from '../../Utils/createSubject';

export type Action = any;
export type Actionable = ReturnType<typeof actionableGenerator>;

export function actionableGenerator() {
  const [actionSubject, action$] = createSubject<Action>();

  function fireAction(action: Action) {
    actionSubject.next(action);
  }
  return [action$, fireAction] as const;
}
