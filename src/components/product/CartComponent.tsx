
import { useCartStore } from "../../stores/cartStore.ts";
import {useEffect} from "react"; // 실제 경로에 맞게 수정

function CartComponent() {

    const { products, clearCart } = useCartStore();

    useEffect(() => {
        // 장바구니 상태가 변경될 때마다 콘솔에 출력하여 확인
        console.log('장바구니 상태:', products);
    }, [products]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">장바구니</h2>

            {products.length === 0 ? (
                <p className="text-gray-600">장바구니가 비어 있습니다.</p>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <li key={product.productID} className="py-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-gray-600">수량: {product.quantity}</p>
                                    <p className="text-gray-600">가격: {product.totalPrice.toLocaleString()}원</p>
                                </div>
                                {/* 아래에 추가 */}
                                <button onClick={() => useCartStore.getState().removeFromCart(product.productID)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearCart}>장바구니 비우기</button> {/* clearCart 버튼 추가 */}
                </>
            )}
        </div>
    );
}

export default CartComponent;
