import { useEffect } from "react";
import { useOrderStore } from "../../stores/orderStore";

function OrderListComponent() {
    const { orders, fetchAllOrders, loading } = useOrderStore();

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    if (loading) return <p>Loading orders...</p>;

    // 조건부 렌더링: orders가 없거나 빈 배열인 경우 처리
    if (!orders || orders.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
                <li key={order.orderId} className="p-4">
                    <div className="flex justify-between">
                        <div>
                            <p className="font-bold">Order ID: {order.orderId}</p>
                            <p>Customer: {order.customerId}</p>
                        </div>
                        <p className="text-right">Status: {order.status}</p>
                    </div>
                    <p>Total: {order.totalAmount}원</p>
                </li>
            ))}
        </ul>
    );
}

export default OrderListComponent;