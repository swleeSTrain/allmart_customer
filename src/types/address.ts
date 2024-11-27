
export interface Address {
    id?: number; // ID (서버에서 반환 시 포함)
    postcode: string; // 우편번호
    roadAddress: string; // 도로명 주소
    detailAddress: string; // 상세 주소
    fullAddress?: string; // 전체 주소 (옵션, 서버에서 계산됨)
}

export interface AddressForm {
    postcode: string;
    roadAddress: string;
    detailAddress: string;
}
