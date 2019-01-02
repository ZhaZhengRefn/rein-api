import { RequestConfig, AdaptorConfig, DefaultInit, FetchResponse, BaseAdaptor } from './types/adaptor-fetch';
export default class AdaptorFetch extends BaseAdaptor {
    private config;
    private defaultInit;
    private debug;
    constructor(config?: AdaptorConfig, defaults?: DefaultInit);
    private isSupportFetch;
    apply(requestConfig: RequestConfig): Promise<FetchResponse>;
}
