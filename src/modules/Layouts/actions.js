export const types = {
    SHOW_LOADING: 'Modules/Layouts/SHOW_LOADING',
    HIDE_LOADING: 'Modules/Layouts/HIDE_LOADING'
};

/* Action creator */
export function showLoading() {
    return {type: types.SHOW_LOADING};
}

export function hideLoading() {
    return {type: types.HIDE_LOADING};
}
