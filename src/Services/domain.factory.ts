import { firebaseSocket } from './Adapters/Socket/firebase.socket';
import { createRoom } from './Room/createRoom.service';
import { createDomain } from './domain.service';
import { getRoom } from './Room/getRoom';
import { createActionable as createActionableAdapter } from './Adapters/CreateActionable/createActionable.adapter';
import { actionsManager as actionsManagerAdapter } from './Adapters/ActionsManager';
import { actionsService } from './Actions/actions.service';
import { createUseCase } from '../Utils/createUseCase';
import { firebaseAdapter } from './Adapters/Firebase/firebase.adapter';
import { firebaseAuth } from './Adapters/Auth/firebase.auth';
import { authService } from './Auth/auth.service';

export function domainFactory() {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  };

  const firebase = firebaseAdapter(config);

  const auth = firebaseAuth(firebase);
  const socket = firebaseSocket(firebase);
  const actionsSrv = actionsService(socket);
  const actionsManager = actionsManagerAdapter(actionsSrv);
  const createActionable = createActionableAdapter(actionsManager);
  const authSrv = authService(auth);

  const useCases = {
    signIn: createUseCase(authSrv.signIn),
    signOut: createUseCase(authSrv.signOut),
    user: createUseCase(authSrv.user),
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
