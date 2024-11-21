import {lazy, Suspense} from "react";


const ItemList = lazy(()=> import("../../src/pages/template/ItemListPage.tsx"))

const templateRouter = {
    path: "/",
    children: [
        {
            path: "itemList",
            element: <Suspense><ItemList></ItemList></Suspense>
        },


    ]
}

export default templateRouter