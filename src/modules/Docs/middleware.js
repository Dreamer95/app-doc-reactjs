// Libraries
import {put, takeLatest} from 'redux-saga/effects';

// Services
import * as DocumentService from 'Src/services/Document';

// Assets
import {types} from './actions';

function* getLeftMenu() {
    const listDocs = DocumentService.getList({
        type: 'document'
    });

    if(listDocs){
        let payload = {};

        yield listDocs.then((response) => {
            if (response && response.data && response.data.data && response.data.data.result) {
                const {result} = response.data.data;
                let documents = [];

                result.map((document) => {
                    const {id, title} = document;

                    if (id && title) {
                        documents.push({id, title});
                    }
                });

                payload = {
                    documents
                };
            }
        });

        yield put({type: types.UPDATE_LEFT_MENU, payload});
    }
}

export function* docsMiddleWare() {
    yield takeLatest(types.GET_LEFT_MENU, getLeftMenu);
}
