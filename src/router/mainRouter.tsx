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
import qnaRouter from "./qnaRouter.tsx";

import OAuthCallbackComponent from "../components/customer/OAuthCallbackComponent.tsx";

const MainPage = lazy(() => import("../pages/MainPage"));
const SocialLoginMainPage = lazy(() => import("../pages/SocialLoginMainPage"));

const Loading = <LoadingPage />;

const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><SocialLoginMainPage /></Suspense>,
        //element: <Suspense fallback={Loading}><CustomerIndexPage></CustomerIndexPage></Suspense>
        //element: <Suspense fallback={Loading}><CustomerPhoneSignInPage></CustomerPhoneSignInPage></Suspense>
    },
    {
        path: "/socialMap",
        element: <Suspense fallback={Loading}><SocialLoginMainPage></SocialLoginMainPage></Suspense>
    },
    {
        path: "/:martID",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>,
        children:[


        ]
    },
    {
        path : "/oauth/kakao",
        element:<Suspense fallback={Loading}><OAuthCallbackComponent /></Suspense>
    },

    pointRouter,
    customerRouter,
    orderRouter,
    addressRouter,
    productRouter,
    flyerRouter,
    martRouter,
    tossRouter,
    qnaRouter


]);

export default mainRouter;
