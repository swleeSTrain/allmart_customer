import PointReadComponent from "../../components/PointReadComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";

function PointPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return (
        <Layout><PointReadComponent /></Layout>
    );
}

export default PointPage;