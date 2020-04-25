import { firebaseSocket } from './Adapters/Socket/firebase.socket';
import { createRoom } from './Room/createRoom.service';
import { createDomain } from './domain.service';
import { listenActions } from './Room/listenActions.service';
import { getRoom } from './Room/getRoom';
import { createActionableService } from './Actions/createActionable.service';
import { offlineActionManager } from './Adapters/ActionsManager/offline.actionManager';

export function domainFactory() {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE,
  };

  const socket = firebaseSocket(config);
  const actionsManager = offlineActionManager();

  const useCases = {
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
