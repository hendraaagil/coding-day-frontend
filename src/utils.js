import React from 'react';
import { Alert } from 'reactstrap';
import toast from 'toasted-notes';

export function clearToken() {
    window.localStorage.removeItem('token');
}
export function saveToken(token) {
    window.localStorage.setItem('token', token);
}
export function getToken() {
    return window.localStorage.getItem('token');
}

export function handleError(axiosError) {
    if (axiosError.response) {
        const message = axiosError.response.data.message;

        toast.notify(({ onClose }) => (
            <Alert color="danger" toggle={onClose}>
                {message}
            </Alert>
        ));

        // Validation Error
        if (axiosError.response.status === 422) {
            const validationErrors = axiosError.response.data.errors;
            Object.keys(validationErrors).forEach(key => {
                toast.notify(({ onClose }) => (
                    <Alert color="danger" toggle={onClose}>
                        {validationErrors[key].join('\n')}
                    </Alert>
                ));
            });
        }
    } else {
        toast.notify(({ onClose }) => (
            <Alert color="danger" toggle={onClose}>
                Terjadi kesalahan, silahkan coba lagi
            </Alert>
        ));
    }
}

export function formatMoney(amount) {
    return new Intl.NumberFormat('id').format(amount);
}