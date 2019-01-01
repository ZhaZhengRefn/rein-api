type Func = (...args: any[]) => Promise<any>;

export default class InterceptorManager {
  private handlers: ({
    fulfilled: Func;
    rejected: Func;
  } | null)[] = [];
  constructor() {}

  use(fulfilled: Func, rejected: Func) {
    this.handlers.push({
      fulfilled,
      rejected
    });
    return this.handlers.length - 1;
  }

  eject(id: number) {
    if (id < this.handlers.length && id > -1) {
      this.handlers[id] = null;
    }
  }

  forEach(fn: (...args: any[]) => any) {
    this.handlers.forEach(handler => {
      if (handler != null) {
        try {
          fn(handler);
        } catch (error) {
          console.error(`[InterceptorManager error]: `, error);
        }
      }
    });
  }
}
