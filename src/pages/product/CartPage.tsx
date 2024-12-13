import BasicLayout from "../../layouts/BasicLayout.tsx";
import CartComponent from "../../components/product/CartComponent.tsx";


function ProductListPage() {
    return (
        <div>
            <BasicLayout>
                <CartComponent></CartComponent>
            </BasicLayout>
        </div>
    );
}

export default ProductListPage;