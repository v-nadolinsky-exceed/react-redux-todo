import { combineReducers } from 'redux';

import { itemReducer } from './itemReducer';
import { appReducer } from './appReducer'

const rootReducer = combineReducers ({
    app : appReducer,
    tasks : itemReducer
});

export default rootReducer;