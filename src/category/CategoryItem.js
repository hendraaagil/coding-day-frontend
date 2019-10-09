import React from 'react';

function CategoryItem(props) {
    const { item, onClick } = props;
    return (
        <tr onClick={() => onClick(item)}>
            <td>{item.id}</td>
            <td>{item.name}</td>
        </tr>
    );
}

export default CategoryItem;