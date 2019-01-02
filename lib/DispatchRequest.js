"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var adaptor_fetch_1 = require("./types/adaptor-fetch");
var utils = require("./utils");
var DEFAULTS = {
    dispatchConfig: {
        baseUrl: window.location.origin,
        headers: {
            common: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        },
        transformRequest: [
            function transformRequest(data, headers) {
                if (utils.isFormData(data) || utils.isFile(data)) {
                    return data;
                }
                if (utils.isURLSearchParams(data)) {
                    if (!!headers && headers['Content-Type']) {
                        headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    }
                    return data.toString();
                }
                if (utils.isObject(data)) {
                    if (!!headers && headers['Content-Type']) {
                        headers['Content-Type'] = 'application/json';
                    }
                    return JSON.stringify(data);
                }
                return data;
            }
        ],
        transformResponse: [
            function transformResponse(data, headers) {
                try {
                    typeof data === 'string' && (data = JSON.parse(data));
                }
                catch (error) { }
                return data;
            }
        ]
    },
    dispatchOption: {
        method: 'GET',
        url: '/',
        restful: false,
        prefix: '/',
        meta: {},
        params: {},
        data: {},
        resource: {}
    }
};
var HEADERS_TO_DELETE = [
    'common'
].concat(Object.keys(adaptor_fetch_1.MethodNames).map(function (k) { return k.toLowerCase(); }));
var DispatchRequest = (function () {
    function DispatchRequest(config, adaptor) {
        this.config = __assign({}, DEFAULTS.dispatchConfig, config);
        this.config.headers = utils.merge({}, config.headers || {}, DEFAULTS.dispatchConfig.headers);
        this.debug = this.config.debug || false;
        this.adaptor = adaptor;
        this.dispatch = this.dispatch.bind(this);
    }
    DispatchRequest.prototype.dispatch = function (options) {
        options = utils.merge({}, DEFAULTS.dispatchOption, options);
        this.debug &&
            console.info("[rein-api]: The option of DispatchRequest.dispatch is ", options);
        var _a = this.config, baseUrl = _a.baseUrl, _b = _a.defaultPrefix, defaultPrefix = _b === void 0 ? '/' : _b, headers = _a.headers, transformRequest = _a.transformRequest, transformResponse = _a.transformResponse;
        var method = options.method, resource = options.resource, data = options.data, url = options.url, restful = options.restful, _c = options.prefix, prefix = _c === void 0 ? '/' : _c, params = options.params;
        var absoluteUrl = utils.buildUrl(baseUrl, prefix || defaultPrefix, url, restful, resource);
        absoluteUrl = utils.addQuery(absoluteUrl, params);
        utils.transformData(data, headers, transformRequest);
        var parsedData = utils.parseData(data);
        var flattenHeaders = __assign({}, (headers.common || {}), (headers[method] || {}), headers);
        HEADERS_TO_DELETE.forEach(function (k) {
            delete flattenHeaders[k];
        });
        return this.adaptor
            .apply({
            url: absoluteUrl,
            method: method,
            data: parsedData,
            headers: flattenHeaders
        })
            .then(function (res) {
            utils.transformData(res.data, res.headers, transformResponse);
            var data = utils.merge(Object.create(null), res.data);
            return Promise.resolve(data);
        }, function (e) {
            utils.transformData(e.response.data, e.response.headers, transformResponse);
            return Promise.reject(e);
        });
    };
    return DispatchRequest;
}());
exports["default"] = DispatchRequest;
