import React from 'react';
import { formatMoney } from '../utils';

function PurchaseItem(props) {
    const { item, onClick } = props;
    return (
        <tr onClick={() => onClick(item)}>
            <td>{item.id}</td>
            <td>{item.supplier.name}</td>
            <td>{formatMoney(item.total)}</td>
        </tr>
    );
}

export default PurchaseItem;