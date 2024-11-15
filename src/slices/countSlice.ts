import {createSlice} from "@reduxjs/toolkit";

export interface ICount {
    num: number
}

const initialState: ICount = {
    num: 5,
}

const countSlice = createSlice({
    name: "count",
    initialState: initialState,
    reducers: {
        increment: (state, action) => {
            console.log("increment")
            console.log(state, action)

            return {num: state.num + 1}
        },
        decrement: (state, action) => {
            console.log("decrement")
            console.log(state, action)

            return {num: state.num - 1}
        }
    }
})

export const {increment, decrement} = countSlice.actions

export default countSlice.reducer