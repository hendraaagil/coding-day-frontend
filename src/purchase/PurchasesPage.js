import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PaginationComponent from 'react-reactstrap-pagination';
import PurchaseList from './components/PurchaseList';
import { getToken } from '../utils';
import { getPurchases } from './api';
import toast from 'toasted-notes';

function PurchasesPage(props) {
    const paginationState = {
        data: [],
        total: 0,
        page: 1,
        perPage: 10
    };
    const [pagination, setPagination] = useState(paginationState);

    const fetchPurchases = page => {
        const token = getToken();
        getPurchases(token, page)
            .then(response => {
                const { data, current_page, total, per_page } = response.data;
                setPagination({
                    data,
                    total,
                    page: current_page,
                    perPage: per_page
                });
            })
            .catch(error => {
                const message = error.response
                    ? error.response.data.message
                    : 'Terjadi kesalahan, silahkan coba lagi';
                toast.notify(({ onClose }) => (
                    <Alert color="danger" toggle={onClose}>
                        {message}
                    </Alert>
                ));
            });
    };
    const changePage = page => {
        fetchPurchases(page);
    };

    useEffect(() => {
        fetchPurchases(1);
    }, []);

    const gotoItem = item => {
        const { history } = props;
        history.push(`/purchases/${item.id}`);
    };

    return (
        <div>
            <h2 className="mb-5">Daftar Pembelian</h2>

            <Button
                tag={Link}
                to="/purchases/create"
                color="primary"
                className="mb-3"
            >
                Tambah
            </Button>

            <PurchaseList data={pagination.data} onItemSelected={gotoItem} />

            {pagination.total > pagination.perPage ? (
                <PaginationComponent
                    totalItems={pagination.total}
                    pageSize={pagination.perPage}
                    activePage={pagination.page}
                    onSelect={changePage}
                />
            ) : null}
        </div>
    );
}

export default PurchasesPage;