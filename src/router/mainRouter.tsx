import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage.tsx";

import customerRouter from "./customerRouter.tsx"; // pointRouter 를 import
import pointRouter from "./pointRouter";
import addressRouter from "./addressRouter.tsx";
import orderRouter from "./orderRouter.tsx";
import productRouter from "./productRouter.tsx";
import flyerRouter from "./flyerRouter.tsx"; // pointRouter를 import
import martRouter from "./martRouter.tsx";
import tossRouter from "./tossRouter.tsx";

// const MainPage = lazy(() => import("../pages/MainPage"));
const SocialLoginMainPage = lazy(() => import("../pages/SocialLoginMainPage"));

const Loading = <LoadingPage />;

const mainRouter = createBrowserRouter([
    {
        path: "/",
        // element: <Suspense fallback={Loading}><MainPage /></Suspense>,
        element: <Suspense fallback={Loading}><SocialLoginMainPage /></Suspense>,
    },
    {
        path: "/:martId",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    // pointRouter 추가
    pointRouter,
    customerRouter,
    orderRouter,
    addressRouter,
    productRouter,
    flyerRouter,
    martRouter,
    tossRouter

]);

export default mainRouter;
