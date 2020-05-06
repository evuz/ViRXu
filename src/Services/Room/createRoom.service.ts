import { SocketAdapter } from '../Adapters/Socket/socket.adapter';
import { Room, RoomState } from './Entities/Room';

export function createRoom(socket: SocketAdapter) {
  const actions = {
    execute({ name }): Promise<Room> {
      return socket.emit('rooms', { name, state: RoomState.Open });
    },
  };
  return actions;
}
