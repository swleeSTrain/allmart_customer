export interface IQuestion {
    qno: number;
    title: string;
    content: string;
    writer: string | null;
    createdDate: string;
    modifiedDate: string;
    tags: string[];
    attachFiles: string[];
}

export interface IAnswer {
    ano: number;
    content: string;
    writer: string;
    createdDate: string;
}
