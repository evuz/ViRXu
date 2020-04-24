import * as app from 'firebase/app';
import { take } from 'rxjs/operators';
import { objectVal } from 'rxfire/database';
import 'firebase/database';

import { SocketAdapter } from './socket.adapter';

export function firebaseSocket(config): SocketAdapter {
  const firebase = app.initializeApp({
    apiKey: config.apiKey,
    databaseURL: config.databaseURL,
  });
  const database = firebase.database();

  function emit<T>(...args): Promise<T> {
    const entity: string = args[0];
    let element: string = args[1];
    let value: any = args[2];

    if (!value) {
      element = null;
      value = args[1];
    }

    const ref = getRef(entity, element);

    return ref.set(value).then(() => Object.assign({}, value, { id: ref.key }));
  }

  function on(element: string): any {
    const ref = database.ref(element);
    return objectVal(ref, 'id');
  }

  function once(element: string): any {
    return new Promise((resolve, reject) => {
      on(element)
        .pipe(take(1))
        .subscribe({
          next(value) {
            resolve(value);
          },
          error(err) {
            reject(err);
          },
        });
    });
  }

  function getRef(entity: string, element: string) {
    if (!element) {
      return database.ref(entity).push();
    }
    return database.ref(`${entity}/${element}`);
  }

  return {
    on,
    once,
    emit,
  };
}
