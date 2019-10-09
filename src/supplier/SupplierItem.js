import React from 'react';

function SupplierItem(props) {
    const { item, onClick } = props;
    return (
        <tr onClick={() => onClick(item)}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.address}</td>
            <td>{item.phone}</td>
        </tr>
    );
}

export default SupplierItem;