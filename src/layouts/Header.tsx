import React from "react";
import {useNavigate} from "react-router-dom";
import AllMartLogo from "../assets/images/backgrounds/AllMartLogo.png";

const Header = ({children}: { children: React.ReactNode }) => {

    const navigate = useNavigate();

    return (
        <>
            <header className="bg-white shadow-lg flex justify-around items-center h-20  mb-4">
                <img src={AllMartLogo} alt="AllMart Logo" className="w-[120px] h-auto"
                     onClick={() => navigate("/")}/>
                <input type="text" placeholder="Search"
                       className="w-2/3 mx-2 py-2 px-4 border rounded-lg border-gray-300"/>
                <button className="w-fit rounded-s">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                        <path fillRule="evenodd"
                              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
                <input type="checkbox" id="menu-toggle" className="hidden peer"/>
                <label htmlFor="menu-toggle"
                       className="bg-white z-20 p-2 rounded cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                        <path fillRule="evenodd"
                              d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                              clipRule="evenodd"/>
                    </svg>
                </label>
                <nav
                    className="fixed top-0 left-0 z-10 h-full w-full bg-white transform -translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0">
                    <ul className="pt-16 px-4">
                        <li className="mb-4"><a href="#"
                                                className="text-center text-4xl block hover:bg-gray-400 rounded">최근 본
                            상품</a></li>
                        <li className="mb-4"><a href="#"
                                                className="text-center text-4xl block hover:bg-gray-400 rounded">주문
                            상품</a></li>
                        <li className="mb-4"><a href="#"
                                                className="text-center text-4xl block hover:bg-gray-400 rounded">장바구니</a>
                        </li>
                        <li className="mb-4"><a href="/customer/qrImage"
                                                className="text-center text-4xl block hover:bg-blue-400 rounded">회원정보</a>
                        </li>
                        <li className="mb-4"><a href="#"
                                                className="text-center text-4xl block hover:bg-gray-400 rounded">고객센터</a>
                        </li>
                        <li className="mb-4"><a href="#"
                                                className="text-center text-4xl block hover:bg-gray-400 rounded">포인트</a>
                        </li>
                        <button className="w-full h-20 text-5xl hover:bg-blue-400 rounded"
                                onClick={() => navigate(("/customer/signup"))}>로그인
                        </button>
                    </ul>
                </nav>
            </header>
            {/* Content Layout with Aside and Main */}

            <div className="flex flex-1">

                {/* Main Content */}
                <main className="flex-1 bg-white p-8">
                    {children}

                </main>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center h-20">
            </div>
        </>
    );
}

export default Header;