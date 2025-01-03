import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage"; // 로딩 화면 컴포넌트

const PointsPage = lazy(() => import("../pages/point/PointPage.tsx")); // 포인트 조회 페이지

const pointRouter: RouteObject = {
    path: "points",
    element: (
        <Suspense fallback={<LoadingPage />}>
            <PointsPage />
        </Suspense>
    ),
};

export default pointRouter;
