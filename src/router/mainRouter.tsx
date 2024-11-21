import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../pages/LoadingPage.tsx";

import customerRouter from "./customerRouter.tsx"; // pointRouter를 import
import pointRouter from "./pointRouter";
import orderRouter from "./orderRouter.tsx";
import templateRouter from "./templateRouter.tsx";


const MainPage = lazy(() => import("../pages/template/MainPage.tsx"));

export const Loading = <LoadingPage />;

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
    },
    // pointRouter 추가
    pointRouter,
    customerRouter,
    orderRouter,
    templateRouter,

]);

export default mainRouter;
