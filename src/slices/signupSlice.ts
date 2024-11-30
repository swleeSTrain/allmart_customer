import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ICustomer, ISignUpParam} from "../types/customer.ts";
import {Cookies} from "react-cookie";
import {postSignUp} from "../api/CustomerAPI.ts";


const cookies = new Cookies();

const initialState: ICustomer = {
    name: '',
    phoneNumber: '',
    loyaltyPoints: 0,
    social: false,
    accessToken: '',
    refreshToken: '',
};



export const postSignUpThunk
    = createAsyncThunk<ICustomer,ISignUpParam>('postSignUpThunk', postSignUp);


const signUpSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        signup: (state, action) => {
            console.log(state, action)
            const phoneNumber = action.payload.phoneNumber
            const result = {phoneNumber:phoneNumber}
            cookies.set("customer",JSON.stringify(result), {path : "/", maxAge:3600})
            state.phoneNumber = phoneNumber
        },
        signout: (state, action) => {
            console.log(state,action)
            return {...initialState}
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(postSignUpThunk.fulfilled, (state:ICustomer, action) => {
                console.log("Thunk fulfilled with payload:", action.payload);
                const result = action.payload
                return result;

            })
            .addCase(postSignUpThunk.pending, (state) => {
                console.log("postSignUpThunk.pending")
                return state;
            })

    }




)

export const signupReducer = signUpSlice.reducer;
export const {signup, signout} = signUpSlice.actions;
