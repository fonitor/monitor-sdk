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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

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

// 可以用于拓展的生命周期
var life = {
  App: ['preprocess', 'onLaunch', 'onShow', 'onHide', 'onError'],
  Page: ['preprocess', 'onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage'],
  Component: ['preprocess', 'created', 'attached', 'ready', 'moved', 'detached', 'error']
}; // 用于保存所有的拓展生命周期函数

var lifeMixin = {};

for (var key in life) {
  lifeMixin[key] = lifeMixin[key] || {};

  var _iterator = _createForOfIteratorHelper(life[key]),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var lifeTime = _step.value;
      lifeMixin[key][lifeTime] = [];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} // 基类对象
// 在调用App、Page、Component前会被混入到对象中


var base = {
  App: {},
  Page: {},
  Component: {}
};

var MpExtend = function MpExtend(param) {
  // 允许接收数组形式的参数
  if (isArray(param)) {
    param.forEach(function (item) {
      return MpExtend(item);
    });
    return;
  }

  for (var constructorName in param) {
    // constructorName 应当是[App, Page, Component] 中的一个
    if (!life[constructorName]) {
      warning(constructorName, 'not found');
      continue;
    }

    var option = Object.assign({}, param[constructorName]); // 如果是生命周期中的某一个，作为生命周期拓展

    for (var _key in option) {
      if (lifeMixin[constructorName][_key]) {
        lifeMixin[constructorName][_key].push(option[_key]);

        delete option[_key];
      }
    } // 把剩余的属性混入到基类中


    mixin(base[constructorName], option);
  }
}; // 重新包装的 App、Page、Component构造函数
// 虽然都是相似的代码但是这样更利于理解和修改


var _App = decorate(App, function (option) {
  mixin(option, base.App);

  var _iterator2 = _createForOfIteratorHelper(life.App),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _lifeTime = _step2.value;
      option[_lifeTime] = decorate.apply(void 0, [option[_lifeTime]].concat(_toConsumableArray(lifeMixin.App[_lifeTime])));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  option['preprocess'] && option['preprocess'].call(option, option);
});

var _Page = decorate(Page, function (option) {
  mixin(option, base.Page);

  var _iterator3 = _createForOfIteratorHelper(life.Page),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _lifeTime2 = _step3.value;
      option[_lifeTime2] = decorate.apply(void 0, [option[_lifeTime2]].concat(_toConsumableArray(lifeMixin.Page[_lifeTime2])));
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  option['preprocess'] && option['preprocess'].call(option, option);
});

var _Component = decorate(Component, function (option) {
  mixin(option, base.Component);

  var _iterator4 = _createForOfIteratorHelper(life.Component),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _lifeTime3 = _step4.value;
      option[_lifeTime3] = decorate.apply(void 0, [option[_lifeTime3]].concat(_toConsumableArray(lifeMixin.Component[_lifeTime3])));
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  option['preprocess'] && option['preprocess'].call(option, option);
}); // 装饰函数
// 在调用原函数之前调用所有装饰器


function decorate(f) {
  for (var _len = arguments.length, decorators = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
    decorators[_key2 - 1] = arguments[_key2];
  }

  return function () {
    var _iterator5 = _createForOfIteratorHelper(decorators),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var decorator = _step5.value;
        decorator && decorator.apply(this, arguments);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    return f && f.apply(this, arguments);
  };
}
/**
 * 实现类似混入的效果
 * 类似 Object.assign， 但在遇见相同属性名均是对象时会递归进行合并而非直接覆盖
 * @param o
 * @param mix 可以传入多个
 * 注：如果存在引用循环递归会栈溢出
 */


function mixin(o) {
  for (var _len2 = arguments.length, mixs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
    mixs[_key3 - 1] = arguments[_key3];
  }

  mixs.forEach(function (mix) {
    for (var _key4 in mix) {
      // 两个属性都是对象则递归合并
      if (isObject(o[_key4]) && isObject(mix[_key4])) {
        mixin(o[_key4], mix[_key4]);
      } else {
        o[_key4] = o[_key4] || mix[_key4];
      }
    } // 拷贝symbol类型，（可惜小程序不支持）


    var _iterator6 = _createForOfIteratorHelper(Object.getOwnPropertySymbols(mix)),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var sym = _step6.value;
        o[sym] = o[sym] || mix[sym];
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  });
  return o;
}

function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

function isArray(o) {
  return Object.prototype.toString.call(o) === "[object Array]";
}

function warning() {
  var _console;

  for (var _len3 = arguments.length, msg = new Array(_len3), _key5 = 0; _key5 < _len3; _key5++) {
    msg[_key5] = arguments[_key5];
  }

  MpExtend.tips && (_console = console).warn.apply(_console, ['mp-extend:'].concat(msg));
}

Object.assign(MpExtend, {
  mixin: mixin,
  decorate: decorate,
  App: _App,
  Page: _Page,
  Component: _Component,
  warning: warning,
  tips: true
});

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

var baseConfig = {
  baseUrl: '',
  autoReportApi: true,
  // 是否上报api 
  autoReportPage: true,
  // 是否上报页面信息
  autoReportPagePerformance: true // 是否上报页面性能

};
MpExtend.baseOptions = ''; // 初始化上传参数

MpExtend.referrerPage = ''; // 上一个页面

MpExtend.pageKey = ''; // 用户标识

var type = 2; // 代表微信小程序

var projectVersion = '1.0.0'; // 项目版本号

/**
 * 设置用户标识
 * @param {*} key 
 */

MpExtend.setPageKey = function (key) {
  MpExtend.pageKey = key;
};
/**
 * 初始化上传参数
 * @param {*} option 
 */


function initBaseOptions(option) {
  // 初始化上传参数
  wx.getSystemInfo({
    success: function success(res) {
      MpExtend.baseOptions = {
        app: option.app || "",
        type: type,
        // 代表微信小程序
        projectVersion: projectVersion,
        // 项目版本号
        customerKey: util.generateUUID(),
        // 会话id
        os: res.system,
        // 系统信息
        deviceName: res.model,
        // 手机型号
        brand: res.brand,
        // 手机品牌
        browserVersion: res.version // 小程序版本号

      };
    }
  });
}
/**
 * 获取当前url
 */


function getPage() {
  return getCurrentPages()[getCurrentPages().length - 1].__route__;
}
/**
 * 上传日志
 * @param {*} type 
 * @param {*} data 
 */


function logSave(type, data) {
  var useData,
      logData = JSON.parse(JSON.stringify(data));

  if (!MpExtend.baseOptions) {
    initBaseOptions(MpExtend.options);
    setTimeout(function () {
      logSave(type, data);
    }, 500);
    return;
  }

  switch (type) {
    case 'page_pv':
      useData = Object.assign(logData, MpExtend.baseOptions);
      useData.userId = MpExtend.userId || "", // 用户标识
      useData.uploadType = type;
      MpExtend.queue.pushToQueue(useData);
      break;

    case 'js_error':
      useData = Object.assign(logData, MpExtend.baseOptions);
      useData.userId = MpExtend.userId || "", // 用户标识
      useData.uploadType = type;
      MpExtend.queue.pushToQueue(useData);
      break;

    case 'http_log':
      useData = Object.assign(logData, MpExtend.baseOptions);
      useData.userId = MpExtend.userId || "", // 用户标识
      useData.uploadType = type;
      MpExtend.queue.pushToQueue(useData);
      break;
  }
}

var addHook = function addHook(options) {
  if (wx && options && options.autoReportApi) {
    var startTime = new Date().getTime();

    wx._request = function (e) {
      var _e = e;

      var _fail = _e.fail || "",
          _success = _e.success || "",
          _complete = _e.complete || "";

      _e.fail = function (error) {
        !!_fail && _fail(error);

        try {
          var data = {
            httpUrl: e.url,
            httpUploadType: 2,
            responseText: JSON.stringify(error)
          };
          logSave('http_log', data);
        } catch (e) {
          util.warn('[cloudMonitor] http error');
        }
      };

      _e.success = function (success) {
        !!_success && _success(success);

        try {
          // 上报接口报警
          if (!!success && success.statusCode && success.statusCode != 200) {
            var data = {
              httpUrl: _e.url,
              httpUploadType: 2,
              responseText: JSON.stringify(success)
            };
            logSave('http_log', data);
          } else {
            var endTime = new Date().getTime();
            var consumeData = {
              loadTime: endTime - startTime,
              httpUrl: _e.url,
              httpUploadType: 1,
              responseText: JSON.stringify(success)
            };
            logSave('http_log', consumeData);
          }
        } catch (e) {
          util.warn('[cloudMonitor] http error');
        }
      };

      _e.complete = function (complete) {
        !!_complete && _complete(complete);
      };

      wx.request(_e);
    };
  }
};

var pagesPerformance = function pagesPerformance(options) {
  if (!options || !options.autoReportPagePerformance) {
    return;
  }
};

var defaultInit = {
  App: {
    onError: function onError(e) {
      try {
        var data = {
          simpleUrl: getPage(),
          errorMessage: String(e)
        };
        logSave('js_error', data);
      } catch (err) {
        util.warn('[cloudMonitor] JavaScript error');
      }
    }
  },
  Page: {
    onShow: function onShow() {
      if (MpExtend.options.autoReportPage) {
        try {
          var data = {
            simpleUrl: this.__route__,
            referrer: MpExtend.referrerPage
          };
          logSave('page_pv', data);
          MpExtend.referrerPage = this.__route__;
        } catch (err) {}
      }
    }
  }
};
/**
 * 初始化参数
 * @param {*} options 
 */

MpExtend.init = function (options) {
  if (!options || !options.app) {
    util.warn('[cloudMonitor] not set app');
  }

  if (!options || !options.baseUrl) {
    util.warn('[cloudMonitor] not set baseUrl');
  }

  var _options = Object.assign(baseConfig, options);

  this.options = _options;
  addHook(_options);
  pagesPerformance(_options);
  initBaseOptions(_options); // 初始化消息队列

  MpExtend.queue = wxQueue.getInstance(_options.baseUrl);
};

MpExtend(defaultInit);

/**
 * 监控导出
 */

var index = {
  wxMonitor: MpExtend
};

export default index;
//# sourceMappingURL=index.js.map
