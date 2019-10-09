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
import SupplierSelectionModal from './components/SupplierSelectionModal';
import ProductSelectionModal from './components/ProductSelectionModal';
import PurchaseProductList from './components/PurchaseProductList';
import { postPurchase } from './api';
import { getToken, handleError, formatMoney } from '../utils';
import toast from 'toasted-notes';

function PurchaseCreatePage(props) {
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [purchaseItems, setPurchaseItems] = useState([]);

    const [isSupplierModalOpen, setSupplierModalOpen] = useState(false);
    const [isProductModalOpen, setProductModalOpen] = useState(false);

    const handleSelectProduct = product => {
        const alreadyExists = purchaseItems.find(
            _item => _item.product_id === product.id
        );
        if (alreadyExists) {
            setPurchaseItems(purchaseItems);
        } else {
            const newItem = {
                product_id: product.id,
                qty: 1,
                product
            };
            setPurchaseItems(purchaseItems.concat(newItem));
        }

        setProductModalOpen(false);
    };

    const handleItemQtyChange = (item, qty) => {
        const newPurchaseItems = purchaseItems.map(_item => {
            if (_item.product_id === item.product_id) {
                return {
                    ..._item,
                    qty
                };
            } else {
                return _item;
            }
        });
        setPurchaseItems(newPurchaseItems);
    };

    const handleItemRemove = item => {
        const newPurchaseItems = purchaseItems.filter(
            _item => _item.product_id !== item.product_id
        );
        setPurchaseItems(newPurchaseItems);
    };

    const handleSelectSupplier = supplier => {
        setSelectedSupplier(supplier);
        setSupplierModalOpen(false);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const token = getToken();
        const payload = {
            supplier_id: selectedSupplier.id,
            details: purchaseItems
        };
        postPurchase(token, payload)
            .then(response => {
                const { history } = props;
                toast.notify(({ onClose }) => (
                    <Alert color="success" toggle={onClose}>
                        Berhasil tambah data
                    </Alert>
                ));
                history.push('/purchases');
            })
            .catch(error => {
                handleError(error);
            });
    };

    const calculateTotal = () => {
        return purchaseItems.reduce(
            (total, item) => total + item.qty * item.product.price_purchase,
            0
        );
    };

    return (
        <div>
            <h2 className="mb-5">Transaksi Pembelian</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Supplier</Label>
                    <InputGroup>
                        <Input
                            value={selectedSupplier ? selectedSupplier.name : ''}
                            onChange={() => { }}
                            onClick={() => setSupplierModalOpen(true)}
                            placeholder="Pilih Supplier"
                            required
                        />
                        {selectedSupplier ? (
                            <InputGroupAddon
                                tag="a"
                                href="#"
                                className="text-decoration-none"
                                onClick={() => setSelectedSupplier(null)}
                                addonType="append"
                            >
                                <InputGroupText>Hapus</InputGroupText>
                            </InputGroupAddon>
                        ) : null}
                    </InputGroup>
                </FormGroup>

                <PurchaseProductList
                    items={purchaseItems}
                    onItemAdd={() => setProductModalOpen(true)}
                    onItemQtyChange={handleItemQtyChange}
                    onItemRemove={handleItemRemove}
                />

                <h2 className="display-4 text-bold font-weight-bold text-right">
                    TOTAL: {formatMoney(calculateTotal())}
                </h2>

                <Button color="primary" size="lg">
                    Simpan
        </Button>
            </Form>
            <ProductSelectionModal
                isOpen={isProductModalOpen}
                toggle={() => setProductModalOpen(false)}
                onItemSelected={handleSelectProduct}
            />
            <SupplierSelectionModal
                isOpen={isSupplierModalOpen}
                toggle={() => setSupplierModalOpen(false)}
                onItemSelected={handleSelectSupplier}
            />
        </div>
    );
}

export default PurchaseCreatePage;