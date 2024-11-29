export interface ICategory {
    categoryID: number;
    name: string;
}

export interface IPageRequestDTO {
    page: number;
    size: number;
}

export interface IPageResponse {
    dtoList: ICategory[];
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
