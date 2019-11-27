export const types = {
    SHOW_LEFT_MENU: 'Layouts/container/DefaultMain/SHOW_LEFT_MENU',
    HIDE_LEFT_MENU: 'Layouts/container/DefaultMain/HIDE_LEFT_MENU',
    UPDATE_ROUTE_INFO: 'Layouts/container/DefaultMain/UPDATE_ROUTE_INFO'
};

/* Action creator */
export function showLeftMenu() {
    return {type: types.SHOW_LEFT_MENU};
}

export function hideLeftMenu() {
    return {type: types.HIDE_LEFT_MENU};
}

export const updateRouteInfo = (params) => ({type: types.UPDATE_ROUTE_INFO, params});
