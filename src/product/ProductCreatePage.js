import React, { useState } from 'react';
import {
    Alert,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon
} from 'reactstrap';
import CategorySelectionModal from './components/CategorySelectionModal';
import { postProduct } from './api';
import { getToken, handleError } from '../utils';
import toast from 'toasted-notes';

function ProductCreatePage(props) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price_purchase, setPricePurchase] = useState('');
    const [price_sale, setPriceSale] = useState('');
    const [stock, setStock] = useState(1);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [isModalOpen, setModalOpen] = useState(false);

    const handleSelectCategory = category => {
        setSelectedCategory(category);
        setModalOpen(false);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const token = getToken();
        const payload = {
            name,
            desc,
            category_id: selectedCategory.id,
            price_purchase,
            price_sale,
            stock
        };
        postProduct(token, payload)
            .then(response => {
                const { history } = props;
                toast.notify(({ onClose }) => (
                    <Alert color="success" toggle={onClose}>
                        Berhasil tambah data
                    </Alert>
                ));
                history.push('/products');
            })
            .catch(error => {
                handleError(error);
            });
    };

    return (
        <div>
            <h2 className="mb-5">Tambah Produk</h2>
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
                    <Label>Deskripsi</Label>
                    <Input
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        type="textarea"
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Harga Beli</Label>
                    <Input
                        value={price_purchase}
                        onChange={e => setPricePurchase(e.target.value)}
                        type="number"
                        min={0}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Harga Jual</Label>
                    <Input
                        value={price_sale}
                        onChange={e => setPriceSale(e.target.value)}
                        type="number"
                        min={0}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Stok</Label>
                    <Input
                        value={stock}
                        onChange={e => setStock(e.target.value)}
                        type="number"
                        min={1}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Kategori</Label>
                    <InputGroup>
                        <Input
                            value={selectedCategory ? selectedCategory.name : ''}
                            onChange={() => { }}
                            onClick={() => setModalOpen(true)}
                            placeholder="Pilih Kategori"
                            required
                        />
                        {selectedCategory ? (
                            <InputGroupAddon
                                tag="a"
                                href="#"
                                className="text-decoration-none"
                                onClick={() => setSelectedCategory(null)}
                                addonType="append"
                            >
                                <InputGroupText>Hapus</InputGroupText>
                            </InputGroupAddon>
                        ) : null}
                    </InputGroup>
                </FormGroup>
                <Button color="primary">Simpan</Button>
            </Form>
            <CategorySelectionModal
                isOpen={isModalOpen}
                toggle={() => setModalOpen(false)}
                onItemSelected={handleSelectCategory}
            />
        </div>
    );
}

export default ProductCreatePage;