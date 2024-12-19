import { useEffect, useState, useRef, useCallback } from "react";
import { useCustomerCookie } from "../../hooks/useCustomerCookie";
import { useCustomerStore } from "../../stores/customerStore";
import { getElasticList } from "../../api/ProductAPI";
import { IProduct, IPageResponse } from "../../types/product";
import LoadingComponent from "../LoadingComponent";
import ProductModalComponent from "../../components/product/ProductModalComponent"; // 모달 컴포넌트
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {useCartStore} from "../../stores/cartStore.ts";

const initialState: IPageResponse = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: { page: 1, size: 10 },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1,
};

function ProductSearchComponent() {
    const { addToCart } = useCartStore(); // Zustand의 addToCart 가져오기
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isSearchMode, setIsSearchMode] = useState<boolean>(false); // 검색 모드 상태 추가
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const categoryID = searchParams.get("categoryID");
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null); // 선택된 상품

    const observer = useRef<IntersectionObserver | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    // Zustand와 쿠키에서 martID 가져오기
    const { martID: cookieMartID } = useCustomerCookie().getCustomerCookies();
    const martID = useCustomerStore((state) => state.martID) || cookieMartID;

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSearch = async () => {
        if (!searchKeyword.trim()) return;

        setLoading(true);
        setIsSearchMode(true); // 검색 모드 활성화
        try {
            const data = await getElasticList(1, 10, {
                keyword: searchKeyword,
                martID: martID,
            });
            setPageResponse(data);

            // 최근 검색어 업데이트
            setRecentSearches((prev) => {
                const updatedSearches = [searchKeyword, ...prev.filter((word) => word !== searchKeyword)];
                return updatedSearches.slice(0, 5); // 최대 5개 유지
            });
        } catch (error) {
            console.error("Error searching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelSearch = () => {
        setIsSearchMode(false); // 검색 모드 비활성화
        setSearchKeyword(""); // 검색어 초기화
        setPageResponse(initialState); // 검색 결과 초기화
    };

    const handleRecentSearchClick = (keyword: string) => {
        setSearchKeyword(keyword);
        handleSearch();
    };

    const loadPageData = useCallback(
        async (pageToLoad: number) => {
            if (!martID) return; // martID가 없으면 요청 중단
            setLoading(true);

            try {
                const data = await getElasticList(pageToLoad, 10, {
                    categoryID: categoryID ? Number(categoryID) : undefined,
                    martID: Number(martID),
                });
                setPageResponse((prevData) => ({
                    ...data,
                    dtoList:
                        pageToLoad === 1
                            ? data.dtoList
                            : [...prevData.dtoList, ...data.dtoList],
                }));
                setHasMore(data.dtoList.length === 10);
            } catch (error) {
                console.error("Error loading product data:", error);
            } finally {
                setLoading(false);
            }
        },
        [categoryID, martID]
    );

    const lastElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        loadPageData(page);
    }, [page, loadPageData]);

    const openModal = (product: IProduct) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const productItems = pageResponse.dtoList.map((product: IProduct, index) => (
        <li
            key={product.productID}
            onClick={() => navigate(`/product/read/${product.productID}`)}
            ref={index === pageResponse.dtoList.length - 1 ? lastElementRef : null}
            className="relative flex items-center border rounded-lg shadow-md p-4 bg-white hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
        >
            {product.thumbnailImage && (
                <img
                    src={`${product.thumbnailImage}`}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                />
            )}
            <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">
                    {product.name}
                </h3>
                <p className="text-orange-500 font-bold text-base mt-2">
                    {product.price.toLocaleString()}원
                </p>
                {/* 상품 카드용 플로팅 장바구니 버튼 */}
                <button
                    className="absolute bottom-4 right-4 bg-orange-500 text-white rounded-full shadow-lg p-2 hover:bg-orange-600 transition-transform hover:scale-110"
                    onClick={(e) => {
                        e.stopPropagation(); // 부모 클릭 이벤트 방지
                        openModal(product); // 모달 열기
                    }}
                >
                    <FaShoppingCart className="w-5 h-5"/>
                </button>
            </div>
        </li>

    ));

    return (
        <div className="container mx-auto pt-16 pb-20 p-4">
            <div className="container mx-auto p-4">
                <div
                    className="flex items-center border border-gray-300 rounded-full p-1 shadow-sm mb-6 bg-white max-w-4xl mx-auto">
                    <input
                        type="text"
                        ref={inputRef}
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="검색어를 입력해주세요"
                        className="w-full px-4 py-2 text-sm text-gray-700 outline-none rounded-l-full"
                    />
                    <button
                        onClick={handleSearch}
                        aria-label="검색"
                        className="w-12 h-12 bg-orange-500 text-white flex items-center justify-center rounded-full hover:bg-orange-600 transition"
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
                    <button
                        onClick={handleCancelSearch}
                        aria-label="취소"
                        className="ml-2 w-12 h-12 bg-gray-200 text-gray-700 flex items-center justify-center rounded-full hover:bg-gray-300 transition"
                    >
                        X
                    </button>
                </div>
            </div>


            {!isSearchMode && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">최근 검색어</h2>
                    <ul className="space-y-3">
                        {recentSearches.map((keyword, index) => (
                            <li key={index} className="flex items-center justify-between text-gray-700 border-b pb-2">
                                <span onClick={() => handleRecentSearchClick(keyword)}
                                      className="cursor-pointer hover:underline">
                                    {keyword}
                                </span>
                                <button
                                    aria-label="삭제"
                                    onClick={() => setRecentSearches((prev) => prev.filter((word) => word !== keyword))}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {isSearchMode && (
                <div>
                    {loading ? (
                        <LoadingComponent/>
                    ) : pageResponse.dtoList.length === 0 ? (
                        <p className="text-center text-gray-600 mt-6">검색 결과가 없습니다.</p>
                    ) : (
                        <ul className="space-y-4">{productItems}</ul>
                    )}
                </div>
            )}
            {isModalOpen && selectedProduct && (
                <ProductModalComponent
                    productName={selectedProduct.name}
                    productPrice={selectedProduct.price}
                    onClose={closeModal}
                    onAddToCart={(quantity) => {
                        addToCart({
                            productID: selectedProduct.productID,
                            name: selectedProduct.name,
                            quantity,
                            totalPrice: selectedProduct.price * quantity,
                        });
                        console.log(
                            `${quantity}개 추가됨: ${selectedProduct.name}`
                        );
                        closeModal();
                    }}
                />
            )}
        </div>
    );
}

export default ProductSearchComponent;
