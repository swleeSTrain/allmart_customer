import {lazy, Suspense} from "react";
import LoadingComponent from "../components/common/LoadingComponent.tsx";




const Loading = <LoadingComponent/>
const Signup = lazy(() => import("../pages/customer/SignupPage.tsx"))
const Join = lazy(() => import("../pages/customer/CustomerJoinPage.tsx"))

const customerRouter = {
    path: "/customer",
    children: [
        {
            path: "signup",
            element: <Suspense fallback={Loading}><Signup/></Suspense>,
        },
        {
            path: "join",
            element: <Suspense fallback={Loading}><Join/></Suspense>,
        },
    ]
}

export default customerRouter