"use strict";
exports.__esModule = true;
var InterceptorManager = (function () {
    function InterceptorManager() {
        this.handlers = [];
    }
    InterceptorManager.prototype.use = function (fulfilled, rejected) {
        this.handlers.push({
            fulfilled: fulfilled,
            rejected: rejected
        });
        return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function (id) {
        if (id < this.handlers.length && id > -1) {
            this.handlers[id] = null;
        }
    };
    InterceptorManager.prototype.forEach = function (fn) {
        this.handlers.forEach(function (handler) {
            if (handler != null) {
                try {
                    fn(handler);
                }
                catch (error) {
                    console.error("[InterceptorManager error]: ", error);
                }
            }
        });
    };
    return InterceptorManager;
}());
exports["default"] = InterceptorManager;
