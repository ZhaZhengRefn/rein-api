import { FetchHeaders } from './dispatch-request';
export declare type Methods = 'GET' | 'HEAD' | 'DELETE' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';
export declare enum MethodNames {
    'GET' = "GET",
    'HEAD' = "HEAD",
    'DELETE' = "DELETE",
    'OPTIONS' = "OPTIONS",
    'POST' = "POST",
    'PUT' = "PUT",
    'PATCH' = "PATCH"
}
export interface RequestConfig {
    url: string;
    method?: Methods;
    data?: object;
    headers?: FetchHeaders;
}
export interface AdaptorConfig {
    debug?: boolean;
    validateResponse?: (response: FetchResponse) => boolean;
}
export interface DefaultInit {
    method?: Methods;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    keepalive?: boolean;
    redirect?: RequestRedirect;
    referrerPolicy?: ReferrerPolicy;
}
export interface FetchResponse {
    data: object;
    status: number;
    statusText: string;
    headers: object;
    config: RequestConfig;
    init: RequestInit;
}
export interface FetchError extends Error {
    config: RequestConfig;
    response: FetchResponse;
    isFetchError: true;
    description?: string;
    number?: number;
    fileName: number;
    lineNumber: number;
    columnNumber: number;
    toJSON: () => {
        message: string;
        name: string;
        stack: Error['stack'];
        description?: string;
        number?: number;
        fileName?: number;
        lineNumber?: number;
        columnNumber?: number;
        config: RequestConfig;
    };
}
export declare abstract class BaseAdaptor {
    constructor();
    apply(config: RequestConfig): Promise<FetchResponse>;
}
