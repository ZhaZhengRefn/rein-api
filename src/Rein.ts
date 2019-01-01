import { DispatchConfig, DispatchOption } from './types/dispatch-request';
import { BaseAdaptor } from './types/adaptor-fetch';

import AdaptorFetch from './AdaptorFetch';
import InterceptorManager from './InterceptorManager';
import DispatchRequest from './DispatchRequest';

export default class Rein {
  private adaptor: BaseAdaptor;
  private interceptors: {
    request: InterceptorManager;
    response: InterceptorManager;
  };
  private dispatcher: DispatchRequest;
  private debug: boolean;
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
