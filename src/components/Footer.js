import React from "react";
import { connect } from "react-redux";
import { removeCompletedTasks } from "../actions/index";
import axios from "axios";
import { toast } from "react-toastify";
import "./Footer.css";

const Footer = ({ removeCompletedItem, setFilter, tasks}) => {
  const removeCompletedTask = () => {
    axios
      .delete(`http://localhost:1234/todos/deletecompl`)
      .then(res => {
        removeCompletedItem();
        toast.warn("Remove completed task");
      })
      .catch(err => console.error(err));
  };

  const amountActive = () => {
    const active = [...tasks.items].filter(item => item.completed === false);
    return active.length;
  };


  return (
    <div className="footer">
      <div className="footer__total-active">{amountActive()}:item left</div>
      <div className="btn__wrap">
        <button className="btn btn_all" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="btn btn_active" onClick={() => setFilter("active")}>
          Active
        </button>
        <button
          className="btn btn_completed"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <a href="#" className="footer__link" onClick={removeCompletedTask}>
        Clear completed
      </a>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    removeCompletedItem: () => {
      dispatch(removeCompletedTasks());
    }
  };
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
