import { Observable } from 'rxjs';

import { User } from '../../Auth/Entities/User';

export type Provider = 'google';

export type AuthAdapter = {
  signIn(args: { provider: Provider }): Promise<User>;
  signOut(): Promise<void>;
  user$: Observable<User>;
};
