import axios from 'axios'
import { ADD_TASK, GET_TASK } from './TodoType';

export const getAPITodoList = () => {
    return async (dispatch) => {
        try{
            let result = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/GetAllTask`,
                method: 'GET'
            });

            const action = {
                type: GET_TASK,
                dataTask: result.data
            }

            console.log('Result: ', result.data);
            dispatch(action);

        }catch(errors){
            console.log('ERROR: ', errors.response.data);
        }
    }
}

export const addTaskAction = (taskName) => {
    return async (dispatch) => {
        try{
            console.log(taskName);
            const result = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/AddTask`,
                method: 'POST',
                data: taskName
            });

            dispatch(getAPITodoList());
            console.log('Result: ', result.data);

        }catch(errors){
            console.log('ERROR: ', errors.response.data);
        }
    }
}

export const doneTaskAction = (taskName) => {
    return async (dispatch) => {
        try{
            console.log('taskName: ', taskName);
            const result = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
                method: 'PUT',
            });

            dispatch(getAPITodoList());
            console.log('Result: ', result.data);

        }catch(errors){
            console.log('ERROR: ', errors.response.data);
        }
    }
}

export const deleteTaskAction = (taskName) => {
    return async (dispatch) => {
        try{
            const result = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: 'DELETE',
            });

            dispatch(getAPITodoList());
            console.log('Result: ', result.data);

        }catch(errors){
            console.log('ERROR: ', errors.response.data);
        }
    }
}