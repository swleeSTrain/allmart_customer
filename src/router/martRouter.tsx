import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage"; // 로딩 화면 컴포넌트

// MartPage를 동적 로딩
const MartPage = lazy(() => import("../pages/mart/MartPage.tsx"));

const Loading = <LoadingPage />;

const martRouter: RouteObject = {
    path: "marts",
    element: (
        <Suspense fallback={Loading}>
            <MartPage />
        </Suspense>
    ),
};

export default martRouter;
