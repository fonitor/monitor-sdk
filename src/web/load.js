
import { replaceNetwork, replaceError, listenHashchange, historyReplace, domReplace, unhandledrejectionReplace, replaceFetch } from './replace'
import { HandleEvents } from './HandleEvents'


/**
 * 针对web 载入
 * @param {*} webMonitor 
 */
export function setupReplace(webMonitor) {
    HandleEvents.webMonitor = webMonitor
    // 处理http
    replaceNetwork(webMonitor)
    // 处理fetch 请求
    replaceFetch(webMonitor)
    // js 错误
    replaceError()
    // Promise 错误
    unhandledrejectionReplace()
    // pv uv
    listenHashchange()
    historyReplace()
    // 页面点击
    domReplace()
}
