export const types = {
    UPDATE_DOCS: 'Modules/Docs/UPDATE_DOCS',
    UPDATE_LEFT_MENU: 'Modules/Docs/UPDATE_LEFT_MENU',
    GET_LEFT_MENU: 'Modules/Docs/GET_LEFT_MENU'
};

/* Action creator */
export function updateDocs(payload) {
    return {type: types.UPDATE_DOCS, payload};
}

export function getLeftMenu(payload) {
    return {type: types.GET_LEFT_MENU, payload};
}
