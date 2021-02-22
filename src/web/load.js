
import { replaceNetwork, replaceError, listenHashchange, historyReplace, domReplace, unhandledrejectionReplace } from './replace'
import { HandleEvents } from './HandleEvents'


/**
 * 针对web 载入
 * @param {*} webMonitor 
 */
export function setupReplace(webMonitor) {
    HandleEvents.webMonitor = webMonitor
    // 处理http
    replaceNetwork()
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
