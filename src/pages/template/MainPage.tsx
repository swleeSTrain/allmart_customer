import Header from "../../layouts/Header.tsx";
import MainPageComponent from "../../components/template/MainPageComponent.tsx";

const MainPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <MainPageComponent/>
        </div>
    )
}

export default MainPage;