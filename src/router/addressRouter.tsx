import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage"; // 로딩 화면 컴포넌트

const AddressPage = lazy(() => import("../pages/address/AddressPage.tsx")); // 주소 입력 페이지

const addressRouter: RouteObject = {
    path: ":martID/address",
    element: (
        <Suspense fallback={<LoadingPage />}>
            <AddressPage />
        </Suspense>
    ),
};

export default addressRouter;
