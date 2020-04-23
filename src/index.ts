import React from 'react';
import ReactDOM from 'react-dom';

import { domainFactory } from './Services/domain.factory';

import { App } from './App/App';

domainFactory();
ReactDOM.render(React.createElement(App), document.getElementById('app'));
