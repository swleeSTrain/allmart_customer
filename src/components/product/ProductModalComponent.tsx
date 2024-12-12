import { useState } from "react";

interface ModalProps {
    productName: string;
    productPrice: number;
    onClose: () => void;
    onAddToCart: (quantity: number) => void;
}

const ProductModalComponent: React.FC<ModalProps> = ({ productName, productPrice, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const totalPrice = productPrice * quantity;

    return (
        <div className="fixed inset-0 z-14 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
                {/* 닫기 버튼 */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* 상품 정보 */}
                <h2 className="text-lg font-bold mb-4">{productName}</h2>

                {/* 총 가격 및 수량 조절 */}
                <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-800 font-semibold">
                        총합: {totalPrice.toLocaleString()}원
                    </div>
                    <div className="flex items-center">
                        <button
                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-l hover:bg-gray-300"
                            onClick={() => handleQuantityChange(quantity - 1)}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                            className="w-12 text-center border-t border-b border-gray-300"
                            min="1"
                        />
                        <button
                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-r hover:bg-gray-300"
                            onClick={() => handleQuantityChange(quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* 장바구니 추가 버튼 */}
                <button
                    className="w-full py-2 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600"
                    onClick={() => {
                        onAddToCart(quantity);
                        onClose();
                    }}
                >
                    장바구니에 추가
                </button>
            </div>
        </div>
    );
};

export default ProductModalComponent;
