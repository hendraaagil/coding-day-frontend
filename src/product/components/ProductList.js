import React from 'react';
import { Table } from 'reactstrap';
import ProductItem from './ProductItem';

function ProductList(props) {
    const { data, onItemSelected } = props;
    return (
        <div className="table-responsive">
            <Table hover className="mb-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Harga Beli</th>
                        <th>Harga Jual</th>
                        <th>Kategori</th>
                        <th>Stok</th>
                        <th>Deskripsi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(product => (
                        <ProductItem
                            key={product.id}
                            item={product}
                            onClick={onItemSelected}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductList;