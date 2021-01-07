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

var baseConfig = {
  baseUrl: '',
  autoReportApi: true,
  // 是否上报api 
  autoReportPage: true,
  // 是否上报页面信息
  autoReportPagePerformance: true // 是否上报页面性能

};

var addHook = function addHook(options) {
  if (wx && options && options.autoReportApi) {
    wx._request = function () {
      var _e = e;

      var _fail = _e.fail || {},
          _success = _e.success || {},
          _complete = _e.complete || {};

      _e.fail = function (error) {
        _fail(error);

        try {
          // 上报接口报警
          log.reportMonitor(trackMonitor['requestFail'], 10); // 接口报错记录

          log.reportPerformance(trackNetPerformance['networkError'], 10, url); // 接口报错实时日志

          log.error(url, "networkType:".concat(app.globalData.networkType, "-").concat(JSON.stringify(res)));
        } catch (e) {}
      };

      _e.success = function (success) {
        _success(success);

        try {
          if (success.profile && success.profile.fetchStart && success.profile.responseEnd) {
            // api 消耗
            var _res$profile = res.profile,
                responseEnd = _res$profile.responseEnd,
                fetchStart = _res$profile.fetchStart;
            var costTime = responseEnd - fetchStart; // log.reportPerformance(trackNetPerformance['network'], costTime, url)
          } // 上报接口报警


          if (res && res.statusCode && res.statusCode != 200) {// log.reportMonitor(trackMonitor['network'], res.statusCode)
            // log.error(url, `networkType:${app.globalData.networkType}-${JSON.stringify(res)}`)
          }
        } catch (e) {}
      };

      _e.complete = function (complete) {
        _complete(complete);
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

var referrerPage = "";
var defaultInit = {
  App: {
    onLaunch: function onLaunch() {
      console.log("\u6253\u5F00\u4E86\u5C0F\u7A0B\u5E8F");
      console.log(MpExtend.options);
    },
    onError: function onError(e) {
      console.log('执行到错误');
      console.log(e);
    }
  },
  Page: {
    onShow: function onShow() {
      if (MpExtend.options.autoReportPage) {
        try {
          referrerPage = (_readOnlyError("referrerPage"), this.__route__);
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
  var _options = Object.assign(baseConfig, options);

  this.options = _options;
  addHook(_options);
  pagesPerformance(_options);
  MpExtend. // 初始化消息队列
  mpExtend.queue = wxQueue.getInstance(_options.baseUrl);
};

MpExtend(defaultInit);
//     constructor() {
//         this._conf = {
//             baseUrl: '',
//             autoReportApi: true, // 是否上报api 
//             autoReportPage: true, // 是否上报页面信息
//             autoReportPagePerformance: true, // 是否上报页面性能
//         }
//     }
//     /**
//      * 监控注册
//      * @param {*} e 
//      */
//     hookApp(e) {
//         let self = this,
//             t = {
//                 onError: function (t) {
//                     let n = 1 === arguments.length ? [arguments[0]] : Array.apply(null, arguments),
//                         r = e.onError;
//                     try {
//                         self.error(t)
//                     } catch (t) {
//                         util.warn("[cloudMonitor] error in hookApp:onError", t)
//                     }
//                     if ("function" == typeof r) {
//                         return r.apply(this, n)
//                     }
//                 }
//             }
//         return util.ext({}, e, t)
//     }
//     /**
//      * 监控执行
//      * @param {*} options 
//      */
//     init(options) {
//         if (!options || !options.pid) {
//             util.warn("[cloudMonitor] not set pid");
//             return
//         }
//         let self = this
//         try {
//             this.setConfig({}, function () {
//                 self.addHook()
//                 // 是否需要落pv数据
//                 if (self && self._conf && self._conf.autoReportPage) {
//                     self.onReady(() => {
//                         self._log('pv')
//                     })
//                 }
//             })
//         } catch (err) {
//             util.warn("[cloudMonitor] set config error");
//         }
//     }
//     /**
//      * @param {*} fun 
//      */
//     onReady(fun) {
//         if (typeof fun != 'function') {
//             util.warn('[cloudMonitor] not function')
//             return
//         }
//         this._conf.uid ? fun() : setTimeout(() => {
//             this.onReady(fun)
//         }, 100)
//     }
//     /**
//      * 错误信息
//      * @param {*} t 
//      * @param {*} e 
//      */
//     error(t, e) {
//         if (!t) {
//             return util_1.warn("[cloudMonitor] invalid param e: " + t), this
//         }
//         1 === arguments.length ? ("string" == typeof t && (t = {
//             message: t
//         }, e = {}), "object" == typeof t && (e = t = t.error || t)) : ("string" == typeof t && (t = {
//             message: t
//         }), "object" != typeof e && (e = {}));
//         let name = t.name || 'CustomError'
//         let useData = {
//             begin: Date.now(),
//             cate: name,
//             msg: t.message,
//             file: e.filename || "",
//             line: e.lineno || "",
//             col: e.colno || "",
//         }
//     }
//     getConfig(e) {
//         return {}
//         // return e ? this._conf[e] : util.ext({}, this._conf)
//     }
//     /**
//      * 初始化参数
//      * @param {*} options
//      * @param {*} fun 
//      */
//     setConfig(options, fun) {
//         this.initQueue()
//         fun()
//     }
//     initQueue() { }
//     /**
//      * 执行log 存储
//      * @param {*} type 
//      */
//     _log(type) {
//         switch (type) {
//             case 'pv':
//                 this._logPv()
//                 break
//             default:
//         }
//     }
//     /**
//      * pv 数据
//      */
//     _logPv() {
//     }
//     /**
//      * 代理
//      */
//     addHook() {
//     }
//     /**
//      * 单例
//      * @return {?}
//      */
//     static getInstance() {
//         if (!wxMonitor.instance) {
//             wxMonitor.instance = new wxMonitor()
//             wxMonitor.queue = null
//         }
//         return wxMonitor.instance
//     }
//     /**
//      * wx 消息队列重写方法
//      */
//     initQueue() {
//         try {
//             // 消息队列初始化
//             wxMonitor.queue = wxQueue.getInstance(this._conf.baseUrl)
//         } catch (err) {
//             util.warn("[cloudMonitor] queue init:error", t)
//         }
//     }
//     /**
//      * 微信代理方法
//      */
//     addHook() {
//         let config = this._conf
//         if (config && config.autoReportPage) {
//             if (typeof wx.navigateTo == 'function') {
//                 let _navigateTo = wx.navigateTo
//                 wx['navigateTo'] = function (e) {
//                     console.log(e)
//                 }
//                 let _wx = Object.getOwnPropertyDescriptor(wx, "navigateTo");
//                 console.log(_wx)
//                 _wx && _wx.writable && (wx.navigateTo = function (e) {
//                     console.log('测试')
//                     console.log(e)
//                 })
//             }
//         }
//     }
// }

/**
 * 监控导出
 */

var index = {
  wxMonitor: MpExtend
};

export default index;
//# sourceMappingURL=index.js.map
