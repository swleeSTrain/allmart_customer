import { useState, useEffect } from "react";
import { useCartStore } from "../../stores/cartStore";
import { useCustomerStore } from "../../stores/customerStore";
import TossPayComponent from "../toss/TossPayComponent";
import { v4 as uuidv4 } from "uuid";

function CartComponent() {
    const { products } = useCartStore();
    const customerName = useCustomerStore((state) => state.name);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [showPayment, setShowPayment] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        // 초기에는 모든 상품을 선택 상태로 설정
        setSelectedProducts(products.map((product) => product.productID));
    }, [products]);

    // 상품 선택/해제 핸들러
    const handleSelectProduct = (productID: number) => {
        setSelectedProducts((prev) =>
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
            setSelectedProducts(products.map((product) => product.productID));
        }
    };

    // 수량 변경 핸들러
    const handleQuantityChange = (productID: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        const cartStore = useCartStore.getState();
        cartStore.updateProductQuantity(productID, newQuantity);
    };

    // 선택 삭제 핸들러
    const handleDeleteSelected = () => {
        const cartStore = useCartStore.getState();
        selectedProducts.forEach((productID) => {
            cartStore.removeFromCart(productID);
        });
        setSelectedProducts([]);
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

        const selectedItems = products.filter((product) =>
            selectedProducts.includes(product.productID)
        );
        const amount = calculateTotalAmount();
        const orderId = uuidv4().replace(/-/g, "").slice(0, 36);
        const orderName = createOrderName();

        // 주문 정보 localStorage에 저장
        localStorage.setItem(
            "orderItems",
            JSON.stringify(
                selectedItems.map((product) => ({
                    productId: product.productID,
                    quantity: product.quantity,
                    unitPrice: product.totalPrice,
                    productName: product.name,
                }))
            )
        );

        setOrderData({ amount, orderId, orderName, customerName });
        setShowPayment(true);
    };

    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md max-w-4xl mx-auto mt-7">
            {/* 상단 기능 */}
            <div className="mb-4 flex items-center border-b pb-3">
                <div className="flex items-center space-x-4">
                    <input
                        type="checkbox"
                        checked={selectedProducts.length === products.length}
                        onChange={handleSelectAll}
                    />
                    <label>전체 선택</label>
                </div>
                <button
                    onClick={handleDeleteSelected}
                    disabled={selectedProducts.length === 0}
                    className={`ml-auto px-4 py-2 rounded-md ${
                        selectedProducts.length === 0
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                >
                    선택 삭제
                </button>
            </div>

            {/* 장바구니 상품 목록 */}
            <ul>
                {products.map((product) => (
                    <li
                        key={product.productID}
                        className="bg-white p-4 rounded-lg shadow mb-2 flex items-center"
                    >
                        <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.productID)}
                            onChange={() => handleSelectProduct(product.productID)}
                            className="mr-4"
                        />
                        <div className="flex-grow">
                            <p>{product.name}</p>
                            <div className="flex items-center">
                                <button
                                    onClick={() =>
                                        handleQuantityChange(product.productID, product.quantity - 1)
                                    }
                                >
                                    -
                                </button>
                                <span className="mx-2">{product.quantity}</span>
                                <button
                                    onClick={() =>
                                        handleQuantityChange(product.productID, product.quantity + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <p>{product.totalPrice.toLocaleString()}원</p>
                        </div>
                    </li>
                ))}
            </ul>

            {/* 결제 버튼 */}
            {selectedProducts.length > 0 && (
                <div className="mt-4">
                    <p>총 결제 금액: {calculateTotalAmount().toLocaleString()}원</p>
                    <button
                        onClick={handleCheckout}
                        className="w-full py-2 mt-2 bg-orange-400 text-white rounded hover:bg-orange-500"
                    >
                        결제하기
                    </button>
                </div>
            )}

            {/* 결제창 표시 */}
            {showPayment && orderData && (
                <TossPayComponent
                    amount={orderData.amount}
                    orderId={orderData.orderId}
                    orderName={orderData.orderName}
                    customerName={orderData.customerName}
                />
            )}
        </div>
    );
}

export default CartComponent;
