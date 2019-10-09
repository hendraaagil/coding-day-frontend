import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SupplierList from '../../supplier/components/SupplierList';
import PaginationComponent from 'react-reactstrap-pagination';
import { getSuppliers } from '../../supplier/api';
import { getToken, handleError } from '../../utils';

function SupplierSelectionModal(props) {
    const { isOpen, toggle, onItemSelected } = props;

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
                handleError(error);
            });
    };

    const changePage = page => {
        fetchSuppliers(page);
    };

    useEffect(() => {
        fetchSuppliers(1);
    }, []);

    return (
        <Modal isOpen={isOpen} toggle={toggle} scrollable>
            <ModalHeader toggle={toggle}>Pilih Supplier</ModalHeader>
            <ModalBody>
                <SupplierList data={pagination.data} onItemSelected={onItemSelected} />
            </ModalBody>
            <ModalFooter>
                {pagination.total > pagination.perPage ? (
                    <PaginationComponent
                        totalItems={pagination.total}
                        pageSize={pagination.perPage}
                        activePage={pagination.page}
                        onSelect={changePage}
                    />
                ) : null}
            </ModalFooter>
        </Modal>
    );
}

export default SupplierSelectionModal;