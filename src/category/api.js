import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

export function getCategories(token, page = 1) {
    return axios({
        method: 'GET',
        url: `${baseUrl}/categories?page=${page}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function postCategory(token, payload) {
    const { name } = payload;
    return axios({
        method: 'POST',
        url: `${baseUrl}/categories`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            name
        }
    });
}

export function getCategory(token, categoryId) {
    return axios({
        method: 'GET',
        url: `${baseUrl}/categories/${categoryId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function putCategory(token, categoryId, payload) {
    const { name } = payload;
    return axios({
        method: 'PUT',
        url: `${baseUrl}/categories/${categoryId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        data: {
            name
        }
    });
}

export function deleteCategory(token, categoryId) {
    return axios({
        method: 'DELETE',
        url: `${baseUrl}/categories/${categoryId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}