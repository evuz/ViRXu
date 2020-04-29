import { firebaseSocket } from './Adapters/Socket/firebase.socket';
import { createRoom } from './Room/createRoom.service';
import { createDomain } from './domain.service';
import { listenActions } from './Room/listenActions.service';
import { getRoom } from './Room/getRoom';
import { createActionableService } from './Actions/createActionable.service';
import { actionsManager as actionsManagerAdapter } from './Adapters/ActionsManager';
import { actionsService } from './Actions/actions.service';
import { createUseCase } from '../Utils/createUseCase';

export function domainFactory() {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE,
  };

  const socket = firebaseSocket(config);
  const actionsSrv = actionsService(socket);
  const actionsManager = actionsManagerAdapter(actionsSrv);

  const useCases = {
    enterRoom: createUseCase(actionsSrv.enterRoom),
    createActionable: createActionableService(actionsManager),
    getRoom: getRoom(socket),
    createRoom: createRoom(socket),
    listenActions: listenActions(socket),
  };

  const adapters = {
    socket,
    actionsManager,
  };

  return createDomain({ useCases, config, adapters });
}
