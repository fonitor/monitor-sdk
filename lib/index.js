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
 * 校验类型
 * @param {*} type 
 */
function isType(type) {
  return function (value) {
    return nativeToString.call(value) === "[object " + type + "]";
  };
} // 校验枚举


var variableTypeDetection = {
  isNumber: isType('Number'),
  isString: isType('String'),
  isBoolean: isType('Boolean'),
  isNull: isType('Null'),
  isUndefined: isType('Undefined'),
  isSymbol: isType('Symbol'),
  isFunction: isType('Function'),
  isObject: isType('Object'),
  isArray: isType('Array'),
  isProcess: isType('process'),
  isWindow: isType('Window')
};
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
/**
 * 获取当前url
 */

function getPage() {
  return getCurrentPages()[getCurrentPages().length - 1].__route__;
}
/**
 * url
 * @param {*} url 
 * @param {*} query 
 */


function setUrlQuery(url, query) {
  var queryArr = [];
  Object.keys(query).forEach(function (k) {
    queryArr.push(k + "=" + query[k]);
  });

  if (url.indexOf('?') !== -1) {
    url = url + "&" + queryArr.join('&');
  } else {
    url = url + "?" + queryArr.join('&');
  }

  return url;
}
/**
 * 
 * @param {*} delta 
 */


function getNavigateBackTargetUrl(delta) {
  if (!variableTypeDetection.isFunction(getCurrentPages)) {
    return '';
  }

  var pages = getCurrentPages();

  if (!pages.length) {
    return 'App';
  }

  delta = delta || 1;
  var toPage = pages[pages.length - delta];
  return setUrlQuery(toPage.route, toPage.options);
}

var warn = getCwarn;
var util = {
  ext: ext,
  warn: warn,
  encode: encode,
  replaceAll: replaceAll,
  generateUUID: generateUUID,
  dateFormat: dateFormat,
  getPage: getPage,
  getNavigateBackTargetUrl: getNavigateBackTargetUrl,
  __assign: __assign
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
          url: "".concat(_this.baseUrl, "/api/save/log"),
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

var WxRouteEvents = ['switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack', 'routeFail'];
var WxHookMethods = ['request'];
var WX_TYPE = 2;
var WX_PROJECT_VERSION = '1.0.0'; // 项目版本号

var HTTP_SUCCESS = 1;
var HTTP_ERROR = 2;

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

    vm.initBaseOptions(_options);
    vm.$addHook(_options);
  };
  /**
   * 微信代理
   * @param {*} options 
   */


  wxMonitor.$addHook = function (options) {
    var vm = this; // 代理跳转

    var WxRouteEvents$1 = WxRouteEvents;
    WxRouteEvents$1.forEach(function (method) {
      var originMethod = wx[method];
      Object.defineProperty(wx, method, {
        writable: true,
        enumerable: true,
        configurable: true,
        value: function value(options) {
          var toUrl;

          if (method === WxRouteEvents$1.NavigateBack) {
            toUrl = util.getNavigateBackTargetUrl(options.delta);
          } else {
            toUrl = options.url;
          }

          try {
            var data = {
              simpleUrl: toUrl,
              referrer: vm.referrerPage || ""
            };
            vm.logSave('page_pv', data);
            vm.referrerPage = toUrl;
          } catch (e) {
            util.warn('[cloudMonitor] url error');
          }

          return originMethod.call(this, options);
        }
      });
    }); // 代理请求

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
              if (!!res && res.statusCode && res.statusCode != 200) {
                var data = {
                  simpleUrl: util.getPage(),
                  httpUrl: options$1.url || "",
                  httpUploadType: HTTP_ERROR,
                  responseText: JSON.stringify(res),
                  httpStatus: res.statusCode
                };

                if (url && url.indexOf(vm.baseUrl) != -1) {
                  vm.logSave('http_log', data);
                }
              } else {
                var endTime = new Date().getTime();
                var consumeData = {
                  simpleUrl: util.getPage(),
                  loadTime: endTime - startTime,
                  httpUrl: options$1.url || "",
                  httpUploadType: HTTP_SUCCESS,
                  responseText: JSON.stringify(res),
                  httpStatus: res.statusCode || 200
                };

                if (url && url.indexOf(vm.baseUrl) != -1) {
                  vm.logSave('http_log', consumeData);
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
                simpleUrl: util.getPage(),
                httpUrl: options$1.url || "",
                httpUploadType: HTTP_ERROR,
                responseText: JSON.stringify(err),
                httpStatus: '0'
              };

              if (url && url.indexOf(vm.baseUrl) != -1) {
                vm.logSave('http_log', data);
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
  };
  /**
   * 上传日志
   * @param {*} type 
   * @param {*} data 
   */


  wxMonitor.logSave = function (type, data) {
    var useData,
        logData = JSON.parse(JSON.stringify(data)),
        vm = this;

    if (!vm.baseOptions) {
      vm.initBaseOptions(vm.options);
      setTimeout(function () {
        logSave(type, data);
      }, 500);
      return;
    }

    switch (type) {
      case 'page_pv':
        useData = Object.assign(logData, vm.baseOptions);
        useData.userId = vm.userId || "", // 用户标识
        useData.uploadType = type;
        useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
        vm.queue.pushToQueue(useData);
        break;

      case 'js_error':
        useData = Object.assign(logData, vm.baseOptions);
        useData.userId = vm.userId || "", // 用户标识
        useData.uploadType = type;
        useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
        vm.queue.pushToQueue(useData);
        break;

      case 'http_log':
        useData = Object.assign(logData, vm.baseOptions);
        useData.userId = vm.userId || "", // 用户标识
        useData.uploadType = type;
        useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
        vm.queue.pushToQueue(useData);
        break;
    }
  };
  /**
   * 初始化上传参数
   * @param {*} option 
   */


  wxMonitor.initBaseOptions = function (option) {
    var vm = this; // 初始化上传参数

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
  };
  /**
   * 设置用户唯一标识
   * @param {*} userId 
   */


  wxMonitor.setUserId = function (userId) {
    this.userId = userId;
  };
  /**
   * 包装js 错误信息
   * @param {*} option 
   */


  wxMonitor.hookApp = function (option) {
    var vm = this,
        oldHookApp = {
      onError: function onError(e) {
        var n = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
            r = option.onError;

        try {
          var data = {
            simpleUrl: util.getPage(),
            errorMessage: String(e)
          };
          vm.logSave('js_error', data);
        } catch (err) {
          util.warn("[cloudMonitor] error in hookApp:onError", err);
        }

        if ("function" == typeof r) {
          return r.apply(this, n);
        }
      }
    };
    return util.ext({}, option, oldHookApp);
  };
}

var wxMonitor = {};

wxMonitor.init = function (options) {
  this._init(options);
};

initMixin(wxMonitor);

/**
 * 监控导出
 */

var index = {
  wxMonitor: wxMonitor
};

export default index;
//# sourceMappingURL=index.js.map
