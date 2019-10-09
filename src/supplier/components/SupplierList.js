import React from 'react';
import { Table } from 'reactstrap';
import SupplierItem from '../SupplierItem';

function SupplierList(props) {
    const { data, onItemSelected } = props;
    return (
        <div className="table-responsive">
            <Table hover className="mb-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Alamat</th>
                        <th>Telepon</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(supplier => (
                        <SupplierItem
                            key={supplier.id}
                            item={supplier}
                            onClick={onItemSelected}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default SupplierList;