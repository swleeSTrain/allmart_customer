import BasicLayout from "../../layouts/BasicLayout.tsx";
import OrderListComponent from "../../components/order/OrderListComponent.tsx";


function OrderListPage() {
    return (
        <BasicLayout>
            <div>
                주문목록페이지
                <OrderListComponent></OrderListComponent>
            </div>
        </BasicLayout>
    );
}

export default OrderListPage;