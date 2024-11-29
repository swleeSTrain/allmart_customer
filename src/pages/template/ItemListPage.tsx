import ItemListComponent from "../../components/template/ItemListComponent.tsx";
import Header from "../../layouts/Header.tsx";



const itemListPage = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <ItemListComponent/>
        </div>
    )
}

export default itemListPage;