import {types} from './actions';

const initialState = {
    headerMenu: [],
    leftMenu: []
};

export const defaultHeaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_MENU:
            if (action.payload) {
                return {...state, ...action.payload};
            }
            return state;
        default:
            return state;
    }
};
