import {useAppDispatch, useAppSelector} from"./rtk.tsx";
import {ICustomAsyncThunkConfig, ICustomer, ISignUpParam} from "../types/customer.ts";
import {postSignUpThunk} from "../slices/signupSlice.ts";
import {Cookies} from"react-cookie";
import {Dispatch} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../store.ts";
import {postSignUp} from "../api/customerAPI.ts";



const cookies = new Cookies();

const loadCookie = () => {
    const customerCookie = cookies.get("customer")
    return customerCookie
}


const dispatch = useAppDispatch();

const useSignUp = () => {

    let customer = useAppSelector(state => state.signup);

    if (!customer.phoneNumber) {
        customer = loadCookie()
    }
    try{
        const doSignUp = async (param1: ICustomer, param2:ISignUpParam ,param3:ICustomAsyncThunkConfig) => await dispatch(postSignUpThunk(param1,param2,param3));
    }


}

