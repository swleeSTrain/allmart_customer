import LoadingPage from "../pages/LoadingPage.tsx";
import { lazy, Suspense } from "react";

const Loading = <LoadingPage></LoadingPage>
const ProductIndex = lazy(() => import("../pages/product/ProductIndexPage"))
const ProductListPage = lazy(() => import("../pages/product/ProductListPage"))

const productRouter = {
    path: 'product',
    element: <Suspense fallback={Loading}><ProductIndex/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductListPage/></Suspense>,
        },
    ]

}

export default productRouter
