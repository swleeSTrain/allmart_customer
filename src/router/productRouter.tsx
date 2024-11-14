import LoadingPage from "../pages/LoadingPage.tsx";
import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";


const Loading = <LoadingPage></LoadingPage>

const ProductList = lazy(() => import("../pages/product/ProductListPage"))

const productRouter = {
    path: '/product',
    element: <Suspense fallback={Loading}><ProductList/></Suspense>,
    children: [
        {
            path: "",
            element: <Navigate to='list' replace={true}></Navigate>
        }
    ]

}

export default productRouter