import React, { useState, useEffect } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getCategory, deleteCategory, putCategory } from './api';
import { getToken, handleError } from '../utils';
import toast from 'toasted-notes';

function CategoryEditPage(props) {
    const { match, history } = props;
    const { categoryId } = match.params;

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');

    useEffect(() => {
        setLoading(true);

        const token = getToken();
        getCategory(token, categoryId)
            .then(response => {
                const data = response.data;
                setName(data.name);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                handleError(error);
            });
    }, [categoryId]);

    const handleDelete = () => {
        if (loading) return;

        setLoading(true);

        const token = getToken();
        setLoading(true);
        deleteCategory(token, categoryId)
            .then(response => {
                toast.notify(({ onClose }) => (
                    <Alert color="info" toggle={onClose}>
                        Berhasil hapus data
                    </Alert>
                ));
                setLoading(false);
                history.push('/categories');
            })
            .catch(error => {
                setLoading(false);
                handleError(error);
            });
    };

    const handleSubmit = e => {
        if (loading) return;

        e.preventDefault();

        setLoading(true);

        const token = getToken();
        const payload = {
            name,
        };
        putCategory(token, categoryId, payload)
            .then(response => {
                const { history } = props;
                toast.notify(({ onClose }) => (
                    <Alert color="success" toggle={onClose}>
                        Berhasil update data
                    </Alert>
                ));

                setLoading(false);
                history.push('/categories');
            })
            .catch(error => {
                setLoading(false);
                handleError(error);
            });
    };

    return (
        <div>
            <h2 className="mb-5">Detail Kategori Produk</h2>
            <Form disabled={loading} onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Nama</Label>
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </FormGroup>
                <Button color="primary">Simpan</Button>
                <Button
                    onClick={handleDelete}
                    color="link"
                    type="button"
                    className="float-right text-danger"
                >
                    Hapus
        </Button>
            </Form>
        </div>
    );
}

export default CategoryEditPage;