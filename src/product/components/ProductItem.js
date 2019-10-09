import React from 'react';

function ProductItem(props) {
    const { item, onClick } = props;
    return (
        <tr onClick={() => onClick(item)}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price_purchase}</td>
            <td>{item.price_sale}</td>
            <td>{item.category.name}</td>
            <td>{item.stock}</td>
            <td>{item.desc}</td>
        </tr>
    );
}

export default ProductItem;