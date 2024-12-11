import BasicLayout from "../../layouts/BasicLayout.tsx";
import ProductReadComponent from "../../components/product/ProductReadComponent.tsx";


function ProductListPage() {
    return (
        <div>
            <BasicLayout>
                <ProductReadComponent></ProductReadComponent>
            </BasicLayout>
        </div>
    );
}

export default ProductListPage;