import { SocketAdapter } from '../Adapters/Socket/socket.adapter';

export function listenActions(socket: SocketAdapter) {
  const actions = {
    execute(roomId) {
      return socket.on(`actions/${roomId}`);
    },
  };
  return actions;
}
