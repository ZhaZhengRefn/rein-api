import {
  ExtendedFetchResponse,
  ExtendedFetchError,
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
import * as utils from './utils';

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
  public adaptor: BaseAdaptor;
  public debug: boolean;

  constructor(config: DispatchConfig, adaptor: BaseAdaptor) {
    this.config = { ...DEFAULTS.dispatchConfig, ...config };
    this.config.headers = utils.merge(
      {},
      config.headers || {},
      DEFAULTS.dispatchConfig.headers
    );
    this.debug = this.config.debug || false;
    this.adaptor = adaptor;
    this.dispatch = this.dispatch.bind(this);
  }

  public dispatch(options: DispatchOption): Promise<ExtendedFetchResponse> {
    options = utils.merge({}, DEFAULTS.dispatchOption, options);
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
    const { method, resource, url, restful, prefix = '/', params } = options;
    let data = options.data;

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
    data = utils.transformData(data, headers, transformRequest!);

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
          res.data = utils.transformData(
            res.data,
            res.headers,
            transformResponse!
          );
          const extended: ExtendedFetchResponse = { ...res, options };
          return Promise.resolve(extended);
        },
        (e: FetchError) => {
          // 转换response
          e.response.data = utils.transformData(
            e.response.data,
            e.response.headers,
            transformResponse!
          );
          const extended: ExtendedFetchError = { ...e, options };
          return Promise.reject(extended);
        }
      );
  }
}
