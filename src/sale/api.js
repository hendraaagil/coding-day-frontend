import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

export function getSales(token, page = 1) {
    return axios({
        method: 'GET',
        url: `${baseUrl}/transactions/sales?page=${page}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function postSale(token, payload) {
    const {
        pay,
        details
    } = payload;
    return axios({
        method: 'POST',
        url: `${baseUrl}/transactions/sales`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            pay,
            details
        }
    });
}

export function getSale(token, saleId) {
    return axios({
        method: 'GET',
        url: `${baseUrl}/transactions/sales/${saleId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}