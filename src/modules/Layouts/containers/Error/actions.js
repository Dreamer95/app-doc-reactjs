export const types = {
    UPDATE_ERROR: 'Layouts/containers/Error/UPDATE_ERROR'
};

export function updateError(payload) {
    return {type: types.UPDATE_ERROR, payload};
}