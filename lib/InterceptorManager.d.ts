declare type Func = (...args: any[]) => Promise<any>;
export default class InterceptorManager {
    private handlers;
    constructor();
    use(fulfilled: Func, rejected: Func): number;
    eject(id: number): void;
    forEach(fn: (...args: any[]) => any): void;
}
export {};
