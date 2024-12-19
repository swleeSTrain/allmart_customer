
import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";
import OrderListComponent from "../../components/order/OrderListComponent.tsx";


function OrderListPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return (
        <Layout>
            <OrderListComponent />
        </Layout>
    );
};
export default OrderListPage;