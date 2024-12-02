import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.tsx";

const TossPage = lazy(() => import("../pages/toss/TossPage"));
const SuccessPage = lazy(() => import("../pages/toss/SuccessPage"));
const FailPage = lazy(() => import("../pages/toss/FailPage"));

const Loading = <LoadingPage />;

const tossRouter: RouteObject = {
    path: "toss",
    element: <Suspense fallback={Loading}><TossPage /></Suspense>,
    children: [
        {
            path: "success",
            element: <Suspense fallback={Loading}><SuccessPage /></Suspense>,
        },
        {
            path: "fail",
            element: <Suspense fallback={Loading}><FailPage /></Suspense>,
        },
    ],
};

export default tossRouter;
