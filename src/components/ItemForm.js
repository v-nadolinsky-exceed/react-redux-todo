import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { toast } from "react-toastify";
import "./ItemForm.css";

const ItemForm = ({ allCompletedItems, tasks, addItem }) => {
  
  const [allCompleted, setAllCompleted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = event => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const addTask = event => {
    if (event.key === "Enter" && event.target.value !== "") {
      const newElem = { text: inputValue, completed: false };
      addItem(newElem)
      setInputValue("");
      toast(`Add task: ${inputValue}`);
    }
  };
 
  const allCompleteds = () => {
    if (allCompleted) toast.info("No tasks marked");
    else toast.info("All tasks marked");
    allCompletedItems(allCompleted)
    setAllCompleted(allCompleted => !allCompleted);
  };

  return (
    <div className="header">
      <div onClick={allCompleteds}>
        <button
          className={`arrowdown ${tasks.length && "active"}`}
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

const mapStateToProps = state => {
  return {
    tasks: state.tasks.items || []
  };
};

export default connect(mapStateToProps, { ...actions })(ItemForm);
