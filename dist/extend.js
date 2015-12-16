(function(m, o, r, u, l, u, s) {
    (function() {
        var hasOwn = Object.prototype.hasOwnProperty;
        var toStr = Object.prototype.toString;
        var isArray = function isArray(arr) {
            if (typeof Array.isArray === "function") {
                return Array.isArray(arr);
            }
            return toStr.call(arr) === "[object Array]";
        };
        var isPlainObject = function isPlainObject(obj) {
            "use strict";
            if (!obj || toStr.call(obj) !== "[object Object]") {
                return false;
            }
            var has_own_constructor = hasOwn.call(obj, "constructor");
            var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
            if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
                return false;
            }
            var key;
            for (key in obj) {}
            return typeof key === "undefined" || hasOwn.call(obj, key);
        };
        return function extend() {
            "use strict";
            var options, name, src, copy, copyIsArray, clone, target = arguments[0], i = 1, length = arguments.length, deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            } else if (typeof target !== "object" && typeof target !== "function" || target == null) {
                target = {};
            }
            for (;i < length; ++i) {
                options = arguments[i];
                if (options != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target !== copy) {
                            if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                                if (copyIsArray) {
                                    copyIsArray = false;
                                    clone = src && isArray(src) ? src : [];
                                } else {
                                    clone = src && isPlainObject(src) ? src : {};
                                }
                                if (copy.constructor.name !== "Ref") target[name] = extend(deep, clone, copy);
                            } else if (typeof copy !== "undefined") {
                                target[name] = copy;
                            }
                        }
                    }
                }
            }
            return target;
        };
    })();
})();