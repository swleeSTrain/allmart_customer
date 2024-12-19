import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import {useCustomerCookie} from "../hooks/useCustomerCookie.ts";

const Loading =<LoadingPage></LoadingPage>
const CustomerIndex = lazy(()=> import("../pages/customer/CustomerIndexPage.tsx"))
const SignIn = lazy(() => import("../pages/customer/CustomerPhoneSignInPage.tsx"))
const Info = lazy(() => import("../pages/customer/CustomerInfoPage.tsx"))
const CustomerUpdate = lazy(() => import("../pages/customer/CustomerUpdatePage.tsx"))




const customerRouter = {
    path: "/:martID/customer",
    element: <Suspense fallback={Loading}><CustomerIndex/></Suspense>,
    children: [
        {
            path: "signIn",
            element: <Suspense fallback={Loading}><SignIn/></Suspense>,

        },
        {
            path: "info",
            element: <Suspense fallback={Loading}><Info/></Suspense>,
        },
        {
            path: "update",
            element: <Suspense fallback={Loading}><CustomerUpdate/></Suspense>,

        }


    ]
}

export default customerRouter