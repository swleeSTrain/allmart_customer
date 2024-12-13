import ProductListComponent from "../../components/product/ProductListComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";
import { useCustomerStore } from "../../stores/customerStore.ts";

function ProductListPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기

    // 로그인 타입에 따라 레이아웃 선택
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;

    return (
        <Layout>
            <ProductListComponent />
        </Layout>
    );
}

export default ProductListPage;
