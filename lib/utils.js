"use strict";
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
