import React from "react";
import PostcodeSearch from "../../components/address/PostcodeSearch.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";

const AddressPage: React.FC = () => {
    return (
        <div>
            <BasicLayout>  <PostcodeSearch /> </BasicLayout>
        </div>
    );
};

export default AddressPage;
