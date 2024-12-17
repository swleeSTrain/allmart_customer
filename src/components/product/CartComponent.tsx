import { useState, useEffect } from "react";
import { useCartStore } from "../../stores/cartStore";
import { useCustomerStore } from "../../stores/customerStore";
import TossPayComponent from "../toss/TossPayComponent";
import { v4 as uuidv4 } from "uuid";

function CartComponent() {
    const { products } = useCartStore();
    const customerName = useCustomerStore((state) => state.name);
    const [selectedProducts, setSelectedProducts] = useState(
        products.map((product) => product.productID) // 기본적으로 전체 선택
    );
    const [showPayment, setShowPayment] = useState(false); // 결제 창 트리거
    const [orderData, setOrderData] = useState<any>(null); // 결제 데이터 저장

    useEffect(() => {
        // 장바구니 상태 변경 시 선택된 상품 초기화
        setSelectedProducts(products.map((product) => product.productID));
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
            setSelectedProducts([]); // 모두 선택 해제
        } else {
            setSelectedProducts(products.map((product) => product.productID)); // 모두 선택
        }
    };

    // 수량 변경 핸들러
    const handleQuantityChange = (productID: number, newQuantity: number) => {
        if (newQuantity < 1) return; // 수량은 최소 1
        const cartStore = useCartStore.getState();
        cartStore.updateProductQuantity(productID, newQuantity);
    };

    // 선택 삭제 핸들러
    const handleDeleteSelected = () => {
        const cartStore = useCartStore.getState();
        selectedProducts.forEach((productID) => {
            cartStore.removeFromCart(productID);
        });
        setSelectedProducts([]); // 삭제 후 선택 초기화
    };

    // 총 결제 금액 계산
    const calculateTotalAmount = (): number =>
        products
            .filter((product) => selectedProducts.includes(product.productID))
            .reduce((sum, product) => sum + product.totalPrice, 0);

    // 주문 이름 생성
    const createOrderName = (): string => {
        const selectedItems = products.filter((product) =>
            selectedProducts.includes(product.productID)
        );
        const itemNames = selectedItems.map((item) => item.name).join(", ");
        return `${customerName || "고객"} - ${itemNames}`;
    };

    // 결제하기 버튼 클릭 핸들러
    const handleCheckout = () => {
        if (!customerName) {
            alert("로그인 후 결제를 진행해주세요.");
            return;
        }

        if (selectedProducts.length === 0) {
            alert("결제할 상품을 선택해주세요.");
            return;
        }

        // 결제 정보 생성
        const amount = calculateTotalAmount();
        const orderId = uuidv4().replace(/-/g, "").slice(0, 36);
        const orderName = createOrderName();

        // 결제 데이터를 상태에 저장
        setOrderData({ amount, orderId, orderName, customerName });
        setShowPayment(true); // 결제 트리거 활성화
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
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                            onClick={() =>
                                                handleQuantityChange(
                                                    product.productID,
                                                    product.quantity - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <span className="text-lg text-gray-800 font-medium">
                                            {product.quantity}
                                        </span>
                                        <button
                                            className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                            onClick={() =>
                                                handleQuantityChange(
                                                    product.productID,
                                                    product.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
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

            {/* 하단 결제하기 버튼 */}
            {selectedProducts.length > 0 && (
                <div className="fixed bottom-16 left-0 w-full bg-gray-100 p-4 shadow-md text-center">
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

            {/* TossPayComponent를 조건부 렌더링 */}
            {showPayment && orderData && (
                <TossPayComponent
                    amount={orderData.amount}
                    orderId={orderData.orderId}
                    orderName={orderData.orderName}
                    customerName={orderData.customerName}
                    onSuccess={() => {
                        alert("결제가 성공적으로 완료되었습니다!");
                        setShowPayment(false);
                    }}
                    onError={(error) => {
                        alert("결제에 실패했습니다. 다시 시도해주세요.");
                        console.error(error);
                        setShowPayment(false);
                    }}
                />
            )}
        </div>
    );
}

export default CartComponent;
