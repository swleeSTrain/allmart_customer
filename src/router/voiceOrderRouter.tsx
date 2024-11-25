import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage"; // 로딩 화면 컴포넌트

const VoiceOrderPage = lazy(() => import("../pages/point/PointPage.tsx")); // 포인트 조회 페이지

const pointRouter: RouteObject = {
    path: "/voice/order",
    element: (
        <Suspense fallback={<LoadingPage />}>
            <VoiceOrderPage />
        </Suspense>
    ),
};

export default pointRouter;
