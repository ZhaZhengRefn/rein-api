import * as utils from './utils';
import {
  Methods,
  RequestConfig,
  AdaptorConfig,
  DefaultInit,
  FetchResponse,
  FetchError,
  BaseAdaptor
} from './types/adaptor-fetch';

const DEFAULT_CONFIG: AdaptorConfig = {
  validateResponse: function(response: FetchResponse) {
    const status = response.status;
    if (status >= 200 && status < 300) {
      return true;
    }
    return false;
  }
};

const DEFAULT_INIT: DefaultInit = {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
  cache: 'no-cache',
  redirect: 'follow',
  // keepalive: true,
  referrerPolicy: 'no-referrer-when-downgrade'
};

const mergeInit = (function() {
  const strats: {
    match: (key: string) => boolean;
    action:
      | ((selfs: RequestConfig, target: DefaultInit) => void)
      | ((selfs: RequestConfig, target: DefaultInit, key: string) => void);
  }[] = [
    {
      match(key: string) {
        return key === 'method';
      },
      action(selfs: RequestConfig, target: DefaultInit) {
        target.method = selfs.method
          ? (selfs.method.toUpperCase() as Methods)
          : 'GET';
      }
    },
    {
      match(key: string) {
        return key === 'data';
      },
      action(selfs: RequestConfig, target: DefaultInit) {
        const method = selfs.method || target.method;
        if (['GET', 'HEAD'].indexOf(method!.toUpperCase()) === -1) {
          (target as any).body = selfs.data;
        }
      }
    },
    {
      match(key: string) {
        const allowKeys = [
          'headers',
          'mode',
          'credentials',
          'cache',
          'redirect',
          'referrer',
          'referrerPolicy',
          'keepalive',
          'integrity'
        ];
        return allowKeys.indexOf(key) > -1;
      },
      action(selfs: RequestConfig, target: DefaultInit, key: string) {
        (target as any)[key] = (selfs as any)[key];
      }
    }
  ];
  return function(
    this: AdaptorFetch,
    selfs: RequestConfig,
    target: DefaultInit
  ) {
    Object.keys(selfs).forEach((key: string) => {
      for (let i = 0; i < strats.length; i++) {
        const curStrat = strats[i];
        if (curStrat.match(key)) {
          return curStrat.action.call(this, selfs, target, key);
        }
      }
    });
  };
})();

export default class AdaptorFetch extends BaseAdaptor {
  private config: AdaptorConfig;
  private defaultInit: DefaultInit;
  private debug: boolean;

  constructor(config: AdaptorConfig = {}, defaults: DefaultInit = {}) {
    super();
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.debug = this.config.debug || false;

    this.defaultInit = { ...DEFAULT_INIT, ...defaults };

    this.debug &&
      console.info(`[rein-api]: The config of AdaptorFetch is `, config);

    if (!this.isSupportFetch()) {
      throw new Error('[AdaptorFetch]: does not support fetch api.');
    }
  }

  private isSupportFetch(): boolean {
    return typeof window.fetch !== 'undefined';
  }

  public apply(requestConfig: RequestConfig): Promise<FetchResponse> {
    const defaultInit = { ...this.defaultInit };

    // merge requestConfig to defaultInit
    mergeInit.call(this, requestConfig, defaultInit);

    const init: RequestInit = defaultInit;
    this.debug &&
      console.info(
        `[rein-api]: The init of AdaptorFetch.apply is `,
        defaultInit
      );

    return window
      .fetch(requestConfig.url, init)
      .then((response: Response) => {
        const responseInfo = {
          status: response.status,
          statusText: response.statusText,
          headers: utils.parseHeaders(response.headers),
          config: requestConfig,
          init
        };
        let result = {};
        if (response.statusText.toLowerCase() === 'ok') {
          result = response.json();
        } else {
          result = response.text();
        }
        return Promise.all([result, Promise.resolve(responseInfo)]);
      })
      .then(([data, info]) => {
        const response: FetchResponse = { data, ...info };
        if (this.config.validateResponse!(response)) {
          return Promise.resolve(response);
        }
        const fetchError: FetchError = utils.createError(
          'Request failed with status code ' + response.status,
          response,
          requestConfig
        );
        return Promise.reject(fetchError);
      });
  }
}
