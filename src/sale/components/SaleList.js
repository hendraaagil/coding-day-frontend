import React from 'react';
import { Table } from 'reactstrap';
import SaleItem from './SaleItem';

function SaleList(props) {
    const { data, onItemSelected } = props;
    return (
        <div className="table-responsive">
            <Table hover className="mb-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(sale => (
                        <SaleItem
                            key={sale.id}
                            item={sale}
                            onClick={onItemSelected}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default SaleList;