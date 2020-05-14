import { map, filter } from 'rxjs/operators';

import { ActionService } from '../../Actions/actions.service';
import { ActionsManagerAdapter } from './actionsManager.adapter';
import { Action } from '../../../Game/Entities/Action';
import { virusCardTranslate } from '../CardTranslate/virus.cardTranslate';
import { searchCard } from '../../../Utils/searchCard';
import { AuthService } from '../../Auth/auth.service';
import { ActionsPayloadType } from '../../../Game/Enums/ActionsPayloadType';
import { ActionPayloadCurrentPlayer } from '../../../Game/Entities/ActionPayload';
import { EntitiesId } from '../../../Game/Enums/EntitiesId';
import { User } from '../../Auth/Entities/User';

type OnlineActionManagerArgs = {
  actionsService: ActionService;
  authService: AuthService;
};

function canFireAction(action: Action, user: User['id'], currentUser: User['id']) {
  if (!currentUser) {
    return true;
  }

  if (action.from !== EntitiesId.Game) {
    return true;
  }

  return currentUser === user;
}

export function onlineActionManager({ actionsService, authService }: OnlineActionManagerArgs): ActionsManagerAdapter {
  let currentPlayerId: User['id'];
  let userId: User['id'];

  const translate = virusCardTranslate();
  const actions$ = actionsService.observe().pipe(map((action) => searchCard(action, translate.decode)));

  authService.user().subscribe((user) => (userId = user?.id));
  actions$.pipe(filter(({ payload }) => payload.action === ActionsPayloadType.CurrentPlayer)).subscribe((action) => {
    const payload = <ActionPayloadCurrentPlayer>action.payload;
    currentPlayerId = payload.player.id;
  });

  function fireAction(action: Action) {
    if (!canFireAction(action, userId, currentPlayerId)) {
      return;
    }
    actionsService.emit(searchCard(action, translate.transcode));
  }

  return {
    actions$,
    fireAction,
  };
}
