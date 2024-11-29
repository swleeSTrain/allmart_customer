import {lazy, Suspense} from "react";
import LoadingComponent from "../components/common/LoadingComponent.tsx";




const Loading = <LoadingComponent/>
const QrImage = lazy(()=> import("../pages/customer/QrResultModalPage.tsx"))
const Signup = lazy(() => import("../pages/customer/SignUpPage.tsx"))
const customerRouter = {
    path: "/customer",
    children: [
        {
            path: "signup",
            element: <Suspense fallback={Loading}><Signup/></Suspense>,
        },
        {
            path: "qrImage",
            element:<Suspense fallback={Loading}><QrImage></QrImage></Suspense>
        }
    ]
}

export default customerRouter