import React from "react";
import { useCustomerStore } from "../stores/customerStore";
import BasicLayout from "../layouts/BasicLayout";
import GeneralLayout from "../layouts/GeneralLayout";

const withLayout = (WrappedComponent: React.ComponentType) => {
    return function ComponentWithLayout(props: any) {
        const { loginType } = useCustomerStore();

        // 로그인 타입에 따라 레이아웃 결정
        const Layout = loginType === "phone" ? BasicLayout : GeneralLayout;

        return (
            <Layout>
                <WrappedComponent {...props} />
            </Layout>
        );
    };
};

export default withLayout;
