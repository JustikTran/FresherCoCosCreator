export declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IResponse<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T | T[];
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
    }
}