import { FetchHeaders, DispatchOption } from './dispatch-request';

export type Methods =
  | 'GET'
  | 'HEAD'
  | 'DELETE'
  | 'OPTIONS'
  | 'POST'
  | 'PUT'
  | 'PATCH';
export type LowerCaseMethods =
  | 'get'
  | 'head'
  | 'delete'
  | 'options'
  | 'post'
  | 'put'
  | 'patch';
export enum MethodNames {
  'GET' = 'GET',
  'HEAD' = 'HEAD',
  'DELETE' = 'DELETE',
  'OPTIONS' = 'OPTIONS',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'PATCH' = 'PATCH'
}
// 单个请求的配置，包含了init与url等的配置项
export interface RequestConfig {
  url: string;
  method?: Methods;
  data?: object;
  headers?: FetchHeaders;
  // params?: URLSearchParams | object;
  // timeout?: number;
  // responseType?: XMLHttpRequestResponseType;
}
// adaptor实例的初始化配置项
export interface AdaptorConfig {
  debug?: boolean;
  validateResponse?: (response: FetchResponse) => boolean;
}
// 默认的init对象，即fetch api 的第二个参数
export interface DefaultInit {
  method?: Methods;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  keepalive?: boolean;
  redirect?: RequestRedirect;
  referrerPolicy?: ReferrerPolicy;
}
// 响应体的结构
export interface FetchResponse {
  data: object;
  status: number;
  statusText: string;
  headers: object;
  config: RequestConfig;
  init: RequestInit;
}
export type ExtendedFetchResponse = {
  options: DispatchOption;
} & FetchResponse;
// 响应错误的结构
export interface FetchError extends Error {
  config: RequestConfig;
  // code?: number | string;
  response: FetchResponse;
  isFetchError: true;
  // Microsoft
  description?: string;
  number?: number;
  // Mozilla
  fileName: number;
  lineNumber: number;
  columnNumber: number;
  // native
  toJSON: () => {
    // Standard
    message: string;
    name: string;
    stack: Error['stack'];
    // Microsoft
    description?: string;
    number?: number;
    // Mozilla
    fileName?: number;
    lineNumber?: number;
    columnNumber?: number;
    // Fetch
    config: RequestConfig;
  };
}
export type ExtendedFetchError = {
  options: DispatchOption;
} & FetchError;

export abstract class BaseAdaptor {
  constructor() {}

  public apply(config: RequestConfig): Promise<FetchResponse> {
    throw new Error('must implement apply method.');
  }
}
