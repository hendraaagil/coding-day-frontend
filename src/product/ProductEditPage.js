import React, { useState, useEffect } from 'react';
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
import { getProduct, deleteProduct, putProduct } from './api';
import { getToken, handleError } from '../utils';
import toast from 'toasted-notes';

function ProductEditPage(props) {
    const { match, history } = props;
    const { productId } = match.params;

    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        setLoading(true);

        const token = getToken();
        getProduct(token, productId)
            .then(response => {
                const data = response.data;
                setName(data.name);
                setDesc(data.desc);
                setPricePurchase(data.price_purchase);
                setPriceSale(data.price_sale);
                setStock(data.stock);
                setSelectedCategory(data.category);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                handleError(error);
            });
    }, [productId]);

    const handleDelete = () => {
        if (loading) return;

        setLoading(true);

        const token = getToken();
        setLoading(true);
        deleteProduct(token, productId)
            .then(response => {
                toast.notify(({ onClose }) => (
                    <Alert color="info" toggle={onClose}>
                        Berhasil hapus data
                    </Alert>
                ));
                setLoading(false);
                history.push('/products');
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
            desc,
            price_purchase,
            price_sale,
            stock,
            category_id: selectedCategory.id
        };
        putProduct(token, productId, payload)
            .then(response => {
                const { history } = props;
                toast.notify(({ onClose }) => (
                    <Alert color="success" toggle={onClose}>
                        Berhasil update data
                    </Alert>
                ));

                setLoading(false);
                history.push('/products');
            })
            .catch(error => {
                setLoading(false);
                handleError(error);
            });
    };

    return (
        <div>
            <h2 className="mb-5">Detail Produk</h2>
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
                <Button
                    onClick={handleDelete}
                    color="link"
                    type="button"
                    className="float-right text-danger"
                >
                    Hapus
        </Button>
            </Form>
            <CategorySelectionModal
                isOpen={isModalOpen}
                toggle={() => setModalOpen(false)}
                onItemSelected={handleSelectCategory}
            />
        </div>
    );
}

export default ProductEditPage;