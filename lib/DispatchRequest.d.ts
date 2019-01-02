import { BaseAdaptor } from './types/adaptor-fetch';
import { DispatchConfig, DispatchOption } from './types/dispatch-request';
export default class DispatchRequest {
    private config;
    private adaptor;
    private debug;
    constructor(config: DispatchConfig, adaptor: BaseAdaptor);
    dispatch(options: DispatchOption): Promise<object>;
}
