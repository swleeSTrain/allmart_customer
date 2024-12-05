import {Outlet} from "react-router-dom";

function QnaIndexPage() {
    return (
        <>
            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default QnaIndexPage;