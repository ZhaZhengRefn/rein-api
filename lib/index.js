"use strict";
exports.__esModule = true;
var AdaptorFetch_1 = require("./AdaptorFetch");
var InterceptorManager_1 = require("./InterceptorManager");
var DispatchRequest_1 = require("./DispatchRequest");
var Rein = (function () {
    function Rein(config, adaptor) {
        this.debug = config.debug || false;
        this.debug && console.info("[rein-api]: The config of Rein is ", config);
        this.adaptor = adaptor || new AdaptorFetch_1["default"]({ debug: this.debug });
        this.interceptors = {
            request: new InterceptorManager_1["default"](),
            response: new InterceptorManager_1["default"]()
        };
        this.dispatcher = new DispatchRequest_1["default"](config, this.adaptor);
        this.request = this.request.bind(this);
    }
    Rein.prototype.request = function (options) {
        this.debug &&
            console.info("[rein-api]: The options of Rein.request is ", options);
        var promise = Promise.resolve(options);
        var dispatchRequest = this.dispatcher.dispatch;
        var chain = [dispatchRequest, undefined];
        this.interceptors.request.forEach(function (interceptor) {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        this.interceptors.response.forEach(function (interceptor) {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });
        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
    };
    return Rein;
}());
exports["default"] = Rein;
