import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'myStore',
    initialState: {
        value: "",
    },
    reducers: {
        userID: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { getData } = slice.actions;
export const data = state => state.counter.value;
export default slice.reducer;

