import React, { useState } from 'react';
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap';
import ProductSelectionModal from '../purchase/components/ProductSelectionModal';
import SaleProductList from './components/SaleProductList';
import { postSale } from './api';
import { getToken, handleError, formatMoney } from '../utils';
import toast from 'toasted-notes';

function SaleCreatePage(props) {
    const [pay, setPayAmount] = useState('');
    const [saleItems, setSaleItems] = useState([]);

    const [isProductModalOpen, setProductModalOpen] = useState(false);

    const handleSelectProduct = product => {
        const alreadyExists = saleItems.find(
            _item => _item.product_id === product.id
        );
        if (alreadyExists) {
            setSaleItems(saleItems);
        } else {
            const newItem = {
                product_id: product.id,
                qty: 1,
                product
            };
            setSaleItems(saleItems.concat(newItem));
        }

        setProductModalOpen(false);
    };

    const handleItemQtyChange = (item, qty) => {
        const newSaleItems = saleItems.map(_item => {
            if (_item.product_id === item.product_id) {
                return {
                    ..._item,
                    qty
                };
            } else {
                return _item;
            }
        });
        setSaleItems(newSaleItems);
    };

    const handleItemRemove = item => {
        const newSaleItems = saleItems.filter(
            _item => _item.product_id !== item.product_id
        );
        setSaleItems(newSaleItems);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const token = getToken();
        const payload = {
            pay,
            details: saleItems
        };
        postSale(token, payload)
            .then(response => {
                if (response.data.change > 0) {
                    toast.notify(`Kembalian: ${formatMoney(response.data.change)}`, {
                        duration: null
                    });
                }

                toast.notify(({ onClose }) => (
                    <Alert color="success" toggle={onClose}>
                        Berhasil tambah data
                    </Alert>
                ));

                // reset
                setPayAmount('');
                setSaleItems([]);
                setProductModalOpen(false);
            })
            .catch(error => {
                handleError(error);
            });
    };

    const calculateTotal = () => {
        return saleItems.reduce(
            (total, item) => total + item.qty * item.product.price_sale,
            0
        );
    };

    return (
        <div>
            <h2 className="mb-5">Transaksi Penjualan</h2>
            <Form onSubmit={handleSubmit}>
                <SaleProductList
                    items={saleItems}
                    onItemAdd={() => setProductModalOpen(true)}
                    onItemQtyChange={handleItemQtyChange}
                    onItemRemove={handleItemRemove}
                />

                <h2 className="display-4 text-bold font-weight-bold text-right">
                    TOTAL: {formatMoney(calculateTotal())}
                </h2>

                <FormGroup className="text-right">
                    <Input
                        value={pay}
                        onChange={e => setPayAmount(e.target.value)}
                        type="number"
                        min={calculateTotal()}
                        required
                        placeholder="Jumlah Bayar"
                        className="float-right text-right font-weight-bold"
                        style={{
                            maxWidth: 400,
                            fontSize: 48
                        }}
                    />
                </FormGroup>

                <Button color="primary" size="lg">
                    Simpan
        </Button>
            </Form>
            <ProductSelectionModal
                isOpen={isProductModalOpen}
                toggle={() => setProductModalOpen(false)}
                onItemSelected={handleSelectProduct}
            />
        </div>
    );
}

export default SaleCreatePage;