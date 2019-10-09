import React, { useState } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { postSupplier } from './api';
import { getToken, handleError } from '../utils';
import toast from 'toasted-notes';

function SupplierCreatePage(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        const token = getToken();
        const payload = {
            name,
            email,
            address,
        };
        postSupplier(token, payload)
            .then(response => {
                const { history } = props;
                toast.notify(({ onClose }) => (
                    <Alert color="success" toggle={onClose}>
                        Berhasil tambah data
                    </Alert>
                ));
                history.push('/suppliers');
            })
            .catch(error => {
                handleError(error);
            });
    };

    return (
        <div>
            <h2 className="mb-5">Tambah Supplier</h2>
            <Form onSubmit={handleSubmit}>
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
            </Form>
        </div>
    );
}

export default SupplierCreatePage;