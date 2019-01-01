import {
  FetchResponse,
  FetchError,
  MethodNames,
  BaseAdaptor
} from './types/adaptor-fetch';
import {
  Str2Str,
  DispatchConfig,
  DispatchOption,
  FetchHeaders
} from './types/dispatch-request';
import * as utils from './utils.ts';
import _merge from 'lodash.merge';
// const _merge = require('lodash.merge');

const DEFAULTS: {
  dispatchConfig: DispatchConfig;
  dispatchOption: DispatchOption;
} = {
  dispatchConfig: {
    baseUrl: window.location.origin,
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    },
    transformRequest: [
      function transformRequest<T>(data: T, headers?: any): T | string {
        if (utils.isFormData(data) || utils.isFile(data)) {
          return data;
        }
        if (utils.isURLSearchParams(data)) {
          if (!!headers && headers['Content-Type']) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
          }
          return data.toString();
        }
        if (utils.isObject(data)) {
          if (!!headers && headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
          }
          return JSON.stringify(data);
        }
        return data;
      }
    ],
    transformResponse: [
      function transformResponse<T>(data: T, headers?: any): T | object {
        try {
          typeof data === 'string' && (data = JSON.parse(data));
        } catch (error) {}
        return data;
      }
    ]
  },
  dispatchOption: {
    method: 'GET',
    url: '/',
    restful: false,
    prefix: '/',
    meta: {},
    params: {},
    data: {},
    resource: {}
  }
};
const HEADERS_TO_DELETE = [
  'common',
  ...Object.keys(MethodNames).map((k: string) => k.toLowerCase())
];

export default class DispatchRequest {
  private config: DispatchConfig;
  private adaptor: BaseAdaptor;
  private debug: boolean;

  constructor(config: DispatchConfig, adaptor: BaseAdaptor) {
    this.config = { ...DEFAULTS.dispatchConfig, ...config };
    this.config.headers = _merge(
      {},
      config.headers || {},
      DEFAULTS.dispatchConfig.headers
    );
    this.debug = this.config.debug || false;
    this.adaptor = adaptor;
    this.dispatch = this.dispatch.bind(this);
  }

  public dispatch(options: DispatchOption): Promise<object> {
    options = _merge({}, DEFAULTS.dispatchOption, options);
    this.debug &&
      console.info(
        `[rein-api]: The option of DispatchRequest.dispatch is `,
        options
      );
    const {
      baseUrl,
      defaultPrefix = '/',
      headers,
      transformRequest,
      transformResponse
    } = this.config;
    const {
      method,
      resource,
      data,
      url,
      restful,
      prefix = '/',
      params
    } = options;

    // 拼接 url
    let absoluteUrl = utils.buildUrl(
      baseUrl,
      prefix || defaultPrefix,
      url,
      restful,
      resource
    );

    // 拼接 query 参数
    absoluteUrl = utils.addQuery(absoluteUrl, params!);

    // 转换 data
    utils.transformData(data, headers, transformRequest!);

    // 序列化 data
    const parsedData = utils.parseData(data);

    // 展开 headers
    const flattenHeaders: FetchHeaders = {
      ...(headers!.common || {}),
      ...(headers![method] || {}),
      ...headers
    };
    HEADERS_TO_DELETE.forEach((k: string) => {
      delete flattenHeaders[k];
    });

    return this.adaptor
      .apply({
        url: absoluteUrl,
        method: method,
        data: parsedData,
        headers: flattenHeaders
      })
      .then(
        (res: FetchResponse) => {
          // 转换response
          utils.transformData(res.data, res.headers, transformResponse!);
          const data = _merge(Object.create(null), res.data);
          return Promise.resolve(data);
        },
        (e: FetchError) => {
          // 转换response
          utils.transformData(
            e.response.data,
            e.response.headers,
            transformResponse!
          );
          return Promise.reject(e);
        }
      );
  }
}