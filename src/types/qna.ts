export interface IQuestion {
    qno: number;
    title: string;
    content: string;
    writer: string;
    tags: string[];
    createdDate: string;
}

export interface IAnswer {
    ano: number;
    content: string;
    writer: string;
    createdDate: string;
}
