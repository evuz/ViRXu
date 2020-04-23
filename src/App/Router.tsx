import React, { FC } from 'react';
import { Route, Switch } from 'wouter';

import { Virus } from './pages/Virus';

export const Router: FC = () => {
  return (
    <Switch>
      <Route path="/room/:roomId" component={Virus} />
      <Route path="/:rest*">404 page not found{/* <Virus /> */}</Route>
    </Switch>
  );
};
