export const types = {
    CREATE_NEW_LEFT_MENU: 'Component/NewDocumentModal/CREATE_NEW_LEFT_MENU'
};

/* Action creator */
export function createNewLeftMenu(payload) {
    return {type: types.CREATE_NEW_LEFT_MENU,payload};
}

