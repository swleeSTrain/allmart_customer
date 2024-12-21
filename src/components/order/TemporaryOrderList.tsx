import React, { useEffect, useState } from 'react';
import { getTemporaryOrders, deleteTemporaryOrder } from '../../api/TemporyOrderAPI';
import { ITemporaryOrder } from '../../types/iTemporaryOrder';

const TemporaryOrderList: React.FC = () => {
    const [orders, setOrders] = useState<ITemporaryOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getTemporaryOrders('PENDING');
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (tempOrderId: number) => {
        try {
            await deleteTemporaryOrder(tempOrderId);
            setOrders((prevOrders) => prevOrders.filter((order) => order.tempOrderId !== tempOrderId));
        } catch (error) {
            alert('주문 삭제에 실패했습니다.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4 text-center">임시 주문 목록</h1>
            {loading ? (
                <div>불러오는 중...</div>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li
                            key={order.tempOrderId}
                            className="flex justify-between items-center border-b pb-2"
                        >
                            <div>
                                <p><strong>상품명:</strong> {order.productName}</p>
                                <p><strong>수량:</strong> {order.quantity}</p>
                                <p><strong>주문 시간:</strong> {new Date(order.orderTime).toLocaleString()}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(order.tempOrderId)}
                                className="text-red-500 font-bold text-lg hover:text-red-700"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TemporaryOrderList;
