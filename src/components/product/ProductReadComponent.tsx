import { useEffect, useState, useCallback } from "react";
import { useCustomerCookie } from "../../hooks/useCustomerCookie";
import { useCustomerStore } from "../../stores/customerStore";
import { useParams } from "react-router-dom"; // URL 파라미터 읽기
import { getReadProduct } from "../../api/ProductAPI.ts";
import { IProduct } from "../../types/product";
import LoadingComponent from "../LoadingComponent";
import ProductModalComponent from "./ProductModalComponent.tsx";
import {useCartStore} from "../../stores/cartStore.ts";

function ProductReadComponent() {
    const { martID: cookieMartID } = useCustomerCookie().getCustomerCookies();
    const martID = useCustomerStore((state) => state.martID) || cookieMartID;
    const { productID } = useParams<{ productID: string }>(); // URL에서 productID 추출
    const [loading, setLoading] = useState<boolean>(true);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0); // 이미지 인덱스 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

    const addToCart = useCartStore(state => state.addToCart);

    const loadProductData = useCallback(async () => {
        if (!martID || !productID) return; // martID나 productID가 없으면 요청 중단
        setLoading(true);
        try {
            const productData = await getReadProduct(martID, Number(productID));
            setProduct(productData);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        } finally {
            setLoading(false);
        }
    }, [martID, productID]);

    useEffect(() => {
        loadProductData();
    }, [loadProductData]);

    if (loading) return <LoadingComponent />;
    if (!product) return <p>Product not found.</p>;

    const handleTouchStart = (e) => {
        e.preventDefault();
        const startX = e.touches[0].clientX;
        e.currentTarget.ontouchmove = (e) => handleTouchMove(e, startX);
    };

    const handleTouchMove = (e, startX) => {
        const moveX = e.touches[0].clientX;
        const diffX = startX - moveX;

        if (Math.abs(diffX) > 50) { // 이동 거리가 50픽셀 이상이면 슬라이드 처리
            if (diffX > 0) {
                setCurrentIndex((prevIndex) =>
                    prevIndex === product.attachImages.length - 1 ? 0 : prevIndex + 1
                );
            } else {
                setCurrentIndex((prevIndex) =>
                    prevIndex === 0 ? product.attachImages.length - 1 : prevIndex - 1
                );
            }
        }

        e.currentTarget.ontouchmove = null; // 터치 끝나면 이벤트 리스너 제거
    };

    return (
        <div className="flex flex-col items-center p-4 min-h-screen mt-4">
            {/* 이미지 슬라이더 */}
            <div className="mt-6">
                {product.attachImages && product.attachImages.length > 0 ? (
                    <div className="w-full relative">
                        <div
                            className="w-full overflow-hidden rounded-lg shadow-md border border-gray-200"
                            onTouchStart={handleTouchStart}
                        >
                            <img
                                src={`${product.attachImages[currentIndex]}`}
                                alt="첨부 이미지"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <div className="absolute bottom-2 right-2 text-white bg-black bg-opacity-50 p-1 rounded-md">
                            <span>{currentIndex + 1}/{product.attachImages.length}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">첨부된 이미지가 없습니다.</p>
                )}
            </div>

            {/* 이름과 가격 */}
            <div className="w-full max-w-md text-center my-4">
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <p className="text-6xl font-bold text-red-600">
                    {product.price.toLocaleString()}원
                </p>
            </div>

            {/* 장바구니 추가 버튼 */}
            <div className="fixed bottom-16 w-full bg-white p-4 shadow-lg z-10">
                <button
                    className="w-full py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg hover:bg-orange-600"
                    onClick={() => setIsModalOpen(true)} // 모달 열기
                >
                    장바구니에 담기
                </button>
            </div>

            {/* 모달 */}
            {isModalOpen && product && (
                <ProductModalComponent
                    productName={product.name}
                    productPrice={product.price}
                    onClose={() => setIsModalOpen(false)} // 모달 닫기
                    onAddToCart={(quantity) => {
                        addToCart({ // addToCart 함수 직접 사용
                            productID: product.productID,
                            name: product.name,
                            quantity,
                            totalPrice: product.price * quantity,
                        });
                        console.log("장바구니에 추가 완료:", {
                            productID: product.productID,
                            name: product.name,
                            quantity,
                            totalPrice: product.price * quantity,
                        });
                    }}
                />
            )}

        </div>
    );
}

export default ProductReadComponent;
