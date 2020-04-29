import { map, share } from 'rxjs/operators';

import { ActionService } from '../../Actions/actions.service';
import { ActionsManagerAdapter } from './actionsManager.adapter';
import { Action } from '../../../Game/Entities/Action';
import { virusCardTranslate } from '../CardTranslate/virus.cardTranslate';
import { searchCard } from '../../../Utils/searchCard';

export function onlineActionManager(actionsService: ActionService): ActionsManagerAdapter {
  const translate = virusCardTranslate();
  const actions$ = actionsService.observe().pipe(
    map((action) => searchCard(action, translate.decode)),
    share(),
  );

  function fireAction(action: Action) {
    actionsService.emit(searchCard(action, translate.transcode));
  }

  return {
    actions$,
    fireAction,
  };
}
