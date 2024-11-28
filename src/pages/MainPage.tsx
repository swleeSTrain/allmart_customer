import BasicLayout from "../layouts/BasicLayout.tsx";
import MartPage from "./mart/MartPage.tsx";





function MainPage() {


    return (
        <BasicLayout>

            <div>
                <MartPage/>
            </div>
        </BasicLayout>
    );
}

export default MainPage;