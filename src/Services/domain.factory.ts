import { firebaseSocket } from './Adapters/Socket/firebase.socket';
import { createRoom } from './Room/createRoom.service';
import { createDomain } from './domain.service';
import { listenActions } from './Room/listenActions.service';
import { getRoom } from './Room/getRoom';

export function domainFactory() {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE,
  };

  const socket = firebaseSocket(config);

  const useCases = {
    getRoom: getRoom(socket),
    createRoom: createRoom(socket),
    listenActions: listenActions(socket),
  };

  return createDomain(useCases, config);
}
