import React, { useEffect, useState } from "react";
import { getOrderList } from "../../api/OrderAPI";
import { useCustomerStore } from "../../stores/customerStore"; // 상태 관리

interface OrderListDTO {
    orderId: number;
    customerId: string;
    status: string;
    totalAmount: number;
    orderTime: string;
    payment: string;
}

const OrderListComponent: React.FC = () => {
    const [orders, setOrders] = useState<OrderListDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Zustand에서 customerID 가져오기
    const { customerID } = useCustomerStore();

    useEffect(() => {
        const fetchOrderList = async () => {
            if (!customerID) {
                console.warn("No customer ID available. Skipping fetch.");
                setError("고객 ID가 없습니다. 다시 로그인해 주세요.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true); // 로딩 시작
                const response = await getOrderList({
                    status: "", // 주문 상태 필터링 (필요시 추가 조건 적용 가능)
                    customerId: customerID.toString(), // 상태에서 가져온 고객 ID
                    page: 1, // 페이지 번호
                    size: 10, // 페이지 크기
                });

                if (response?.dtoList) {
                    setOrders(response.dtoList);
                } else {
                    setOrders([]); // 결과가 없으면 빈 배열로 설정
                }
            } catch (err) {
                console.error("Failed to fetch order list:", err);
                setError("주문 목록을 가져오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderList();
    }, [customerID]);

    if (loading) return <div className="text-center mt-4">⏳ 로딩 중...</div>;

    if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">📋 주문 목록</h1>
            {orders.length > 0 ? (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li
                            key={order.orderId}
                            className="border rounded-md p-4 shadow-sm bg-gray-50 hover:bg-white"
                        >
                            <div className="flex flex-col space-y-2">
                                <div>
                                    <strong>주문 상태:</strong> {order.status}
                                </div>
                                <div>
                                    <strong>총액:</strong> {order.totalAmount.toLocaleString()}원
                                </div>
                                <div>
                                    <strong>주문 시간:</strong>{" "}
                                    {new Date(order.orderTime).toLocaleString()}
                                </div>
                                <div>
                                    <strong>결제 정보:</strong> {order.payment}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-gray-500 text-center mt-4">📭 주문 내역이 없습니다.</div>
            )}
        </div>
    );
};

export default OrderListComponent;
