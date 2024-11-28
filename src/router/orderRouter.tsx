import LoadingPage from "../pages/LoadingPage.tsx";
import {lazy, Suspense} from "react";


const Loading = <LoadingPage></LoadingPage>
const OrderIndex = lazy(() => import("../pages/order/OrderIndexPage"))

const orderRouter = {
    path: '/order',
    element: <Suspense fallback={Loading}><OrderIndex/></Suspense>,
    children: [

    ]

}

export default orderRouter