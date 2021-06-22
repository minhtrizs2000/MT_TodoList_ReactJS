import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

//Themes
import { ThemeProvider } from 'styled-components'
import { TodoListDarkTheme } from '../../Themes/TodoListDarkTheme'
import { TodoListPrimaryTheme } from '../../Themes/TodoListPrimaryTheme'
import { TodoListLightTheme } from '../../Themes/TodoListLightTheme'

//Components
import { Container } from '../../Components/Containers/Container'
import { Dropdown } from '../../Components/dropdowns/dropdown'
import { Heading1, Heading2, Heading3, Heading4, Heading5 } from '../../Components/headings/heading'
import { Table, Td, Th, Thead, Tbody, Tr } from '../../Components/tables/table'
import { TextField } from '../../Components/textFields/textField'
import { StyledButton } from '../../Components/buttons/button'

//Reducer
import { TodoListReducer } from '../../Redux/Reducers/TodoListReducer'
import { addTaskAction, deleteTaskAction, doneTaskAction, getAPITodoList } from '../../Redux/Actions/TodoListAction'
import { arrTheme } from '../../Themes/ThemeManager'
import { CHANGE_THEME } from '../../Redux/Actions/TodoType'

export default function Home(props) {

    const { themeTodoList, taskList } = useSelector(state => state.TodoListReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = getAPITodoList();
        dispatch(action);
    }, [])

    const renderTodoTask = () => {
        return taskList?.map((task, index) => {

            if (!task.status) {
                return <Tr key={index}>
                    <Th>{task.taskName}</Th>
                    <Th className="text-right">
                        <StyledButton className="ml-2"><i className="fa fa-edit"></i></StyledButton>
                        <StyledButton onClick={() => {

                            dispatch(doneTaskAction(task.taskName));
                            console.log(task.taskName);

                        }} className="ml-2"><i className="fa fa-check"></i></StyledButton>
                        <StyledButton onClick={() => {

                            dispatch(deleteTaskAction(task.taskName));
                            console.log(task.taskName);

                        }} className="ml-2"><i className="fa fa-trash"></i></StyledButton>
                    </Th>
                </Tr>
            }
        })
    };

    const renderCompletedTask = () => {
        return taskList?.map((task, index) => {

            if (task.status) {
                return <Tr key={index}>
                    <Th>{task.taskName}</Th>
                    <Th className="text-right">
                        <StyledButton onClick={() => {

                            dispatch(deleteTaskAction(task.taskName));
                            console.log(task.taskName);

                        }} className="ml-2"><i className="fa fa-trash"></i></StyledButton>
                    </Th>
                </Tr>
            }
        })
    };

    const renderTheme = ()=>{
        return arrTheme.map((theme, index)=>{
            return <option key={index} value={theme.id}>{theme.name}</option>
        })
    }

    const formik = useFormik({
        initialValues: {
            taskName: '',
            status: false,
        },
        validationSchema: Yup.object().shape({
            taskName: Yup.string().required('Task Required !!!'),
        }),
        onSubmit: (values) => {
            // gửi thông về back end
            dispatch(addTaskAction(values));
            console.log(values)
        }
    });

    const { handleChange, handleBlur, handleSubmit, touched, errors } = formik;

    return (
        <ThemeProvider theme={themeTodoList}>
            <Container className="w-50 mt-5">
                <Dropdown onChange={(e)=>{
                    let {value} = e.target;

                    dispatch({
                        type: CHANGE_THEME,
                        themeID: value
                    })
                }}>
                    {renderTheme()}
                </Dropdown>
                <Heading2>Todo List</Heading2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <TextField className="w-50" name="taskName" label="Task Name" onChange={handleChange} onBlur={handleBlur} />
                        <StyledButton onClick={() => {
                            // dispatch(addTask(formik.values.taskName));
                            // console.log(formik.values.taskName);
                        }} type="submit" className="ml-2"> <i className="fa fa-plus"></i> Add Task</StyledButton>
                        <StyledButton className="ml-2"> <i className="fa fa-upload"></i> Update Task</StyledButton>
                        {touched.taskName && errors.taskName && <p className="text-danger d-block">{formik.errors.taskName}</p>}
                    </div>
                </form>
                <Heading3 className="mt-4">Task To Do</Heading3>
                <Table className="mt-2">
                    <Thead>
                        {renderTodoTask()}
                    </Thead>
                </Table>
                <Heading3 className="mt-4">Task Completed</Heading3>
                <Table className="mt-2">
                    <Thead>
                        {renderCompletedTask()}
                    </Thead>
                </Table>
            </Container>
        </ThemeProvider>
    )
}