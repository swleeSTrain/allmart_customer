import {lazy, Suspense} from "react";

const CustomerIndex = lazy(()=> import("../pages/customer/CustomerIndexPage.tsx"))
const SignIn = lazy(() => import("../pages/customer/CustomerPhoneSignInPage.tsx"))
const Info = lazy(() => import("../pages/customer/CustomerInfoPage.tsx"))
// const CustomerUpdate = lazy(() => import("../pages/customer/CustomerUpdatePage.tsx"))

const customerRouter = {
    path: "customer",
    element: <Suspense><CustomerIndex/></Suspense>,
    children: [
        {
            path: "signIn",
            element: <Suspense><SignIn/></Suspense>,
        },
        {
            path: "info",
            element: <Suspense><Info/></Suspense>,
        },
    ]
}

export default customerRouter