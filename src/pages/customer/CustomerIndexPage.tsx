import {Outlet} from "react-router-dom";

// 인덱스 페이지를 만듬
function CustomerIndexPage() {
    return (
        <>
            <div className='w-full'>

                {/*outlet으로 렌더링*/}
                <Outlet></Outlet>
            </div>
        </>
    );
}

export default CustomerIndexPage;