import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CategoryList from '../../category/components/CategoryList';
import PaginationComponent from 'react-reactstrap-pagination';
import { getCategories } from '../../category/api';
import { getToken, handleError } from '../../utils';

function CategorySelectionModal(props) {
    const { isOpen, toggle, onItemSelected } = props;

    const paginationState = {
        data: [],
        total: 0,
        page: 1,
        perPage: 10
    };
    const [pagination, setPagination] = useState(paginationState);

    const fetchCategories = page => {
        const token = getToken();
        getCategories(token, page)
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
        fetchCategories(page);
    };

    useEffect(() => {
        fetchCategories(1);
    }, []);

    return (
        <Modal isOpen={isOpen} toggle={toggle} scrollable>
            <ModalHeader toggle={toggle}>Pilih Kategori</ModalHeader>
            <ModalBody>
                <CategoryList data={pagination.data} onItemSelected={onItemSelected} />
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

export default CategorySelectionModal;