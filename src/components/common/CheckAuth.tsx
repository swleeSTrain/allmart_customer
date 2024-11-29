import {Navigate} from "react-router-dom";
import useSignup from "../../hooks/useSignup.ts";

function CheckAuth({children}: {children: React.ReactNode}) {

    const {customer} = useSignup()

    if(!customer) {
        return <Navigate to={'/customer/signup'} replace={true}></Navigate>
    }

    return (
        <>
            <div>Check Auth</div>
            {children}
        </>
    );
}

export default CheckAuth;