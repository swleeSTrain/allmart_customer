import React from 'react';

interface OrderVoiceWindowProps {
    message: string;
    onClose: () => void;
}

const OrderVoiceWindow: React.FC<OrderVoiceWindowProps> = ({ message, onClose }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg p-6 transform transition-transform duration-300 ease-in-out animate-slideUp">
            <h2 className="text-xl font-bold mb-4">음성 주문</h2>
            <p>{message}</p>
            <button
                onClick={onClose}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                닫기
            </button>
        </div>
    );
};

export default OrderVoiceWindow;
