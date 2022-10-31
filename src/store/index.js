import { createStore, applyMiddleware } from "redux";

import logger from "redux-logger";

import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducer";

import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

console.log('env =', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger)
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
)

sagaMiddleware.run(rootSaga)

export default store;