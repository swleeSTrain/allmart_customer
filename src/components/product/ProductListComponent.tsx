import { useEffect, useState, useRef, useCallback } from "react";
import { useCustomerCookie } from "../../hooks/useCustomerCookie";
import { useCustomerStore } from "../../stores/customerStore";
import { getProductList } from "../../api/ProductAPI";
import { IProduct, IPageResponse } from "../../types/product";
import LoadingComponent from "../LoadingComponent";
import ProductModalComponent from "../../components/product/ProductModalComponent"; // 모달 컴포넌트
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {useCartStore} from "../../stores/cartStore.ts";
import FloatingCartButton from "../FloatingCartButton.tsx";

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

function ProductListComponent() {
    const { addToCart } = useCartStore(); // Zustand의 addToCart 가져오기
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const categoryID = searchParams.get("categoryID");
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null); // 선택된 상품

    const observer = useRef<IntersectionObserver | null>(null);

    // Zustand와 쿠키에서 martID 가져오기
    const { martID: cookieMartID } = useCustomerCookie().getCustomerCookies();
    const martID = useCustomerStore((state) => state.martID) || cookieMartID;

    const loadPageData = useCallback(
        async (pageToLoad: number) => {
            if (!martID) return; // martID가 없으면 요청 중단
            setLoading(true);

            try {
                const data = await getProductList(pageToLoad, 10, {
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
            {/* 플로팅 장바구니 버튼 */}
            <FloatingCartButton />

            <ul className="space-y-4">{productItems}</ul>
            {loading && <LoadingComponent/>}
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
                            thumbnailImage: selectedProduct.thumbnailImage, // 썸네일 이미지 추가
                        });
                        console.log(`${quantity}개 추가됨: ${selectedProduct.name}`);
                        closeModal();
                    }}
                />
            )}
        </div>
    );
}

export default ProductListComponent;
