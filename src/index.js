import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from 'helpers/store';
import App from 'containers/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { configureFakeBackend } from 'helpers/fake-backend';
configureFakeBackend();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
