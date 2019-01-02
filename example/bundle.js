(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var Rein = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var adaptorFetch = createCommonjsModule(function (module, exports) {
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
	});

	unwrapExports(adaptorFetch);
	var adaptorFetch_1 = adaptorFetch.MethodNames;
	var adaptorFetch_2 = adaptorFetch.BaseAdaptor;

	var utils = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;
	function encode(val) {
	    return encodeURIComponent(val)
	        .replace(/%40/gi, '@')
	        .replace(/%3A/gi, ':')
	        .replace(/%24/g, '$')
	        .replace(/%2C/gi, ',')
	        .replace(/%20/g, '+')
	        .replace(/%5B/gi, '[')
	        .replace(/%5D/gi, ']');
	}
	function isObject(val) {
	    return val !== null && typeof val === 'object';
	}
	exports.isObject = isObject;
	function isFormData(val) {
	    return typeof FormData !== 'undefined' && val instanceof FormData;
	}
	exports.isFormData = isFormData;
	function isFile(val) {
	    return toString.call(val) === '[object File]';
	}
	exports.isFile = isFile;
	function isURLSearchParams(val) {
	    return (typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams);
	}
	exports.isURLSearchParams = isURLSearchParams;
	function isDate(val) {
	    return Object.prototype.toString.call(val) === '[object Date]';
	}
	exports.isDate = isDate;
	function parseHeaders(headers) {
	    var result = {};
	    if (typeof Headers !== 'undefined' &&
	        headers instanceof Headers &&
	        typeof headers.forEach === 'function') {
	        headers.forEach(function (key, value) {
	            result[key] = value;
	        });
	    }
	    return result;
	}
	exports.parseHeaders = parseHeaders;
	function enrichErrorData(error, response, config) {
	    var fetchError = error;
	    fetchError.config = config;
	    fetchError.response = response;
	    fetchError.isFetchError = true;
	    fetchError.toJSON = function () {
	        return {
	            message: this.message,
	            name: this.name,
	            stack: this.stack,
	            description: this.description,
	            number: this.number,
	            fileName: this.fileName,
	            lineNumber: this.lineNumber,
	            columnNumber: this.columnNumber,
	            config: this.config
	        };
	    };
	    return fetchError;
	}
	exports.enrichErrorData = enrichErrorData;
	function createError(message, response, config) {
	    var error = new Error(message);
	    return enrichErrorData(error, response, config);
	}
	exports.createError = createError;
	function isAbsoluteURL(url) {
	    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	}
	function buildUrl(baseUrl, prefix, url, restful, resource) {
	    if (prefix === void 0) { prefix = '/'; }
	    if (!isAbsoluteURL(url)) {
	        url =
	            baseUrl.replace(/\/+$/, '') +
	                '/' +
	                prefix.replace(/\/+$/, '').replace(/^\/+/, '') +
	                '/' +
	                url.replace(/^\/+/, '');
	    }
	    if (restful && resource != null) {
	        Object.keys(resource).forEach(function (key) {
	            url = url.replace(new RegExp("\\{" + key + "\\}"), resource[key] + '');
	        });
	    }
	    return url;
	}
	exports.buildUrl = buildUrl;
	function transformData(data, headers, fns) {
	    var _this = this;
	    if (data === void 0) { data = {}; }
	    if (headers === void 0) { headers = {}; }
	    fns.forEach(function (fn) {
	        if (typeof fn === 'function') {
	            fn.call(_this, data, headers);
	        }
	    });
	}
	exports.transformData = transformData;
	function paramsSerializer(data) {
	    var parts = [];
	    Object.keys(data).forEach(function (key) {
	        var val = data[key];
	        if (val == null)
	            return;
	        if (Array.isArray(val)) {
	            key = key + "[]";
	        }
	        else {
	            val = [val];
	        }
	        val.forEach(function (v) {
	            if (isDate(v)) {
	                v = v.toISOString();
	            }
	            else if (isObject(v)) {
	                v = JSON.stringify(v);
	            }
	            parts.push(encode(key) + "=" + encode(v));
	        });
	    });
	    return parts.join("&");
	}
	function addQuery(url, params) {
	    if (params == null || !Object.keys(params).length)
	        return url;
	    var query = paramsSerializer(params);
	    if (url.indexOf('?') > -1) {
	        url += "&" + query;
	    }
	    else {
	        url += "?" + query;
	    }
	    return url;
	}
	exports.addQuery = addQuery;
	function parseData(data) {
	    if (isFormData(data) || isFile(data) || isURLSearchParams(data)) {
	        return data;
	    }
	    if (isObject(data)) {
	        return JSON.stringify(data);
	    }
	    return data;
	}
	exports.parseData = parseData;
	function merge() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var result = {};
	    function assignValue(val, key) {
	        if (typeof val === 'object') {
	            if (typeof result[key] === 'object') {
	                result[key] = merge(result[key], val);
	            }
	            else {
	                result[key] = merge({}, val);
	            }
	        }
	        else {
	            result[key] = val;
	        }
	    }
	    args.forEach(function (source) {
	        Object.keys(source).forEach(function (k) {
	            assignValue(source[k], k);
	        });
	    });
	    return result;
	}
	exports.merge = merge;
	});

	unwrapExports(utils);
	var utils_1 = utils.isObject;
	var utils_2 = utils.isFormData;
	var utils_3 = utils.isFile;
	var utils_4 = utils.isURLSearchParams;
	var utils_5 = utils.isDate;
	var utils_6 = utils.parseHeaders;
	var utils_7 = utils.enrichErrorData;
	var utils_8 = utils.createError;
	var utils_9 = utils.buildUrl;
	var utils_10 = utils.transformData;
	var utils_11 = utils.addQuery;
	var utils_12 = utils.parseData;
	var utils_13 = utils.merge;

	var AdaptorFetch_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
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
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
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
	}(adaptorFetch.BaseAdaptor));
	exports["default"] = AdaptorFetch;
	});

	unwrapExports(AdaptorFetch_1);

	var InterceptorManager_1 = createCommonjsModule(function (module, exports) {
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
	});

	unwrapExports(InterceptorManager_1);

	var DispatchRequest_1 = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
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
	].concat(Object.keys(adaptorFetch.MethodNames).map(function (k) { return k.toLowerCase(); }));
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
	            return Promise.resolve(res.data);
	        }, function (e) {
	            utils.transformData(e.response.data, e.response.headers, transformResponse);
	            return Promise.reject(e);
	        });
	    };
	    return DispatchRequest;
	}());
	exports["default"] = DispatchRequest;
	});

	unwrapExports(DispatchRequest_1);

	var lib = createCommonjsModule(function (module, exports) {
	exports.__esModule = true;

	exports.BaseAdaptor = adaptorFetch.BaseAdaptor;



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
	});

	var index = unwrapExports(lib);
	var lib_1 = lib.BaseAdaptor;

	exports.default = index;
	exports.BaseAdaptor = lib_1;

	return exports;

}({}));
