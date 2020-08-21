import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './theme/GlobalStyle';

ReactDOM.render(
  <Fragment>
    <GlobalStyle />
    <App />
  </Fragment>,
  document.querySelector('#root')
);
