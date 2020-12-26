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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
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

/**
 * 生成用户唯一标识码
 */
function generateUUID() {
  var uuid = '',
      d = new Date().getTime();
  uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
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
  replaceAll: replaceAll,
  generateUUID: generateUUID
};

/**
 * 监控
 */

var Monitor = /*#__PURE__*/function () {
  function Monitor() {
    _classCallCheck(this, Monitor);

    this._conf = {
      baseUrl: '',
      autoReportApi: true,
      autoReportPage: true
    };
  }
  /**
   * 初始化参数
   * @param {*} options 
   */


  _createClass(Monitor, [{
    key: "setConfig",
    value: function () {
      var _setConfig = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function setConfig(_x) {
        return _setConfig.apply(this, arguments);
      }

      return setConfig;
    }()
    /**
     * 监控执行
     * @param {*} options 
     */

  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        var _this = this;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!options || !options.pid) {
                  util.warn("[cloudMonitor] not set pid");
                }
                _context2.prev = 2;
                _context2.next = 5;
                return this.setConfig();

              case 5:
                this.addHook();
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                util.warn("[cloudMonitor] set config error");

              case 11:
                // 是否需要落pv数据
                if (this && this._conf && this._conf.autoReportPage) {
                  this.onReady(function () {
                    _this._log('pv');
                  });
                }

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 8]]);
      }));

      function init(_x2) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
    /**
     * @param {*} fun 
     */

  }, {
    key: "onReady",
    value: function onReady(fun) {
      var _this2 = this;

      if (typeof fun != 'function') {
        util.warn('[cloudMonitor] not function');
        return;
      }

      this._conf.uid ? fun() : setTimeout(function () {
        _this2.onReady(fun);
      }, 100);
    }
    /**
     * 执行log 存储
     * @param {*} type 
     */

  }, {
    key: "_log",
    value: function _log(type) {}
    /**
     * 代理
     */

  }, {
    key: "addHook",
    value: function addHook() {}
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
