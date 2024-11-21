import React from "react";
import Header from "./Header.tsx";


function BasicLayout({children}: { children: React.ReactNode }) {

    return (
            <Header>{children}</Header>
    );
}


export default BasicLayout;