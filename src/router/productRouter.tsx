import LoadingPage from "../pages/LoadingPage.tsx";
import { lazy, Suspense } from "react";

const Loading = <LoadingPage></LoadingPage>
const ProductIndex = lazy(() => import("../pages/product/ProductIndexPage"))
const ProductListPage = lazy(() => import("../pages/product/ProductListPage"))
const ProductSearchPage = lazy(() => import("../pages/product/ProductSearchPage"))
const ProductReadPage = lazy(() => import("../pages/product/ProductReadPage"))

const productRouter = {
    path: 'product',
    element: <Suspense fallback={Loading}><ProductIndex/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductListPage/></Suspense>,
        },
        {
            path: "search",
            element: <Suspense fallback={Loading}><ProductSearchPage/></Suspense>,
        },
        {
            path: "read/:productID",
            element: <Suspense fallback={Loading}><ProductReadPage/></Suspense>,
        },
    ]

}

export default productRouter
