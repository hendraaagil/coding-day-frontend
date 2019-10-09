import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PaginationComponent from 'react-reactstrap-pagination';
import SupplierList from './components/SupplierList';
import { getToken } from '../utils';
import { getSuppliers } from './api';
import toast from 'toasted-notes';

function SuppliersPage(props) {
    const paginationState = {
        data: [],
        total: 0,
        page: 1,
        perPage: 10
    };
    const [pagination, setPagination] = useState(paginationState);

    const fetchSuppliers = page => {
        const token = getToken();
        getSuppliers(token, page)
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
        fetchSuppliers(page);
    };

    useEffect(() => {
        fetchSuppliers(1);
    }, []);

    const gotoItem = item => {
        const { history } = props
        history.push(`/suppliers/${item.id}`)
    }

    return (
        <div>
            <h2 className="mb-5">Supplier</h2>

            <Button
                tag={Link}
                to="/suppliers/create"
                color="primary"
                className="mb-3"
            >
                Tambah
            </Button>

            <SupplierList data={pagination.data} onItemSelected={gotoItem} />

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

export default SuppliersPage;