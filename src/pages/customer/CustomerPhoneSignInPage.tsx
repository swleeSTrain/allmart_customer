
import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";
import CustomerPhoneSignInComponent from "../../components/customer/CustomerPhoneSignInComponent.tsx";


function CustomerPhoneSignInPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "email" ? GeneralLayout : BasicLayout;
    return (
        <Layout>
            <CustomerPhoneSignInComponent />
        </Layout>
    );
};

export default CustomerPhoneSignInPage;