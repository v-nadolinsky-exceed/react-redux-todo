import axios from "axios";

import {
  ADD_TASK,
  REMOVE_TASK,
  CHANGE_TASK,
  COMPLETED_TASK,
  ALL_COMPLETED_TASK,
  REMOVE_COMPLETED_TASK,
  ADD_TASKS
} from "../type";


export const addItem = (newElem) => {
  return dispatch => {
    axios
        .post(`http://localhost:1234/todos/create`, { ...newElem })
        .then(res => {
          dispatch({ type: ADD_TASK, payload: res.data })
        })
        .catch(err => console.error("err", err));
  }
}

export const addItems = () => {
  return dispatch => {
    axios
      .get('http://localhost:1234/todos/all')
      .then(res => {
        dispatch({ type: ADD_TASKS, payload: res.data })
      })
      .catch(err => console.log(err));
  }
}

export const removeItems = (id) => {
  return dispatch => {
    axios
      .delete(`http://localhost:1234/todos/${id}/delete`)
      .then(res => {
        dispatch({ type: REMOVE_TASK, payload: { id } })
      })
      .catch(err => console.error(err));
  }
}

export const changeItem = (id, text) => {
  return dispatch => {
    axios
      .put(`http://localhost:1234/todos/${id}/update`, { text })
      .then(res => {
        dispatch({ type: CHANGE_TASK, payload: { id, text } })
      })
      .catch(err => console.error(err));
  }
}

export const completedItem = (id, completed) => {
  return dispatch => {
    axios
      .put(`http://localhost:1234/todos/${id}/completed`, { completed })
        .then(res => {
        dispatch({ type: COMPLETED_TASK, payload: { id } })
      })
      .catch(err => console.error(err));
  }
}

export const allCompletedItems = (allCompleted) => {
  return dispatch => {
    axios
      .put(`http://localhost:1234/todos/update`, { completed: !allCompleted })
      .then(res => {
        dispatch({ type: ALL_COMPLETED_TASK, payload: { allCompleted } })
      })
      .catch(err => console.log(err));
  }
}

export const removeCompletedItems = () => {
  return dispatch => {
    axios
    .delete(`http://localhost:1234/todos/deletecompl`)
    .then(res => {
      dispatch({ type: REMOVE_COMPLETED_TASK })
    })
    .catch(err => console.error(err));
  }
}