export const types = {
    PROCESS_LOADING_ACTIVE: 'Components/ProgressLoading/PROCESS_LOADING_ACTIVE',
    PROCESS_LOADING_DEACTIVE: 'Components/ProgressLoading/PROCESS_LOADING_DEACTIVE'
};

/* Action creator */
export function onProcessLoadingActive() {
    return {type: types.PROCESS_LOADING_ACTIVE};
}

export function onProcessLoadingDeactive() {
    return {type: types.PROCESS_LOADING_DEACTIVE};
}
