import LoadingPage from "../pages/LoadingPage.tsx";
import {lazy, Suspense} from "react";


const Loading = <LoadingPage></LoadingPage>
const FlyerIndex = lazy(() => import("../pages/flyer/FlyerIndexPage"))
const FlyerPage = lazy(() => import("../pages/flyer/FlyerReadPage"))

const flyerRouter = {
    path: '/flyer',
    element: <Suspense fallback={Loading}><FlyerIndex/></Suspense>,
    children: [
        {
            path: "read",
            element: <Suspense fallback={Loading}><FlyerPage/></Suspense>,
        },
    ]

}

export default flyerRouter