import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

export function getProducts(token, page = 1) {
    return axios({
        method: 'GET',
        url: `${baseUrl}/products?page=${page}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function postProduct(token, payload) {
    const {
        name,
        desc,
        category_id,
        price_purchase,
        price_sale,
        stock
    } = payload;
    return axios({
        method: 'POST',
        url: `${baseUrl}/products`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            name,
            desc,
            category_id,
            price_purchase,
            price_sale,
            stock
        }
    });
}

export function getProduct(token, productId) {
    return axios({
        method: 'GET',
        url: `${baseUrl}/products/${productId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function putProduct(token, productId, payload) {
    const {
        name,
        desc,
        category_id,
        price_purchase,
        price_sale,
        stock
    } = payload;
    return axios({
        method: 'PUT',
        url: `${baseUrl}/products/${productId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            name,
            desc,
            category_id,
            price_purchase,
            price_sale,
            stock
        }
    });
}

export function deleteProduct(token, productId) {
    return axios({
        method: 'DELETE',
        url: `${baseUrl}/products/${productId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}