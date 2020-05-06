import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'wouter';

import { CreateRoom } from '../../pages/CreateRoom';
import { Virus } from '../../pages/Virus';
import { PrivateRoute } from './PrivateRoute';
import { Login } from '../../pages/Login';

export const Router: FC = () => {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/create-room" />
      </Route>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/create-room" component={CreateRoom} />
      <PrivateRoute path="/create-room/:roomId" component={CreateRoom} />
      <PrivateRoute path="/room/:roomId" component={Virus} />
      <PrivateRoute path="/:rest*">404 page not found</PrivateRoute>
    </Switch>
  );
};
