import { HandleEvents } from './HandleEvents'
import { on } from '../util/help'
import { subscribeEvent, triggerHandlers } from '../conmmon/subscribe'
import * as webConfig from './constant'

/**
 * 添加方法
 * @param {*} handler 
 */
export function addReplaceHandler(handler) {
    subscribeEvent(handler)
}

/**
 * http 请求监控
 * @param {*} webMonitor 
 */
export function replaceNetwork(webMonitor) {

}

/**
 * 错误监控
 * @param {*} webMonitor 
 */
export function replaceError(webMonitor) {
    HandleEvents.handleError.webMonitor = webMonitor
    // 先添加方法到数组
    addReplaceHandler({
        callback: (error) => {
            HandleEvents.handleError(error)
        },
        type: webConfig.PAGE_JS_ERROR
    })
    on(
        window,
        webConfig.PAGE_JS_ERROR,
        function (e) {
            triggerHandlers(webConfig.PAGE_JS_ERROR, e)
        },
        true
    )
}