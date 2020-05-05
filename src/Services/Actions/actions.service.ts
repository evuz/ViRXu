import { SocketAdapter } from '../Adapters/Socket/socket.adapter';
import { Observable, ReplaySubject, never, from } from 'rxjs';

import { Action } from '../../Game/Entities/Action';
import { createSubject } from '../../Utils/createSubject';
import { switchMap, takeUntil, share, distinct } from 'rxjs/operators';

export type ActionService = ReturnType<typeof actionsService>;

export function actionsService(socket: SocketAdapter) {
  let _roomId: string = null;
  const [stopSubject, stop$] = createSubject<void>();
  const [roomSubject, room$] = createSubject<Observable<Action | Action[]>>(() => new ReplaySubject(1));

  function observe(): Observable<Action> {
    return room$.pipe(
      switchMap((actions$) => actions$.pipe(takeUntil(stop$))),
      switchMap((actions) => from(Array.isArray(actions) ? actions : [actions])),
      distinct((action) => action.id),
      share(),
    );
  }

  function emit(action: Action) {
    if (!_roomId) {
      throw Error(`You're not in a room yet`);
    }
    return socket.emit(`rooms/${_roomId}/actions`, action);
  }

  function enterRoom(roomId: string) {
    _roomId = roomId;
    stopSubject.next();
    if (!_roomId) {
      roomSubject.next(never());
      return Promise.resolve(roomId);
    }
    roomSubject.next(socket.on(`rooms/${_roomId}/actions`, { list: true }));
    return Promise.resolve(roomId);
  }

  return {
    observe,
    emit,
    enterRoom,
  };
}
