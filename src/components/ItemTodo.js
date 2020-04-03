import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { removeTasks, changeTasks, completedTasks } from "../actions/index";
import { toast } from "react-toastify";
import "./ItemTodo.css";

const ItemTodo = ({
  removeTask,
  changeTask,
  completedItem,
  _id,
  completed,
  text
}) => {
  const [inputStateAfterClicks, setInputStateAfterClicks] = useState(true);

  const [inputValue, setInputValue] = useState(text);

  const saveInput = event => {
    if (event.key === "Enter") {
      setInputStateAfterClicks(true);
      getTask(event.currentTarget.id, inputValue);
    }
  };

  const getTask = (id, value) => {
    axios
      .put(`http://localhost:1234/todos/${id}/update`, { text: value })
      .then(res => {
        changeTask(id, value);
      })
      .catch(err => console.error(err));
  };

  const newValueTask = event => {
    let value = event.target.value;
    setInputValue(value);
  };

  const handlDblClick = () => {
    setInputStateAfterClicks(inputStateAfterClick => !inputStateAfterClick);
  };

  const completedTask = (id, completed) => {
    axios
      .put(`http://localhost:1234/todos/${id}/completed`, { completed })
      .then(res => {
        completedItem(id);
        toast.success(`Task completed:${res.data.text}`);
      })
      .catch(err => console.error(err));
  };

  const removeOnClick = id => {
    axios
      .delete(`http://localhost:1234/todos/${id}/delete`)
      .then(res => {
        return removeTask(id);
      })
      .catch(err => console.error(err));
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
      <span onClick={() => removeOnClick(_id)} className="close"></span>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    removeTask: id => {
      dispatch(removeTasks(id));
    },
    changeTask: (id, text) => {
      dispatch(changeTasks(id, text));
    },
    completedItem: id => {
      dispatch(completedTasks(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(ItemTodo);
