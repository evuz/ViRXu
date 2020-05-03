import { SocketAdapter } from '../Adapters/Socket/socket.adapter';
import { Room } from './Entities/Room';

export function getRoom(socket: SocketAdapter) {
  const actions = {
    execute(roomId): Promise<Room> {
      return socket.once<Room>(`rooms/${roomId}`).then((room) => {
        if (room.state === undefined) {
          throw Error(`Room ${roomId} doesn't exist`);
        }

        return room;
      });
    },
  };
  return actions;
}
