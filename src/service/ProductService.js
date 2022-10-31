import axios from "axios";

import mockProducts from '../mocks/Products.json'

const URL = process.env.BACKEND_ENDPOINT || ''

export const apiGet = async (config = {}) => {
    return await (await axios.get(URL, config)).data
}

export const getProducts = () => {
    return mockProducts
}
