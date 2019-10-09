import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

export function getPurchases(token, page = 1) {
    return axios({
        method: 'GET',
        url: `${baseUrl}/transactions/purchases?page=${page}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function postPurchase(token, payload) {
    const {
        supplier_id,
        details
    } = payload;
    return axios({
        method: 'POST',
        url: `${baseUrl}/transactions/purchases`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            supplier_id,
            details
        }
    });
}

export function getPurchase(token, purchaseId) {
    return axios({
        method: 'GET',
        url: `${baseUrl}/transactions/purchases/${purchaseId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}