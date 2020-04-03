import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addTasks } from "./actions/index";
import { ToastContainer} from "react-toastify";
import ItemForm from "./components/ItemForm";
import Footer from "./components/Footer";
import ItemList from "./components/ItemList";
import "./App.css";

const App = ({ tasks, addItem }) => {
  const [arrayOfTask, setArrayOfTask] = useState([]);
  const [currentValueForFilter, setCurrentValueForFilter] = useState("all");

  useEffect(() => {
    axios
      .get('http://localhost:1234/todos/all')
      .then(res => {
        addItem(res.data)
        console.log(tasks.items)
        setArrayOfTask([...tasks.items]);
      })
      .catch(err => console.log(err));
  }, []);


  const setFilter = value => {
    setCurrentValueForFilter(value);
  };

  const filterArrayOfItems = (array, condition) =>
    array.filter(item => item.completed !== condition);

  const generateArrayWithFilter = () => {
    // console.log(arrayOfTask)
    switch (currentValueForFilter) {
      case "active":
        return filterArrayOfItems(arrayOfTask, true);
      case "completed":
        return filterArrayOfItems(arrayOfTask, false);
      default:
        return arrayOfTask;
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

const mapDispatchToProps = dispatch => {
  return {
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

export default connect(mapStateToProps,mapDispatchToProps)(App);
