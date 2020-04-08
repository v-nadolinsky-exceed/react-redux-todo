import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { toast } from "react-toastify";
import "./Footer.css";

const Footer = ({ removeCompletedItems, setFilter, tasks }) => {
  const removeCompletedTask = () => {
    removeCompletedItems();
    toast.warn("Remove completed task");
  };

  const amountActive = () => {
    const active = [...tasks.items].filter((item) => item.completed === false);
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

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps, { ...actions })(Footer);
