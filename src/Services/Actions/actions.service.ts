import { SocketAdapter } from '../Adapters/Socket/socket.adapter';
import { Observable, ReplaySubject, never, from } from 'rxjs';

import { Action } from '../../Game/Entities/Action';
import { createSubject } from '../../Utils/createSubject';
import { switchMap, takeUntil, scan, pluck, share } from 'rxjs/operators';

export type ActionService = ReturnType<typeof actionsService>;

export function actionsService(socket: SocketAdapter) {
  let _roomId: string = null;
  const [stopSubject, stop$] = createSubject<void>();
  const [roomSubject, room$] = createSubject<Observable<Action | Action[]>>(() => new ReplaySubject(1));

  function observe(): Observable<Action> {
    return room$.pipe(
      switchMap((actions$) => actions$.pipe(takeUntil(stop$))),
      share(),
      scan(
        ({ count }, actions) => {
          if (!Array.isArray(actions)) {
            return { values: [actions], count };
          }
          const length = actions.length;
          actions = actions.slice(count, length);
          count = length;
          return { values: actions, count };
        },
        <{ count: number; values: Action[] }>{ count: 0, values: null },
      ),
      pluck('values'),
      switchMap((actions: Action[]) => {
        return from(actions);
      }),
    );
  }

  function emit(action: Action) {
    if (!_roomId) {
      throw Error(`You're not in a room yet`);
    }
    return socket.emit(`actions/${_roomId}`, action);
  }

  function enterRoom(roomId: string) {
    _roomId = roomId;
    stopSubject.next();
    if (!_roomId) {
      roomSubject.next(never());
      return;
    }
    roomSubject.next(socket.on(`actions/${_roomId}`, { list: true }));
  }

  return {
    observe,
    emit,
    enterRoom,
  };
}
