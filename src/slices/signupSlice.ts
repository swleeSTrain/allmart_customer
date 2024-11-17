import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICustomAsyncThunkConfig, ICustomer, ISignUpParam} from "../types/customer.ts";
import {Cookies} from "react-cookie";
import {postSignUp} from "../api/customerAPI.ts";
import {increment} from "./countSlice.ts";

const cookies = new Cookies();

const initialState: ICustomer = {
    name: '',
    phoneNumber: '',
    loyaltyPoints: 0,
    social: false,
    accessToken: '',
    refreshToken: '',
};


const customerConfig : ICustomAsyncThunkConfig;

export const postSignUpThunk
    = createAsyncThunk<ICustomer,ISignUpParam,ICustomAsyncThunkConfig>('postSignUpThunk', postSignUp, customerConfig );


const signUpSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        signup: (state, action) => {
            console.log(state, action)
            const phoneNumber = action.payload.phoneNumber
            const result = {phoneNumber:phoneNumber}
            cookies.set("customer",JSON.stringify(result), {path : "/", maxAge:3600})
            state.value.phoneNumber = phoneNumber
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(postSignUpThunk.fulfilled, (state:ICustomer, action) => {
                console.log("postSignUpThunk.fulfilled")
                const result = action.payload
                return result;

            })
            .addCase(postSignUpThunk.pending, (state) => {
                console.log("postSignUpThunk.pending")
            })

    }




)

export const signupReducer = signUpSlice.reducer;
