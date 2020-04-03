import React, { useState } from "react";
import { connect } from "react-redux";
import { allCompletedTasks, addTasks } from "../actions/index";
import axios from "axios";
import { toast } from "react-toastify";
import "./ItemForm.css";

const ItemForm = ({ allCompletedTask, tasks, addItem }) => {
  const [allCompleted, setAllCompleted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = event => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const addTask = event => {
    if (event.key === "Enter" && event.target.value !== "") {
      const newElem = { text: inputValue, completed: false };
      axios
        .post(`http://localhost:1234/todos/create`, { ...newElem })
        .then(res => {
          addItem(res.data);
          setInputValue("");
          toast(`Add task: ${inputValue}`);
        })
        .catch(err => console.error("err", err));
    }
  };

  const allCompleteds = () => {
    axios
      .put(`http://localhost:1234/todos/update`, { completed: !allCompleted })
      .then(res => {
        if (allCompleted) toast.info("No tasks marked");
        else toast.info("All tasks marked");
        allCompletedTask(allCompleted);
        setAllCompleted(allCompleted => !allCompleted);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="header">
      <div onClick={allCompleteds}>
        <button
          className={`arrowdown ${tasks.items.length && "active"}`}
        ></button>
      </div>
      <input
        className="header__input"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={addTask}
        type="text"
        placeholder="What needs to be done?"
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    allCompletedTask: allCompleted => {
      dispatch(allCompletedTasks(allCompleted));
    },
    addItem: arr => {
      dispatch(addTasks(arr));
    }
  };
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
