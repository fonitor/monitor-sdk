import { HandleEvents } from './HandleEvents'
import { on, replaceOld, isExistProperty } from '../util/help'
import { subscribeEvent, triggerHandlers } from '../conmmon/subscribe'
import * as webConfig from '../config/web'
import { getLocationHref, supportsHistory } from './util'

/**
 * 添加方法
 * @param {*} handler 
 */
export function addReplaceHandler(handler) {
    subscribeEvent(handler)
}

/**
 * http 请求监控
 */
export function replaceNetwork() {
    addReplaceHandler({
        callback: (e) => {
          HandleEvents.handleHashchange(e)
        },
        type: webConfig.HASHCHANGE
      })
    if (!isExistProperty(window, 'onpopstate')) {
        on(window, webConfig.HASHCHANGE, function (e) {
            triggerHandlers(webConfig.HASHCHANGE, e)
        })
    }
}

/**
 * 错误监控
 */
export function replaceError() {
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

// 上一次的路由
let lastHref
lastHref = getLocationHref()

// hashchange
export function listenHashchange() {

}

// history
export function historyReplace() {
    // 先添加方法到数组
    addReplaceHandler({
        callback: (data) => {
            HandleEvents.handleHistory(data)
        },
        type: webConfig.HISTORY
    })
    if (!supportsHistory()) return
    const oldOnpopstate = window.onpopstate
    window.onpopstate = function (...args) {
        const to = getLocationHref()
        const from = lastHref
        triggerHandlers(webConfig.HISTORY, {
            from,
            to
        })
        oldOnpopstate && oldOnpopstate.apply(this, args)
    }
    function historyReplaceFn(originalHistoryFn) {
        return function (...args) {
            const url = args.length > 2 ? args[2] : undefined
            if (url) {
                const from = lastHref
                const to = String(url)
                lastHref = to
                triggerHandlers(webConfig.HISTORY, {
                    from,
                    to
                })
            }
            return originalHistoryFn.apply(this, args)
        }
    }
    replaceOld(window.history, 'pushState', historyReplaceFn)
    replaceOld(window.history, 'replaceState', historyReplaceFn)
}

// 页面点击
export function domReplace() {

}
