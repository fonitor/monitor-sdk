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

var warn = getCwarn;
var util = {
  ext: ext,
  warn: warn,
  encode: encode,
  replaceAll: replaceAll,
  generateUUID: generateUUID,
  dateFormat: dateFormat
};

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
 * @param {*} mpExtend 
 */

function initMixin(mpExtend) {
  mpExtend.prototype._init = function (options) {
    if (!options || !options.app) {
      util.warn('[cloudMonitor] not set app');
    }

    if (!options || !options.baseUrl) {
      util.warn('[cloudMonitor] not set baseUrl');
    }

    var _options = Object.assign(baseConfig, options);

    var vm = this;
    vm.$options = _options; // 初始化

    vm.$addHook(_options);
  };

  mpExtend.prototype.$addHook = function (options) {};
}

function mpExtend(options) {
  this._init(options);
}

initMixin(mpExtend);
// import mpExtend from '../util/mp-extend'
// import util from '../util/index'
// let mpExtend = Function
// mpExtend.baseOptions = '' // 初始化上传参数
// mpExtend.referrerPage = '' // 上一个页面
// mpExtend.pageKey = '' // 用户标识
// const type = 2 // 代表微信小程序
// const projectVersion = '1.0.0' // 项目版本号
// /**
//  * 设置用户标识
//  * @param {*} key 
//  */
// mpExtend.setPageKey = function(key) {
//     mpExtend.pageKey = key
// }
// /**
//  * 初始化上传参数
//  * @param {*} option 
//  */
// function initBaseOptions(option) {
//     // 初始化上传参数
//     wx.getSystemInfo({
//         success: (res) => {
//             mpExtend.baseOptions = {
//                 app: option.app || "",
//                 type, // 代表微信小程序
//                 projectVersion: option.projectVersion || projectVersion, // 项目版本号
//                 customerKey: util.generateUUID(), // 会话id
//                 os: res.system.indexOf('iOS') === -1 ? 'Android' : 'IOS', // 系统信息
//                 deviceName: res.model, // 手机型号
//                 brand: res.brand, // 手机品牌
//                 browserVersion: res.version, // 小程序版本号
//             }
//         }
//     });
// }
// /**
//  * 获取当前url
//  */
// function getPage() {
//     return getCurrentPages()[getCurrentPages().length - 1].__route__
// }
// /**
//  * 上传日志
//  * @param {*} type 
//  * @param {*} data 
//  */
// function logSave(type, data) {
//     let useData,
//         logData = JSON.parse(JSON.stringify(data))
//     if (!mpExtend.baseOptions) {
//         initBaseOptions(mpExtend.options)
//         setTimeout(() => {
//             logSave(type, data)
//         }, 500)
//         return
//     }
//     switch (type) {
//         case 'page_pv':
//             useData = Object.assign(logData, mpExtend.baseOptions)
//             useData.userId = mpExtend.userId || "", // 用户标识
//             useData.uploadType = type
//             useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
//             mpExtend.queue.pushToQueue(useData)
//             break
//         case 'js_error':
//             useData = Object.assign(logData, mpExtend.baseOptions)
//             useData.userId = mpExtend.userId || "", // 用户标识
//             useData.uploadType = type
//             useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
//             mpExtend.queue.pushToQueue(useData)
//             break
//         case 'http_log':
//             useData = Object.assign(logData, mpExtend.baseOptions)
//             useData.userId = mpExtend.userId || "", // 用户标识
//             useData.uploadType = type
//             useData.mobileTime = util.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
//             mpExtend.queue.pushToQueue(useData)
//             break
//         default:
//     }
// }
// const addHook = function (options) {
//     if (wx && options && options.autoReportApi) {
//         let startTime = new Date().getTime()
//         wx._request = function (e) {
//             let _e = e
//             let _fail = _e.fail || "",
//                 _success = _e.success || "",
//                 _complete = _e.complete || ""
//             _e.fail = function (error) {
//                 !!_fail && _fail(error)
//                 try {
//                     let data = {
//                         simpleUrl: getPage(),
//                         httpUrl: e.url,
//                         httpUploadType: 2,
//                         responseText: JSON.stringify(error),
//                         httpStatus: '0'
//                     }
//                     logSave('http_log', data)
//                 } catch (e) {
//                     util.warn('[cloudMonitor] http error')
//                 }
//             }
//             _e.success = function (success) {
//                 !!_success && _success(success)
//                 try {
//                     // 上报接口报警
//                     if (!!success && success.statusCode && success.statusCode != 200) {
//                         let data = {
//                             simpleUrl: getPage(),
//                             httpUrl: _e.url,
//                             httpUploadType: 2,
//                             responseText: JSON.stringify(success),
//                             httpStatus: success.statusCode
//                         }
//                         logSave('http_log', data)
//                     } else {
//                         let endTime = new Date().getTime()
//                         let consumeData = {
//                             simpleUrl: getPage(),
//                             loadTime: endTime - startTime,
//                             httpUrl: _e.url,
//                             httpUploadType: 1,
//                             responseText: JSON.stringify(success),
//                             httpStatus: success.statusCode || 200
//                         }
//                         logSave('http_log', consumeData)
//                     }
//                 } catch (e) {
//                     util.warn('[cloudMonitor] http error')
//                 }
//             }
//             _e.complete = function (complete) {
//                 !!_complete && _complete(complete)
//             }
//             wx.request(_e)
//         }
//     }
// }
// const performanceInit = function () {
//     if (wx.canIUse('getPerformance')) {
//         const performance = wx.getPerformance()
//         const observer = performance.createObserver((entryList) => {
//             let res = entryList.getEntries() || []
//             if (res.length == 0) {
//                 return
//             }
//             res.forEach((item) => {
//                 if (item) {
//                     let {
//                         entryType = '', duration = 0, name = '', path = '', moduleName = ''
//                     } = item
//                     if (entryType == 'render' && duration && path) {
//                         log.reportPerformance(trackRenderPerformance['render'], duration, path)
//                         log.reportPerformance(trackRenderPerformance['firstRender'], duration, path)
//                     } else if (entryType == 'navigation' && duration && path) {
//                         log.reportPerformance(trackRenderPerformance['navigation'], duration, path)
//                         if (name == 'appLaunch') {
//                             log.reportPerformance(trackRenderPerformance['appLaunch'], duration, path)
//                         } else if (name == 'route') {
//                             log.reportPerformance(trackRenderPerformance['route'], duration, path)
//                         }
//                     } else if (entryType == 'script' && duration && moduleName) {
//                         log.reportPerformance(trackRenderPerformance['evaluateScript'], duration, moduleName)
//                     }
//                 }
//             })
//         })
//         observer.observe({
//             entryTypes: ['navigation', 'render', 'script']
//         })
//     } else {
//         return
//     }
// }
// const memoryWarning = () => {
//     if (wx.canIUse('onMemoryWarning')) {
//         try {
//             wx.onMemoryWarning((res) => {
//                 let level = 1,
//                     route = '';
//                 if (!!res && !!res.level) {
//                     level = res.level
//                 }
//                 let pages = getCurrentPages()
//                 if (pages && pages.length > 0) {
//                     route = getCurrentPages()[getCurrentPages().length - 1].__route__
//                     log.reportPerformance(trackRenderPerformance['memoryWarning'], level, route)
//                 }
//             })
//         } catch (error) {
//         }
//     }
// }
// let pagesPerformance = function (options) {
//     if (!options || !options.autoReportPagePerformance) {
//         return
//     }
// }
// const defaultInit = {
//     App: {
//         onError(e) {
//             try {
//                 let data = {
//                     simpleUrl: getPage(),
//                     errorMessage: String(e)
//                 }
//                 logSave('js_error', data)
//             }catch(err) {
//                 util.warn('[cloudMonitor] JavaScript error')
//             }
//         }
//     },
//     Page: {
//         onShow() {
//             if (mpExtend.options.autoReportPage) {
//                 try {
//                     let data = {
//                         simpleUrl: this.__route__,
//                         referrer: mpExtend.referrerPage,
//                     }
//                     logSave('page_pv', data)
//                     mpExtend.referrerPage = this.__route__
//                 } catch (err) {
//                 }
//             }
//         }
//     }
// }
// /**
//  * 初始化参数
//  * @param {*} options 
//  */
// mpExtend.init = function (options) {
//     pagesPerformance(_options)
//     initBaseOptions(_options)
//     // 初始化消息队列
//     mpExtend.queue = wxQueue.getInstance(_options.baseUrl)
// }
// mpExtend(defaultInit)
// export default mpExtend

/**
 * 监控导出
 */

var index = {
  wxMonitor: mpExtend
};

export default index;
//# sourceMappingURL=index.js.map
