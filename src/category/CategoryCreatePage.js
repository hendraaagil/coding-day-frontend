import React, { useState } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { postCategory } from './api';
import { getToken, handleError } from '../utils';
import toast from 'toasted-notes';

function CategoryCreatePage(props) {
    const [name, setName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        const token = getToken();
        const payload = {
            name
        };
        postCategory(token, payload)
            .then(response => {
                const { history } = props;
                toast.notify(({ onClose }) => (
                    <Alert color="success" toggle={onClose}>
                        Berhasil tambah data
                    </Alert>
                ));
                history.push('/categories');
            })
            .catch(error => {
                handleError(error);
            });
    };

    return (
        <div>
            <h2 className="mb-5">Tambah Kategori Produk</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Nama</Label>
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </FormGroup>
                <Button color="primary">Simpan</Button>
            </Form>
        </div>
    );
}

export default CategoryCreatePage;