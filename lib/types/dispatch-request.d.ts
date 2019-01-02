import { Methods } from './adaptor-fetch';
import { ApiOption } from './api';
export declare type Str2Str = Record<string, string>;
interface HeadersCommon {
    common?: Str2Str;
    [prop: string]: any;
}
declare type HeadersMethod = {
    [K in Methods]?: Str2Str;
};
export declare type FetchHeaders = HeadersCommon & HeadersMethod;
export interface DispatchConfig {
    baseUrl: string;
    defaultPrefix?: string;
    headers?: FetchHeaders;
    transformRequest?: (<T>(data: T, headers?: any) => T | string)[];
    transformResponse?: ((response: Response) => object | string)[];
    debug?: boolean;
}
export declare type DispatchOption = {
    method: Methods;
    params?: Str2Str;
    data?: FormData | object;
    resource?: Str2Str;
} & ApiOption;
export {};
