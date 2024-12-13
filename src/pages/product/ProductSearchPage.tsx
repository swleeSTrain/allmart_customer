import BasicLayout from "../../layouts/BasicLayout.tsx";
import ProductSearchComponent from "../../components/product/ProductSearchComponent.tsx";

function ProductListPage() {
    return (
        <div>
            <BasicLayout>
                <ProductSearchComponent></ProductSearchComponent>
            </BasicLayout>
        </div>
    );
}

export default ProductListPage;