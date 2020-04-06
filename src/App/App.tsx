import React from 'react';

import { Virus } from './containers/Virus';

import './styles/index.scss';
import { AppContext } from './context/AppContext';

export const App = () => {
  return (
    <AppContext>
      <div className="App">
        <Virus />
      </div>
    </AppContext>
  );
};
