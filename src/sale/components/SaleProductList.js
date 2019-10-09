import React from 'react';
import { Button, Table } from 'reactstrap';
import SaleProductItem from './SaleProductItem';

function SaleProductList(props) {
    const { items, onItemAdd, onItemQtyChange, onItemRemove } = props;
    return (
        <div className="table-responsive">
            <Table>
                <thead>
                    <tr>
                        <th />
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Stok</th>
                        <th>Jml</th>
                        <th>Harga</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <SaleProductItem
                            key={item.product_id}
                            item={item}
                            onQtyChange={onItemQtyChange}
                            onRemove={onItemRemove}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6} className="text-center">
                            <Button color="link" size="sm" onClick={onItemAdd}>
                                [+] Tambah Item
                            </Button>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}

export default SaleProductList;