import React from 'react';
import { Button, Input } from 'reactstrap';
import { formatMoney } from '../../utils';

function PurchaseProductItem(props) {
    const { item, onRemove, onQtyChange } = props;
    return (
        <tr>
            <td>
                <Button close onClick={() => onRemove(item)} />
            </td>
            <td>{item.product_id}</td>
            <td>{item.product.name}</td>
            <td>
                <Input
                    value={item.qty}
                    onChange={e => onQtyChange(item, e.target.value)}
                    type="number"
                    min={1}
                    style={{ maxWidth: 80 }}
                />
            </td>
            <td>{formatMoney(item.product.price_purchase)}</td>
            <td>{formatMoney(item.qty * item.product.price_purchase)}</td>
        </tr>
    );
}

export default PurchaseProductItem;