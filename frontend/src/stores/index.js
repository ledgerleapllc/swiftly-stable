import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import appMiddleware from './app-middleware';
import appReducer from './app-reducers';

const saga = createSagaMiddleware();

const middlewares = [saga];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(appReducer);
saga.run(appMiddleware);

export default store;
