import { ADD_TASK, REMOVE_TASK, CHANGE_TASK, COMPLETED_TASK, ALL_COMPLETED_TASK, REMOVE_COMPLETED_TASK } from "../type";

const InitialState = () => {
    return {
       items : []
    }
}


export const itemReducer = (state = InitialState() ,action) => {
    switch (action.type) {
        case ADD_TASK :
            return { ...state, items: [...state.items, action.payload] }
        case REMOVE_TASK: 
        console.log(state)
            return { items: [...state.items.filter( task => task._id !== action.payload.id ) ]} 
        case CHANGE_TASK:
            return { items: [...state.items.map( task => {
                if( task._id === action.payload.id) {
                    return { ...task , text : action.payload.text }
                }
            })]}
        case COMPLETED_TASK:
            return { items: [...state.items.map(task => {
                if (task._id === action.payload.id ) {
                  return { ...task, completed: !task.completed };
                }
                return task
              })]}
        case ALL_COMPLETED_TASK:
            return {items: [...state.items.map(task => {
                        if (action.payload.allCompleted) return { ...task, completed: false };
                        else return { ...task, completed: true };
                    })]}
        case REMOVE_COMPLETED_TASK:
            return {items: [...state.items.filter(elem => {
                return elem.completed === false;
                    })]}
        default :
            return state
    }

}