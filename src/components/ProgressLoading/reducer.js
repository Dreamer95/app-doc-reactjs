import {types} from './actions';

const initialState = {
    counter: 0,
    progressLoading: false
};

const progressLoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PROGRESS_LOADING_ACTIVE:
            return {...state, counter: state.counter + 1, progressLoading: true};
        case types.PROGRESS_LOADING_DEACTIVE:
            let counter = +state.counter > 0 ? +state.counter - 1 : 0;

            if(counter > 0){
                return {...state, counter: counter};
            }else {
                return {...state, counter: 0, progressLoading: false};
            }
        default:
            return state;
    }
};

export default progressLoadingReducer;
