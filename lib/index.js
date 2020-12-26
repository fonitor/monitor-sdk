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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
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
 * 消息队列 Base
 */
var Base = /*#__PURE__*/function () {
  function Base(baseUrl) {
    _classCallCheck(this, Base);

    this.baseUrl = baseUrl;
    this.requestQueue = []; // 队列

    this.requestTimmer = undefined;
    this.synRequestNum = 4;
    this.synNum = 0;
    this.retryNum = 1; // 重试上报机制
  }
  /**
   * 单例
   * @return {?}
   */


  _createClass(Base, [{
    key: "pushToQueue",

    /**
     * 同步队列 （传入对象必须要有logType，logError）
     * @param {*} log 队列日志
     */
    value: function pushToQueue(log) {
      var _this = this;

      {
        // 简单先同步放入数组中
        this.requestQueue.push(log);
        return this.onReady(function () {
          _this.requestTimmer = _this.delay(function () {
            _this.clear();
          }, _this.requestQueue[0] && !!_this.requestQueue[0].logError && _this.requestQueue[0].logError > 0 ? 3e3 : -1);
        });
      }
    }
    /**
     * 宏任务（检测是否有唯一对应值）
     * @param {*} fun
     */

  }, {
    key: "onReady",
    value: function onReady(fun) {
      if (typeof fun != 'function') {
        return;
      } // 检测是否有 openId 如果没有则延迟上报


      if (fun) {
        fun();
      }
    }
    /**
     * 执行队列
     * @param {*} fun
     * @param {*} e
     */

  }, {
    key: "delay",
    value: function delay(fun, e) {
      if (!fun && typeof fun != 'function') return null;
      return e === -1 ? (fun(), null) : setTimeout(fun, e || 0);
    }
    /**
     * 并发限制
     * @return {?}
     */

  }, {
    key: "clear",
    value: function clear() {
      var _this2 = this;

      var e;

      if (this.synNum > this.synRequestNum) {
        return clearTimeout(this.requestTimmer), this.requestTimmer = setTimeout(function () {
          _this2.clear();
        }, 50);
      }

      for (clearTimeout(this.requestTimmer), this.requestTimmer = null; this.synNum < this.synRequestNum && (e = this.requestQueue.pop()); this.synNum++) {
        this.handleLog(e);
      } // 执行完如果还有数据则继续执行（放到宏任务）


      !!this.requestQueue.length && (this.requestTimmer = setTimeout(function () {
        _this2.clear();
      }, 50));
    }
    /**
     * 清空队列
     * @return {?}
     */

  }, {
    key: "clearAll",
    value: function clearAll() {
      this.requestQueue = [];
      this.requestTimmer = null;
      this.synNum = 0;
    }
    /**
     * 并发数减一
     * @return {?}
     */

  }, {
    key: "reduceSynNumFun",
    value: function reduceSynNumFun() {
      Queue.instance.synNum--;
      return this;
    }
    /**
     * 上报
     * @param {*} e logType判断上传接口是哪种类型 pv：上报pv 逻辑 mv：上报mv逻辑 logError：0 代码重新上报次数0次，用int后续方便扩展
     */

  }, {
    key: "handleLog",
    value: function handleLog(e) {
      var _this3 = this;

      // 深拷贝避免影响其他数据
      var log = JSON.parse(JSON.stringify(e));

      try {
        var param = {
          viewData: log
        };

        this._fetch(param).then(function (_) {
          _this3.reduceSynNumFun();
        });
      } catch (err) {
        this.reduceSynNumFun();
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!Queue.instance) {
        Queue.instance = new Queue();
      }

      return Queue.instance;
    }
  }]);

  return Base;
}();

/**
 * 适用于微信消息队列
 */

var wxQueue = /*#__PURE__*/function (_Base) {
  _inherits(wxQueue, _Base);

  var _super = _createSuper(wxQueue);

  function wxQueue() {
    _classCallCheck(this, wxQueue);

    return _super.apply(this, arguments);
  }

  _createClass(wxQueue, [{
    key: "_fetch",
    value: function _fetch() {
      var _this = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve) {
        wx.request({
          url: "".concat(_this.baseUrl),
          data: data,
          method: 'POST',
          dataType: 'json',
          fail: function fail(res) {},
          complete: function complete(res) {
            resolve();
          }
        });
      });
    }
  }]);

  return wxQueue;
}(Base);

var queue = null;
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
                // 消息队列初始化
                queue = (_readOnlyError("queue"), new wxQueue(this._conf.baseUrl));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
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
                if (!(!options || !options.pid)) {
                  _context2.next = 3;
                  break;
                }

                util.warn("[cloudMonitor] not set pid");
                return _context2.abrupt("return");

              case 3:
                _context2.prev = 4;
                _context2.next = 7;
                return this.setConfig();

              case 7:
                this.addHook();
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](4);
                util.warn("[cloudMonitor] set config error");

              case 13:
                // 是否需要落pv数据
                if (this && this._conf && this._conf.autoReportPage) {
                  this.onReady(function () {
                    _this._log('pv');
                  });
                }

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 10]]);
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
