import {Outlet} from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout.tsx";

function ProductIndexPage() {
    return (
        <BasicLayout>
            <div>Order Index Page</div>

            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </BasicLayout>
    );
}

export default ProductIndexPage;