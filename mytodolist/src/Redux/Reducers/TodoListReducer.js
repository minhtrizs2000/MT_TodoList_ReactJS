import { arrTheme } from "../../Themes/ThemeManager";
import { TodoListDarkTheme } from "../../Themes/TodoListDarkTheme";
import { TodoListLightTheme } from "../../Themes/TodoListLightTheme";
import { TodoListPrimaryTheme } from "../../Themes/TodoListPrimaryTheme"
import { ADD_TASK, CHANGE_THEME, GET_TASK } from "../Actions/TodoType";

const stateDefault = {
    themeTodoList: TodoListDarkTheme,
    taskList: []
}

export const TodoListReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_TASK:{
            state.taskList = action.dataTask;
            return {...state};
        }
        case CHANGE_THEME:{
            let theme = arrTheme.find(theme=>theme.id==action.themeID);
            if(theme){
                state.themeTodoList = {...theme.value};
            }
            return {...state};
        }
        default:
            return { ...state }
    }
}
