import React from 'react';

import { Router } from './Router';

import './styles/index.scss';
import { AppContext } from './context/AppContext';

export const App = () => {
  return (
    <AppContext>
      <div className="App">
        <Router />
      </div>
    </AppContext>
  );
};
