import { create } from 'zustand';
import {devtools, persist, PersistStorage} from 'zustand/middleware';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 장바구니에 담을 제품의 인터페이스 정의
export interface CartItem {
    productID: number;
    name: string;
    quantity: number;
    totalPrice: number;
}

export interface CartState {
    products: CartItem[];
    selectedProducts: number[]; // 선택된 상품 ID 배열 추가
    addToCart: (item: CartItem) => void;
    removeFromCart: (productID: number) => void;
    updateProductQuantity: (productID: number, newQuantity: number) => void;
    toggleSelectProduct: (productID: number) => void; // 개별 상품 선택/해제
    selectAllProducts: () => void; // 전체 선택
    clearSelection: () => void; // 선택 초기화
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        devtools(
            (set) => ({
                products: [],
                selectedProducts: [], // 초기값 빈 배열
                addToCart: (item) =>
                    set((state) => {
                        const existingProduct = state.products.find((p) => p.productID === item.productID);
                        let updatedProducts;
                        if (existingProduct) {
                            updatedProducts = state.products.map((p) =>
                                p.productID === item.productID
                                    ? {
                                        ...p,
                                        quantity: p.quantity + item.quantity,
                                        totalPrice: p.totalPrice + item.totalPrice,
                                    }
                                    : p
                            );
                        } else {
                            updatedProducts = [...state.products, item];
                        }
                        return { products: updatedProducts };
                    }),
                removeFromCart: (productID) =>
                    set((state) => {
                        const updatedProducts = state.products.filter((p) => p.productID !== productID);
                        return { products: updatedProducts };
                    }),
                updateProductQuantity: (productID, newQuantity) =>
                    set((state) => {
                        const updatedProducts = state.products.map((p) =>
                            p.productID === productID
                                ? {
                                    ...p,
                                    quantity: newQuantity,
                                    totalPrice: (p.totalPrice / p.quantity) * newQuantity,
                                }
                                : p
                        );
                        return { products: updatedProducts };
                    }),
                toggleSelectProduct: (productID) =>
                    set((state) => {
                        const isSelected = state.selectedProducts.includes(productID);
                        const updatedSelection = isSelected
                            ? state.selectedProducts.filter((id) => id !== productID)
                            : [...state.selectedProducts, productID];
                        return { selectedProducts: updatedSelection };
                    }),
                selectAllProducts: () =>
                    set((state) => ({
                        selectedProducts: state.products.map((product) => product.productID),
                    })),
                clearSelection: () => set(() => ({ selectedProducts: [] })),
                clearCart: () => set(() => ({ products: [], selectedProducts: [] })),
            })
        ),
        {
            name: 'cart',
            getStorage: (): PersistStorage<CartState> => ({
                getItem: (name) => {
                    const savedCart = cookies.get(name);
                    try {
                        return savedCart ? JSON.parse(savedCart) : null;
                    } catch (error) {
                        console.error('쿠키 데이터 파싱 오류:', error);
                        cookies.remove(name);
                        return { products: [], selectedProducts: [] };
                    }
                },
                setItem: (name, value) => cookies.set(name, JSON.stringify(value), { path: '/', maxAge: 3600 }),
                removeItem: (name) => cookies.remove(name, { path: '/' }),
            }),
        }
    )
);
