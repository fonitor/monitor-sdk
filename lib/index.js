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
var util$1 = {
  ext: ext,
  warn: warn,
  encode: encode,
  replaceAll: replaceAll,
  generateUUID: generateUUID
};

var BaseMonitor = /*#__PURE__*/function () {
  function BaseMonitor() {
    _classCallCheck(this, BaseMonitor);

    this._conf = {
      baseUrl: '',
      autoReportApi: true,
      // 是否上报api 
      autoReportPage: true,
      // 是否上报页面信息
      autoReportPagePerformance: true // 是否上报页面性能

    };
  }
  /**
   * 监控注册
   * @param {*} e 
   */


  _createClass(BaseMonitor, [{
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
            util$1.warn("[cloudMonitor] error in hookApp:onError", t);
          }

          if ("function" == typeof r) {
            return r.apply(this, n);
          }
        }
      };
      return util$1.ext({}, e, t);
    }
    /**
     * 监控执行
     * @param {*} options 
     */

  }, {
    key: "init",
    value: function init(options) {
      if (!options || !options.pid) {
        util$1.warn("[cloudMonitor] not set pid");
        return;
      }

      var self = this;

      try {
        this.setConfig({}, function () {
          self.addHook(); // 是否需要落pv数据

          if (self && self._conf && self._conf.autoReportPage) {
            self.onReady(function () {
              self._log('pv');
            });
          }
        });
      } catch (err) {
        util$1.warn("[cloudMonitor] set config error");
      }
    }
    /**
     * @param {*} fun 
     */

  }, {
    key: "onReady",
    value: function onReady(fun) {
      var _this = this;

      if (typeof fun != 'function') {
        util$1.warn('[cloudMonitor] not function');
        return;
      }

      this._conf.uid ? fun() : setTimeout(function () {
        _this.onReady(fun);
      }, 100);
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
    /**
     * 初始化参数
     * @param {*} options
     * @param {*} fun 
     */

  }, {
    key: "setConfig",
    value: function setConfig(options, fun) {
      this.initQueue();
      fun();
    }
  }, {
    key: "initQueue",
    value: function initQueue() {}
    /**
     * 执行log 存储
     * @param {*} type 
     */

  }, {
    key: "_log",
    value: function _log(type) {
      switch (type) {
        case 'pv':
          this._logPv();

          break;
      }
    }
    /**
     * pv 数据
     */

  }, {
    key: "_logPv",
    value: function _logPv() {}
    /**
     * 代理
     */

  }, {
    key: "addHook",
    value: function addHook() {}
  }]);

  return BaseMonitor;
}();

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
   * 同步队列 （传入对象必须要有logType，logError）
   * @param {*} log 队列日志
   */


  _createClass(Base, [{
    key: "pushToQueue",
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
  }], [{
    key: "getInstance",

    /**
     * 单例
     * @param {*} baseUrl
     * @return {?}
     */
    value: function getInstance(baseUrl) {
      if (!wxQueue.instance) {
        wxQueue.instance = new wxQueue(baseUrl);
      }

      return wxQueue.instance;
    }
  }]);

  return wxQueue;
}(Base);

var wxMonitor = /*#__PURE__*/function (_BaseMonitor) {
  _inherits(wxMonitor, _BaseMonitor);

  var _super = _createSuper(wxMonitor);

  function wxMonitor() {
    _classCallCheck(this, wxMonitor);

    return _super.call(this);
  }
  /**
   * 单例
   * @return {?}
   */


  _createClass(wxMonitor, [{
    key: "initQueue",

    /**
     * wx 消息队列重写方法
     */
    value: function initQueue() {
      try {
        // 消息队列初始化
        wxMonitor.queue = wxQueue.getInstance(this._conf.baseUrl);
      } catch (err) {
        util.warn("[cloudMonitor] queue init:error", t);
      }
    }
    /**
     * 微信代理方法
     */

  }, {
    key: "addHook",
    value: function addHook() {
      var config = this._conf;

      if (config && config.autoReportPage) {
        if (typeof wx.navigateTo == 'function') {
          console.log('测试');
        }
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!wxMonitor.instance) {
        wxMonitor.instance = new wxMonitor();
        wxMonitor.queue = null;
      }

      return wxMonitor.instance;
    }
  }]);

  return wxMonitor;
}(BaseMonitor);

/**
 * 监控导出
 */

var index = {
  wxMonitor: wxMonitor
};

export default index;
//# sourceMappingURL=index.js.map
