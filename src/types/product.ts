export interface IProduct {
    productID: number;
    name: string;
    sku: string;
    price: number;
    thumbnailImage: string;
}

export interface IPageRequestDTO {
    page: number;
    size: number;
    keyword?: string;
    type?: string;
    categoryID?: number;
}

export interface IPageResponse {
    dtoList: IProduct[];
    pageNumList: number[];
    pageRequestDTO: IPageRequestDTO;
    prev: boolean;
    next: boolean;
    totalCount: number;
    prevPage: number;
    nextPage: number;
    totalPage: number;
    current: number;
}
