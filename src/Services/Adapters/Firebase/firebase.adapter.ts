import * as app from 'firebase/app';

export function firebaseAdapter(config) {
  const firebase = app.initializeApp({
    apiKey: config.apiKey,
    databaseURL: config.databaseURL,
    authDomain: config.authDomain,
  });

  return firebase;
}
