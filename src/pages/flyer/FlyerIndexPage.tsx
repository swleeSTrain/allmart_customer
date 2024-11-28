import {Outlet} from "react-router-dom";

function FlyerIndexPage() {
    return (
        <>
            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default FlyerIndexPage;