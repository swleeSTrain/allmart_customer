import {useAppDispatch, useAppSelector} from"./rtk.tsx";
import {Cookies} from"react-cookie";
import {ISignUpParam, ICustomer} from "../types/customer.ts";
import {postSignUpThunk, signout} from "../slices/signupSlice.ts";




const cookies = new Cookies();

const loadCookie = () => {
    const customerCookie = cookies.get("customer")
    return customerCookie
}




const useSignUp = () => {

    console.log("useSignUp")
    const dispatch = useAppDispatch();
    let customer:ICustomer = useAppSelector(state => state.signup);
    if (!customer.phoneNumber) {
        customer = loadCookie()
    }



const doSignUp = (param: ISignUpParam) => {
    console.log("Sending param:", param); // param 출력
    dispatch(postSignUpThunk(param))
        .unwrap()
        .then(data => {
            console.log("unwrap")
            console.log(data)
            cookies.set("customer", data, {path:"/"})
        }).catch((error) => {
        console.error("Error during sign-up:", error);
    });
}

const doSignOut = () => {
    dispatch(signout(null))
    cookies.remove("member", {path:"/"})
}

return {customer, doSignUp, doSignOut}
}


export default useSignUp