import { RequestConfig, FetchResponse, FetchError } from './types/adaptor-fetch';
export declare function isObject(val: any): val is object;
export declare function isFormData(val: any): val is FormData;
export declare function isFile(val: any): val is File;
export declare function isURLSearchParams(val: any): val is URLSearchParams;
export declare function isDate(val: any): val is Date;
export declare function parseHeaders(headers: Headers): any;
export declare function enrichErrorData(error: Error, response: FetchResponse, config: RequestConfig): FetchError;
export declare function createError(message: string, response: FetchResponse, config: RequestConfig): FetchError;
export declare function buildUrl(baseUrl: string, prefix: string | undefined, url: string, restful?: boolean, resource?: {
    [props: string]: string | number;
}): string;
export declare function transformData(this: any, data: object | undefined, headers: object | undefined, fns: ((...args: any[]) => any)[]): void;
export declare function addQuery(url: string, params: object): string;
export declare function parseData(data: any): any;
export declare function merge(...args: any[]): any;
