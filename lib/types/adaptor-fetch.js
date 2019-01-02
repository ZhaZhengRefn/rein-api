"use strict";
exports.__esModule = true;
var MethodNames;
(function (MethodNames) {
    MethodNames["GET"] = "GET";
    MethodNames["HEAD"] = "HEAD";
    MethodNames["DELETE"] = "DELETE";
    MethodNames["OPTIONS"] = "OPTIONS";
    MethodNames["POST"] = "POST";
    MethodNames["PUT"] = "PUT";
    MethodNames["PATCH"] = "PATCH";
})(MethodNames = exports.MethodNames || (exports.MethodNames = {}));
var BaseAdaptor = (function () {
    function BaseAdaptor() {
    }
    BaseAdaptor.prototype.apply = function (config) {
        throw new Error('must implement apply method.');
    };
    return BaseAdaptor;
}());
exports.BaseAdaptor = BaseAdaptor;
