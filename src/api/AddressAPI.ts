
import { AddressForm, Address } from "../types/address.ts";

const address ="https://allmartservice.shop/api/v1/addresses" // API 기본 경로

// 주소 등록 API
export const saveAddress = async (addressData: AddressForm): Promise<Address> => {
    const res = await fetch(address, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
    });

    if (!res.ok) {
        throw new Error("주소 등록에 실패했습니다.");
    }

    return res.json(); // 등록된 주소 반환
};
