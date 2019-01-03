export {
  DispatchConfig,
  DispatchOption,
  FetchHeaders
} from './types/dispatch-request';
export { ApiOption, ApiOptionMap, ApiModule } from './types/api';
export {
  Methods,
  ExtendedFetchResponse,
  ExtendedFetchError,
  FetchResponse,
  FetchError,
  RequestConfig,
  AdaptorConfig,
  DefaultInit,
  BaseAdaptor
} from './types/adaptor-fetch';

import { BaseAdaptor } from './types/adaptor-fetch';
import { DispatchOption, DispatchConfig } from './types/dispatch-request';
import AdaptorFetch from './AdaptorFetch';
import InterceptorManager from './InterceptorManager';
import DispatchRequest from './DispatchRequest';

export default class Rein {
  private dispatcher: DispatchRequest;
  public adaptor: BaseAdaptor;
  public interceptors: {
    request: InterceptorManager;
    response: InterceptorManager;
  };
  public debug: boolean;
  constructor(config: DispatchConfig, adaptor?: BaseAdaptor) {
    this.debug = config.debug || false;
    this.debug && console.info(`[rein-api]: The config of Rein is `, config);

    this.adaptor = adaptor || new AdaptorFetch({ debug: this.debug });
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
    this.dispatcher = new DispatchRequest(config, this.adaptor);

    this.request = this.request.bind(this);
  }

  request(options: DispatchOption): Promise<any> {
    this.debug &&
      console.info(`[rein-api]: The options of Rein.request is `, options);
    let promise: Promise<any> = Promise.resolve(options);
    const dispatchRequest = this.dispatcher.dispatch;
    const chain = [dispatchRequest, undefined];

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }
}
