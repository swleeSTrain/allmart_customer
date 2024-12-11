function ProductSearchComponent() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">상품 검색</h1>
            <div className="flex items-center border border-gray-300 rounded-full p-2 shadow-sm mb-6">
                <input
                    type="text"
                    placeholder="검색어를 입력해주세요"
                    className="flex-grow px-4 py-2 text-sm text-gray-700 outline-none rounded-l-full"
                />
                <button
                    aria-label="검색"
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">최근 검색어</h2>
                <ul className="space-y-3">
                    <li className="flex items-center justify-between text-gray-700 border-b pb-2">
                        <span>검색어1</span>
                        <button
                            aria-label="삭제"
                            className="text-red-500 hover:text-red-600"
                        >
                            삭제
                        </button>
                    </li>
                    <li className="flex items-center justify-between text-gray-700 border-b pb-2">
                        <span>검색어2</span>
                        <button
                            aria-label="삭제"
                            className="text-red-500 hover:text-red-600"
                        >
                            삭제
                        </button>
                    </li>
                    <li className="flex items-center justify-between text-gray-700 border-b pb-2">
                        <span>검색어3</span>
                        <button
                            aria-label="삭제"
                            className="text-red-500 hover:text-red-600"
                        >
                            삭제
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProductSearchComponent;
