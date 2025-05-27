import { configureStore } from "@reduxjs/toolkit";

import TodoSlice from './slice';

const store = configureStore({
    reducer:{
        todo: TodoSlice,
    },
});

export default store;