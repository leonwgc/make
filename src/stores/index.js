import { applyMiddleware, compose, createStore } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import thunk from 'redux-thunk';

export const history = createHashHistory();

let composeEnhancers = compose;

if (__dev__ && '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in window) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true });
}

export const configureStore = () => {
  const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
  );

  return store;
};

export default configureStore();
