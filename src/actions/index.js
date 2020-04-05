import {
  ADD_TASK,
  REMOVE_TASK,
  CHANGE_TASK,
  COMPLETED_TASK,
  ALL_COMPLETED_TASK,
  REMOVE_COMPLETED_TASK,
  ADD_TASKS
} from "../type";

export const addTasks = item => {
  return {
    type: ADD_TASK,
    payload: item
  };
};

export const addItems = items => {
  return {
    type: ADD_TASKS,
    payload: items
  }
}

export const removeTasks = id => {
  return {
    type: REMOVE_TASK,
    payload: { id }
  };
};

export const changeTasks = (id, text) => {
  return {
    type: CHANGE_TASK,
    payload: { id, text }
  };
};

export const completedTasks = id => {
  return {
    type: COMPLETED_TASK,
    payload: { id }
  };
};

export const allCompletedTasks = allCompleted => {
  return {
    type: ALL_COMPLETED_TASK,
    payload: { allCompleted }
  };
};

export const removeCompletedTasks = () => {
  return {
    type: REMOVE_COMPLETED_TASK
  };
};
