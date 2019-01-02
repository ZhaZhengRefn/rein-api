"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var utils = require("./utils");
var adaptor_fetch_1 = require("./types/adaptor-fetch");
var DEFAULT_CONFIG = {
    validateResponse: function (response) {
        var status = response.status;
        if (status >= 200 && status < 300) {
            return true;
        }
        return false;
    }
};
var DEFAULT_INIT = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    cache: 'no-cache',
    redirect: 'follow',
    referrerPolicy: 'no-referrer-when-downgrade'
};
var mergeInit = (function () {
    var strats = [
        {
            match: function (key) {
                return key === 'method';
            },
            action: function (selfs, target) {
                target.method = selfs.method
                    ? selfs.method.toUpperCase()
                    : 'GET';
            }
        },
        {
            match: function (key) {
                return key === 'data';
            },
            action: function (selfs, target) {
                var method = selfs.method || target.method;
                if (['GET', 'HEAD'].indexOf(method.toUpperCase()) === -1) {
                    target.body = selfs.data;
                }
            }
        },
        {
            match: function (key) {
                var allowKeys = [
                    'headers',
                    'mode',
                    'credentials',
                    'cache',
                    'redirect',
                    'referrer',
                    'referrerPolicy',
                    'keepalive',
                    'integrity'
                ];
                return allowKeys.indexOf(key) > -1;
            },
            action: function (selfs, target, key) {
                target[key] = selfs[key];
            }
        }
    ];
    return function (selfs, target) {
        var _this = this;
        Object.keys(selfs).forEach(function (key) {
            for (var i = 0; i < strats.length; i++) {
                var curStrat = strats[i];
                if (curStrat.match(key)) {
                    return curStrat.action.call(_this, selfs, target, key);
                }
            }
        });
    };
})();
var AdaptorFetch = (function (_super) {
    __extends(AdaptorFetch, _super);
    function AdaptorFetch(config, defaults) {
        if (config === void 0) { config = {}; }
        if (defaults === void 0) { defaults = {}; }
        var _this = _super.call(this) || this;
        _this.config = __assign({}, DEFAULT_CONFIG, config);
        _this.debug = _this.config.debug || false;
        _this.defaultInit = __assign({}, DEFAULT_INIT, defaults);
        _this.debug &&
            console.info("[rein-api]: The config of AdaptorFetch is ", config);
        if (!_this.isSupportFetch()) {
            throw new Error('[AdaptorFetch]: does not support fetch api.');
        }
        return _this;
    }
    AdaptorFetch.prototype.isSupportFetch = function () {
        return typeof window.fetch !== 'undefined';
    };
    AdaptorFetch.prototype.apply = function (requestConfig) {
        var _this = this;
        var defaultInit = __assign({}, this.defaultInit);
        mergeInit.call(this, requestConfig, defaultInit);
        var init = defaultInit;
        this.debug &&
            console.info("[rein-api]: The init of AdaptorFetch.apply is ", defaultInit);
        return window
            .fetch(requestConfig.url, init)
            .then(function (response) {
            var responseInfo = {
                status: response.status,
                statusText: response.statusText,
                headers: utils.parseHeaders(response.headers),
                config: requestConfig,
                init: init
            };
            var result = {};
            if (response.statusText.toLowerCase() === 'ok') {
                result = response.json();
            }
            else {
                result = response.text();
            }
            return Promise.all([result, Promise.resolve(responseInfo)]);
        })
            .then(function (_a) {
            var data = _a[0], info = _a[1];
            var response = __assign({ data: data }, info);
            if (_this.config.validateResponse(response)) {
                return Promise.resolve(response);
            }
            var fetchError = utils.createError('Request failed with status code ' + response.status, response, requestConfig);
            return Promise.reject(fetchError);
        });
    };
    return AdaptorFetch;
}(adaptor_fetch_1.BaseAdaptor));
exports["default"] = AdaptorFetch;
