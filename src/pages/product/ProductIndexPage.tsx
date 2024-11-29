import {Outlet} from "react-router-dom";

function ProductIndexPage() {
    return (
        <>
            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default ProductIndexPage;