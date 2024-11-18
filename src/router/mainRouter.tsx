import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import pointRouter from "./pointRouter";
import customerRouter from "./customerRouter.tsx"; // pointRouter를 import

const MainPage = lazy(() => import("../pages/MainPage"));

export const Loading = <LoadingPage />;

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    // pointRouter 추가
    pointRouter,
    customerRouter
]);

export default mainRouter;
