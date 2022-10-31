import { all, takeEvery, put, call } from 'redux-saga/effects'

import {
    FETCH_PRODUCTS_REQUEST,
} from './types'

import {
    receiveProductsSuccess,
    receiveProductsError
} from './actions'

import { apiGet, getProducts } from '../../service/ProductService'

function* fetchProducts() {
    try {

        const response = yield call(getProducts)

        yield put(receiveProductsSuccess(response))

    } catch (error) {
        yield put(receiveProductsError(error))
    }
}

function* watchFetchProducts() {
    yield takeEvery(FETCH_PRODUCTS_REQUEST, fetchProducts)
}


export default function* productSagas() {
    yield all([
        watchFetchProducts()
    ])
}