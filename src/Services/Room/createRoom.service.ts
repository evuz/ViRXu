import { SocketAdapter } from '../Adapters/Socket/socket.adapter';

export function createRoom(socket: SocketAdapter) {
  const actions = {
    execute({ name }) {
      return socket.emit('room', { name });
    },
  };
  return actions;
}
