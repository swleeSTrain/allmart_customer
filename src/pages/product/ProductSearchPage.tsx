import BasicLayout from "../../layouts/BasicLayout.tsx";
import ProductSearchComponent from "../../components/product/ProductSearchComponent.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";

function ProductListPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return (
        <div>
            <Layout>
                <ProductSearchComponent></ProductSearchComponent>
            </Layout>
        </div>
    );
}

export default ProductListPage;