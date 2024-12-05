import {Outlet} from "react-router-dom";

function TossIndexPage() {
    return (
        <>
            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default TossIndexPage;