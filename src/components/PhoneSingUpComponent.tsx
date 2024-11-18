
import {ChangeEvent, useState} from "react";
import useSignUp from "../hooks/useSignup.ts"
import {ISignUpParam} from "../types/customer.ts";


const initialState: ISignUpParam = {
    phoneNumber: ''
};


function SignUpComponent() {

    const [param, setParam] = useState<ISignUpParam>({...initialState})

    const {doSignUp} = useSignUp()

    const handleChange = (event:ChangeEvent<HTMLInputElement>):void => {
        let name:string|undefined = event.target.name as keyof ISignUpParam;
        const value:string|undefined = event.target.value;

        //param[name] = value
        //setParam({...param})

        setParam((prevParam)=> ({
            ...prevParam,
            [name] : value,
        }))
    }


    const handleClick = () => {
        doSignUp(param)

    }


    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className='w-full m-6 h-1/2 border-4 flex flex-col md:max-w-md'>
                <h1 className="text-2xl font-bold text-center mb-9 mt-8">Sign Up</h1>
                <input
                    type="text"
                    name="phoneNumber"
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 mb-14"
                    placeholder="Enter phone number"
                    value={param.phoneNumber}
                    onChange={e => handleChange(e)}
                />


                <button onClick={handleClick}
                        className="bg-blue-500 text-white py-4 px-4 rounded-md hover:bg-blue-600 transition duration-300"> Signup
                </button>

            </div>
        </div>
    );

}

export default SignUpComponent;