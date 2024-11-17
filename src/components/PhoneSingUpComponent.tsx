
import {ChangeEvent, useState} from "react";
import {useSignUp} from "../hooks/useSignup.tsx"
import {ISignUpParam} from "../types/customer.ts";


const initialState: ISignUpParam = {
    phoneNumber: ''
};


function SignUpComponent() {

    const [param, setParam] = useState<ISignUpParam>({...initialState})

    const {doSignUp} = useSignUp()

    const handleChange = (event:ChangeEvent<HTMLInputElement>):void => {
        let name:string|undefined = event.target.name;
        const value:string|undefined = event.target.value;
        // @ts-ignore
        param[name] = value
        setParam({...param})
    }


    const handleClick = () => {
        doSignUp(param)

    }


    return (
        <div className='w-full m-6 h-1/2 border-4 flex flex-col'>



        <input
            type="text"
    name="username"
    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
    placeholder="Enter Username"
    value={param.phoneNumber}
    onChange={e => handleChange(e)}
    />


    <button onClick={handleClick} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"> Signin</button>

        </div>
);

}

export default SignUpComponent;