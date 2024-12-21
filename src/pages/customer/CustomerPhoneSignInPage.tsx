import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";
import { useCustomerStore } from "../../stores/customerStore.ts";
import CustomerPhoneSignInComponent from "../../components/customer/CustomerPhoneSignInComponent.tsx";
import { useLocation } from "react-router-dom";

function CustomerPhoneSignInPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const location = useLocation(); // location 객체 가져오기

    // location.state?.useGeneralLayout 값이 true이면 GeneralLayout 사용
    const Layout = location.state?.useGeneralLayout
        ? GeneralLayout
        : loginType === "email"
            ? GeneralLayout
            : BasicLayout;

    return (
        <Layout>
            <CustomerPhoneSignInComponent />
        </Layout>
    );
}

export default CustomerPhoneSignInPage;
