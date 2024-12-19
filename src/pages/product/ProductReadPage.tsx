import BasicLayout from "../../layouts/BasicLayout.tsx";
import ProductReadComponent from "../../components/product/ProductReadComponent.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";


function ProductListPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return (
        <div>
            <Layout>
                <ProductReadComponent></ProductReadComponent>
            </Layout>
        </div>
    );
}

export default ProductListPage;