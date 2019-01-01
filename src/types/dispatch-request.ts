import { Methods } from './adaptor-fetch';
import { ApiOption } from './api';

export type Str2Str = Record<string, string>;
interface HeadersCommon {
  common?: Str2Str;
  [prop: string]: any;
}
type HeadersMethod = { [K in Methods]?: Str2Str };
export type FetchHeaders = HeadersCommon & HeadersMethod;
export interface DispatchConfig {
  baseUrl: string;
  defaultPrefix?: string;
  headers?: FetchHeaders;
  transformRequest?: (<T>(data: T, headers?: any) => T | string)[];
  transformResponse?: ((response: Response) => object | string)[];
  debug?: boolean;
}
export type DispatchOption = {
  // 请求方法
  method: Methods;
  // query参数
  params?: Str2Str;
  // body
  data?: FormData | object;
  // 路径参数
  resource?: Str2Str;
} & ApiOption;
