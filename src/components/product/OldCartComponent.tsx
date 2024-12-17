import { useCartStore } from "../../stores/cartStore.ts";
import { useEffect, useState } from "react";

function AccessibleCartComponent() {
    const { products } = useCartStore();
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        console.log("장바구니 상태:", products);
    }, [products]);

    // 상품 선택/해제 핸들러
    // @ts-ignore
    const handleSelectProduct = (productID) => {
        // @ts-ignore
        setSelectedProducts((prev) =>
            // @ts-ignore
            prev.includes(productID)
                ? prev.filter((id) => id !== productID)
                : [...prev, productID]
        );
    };

    // 전체 선택/해제 핸들러
    const handleSelectAll = () => {
        if (selectedProducts.length === products.length) {
            setSelectedProducts([]);
        } else {
            // @ts-ignore
            setSelectedProducts(products.map((product) => product.productID));
        }
    };

    // 선택 삭제 핸들러
    const handleDeleteSelected = () => {
        const cartStore = useCartStore.getState();
        selectedProducts.forEach((productID) => {
            cartStore.removeFromCart(productID);
        });
        setSelectedProducts([]);
    };

    // 결제하기 버튼 클릭 핸들러
    const handleCheckout = () => {
        const selectedItems = products.filter((product) =>
            // @ts-ignore
            selectedProducts.includes(product.productID)
        );
        console.log("결제할 상품:", selectedItems);
        alert(`총 ${selectedItems.length}개의 상품을 결제합니다.`);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-8">
            {/* 상단 기능 버튼 */}
            <div className="mb-6 flex items-center border-b pb-4">
                <div className="flex items-center space-x-4">
                    <input
                        type="checkbox"
                        id="selectAll"
                        checked={selectedProducts.length === products.length}
                        onChange={handleSelectAll}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="selectAll" className="text-lg text-gray-900 font-bold cursor-pointer">
                        전체 선택
                    </label>
                </div>
                <button
                    onClick={handleDeleteSelected}
                    className={`ml-auto text-lg px-6 py-2 rounded-lg ${
                        selectedProducts.length === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                    disabled={selectedProducts.length === 0}
                >
                    선택 삭제
                </button>
            </div>

            {/* 장바구니 내용 */}
            <div className="overflow-y-auto max-h-[calc(100vh-280px)] pb-24">
                {products.length === 0 ? (
                    <p className="text-gray-600 text-center text-xl font-bold">
                        장바구니가 비어 있습니다. 상품을 추가해 보세요!
                    </p>
                ) : (
                    <ul className="space-y-6">
                        {products.map((product) => (
                            <li
                                key={product.productID}
                                className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center space-x-4"
                            >
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    // @ts-ignore
                                    checked={selectedProducts.includes(product.productID)}
                                    onChange={() => handleSelectProduct(product.productID)}
                                />
                                <div className="flex-grow">
                                    <p className="text-gray-900 font-bold mb-1">{product.name}</p>
                                    <p className="text-gray-700">수량: {product.quantity}</p>
                                    <p className="text-gray-900 font-bold">
                                        가격: {product.totalPrice.toLocaleString()}원
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        useCartStore.getState().removeFromCart(product.productID)
                                    }
                                    className="text-red-500 hover:text-red-600 text-3xl font-bold"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 하단 총합 및 결제하기 버튼 */}
            {products.length > 0 && (
                <div
                className="fixed bottom-28 left-0 w-full bg-blue-600 p-4 shadow-lg text-center"
                style={{ zIndex: 10 }} // 음성 버튼 위에 렌더링
        >
            <p className="text-xl font-bold text-white mb-2">
                총 상품: {products.reduce((sum, p) => sum + p.quantity, 0)}개
            </p>
            <p className="text-xl font-bold text-white mb-4">
                총 가격: {products.reduce((sum, p) => sum + p.totalPrice, 0).toLocaleString()}원
            </p>
            <button
                onClick={handleCheckout}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-lg text-xl font-bold"
                disabled={selectedProducts.length === 0}
            >
                결제하기
            </button>
                </div>
            )}
        </div>
    );

}

export default AccessibleCartComponent;
