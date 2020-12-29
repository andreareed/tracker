import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRenderer } from 'fela';
import { RendererProvider as StyleProvider, ThemeProvider } from 'react-fela';
import prefixer from 'fela-plugin-prefixer';
import fallbackValue from 'fela-plugin-fallback-value';

import theme from './app-theme';
import store from './store';
import './index.css';
import App from './App';

const renderer = createRenderer({
  plugins: [prefixer(), fallbackValue()],
});

// The provider will automatically render the styles
// into the mountNode on componentWillMount
const mountNode = document.getElementById('stylesheet');

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <StyleProvider renderer={renderer} mountNode={mountNode}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StyleProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
