import LoadingPage from "../pages/LoadingPage.tsx";
import {lazy, Suspense} from "react";


const Loading = <LoadingPage></LoadingPage>
const FlyerIndex = lazy(() => import("../pages/flyer/FlyerIndexPage"))
const FlyerBannerPage = lazy(() => import("../pages/flyer/FlyerBannerPage.tsx"))
const FlyerLinkVideoPage = lazy(() => import("../pages/flyer/FlyerBannerPage.tsx"))

const flyerRouter = {
    path: '/flyer',
    element: <Suspense fallback={Loading}><FlyerIndex/></Suspense>,
    children: [
        {
            path: "banner",
            element: <Suspense fallback={Loading}><FlyerBannerPage/></Suspense>,
        },
        {
            path: "video",
            element: <Suspense fallback={Loading}><FlyerLinkVideoPage/></Suspense>
        }
    ]

}

export default flyerRouter