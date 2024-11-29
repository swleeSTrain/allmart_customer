export interface OrderItem {
    orderItemId: number;
    quantity: number;
    unitPrice: string;
    productId: number;
    productName: string;
}

export interface OrderList {
    orderId: number;
    customerId: string;
    status: string;
    totalAmount: string;
    orderTime: string;
    orderItems: OrderItem[];
    payment?: {
        paymentMethod: string;
        paymentTime: string;
    };
}