(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var WechatShare = (function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var Event = /** @class */ (function () {
        function Event() {
            this.events = {};
            this.stack = {};
        }
        Event.prototype.on = function (type, fn) {
            var _this = this;
            // 立即触发已被emit的事件
            var stack = this.stack[type];
            if (Array.isArray(stack)) {
                stack.forEach(function (args) {
                    try {
                        fn.call.apply(fn, [_this].concat(args));
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
                delete this.stack[type];
            }
            // 订阅事件
            if (!Array.isArray(this.events[type])) {
                this.events[type] = [];
            }
            this.events[type].push(fn);
        };
        Event.prototype.emit = function (type) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!Array.isArray(this.events[type])) {
                if (!Array.isArray(this.stack[type])) {
                    this.stack[type] = [];
                }
                this.stack[type].push(args);
                return;
            }
            // 触发事件回调
            var fns = this.events[type];
            fns.forEach(function (fn) {
                try {
                    fn.call.apply(fn, [_this].concat(args));
                }
                catch (error) {
                    console.log(error);
                }
            });
        };
        return Event;
    }());

    // 简单工具函数
    var warning = function (msg) { return console.warn("[global-wechat-share]: " + msg); };
    var hasProp = function (target, property) { return Object.prototype.hasOwnProperty.call(target, property); };
    // 事件中心
    var event = new Event();
    // 常量
    var HAS_RUN_DEFAULT_SHARE = "hasRunDefaultShare-";
    // 检验参数包
    var checkKey = function (keys, params) {
        if (typeof keys === 'string') {
            keys = keys.split(',').map(function (key) { return key.trim(); });
        }
        else if (!Array.isArray(keys)) {
            warning("keys must be a comma-separated set of Strings or an Array!");
        }
        return keys.every(function (key) { return hasProp(params, key); });
    };
    // 格式化参数包，过滤无用参数并校验
    var format = function (config) {
        {
            var c = checkKey('title, link, imgUrl, desc', config);
            if (!c) {
                warning("default-config should contains these keys: " + 'title, link, imgUrl, desc');
            }
        }
        var title = config.title, link = config.link, imgUrl = config.imgUrl, desc = config.desc;
        return { title: title, link: link, imgUrl: imgUrl, desc: desc };
    };
    var Share = /** @class */ (function () {
        function Share(Vue, router, wx, options) {
            if (options === void 0) { options = {}; }
            var self = this;
            this.defaultConfig = null;
            this.customConfig = null;
            this.router = router;
            this.uid = 0;
            this.isDebug = options.isDebug || false;
            this.wx = wx || window.wx;
            this.event = event;
            function initShare(arg) {
                var callback = function () { };
                if (Object.prototype.toString.call(arg) === '[object Object]') {
                    self.customConfig = format(arg);
                    callback = function () {
                        self.wx.ready(function () {
                            self.wx.onMenuShareAppMessage(self.customConfig);
                            self.wx.onMenuShareTimeline(self.customConfig);
                        });
                    };
                }
                else if (typeof arg === 'function') {
                    callback = arg;
                }
                if (self.isDebug) {
                    console.log("on uid: ", self.uid);
                }
                event.on(HAS_RUN_DEFAULT_SHARE + self.uid, callback);
            }
            Vue.prototype.$initShare = initShare;
        }
        Share.prototype.init = function (defaultConfig) {
            this.defaultConfig = format(defaultConfig);
            this.initHook();
        };
        // 初始化钩子
        Share.prototype.initHook = function () {
            var _this = this;
            var self = this;
            var router = this.router;
            var config = __assign({}, this.defaultConfig);
            var runDefaultShare = function (conf) { return new Promise(function (resolve, reject) {
                _this.wx.ready(function () {
                    _this.wx.onMenuShareAppMessage(conf);
                    _this.wx.onMenuShareTimeline(conf);
                    resolve();
                });
            }); };
            var markAsRan = function (uid) { return new Promise(function (resolve, reject) {
                if (_this.isDebug) {
                    console.log("emit uid:", uid);
                }
                event.emit(HAS_RUN_DEFAULT_SHARE + uid);
            }); };
            // 首次运行默认分享
            runDefaultShare(config).then(function () { return markAsRan(self.uid); });
            router.beforeEach(function runShare(to, from, next) {
                self.uid++;
                runDefaultShare(config).then(function () { return markAsRan(self.uid); });
                next();
            });
        };
        return Share;
    }());

    return Share;

}());
