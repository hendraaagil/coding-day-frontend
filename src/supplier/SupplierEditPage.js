import React, { useState, useEffect } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getSupplier, deleteSupplier, putSupplier } from './api';
import { getToken, handleError } from '../utils';
import toast from 'toasted-notes';

function SupplierEditPage(props) {
    const { match, history } = props;
    const { supplierId } = match.params;

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        setLoading(true);

        const token = getToken();
        getSupplier(token, supplierId)
            .then(response => {
                const data = response.data;
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                handleError(error);
            });
    }, [supplierId]);

    const handleDelete = () => {
        if (loading) return;

        setLoading(true);

        const token = getToken();
        setLoading(true);
        deleteSupplier(token, supplierId)
            .then(response => {
                toast.notify(({ onClose }) => (
                    <Alert color="info" toggle={onClose}>
                        Berhasil hapus data
                    </Alert>
                ));
                setLoading(false);
                history.push('/supplier');
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
            email,
            phone,
            address
        };
        putSupplier(token, supplierId, payload)
            .then(response => {
                const { history } = props;
                toast.notify(({ onClose }) => (
                    <Alert color="success" toggle={onClose}>
                        Berhasil update data
                    </Alert>
                ));

                setLoading(false);
                history.push('/suppliers');
            })
            .catch(error => {
                setLoading(false);
                handleError(error);
            });
    };

    return (
        <div>
            <h2 className="mb-5">Supplier Detail</h2>
            <Form disabled={loading} onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Nama</Label>
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Telepon</Label>
                    <Input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Alamat</Label>
                    <Input
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        type="textarea"
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

export default SupplierEditPage;