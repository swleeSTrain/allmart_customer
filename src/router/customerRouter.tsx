import {lazy, Suspense} from "react";
import LoadingComponent from "../components/common/LoadingComponent.tsx";

const Loading = <LoadingComponent/>
const CustomerIndex = lazy(()=> import("../pages/customer/CustomerIndexPage.tsx"))
const QrImage = lazy(()=> import("../pages/customer/QrResultModalPage.tsx"))
const Signup = lazy(() => import("../pages/customer/SignUpPage.tsx"))
const SignIn = lazy(() => import("../pages/customer/CustomerPhoneSignInPage.tsx"))
const Info = lazy(() => import("../pages/customer/CustomerInfoPage.tsx"))


const customerRouter = {
    path: "/customer",
    element: <Suspense fallback={Loading}><CustomerIndex/></Suspense>,
    children: [
        {
            path: "signup",
            element: <Suspense fallback={Loading}><Signup/></Suspense>,
        },
        {
            path: "qrImage",
            element:<Suspense fallback={Loading}><QrImage></QrImage></Suspense>
        },
        {
            path: "signIn",
            element: <Suspense fallback={Loading}><SignIn/></Suspense>,
        },
        {
            path: "info",
            element: <Suspense fallback={Loading}><Info/></Suspense>,
        },
    ]
}

export default customerRouter