import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import pointRouter from "./pointRouter";
import addressRouter from "./addressRouter.tsx";
import martRouter from "./martRouter.tsx";

const MainPage = lazy(() => import("../pages/MainPage"));

export const Loading = <LoadingPage />;

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    // pointRouter 추가
    pointRouter,
    addressRouter,
    martRouter,
]);

export default mainRouter;
