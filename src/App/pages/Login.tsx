import React, { FC, useState, useEffect } from 'react';

import { Button } from '../components/Button';
import { domain } from '../../Services/domain';

export const Login: FC = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = domain()
      .get('user')
      .execute()
      .subscribe((newUser) => {
        console.log('User ->', newUser);
        setUser(newUser);
      });
    return () => subscription.unsubscribe();
  }, []);

  function click() {
    if (user) {
      return domain().get('signOut').execute();
    }
    domain().get('signIn').execute({ provider: 'google' });
  }

  return (
    <main className="Login">
      <Button onClick={click}>Login</Button>
    </main>
  );
};
