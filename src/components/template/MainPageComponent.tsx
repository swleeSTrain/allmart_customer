import React from "react";
import "normalize.css";
import "../../styles/global.css";

const MainPageComponent = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="flex flex-wrap items-center justify-between px-4 py-2">
                    <div className="flex space-x-2">
                        <button className="text-green-600 border border-green-600 px-4 py-1 rounded-md text-sm">
                            즉시배송
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 w-full sm:w-auto mt-2 sm:mt-0">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-gray-200 w-full sm:w-64"
                        />
                        <img
                            src="/icons/cart.png"
                            alt="Cart"
                            className="w-6 h-6"
                        />
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white shadow-md">
                <div className="flex items-center space-x-2 px-4 py-2 overflow-x-auto whitespace-nowrap">
                    {["홈", "신상품", "베스트", "전단행사", "메가푸드마켓", "+"].map(
                        (item, index) => (
                            <a
                                key={index}
                                href="#"
                                className={`text-sm ${
                                    index === 0
                                        ? "text-red-500 font-semibold"
                                        : "text-gray-700"
                                }`}
                            >
                                {item}
                            </a>
                        )
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main className="px-4 py-4">
                {/* Banner */}
                <div className="bg-white shadow-md rounded-md overflow-hidden mb-4">
                    <img
                        src="/images/banner.png"
                        alt="Banner"
                        className="w-full h-40 sm:h-60 lg:h-80 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-lg font-bold">
                            라면/간편식 2개 50%
                        </h2>
                        <p className="text-gray-500 text-sm">파이 3개 9,990원</p>
                    </div>
                </div>

                {/* Category Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {["MEGA", "Monsieur Boulanger", "산지직송관", "밀키트/간편식"].map(
                        (category, index) => (
                            <button
                                key={index}
                                className="flex flex-col items-center bg-white shadow-md rounded-md p-4"
                            >
                                <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
                                <span className="text-sm text-gray-700">{category}</span>
                            </button>
                        )
                    )}
                </div>

                {/* Special Offers */}
                <div className="bg-green-500 text-white rounded-md px-4 py-2 text-center">
                    오늘 업데이트 특가릴레이 (3종 쿠폰)
                </div>
            </main>

            {/* Footer Navigation */}
            <footer className="bg-white shadow-md fixed bottom-0 left-0 right-0">
                <div className="flex justify-around items-center py-2">
                    {[
                        {
                            icon: "/icons/category.png",
                            label: "카테고리",
                        },
                        {
                            icon: "/icons/delivery.png",
                            label: "배송속도",
                        },
                        {
                            icon: "/icons/home.png",
                            label: "홈",
                        },
                        {
                            icon: "/icons/mypage.png",
                            label: "마이페이지",
                        },
                        {
                            icon: "/icons/faq.png",
                            label: "자주묻는질문",
                        },
                    ].map((item, index) => (
                        <button
                            key={index}
                            className="flex flex-col items-center w-1/5 sm:w-auto"
                        >
                            <img
                                src={item.icon}
                                alt={item.label}
                                className="w-6 h-6 mb-1"
                            />
                            <span className="text-xs sm:text-sm text-gray-700">{item.label}</span>
                        </button>
                    ))}
                </div>
            </footer>
        </div>
    );
};

export default MainPageComponent;
