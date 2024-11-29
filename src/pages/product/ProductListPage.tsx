import ProductListComponent from "../../components/product/ProductListComponent.tsx";
import BasicLayout from "../../layouts/BasicLayout.tsx";


function ProductListPage() {
    return (
        <div>
            <BasicLayout>
                <ProductListComponent></ProductListComponent>
            </BasicLayout>
        </div>
    );
}

export default ProductListPage;