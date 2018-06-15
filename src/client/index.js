import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import { routerForBrowser } from 'redux-little-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './redux/reducers';
import App from './containers/App';
import actions from './redux/actions';
import testRoutes from '../../test/fixtures/testRoutes.json';

require('babel-polyfill');
require('./scss/app.scss');

const routes = {
  '/:slug': {
    title: 'Main',
  },
};

const {
  reducer: routerReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
} = routerForBrowser({ routes });

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(Object.assign({ router: routerReducer }, reducer)),
  composeEnhancers(
    routerEnhancer,
    applyMiddleware(routerMiddleware, thunk),
  ),
);

// Set initial url
const initialLocation = store.getState().router;

let slug;
if (initialLocation.params) ({ slug } = initialLocation.params);

if (testRoutes[slug]) store.dispatch(actions.updateTitle(testRoutes[slug], slug));

const reactRoot = document.getElementById('app'); // eslint-disable-line no-undef

ReactDOM.render(<Provider store={store}><App /></Provider>, reactRoot);
