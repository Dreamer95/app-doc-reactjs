export const types = {
    UPDATE_MENU: 'Layouts/containers/DefaultHeader/UPDATE_MENU',
};

export function updateMenu(payload) {
    return {type: types.UPDATE_MENU, payload};
}
