
import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";
import CustomerInfoComponent from "../../components/customer/CustomerInfoComponent.tsx";


function CustomerPhoneSignInPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return (
        <Layout>
            <CustomerInfoComponent />
        </Layout>
    );
};

export default CustomerPhoneSignInPage;