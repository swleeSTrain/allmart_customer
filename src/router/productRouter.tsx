import LoadingPage from "../pages/LoadingPage.tsx";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loading = <LoadingPage />;

const PointsPage = lazy(() => import("../pages/point/PointPage.tsx"));

const pointRouter = {
    path: "/points",
    element: <Suspense fallback={Loading}><PointsPage /></Suspense>,
    children: [
        {
            path: "",
            element: <Navigate to="/points" replace={true} />,
        },
    ],
};

export default pointRouter;
