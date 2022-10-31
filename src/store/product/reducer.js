import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL
} from './types'

const INITIAL_STATE = {
    products: [],
    loading: false,
    error: null
}

const productReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null
            }

        case FETCH_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}

export default productReducer;