import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as actions from "./actions/index";
import ItemForm from "./components/ItemForm";
import Footer from "./components/Footer";
import ItemList from "./components/ItemList";
import "./App.css";

const App = ({ tasks, addItems }) => {
  const [currentValueForFilter, setCurrentValueForFilter] = useState("all");

  useEffect(() => {
    console.log(tasks)
    axios
      .get('http://localhost:1234/todos/all')
      .then(res => {
        addItems(res.data)
      })
      .catch(err => console.log(err));
  }, []);



  
  const setFilter = value => {
    setCurrentValueForFilter(value);
  };

  const filterArrayOfItems = (array, condition) =>
    array.filter(item => item.completed !== condition);


  const generateArrayWithFilter = () => {
    
    switch (currentValueForFilter) {
      case "active":
        return filterArrayOfItems(tasks, true);
      case "completed":
        return filterArrayOfItems(tasks, false);
      default:
        return tasks
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="title">todos</h1>
      <div className="container">
        <ItemForm />
        <ItemList generateArrayWithFilter={generateArrayWithFilter} />
        <Footer setFilter={setFilter} />
      </div>
    </>
  );
};


const mapStateToProps = state => {
  return {
    tasks: state.tasks.items
  };
};

export default connect( mapStateToProps,{ ...actions } )(App);
