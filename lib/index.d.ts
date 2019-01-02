import { DispatchConfig, DispatchOption } from './types/dispatch-request';
import { BaseAdaptor } from './types/adaptor-fetch';
export default class Rein {
    private adaptor;
    private interceptors;
    private dispatcher;
    private debug;
    constructor(config: DispatchConfig, adaptor?: BaseAdaptor);
    request(options: DispatchOption): Promise<any>;
}
