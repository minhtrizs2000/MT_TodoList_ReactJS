//set up redux
import { applyMiddleware, combineReducers, createStore } from 'redux'

//cai redux thunk
import reduxThunk from 'redux-thunk'

//reducer
import { TodoListReducer } from './Reducers/TodoListReducer';

const rootReducer = combineReducers({
    //chua tat ca cac state toan bo ung dung
    //(Reducer)
    TodoListReducer
});

export const store = createStore(rootReducer, applyMiddleware(reduxThunk));