
import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";
import { useCustomerStore } from "../../stores/customerStore.ts";
import CartComponent from "../../components/product/CartComponent.tsx";

function CartPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기

    // 로그인 타입에 따라 레이아웃 선택
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;

    return (
        <Layout>
            <CartComponent />
        </Layout>
    );
}

export default CartPage;
