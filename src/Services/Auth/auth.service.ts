import { AuthAdapter, Provider } from '../Adapters/Auth/auth.adapter';
import { share } from 'rxjs/operators';

export type AuthService = ReturnType<typeof authService>;

export function authService(authAdapter: AuthAdapter) {
  const user$ = authAdapter.user$.pipe(share());

  function signIn({ provider }: { provider: Provider }) {
    return authAdapter.signIn({ provider });
  }

  function signOut() {
    return authAdapter.signOut();
  }

  function user() {
    return user$;
  }

  return {
    signIn,
    signOut,
    user,
  };
}
