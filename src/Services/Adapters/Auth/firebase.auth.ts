import * as app from 'firebase/app';
import { authState } from 'rxfire/auth';
import 'firebase/auth';

import { AuthAdapter } from './auth.adapter';
import { map } from 'rxjs/operators';
import { User } from '../../Auth/Entities/User';

export type Provider = 'google';

export function getProvider(provider: Provider) {
  switch (provider) {
    case 'google':
      return new app.auth.GoogleAuthProvider();
    default:
      throw Error(`${provider} is not an available provider`);
  }
}

function userMapper(user: app.User): User {
  if (!user) {
    return null;
  }

  return {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
  };
}

export function firebaseAuth(firebase: app.app.App): AuthAdapter {
  // TODO: search another solution to avoid test error
  let auth: app.auth.Auth;
  if (process.env.NODE_ENV !== 'test') {
    auth = firebase.auth();
  }

  const user$ = authState(auth).pipe(map(userMapper));

  function signIn({ provider }: { provider: Provider }) {
    return auth.signInWithPopup(getProvider(provider)).then((userCredential) => {
      return userMapper(userCredential?.user);
    });
  }

  function signOut() {
    return auth.signOut();
  }

  return {
    signIn,
    signOut,
    user$,
  };
}
