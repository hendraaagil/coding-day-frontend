import React from 'react';
import { Table } from 'reactstrap';
import CategoryItem from '../CategoryItem';

function CategoryList(props) {
    const { data, onItemSelected } = props;
    return (
        <div className="table-responsive">
            <Table hover className="mb-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(category => (
                        <CategoryItem
                            key={category.id}
                            item={category}
                            onClick={onItemSelected}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CategoryList;