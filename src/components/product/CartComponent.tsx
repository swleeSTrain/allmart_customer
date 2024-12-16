import { useCartStore } from "../../stores/cartStore.ts";
import { useEffect, useState } from "react";

function CartComponent() {
    const { products } = useCartStore();
    const [selectedProducts, setSelectedProducts] = useState(
        products.map((product) => product.productID) // 기본적으로 전체 선택
    );

    useEffect(() => {
        // 장바구니 상태 변경 시 선택된 상품 초기화
        setSelectedProducts(products.map((product) => product.productID));
        console.log("장바구니 상태:", products);
    }, [products]);

    // 상품 선택/해제 핸들러
    const handleSelectProduct = (productID: number) => {
        setSelectedProducts((prev) =>
            prev.includes(productID)
                ? prev.filter((id) => id !== productID) // 이미 선택된 상품은 해제
                : [...prev, productID] // 선택 추가
        );
    };

    // 전체 선택/해제 핸들러
    const handleSelectAll = () => {
        if (selectedProducts.length === products.length) {
            // 모두 선택된 상태라면 선택 해제
            setSelectedProducts([]);
        } else {
            // 모두 선택
            setSelectedProducts(products.map((product) => product.productID));
        }
    };

    // 선택 삭제 핸들러
    const handleDeleteSelected = () => {
        const cartStore = useCartStore.getState();
        selectedProducts.forEach((productID) => {
            cartStore.removeFromCart(productID);
        });
        setSelectedProducts([]); // 삭제 후 선택 초기화
    };

    // 결제하기 버튼 클릭 핸들러
    const handleCheckout = () => {
        const selectedItems = products.filter((product) =>
            selectedProducts.includes(product.productID)
        );
        console.log("결제할 상품:", selectedItems);
        alert(`총 ${selectedItems.length}개의 상품을 결제합니다.`);
    };

    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto mt-7">
            {/* 상단 기능 버튼 */}
            <div className="mb-4 flex items-center border-b pb-3">
                <div className="flex items-center space-x-4">
                    <input
                        type="checkbox"
                        id="selectAll"
                        checked={selectedProducts.length === products.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="selectAll" className="text-sm text-gray-700">
                        전체 선택
                    </label>
                </div>
                <button
                    onClick={handleDeleteSelected}
                    className={`ml-auto bg-gray-200 text-sm px-4 py-2 rounded-md text-gray-500 ${
                        selectedProducts.length === 0
                            ? "cursor-not-allowed"
                            : "hover:bg-red-500 hover:text-white"
                    }`}
                    disabled={selectedProducts.length === 0}
                >
                    삭제
                </button>
            </div>

            {/* 장바구니 내용 */}
            <div className="overflow-y-auto max-h-[calc(100vh-280px)] pb-24">
                {products.length === 0 ? (
                    <p className="text-gray-500 text-center text-lg">
                        장바구니가 비어 있습니다. 상품을 추가해 보세요!
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {products.map((product) => (
                            <li
                                key={product.productID}
                                className="bg-white p-4 rounded-lg shadow flex items-center"
                            >
                                <input
                                    type="checkbox"
                                    className="mr-4"
                                    checked={selectedProducts.includes(product.productID)}
                                    onChange={() => handleSelectProduct(product.productID)}
                                />
                                <div className="flex-grow">
                                    <p className="text-sm text-gray-700 mb-1">{product.name}</p>
                                    <p className="text-lg text-gray-800 font-medium">
                                        수량: {product.quantity}
                                    </p>
                                    <p className="text-lg text-gray-800 font-medium">
                                        가격: {product.totalPrice.toLocaleString()}원
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        useCartStore.getState().removeFromCart(product.productID)
                                    }
                                    className="text-gray-500 hover:text-red-500 text-xl font-bold ml-4"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 하단 총합 및 결제하기 버튼 */}
            {selectedProducts.length > 0 && (
                <div className="fixed bottom-16 left-0 w-full bg-gray-100 p-4 shadow-md text-center">
                    {/* 선택된 상품 기준 총 수량 및 총 가격 계산 */}
                    <p className="text-lg font-medium text-gray-800 mb-0.5">
                        총 상품:{" "}
                        {products
                            .filter((p) => selectedProducts.includes(p.productID))
                            .reduce((sum, p) => sum + p.quantity, 0)}개
                    </p>
                    <p className="text-lg font-medium text-gray-800 mb-2">
                        총 가격:{" "}
                        {products
                            .filter((p) => selectedProducts.includes(p.productID))
                            .reduce((sum, p) => sum + p.totalPrice, 0)
                            .toLocaleString()}원
                    </p>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-orange-400 hover:bg-orange-400 text-white py-2 rounded-md text-lg font-medium"
                    >
                        결제하기
                    </button>
                </div>
            )}

        </div>
    );
}

export default CartComponent;
