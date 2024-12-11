import {lazy, Suspense} from "react";
import QrResultModal from "../components/customer/SingUpResultModal.tsx";

const CustomerIndex = lazy(()=> import("../pages/customer/CustomerIndexPage.tsx"))
const SignIn = lazy(() => import("../pages/customer/CustomerPhoneSignInPage.tsx"))
const Info = lazy(() => import("../pages/customer/CustomerInfoPage.tsx"))


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
        {
            path:"qr",
            element: <Suspense><QrResultModal callback={}/></Suspense>
        }
    ]
}

export default customerRouter