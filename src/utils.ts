import {
  RequestConfig,
  FetchResponse,
  FetchError
} from './types/adaptor-fetch';

function encode(val: string) {
  return encodeURIComponent(val)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}
export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object';
}

export function isFormData(val: any): val is FormData {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

export function isFile(val: any): val is File {
  return toString.call(val) === '[object File]';
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return (
    typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
  );
}

export function isDate(val: any): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]';
}

export function parseHeaders(headers: Headers): any {
  let result: any = {};
  if (
    typeof Headers !== 'undefined' &&
    headers instanceof Headers &&
    typeof headers.forEach === 'function'
  ) {
    headers.forEach((key, value) => {
      result[key] = value;
    });
  }
  return result;
}

export function enrichErrorData(
  error: Error,
  response: FetchResponse,
  config: RequestConfig
): FetchError {
  const fetchError = error as FetchError;
  fetchError.config = config;
  fetchError.response = response;
  fetchError.isFetchError = true;
  fetchError.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      stack: this.stack,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      // Fetch
      config: this.config
      // code: this.code,
    };
  };
  return fetchError;
}

export function createError(
  message: string,
  response: FetchResponse,
  config: RequestConfig
): FetchError {
  const error = new Error(message);
  return enrichErrorData(error, response, config);
}

function isAbsoluteURL(url: string): boolean {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

export function buildUrl(
  baseUrl: string,
  prefix: string = '/',
  url: string,
  restful?: boolean,
  resource?: {
    [props: string]: string | number;
  }
): string {
  // 拼接baseUrl
  if (!isAbsoluteURL(url)) {
    url =
      baseUrl.replace(/\/+$/, '') +
      '/' +
      prefix.replace(/\/+$/, '').replace(/^\/+/, '') +
      '/' +
      url.replace(/^\/+/, '');
  }
  // 根据是否restful拼接参数
  if (restful && resource != null) {
    Object.keys(resource).forEach(key => {
      url = url.replace(new RegExp(`\\{` + key + `\\}`), resource[key] + '');
    });
  }
  return url;
}

export function transformData(
  this: any,
  data: object = {},
  headers: object = {},
  fns: ((...args: any[]) => any)[]
) {
  fns.forEach(fn => {
    if (typeof fn === 'function') {
      fn.call(this, data, headers);
    }
  });
}

function paramsSerializer(data: object): string {
  const parts: string[] = [];
  Object.keys(data).forEach(key => {
    let val: any = (data as any)[key];
    if (val == null) return;
    if (Array.isArray(val)) {
      key = `${key}[]`;
    } else {
      val = [val];
    }

    val.forEach((v: Date | object | string) => {
      if (isDate(v)) {
        v = v.toISOString();
      } else if (isObject(v)) {
        v = JSON.stringify(v);
      }
      parts.push(`${encode(key)}=${encode(v)}`);
    });
  });

  return parts.join(`&`);
}

export function addQuery(url: string, params: object) {
  if (params == null || !Object.keys(params).length) return url;

  const query = paramsSerializer(params);
  if (url.indexOf('?') > -1) {
    url += `&${query}`;
  } else {
    url += `?${query}`;
  }
  return url;
}

export function parseData(data: any) {
  if (isFormData(data) || isFile(data) || isURLSearchParams(data)) {
    return data;
  }
  if (isObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}
