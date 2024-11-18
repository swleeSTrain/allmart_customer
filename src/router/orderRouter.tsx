import LoadingPage from "../pages/LoadingPage.tsx";
import {lazy, Suspense} from "react";


const Loading = <LoadingPage></LoadingPage>
const OrderIndex = lazy(() => import("../pages/order/OrderIndexPage"))
const OrderVoice = lazy(() => import("../pages/order/OrderVoicePage"))

const orderRouter = {
    path: '/order',
    element: <Suspense fallback={Loading}><OrderIndex/></Suspense>,
    children: [
        {
            path: "voice",
            element: <Suspense fallback={Loading}><OrderVoice/></Suspense>,
        },
    ]

}

export default orderRouter