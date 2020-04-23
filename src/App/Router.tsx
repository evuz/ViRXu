import React, { FC } from 'react';
import { Route, Switch } from 'wouter';

import { CreateRoom } from './pages/CreateRoom';
import { Virus } from './pages/Virus';

export const Router: FC = () => {
  return (
    <Switch>
      <Route path="/create-room" component={CreateRoom} />
      <Route path="/create-room/:roomId" component={CreateRoom} />
      <Route path="/room/:roomId" component={Virus} />
      <Route path="/:rest*">404 page not found{/* <Virus /> */}</Route>
    </Switch>
  );
};
