import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState: number = 0
const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
             return state + 1
        },
        decrement: (state) => {
             return state - 1
        }
    }
})

export const store = configureStore({
        reducer: counterSlice.reducer
    });

export const{increment, decrement} = counterSlice.actions
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
