import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';

import App from './pages/App';
import * as stores from './stores';

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
