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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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
/**
 * 日期格式化
 * @param {*} date 
 * @param {*} fmt 
 */


function dateFormat(date, fmt) {
  if (!date || !(date instanceof Date)) {
    return "";
  }

  var o = {
    "M+": date.getMonth() + 1,
    // 月份
    "d+": date.getDate(),
    // 日
    "h+": date.getHours(),
    // 小时
    "m+": date.getMinutes(),
    // 分
    "s+": date.getSeconds(),
    // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3),
    // 季度
    "S": date.getMilliseconds() // 毫秒

  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }

  return fmt;
}
/**
 * 合并
 */


function __assign() {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
}
var warn = getCwarn;
var util = {
  ext: ext,
  warn: warn,
  encode: encode,
  replaceAll: replaceAll,
  generateUUID: generateUUID,
  dateFormat: dateFormat,
  __assign: __assign
};

/**
 * 消息队列 Base
 */
var Base = /*#__PURE__*/function () {
  function Base(baseUrl) {
    _classCallCheck(this, Base);

    this.api = "/api/save/log";
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
    value: function reduceSynNumFun() {}
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
        this._fetch(log).then(function (_) {
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
    key: "reduceSynNumFun",

    /**
     * 并发数减一
     * @return {?}
     */
    value: function reduceSynNumFun() {
      wxQueue.instance.synNum--;
      return this;
    }
  }, {
    key: "_fetch",
    value: function _fetch() {
      var _this = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve) {
        wx.request({
          url: "".concat(_this.baseUrl).concat(_this.api),
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

var WX_TYPE = 2;
var WxHookMethods = ['request'];
var WX_PROJECT_VERSION = '1.0.0'; // 项目版本号

var HTTP_SUCCESS = 1;
var HTTP_ERROR = 2;
var APP_CONFIG = ['onError'];
var PAGE_CPNFIG = ['onLoad'];
var ELinstenerTypes = {
  Touchmove: 'touchmove',
  Tap: 'tap'
};

var handlers = {};
var appHandles = {};
var pageHandles = {};
/**
 * @param {*} handler 
 * @param {*} handleType 
 */

function subscribeEvent(handler) {
  var handleType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!handler) {
    return;
  }

  switch (handleType) {
    case 'app':
      appHandles[handler.type] = appHandles[handler.type] || [];
      appHandles[handler.type].push(handler.callback);
      break;

    case 'page':
      pageHandles[handler.type] = appHandles[handler.type] || [];
      pageHandles[handler.type].push(handler.callback);
      break;

    default:
      handlers[handler.type] = handlers[handler.type] || [];
      handlers[handler.type].push(handler.callback);
  }
}
/**
 * @param {*} type 
 * @param {*} data 
 * @param {*} handleType
 */

function triggerHandlers(type, data) {
  var handleType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  switch (handleType) {
    case 'app':
      if (!type || !appHandles[type]) return;
      appHandles[type].forEach(function (callback) {
        callback(data);
      });
      break;

    case 'page':
      if (!type || !pageHandles[type]) return;
      pageHandles[type].forEach(function (callback) {
        callback(data);
      });
      break;

    default:
      if (!type || !handlers[type]) return;
      handlers[type].forEach(function (callback) {
        callback(data);
      });
  }
}

/**
 * 重写对象上面的某个属性
 * @param {*} source 需要被重写的对象
 * @param {*} name 需要被重写对象的key
 * @param {*} replacement 以原有的函数作为参数，执行并重写原有函数
 * @param {*} isForced 
 */
function replaceOld(source, name, replacement) {
  var isForced = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (name in source || isForced) {
    var original = source[name];
    var wrapped = replacement(original);

    if (typeof wrapped === 'function') {
      source[name] = wrapped;
    }
  }
} // 函数节流

/**
 *
 * ../param fn 需要节流的函数
 * ../param delay 节流的时间间隔
 * ../returns 返回一个包含节流功能的函数
 */

var throttle = function throttle(fn, delay) {
  var canRun = true;
  return function () {
    if (!canRun) return;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    fn.apply(this, args);
    canRun = false;
    setTimeout(function () {
      canRun = true;
    }, delay);
  };
};
var nativeToString = Object.prototype.toString;
/**
 * Checks whether given value has a then function.
 * ../param wat A value to be checked.
 */
// export function isThenable(wat: any): boolean {
//   // tslint:disable:no-unsafe-any
//   return Boolean(wat && wat.then && typeof wat.then === 'function')
//   // tslint:enable:no-unsafe-any
// }

function isExistProperty(obj, key) {
  return obj.hasOwnProperty(key);
}
/**
 * 添加事件监听器
 * @param {*} target 
 * @param {*} eventName 
 * @param {*} handler 
 * @param {*} opitons 
 */

function on(target, eventName, handler) {
  var opitons = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  target.addEventListener(eventName, handler, opitons);
}
/**
 * Checks whether given value's type is one of a few Error or Error-like
 * {../link isError}.
 *
 * ../param wat A value to be checked.
 * ../returns A boolean representing the result.
 */

function isError(wat) {
  switch (nativeToString.call(wat)) {
    case '[object Error]':
      return true;

    case '[object Exception]':
      return true;

    case '[object DOMException]':
      return true;

    default:
      return isInstanceOf(wat, Error);
  }
}
/**
* Checks whether given value's type is an instance of provided constructor.
* {../link isInstanceOf}.
*
* ../param wat A value to be checked.
* ../param base A constructor to be used in a check.
* ../returns A boolean representing the result.
*/

function isInstanceOf(wat, base) {
  try {
    // tslint:disable-next-line:no-unsafe-any
    return wat instanceof base;
  } catch (_e) {
    return false;
  }
}

/**
 * 获取当前url
 */

function getPage() {
  return getCurrentPages()[getCurrentPages().length - 1].__route__;
}

var PAGE = 'page_pv';
var JS_ERROR = 'js_error';
var HTTP_LOG = 'http_log';
var RESOURCE_LOAD = 'resource_load';

var HandleWxAppEvents = {
  onError: function onError(e) {
    try {
      if (!this.wxMonitor) return;
      var vm = this.wxMonitor;
      var data = {
        simpleUrl: getPage(),
        errorMessage: String(e)
      };
      vm.logSave(JS_ERROR, data);
    } catch (e) {}
  }
};
var HandleWxPageEvents = {
  onLoad: function onLoad() {
    try {
      if (!this.wxMonitor) return;
      var vm = this.wxMonitor,
          toUrl = getPage();
      var data = {
        simpleUrl: toUrl,
        referrer: vm.referrerPage || ""
      };
      vm.logSave(PAGE, data);
      vm.referrerPage = toUrl;
    } catch (e) {}
  }
};

/**
 * 添加函数
 * @param {*} handler 
 * @param {*} handleType
 */

function addReplaceHandler(handler, handleType) {
  subscribeEvent(handler, handleType);
}
function replaceApp(wxMonitor) {
  if (!App) {
    return;
  }

  HandleWxAppEvents.wxMonitor = wxMonitor;
  var originApp = App;

  App = function App(appOptions) {
    var methods = APP_CONFIG;
    methods.forEach(function (method) {
      addReplaceHandler({
        callback: function callback(data) {
          return HandleWxAppEvents[method.replace('AppOn', 'on')](data);
        },
        type: method
      }, 'app');
      replaceOld(appOptions, method.replace('AppOn', 'on'), function (originMethod) {
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          triggerHandlers.apply(null, [method].concat(args, ['app']));

          if (originMethod) {
            originMethod.apply(this, args);
          }
        };
      }, true);
    });
    return originApp(appOptions);
  };
}
/**
 * page
 * @param {*} wxMonitor 
 */

function replacePage(wxMonitor) {
  if (!Page) {
    return;
  }

  HandleWxPageEvents.wxMonitor = wxMonitor;
  var originPage = Page;

  Page = function Page(pageOptions) {
    var methods = PAGE_CPNFIG; // pv uv 自动化

    methods.forEach(function (method) {
      addReplaceHandler({
        callback: function callback(data) {
          return HandleWxPageEvents[method.replace('PageOn', 'on')](data);
        },
        type: method
      }, 'page');
      replaceOld(pageOptions, method.replace('PageOn', 'on'), function (originMethod) {
        return function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          triggerHandlers.apply(null, [method].concat(args, ['page']));

          if (originMethod) {
            originMethod.apply(this, args);
          }
        };
      }, true);
    });
    /**
     * 记录用户行为
     * @param {*} e 
     */

    function gestureTrigger(e) {
      e.mitoProcessed = true; // 给事件对象增加特殊的标记，避免被无限透传

      console.log('测试点击封装');
      console.log(e);
    }

    function isNotAction(method) {
      // 如果是method中处理过的方法，则不是处理用户手势行为的方法
      return methods.find(function (m) {
        return m.replace('PageOn', 'on') === method;
      });
    }

    var throttleGesturetrigger = throttle(gestureTrigger, 500);
    var linstenerTypes = [ELinstenerTypes.Touchmove, ELinstenerTypes.Tap]; // 用户行为重写click

    Object.keys(pageOptions).forEach(function (m) {
      if ('function' !== typeof pageOptions[m] || isNotAction(m)) {
        return;
      }

      replaceOld(pageOptions, m, function (originMethod) {
        return function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          var e = args[0];

          if (e && e.type && e.currentTarget && !e.mitoProcessed) {
            if (linstenerTypes.indexOf(e.type)) {
              throttleGesturetrigger(e);
            }
          }

          originMethod.apply(this, args);
        };
      }, true);
    });
    return originPage.call(this, pageOptions);
  };
}
/**
 * 代理请求
 * @param {*} wxMonitor 
 */

function replaceNetwork(wxMonitor) {
  var vm = wxMonitor;
  var WxHookMethods$1 = WxHookMethods;
  WxHookMethods$1.forEach(function (hook) {
    var originRequest = wx[hook];
    Object.defineProperty(wx, hook, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function value() {
        var args = [];
        var startTime = new Date().getTime();

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var options$1 = args[0];
        var url = options$1.url || "";
        var reqData;

        if (hook === 'request') {
          reqData = options$1.data;
        }

        var successHandler = function successHandler(res) {
          try {
            // 上报接口报警
            if (!!res && res.statusCode != 200) {
              var data = {
                simpleUrl: getPage(),
                httpUrl: options$1.url || "",
                httpUploadType: HTTP_ERROR,
                responseText: JSON.stringify(res),
                httpStatus: res.statusCode
              };

              if (!!url && url != "".concat(vm.queue.baseUrl).concat(vm.queue.api)) {
                vm.logSave(HTTP_LOG, data);
              }
            } else {
              var endTime = new Date().getTime();
              var consumeData = {
                simpleUrl: getPage(),
                loadTime: endTime - startTime,
                httpUrl: options$1.url || "",
                httpUploadType: HTTP_SUCCESS,
                responseText: JSON.stringify(res),
                httpStatus: res.statusCode || 200
              };

              if (!!url && url != "".concat(vm.queue.baseUrl).concat(vm.queue.api)) {
                vm.logSave(HTTP_LOG, consumeData);
              }
            }
          } catch (e) {
            util.warn('[cloudMonitor] http error');
          }

          if (typeof options$1.success === 'function') {
            return options$1.success(res);
          }
        };

        var failHandler = function failHandler(err) {
          try {
            var data = {
              simpleUrl: getPage(),
              httpUrl: options$1.url || "",
              httpUploadType: HTTP_ERROR,
              responseText: JSON.stringify(err),
              httpStatus: '0'
            };

            if (!!url && url != "".concat(vm.queue.baseUrl).concat(vm.queue.api)) {
              vm.logSave(HTTP_LOG, data);
            }
          } catch (e) {
            util.warn('[cloudMonitor] http error');
          }

          if (typeof options$1.fail === 'function') {
            return options$1.fail(err);
          }
        };

        var actOptions = util.__assign(util.__assign({}, options$1), {
          success: successHandler,
          fail: failHandler
        });

        return originRequest.call(this, actOptions);
      }
    });
  });
}

/**
 * 初始化
 * @param {*} wxMonitor 
 */

function setupReplace(wxMonitor) {
  replacePage(wxMonitor);
  replaceApp(wxMonitor);
  replaceNetwork(wxMonitor);
}

var baseConfig = {
  baseUrl: '',
  autoReportApi: true,
  // 是否上报api 
  autoReportPage: true,
  // 是否上报页面信息
  autoReportPagePerformance: true // 是否上报页面性能

};
/**
 * 初始化微信sdk
 * @param {*} wxMonitor 
 */

function initMixin(wxMonitor) {
  /**
   * 初始化
   * @param {*} options 
   */
  wxMonitor._init = function (options) {
    var vm = this;

    if (!options || !options.app) {
      util.warn('[cloudMonitor] not set app');
    }

    if (!options || !options.baseUrl) {
      util.warn('[cloudMonitor] not set baseUrl');
    }

    var _options = Object.assign(baseConfig, options);

    vm.$options = _options;
    vm.queue = wxQueue.getInstance(_options.baseUrl); // 初始化

    vm.baseOptions = ''; // 初始化上传参数

    vm.referrerPage = ''; // 上一个页面

    vm.userId = ''; // 用户唯一标识

    vm.SOURCE_TYPE = WX_TYPE;
    vm.optionsInit(_options);
    setupReplace(wxMonitor);
  };
}

var ALI_TYPE = 3;
var ALI_PROJECT_VERSION = '1.0.0'; // 项目版本号

var APP_CONFIG$1 = ['onError'];
var PAGE_CPNFIG$1 = ['onLoad'];
var AliHookMethods = ['request'];
var HTTP_SUCCESS$1 = 1;
var HTTP_ERROR$1 = 2;
var ELinstenerTypes$1 = {
  Touchmove: 'touchmove',
  Tap: 'tap'
};

var WEB_TYPE = 1;
var PAGE_JS_ERROR = 'error';
var HISTORY = 'history';
var HASHCHANGE = 'hashchange';
var DOM = 'dom';
var UNHANDLEDREJECTION = 'unhandledrejection';
/**
 * 上报错误类型
 */

var ERRORTYPES = {
  UNKNOWN: 'UNKNOWN',
  UNKNOWN_FUNCTION: 'UNKNOWN_FUNCTION',
  JAVASCRIPT_ERROR: 'JAVASCRIPT_ERROR',
  LOG_ERROR: 'LOG_ERROR',
  FETCH_ERROR: 'HTTP_ERROR',
  VUE_ERROR: 'VUE_ERROR',
  REACT_ERROR: 'REACT_ERROR',
  RESOURCE_ERROR: 'RESOURCE_ERROR',
  PROMISE_ERROR: 'PROMISE_ERROR',
  ROUTE_ERROR: 'ROUTE_ERROR'
};

/**
 * 获取web 设备信息
 */

function getDevice() {
  var device = {},
      ua = navigator.userAgent;
  /** @type {(Array<string>|null)} */

  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  /** @type {(Array<string>|null)} */

  var showEffects = ua.match(/(iPad).*OS\s([\d_]+)/);
  /** @type {(Array<string>|null)} */

  var showPackageConstants = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  /** @type {(Array<string>|boolean|null)} */

  var showConstants = !showEffects && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  /** @type {(Array<string>|null)} */

  var cache_message = ua.match(/Android\s[\S\s]+Build\//);

  if (android && (device.os = "android", device.osVersion = android[2], device.android = true, device.androidChrome = 0 <= ua.toLowerCase().indexOf("chrome")), (showEffects || showConstants || showPackageConstants) && (device.os = "ios", device.ios = true), showConstants && !showPackageConstants && (device.osVersion = showConstants[2].replace(/_/g, "."), device.iphone = true), showEffects && (device.osVersion = showEffects[2].replace(/_/g, "."), device.ipad = true), showPackageConstants && (device.osVersion = showPackageConstants[3] ? showPackageConstants[3].replace(/_/g, ".") : null, device.iphone = true), device.ios && device.osVersion && 0 <= ua.indexOf("Version/") && "10" === device.osVersion.split(".")[0] && (device.osVersion = ua.toLowerCase().split("version/")[1].split(" ")[0]), device.iphone) {
    /** @type {string} */
    device.deviceName = "iphone";
    var beginWidth = window.screen.width;
    var upperHeight = window.screen.height;

    if (320 === beginWidth && 480 === upperHeight) {
      /** @type {string} */
      device.deviceName = "iphone 4";
    } else {
      if (320 === beginWidth && 568 === upperHeight) {
        /** @type {string} */
        device.deviceName = "iphone 5/SE";
      } else {
        if (375 === beginWidth && 667 === upperHeight) {
          /** @type {string} */
          device.deviceName = "iphone 6/7/8";
        } else {
          if (414 === beginWidth && 736 === upperHeight) {
            /** @type {string} */
            device.deviceName = "iphone 6/7/8 Plus";
          } else {
            if (375 === beginWidth && 812 === upperHeight) {
              /** @type {string} */
              device.deviceName = "iphone X/S/Max";
            }
          }
        }
      }
    }
  } else {
    if (device.ipad) {
      /** @type {string} */
      device.deviceName = "ipad";
    } else {
      if (cache_message) {
        /** @type {string} */
        var d = cache_message[0].split(";")[1].replace(/Build\//g, "");
        /** @type {string} */

        device.deviceName = d.replace(/(^\s*)|(\s*$)/g, "");
      }
    }
  }

  if (-1 == ua.indexOf("Mobile")) {
    /** @type {string} */
    var _ua = navigator.userAgent.toLowerCase();

    if (device.browserName = "\u672A\u77E5", 0 < _ua.indexOf("msie")) {
      /** @type {string} */
      var assignmentUrl = _ua.match(/msie [\d.]+;/gi)[0];
      /** @type {string} */


      device.browserName = assignmentUrl.split("/")[0];
      /** @type {string} */

      device.browserVersion = assignmentUrl.split("/")[1];
    }

    if (0 < _ua.indexOf("firefox")) {
      /** @type {string} */
      assignmentUrl = _ua.match(/firefox\/[\d.]+/gi)[0];
      /** @type {string} */

      device.browserName = assignmentUrl.split("/")[0];
      /** @type {string} */

      device.browserVersion = assignmentUrl.split("/")[1];
    }

    if (0 < _ua.indexOf("safari") && _ua.indexOf("chrome") < 0) {
      /** @type {string} */
      assignmentUrl = _ua.match(/safari\/[\d.]+/gi)[0];
      /** @type {string} */

      device.browserName = assignmentUrl.split("/")[0];
      /** @type {string} */

      device.browserVersion = assignmentUrl.split("/")[1];
    }

    if (0 < _ua.indexOf("chrome")) {
      /** @type {string} */
      assignmentUrl = _ua.match(/chrome\/[\d.]+/gi)[0];
      /** @type {string} */

      device.browserName = assignmentUrl.split("/")[0];
      /** @type {string} */

      device.browserVersion = assignmentUrl.split("/")[1];
    }
  }

  device.webView = (showConstants || showEffects || showPackageConstants) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
  return device;
}
/**
 * 获取当前页面地址
 */

function getLocationHref() {
  if (typeof document === 'undefined' || document.location == null) return '';
  return document.location.href;
}
/**
 * 解析error的stack，并返回args、column、line、func、url:
 * @param ex
 */

function extractErrorStack(ex) {
  var normal = {
    name: ex.name,
    message: ex.message
  };

  if (typeof ex.stack === 'undefined' || !ex.stack) {
    return normal;
  }

  var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
      gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,
      winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
      // Used to additionally parse URL/line/column from eval frames
  geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
      chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/,
      lines = ex.stack.split('\n'),
      stack = [];
  var submatch, parts, element; // reference = /^(.*) is undefined$/.exec(ex.message)

  for (var i = 0, j = lines.length; i < j; ++i) {
    if (parts = chrome.exec(lines[i])) {
      var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line

      var isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line

      if (isEval && (submatch = chromeEval.exec(parts[2]))) {
        // throw out eval line/column and use top-most line/column number
        parts[2] = submatch[1]; // url

        parts[3] = submatch[2]; // line

        parts[4] = submatch[3]; // column
      }

      element = {
        url: !isNative ? parts[2] : null,
        func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
        args: isNative ? [parts[2]] : [],
        line: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
      };
    } else if (parts = winjs.exec(lines[i])) {
      element = {
        url: parts[2],
        func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
        args: [],
        line: +parts[3],
        column: parts[4] ? +parts[4] : null
      };
    } else if (parts = gecko.exec(lines[i])) {
      var _isEval = parts[3] && parts[3].indexOf(' > eval') > -1;

      if (_isEval && (submatch = geckoEval.exec(parts[3]))) {
        // throw out eval line/coluqqqqqqqqqqqqqqqqqqqqqqqqqqqqmn and use top-most line number
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = null; // no column when eval
      } else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
        // FireFox uses this awesome columnNumber property for its top frame
        // Also note, Firefox's column number is 0-based and everything else expects 1-based,
        // so adding 1
        // NOTE: this hack doesn't work if top-most frame is eval
        stack[0].column = ex.columnNumber + 1;
      }

      element = {
        url: parts[3],
        func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
        args: parts[2] ? parts[2].split(',') : [],
        line: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
      };
    } else {
      continue;
    }

    if (!element.func && element.line) {
      element.func = ERRORTYPES.UNKNOWN_FUNCTION;
    }

    stack.push(element);
  }

  if (!stack.length) {
    return null;
  }

  return _objectSpread2(_objectSpread2({}, normal), {}, {
    stack: stack
  });
}
var resourceMap = {
  img: 'img',
  script: 'script',
  link: 'link'
};
/**
 * 资源错误信息合并
 * @param {*} target 
 */

function resourceTransform(target) {
  return {
    simpleUrl: getLocationHref(),
    sourceUrl: '资源地址: ' + (target.src && target.src.slice(0, 100) || target.href && target.href.slice(0, 100)),
    elementType: "".concat(resourceMap[target.localName] || target.localName || "")
  };
}
/**
 * 检测路由支持情况
 */

function supportsHistory() {
  // NOTE: in Chrome App environment, touching history.pushState, *even inside
  //       a try/catch block*, will cause Chrome to output an error to console.error
  // borrowed from: https://github.com/angular/angular.js/pull/13945/files
  var chrome = window.chrome; // tslint:disable-next-line:no-unsafe-any

  var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
  var hasHistoryApi = 'history' in window && !!window.history.pushState && !!window.history.replaceState;
  return !isChromePackagedApp && hasHistoryApi;
}
/**
 * 返回包含id、class、innerTextde字符串的标签
 * @param target html节点
 */

function htmlElementAsString(target) {
  var tagName = target.tagName.toLowerCase();

  if (tagName === 'body' || tagName === 'html') {
    return null;
  }

  var classNames = target.classList.value;
  classNames = classNames !== '' ? " class=\"".concat(classNames, "\"") : '';
  var id = target.id ? " id=\"".concat(target.id, "\"") : '';
  var innerText = target.innerText;
  return "<".concat(tagName).concat(id).concat(classNames !== '' ? classNames : '', ">").concat(innerText, "</").concat(tagName, ">");
}
/**
 * @param {*} target 
 */

function unknownToString(target) {
  if (variableTypeDetection.isString(target)) {
    return target;
  }

  return JSON.stringify(target);
}

/**
 * 初始化
 * @param {*} wxMonitor 
 * @param {*} type 
 */

function initBaseOptions(monitor) {
  monitor.optionsInit = function (option) {
    var vm = this;
    var type = vm.SOURCE_TYPE;

    switch (type) {
      case WX_TYPE:
        // 初始化上传参数
        wx.getSystemInfo({
          success: function success(res) {
            vm.baseOptions = {
              app: option.app || "",
              type: WX_TYPE,
              // 代表微信小程序
              projectVersion: option.projectVersion || WX_PROJECT_VERSION,
              // 项目版本号
              customerKey: util.generateUUID(),
              // 会话id
              os: res.system.indexOf('iOS') === -1 ? 'Android' : 'IOS',
              // 系统信息
              deviceName: res.model,
              // 手机型号
              brand: res.brand,
              // 手机品牌
              browserVersion: res.version // 小程序版本号

            };
          }
        });
        break;

      case ALI_TYPE:
        // 初始化上传参数
        my.getSystemInfo({
          success: function success(res) {
            vm.baseOptions = {
              app: option.app || "",
              type: ALI_TYPE,
              // 代表微信小程序
              projectVersion: option.projectVersion || ALI_PROJECT_VERSION,
              // 项目版本号
              customerKey: util.generateUUID(),
              // 会话id
              os: res.platform === 'iOS' ? 'IOS' : 'Android',
              // 系统信息
              deviceName: res.model,
              // 手机型号
              brand: res.brand,
              // 手机品牌
              browserVersion: res.version // 小程序版本号

            };
          }
        });
        break;

      case WEB_TYPE:
        // 初始化web 参数
        var configObj = getDevice();
        vm.baseOptions = {
          app: option.app || "",
          type: WEB_TYPE,
          // 代表web
          projectVersion: option.projectVersion || ALI_PROJECT_VERSION,
          // 项目版本号
          customerKey: util.generateUUID(),
          // 会话id
          os: configObj.os === 'ios' ? 'IOS' : 'Android',
          // 系统信息
          deviceName: configObj.deviceName || "",
          // 手机型号
          brand: configObj.os + (configObj.osVersion ? " " + configObj.osVersion : ""),
          // 手机品牌
          browserVersion: configObj.osVersion // 浏览器本号

        };
        break;
    }
  };
}

function initSaveLog(monitor) {
  /**
   * 上传日志
   * @param {*} type 
   * @param {*} data 
   */
  monitor.logSave = function (type, data) {
    var _this = this;

    var useData,
        logData = JSON.parse(JSON.stringify(data)),
        vm = this;

    if (!vm.baseOptions) {
      vm.optionsInit(vm.$options);
      setTimeout(function () {
        _this.logSave(type, data);
      }, 500);
      return;
    }

    switch (type) {
      case PAGE:
        useData = Object.assign(logData, vm.baseOptions);
        useData.userId = vm.userId || "", // 用户标识
        useData.uploadType = type;
        useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
        vm.queue.pushToQueue(useData);
        break;

      case JS_ERROR:
        useData = Object.assign(logData, vm.baseOptions);
        useData.userId = vm.userId || "", // 用户标识
        useData.uploadType = type;
        useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
        vm.queue.pushToQueue(useData);
        break;

      case HTTP_LOG:
        useData = Object.assign(logData, vm.baseOptions);
        useData.userId = vm.userId || "", // 用户标识
        useData.uploadType = type;
        useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
        vm.queue.pushToQueue(useData);
        break;

      case RESOURCE_LOAD:
        useData = Object.assign(logData, vm.baseOptions);
        useData.userId = vm.userId || "", // 用户标识
        useData.uploadType = type;
        useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
        vm.queue.pushToQueue(useData);
        break;
    }
  };
}

function initFun(monitor) {
  /**
   * 设置用户唯一标识
   * @param {*} userId 
   */
  monitor.setUserId = function (userId) {
    this.userId = userId;
  };
}

var wxMonitor = {};

wxMonitor.init = function (options) {
  this._init(options);
};

initMixin(wxMonitor);
initBaseOptions(wxMonitor);
initSaveLog(wxMonitor);
initFun(wxMonitor);

/**
 * 获取当前url
 */
function getPage$1() {
  return getCurrentPages()[getCurrentPages().length - 1].route || "";
}

var HandleAliAppEvents = {
  onError: function onError(e) {
    try {
      if (!this.aliMonitor) return;
      var vm = this.aliMonitor;
      var data = {
        simpleUrl: getPage$1(),
        errorMessage: String(e)
      };
      vm.logSave(JS_ERROR, data);
    } catch (e) {}
  }
};
var HandleAliPageEvents = {
  onLoad: function onLoad() {
    try {
      if (!this.aliMonitor) return;
      var vm = this.aliMonitor,
          toUrl = getPage$1();
      var data = {
        simpleUrl: toUrl,
        referrer: vm.referrerPage || ""
      };
      vm.logSave(PAGE, data);
      vm.referrerPage = toUrl;
    } catch (e) {}
  }
};

/**
 * 添加函数
 * @param {*} handler 
 * @param {*} handleType
 */

function addReplaceHandler$1(handler, handleType) {
  subscribeEvent(handler, handleType);
}
/**
 * page
 * @param {*} aliMonitor 
 */

function replacePage$1(aliMonitor) {
  if (!Page) {
    return;
  }

  HandleAliPageEvents.aliMonitor = aliMonitor;
  var originPage = Page;

  Page = function Page(pageOptions) {
    var methods = PAGE_CPNFIG$1; // pv uv 自动化

    methods.forEach(function (method) {
      addReplaceHandler$1({
        callback: function callback(data) {
          return HandleAliPageEvents[method.replace('PageOn', 'on')](data);
        },
        type: method
      }, 'page');
      replaceOld(pageOptions, method.replace('PageOn', 'on'), function (originMethod) {
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          triggerHandlers.apply(null, [method].concat(args, ['page']));

          if (originMethod) {
            originMethod.apply(this, args);
          }
        };
      }, true);
    });
    /**
     * 记录用户行为
     * @param {*} e 
     */

    function gestureTrigger(e) {
      e.mitoProcessed = true; // 给事件对象增加特殊的标记，避免被无限透传

      console.log('测试点击封装');
      console.log(e);
    }

    function isNotAction(method) {
      // 如果是method中处理过的方法，则不是处理用户手势行为的方法
      return methods.find(function (m) {
        return m.replace('PageOn', 'on') === method;
      });
    }

    var throttleGesturetrigger = throttle(gestureTrigger, 500);
    var linstenerTypes = [ELinstenerTypes$1.Touchmove, ELinstenerTypes$1.Tap]; // 用户行为重写click

    Object.keys(pageOptions).forEach(function (m) {
      if ('function' !== typeof pageOptions[m] || isNotAction(m)) {
        return;
      }

      replaceOld(pageOptions, m, function (originMethod) {
        return function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          var e = args[0];

          if (e && e.type && e.currentTarget && !e.mitoProcessed) {
            if (linstenerTypes.indexOf(e.type)) {
              throttleGesturetrigger(e);
            }
          }

          originMethod.apply(this, args);
        };
      }, true);
    });
    return originPage.call(this, pageOptions);
  };
}
/**
 * app
 * @param {*} aliMonitor 
 */

function replaceApp$1(aliMonitor) {
  if (!App) {
    return;
  }

  HandleAliAppEvents.aliMonitor = aliMonitor;
  var originApp = App;

  App = function App(appOptions) {
    var methods = APP_CONFIG$1;
    methods.forEach(function (method) {
      addReplaceHandler$1({
        callback: function callback(data) {
          return HandleAliAppEvents[method.replace('AppOn', 'on')](data);
        },
        type: method
      }, 'app');
      replaceOld(appOptions, method.replace('AppOn', 'on'), function (originMethod) {
        return function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          triggerHandlers.apply(null, [method].concat(args, ['app']));

          if (originMethod) {
            originMethod.apply(this, args);
          }
        };
      }, true);
    });
    return originApp(appOptions);
  };
}
/**
 * request 封装
 * @param {*} aliMonitor 
 */

function replaceNetwork$1(aliMonitor) {
  var vm = aliMonitor;
  var AliHookMethods$1 = AliHookMethods;
  AliHookMethods$1.forEach(function (hook) {
    var originRequest = my[hook];
    Object.defineProperty(my, hook, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: function value() {
        var args = [];
        var startTime = new Date().getTime();

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var options$1 = args[0];
        var url = options$1.url || "";
        var reqData;

        if (hook === 'request') {
          reqData = options$1.data;
        }

        var successHandler = function successHandler(res) {
          try {
            // 上报接口报警
            if (!!res && res.status != 200) {
              var data = {
                simpleUrl: getPage$1(),
                httpUrl: options$1.url || "",
                httpUploadType: HTTP_ERROR$1,
                responseText: JSON.stringify(res),
                httpStatus: res.status
              };

              if (!!url && url != "".concat(vm.queue.baseUrl).concat(vm.queue.api)) {
                vm.logSave(HTTP_LOG, data);
              }
            } else {
              var endTime = new Date().getTime();
              var consumeData = {
                simpleUrl: getPage$1(),
                loadTime: endTime - startTime,
                httpUrl: options$1.url || "",
                httpUploadType: HTTP_SUCCESS$1,
                responseText: JSON.stringify(res),
                httpStatus: res.status || 200
              };

              if (!!url && url != "".concat(vm.queue.baseUrl).concat(vm.queue.api)) {
                vm.logSave(HTTP_LOG, consumeData);
              }
            }
          } catch (e) {
            util.warn('[cloudMonitor] http error');
          }

          if (typeof options$1.success === 'function') {
            return options$1.success(res);
          }
        };

        var failHandler = function failHandler(err) {
          try {
            var data = {
              simpleUrl: getPage$1(),
              httpUrl: options$1.url || "",
              httpUploadType: HTTP_ERROR$1,
              responseText: JSON.stringify(err),
              httpStatus: '0'
            };

            if (!!url && url != "".concat(vm.queue.baseUrl).concat(vm.queue.api)) {
              vm.logSave(HTTP_LOG, data);
            }
          } catch (e) {
            util.warn('[cloudMonitor] http error');
          }

          if (typeof options$1.fail === 'function') {
            return options$1.fail(err);
          }
        };

        var actOptions = util.__assign(util.__assign({}, options$1), {
          success: successHandler,
          fail: failHandler
        });

        return originRequest.call(this, actOptions);
      }
    });
  });
}

/**
 * 初始化
 * @param {*} aliMonitor 
 */

function setupReplace$1(aliMonitor) {
  replacePage$1(aliMonitor);
  replaceApp$1(aliMonitor);
  replaceNetwork$1(aliMonitor);
}

/**
 * 适用于支付宝消息队列
 */

var aliQueue = /*#__PURE__*/function (_Base) {
  _inherits(aliQueue, _Base);

  var _super = _createSuper(aliQueue);

  function aliQueue() {
    _classCallCheck(this, aliQueue);

    return _super.apply(this, arguments);
  }

  _createClass(aliQueue, [{
    key: "reduceSynNumFun",

    /**
     * 并发数减一
     * @return {?}
     */
    value: function reduceSynNumFun() {
      aliQueue.instance.synNum--;
      return this;
    }
  }, {
    key: "_fetch",
    value: function _fetch() {
      var _this = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve) {
        my.request({
          url: "".concat(_this.baseUrl).concat(_this.api),
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
      if (!aliQueue.instance) {
        aliQueue.instance = new aliQueue(baseUrl);
      }

      return aliQueue.instance;
    }
  }]);

  return aliQueue;
}(Base);

var baseConfig$1 = {
  baseUrl: '',
  autoReportApi: true,
  // 是否上报api 
  autoReportPage: true,
  // 是否上报页面信息
  autoReportPagePerformance: true // 是否上报页面性能

};
/**
 * 初始化支付宝sdk
 * @param {*} aliMonitor 
 */

function initMixin$1(aliMonitor) {
  aliMonitor._init = function (options) {
    var vm = this;

    if (!options || !options.app) {
      util.warn('[cloudMonitor] not set app');
    }

    if (!options || !options.baseUrl) {
      util.warn('[cloudMonitor] not set baseUrl');
    }

    var _options = Object.assign(baseConfig$1, options);

    vm.$options = _options;
    vm.queue = aliQueue.getInstance(_options.baseUrl); // 初始化

    vm.baseOptions = ''; // 初始化上传参数

    vm.referrerPage = ''; // 上一个页面

    vm.userId = ''; // 用户唯一标识

    vm.SOURCE_TYPE = ALI_TYPE;
    vm.optionsInit(_options);
    setupReplace$1(aliMonitor);
  };
}

var aliMonitor = {};

aliMonitor.init = function (options) {
  this._init(options);
};

initMixin$1(aliMonitor);
initBaseOptions(aliMonitor);
initSaveLog(aliMonitor);
initFun(aliMonitor);

var HandleEvents = {
  /**
   * 处理xhr、fetch回调
   * @param {*} data 
   * @param {*} type 
   */
  handleHttp: function handleHttp(data, type) {},

  /**
   * js 错误
   * @param {*} errorEvent 
   */
  handleError: function handleError(errorEvent) {
    if (!this.webMonitor) return;
    var vm = this.webMonitor;
    var target = errorEvent.target; // 资源错误上报

    if (!!target.localName) {
      var resourceData = resourceTransform(errorEvent.target);
      vm.logSave(RESOURCE_LOAD, resourceData);
      return;
    } // code error


    var message = errorEvent.message,
        lineno = errorEvent.lineno,
        colno = errorEvent.colno,
        error = errorEvent.error;
    var result;

    if (error && isError(error)) {
      result = extractErrorStack(error);
    } // 处理SyntaxError，stack没有lineno、colno


    result || (result = HandleEvents.handleNotErrorInstance(message, lineno, colno));
    var data = {
      simpleUrl: getLocationHref(),
      errorMessage: String(JSON.stringify(result))
    };
    vm.logSave(JS_ERROR, data);
  },

  /**
   * 处理SyntaxError，stack没有lineno、colno
   * @param {*} message 
   * @param {*} lineno 
   * @param {*} colno 
   */
  handleNotErrorInstance: function handleNotErrorInstance(message, lineno, colno) {
    var name = ERRORTYPES.UNKNOWN;
    var msg = message;
    var matches = message.match(ERROR_TYPE_RE);

    if (matches[1]) {
      name = matches[1];
      msg = matches[2];
    }

    var element = {
      func: ERRORTYPES.UNKNOWN_FUNCTION,
      args: ERRORTYPES.UNKNOWN,
      line: lineno,
      col: colno
    };
    return {
      name: name,
      message: msg,
      level: Severity.Normal,
      time: getTimestamp(),
      stack: [element]
    };
  },

  /**
   * history 模式下路由注册
   * @param {*} data 
   */
  handleHistory: function handleHistory(data) {
    console.log(data);
  },

  /**
   * hash
   * @param {*} e 
   */
  handleHashchange: function handleHashchange(e) {
    console.log('测试');
    console.log(e);
  },

  /**
   * Promise
   * @param {*} ev 
   */
  handleUnhandleRejection: function handleUnhandleRejection(ev) {
    if (!this.webMonitor) return;
    var vm = this.webMonitor;
    var data = {
      type: ERRORTYPES.PROMISE_ERROR,
      message: unknownToString(ev.reason),
      url: getLocationHref(),
      name: ev.type
    };

    if (isError(ev.reason)) {
      data = _objectSpread2(_objectSpread2({}, data), extractErrorStack(ev.reason, Severity.Low));
    }

    var result = {
      simpleUrl: getLocationHref(),
      errorMessage: String(JSON.stringify(data))
    };
    vm.logSave(JS_ERROR, result);
  }
};

/**
 * 添加方法
 * @param {*} handler 
 */

function addReplaceHandler$2(handler) {
  subscribeEvent(handler);
}
/**
 * http 请求监控
 */

function replaceNetwork$2() {
  addReplaceHandler$2({
    callback: function callback(e) {
      HandleEvents.handleHashchange(e);
    },
    type: HASHCHANGE
  });

  if (!isExistProperty(window, 'onpopstate')) {
    on(window, HASHCHANGE, function (e) {
      triggerHandlers(HASHCHANGE, e);
    });
  }
}
/**
 * 错误监控
 */

function replaceError() {
  // 先添加方法到数组
  addReplaceHandler$2({
    callback: function callback(error) {
      HandleEvents.handleError(error);
    },
    type: PAGE_JS_ERROR
  });
  on(window, PAGE_JS_ERROR, function (e) {
    triggerHandlers(PAGE_JS_ERROR, e);
  }, true);
} // 上一次的路由

var lastHref;
lastHref = getLocationHref(); // hashchange

function historyReplace() {
  // 先添加方法到数组
  addReplaceHandler$2({
    callback: function callback(data) {
      HandleEvents.handleHistory(data);
    },
    type: HISTORY
  });
  if (!supportsHistory()) return;
  var oldOnpopstate = window.onpopstate;

  window.onpopstate = function () {
    var to = getLocationHref();
    var from = lastHref;
    triggerHandlers(HISTORY, {
      from: from,
      to: to
    });

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    oldOnpopstate && oldOnpopstate.apply(this, args);
  };

  function historyReplaceFn(originalHistoryFn) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var url = args.length > 2 ? args[2] : undefined;

      if (url) {
        var from = lastHref;
        var to = String(url);
        lastHref = to;
        triggerHandlers(HISTORY, {
          from: from,
          to: to
        });
      }

      return originalHistoryFn.apply(this, args);
    };
  }

  replaceOld(window.history, 'pushState', historyReplaceFn);
  replaceOld(window.history, 'replaceState', historyReplaceFn);
}
var clickThrottle = throttle(triggerHandlers, 600); // 页面点击

function domReplace() {
  if (!('document' in window)) return;
  addReplaceHandler$2({
    callback: function callback(data) {
      var htmlString = htmlElementAsString(data.data.srcElement);
    },
    type: DOM
  });
  on(window.document, 'click', function (e) {
    clickThrottle(DOM, {
      category: 'click',
      data: e
    });
  }, true);
} // Promise

function unhandledrejectionReplace() {
  addReplaceHandler$2({
    callback: function callback(data) {
      HandleEvents.handleUnhandleRejection(data);
    },
    type: UNHANDLEDREJECTION
  });
  on(window, UNHANDLEDREJECTION, function (ev) {
    // ev.preventDefault() 阻止默认行为后，控制台就不会再报红色错误
    triggerHandlers(UNHANDLEDREJECTION, ev);
  });
}

/**
 * 针对web 载入
 * @param {*} webMonitor 
 */

function setupReplace$2(webMonitor) {
  HandleEvents.webMonitor = webMonitor; // 处理http

  replaceNetwork$2(); // js 错误

  replaceError(); // Promise 错误

  unhandledrejectionReplace(); // pv uv
  historyReplace(); // 页面点击

  domReplace();
}

/**
 * 适用于web消息队列
 */

var webQueue = /*#__PURE__*/function (_Base) {
  _inherits(webQueue, _Base);

  var _super = _createSuper(webQueue);

  function webQueue() {
    _classCallCheck(this, webQueue);

    return _super.apply(this, arguments);
  }

  _createClass(webQueue, [{
    key: "reduceSynNumFun",

    /**
     * 并发数减一
     * @return {?}
     */
    value: function reduceSynNumFun() {
      webQueue.instance.synNum--;
      return this;
    }
  }, {
    key: "_fetch",
    value: function _fetch() {
      var _this = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve) {
        try {
          var state_Change = function state_Change() {
            /**
             * 0    Uninitialized  初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。
             * 1    Open           open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
             * 2    Sent           Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
             * 3    Receiving      所有响应头部都已经接收到。响应体开始接收但未完成。
             * 4    Loaded         HTTP 响应已经完全接收。
             */
            if (xhr.readyState === 4) {
              resolve();
            }
          };

          var xhr = new XMLHttpRequest();
          xhr.open('POST', "".concat(_this.baseUrl).concat(_this.api));
          xhr.onreadystatechange = state_Change;
          xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          xhr.withCredentials = true;
          xhr.send(JSON.stringify(data));
        } catch (e) {
          resolve();
        }
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
      if (!webQueue.instance) {
        webQueue.instance = new webQueue(baseUrl);
      }

      return webQueue.instance;
    }
  }]);

  return webQueue;
}(Base);

var baseConfig$2 = {
  baseUrl: '',
  autoReportApi: true,
  // 是否上报api 
  autoReportPage: true,
  // 是否上报页面信息
  autoReportPagePerformance: true // 是否上报页面性能

};
function initMixin$2(webMonitor) {
  webMonitor._init = function (options) {
    var vm = this;

    if (!options || !options.app) {
      util.warn('[cloudMonitor] not set app');
    }

    if (!options || !options.baseUrl) {
      util.warn('[cloudMonitor] not set baseUrl');
    }

    var _options = Object.assign(baseConfig$2, options);

    vm.$options = _options;
    vm.queue = webQueue.getInstance(_options.baseUrl); // 初始化

    vm.baseOptions = ''; // 初始化上传参数

    vm.referrerPage = ''; // 上一个页面

    vm.userId = ''; // 用户唯一标识

    vm.SOURCE_TYPE = WEB_TYPE;
    vm.optionsInit(_options);
    setupReplace$2(webMonitor);
  };
}

var webMonitor = {};

webMonitor.init = function (options) {
  this._init(options);
};

initMixin$2(webMonitor);
initBaseOptions(webMonitor);
initSaveLog(webMonitor);
initFun(webMonitor);

/**
 * 监控导出
 */

var wxMonitor$1 = wxMonitor;
var aliMonitor$1 = aliMonitor;
var webMonitor$1 = webMonitor;

export { aliMonitor$1 as aliMonitor, webMonitor$1 as webMonitor, wxMonitor$1 as wxMonitor };
//# sourceMappingURL=index.js.map
