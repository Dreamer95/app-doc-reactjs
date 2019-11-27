import {types} from "./actions";

const initialState = {
    isAccessDenied: false
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_ERROR:
            if(action.payload){
                return {...state, ...action.payload};
            }
            return state;
        default:
            return state;
    }
};
