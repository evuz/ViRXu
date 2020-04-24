import { Observable } from 'rxjs';
import { Action } from '../../../Game/Entities/Action';

export type ActionsManagerAdapter = {
  actions$: Observable<Action>;
  fireAction(action: Action): void;
};
