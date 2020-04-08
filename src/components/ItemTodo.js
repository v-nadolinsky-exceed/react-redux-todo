import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { toast } from "react-toastify";
import "./ItemTodo.css";

const ItemTodo = ({
  removeTask,
  changeItem,
  completedItem,
  _id,
  completed,
  text,
}) => {

  const [inputStateAfterClicks, setInputStateAfterClicks] = useState(true);
  const [inputValue, setInputValue] = useState(text);

  const saveInput = (event) => {
    if (event.key === "Enter") {
      setInputStateAfterClicks(true);
      changeItem(event.currentTarget.id, inputValue);
    }
  };

  const newValueTask = (event) => {
    let value = event.target.value;
    setInputValue(value);
  };

  const handlDblClick = () => {
    setInputStateAfterClicks((inputStateAfterClick) => !inputStateAfterClick);
  };

  const completedTask = (id, completed) => {
    completedItem(id, completed);
    toast.success(`Task completed`);
  };

  return (
    <div className="item-todo">
      <label>
        <div className="item__check"></div>
        <div className={`check ${completed && "active"}`}></div>
        <input
          className="item-todo__checkbox "
          type="checkbox"
          checked={completed}
          onChange={() => completedTask(_id, completed)}
        />
      </label>
      <div onDoubleClick={handlDblClick}>
        <input
          id={_id}
          className={`item-todo__input ${completed && "completed"}`}
          value={inputValue}
          disabled={inputStateAfterClicks}
          onKeyPress={saveInput}
          onChange={newValueTask}
        />
      </div>
      <span onClick={() => removeTask(_id)} className="close"></span>
    </div>
  );
};

export default connect(null, { ...actions })(ItemTodo);
