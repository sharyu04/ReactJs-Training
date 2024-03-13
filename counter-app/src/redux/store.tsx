import { configureStore, createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {
        increment: (state, action) => {
            state = state+1
        },
        decrement: (state, action) => {
            state = state - 1
        }
    }
})

export const store = configureStore({
        reducer: counterSlice.reducer
    });

export const{increment, decrement} = counterSlice.actions
