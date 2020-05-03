import { firebaseSocket } from './Adapters/Socket/firebase.socket';
import { createRoom } from './Room/createRoom.service';
import { createDomain } from './domain.service';
import { getRoom } from './Room/getRoom';
import { createActionable as createActionableAdapter } from './Adapters/CreateActionable/createActionable.adapter';
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
  const createActionable = createActionableAdapter(actionsManager);

  const useCases = {
    enterRoom: createUseCase(actionsSrv.enterRoom),
    getRoom: getRoom(socket),
    createRoom: createRoom(socket),
  };

  const adapters = {
    socket,
    actionsManager,
    createActionable,
  };

  return createDomain({ useCases, config, adapters });
}
