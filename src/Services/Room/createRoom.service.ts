import { SocketAdapter } from '../Adapters/Socket/socket.adapter';

export function createRoom(socket: SocketAdapter) {
  const actions = {
    execute({ id }) {
      socket.emit('room', { id });
    },
  };
  return actions;
}
