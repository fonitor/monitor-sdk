function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function getCwarn() {
  var t = "object" == (typeof console === "undefined" ? "undefined" : _typeof(console)) ? console.warn : noop;

  try {
    var e = {
      warn: t
    };
    e.warn.call(e);
  } catch (n) {
    return noop;
  }

  return t;
}
/**
 * encodeURIComponent 转换
 * @param {*} t 
 * @param {*} e 
 */


function encode(t, e) {
  try {
    t = e ? encodeURIComponent(t).replace(/\(/g, "%28").replace(/\)/g, "%29") : encodeURIComponent(t);
  } catch (n) {}

  return t;
}
/**
 * 字符串替换
 * @param {*} str 
 * @param {*} find 
 * @param {*} replace 
 */


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}
/**
 * @param {*} t 
 */


function ext(t) {
  for (var e = 1, n = arguments.length; e < n; e++) {
    var r = arguments[e];

    for (var o in r) {
      Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
  }

  return t;
}

var warn = getCwarn;
var util = {
  ext: ext,
  warn: warn,
  encode: encode,
  replaceAll: replaceAll
};

/**
 * 监控
 */

var Monitor = /*#__PURE__*/function () {
  function Monitor() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Monitor);

    if (_typeof(options) != 'object') {
      return util.warn("options is object: " + options);
    }

    this.baseUrl = options.baseUrl;
    this._conf = {};
  }
  /**
   * 监控执行
   */


  _createClass(Monitor, [{
    key: "init",
    value: function init() {}
    /**
     * 监控注册
     * @param {*} e 
     */

  }, {
    key: "hookApp",
    value: function hookApp(e) {
      var self = this,
          t = {
        onError: function onError(t) {
          var n = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
              r = e.onError;

          try {
            self.error(t);
          } catch (t) {
            util.warn("[cloudMonitor] error in hookApp:onError", t);
          }

          if ("function" == typeof r) {
            return r.apply(this, n);
          }
        }
      };
      return util.ext({}, e, t);
    }
    /**
     * 错误信息
     * @param {*} t 
     * @param {*} e 
     */

  }, {
    key: "error",
    value: function error(t, e) {
      if (!t) {
        return util_1.warn("[cloudMonitor] invalid param e: " + t), this;
      }

      1 === arguments.length ? ("string" == typeof t && (t = {
        message: t
      }, e = {}), "object" == _typeof(t) && (e = t = t.error || t)) : ("string" == typeof t && (t = {
        message: t
      }), "object" != _typeof(e) && (e = {}));
      var name = t.name || 'CustomError';
      var useData = {
        begin: Date.now(),
        cate: name,
        msg: t.message,
        file: e.filename || "",
        line: e.lineno || "",
        col: e.colno || ""
      };
    }
  }, {
    key: "getConfig",
    value: function getConfig(e) {
      return {}; // return e ? this._conf[e] : util.ext({}, this._conf)
    }
  }]);

  return Monitor;
}();

export default Monitor;
//# sourceMappingURL=index.js.map
