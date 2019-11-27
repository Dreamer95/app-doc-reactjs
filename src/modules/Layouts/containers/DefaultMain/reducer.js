import {types} from './actions';

const initialState = {
    isShowLeftMenu: true,
    routeInfo: {
        route: {},
        params: {}
    }
};

export const defaultMainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_LEFT_MENU:
            return {...state, isShowLeftMenu: true};
        case types.HIDE_LEFT_MENU:
            return {...state, isShowLeftMenu: false};
        case types.UPDATE_ROUTE_INFO:
            if (action.params) {
                return {...state, routeInfo: {...state.routeInfo, ...action.params}};
            }
            return state;
        default:
            return state;
    }
};
