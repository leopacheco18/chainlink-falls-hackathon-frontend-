import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL
} from './types'

export const receiveProductsRequest = () => ({ type: FETCH_PRODUCTS_REQUEST })

export const receiveProductsSuccess = (products) => ({ type: FETCH_PRODUCTS_SUCCESS, payload: products })

export const receiveProductsError = (error) => ({ type: FETCH_PRODUCTS_FAIL, payload: error })