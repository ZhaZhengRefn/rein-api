type ContentType =
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'application/json';
export interface CheckMap {
  [apiKey: string]: boolean;
}
export interface ApiOption {
  url: string;
  restful?: boolean;
  prefix?: string;
  meta?: Record<string, string>;
}
export interface ApiOptionMap {
  [apiKey: string]: ApiOption;
}
export interface ApiModule {
  default: ApiOptionMap;
  prefix?: string;
}
