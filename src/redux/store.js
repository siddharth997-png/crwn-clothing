import {createStore,applyMiddlewares} from 'redux';
import logger from 'redux-logger';

import rootReducer from './root.reducer';

const middleware = [logger];

const store = createStore(rootReducer, applyMiddlewares(...middleware));

export default store;
