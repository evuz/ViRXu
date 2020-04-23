import { firebaseSocket } from './Adapters/Socket/firebase.socket';
import { createRoom } from './Room/createRoom.service';
import { createDomain } from './domain.service';

export function domainFactory() {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    databaseURL: process.env.FIREBASE_DATABASE,
  };

  const socket = firebaseSocket(config);

  const useCases = {
    createRoom: createRoom(socket),
  };

  return createDomain(useCases, config);
}
