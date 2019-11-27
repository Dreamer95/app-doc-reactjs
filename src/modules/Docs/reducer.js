import {types} from './actions';

const initialState = {
    documents: {},
    leftMenu: []
};

const docsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_DOCS:
            if (action.payload) {
                const {documents} = action.payload;
                let newState = {};

                if (documents) {
                    newState.documents = documents;
                }

                if (Object.keys(newState)) {
                    return {
                        ...state,
                        ...newState
                    };
                }
            }
            return state;
        case types.UPDATE_LEFT_MENU:
            if (action.payload) {
                const {documents} = action.payload;
                let newState = {};

                if (documents) {
                    newState.leftMenu = documents;
                }

                if (Object.keys(newState)) {
                    return {
                        ...state,
                        ...newState
                    };
                }
            }
            return state;
        default:
            return state;
    }
};

export default docsReducer;
