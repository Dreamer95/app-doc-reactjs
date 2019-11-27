export const types = {
    PROGRESS_LOADING_ACTIVE: 'Components/ProgressLoading/PROGRESS_LOADING_ACTIVE',
    PROGRESS_LOADING_DEACTIVE: 'Components/ProgressLoading/PROGRESS_LOADING_DEACTIVE'
};

/* Action creator */
export function onProgressLoadingActive() {
    return {type: types.PROGRESS_LOADING_ACTIVE};
}

export function onProgressLoadingDeactive() {
    return {type: types.PROGRESS_LOADING_DEACTIVE};
}
