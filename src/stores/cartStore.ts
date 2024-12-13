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
    addToCart: (item: CartItem) => void;
    removeFromCart: (productID: number) => void;
    clearCart: () => void;
}


export const useCartStore = create<CartState>()(
    persist(
        devtools(
            (set) => ({
                products: [],
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
                        return { products: updatedProducts }; // persist middleware가 저장 처리
                    }),
                removeFromCart: (productID) =>
                    set((state) => {
                        const updatedProducts = state.products.filter((p) => p.productID !== productID);
                        return { products: updatedProducts }; // persist middleware가 저장 처리
                    }),
                clearCart: () => set(() => ({ products: [] })), // persist middleware가 저장 처리
            })
        ),
        {
            name: 'cart', // 쿠키에 저장될 이름
            getStorage: (): PersistStorage<CartState> => ({
                getItem: (name) => {
                    const savedCart = cookies.get(name);
                    try {
                        return savedCart ? JSON.parse(savedCart) : null;
                    } catch (error) {
                        console.error('쿠키 데이터 파싱 오류:', error);
                        cookies.remove(name); // 잘못된 쿠키 삭제
                        return { products: [] }; // 혹은 기본값 반환
                    }
                },
                setItem: (name, value) => cookies.set(name, JSON.stringify(value), { path: '/', maxAge: 3600 }),
                removeItem: (name) => cookies.remove(name, { path: '/' }),
            }),
        }
    )
);