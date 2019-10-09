import React from 'react';
import { Table } from 'reactstrap';
import PurchaseItem from '../PurchaseItem';

function PurchaseList(props) {
    const { data, onItemSelected } = props;
    return (
        <div className="table-responsive">
            <Table hover className="mb-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Supplier</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(purchase => (
                        <PurchaseItem
                            key={purchase.id}
                            item={purchase}
                            onClick={onItemSelected}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default PurchaseList;