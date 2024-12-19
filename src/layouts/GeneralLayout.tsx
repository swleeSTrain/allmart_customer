import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerStore } from "../stores/customerStore.ts"; // 상태관리
import { useCustomerCookie } from "../hooks/useCustomerCookie";
import homeIcon from '../../public/images/home.png'; // PNG 아이콘 경로 (필요시)
import leafletIcon from '../../public/images/flyer.png'; // PNG 아이콘 경로 (필요시)
import FloatingCartButton from "../components/FloatingCartButton"; // 플로팅 버튼 import
import {AiOutlineHome, AiOutlineShoppingCart} from "react-icons/ai"; // React Icons 라이브러리에서 가져오기


function GeneralLayout({ children }: { children: React.ReactNode }) {

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { name, setName, logout, martID, setMartID } = useCustomerStore();
    const { getCustomerCookies, removeCustomerCookies,cookies } = useCustomerCookie(); // 쿠키 삭제 함수

    // 쿠키 기반으로 상태 초기화
    useEffect(() => {
        const customerData = getCustomerCookies();
        if (customerData && customerData.name !== name) { // 기존 상태와 비교
            setName(customerData.name); // Zustand 상태 업데이트
        }

        if(customerData && customerData.martID !== martID) {
            console.log("getCustomerCookies(martId) : " + customerData.martID)
            setMartID(customerData.martID);
        }


    }, [name, getCustomerCookies, setName, setMartID, martID]);

    // 로그아웃 시 쿠키랑 상태 초기화 시킴
    const handleLogout = () => {
        // 쿠키 삭제
        removeCustomerCookies();
        // 상태 초기화 (옵션)
        logout();
        // 사이드바 닫기
        setMenuOpen(false);
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const menuItems = [
        { name: "최근 본 상품", link: "#" ,icon: <AiOutlineHome /> },
        { name: "주문 상품", link: `/${martID}/order/list` },
        { name: "배송지", link: `/${martID}/address` },
        { name: "회원정보", link: `/${martID}/customer/info` },
        { name: "고객센터", link: "#" },
        { name: "포인트", link: `/${martID}/points` },
    ];

    // navigate로 라우터 처리하려고 추가
    const handleNavigate = (link: string) => {
        if (link !== "#") {
            navigate(link); // navigate로 페이지 이동
        }
    };

    return (
        <>
            {/* 플로팅 장바구니 버튼 */}
            <FloatingCartButton />

            <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto px-4 flex items-center justify-between h-16">
                    {/* 왼쪽: 로고 */}
                    <div className="flex items-center">
                        <img
                            src="/images/a.png"
                            alt="마트 로고"
                            className="h-12 object-contain cursor-pointer"
                            onClick={() => navigate(`/${martID}`)}
                        />
                    </div>

                    {/* 오른쪽: 검색, 장바구니, 햄버거 메뉴 */}
                    <div className="flex items-center space-x-4 md:hidden">
                        {/* 검색 버튼 */}
                        <button
                            aria-label="검색"
                            onClick={() => navigate(`${martID}/product/search`)}
                            className="p-1 focus:outline-none transform transition-transform hover:scale-110"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-gray-600"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>

                        {/* 장바구니 버튼 */}
                        <button
                            aria-label="장바구니"
                            onClick={() => navigate(`${martID}/cart`)}
                            className="p-1 focus:outline-none transform transition-transform hover:scale-110"
                        >
                            <AiOutlineShoppingCart className="w-6 h-6 text-gray-600"/>
                        </button>

                        {/* 햄버거 메뉴 버튼 */}
                        <button
                            aria-label="메뉴 열기"
                            onClick={toggleMenu}
                            className="p-1 focus:outline-none transform transition-transform hover:scale-110"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-gray-600"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* 데스크톱 네비게이션 */}
                    <nav className="hidden md:flex flex-1 justify-center space-x-6">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                className="text-base font-semibold text-gray-900 hover:text-blue-600 transform transition-transform hover:scale-105"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* 데스크톱 돋보기 버튼 */}
                    <div className="hidden md:flex items-center">
                        <button
                            aria-label="검색"
                            onClick={() => console.log("Search clicked")}
                            className="p-1 focus:outline-none transform transition-transform hover:scale-110"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-gray-600"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* 모바일 네비게이션 */}
                <nav
                    className={`fixed top-0 left-0 z-40 h-full w-64 bg-gradient-to-b from-gray-600 to-gray-500 transform transition-transform duration-300 ease-in-out shadow-xl md:hidden ${
                        menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <ul className="pt-16 px-4 space-y-6">
                        {/* 사용자 정보 */}
                        {name && (
                            <li className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <span className="block text-xl font-semibold text-gray-900">
                    안녕하세요, <span className="text-orange-400">{name}</span>님!
                </span>
                            </li>
                        )}

                        {/* 메뉴 아이템 */}
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center space-x-4 px-3 py-2 rounded-lg hover:bg-blue-400 transition-colors"
                            >
                                {/* 아이콘 */}
                                <span className="text-white text-2xl">{item.icon || "⭐"}</span>
                                {/* 텍스트 */}
                                <button
                                    onClick={() => handleNavigate(item.link)}
                                    className="block text-lg font-medium text-white hover:text-gray-100 transition-transform hover:scale-105"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}

                        {/* 로그인/로그아웃 버튼 */}
                        <li className="mt-6">
                            {name ? (
                                <button
                                    onClick={handleLogout}
                                    className="block w-full h-12 text-lg font-semibold bg-orange-400 text-white rounded-lg hover:bg-orange-400 shadow-md transform transition-transform hover:scale-105"
                                >
                                로그아웃
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            console.log(`signin url: /${martID}/customer/signIn`)
                                            navigate(`/${martID}/customer/signIn`)
                                        }}
                                        className="block w-full h-12 text-lg font-semibold bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transform transition-transform hover:scale-105"
                                    >
                                        로그인
                                    </button>
                                )}
                            </li>
                        </ul>
                    </nav>


            </header>


            {/* Content Layout with Aside and Main */}
            <div className="flex flex-1">

                {/* Main Content */}
                <main className="w-full max-w-screen-lg mx-auto px-4 my-8">
                    {children}
                </main>
            </div>
            <div
                className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center h-20 border-t border-gray-200">


                <button
                    className="flex flex-col items-center text-gray-700 hover:text-orange-500 focus:outline-none transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100 group"
                    onClick={() => navigate("/categories")}
                >
                    {/* 카테고리 아이콘: 3줄 수평선 */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:text-orange-500"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                    {/* <img src={categoryIcon} alt="카테고리" className="w-6 h-6 group-hover:text-orange-500" /> */}
                    <span className="text-xs mt-1">카테고리</span>
                </button>

                <button
                    className="flex flex-col items-center text-gray-700 hover:text-orange-500 focus:outline-none transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100 group"
                    onClick={() => navigate("/")}
                >
                    {/* 홈 아이콘: 집 모양 */}
                    {/*<svg*/}
                    {/*    xmlns="http://www.w3.org/2000/svg"*/}
                    {/*    fill="none"*/}
                    {/*    viewBox="0 0 24 24"*/}
                    {/*    strokeWidth="1.5"*/}
                    {/*    stroke="currentColor"*/}
                    {/*    className="w-6 h-6 group-hover:text-orange-500"*/}
                    {/*>*/}
                    {/*    <path strokeLinecap="round" strokeLinejoin="round"*/}
                    {/*          d="M2.25 12l8.954-8.955c.44-.439 1.154-.439 1.594 0L21.75 12M4.5 9h15m-15 3h15m-8.25-6h.008v.008H12v-.008z"/>*/}
                    {/*</svg>*/}
                    <img src={homeIcon} alt="홈" className="w-6 h-6 group-hover:text-orange-500"/>
                    <span className="text-xs mt-1">홈</span>
                </button>

                <button
                    className="flex flex-col items-center text-gray-700 hover:text-orange-500 focus:outline-none transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100 group"
                    onClick={() => navigate("/flyer/read")}
                >
                    {/*/!* 전단지 아이콘: 문서 모양 *!/*/}
                    {/*<svg*/}
                    {/*    xmlns="http://www.w3.org/2000/svg"*/}
                    {/*    fill="none"*/}
                    {/*    viewBox="0 0 24 24"*/}
                    {/*    strokeWidth="1.5"*/}
                    {/*    stroke="currentColor"*/}
                    {/*    className="w-6 h-6 group-hover:text-orange-500"*/}
                    {/*>*/}
                    {/*    <path strokeLinecap="round" strokeLinejoin="round"*/}
                    {/*          d="M10.5 6h-6a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h6m7.5-12h-6a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h6m-3-13.5v12m-9-3h12m-9-9v12m-3 1.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>*/}
                    {/*</svg>*/}
                    <img src={leafletIcon} alt="전단지" className="w-6 h-6 group-hover:text-orange-500"/>
                    <span className="text-xs mt-1">전단지</span>
                </button>


                <button
                    className="flex flex-col items-center text-gray-700 hover:text-orange-500 focus:outline-none transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100 group"
                    onClick={() => navigate("/mypage")}
                >
                    {/* 마이페이지 아이콘: 사람 모양 */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:text-orange-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                    {/*  <img src={mypageIcon} alt="마이페이지" className="w-6 h-6 group-hover:text-orange-500" /> */}
                    <span className="text-xs mt-1">마이페이지</span>
                </button>
            </div>
        </>
    );
}

export default GeneralLayout;