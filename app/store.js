import { configureStore } from '@reduxjs/toolkit';
import storeFunction from './features/counterSlice';

const store = configureStore({
    reducer: {
        myStore: storeFunction
    }
})
export default store;