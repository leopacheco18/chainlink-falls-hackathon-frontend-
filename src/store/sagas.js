import { all } from 'redux-saga/effects'

import productSagas from './product/sagas'

export default function* rootSaga() {
    yield all([
        productSagas()
    ])
}