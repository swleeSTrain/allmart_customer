import LoadingPage from "../pages/LoadingPage.tsx";
import {lazy, Suspense} from "react";


const Loading = <LoadingPage></LoadingPage>
const OrderIndex = lazy(() => import("../pages/order/OrderIndexPage"))
const OrderVoice = lazy(() => import("../pages/order/OrderVoicePage"))
const OrderList = lazy(() => import("../pages/order/OrderListPage"))
const TemporaryOrder= lazy(() => import("../pages/order/TemporaryOrderPage.tsx"))

const orderRouter = {
    path: 'orders',
    element: <Suspense fallback={Loading}><OrderIndex/></Suspense>,
    children: [
        {
            path: "voice",
            element: <Suspense fallback={Loading}><OrderVoice/></Suspense>,
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><OrderList/></Suspense>,
        },
        {
            path: "temporary",
            element: <Suspense fallback={Loading}><TemporaryOrder/></Suspense>
        }
    ]

}

export default orderRouter