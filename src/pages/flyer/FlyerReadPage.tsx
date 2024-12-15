
import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";
import FlyerReadComponent from "../../components/flyer/FlyerReadComponent.tsx";


function FlyerReadPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return (
        <Layout>
            <FlyerReadComponent />
        </Layout>
    );
};

export default FlyerReadPage;