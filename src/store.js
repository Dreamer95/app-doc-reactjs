import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './middleware';
import {appConfig} from 'Src/constant';
import Docs from 'Src/modules/Docs/reducer';
import {reducer as Layouts} from './modules/Layouts/reducer';

const appReducer = combineReducers({
    Docs,
    Layouts
});

let store = null;
const sagaMiddleware = createSagaMiddleware();

if (appConfig.APPLICATION_ENV === 'development') {
    const composeEnhancers =  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({ }) : compose;

    store = createStore(appReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
} else {
    store = createStore(appReducer, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(rootSaga);

export default store;
