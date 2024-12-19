import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const TossIndex = lazy(() => import("../pages/toss/TossIndexPage"))
const TossPage = lazy(() => import("../pages/toss/TossPage"));
const SuccessPage = lazy(() => import("../pages/toss/TossSuccessPage.tsx"));
const FailPage = lazy(() => import("../pages/toss/TossFailPage.tsx"));

const Loading = <LoadingPage />;

const tossRouter: RouteObject = {
    path: "/:martID/toss",
    element: <Suspense fallback={Loading}><TossIndex /></Suspense>,
    children: [
        {
            path: "",
            element: <Suspense fallback={Loading}><TossPage /></Suspense>,
        },
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
