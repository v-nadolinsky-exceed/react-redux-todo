import React from 'react';
import ItemTodo from './ItemTodo';

const ItemList = ({ generateArrayWithFilter }) => {

    const currentArrayOfTasks = generateArrayWithFilter();
    
    return (
        <div className="item-list">
            {
            currentArrayOfTasks.map(task => <ItemTodo key={task._id} {...task} />)
            }
        </div>
    )
}

export default ItemList;