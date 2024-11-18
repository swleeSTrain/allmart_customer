

export interface IPageResponse {
    // content: ICustomer[],
    totalElements: number,
    number: number,
    first: boolean
    last: boolean
    size: number
    totalPages: number
}