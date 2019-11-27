import {all, fork} from 'redux-saga/effects';
import {docsMiddleWare} from 'Modules/Docs/middleware';

export default function* rootSaga () {
    yield all ([
        fork(docsMiddleWare)
    ]);
}

