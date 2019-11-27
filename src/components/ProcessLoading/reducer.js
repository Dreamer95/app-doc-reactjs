import { types } from './actions';

const initialState = {
    counter: 0,
    processLoading: false,
};

const processLoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PROCESS_LOADING_ACTIVE:
            return {...state, counter: state.counter + 1, processLoading: true};
        case types.PROCESS_LOADING_DEACTIVE:
            let counter = +state.counter > 0 ? +state.counter - 1 : 0;

            if(counter > 0){
                return {...state, counter: counter};
            }else {
                return {...state, counter: 0, processLoading: false};
            }
        default:
            return state;
    }
};

export default processLoadingReducer
