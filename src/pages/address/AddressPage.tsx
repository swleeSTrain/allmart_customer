
import PostcodeSearch from "../../components/address/PostcodeSearch.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";
import GeneralLayout from "../../layouts/GeneralLayout.tsx";
import {useCustomerStore} from "../../stores/customerStore.ts";


function AddressPage() {
    const { loginType } = useCustomerStore(); // Zustand 상태로 로그인 타입 가져오기
    const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;
    return (
        <Layout>
            <PostcodeSearch />
        </Layout>
    );
};

export default AddressPage;
