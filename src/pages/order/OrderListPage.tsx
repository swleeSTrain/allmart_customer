import BasicLayout from "../../layouts/BasicLayout";
import OrderListComponent from "../../components/order/OrderListComponent";

function OrderListPage() {
    return (
        <BasicLayout>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">주문 목록 페이지</h1>
                <OrderListComponent />
            </div>
        </BasicLayout>
    );
}

export default OrderListPage;