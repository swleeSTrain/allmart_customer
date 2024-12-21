import BasicLayout from "../../layouts/BasicLayout.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";
import TemporaryOrderList from "../../components/order/TemporaryOrderList.tsx";

function TemporaryPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return (
        <Layout>
            <TemporaryOrderList/>
        </Layout>
    );
};

export default TemporaryPage;