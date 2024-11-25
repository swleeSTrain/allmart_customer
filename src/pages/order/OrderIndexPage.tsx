import {Outlet} from "react-router-dom";

function OrderIndexPage() {
    return (
        <>
            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default OrderIndexPage;