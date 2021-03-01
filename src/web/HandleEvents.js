import { isError } from '../util/help'
import { extractErrorStack, resourceTransform } from './util'
import { ERRORTYPES, HTTP_SUCCESS, HTTP_ERROR } from '../config/web'
import { getLocationHref, unknownToString } from './util'
import * as commonConfig from '../config/index'


const HandleEvents = {
  /**
   * 处理xhr、fetch回调
   * @param {*} data 
   */
  handleHttp(data) {
    if (!this.webMonitor) return
    let vm = this.webMonitor
    let param = ''
    if (!!data && data.status != 200) {
      param = {
        simpleUrl: getLocationHref(),
        httpUrl: data.url || "",
        httpUploadType: HTTP_ERROR,
        responseText: JSON.stringify(data.responseText || ""),
        httpStatus: data.status || 0
      }
      if (!!param && !!url && url != `${vm.queue.baseUrl}${vm.queue.api}`) {
        vm.logSave(commonConfig.HTTP_LOG, param)
      }
    }
    if (!!data && data.status == 200) {
      param = {
        simpleUrl: getLocationHref(),
        loadTime: data.elapsedTime || 0,
        httpUrl: options$1.url || "",
        httpUploadType: HTTP_SUCCESS,
        responseText: JSON.stringify(data.responseText || ""),
        httpStatus: data.status || 200
      }
    }
    if (!!param && !!url && url != `${vm.queue.baseUrl}${vm.queue.api}`) {
      vm.logSave(commonConfig.HTTP_LOG, param)
    }
  },

  /**
   * js 错误
   * @param {*} errorEvent 
   */
  handleError(errorEvent) {
    if (!this.webMonitor) return
    let vm = this.webMonitor
    const target = errorEvent.target
    // 资源错误上报
    if (!!target.localName) {
      let resourceData = resourceTransform(errorEvent.target)
      vm.logSave(commonConfig.RESOURCE_LOAD, resourceData)
      return
    }
    // code error
    const { message, lineno, colno, error } = errorEvent
    let result
    if (error && isError(error)) {
      result = extractErrorStack(error)
    }
    // 处理SyntaxError，stack没有lineno、colno
    result || (result = HandleEvents.handleNotErrorInstance(message, lineno, colno))

    let data = {
      simpleUrl: getLocationHref(),
      errorMessage: String(JSON.stringify(result))
    }
    vm.logSave(commonConfig.JS_ERROR, data)
  },
  /**
   * 处理SyntaxError，stack没有lineno、colno
   * @param {*} message 
   * @param {*} lineno 
   * @param {*} colno 
   */
  handleNotErrorInstance(message, lineno, colno) {
    let name = ERRORTYPES.UNKNOWN
    let msg = message
    const matches = message.match(ERROR_TYPE_RE)
    if (matches[1]) {
      name = matches[1]
      msg = matches[2]
    }
    const element = {
      func: ERRORTYPES.UNKNOWN_FUNCTION,
      args: ERRORTYPES.UNKNOWN,
      line: lineno,
      col: colno
    }
    return {
      name,
      message: msg,
      level: Severity.Normal,
      time: getTimestamp(),
      stack: [element]
    }
  },

  /**
   * history 模式下路由注册
   * @param {*} data 
   */
  handleHistory(data) {
    console.log(data)
  },
  /**
   * hash
   * @param {*} e 
   */
  handleHashchange(e) {
    console.log('测试')
    console.log(e)
  },
  /**
   * Promise
   * @param {*} ev 
   */
  handleUnhandleRejection(ev) {
    if (!this.webMonitor) return
    let vm = this.webMonitor
    let data = {
      type: ERRORTYPES.PROMISE_ERROR,
      message: unknownToString(ev.reason),
      url: getLocationHref(),
      name: ev.type,
    }
    if (isError(ev.reason)) {
      data = {
        ...data,
        ...extractErrorStack(ev.reason, Severity.Low)
      }
    }
    let result = {
      simpleUrl: getLocationHref(),
      errorMessage: String(JSON.stringify(data))
    }
    vm.logSave(commonConfig.JS_ERROR, result)
  }

}

export { HandleEvents }