import {combineReducers} from 'redux';

import {loginReducer} from './containers/Login/reducer';
import {errorReducer} from './containers/Error/reducer';
import {defaultMainReducer} from './containers/DefaultMain/reducer';
import {defaultHeaderReducer} from './containers/DefaultHeader/reducer';

import {types} from './actions';

const initialState = {
    counter: 0,
    loading: false
};

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LOADING:
            return {...state, counter: state.counter + 1, loading: true};
        case types.HIDE_LOADING:
            let counter = +state.counter > 0 ? +state.counter - 1 : 0;

            if (counter > 0) {
                return {...state, counter: counter};
            } else {
                return {...state, counter: 0, loading: false};
            }
        default:
            return state;
    }
};

export const reducer = combineReducers({
    layoutReducer: layoutReducer,
    loginReducer: loginReducer,
    errorReducer: errorReducer,
    defaultMainReducer: defaultMainReducer,
    defaultHeaderReducer: defaultHeaderReducer
});
