import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderVoiceButton from "../components/chatbot/OrderVoiceButton.tsx";
import { useCustomerStore } from "../stores/customerStore.ts"; // 상태관리
import { useCustomerCookie } from "../hooks/useCustomerCookie";
import InstallPopupComponents from "../components/common/InstallPopupComponents.tsx"; // 쿠키 관련 훅

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

function BasicLayout({ children }: { children: React.ReactNode }) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsOpen(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
        };
    }, []);

    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('사용자가 설치를 수락했습니다.');
                }
                setDeferredPrompt(null);
            });
        }
        setIsOpen(false);
    };


    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { martID, setMartID, name, setName, logout, customerID} = useCustomerStore();
    const { getCustomerCookies, removeCustomerCookies,cookies } = useCustomerCookie(); // 쿠키 삭제 함수

    // 쿠키 기반으로 상태 초기화
    useEffect(() => {
        const customerData = getCustomerCookies();
        if (customerData && customerData.name !== name) { // 기존 상태와 비교
            setName(customerData.name); // Zustand 상태 업데이트
        }
        console.log("cookies.martID : " + cookies.martID);
        setMartID(cookies.martID)
    }, [name, getCustomerCookies, setName, setMartID]);

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
        { name: "최근 본 상품", link: "#" },
        { name: "주문 상품", link: `/${getCustomerCookies().customerID}/order/list` },
        { name: "배송지", link: `/${getCustomerCookies().martID}/address` },
        { name: "회원정보", link: `/${getCustomerCookies().martID}/customer/info` },
        { name: "회원정보수정", link: `/${getCustomerCookies().martID}/customer/update` },
        { name: "고객센터", link: `#/${getCustomerCookies().martID}` },
        { name: "포인트", link: `/${getCustomerCookies().martID}/points` },
    ];

    // navigate로 라우터 처리하려고 추가
    const handleNavigate = (link: string) => {
        if (link !== "#") {
            navigate(link); // navigate로 페이지 이동
        }
    };

    return (
        <>
            <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto px-4 flex items-center justify-between h-20 md:justify-start">
                    {/* 모바일 돋보기 버튼 */}
                    <button
                        aria-label="검색"
                        onClick={() => navigate(`/${martID}/product/search`)}
                        className="p-2 md:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8 text-gray-600"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {/* 로고 */}
                    <img
                        src="/images/a.png"
                        alt="마트 로고"
                        className="h-20 md:h-16 lg:h-20 object-contain cursor-pointer mx-auto md:mx-0"
                        onClick={() => navigate("/")}
                    />

                    {/* 모바일 햄버거 메뉴 버튼 */}
                    <button
                        aria-label="메뉴 열기"
                        onClick={toggleMenu}
                        className="cursor-pointer p-2 md:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8 text-gray-600"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {/* 데스크톱 네비게이션 (현재 유지) */}
                    <nav className="hidden md:flex flex-1 justify-center space-x-8">
                        {menuItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                    {/* 데스크톱 돋보기 버튼 */}
                    <button
                        aria-label="검색"
                        onClick={() => console.log("Search clicked")}
                        className="hidden md:block p-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8 text-gray-600"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* 모바일 네비게이션 */}
                <nav
                    className={`fixed top-0 left-0 z-40 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out shadow-md md:hidden ${
                        menuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <ul className="pt-16 px-4 space-y-6">
                        {/* 사용자 이름 */}
                        {name && (
                            <li>
                                <span className="block text-2xl font-semibold text-gray-900">
                                    {name}님
                                </span>
                            </li>
                        )}

                        {/* 메뉴 아이템 */}
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleNavigate(item.link)}
                                    className="block text-2xl font-semibold text-gray-900 hover:text-blue-600"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}

                        {/* 로그인/로그아웃 버튼 */}
                        <li>
                            {customerID ? (
                                <button
                                    onClick={handleLogout}
                                    className="block w-full h-12 text-2xl font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    로그아웃
                                </button>
                            ) : (
                                <button
                                    onClick={() =>{
                                        console.log("Navigating to:", `/${martID}/customer/signIn`)
                                        navigate(`/${martID}/customer/signIn`)}}
                                    className="block w-full h-12 text-2xl font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
                className="fixed bottom-0 left-0 right-0 bg-slate-800 shadow-lg flex items-center justify-between h-28 px-6"
            >
                {/* 전단지 버튼 */}
                <button
                    className="flex flex-col items-center justify-center text-white text-2xl md:text-3xl hover:text-yellow-300 focus:outline-none"
                    onClick={() => navigate(`${martID}/flyer/read`)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-14 h-14 md:w-16 md:h-16"
                    >
                        <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z"/>
                        <path
                            fillRule="evenodd"
                            d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>전단지</span>
                </button>

                {/* 음성 주문 버튼 */}
                <OrderVoiceButton/>

                {/* 주문 목록 버튼 */}
                <button
                    className="flex flex-col items-center justify-center text-white text-2xl md:text-3xl hover:text-yellow-300 focus:outline-none"
                    onClick={() => navigate(`${martID}/product/cart`)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-14 h-14 md:w-16 md:h-16"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.0 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                    </svg>
                    <span>장바구니</span>
                </button>
                <InstallPopupComponents
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    onInstall={handleInstall}
                />
            </div>


        </>
    );
}

export default BasicLayout;