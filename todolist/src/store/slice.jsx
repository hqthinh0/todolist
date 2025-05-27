import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoList: [],
    sortCriteria: "all",
    searchTerm: "",
};

const TodoSlice = createSlice ({
    name: "todo",
    initialState,
    reducers:{
        setTodoList : (state, action) =>{
            state.todoList = action.payload;
        },
        addTodo: (state , action) =>{
            state.todoList.push({
                task: action.payload.task,
                id: action.payload.id,
                description: action.payload.description || "", 
                status: action.payload.status || "Todo",
            });
        },
        sortTodo: (state, action) => {
            state.sortCriteria = action.payload;
        },
        setSearchTerm: (state, action) =>{
            state.searchTerm = action.payload;
        },
        updateTodo: (state, action) =>{
            const {id, task} = action.payload;
            const index = state.todoList.findIndex((todo) => todo.id === id);
            state.todoList[index].task = task;
        },
    }
});
export const {setTodoList, addTodo, sortTodo, setSearchTerm, updateTodo } = TodoSlice.actions;

export default TodoSlice.reducer;