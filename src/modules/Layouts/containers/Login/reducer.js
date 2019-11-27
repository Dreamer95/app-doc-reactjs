import {types} from './actions';

const initialState = {
    isAuthenticated: false,
    isUserChecked: false,
    userId: null,
    email: null,
    fullName: null,
    avatar: null
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_LOGIN:
            if(action.payload){
                return {...state, ...action.payload};
            }
            return state;
        default:
            return state;
    }
};
