import React, { FC, useEffect, useState } from 'react';
import { Route, RouteProps } from 'wouter';

import { domain } from '../../../Services/domain';
import { Login } from '../../pages/Login';

export const PrivateRoute: FC<RouteProps> = ({ ...props }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = domain().get('user').execute().subscribe(setUser);
    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return <Login />;
  }

  return <Route {...props} />;
};
