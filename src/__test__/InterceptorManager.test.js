import InterceptorManager from '../InterceptorManager';

describe('test class InterceptorManager', () => {
    const noop = () => {};
    let instance = null;
    
    beforeEach(() => {
        instance = new InterceptorManager();
    })
    afterEach(() => {
        instance = null;
    })

    it('should have handlers container', () => {
        expect(instance.handlers).toEqual([]);
    });

    it('should add handlers with public method `use`', () => {
        const handler = {
            fulfilled: jest.fn(),
            rejected: jest.fn()
        };
        const idx = instance.use(handler.fulfilled, handler.rejected);
        expect(instance.handlers).toEqual([handler]);
        expect(idx).toEqual(0);
    });

    it('should remove handler with public method `eject`', () => {
        const handler = {
            fulfilled: jest.fn(),
            rejected: jest.fn()
        };
        instance.use(handler.fulfilled, handler.rejected);
        instance.eject(-1);
        expect(instance.handlers[0]).toEqual(handler);
        instance.eject(1);
        expect(instance.handlers[0]).toEqual(handler);
        instance.eject(0);
        expect(instance.handlers[0]).toBe(null);
    });

    it('should iterate all handlers with public method `forEach`', () => {
        const chain = [];
        const fn = ({fulfilled, rejected}) => {
            chain.push(fulfilled, rejected);
        }
        const handlers = Array.from({ length: 4 }).map(() => ({fulfilled: noop, rejected: noop}));
        Array.from({ length: handlers.length }).forEach((item, index) => {
            const cur = handlers[index];
            instance.use(cur.fulfilled, cur.rejected);
        })
        instance.forEach(fn);
        expect(chain[0]).toBe(handlers[0].fulfilled);
    });
});